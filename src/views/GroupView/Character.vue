<template>
  <div>
    <el-page-header @back="$router.push('/group')" content="角色总览"></el-page-header>
    <p></p>
    <div class="collapse">
      <el-collapse accordion>
        <el-collapse-item>
          <template slot="title">
            <h3>输出</h3>
            <el-badge type="info" :value="centerList.length" />
          </template>
          <el-button-group class="button-group">
            <el-button
              size="mini"
              :type="centerViewType==='table'?'primary':''"
              @click="centerViewType='table'"
            >表格</el-button>
            <el-button
              size="mini"
              :type="centerViewType==='chart'?'primary':''"
              @click="centerViewType='chart'"
            >条形图</el-button>
          </el-button-group>
          <center-chart
            v-if="centerViewType==='chart'"
            :data="centerList"
            :height="centerList.length * 70 + 100 +'px'"
          />
          <center-table v-show="centerViewType==='table'" :data="centerList" />
        </el-collapse-item>
        <el-collapse-item>
          <template slot="title">
            <h3>纯C</h3>
            <el-badge type="info" :value="dealerList.length" />
          </template>
          <el-button-group class="button-group">
            <el-button
              size="mini"
              :type="dealerViewType==='table'?'primary':''"
              @click="dealerViewType='table'"
            >表格</el-button>
            <el-button
              size="mini"
              :type="dealerViewType==='chart'?'primary':''"
              @click="dealerViewType='chart'"
            >条形图</el-button>
          </el-button-group>
          <center-chart
            v-if="dealerViewType==='chart'"
            :data="dealerList"
            :height="dealerList.length * 70 + 100 +'px'"
          />
          <center-table v-show="dealerViewType==='table'" :data="dealerList" />
        </el-collapse-item>
        <el-collapse-item>
          <template slot="title">
            <h3>辅C</h3>
            <el-badge type="info" :value="synergyList.length" />
          </template>
          <el-button-group class="button-group">
            <el-button
              size="mini"
              :type="synergyViewType==='table'?'primary':''"
              @click="synergyViewType='table'"
            >表格</el-button>
            <el-button
              size="mini"
              :type="synergyViewType==='chart'?'primary':''"
              @click="synergyViewType='chart'"
            >条形图</el-button>
          </el-button-group>
          <center-chart
            v-if="synergyViewType==='chart'"
            :data="synergyList"
            :height="synergyList.length * 70 + 100 +'px'"
          />
          <center-table v-show="synergyViewType==='table'" :data="synergyList" />
        </el-collapse-item>
        <el-collapse-item>
          <template slot="title">
            <h3>奶</h3>
            <el-badge type="info" :value="bufferData.length" />
          </template>
          <el-button-group class="button-group">
            <el-button
              size="mini"
              :type="bufferViewType==='table'?'primary':''"
              @click="bufferViewType='table'"
            >表格</el-button>
            <el-button
              size="mini"
              :type="bufferViewType==='chart'?'primary':''"
              @click="bufferViewType='chart'"
            >条形图</el-button>
          </el-button-group>
          <el-button-group class="button-group">
            <el-button size="mini" :type="boost?'primary':''" @click="boost = !boost">唱歌</el-button>
            <el-button
              size="mini"
              :type="favoritism?'primary':''"
              @click="favoritism =! favoritism"
            >偏爱</el-button>
          </el-button-group>
          <buffer-chart
            v-if="bufferViewType==='chart'"
            :data="bufferList"
            :height="bufferData.length * 100 + 100 +'px'"
          />
          <buffer-table v-show="bufferViewType==='table'" :data="bufferList" />
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script>
import adapter from "@/utils/adapter.js";
import centerChart from "./components/charts/Center";
import bufferChart from "./components/charts/Buffer";
import bufferTable from "./components/table/Buffer";
import centerTable from "./components/table/Center";
export default {
  components: {
    "center-chart": centerChart,
    "buffer-chart": bufferChart,
    "buffer-table": bufferTable,
    "center-table": centerTable,
  },
  created() {},
  computed: {
    characterList() {
      return this.$store.state.group.characterList;
    },
    centerList() {
      let result = [];
      for (let i in this.characterList) {
        if (
          this.characterList[i].job === "纯C" ||
          this.characterList[i].job === "辅C"
        )
          result.push(this.characterList[i]);
      }
      return result;
    },
    dealerList() {
      let result = [];
      for (let i in this.characterList) {
        if (this.characterList[i].job === "纯C")
          result.push(this.characterList[i]);
      }
      return result;
    },
    synergyList() {
      let result = [];
      for (let i in this.characterList) {
        if (this.characterList[i].job === "辅C")
          result.push(this.characterList[i]);
      }
      return result;
    },
    bufferData() {
      let result = [];
      for (let i in this.characterList) {
        if (this.characterList[i].job === "奶")
          result.push(this.characterList[i]);
      }
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
        };
        value.LiftRatioDefault = adapter.GetLiftRatio(payload);
        payload.hasSystemBuff = true;
        value.LiftRatioBurst = adapter.GetLiftRatio(payload);
        value = adapter.BufferDataAdapter(payload);
        return value;
      });
      return result;
    },
  },
  methods: {},
  data() {
    return {
      boost: true,
      favoritism: true,
      centerViewType: "table",
      dealerViewType: "table",
      synergyViewType: "table",
      bufferViewType: "table",
    };
  },
};
</script>
<style scoped>
.el-card__body {
  padding: 5px;
}
.collapse {
  background-color: rgb(255, 255, 255);
  padding: 0 15px 0 15px;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.button-group {
  margin-right: 10px;
}
</style>
