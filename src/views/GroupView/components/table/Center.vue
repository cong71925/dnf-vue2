<template>
  <el-table
    :data="data"
    style="width: 100%"
    :default-sort="{prop: 'damage_20s', order: 'descending'}"
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
    <el-table-column prop="damage_15s" label="15S" sortable></el-table-column>
    <el-table-column prop="damage_20s" label="20S" sortable></el-table-column>
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