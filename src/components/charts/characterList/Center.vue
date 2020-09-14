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
        columns: ["character_name", "damage_15s", "damage_20s"],
        rows: this.data,
      };
    },
    chartSettings() {
      return {
        labelMap: {
          character_name: "角色名",
          damage_15s: "15s绿沙袋伤害",
          damage_20s: "20s绿沙袋伤害",
        },
        dataOrder: { label: this.options[this.index].value, order: "desc" },
      };
    },
  },
  methods: {
    handleClick(index) {
      this.index = index;
    },
  },
  data() {
    return {
      index: 1,
      options: [
        { label: "15s", value: "damage_15s" },
        { label: "20s", value: "damage_20s" },
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
