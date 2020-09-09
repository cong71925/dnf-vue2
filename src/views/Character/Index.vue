<template>
  <el-container>
    <el-main>
      <el-tabs class="el-tabs" type="card" v-model="index" @tab-remove="removeTab">
        <el-tab-pane class="el-tab-pane" label="主页" name="-1">
          <home @createPanel="createPanel" :page="page" ref="home" />
        </el-tab-pane>
        <el-tab-pane
          :key="item.index"
          v-for="item in tabs"
          :label="item.title"
          :name="item.index"
          closable
        >
          <add v-if="item.type === 'add'" @removeTab="removeTab(item.index)" @update="update" />
          <modify
            v-if="item.type === 'modify'"
            @removeTab="removeTab(item.index)"
            @update="update"
            :character="item.data"
          />
          <history v-if="item.type === 'history'" :character="item.data" />
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>
<script>
import add from "./Add.vue";
import home from "./Home.vue";
import modify from "./Modify.vue";
import history from "./History.vue";
export default {
  components: { add, home, modify, history },
  props: {
    page: {
      default: "1",
    },
  },
  computed: {},
  watch: {
    index: {
      handler(val) {
        this.history.push(val);
      },
      immediate: true,
    },
  },
  mounted() {
    console.log(this.$store.state.character);
    window.addEventListener("beforeunload", this.beforeunload);
  },
  destroyed() {
    window.removeEventListener("beforeunload", this.beforeunload);
  },
  methods: {
    beforeunload(e) {
      if (this.tabs.length !== 0) {
        e.preventDefault();
        e.returnValue = "页面内还有未保存的表单数据";
      }
    },
    removeTab(targetName) {
      let tabs = this.tabs;
      let activeName = this.index;
      tabs.forEach((element, index, arr) => {
        if (element.index === targetName) return arr.splice(index, 1);
      });
      this.history.forEach((element, index, arr) => {
        if (targetName === element) return arr.splice(index, 1);
      });
      if (targetName === activeName) return (this.index = this.history.pop());
    },
    createPanel(payload) {
      const newIndex = ++this.indexCounter + "";
      payload.index = newIndex;
      this.tabs.push(payload);
      this.index = newIndex;
    },
    update() {
      this.$refs.home.getData();
    },
  },
  beforeRouteLeave(to, from, next) {
    if (this.tabs.length !== 0) {
      this.$confirm("页面内还有未保存的表单数据, 是否离开?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        next();
      });
    } else {
      next();
    }
  },
  data() {
    return {
      index: "-1",
      indexCounter: 0,
      tabs: [],
      history: [],
    };
  },
};
</script>
<style scoped>
.el-main {
  padding-top: 0;
  padding-bottom: 0;
}
</style>
