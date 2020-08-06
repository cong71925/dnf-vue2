<template>
  <el-container>
    <el-aside width="auto">
      <!-- <el-menu :router="true" :collapse="isCollapse" :default-active="activeName">
        <el-menu-item index="/account/home">
          <i class="el-icon-odometer"></i>
          <span slot="title">个人信息</span>
        </el-menu-item>
        <el-menu-item index="/account/infomodify">
          <i class="el-icon-info"></i>
          <span slot="title">信息修改</span>
        </el-menu-item>
        <el-menu-item index="/account/passwordmodify">
          <i class="el-icon-setting"></i>
          <span slot="title">修改密码</span>
        </el-menu-item>
      </el-menu>-->
      <sidebar :activeIndex="activeName">
        <sidebar-item index="/account/home">
          <i class="el-icon-odometer"></i>
          <span slot="title">个人信息</span>
        </sidebar-item>
        <sidebar-item>
          <i class="el-icon-info"></i>
          <span slot="title">信息修改</span>
        </sidebar-item>
        <sidebar-item>
          <i class="el-icon-setting"></i>
          <span slot="title">修改密码</span>
        </sidebar-item>


      </sidebar>
    </el-aside>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>
<script>
import sidebar from "@/components/Sidebar.vue";
import sidebarItem from "@/components/SidebarItem.vue";

export default {
  components: { sidebar: sidebar, "sidebar-item": sidebarItem },
  computed: {
    activeName() {
      return this.$route.path;
    },
  },
  watch: {
    screenWidth(val) {
      if (!this.timer) {
        this.screenWidth = val;
        this.timer = true;
        let that = this;
        setTimeout(function () {
          if (that.screenWidth < 768) {
            that.isCollapse = true;
          } else {
            that.isCollapse = false;
          }
          that.timer = false;
        }, 1000);
      }
    },
  },
  created() {
    this.getData();
  },
  mounted() {
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        this.screenWidth = window.screenWidth;
      })();
    };
  },
  methods: {
    getData() {
      this.$store.dispatch("account/getUserInfo").catch((msg) => {
        this.$message({
          showClose: true,
          type: "error",
          message: msg,
        });
      });
      this.$store.dispatch("account/getCharacterTypeNums").catch((msg) => {
        this.$message({
          showClose: true,
          type: "error",
          message: msg,
        });
      });
    },
  },
  data() {
    let screenWidth = document.body.clientWidth;
    let isCollapse = false;
    if (screenWidth < 768) {
      isCollapse = true;
    }
    return {
      screenWidth,
      isCollapse,
    };
  },
};
</script>
<style scoped>
.el-menu {
  height: 100%;
  background-color: rgba(255, 255, 255, 0);
}
</style>
