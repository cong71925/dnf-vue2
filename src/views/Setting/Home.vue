<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>
        <router-link to="/">首页</router-link>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <router-link to="/setting/home/">系统信息</router-link>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <p></p>
    <el-row :gutter="20">
      <el-col :xs="24" :lg="12">
        <el-card>
          <div class="title">提升率计算模板</div>
          <div class="info">
            <div class="info-left">
              <p>模板C三攻:</p>
              <p>模板C力智:</p>
              <p>系统奶数值:</p>
            </div>
            <div class="info-right">
              <p>{{templateCharacter.atk}}</p>
              <p>{{templateCharacter.strInt}}</p>
              <p>{{templateCharacter.systemBuff}}</p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  computed: {
    templateCharacter() {
      return this.$store.state.setting.setting.templateCharacter;
    },
  },
};
</script>

<style scoped>
.el-card {
  margin: 10px 0 10px 0;
}
.title {
  font-weight: 600;
}
.info {
  display: flex;
}
.info-left {
  min-width: 20%;
}
.info-right {
  margin-left: 20px;
  flex: 1;
}
</style>
