<template>
  <el-container>
    <el-aside width="auto">
      <sidebar :activeName="activeName" :data="catalogue" />
    </el-aside>
    <el-main>
      <el-card>
        <not-fount v-if="notFount" text="文档不存在！" />
        <markdown-viewer v-else :data="content" />
      </el-card>
    </el-main>
  </el-container>
</template>
<script>
import Sidebar from "./components/Sidebar.vue";
import MarkdownViewer from "@/components/MDViewer.vue";
export default {
  components: {
    Sidebar,
    MarkdownViewer,
    NotFount: () => import("@/components/NotFount"),
  },
  props: ["fileName"],
  computed: {
    activeName() {
      return this.$route.path;
    },
    catalogue() {
      return this.$store.state.document.catalogue;
    },
  },
  watch: {
    fileName: {
      handler() {
        this.getMD();
      },
      immediate: true,
    },
  },
  created() {
    this.getCatalogue();
  },
  methods: {
    getMD() {
      this.$store
        .dispatch("document/getMD", this.fileName)
        .then((content) => {
          this.content = content;
          this.notFount = false;
        })
        .catch(() => {
          this.notFount = true;
        });
    },
    getCatalogue() {
      this.$store.dispatch("document/getCatalogue").catch((msg) => {
        this.$message({
          showClose: true,
          type: "error",
          message: msg,
        });
      });
    },
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
  data() {
    return {
      path: "../static/document/",
      content: "",
      notFount: false,
    };
  },
};
</script>

