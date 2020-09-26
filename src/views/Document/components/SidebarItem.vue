<!-- 递归树形侧边栏组件 -->
<template>
  <sidebar-item v-if="!hasChild" :index="`/document/${model.value}`">{{ model.label }}</sidebar-item>
  <sidebar-sub v-else>
    <span slot="icon">{{ model.label }}</span>
    <my-sidebar-item
      v-for="item in model.children"
      :model="item"
      :activeName="activeName"
      :key="item.value"
    >{{ item.label }}</my-sidebar-item>
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
    activeName: {
      handler(val) {
        this.$children.forEach((value) => {
          value.activeIndex = val;
        });
      },
      immediate: true,
    },
  },
  mounted() {
    this.$children.forEach((value) => {
      value.activeIndex = this.activeName;
    });
  },
  props: ["model", "activeName"],
  data() {
    return {
      activeIndex: "",
    };
  },
};
</script>