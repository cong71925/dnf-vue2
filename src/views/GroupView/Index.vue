<template>
  <el-container>
    <el-aside width="auto">
      <sidebar :activeIndex="activeName">
        <sidebar-item :index="`/groupview/${id}/home`" tooltip="团队总览">
          <i class="el-icon-odometer"></i>
          <span slot="title">团队总览</span>
        </sidebar-item>
        <sidebar-item
          :index="`/groupview/${id}/member`"
          tooltip="成员信息"
        >
          <i class="el-icon-s-custom"></i>
          <span slot="title">成员信息</span>
        </sidebar-item>
        <sidebar-item
          :index="`/groupview/${id}/character`"
          tooltip="角色总览"
        >
          <i class="el-icon-user"></i>
          <span slot="title">角色总览</span>
        </sidebar-item>
        <sidebar-item
          :index="`/groupview/${id}/setting`"
          tooltip="团队管理"
        >
          <i class="el-icon-setting"></i>
          <span slot="title">团队管理</span>
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
  props: ["id"],
  components: { "sidebar": sidebar, "sidebar-item": sidebarItem },
  computed: {
    activeName() {
      return this.$route.path;
    },
  },
  created: function () {
    this.getGroupInfo();
    this.getGroupMember();
    this.getMemberInfo();
  },
  methods: {
    getGroupInfo() {
      this.$store
        .dispatch("group/getGroupInfo", this.id)
        .then(() => {})
        .catch((msg) => {
          this.$message({
            showClose: true,
            type: "error",
            message: msg,
          });
        });
    },
    getGroupMember() {
      this.$store
        .dispatch("group/getGroupMember", this.id)
        .then(() => {})
        .catch((msg) => {
          this.$message({
            showClose: true,
            type: "error",
            message: msg,
          });
        });
    },
    getMemberInfo() {
      this.$store
        .dispatch("group/getGroupCharacter", this.id)
        .then(() => {})
        .catch((msg) => {
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
<style scoped>
.el-menu {
  height: 100%;
}
</style>
