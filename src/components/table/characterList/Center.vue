<template>
  <el-table
    :data="data"
    style="width: 100%"
    :default-sort="{prop: 'damage_20s', order: 'descending'}"
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
    <el-table-column prop="damage_15s" label="15S" sortable></el-table-column>
    <el-table-column prop="damage_20s" label="20S" sortable></el-table-column>
  </el-table>
</template>
<script>
import mixin from "./mixin.js";
export default {
  mixins: [mixin],
};
</script>