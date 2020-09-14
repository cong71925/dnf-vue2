<template>
  <el-container>
    <el-aside width="auto">
      <sidebar :activeIndex="activeName" :router="true">
        <sidebar-item index="/document/home">简介</sidebar-item>
        <sidebar-sub>
          <span slot="icon">使用说明</span>
          <sidebar-item index="/document/group">我的团队</sidebar-item>
          <sidebar-item index="/document/groupview">团队展示</sidebar-item>
          <sidebar-item index="/document/character">我的角色</sidebar-item>
          <sidebar-item index="/document/account">个人中心</sidebar-item>
          <sidebar-item index="/document/setting">系统设置</sidebar-item>
        </sidebar-sub>
        <sidebar-item index="/document/log">更新日志</sidebar-item>
      </sidebar>
    </el-aside>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>
<script>
import Sidebar from "@/components/Sidebar.vue";
import SidebarSub from "@/components/SidebarSub.vue";
import SidebarItem from "@/components/SidebarItem.vue";
export default {
  components: { Sidebar, SidebarSub, SidebarItem },
  computed: {
    activeName() {
      return this.$route.path;
    },
  },
  data() {
    return {};
  },
};
</script>

