<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>
        <router-link to="/">首页</router-link>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <router-link to="/account/home">个人信息</router-link>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <p></p>
    <el-row :gutter="20">
      <el-col :xs="24" :lg="12">
        <el-card>
          <div class="info">
            <div class="info-left">
              <p>用户名:</p>
              <p>昵称:</p>
            </div>
            <div class="info-right">
              <p>{{ userInfo.username }}</p>
              <p>{{ userInfo.nickname }}</p>
            </div>
          </div>
        </el-card>
        <el-card>
          <div class="info">
            <div class="info-left">
              <p>冒险团名称:</p>
              <p>所属服务器:</p>
            </div>
            <div class="info-right">
              <p>{{ userInfo.club }}</p>
              <p>{{ userInfo.server0 }} / {{ userInfo.server1 }}</p>
            </div>
          </div>
        </el-card>
        <el-card>
          <div class="info">
            <div class="info-left">
              <p>注册时间:</p>
            </div>
            <div class="info-right">
              <p>{{ userInfo.createTime }}</p>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :lg="12">
        <el-card>
          <character-type-charts :data="characterTypeNums" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  components: {
    "character-type-charts": () => import("@/components/charts/distribution/CharacterType.vue"),
  },
  computed: {
    userInfo() {
      return this.$store.state.account.userInfo;
    },
    characterTypeNums() {
      return this.$store.state.account.characterTypeNums;
    },
  },
  methods: {},
  data() {
    return {};
  },
};
</script>
<style scoped>
.el-card {
  margin: 10px 0 10px 0;
}
.info {
  display: flex;
}
.info-left {
  font-weight: 600;
  min-width: 20%;
}
.info-right {
  margin-left: 20px;
  flex: 1;
}
</style>
