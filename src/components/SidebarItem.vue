<template v-slot:default="activeIndex">
  <div class="sidebar-item" :class="{ 'is-active': isActive }">
    <div class="icon">
      <slot></slot>
    </div>
    <div class="title">
      {{activeIndex}}
      <slot name="title"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "sidebar-item",
  computed: {
    isActive() {
      if (this.index === this.activeIndex) {
        return true;
      } else {
        return false;
      }
    },
  },
  props: {
    index: String,
  },
  methods: {},
  data() {
    return {};
  },
};
</script>
<style scoped>
.sidebar-item {
  display: flex;
  height: 50px;
  line-height: 50px;
  padding: 0 12px 0 12px;
  font-size: 14px;
  color: #303133;
  list-style: none;
  cursor: pointer;
  position: relative;
  box-sizing: border-box;
  white-space: nowrap;
  transition: border-color 0.3s, background-color 0.3s, color 0.3s;
}
.is-active {
  color: #409eff;
}
.title {
  margin-left: 5px;
}
.sidebar-item:hover {
  background: rgba(255, 255, 255, 0.5);
}

@media (max-width: 768px) {
  .title {
    display: none;
  }
}
</style>
