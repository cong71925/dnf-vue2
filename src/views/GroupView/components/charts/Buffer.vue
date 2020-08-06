<template>
  <ve-bar :data="chartData" :extend="chartExtend" :height="height" :settings="chartSettings" />
</template>
<script>
export default {
  props: ["data", "height"],
  computed: {
    chartData() {
      return {
        columns: [
          "character_name",
          "buff_atk",
          "buff_default",
          "buff_burst",
          "LiftRatioDefault",
          "LiftRatioBurst"
        ],
        rows: this.data
      };
    }
  },
  data() {
    return {
      chartExtend: {
        series: {
          label: { show: true }
        }
      },
      chartSettings: {
        labelMap: {
          character_name: "角色名",
          buff_atk: "常驻三攻",
          buff_default: "常驻力智",
          buff_burst: "太阳力智",
          LiftRatioDefault: "无系统奶提升率",
          LiftRatioBurst: "有系统奶提升率"
        },
        dataOrder: { label: "LiftRatioBurst", order: "desc" },
        stack: {
          buff: ["buff_atk", "buff_default", "buff_burst"]
        },
        xAxisName: ["buff", "LiftRatioDefault", "LiftRatioBurst"],
        axisSite: {
          top: ["LiftRatioDefault", "LiftRatioBurst"]
        }
      }
    };
  }
};
</script>
<style scoped>
.title {
  font-weight: 600;
}
</style>
