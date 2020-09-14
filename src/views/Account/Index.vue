<template>
  <el-container>
    <el-aside width="auto">
      <sidebar :activeIndex="activeName" :router="true">
        <sidebar-item index="/account/home" tooltip="个人信息">
          <i class="el-icon-odometer"></i>
          <span slot="title">个人信息</span>
        </sidebar-item>
        <sidebar-item index="/account/infomodify" tooltip="信息修改">
          <i class="el-icon-info"></i>
          <span slot="title">信息修改</span>
        </sidebar-item>
        <sidebar-item index="/account/passwordmodify" tooltip="修改密码">
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
import Sidebar from "@/components/Sidebar.vue";
import SidebarItem from "@/components/SidebarItem.vue";
export default {
  components: { Sidebar, SidebarItem },
  computed: {
    activeName() {
      return this.$route.path;
    },
  },
  created() {
    this.getData();
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
    return {};
  },
};
</script>
