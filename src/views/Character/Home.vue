<template>
  <div class="container">
    <div class="button-panel">
      <el-button icon="el-icon-plus" @click="createPanel()">添加角色</el-button>
      <div class="gutter"></div>
      <el-button-group class="button-group">
        <el-button :type="boost?'primary':''" @click="boost = !boost">唱歌</el-button>
        <el-button :type="favoritism?'primary':''" @click="favoritism =! favoritism">偏爱</el-button>
      </el-button-group>
      <div class="gutter"></div>
      <el-button @click="getList">角色信息列表</el-button>
    </div>
    <p></p>
    <div class="main-panel">
      <el-row :gutter="20">
        <div v-for="item in characterList" :key="item.id">
          <character-item
            :job="job"
            :classSub="classSub"
            :boost="boost"
            :favoritism="favoritism"
            :character="item"
            @update="getData(page)"
            @getHistoricalData="getHistoricalData"
            @createPanel="createPanel"
          />
        </div>
      </el-row>
    </div>
    <el-pagination
      layout="prev, pager, next"
      :total="count"
      :current-page="Number(page)"
      @current-change="handleCurrentChange"
      :page-size="pageSize"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  props: {
    page: {
      default: "1",
    },
  },
  components: { "character-item": () => import("./components/CharacterCard") },
  created() {
    this.getData();
  },
  methods: {
    getData(page = this.page) {
      this.$store
        .dispatch("character/getCharacterList", {
          page: page,
          pageSize: this.pageSize,
        })
        .then((data) => {
          const result = data;
          this.count = result.count;
          this.characterList = result.list;
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
      this.$router.push({ path: `/character/${val}` });
      this.getData(val);
    },
    getHistoricalData(character) {
      this.createPanel({
        title: `历史数据: ${character.character_name}`,
        type: "history",
        data: character,
      });
    },
    getList(){
      this.createPanel({
        title: `角色信息列表`,
        type: "list",
      });
    },
    createPanel(
      payload = {
        title: "添加角色",
        type: "add",
      }
    ) {
      this.$emit("createPanel", payload);
    },
  },
  data() {
    const job = require("@/data/job.json").options;
    const classSub = require("@/data/class.json").options;
    return {
      character: {},
      job,
      classSub,
      characterList: [],
      boost: true,
      favoritism: true,
      count: 0,
      pageSize: 8,
    };
  },
};
</script>
<style scoped>
.container {
  min-height: calc(100vh - 146px);
  display: flex;
  flex-direction: column;
}

.button-panel {
  display: flex;
}
.gutter {
  margin: 0 5px 0 5px;
}
.main-panel {
  flex: 1;
}
.character_info {
  text-align: left;
}
</style>
