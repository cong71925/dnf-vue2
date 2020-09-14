<template>
  <router-link :to="path == '' ? index : path" class="router-link">
    <div class="navbar-item" :class="{ 'is-active': isActive }">
      <div class="icon">
        <slot></slot>
      </div>
      <div class="title">
        <slot name="title"></slot>
      </div>
    </div>
  </router-link>
</template>
<script>
export default {
  name: "navbar-item",
  computed: {
    isActive() {
      if (this.index === this.activeIndex && this.index != "") {
        return true;
      } else {
        return false;
      }
    },
  },
  props: {
    index: {
      type: String,
      default: "",
    },
    path: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      activeIndex: "",
      router: false,
    };
  },
};
</script>
<style scoped>
.navbar-item {
  display: flex;
  height: 60px;
  line-height: 60px;
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
  border-bottom: 2px solid #409eff;
}
.title {
  margin-left: 5px;
}
.navbar-item:hover {
  background: rgba(255, 255, 255, 0.9);
}
</style>
