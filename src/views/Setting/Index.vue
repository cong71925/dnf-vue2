<template>
  <el-container>
    <el-aside width="auto">
      <sidebar :activeIndex="activeName" :router="true">
        <sidebar-item index="/setting/home" tooltip="系统信息">
          <i class="el-icon-odometer"></i>
          <span slot="title">系统信息</span>
        </sidebar-item>
        <sidebar-item index="/setting/buffer" tooltip="提升率模板">
          <i class="el-icon-info"></i>
          <span slot="title">提升率模板</span>
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
  methods: {},
  data() {
    return {};
  },
};
</script>
