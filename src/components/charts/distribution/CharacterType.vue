<template>
  <div>
    <div class="title">角色类型分布:</div>
    <ve-pie :data="chartData" :extend="chartExtend" />
  </div>
</template>
<script>
import VePie from "v-charts/lib/pie.common";
export default {
  props: ["data"],
  components: { "ve-pie": VePie },
  computed: {
    chartData() {
      return {
        columns: ["角色类型", "角色数"],
        rows: [
          { 角色类型: "纯C", 角色数: this.data.centerNums },
          { 角色类型: "辅C", 角色数: this.data.supportNums },
          { 角色类型: "奶", 角色数: this.data.bufferNums },
        ],
      };
    },
  },
  data() {
    return {
      chartExtend: {
        series: {
          label: {
            show: true,
            position: "outside",
            formatter: "{b}: {c} ({d}%)",
          },
        },
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
