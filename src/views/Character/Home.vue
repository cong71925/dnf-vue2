<template>
  <el-container>
    <el-main>
      <characterAdd :dialogVisible.sync="addVisible" @update="getData(page)" />
      <characterHistoricalData
        :dialogVisible.sync="historicalVisible"
        :controlVisible="true"
        :character="character"
        @update="getData(page)"
      />
      <el-row :gutter="10">
        <el-col :xs="8" :sm="6" :md="4" :lg="3">
          <el-button icon="el-icon-plus" @click="addVisible = true" style="width:100%;">添加角色</el-button>
        </el-col>
        <el-col :xs="8" :sm="6" :md="4" :lg="3">
          <el-button-group class="button-group" style="width:100%;">
            <el-button :type="boost?'primary':''" @click="boost = !boost" style="width:50%;">唱歌</el-button>
            <el-button :type="favoritism?'primary':''" @click="favoritism =! favoritism" style="width:50%;">偏爱</el-button>
          </el-button-group>
        </el-col>
      </el-row>
      <el-divider />
      <el-row :gutter="20">
        <div v-for="item in characterList" :key="item.id">
          <characterItem
            :job="job"
            :classSub="classSub"
            :boost="boost"
            :favoritism="favoritism"
            :character="item"
            @update="getData(page)"
            @getHistoricalData="getHistoricalData"
          />
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
import characterItem from "./components/CharacterItem.vue";
import characterAdd from "./components/CharacterAdd.vue";
import characterHistoricalData from "@/components/CharacterHistoricalData";
export default {
  props: ["page"],
  components: { characterItem, characterAdd, characterHistoricalData },
  created: function() {
    this.getData(this.page);
  },
  methods: {
    getData(page) {
      this.$store
        .dispatch("character/getCharacterList", {
          page: page,
          pageSize: this.pageSize
        })
        .then(() => {
          let character = this.$store.state.character;
          this.count = character.count;
          this.characterList = character.characterList;
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
      this.$router.push({ path: `/character/${val}` });
      this.getData(val);
    },
    getHistoricalData(character) {
      this.character = character;
      this.historicalVisible = true;
    }
  },
  data() {
    const job = require("@/data/job.json").options;
    const classSub = require("@/data/class.json").options;
    return {
      character: {},
      addVisible: false,
      historicalVisible: false,
      job,
      classSub,
      characterList: {},
      nums: 0,
      boost: true,
      favoritism: true,
      count: 0,
      pageSize: 12
    };
  }
};
</script>
<style scoped>
.el-card {
  text-align: center;
}
.character_info {
  text-align: left;
}
</style>
