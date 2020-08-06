<template>
  <div>
    <div class="tooltip">
      <div class="title">职业系分布:</div>
      <div>
        <el-button-group class="button-group">
          <el-button
            @click="changeClassType('class_0')"
            :type="classType==='class_0'?'primary':''"
            size="mini"
          >职业大系</el-button>
          <el-button
            @click="changeClassType('class_1')"
            :type="classType==='class_1'?'primary':''"
            size="mini"
          >转职系</el-button>
        </el-button-group>
        <el-button-group class="button-group">
          <el-button
            icon="el-icon-pie-chart"
            @click="changeType('pie')"
            :type="type==='pie'?'primary':''"
            size="mini"
          >饼图</el-button>
          <el-button
            icon="el-icon-data-analysis"
            @click="changeType('bar')"
            :type="type==='bar'?'primary':''"
            size="mini"
          >条形图</el-button>
        </el-button-group>
      </div>
    </div>
    <ve-chart
      :data="chartData"
      :extend="chartExtend"
      :height="height"
      :settings="chartSettings"
      :legend-visible="type!=='bar'"
    />
  </div>
</template>
<script>
export default {
  props: ["data", "height"],
  computed: {
    chartData() {
      let map = new Map();
      const payload = this.data;
      const classType = this.classType;
      for (let i in payload) {
        let temp = [];
        if (map.has(payload[i][classType])) {
          temp = map.get(payload[i][classType]);
          map.set(payload[i][classType], temp + 1);
        } else {
          map.set(payload[i][classType], 1);
        }
      }
      let result = [];
      map.forEach((value, index) => {
        const row = {
          职业: index,
          人数: value
        };
        result.push(row);
      });
      return {
        columns: ["职业", "人数"],
        rows: result
      };
    },
    chartSettings() {
      return {
        dataOrder: {
          label: "人数",
          order: "desc"
        },
        type: this.type,
        limitShowNum: 20,
        radius: 150,
        offsetY: 300
      };
    },
    chartExtend() {
      let result = {};
      if (this.type === "pie") {
        result = {
          series: {
            label: {
              show: true,
              position: "outside",
              formatter: "{b}: {c} ({d}%)"
            }
          }
        };
      }
      if (this.type === "bar") {
        result = {
          series: {
            label: {
              show: true
            }
          }
        };
      }
      return result;
    }
  },
  methods: {
    changeType(type) {
      this.type = type;
    },
    changeClassType(classType) {
      this.classType = classType;
    }
  },
  data() {
    return {
      type: "pie",
      classType: "class_0"
    };
  }
};
</script>
<style scoped>
.tooltip {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  flex-wrap: wrap;
}
.title {
  font-weight: 600;
}
.button-group {
  margin: 0 4px 0 4px;
}
</style>
