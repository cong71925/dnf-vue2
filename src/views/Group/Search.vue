<template>
  <el-container>
    <el-main>
      <el-page-header @back="$router.push(`/group`)" content="查找团队"></el-page-header>
      <p></p>
      <el-input placeholder="请输入要查找的团队名称或ID" @keyup.enter.native="search" v-model="searchInput">
        <el-tooltip class="item" effect="dark" content="查找团队" placement="top-start" slot="append">
          <el-button icon="el-icon-search" @click="search"></el-button>
        </el-tooltip>
      </el-input>
      <el-divider></el-divider>
      <div v-if="resultList.length === 0">
        <not-fount text="暂无数据！" class="not-fount" />
      </div>
      <div v-else>
        <search-card v-for="item in resultList" :key="item.id" :data="item" />
      </div>
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
import searchCard from "./components/SearchCard";
import notFount from "@/components/NotFount";
export default {
  props: { keyword: {}, page: { default: "1" } },
  components: { "search-card": searchCard, "not-fount": notFount },
  created() {
    if (this.keyword !== undefined) this.getData(this.keyword);
  },
  methods: {
    search() {
      if (this.searchInput !== undefined) {
        if (this.searchInput === "") {
          this.$router.push("/group/search");
          this.resultList = []
        } else {
          this.$router.push(`/group/search/${this.searchInput}/${this.page}`);
          this.getData(this.searchInput);
        }
      }
    },
    handleCurrentChange(val) {
      this.$router.push(`/group/search/${this.searchInput}/${val}`);
      this.getData(this.keyword);
    },
    getData(keyword) {
      this.$store
        .dispatch("group/searchGroup", {
          keyword: keyword,
          page: this.page,
          pageSize: this.pageSize,
        })
        .then((result) => {
          console.log(result);
          this.resultList = result.list;
          this.count = result.count;
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
      resultList: [],
      count: 0,
      pageSize: 10,
      searchInput: this.keyword,
    };
  },
};
</script>
<style scoped>
.card {
  text-align: left;
  margin: 5px 0 5px 0;
}
.card:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.4);
}
.card:active {
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
}
.not-fount {
  margin: auto;
}
</style>