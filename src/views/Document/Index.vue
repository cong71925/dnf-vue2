<template>
  <el-container>
    <el-aside width="auto">
      <sidebar :activeName="activeName" :data="index" />
    </el-aside>
    <el-main>
      <el-card>
        <markdown-viewer :data="data" />
      </el-card>
    </el-main>
  </el-container>
</template>
<script>
import axios from "axios";
import Sidebar from "./components/Sidebar.vue";
import MarkdownViewer from "@/components/MDViewer.vue";
export default {
  components: { Sidebar, MarkdownViewer },
  props: ["fileName"],
  computed: {
    activeName() {
      return this.$route.path;
    },
  },
  watch: {
    fileName: {
      handler() {
        this.getData();
      },
      immediate: true,
    },
  },
  created() {
    this.getIndex();
  },
  methods: {
    getData() {
      axios
        .get(`${this.path + this.fileName}.md`)
        .then((result) => {
          this.data = result.data;
        })
        .catch(() => {
          this.data = "";
        });
    },
    getIndex() {
      axios
        .get(`${this.path}index.json`)
        .then((result) => {
          this.index = result.data;
        })
        .catch(() => {});
    },
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
  data() {
    return {
      index: [],
      path: "../static/document/",
      data: "",
    };
  },
};
</script>

