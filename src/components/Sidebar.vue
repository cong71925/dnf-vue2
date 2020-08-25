<template>
  <div class="sidebar">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "sidebar",
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
  mounted() {
    this.$children.forEach((value) => {
      value.activeIndex = this.activeIndex;
      value.router = this.router;
    });
  },
  props: {
    activeIndex: String,
    router: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style scoped>
.sidebar {
  height: 100%;
  border-right-style: solid;
  border-width: 1px;
  border-color: #d8d8d8;
}
</style>
