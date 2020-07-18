<template>
  <el-container>
    <el-main>
      <el-button-group>
        <el-button type="primary" icon="el-icon-plus" @click="dialogVisible = true">创建团队</el-button>
        <el-button type="primary" icon="el-icon-search" @click="addVisible = !addVisible">查找团队</el-button>
      </el-button-group>
      <el-divider></el-divider>
      <el-collapse-transition>
        <div v-show="addVisible">
          <el-input placeholder="请输入要查找的团队ID" v-model.number="searchInput">
            <el-tooltip
              class="item"
              effect="dark"
              content="查找团队"
              placement="top-start"
              slot="append"
            >
              <el-button icon="el-icon-search" @click="groupSearch"></el-button>
            </el-tooltip>
          </el-input>
          <el-divider></el-divider>
        </div>
      </el-collapse-transition>
      <el-row :gutter="20">
        <div v-for="item in group" :key="item.id">
          <groupItem :group="item" />
        </div>
      </el-row>
      <groupCreate :dialogVisible.sync="dialogVisible" @update="getData" />
      <groupSearch
        :dialogVisible.sync="searchVisible"
        :searchInput="searchInput"
        @update="getData"
      />
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
import groupItem from "./components/GroupItem";
import groupCreate from "./components/GroupCreate";
import groupSearch from "./components/GroupSearch";
export default {
  props: ["page"],
  components: { groupItem, groupCreate, groupSearch },
  created: function(){
    this.getData(this.page)
  },
  methods: {
    getData(page) {
      this.$store
        .dispatch("group/getGroupList", {
          page: page,
          pageSize: this.pageSize
        })
        .then(() => {
          this.group = this.$store.state.group.groupList
          this.count = this.$store.state.group.count
        })
        .catch(msg => {
          this.$message({
            showClose: true,
            type: "error",
            message: msg
          });
        });
    },
    handleCurrentChange(val) {
      this.$router.push({ path: `/group/${val}` });
      this.getData(val);
    },
    groupSearch() {
      this.$store
        .dispatch("group/groupSearch", this.searchInput)
        .then(() => {
          this.searchVisible = true
        })
        .catch(msg => {
          this.$message({
            showClose: true,
            type: "error",
            message: msg
          });
        });
    }
    
  },
  data() {
    return {
      dialogVisible: false,
      searchVisible: false,
      count: 0,
      group: [],
      searchInput: "",
      addVisible: false,
      pageSize: 12

    };
  }
};
</script>
<style scoped>
.card {
  text-align: center;
}
</style>
