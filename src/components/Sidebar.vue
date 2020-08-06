<template>
  <div class="sidebar">
    <slot :activeIndex="activeIndex"></slot>
  </div>
</template>
<script>
export default {
  name: "sidebar",
  methods: {},
  props: {
    activeIndex: String
  },
  data() {
    return {};
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
