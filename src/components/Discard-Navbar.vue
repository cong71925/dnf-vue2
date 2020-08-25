<template>
  <div id="navbar">
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      :router="true"
      :default-active="$route.path"
      style="background-color: rgba(255, 255, 255, 0.9);"
    >
      <el-menu-item index="/">
        <div class="hidden-xs-only">
          <i class="el-icon-s-home"></i>首页
        </div>
        <el-tooltip
          class="item hidden-sm-and-up"
          effect="dark"
          content="首页"
          placement="bottom-start"
        >
          <i class="el-icon-s-home"></i>
        </el-tooltip>
      </el-menu-item>
      <el-menu-item index="/group">
        <div class="hidden-xs-only">
          <i class="el-icon-trophy"></i>我的小团体
        </div>
        <el-tooltip
          class="item hidden-sm-and-up"
          effect="dark"
          content="我的小团体"
          placement="bottom-start"
        >
          <i class="el-icon-trophy"></i>
        </el-tooltip>
      </el-menu-item>
      <el-menu-item index="/character">
        <div class="hidden-xs-only">
          <i class="el-icon-c-scale-to-original"></i>我的角色
        </div>
        <el-tooltip
          class="item hidden-sm-and-up"
          effect="dark"
          content="我的角色"
          placement="bottom-start"
        >
          <i class="el-icon-c-scale-to-original"></i>
        </el-tooltip>
      </el-menu-item>
      <el-menu-item index="/log">
        <div class="hidden-xs-only">
          <i class="el-icon-document"></i>更新日志
        </div>
        <el-tooltip
          class="item hidden-sm-and-up"
          effect="dark"
          content="更新日志"
          placement="bottom-start"
        >
          <i class="el-icon-document"></i>
        </el-tooltip>
      </el-menu-item>

      <el-submenu index id="user" v-if="$store.state.auth.isLogin">
        <template slot="title">
          <i class="el-icon-user"></i>
          <span class="nickname hidden-xs-only">{{ $store.state.auth.nickname }}</span>
        </template>
        <el-menu-item index="/account/home">个人中心</el-menu-item>
        <el-menu-item @click="logout()">注销</el-menu-item>
      </el-submenu>
      <el-submenu index id="user" v-else>
        <template slot="title">
          <i class="el-icon-user"></i>
        </template>
        <el-menu-item index="/login">登录</el-menu-item>
        <el-menu-item index="/register">注册</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
import "element-ui/lib/theme-chalk/display.css";
export default {
  name: "Navbar",
  methods: {
    logout() {
      if (this.$store.state.auth.isLogin) {
        this.$store
          .dispatch("auth/logout")
          .then(() => {
            this.$message({
              showClose: true,
              type: "success",
              message: "注销成功！"
            });
            this.$router.push({ name: "Home" });
          })
          .catch(msg => {
            this.$message({
              showClose: true,
              type: "error",
              message: msg
            });
          });
      }
    }
  },
  data() {
    return {};
  }
};
</script>
<style scoped>
#user {
  float: right;
}
.nickname {
  display:inline-block;
  text-align: center;
  width: 70px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
