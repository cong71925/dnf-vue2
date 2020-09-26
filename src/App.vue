<template>
  <el-container id="container" v-loading="$store.state.loading">
    <el-header style="padding: 0 0;">
      <navbar />
    </el-header>
    <el-main id="app">
      <router-view />
    </el-main>
  </el-container>
</template>
<script>
import Navbar from "@/Navbar";
export default {
  components: { Navbar },
  created() {
    // 页面加载时，加载保存在本地的token和配置文件
    this.$store.dispatch("auth/getToken");
    this.$store.dispatch("setting/loadSetting");
  },
  name: "App",
};
</script>
<style>
#container {
  border-radius: 0px;
  min-height: 100vh;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
@media (max-width: 768px) {
  #app {
    padding: 0;
  }
}
#app {
  background-color: rgba(255, 255, 255, 0.3);
}

body {
  margin: 0px;
}

body::before {
  background-size: cover;
  content: "";
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  -webkit-filter: blur(2px);
  filter: blur(2px);
  background: url("./assets/index.jpg") no-repeat;
}
</style>
