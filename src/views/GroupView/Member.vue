<template>
  <div>
    <el-page-header @back="$router.push('/group')" content="成员详情"></el-page-header>
    <p></p>
    <el-tabs class="el-tabs" type="card" v-model="index" @tab-remove="removeTab">
      <el-tab-pane class="el-tab-pane" label="主页" name="-1">
        <div class="collapse">
          <el-collapse v-model="activeName" accordion>
            <el-collapse-item
              v-for="(item, index) in memberSort"
              :key="item.index"
              :name="String(index)"
            >
              <template slot="title">
                <h3>{{ item[0].nickname }}</h3>
                <el-badge type="info" :value="item.length" />
              </template>
              <member-collapse-item
                :characterList="item"
                @createPanel="createPanel"
                :resize="activeName === String(index)"
              />
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-tab-pane>
      <el-tab-pane
        :key="item.index"
        v-for="item in tabs"
        :label="item.title"
        :name="item.index"
        closable
      >
        <history v-if="item.type === 'history'" :character="item.data" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import history from "./History.vue";
import memberCollapseItem from "./components/MemberCollapseItem";
export default {
  components: { history, "member-collapse-item": memberCollapseItem },
  watch: {
    index: {
      handler(val) {
        this.history.push(val);
      },
      immediate: true,
    },
    memberSort: {
      handler(val) {
        for (let i = 0, length = val.length; i < length; i++) {
          this.$set(this.showTypeList, i, "carousel");
        }
      },
      immediate: true,
    },
  },
  computed: {
    memberSort() {
      return this.$store.state.group.memberSort;
    },
  },
  methods: {
    switchShowType(index, showType) {
      this.$set(this.showTypeList, index, showType);
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
  },
  data() {
    return {
      activeName: "",
      showTypeList: [],
      index: "-1",
      indexCounter: 0,
      tabs: [],
      history: [],
    };
  },
};
</script>
<style scoped>
.collapse {
  background-color: rgb(255, 255, 255);
  padding: 0 15px 0 15px;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>


