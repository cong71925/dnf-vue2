<template>
  <el-dialog
    title="历史数据"
    :visible.sync="visible"
    width="90%"
    :destroy-on-close="true"
    v-loading="$store.state.loading"
  >
    <div v-if="show">
      <g2-custom :option="g2Option"></g2-custom>
    </div>
    <div class="no-data" v-else>
      <h3>暂无数据</h3>
    </div>
    <el-row :gutter="20" v-if="character.job === '奶'">
      <el-col :span="12">
        <el-card class="el-card" :body-style="{ padding: '10px' }">
          <div>
            <el-switch v-model="boost" active-text="唱歌"></el-switch>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="el-card" :body-style="{ padding: '10px' }">
          <div>
            <el-switch v-model="favoritism" active-text="偏爱"></el-switch>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-divider />
    <div v-if="show && controlVisible">
      <el-table v-if="character.job === '奶'" :data="historicalInfo" style="width: 100%">
        <el-table-column prop="create_time" label="时间"></el-table-column>
        <el-table-column prop="buff_default" label="常驻力智"></el-table-column>
        <el-table-column prop="buff_atk" label="常驻三攻"></el-table-column>
        <el-table-column prop="buff_burst" label="太阳力智"></el-table-column>
        <el-table-column prop="ratio" label="有系统奶提升率"></el-table-column>
        <el-table-column label="操作" width="130px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="removeHistoricalInfo(scope.row.id)"
              icon="el-icon-close"
            >删除记录</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table v-else :data="historicalInfo" style="width: 100%">
        <el-table-column prop="create_time" label="时间"></el-table-column>
        <el-table-column prop="damage_15s" label="15s"></el-table-column>
        <el-table-column prop="damage_20s" label="20s"></el-table-column>
        <el-table-column label="操作" width="130px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="removeHistoricalInfo(scope.row.id)"
              icon="el-icon-close"
            >删除记录</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-dialog>
</template>
<script>
import adapter from "@/utils/adapter.js";
export default {
  props: ["dialogVisible", "character", "controlVisible"],
  watch: {
    dialogVisible(val) {
      this.visible = val;
      if (val) {
        this.getData();
      } else {
        this.show = false;
      }
    },
    visible(val) {
      this.$emit("update:dialogVisible", val);
    },
    boost() {
      this.update();
    },
    favoritism() {
      this.update();
    }
  },
  methods: {
    update() {
      this.data = [];
      this.show = false;
      if (this.character.job === "奶") {
        for (let i = 0; i < this.historicalInfo.length; i++) {
          let data = this.historicalInfo[i];
          data.class_1 = this.character.class_1
          let payload = {
            bufferData: data,
            hasSystemBuff: true,
            boost: this.boost,
            favoritism: this.favoritism
          };
          data.ratio = adapter.GetLiftRatio(payload);
          data = adapter.BufferDataAdapter(payload);
          this.data[i] = {
            date: data.create_time,
            strInt: Number(data.buff_default),
            atk: Number(data.buff_atk),
            burst: data.buff_burst,
            ratio: data.ratio
          };
        }
      } else {
        for (let i = 0; i < this.historicalInfo.length; i++) {
          this.data[i] = {
            date: this.historicalInfo[i].create_time,
            damage_15s: this.historicalInfo[i].damage_15s,
            damage_20s: this.historicalInfo[i].damage_20s
          };
        }
      }
      this.$nextTick(() => {
        this.show = true;
      });
    },
    getData() {
      this.$store
        .dispatch("character/getCharacterHistorical", this.character.id)
        .then(() => {
          this.historicalInfo = this.$store.state.character.historicalList;
          this.update();
        })
        .catch(msg => {
          this.$message({
            showClose: true,
            type: "error",
            message: msg
          });
        });
    },
    g2Option(chart, dataset) {
      let data = this.data;
      let dv = dataset.createView().source(data);
      if (this.character.job === "奶") {
        chart.scale("date", {
          type: "timeCat"
        });
        chart.scale("ratio", {
          type: "linear",
          alias: "提升率(倍)"
        });
        dv.transform({
          type: "rename",
          map: {
            strInt: "常驻力智",
            atk: "常驻三攻",
            burst: "太阳力智"
          }
        });
        dv.transform({
          type: "fold",
          fields: ["常驻力智", "常驻三攻", "太阳力智"],
          key: "key",
          value: "buff"
        });
        chart.source(dv);
        chart
          .intervalStack()
          .position("date*buff")
          .color("key");
        chart
          .line()
          .position("date*ratio")
          .size(2)
          .label("ratio");
        chart
          .point()
          .position("date*ratio")
          .size(4)
          .shape("circle")
          .style({
            stroke: "#fff",
            lineWidth: 1
          });
      } else {
        dv.transform({
          type: "rename",
          map: {
            damage_15s: "15s绿纱袋伤害(亿)",
            damage_20s: "20s绿纱袋伤害(亿)"
          }
        });
        dv.transform({
          type: "fold",
          fields: ["15s绿纱袋伤害(亿)", "20s绿纱袋伤害(亿)"],
          key: "damageTime",
          value: "damage"
        });
        chart.scale("date", {
          type: "timeCat"
        });
        chart.source(dv);
        chart
          .line()
          .position("date*damage")
          .color("damageTime");
        chart
          .point()
          .position("date*damage")
          .size(4)
          .color("damageTime")
          .style({
            stroke: "#fff",
            lineWidth: 1
          })
          .label("damage");
      }
    },
    removeHistoricalInfo(id) {
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store
            .dispatch("character/deleteCharacterHistorical", id)
            .then(() => {
              this.$message({
                showClose: true,
                type: "success",
                message: "删除成功!"
              });
              this.getData();
            })
            .catch(msg => {
              this.$message({
                showClose: true,
                type: "error",
                message: msg
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            showClose: true,
            message: "已取消删除"
          });
        });
    }
  },
  data() {
    return {
      visible: this.dialogVisible,
      historicalInfo: [],
      data: [],
      favoritism: true,
      boost: true,
      show: false
    };
  }
};
</script>
<style scoped>
.no-data {
  text-align: center;
}
</style>
