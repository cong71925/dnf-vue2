<template>
  <ve-chart
    ref="charts"
    :data="chartData"
    :extend="chartExtend"
    :toolbox="toolbox"
    :height="height"
    :data-zoom="dataZoom"
    :settings="chartSettings"
    :legend="chartLegend"
    :not-set-unchange="['legend', 'dataZoom']"
  />
</template>
<script>
import mixin from "./mixin.js";
export default {
  props: ["data", "height", "fullScreen", "isFullScreen"],
  mixins: [mixin],
  computed: {
    chartData() {
      return {
        columns: ["create_time", "damage_15s", "damage_20s"],
        rows: this.data,
      };
    },
    chartSettings() {
      return {
        scale: [true, true],
        type: this.typeArr[this.typeIndex],
        labelMap: {
          create_time: "提交时间",
          damage_15s: "15s绿沙袋伤害(亿)",
          damage_20s: "20s绿沙袋伤害(亿)",
        },
      };
    },
    toolbox() {
      const options = this.myToolOptions;
      let index = this.typeIndex + 1;
      if (index >= this.typeArr.length) {
        index = 0;
      }
      return {
        width: "30%",
        feature: {
          myToolChartsType: {
            show: true,
            title: options[this.typeArr[index]].title,
            icon: options[this.typeArr[index]].icon,
            onclick: () => {
              this.typeIndex++;
              if (this.typeIndex >= this.typeArr.length) {
                this.typeIndex = 0;
              }
            },
          },
          myToolFullScreen: {
            show: this.fullScreen,
            title: this.isFullScreen
              ? options.shrinkScreen.title
              : options.fullScreen.title,
            icon: this.isFullScreen
              ? options.shrinkScreen.icon
              : options.fullScreen.icon,
            onclick: () => {
              this.resize();
            },
          },
        },
      };
    },
  },
  data() {
    return {
      typeArr: ["line", "histogram"],
      typeIndex: 0,
    };
  },
};
</script>