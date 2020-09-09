<template>
  <div>
    <template slot="title">
      <h3>{{ memberInfo[0].nickname }}</h3>
      <el-badge type="info" :value="memberInfo.length" />
    </template>
    <el-carousel :interval="4000" type="card" height="350px" v-if="memberInfo!=null">
      <div v-for="item in memberInfo" :key="item.index">
        <el-carousel-item>
          <character-card :character="item" @createPanel="createPanel" />
        </el-carousel-item>
      </div>
    </el-carousel>
    <div style="text-align: center;color:#C0C0C0;" v-else>暂无数据</div>
  </div>
</template>
<script>
import characterCard from "./CharacterCard.vue";
export default {
  props: ["memberInfo"],
  components: { "character-card": characterCard },
  methods: {
    createPanel(payload) {
      this.$emit("createPanel", payload);
    },
  },
  data() {
    return {};
  }
};
</script>