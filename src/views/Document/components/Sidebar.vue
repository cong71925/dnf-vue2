<template>
  <sidebar :activeIndex="activeName" :router="true">
    <sidebar-item :model="item" v-for="item in data" :key="item.value" />
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

