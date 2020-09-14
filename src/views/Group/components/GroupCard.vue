<template>
  <el-col :xs="24" :sm="12" :md="8" :lg="6">
    <router-link :to="{ name: 'GroupViewHome', params: { id: group.id }}">
      <el-card>
        <div slot="header">
          {{ group.group_name }}
        </div>
        <el-row>
          <el-col :span="12">id:</el-col>
          <el-col :span="12">{{ group.id }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">创建日期:</el-col>
          <el-col :span="12">{{ getDate }}</el-col>
        </el-row>
      </el-card>
    </router-link>
  </el-col>
</template>
<script>
export default {
  props: ["group"],
  computed: {
    getDate() {
      let date = new Date(this.group.create_time);
      return date.toLocaleDateString();
    },
  },
  methods: {
  },
  data() {
    return {};
  },
};
</script>
<style scoped>
.el-card:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.4);
}
.el-card:active {
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
}
</style>
