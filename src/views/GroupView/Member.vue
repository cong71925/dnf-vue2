<template>
  <div>
    <CharacterHistoricalData
      :dialogVisible.sync="historicalVisible"
      :character="character"
      :controlVisible="false"
    />
    <el-page-header @back="$router.push('/group')" content="成员详情"></el-page-header>
    <p></p>
    <div class="collapse">
      <el-collapse accordion>
        <el-collapse-item v-for="item in $store.state.group.memberSort" :key="item.index">
          <template slot="title">
            <h3>{{ item[0].nickname }}</h3>
            <el-badge type="info" :value="item.length" />
          </template>
          <GroupMemberItem :memberInfo="item" @getHistoricalData="getHistoricalData" />
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script>
import CharacterHistoricalData from "@/components/CharacterHistoricalData";
import GroupMemberItem from "./components/GroupMemberItem.vue";
export default {
  components: { CharacterHistoricalData, GroupMemberItem },
  methods: {
    getHistoricalData(character) {
      this.historicalVisible = true;
      this.character = character;
    },
    getMemberList() {
      this.axios({
        method: "post",
        data: {
          action: "getMemberList",
          data: {
            user_id: this.$store.state.user_id,
            user_token: this.$store.state.user_token,
            group_id: this.$route.params.id
          }
        }
      })
        .then(response => {
          if (response.data.state === "success") {
            this.memberList = response.data.result;
          } else {
            this.$message({
              showClose: true,
              type: "error",
              message: "获取数据错误！"
            });
            console.log(response.data);
          }
        })
        .catch(response => {
          console.log(response.data);
        });
    }
  },
  data() {
    return {
      memberList: this.$store.state.group.memberSort,
      character: {},
      historicalVisible: false,
      historicalJob: null,
      characterID: null,
      class1: null
    };
  }
};
</script>
<style scoped>
.collapse {
  background-color: rgb(255, 255, 255);
  padding: 0 15px 0 15px;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>


