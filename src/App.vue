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
import navbar from "@/Navbar";
export default {
  components: { navbar: navbar },
  created() {
    this.$store.dispatch("auth/getToken");
  },
  methods: {},
  name: "App",
  data() {
    return {};
  },
};
</script>
<style>
#container {
  border-radius: 0px;
  min-height: 100vh;
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
  background: url("../public/static/image/index.jpg") no-repeat;
}
</style>
