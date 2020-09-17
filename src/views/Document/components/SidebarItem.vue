<template>
  <sidebar-item v-if="!hasChild" :index="`/document/${model.value}`">{{ model.label }}</sidebar-item>
  <sidebar-sub v-else>
    <span slot="icon">{{ model.label }}</span>
    <my-sidebar-item :model="item" v-for="item in model.children" :key="item.value">{{ item.label }}</my-sidebar-item>
  </sidebar-sub>
</template>
<script>
import SidebarSub from "@/components/SidebarSub.vue";
import SidebarItem from "@/components/SidebarItem.vue";
export default {
  name: "MySidebarItem",
  components: { SidebarSub, SidebarItem },
  computed: {
    hasChild() {
      return this.model.children && this.model.children.length;
    },
  },
  watch: {
    activeIndex(val) {
      this.$children.forEach((value) => {
        value.activeIndex = val;
      });
    },
  },
  props: ["model"],
  data (){
    return {
      activeIndex: "",
    }
  }
};
</script>