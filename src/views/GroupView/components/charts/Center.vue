<template>
  <ve-bar
    ref="charts"
    :data="chartData"
    :extend="chartExtend"
    :height="height"
    :settings="chartSettings"
  />
</template>
<script>
export default {
  props: ["data", "height"],
  computed: {
    centerList() {
      return this.data;
    },
    chartData() {
      return {
        columns: ["character_name", "damage_15s", "damage_20s"],
        rows: this.centerList,
      };
    },
  },
  methods: {
    resize() {
      this.$refs.charts.echarts.resize();
    },
  },
  data() {
    return {
      chartExtend: {
        series: {
          label: { show: true, position: "right" },
        },
      },
      chartSettings: {
        labelMap: {
          character_name: "角色名",
          damage_15s: "15s绿沙袋伤害",
          damage_20s: "20s绿沙袋伤害",
        },
        dataOrder: { label: "damage_20s", order: "desc" },
      },
    };
  },
};
</script>
<style scoped>
.title {
  font-weight: 600;
}
</style>
