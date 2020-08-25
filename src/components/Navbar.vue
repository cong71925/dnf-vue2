<template>
  <div class="navbar">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "navbar",
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
.navbar {
  width: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
}
</style>