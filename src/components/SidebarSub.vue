<template>
  <div>
    <el-tooltip
      class="item"
      effect="dark"
      :content="tooltip"
      placement="right"
      :disabled="tooltip==null"
    >
      <div class="sidebar-sub" @click="active=!active">
        <div>
          <slot name="icon" class="icon"></slot>
          <slot name="title" class="title"></slot>
        </div>
        <div></div>
        <i :class="active?'el-icon-arrow-up':'el-icon-arrow-down'" />
      </div>
    </el-tooltip>
    <el-collapse-transition>
      <div v-show="active" class="context">
        <slot></slot>
      </div>
    </el-collapse-transition>
  </div>
</template>
<script>
export default {
  name: "sidebar-sub",
  props: {
    tooltip: String,
  },
  watch: {
    activeIndex(val) {
      this.$children.forEach((value) => {
        value.activeIndex = val;
      });
    },
    router(val) {
      this.$children.forEach((value) => {
        value.router = val;
      });
    },
  },
  computed: {
    isActive() {
      if (this.index === this.activeIndex && this.index != null) {
        return true;
      } else {
        return false;
      }
    },
  },
  mounted() {
    this.$children.forEach((value) => {
      value.activeIndex = this.activeIndex;
      value.router = this.router;
    });
  },
  data() {
    return {
      activeIndex: "",
      router: false,
      active: false,
    };
  },
};
</script>
<style scoped>
.sidebar-sub {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  line-height: 50px;
  padding: 0 17px 0 17px;
  font-size: 14px;
  color: #303133;
  list-style: none;
  cursor: pointer;
  position: relative;
  box-sizing: border-box;
  white-space: nowrap;
  transition: border-color 0.3s, background-color 0.3s, color 0.3s;
}
.context {
  margin: 0 0 0 10px;
}
.icon {
  margin: 0 5px 0 5px;
}
.title {
  margin-right: 5px;
}
.sidebar-sub:hover {
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
