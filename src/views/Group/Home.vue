<template>
  <el-container>
    <el-main>
      <div class="button-group">
        <router-link to="/group/create">
          <el-button type="primary" icon="el-icon-plus">创建团队</el-button>
        </router-link>
        <router-link to="/group/search">
          <el-button type="primary" icon="el-icon-search">查找团队</el-button>
        </router-link>
      </div>
      <el-divider></el-divider>
      <el-row :gutter="20">
        <div v-for="item in group" :key="item.id">
          <group-card class="group-card" :group="item" />
        </div>
      </el-row>
    </el-main>
    <el-footer height="30px">
      <el-pagination
        layout="prev, pager, next"
        :total="count"
        :current-page="Number(page)"
        @current-change="handleCurrentChange"
        :page-size="pageSize"
      ></el-pagination>
    </el-footer>
  </el-container>
</template>
<script>
export default {
  props: ["page"],
  components: { "group-card": () => import("./components/GroupCard") },
  created: function () {
    this.getData(this.page);
  },
  methods: {
    getData(page) {
      this.$store
        .dispatch("group/getGroupList", {
          page: page,
          pageSize: this.pageSize,
        })
        .then(() => {
          this.group = this.$store.state.group.groupList;
          this.count = this.$store.state.group.count;
        })
        .catch((msg) => {
          this.$message({
            showClose: true,
            type: "error",
            message: msg,
          });
        });
    },
    handleCurrentChange(val) {
      this.$router.push({ path: `/group/${val}` });
      this.getData(val);
    },
    groupSearch() {
      this.$store
        .dispatch("group/getGroupInfo", this.searchInput)
        .then(() => {
          this.searchVisible = true;
        })
        .catch((msg) => {
          this.$message({
            showClose: true,
            type: "error",
            message: msg,
          });
        });
    },
  },
  data() {
    return {
      count: 0,
      group: [],
      pageSize: 12,
    };
  },
};
</script>
<style scoped>
.card {
  text-align: center;
}
.button-group {
  display: flex;
}
.button-group a {
  margin: 0 5px 0 0;
}
.group-card {
  margin: 5px 0 5px 0;
}
</style>
