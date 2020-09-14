<template>
  <div>
    <el-row :gutter="20">
      <el-col :xs="24" :lg="fullScreen?24:12">
        <el-card>
          <buffer-charts
            :data="historicalData"
            :character="character"
            :isFullScreen.sync="fullScreen"
            :fullScreen="true"
            height="500px"
            v-if="character.job === '奶'"
          />
          <center-charts
            :data="historicalData"
            :isFullScreen.sync="fullScreen"
            :fullScreen="true"
            height="500px"
            v-else
          />
        </el-card>
      </el-col>
      <el-col :xs="24" :lg="fullScreen?24:12">
        <el-card>
          <el-table v-if="character.job === '奶'" :data="historicalData" style="width: 100%">
            <el-table-column prop="create_time" width="200px" label="时间"></el-table-column>
            <el-table-column prop="buff_default" label="常驻力智"></el-table-column>
            <el-table-column prop="buff_atk" label="常驻三攻"></el-table-column>
            <el-table-column prop="buff_burst" label="太阳力智"></el-table-column>
            <el-table-column label="操作" width="130px">
              <template slot-scope="scope">
                <el-popconfirm
                  confirmButtonText="确定"
                  cancelButtonText="取消"
                  icon="el-icon-info"
                  iconColor="red"
                  title="您确定要删除该条记录吗？"
                  @onConfirm="removeRecord(scope.row.id)"
                >
                  <el-button size="mini" type="danger" slot="reference" icon="el-icon-close">删除记录</el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
          <el-table v-else :data="historicalData" style="width: 100%">
            <el-table-column prop="create_time" width="200px" label="时间"></el-table-column>
            <el-table-column prop="damage_15s" label="15s"></el-table-column>
            <el-table-column prop="damage_20s" label="20s"></el-table-column>
            <el-table-column label="操作" width="130px">
              <template slot-scope="scope">
                <el-popconfirm
                  confirmButtonText="确定"
                  cancelButtonText="取消"
                  icon="el-icon-info"
                  iconColor="red"
                  title="您确定要删除该条记录吗？"
                  @onConfirm="removeRecord(scope.row.id)"
                >
                  <el-button size="mini" type="danger" slot="reference" icon="el-icon-close">删除记录</el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  props: ["character"],
  components: {
    "center-charts": () => import("@/components/charts/history/Center.vue"),
    "buffer-charts": () => import("@/components/charts/history/Buffer.vue"),
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$store
        .dispatch("character/getCharacterHistorical", this.character.id)
        .then((result) => {
          this.historicalData = [...result];
        })
        .catch((msg) => {
          this.$message({
            showClose: true,
            type: "error",
            message: msg,
          });
        });
    },
    removeRecord(id) {
      this.$store
        .dispatch("character/deleteCharacterHistorical", id)
        .then(() => {
          this.$message({
            showClose: true,
            type: "success",
            message: "删除成功!",
          });
          this.getData();
        })
        .catch((msg) => {
          this.$message({
            showClose: true,
            type: "error",
            message: msg,
          });
        });
    },
  },
  data() {
    return {
      historicalData: [],
      fullScreen: false,
    };
  },
};
</script>

<style scoped>
.el-card {
  margin: 10px 0 10px 0;
}
</style>