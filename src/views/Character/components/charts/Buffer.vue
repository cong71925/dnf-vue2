<template>
  <ve-chart
    ref="charts"
    :data="chartData"
    :extend="chartExtend"
    :height="height"
    :data-zoom="dataZoom"
    :settings="chartSettings"
    :toolbox="toolbox"
    :legend="chartLegend"
    :not-set-unchange="['legend', 'dataZoom']"
  />
</template>
<script>
import adapter from "@/utils/adapter.js";
import mixin from "./mixin.js";
export default {
  props: ["data", "height", "fullScreen", "character"],
  mixins: [mixin],
  computed: {
    newData() {
      let data = this.data;
      let result = data.map((value) => {
        let payload = {
          bufferData: value,
          hasSystemBuff: false,
          boost: this.boost,
          favoritism: this.favoritism,
        };
        value.LiftRatioDefault = adapter.GetLiftRatio(
          payload,
          this.character.class_1
        );
        payload.hasSystemBuff = true;
        value.LiftRatioBurst = adapter.GetLiftRatio(
          payload,
          this.character.class_1
        );
        value = adapter.BufferDataAdapter(payload, this.character.class_1);
        return value;
      });
      return result;
    },
    chartData() {
      return {
        columns: [
          "create_time",
          "buff_atk",
          "buff_default",
          "buff_burst",
          "LiftRatioDefault",
          "LiftRatioBurst",
        ],
        rows: this.newData,
      };
    },
    chartSettings() {
      let type = "";
      let showLine = [];
      let stack = { buff: ["buff_atk", "buff_default", "buff_burst"] };
      switch (this.typeArr[this.typeIndex]) {
        case "line&histogram":
          type = "histogram";
          showLine = ["LiftRatioBurst", "LiftRatioDefault"];
          break;
        case "histogram":
          type = "histogram";
          showLine = [];
          break;
        case "line":
          type = "line";
          showLine = [];
          stack = {};
          break;
      }
      return {
        scale: [true, true],
        type: type,
        showLine: showLine,
        axisSite: { right: ["LiftRatioBurst", "LiftRatioDefault"] },
        stack: stack,
        labelMap: {
          create_time: "提交时间",
          buff_atk: "常驻三攻",
          buff_default: "常驻力智",
          buff_burst: "太阳力智",
          LiftRatioDefault: "无系统奶提升率",
          LiftRatioBurst: "有系统奶提升率",
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
          myToolBoost: {
            show:
              this.character.class_1 === "炽天使" ||
              this.character.class_1 === "冥月女神",
            title: this.boost ? options.boost.title : options.isBoost.title,
            icon: this.boost ? options.boost.icon : options.isBoost.icon,
            onclick: () => {
              this.boost = !this.boost;
            },
          },
          myToolFavoritism: {
            show: this.character.class_1 === "冥月女神",
            title: this.favoritism
              ? options.favoritism.title
              : options.isFavoritism.title,
            icon: this.favoritism
              ? options.favoritism.icon
              : options.isFavoritism.icon,
            onclick: () => {
              this.favoritism = !this.favoritism;
            },
          },
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
            show: true,
            title: this.fullScreen
              ? options.shrinkScreen.title
              : options.fullScreen.title,
            icon: this.fullScreen
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
      typeArr: ["line&histogram", "line", "histogram"],
      typeIndex: 0,
      myToolOptions: {
        favoritism: {
          title: "偏爱",
          icon: require("@/components/icon/love/path.json").path,
        },
        isFavoritism: {
          title: "偏爱",
          icon: require("@/components/icon/love_fill/path.json").path,
        },
        boost: {
          title: "唱歌",
          icon: require("@/components/icon/music/path.json").path,
        },
        isBoost: {
          title: "唱歌",
          icon: require("@/components/icon/music_fill/path.json").path,
        },
      },
      favoritism: true,
      boost: true,
    };
  },
};
</script>
