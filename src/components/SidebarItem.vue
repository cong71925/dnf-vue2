<template>
  <el-tooltip
    class="item"
    effect="dark"
    :content="tooltip"
    placement="right"
    :disabled="tooltip==null"
  >
    <router-link :to="path == '' ? index : path">
      <div class="sidebar-item" :class="{ 'is-active': isActive }">
        <div class="icon">
          <slot></slot>
        </div>
        <div class="title">
          <slot name="title"></slot>
        </div>
      </div>
    </router-link>
  </el-tooltip>
</template>
<script>
export default {
  name: "sidebar-item",
  computed: {
    isActive() {
      if (this.index === this.activeIndex && this.index != null) {
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
    tooltip: String,
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
.icon {
  margin: 0 5px 0 5px;
}
.title {
  margin-right: 5px;
}
.sidebar-item:hover {
  background: rgba(255, 255, 255, 0.5);
}
@media (max-width: 768px) {
  .title {
    display: none;
  }
  .icon {
    margin: 0 0 0 0;
  }
}
</style>
