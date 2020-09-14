<template>
  <div>
    <div class="flex-box">
      <el-dropdown @command="handleClick">
        <el-button type="primary" size="mini">
          排序: {{options[index].label}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="(item, index) in options"
            :key="index"
            :command="index"
          >{{item.label}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <ve-bar
      ref="charts"
      :data="chartData"
      :extend="chartExtend"
      :height="height"
      :settings="chartSettings"
      :not-set-unchange="['legend']"
    />
  </div>
</template>
<script>
import mixin from "./mixin.js";
export default {
  props: ["data", "height"],
  mixins: [mixin],
  computed: {
    chartData() {
      return {
        columns: [
          "character_name",
          "buff_atk",
          "buff_default",
          "buff_burst",
          "LiftRatioDefault",
          "LiftRatioBurst",
        ],
        rows: this.data,
      };
    },
    chartSettings() {
      return {
        labelMap: {
          character_name: "角色名",
          buff_atk: "常驻三攻",
          buff_default: "常驻力智",
          buff_burst: "太阳力智",
          LiftRatioDefault: "无系统奶提升率",
          LiftRatioBurst: "有系统奶提升率",
        },
        dataOrder: { label: this.options[this.index].value, order: "desc" },
        stack: {
          buff: ["buff_atk", "buff_default", "buff_burst"],
        },
        xAxisName: ["buff", "LiftRatioDefault", "LiftRatioBurst"],
        axisSite: {
          top: ["LiftRatioDefault", "LiftRatioBurst"],
        },
      };
    },
  },
  methods: {},
  data() {
    return {
      index: 4,
      options: [
        { label: "常驻三攻", value: "buff_atk" },
        { label: "常驻力智", value: "buff_default" },
        { label: "太阳力智", value: "buff_burst" },
        { label: "无系统奶提升率", value: "LiftRatioDefault" },
        { label: "有系统奶提升率", value: "LiftRatioBurst" },
      ],
    };
  },
};
</script>
<style scoped>
.flex-box {
  display: flex;
  flex-direction: row-reverse;
}
</style>