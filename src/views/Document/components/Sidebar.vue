<template>
  <sidebar :activeIndex="activeName" :router="true">
    <sidebar-item v-for="item in data" :model="item" :activeName="activeName" :key="item.value" />
  </sidebar>
</template>
<script>
import Sidebar from "@/components/Sidebar.vue";
import SidebarItem from "./SidebarItem.vue";
export default {
  components: { Sidebar, SidebarItem },
  props: ["activeName", "data"],
};
</script>

