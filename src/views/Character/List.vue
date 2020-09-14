<template>
  <div>
    <div class="flex-box">
      <el-button-group>
        <el-button
          :type="showType === 'table'?'primary':''"
          @click="showType='table'"
          size="mini"
        >表格</el-button>
        <el-button
          :type="showType === 'charts'?'primary':''"
          @click="showType='charts'"
          size="mini"
        >图表</el-button>
      </el-button-group>
      <div class="gutter" />
      <el-button-group>
        <el-button
          :type="chartsType == 'center'?'primary':''"
          @click="chartsType='center'"
          size="mini"
        >输出</el-button>
        <el-button
          :type="chartsType == 'dealer'?'primary':''"
          @click="chartsType='dealer'"
          size="mini"
        >纯C</el-button>
        <el-button
          :type="chartsType == 'synergy'?'primary':''"
          @click="chartsType='synergy'"
          size="mini"
        >辅C</el-button>
        <el-button
          :type="chartsType == 'buffer'?'primary':''"
          @click="chartsType='buffer'"
          size="mini"
        >奶</el-button>
      </el-button-group>
      <div class="gutter" />
      <el-button-group class="button-group" v-if="chartsType == 'buffer'">
        <el-button size="mini" :type="boost?'primary':''" @click="boost = !boost">唱歌</el-button>
        <el-button size="mini" :type="favoritism?'primary':''" @click="favoritism =! favoritism">偏爱</el-button>
      </el-button-group>
    </div>
    <p></p>
    <el-card>
      <div v-if="showType == 'table'">
        <div v-if="chartsType == 'buffer'">
          <buffer-table :data="bufferList" :hidden="[`nickname`]" />
        </div>
        <div v-else>
          <center-table :data="centerList" :hidden="[`nickname`]" />
        </div>
      </div>
      <div v-if="showType == 'charts'">
        <div v-if="chartsType == 'buffer'">
          <buffer-chart
            ref="chart"
            :data="bufferList"
            :height="bufferList.length * 100 + 120 +'px'"
          />
        </div>
        <div v-else>
          <center-chart :data="centerList" :height="centerList.length * 70 + 120 +'px'" />
        </div>
      </div>
    </el-card>
    <p></p>
  </div>
</template>
<script>
import adapter from "@/utils/adapter.js";
export default {
  created() {
    this.getData();
  },
  components: {
    "center-chart": () => import("@/components/charts/characterList/Center"),
    "buffer-chart": () => import("@/components/charts/characterList/Buffer"),
    "buffer-table": () => import("@/components/table/characterList/Buffer"),
    "center-table": () => import("@/components/table/characterList/Center"),
  },
  computed: {
    bufferData() {
      let result = [];
      this.characterList.forEach((element) => {
        if (element.job === "奶") result.push(element);
      });
      return result;
    },
    bufferList() {
      let data = this.bufferData;
      let result = data.map((value) => {
        let payload = {
          bufferData: value,
          hasSystemBuff: false,
          boost: this.boost,
          favoritism: this.favoritism,
          templateCharacter: this.$store.state.setting.setting
            .templateCharacter,
        };
        value.LiftRatioDefault = adapter.GetLiftRatio(payload);
        payload.hasSystemBuff = true;
        value.LiftRatioBurst = adapter.GetLiftRatio(payload);
        value = adapter.BufferDataAdapter(payload);
        return value;
      });
      return result;
    },
    centerList() {
      let result = [];
      switch (this.chartsType) {
        case "center":
          this.characterList.forEach((element) => {
            if (element.job !== "奶") result.push(element);
          });
          break;
        case "dealer":
          this.characterList.forEach((element) => {
            if (element.job === "纯C") result.push(element);
          });
          break;
        case "synergy":
          this.characterList.forEach((element) => {
            if (element.job === "辅C") result.push(element);
          });
          break;
      }
      return result;
    },
  },
  methods: {
    getData() {
      this.$store
        .dispatch("character/getCharacterList", {
          page: 1,
          pageSize: 100,
        })
        .then((data) => {
          const result = data;
          this.count = result.count;
          this.characterList = result.list;
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
      count: 0,
      characterList: [],
      showType: "table",
      chartsType: "center",
      boost: true,
      favoritism: true,
    };
  },
};
</script>
<style scoped>
.flex-box {
  display: flex;
}
.gutter {
  margin: 0 5px 0 5px;
}
</style>