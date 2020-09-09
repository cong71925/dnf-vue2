<template>
  <el-table
    :data="data"
    style="width: 100%"
    :default-sort="{prop: 'LiftRatioBurst', order: 'descending'}"
  >
    <el-table-column prop="character_name" label="角色名" sortable></el-table-column>
    <el-table-column
      prop="class_1"
      label="职业"
      :filters="classFilters"
      :filter-method="filterHandler"
      sortable
    ></el-table-column>
    <el-table-column
      prop="nickname"
      label="所属成员"
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
export default {
  props: ["data"],
  computed: {
    classFilters() {
      let map = new Map();
      let result = [];
      for (let i of this.data) {
        if (!map.has(i.class_1)) {
          map.set(i.class_1, i.class_1);
        }
      }
      map.forEach((value, index) => {
        result.push({ text: index, value: index });
      });
      return result;
    },
    nicknameFilters() {
      let map = new Map();
      let result = [];
      for (let i of this.data) {
        if (!map.has(i.nickname)) {
          map.set(i.nickname, i.nickname);
        }
      }
      map.forEach((value, index) => {
        result.push({ text: index, value: index });
      });
      return result;
    },
  },
  methods: {
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
  },
};
</script>