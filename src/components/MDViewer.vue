<template>
  <div v-html="html" class="MDViewer"></div>
</template>

<script>
import marked from "marked";
export default {
  props: {
    data: {
      type: String,
      default: "",
    },
  },
  computed: {
    html() {
      return marked(this.data);
    },
  },
};
</script>
<style lang="scss">
.MDViewer {
  blockquote {
    margin: 0;
    border-left-style: solid;
    border-left-width: 10px;
    border-left-color: #606266;
    padding: 4px 10px 4px 20px;
    background-color: #c0c4cc;
  }
  h1 {
    font-size: 2em;
    padding-bottom: 0.3em;
    border-bottom: 1px solid #eaecef;
  }
  h2 {
    font-size: 1.5em;
    padding-bottom: 0.3em;
    border-bottom: 1px solid #eaecef;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 24px;
    margin-bottom: 16px;
    font-weight: 600;
    line-height: 1.25;
  }
  code {
    padding: 0.2em 0.4em;
    margin: 0;
    font-size: 85%;
    background-color: rgba(27, 31, 35, 0.05);
    border-radius: 6px;
  }
  a {
    color: #409eff;
  }
}
</style>