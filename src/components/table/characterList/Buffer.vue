<template>
  <el-table
    :data="data"
    style="width: 100%"
    :default-sort="{prop: 'LiftRatioBurst', order: 'descending'}"
  >
    <el-table-column
      prop="character_name"
      label="角色名"
      v-if="showColumnList.character_name"
      sortable
    ></el-table-column>
    <el-table-column
      prop="class_1"
      label="职业"
      v-if="showColumnList.class_1"
      :filters="classFilters"
      :filter-method="filterHandler"
      sortable
    ></el-table-column>
    <el-table-column
      prop="nickname"
      label="所属成员"
      v-if="showColumnList.nickname"
      :filters="nicknameFilters"
      :filter-method="filterHandler"
      sortable
    ></el-table-column>
    <el-table-column prop="buff_default" label="常驻力智" sortable></el-table-column>
    <el-table-column prop="buff_atk" label="常驻三攻" sortable></el-table-column>
    <el-table-column prop="buff_burst" label="太阳力智" sortable></el-table-column>
    <el-table-column prop="LiftRatioDefault" label="无系统奶提升率" sortable></el-table-column>
    <el-table-column prop="LiftRatioBurst" label="有系统奶提升率" sortable></el-table-column>
  </el-table>
</template>
<script>
import mixin from "./mixin.js";
export default {
  mixins: [mixin],
};
</script>