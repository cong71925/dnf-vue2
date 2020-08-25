<template>
  <navbar :activeIndex="activeIndex">
    <div class="navbar-left">
      <div class="navbar-item-group">
        <navbar-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </navbar-item>
        <navbar-item index="/group">
          <i class="el-icon-trophy"></i>
          <span slot="title">我的团队</span>
        </navbar-item>
        <navbar-item index="/character">
          <i class="el-icon-c-scale-to-original"></i>
          <span slot="title">我的角色</span>
        </navbar-item>
        <navbar-item index="/log">
          <i class="el-icon-document"></i>
          <span slot="title">更新日志</span>
        </navbar-item>
      </div>
    </div>

    <el-dropdown v-if="$store.state.auth.isLogin">
      <navbar-item>
        <i class="el-icon-user"></i>
        <span slot="title" class="el-dropdown-link" style="height: 100%;">
          <span class="nickname">{{ $store.state.auth.nickname }}</span>
          <div>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
        </span>
      </navbar-item>
      <el-dropdown-menu slot="dropdown">
        <router-link to="/account/home">
          <el-dropdown-item>个人中心</el-dropdown-item>
        </router-link>
        <el-dropdown-item @click.native="logout()">注销</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dropdown v-else>
      <navbar-item>
        <i class="el-icon-user"></i>
        <span slot="title" style="height: 100%;">
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
      </navbar-item>
      <el-dropdown-menu slot="dropdown">
        <router-link to="/login">
          <el-dropdown-item>登录</el-dropdown-item>
        </router-link>
        <router-link to="/register">
          <el-dropdown-item>注册</el-dropdown-item>
        </router-link>
      </el-dropdown-menu>
    </el-dropdown>
  </navbar>
</template>
<script>
import navbar from "@/components/Navbar";
import navbarItem from "@/components/NavbarItem";
export default {
  name: "Navbar",
  components: { navbar: navbar, "navbar-item": navbarItem },
  computed: {
    activeIndex() {
      const path = this.$route.path;
      const str = path.split("/");
      return "/" + str[1];
    },
  },
  methods: {
    logout() {
      if (this.$store.state.auth.isLogin) {
        this.$store
          .dispatch("auth/logout")
          .then(() => {
            this.$message({
              showClose: true,
              type: "success",
              message: "注销成功！",
            });
            this.$router.push({ name: "Home" });
          })
          .catch((msg) => {
            this.$message({
              showClose: true,
              type: "error",
              message: msg,
            });
          });
      }
    },
  },
};
</script>
<style scoped>
.el-dropdown-link {
  display: flex;
}
.navbar-left {
  flex: 1;
  display: inline-block;
  overflow: auto;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.navbar-item-group {
  display: flex;
}
.nickname {
  display: inline-block;
  text-align: center;
  width: 70px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
