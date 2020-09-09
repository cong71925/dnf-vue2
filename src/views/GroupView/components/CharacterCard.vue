<template>
  <el-card class="box-card" shadow="hover">
    <div slot="header" class="clearfix">
      <el-image style="width: 40px; height: 40px" :src="url" :fit="'fit'"></el-image>
      <span>{{ character.character_name }}</span>
    </div>
    <div>
      <el-row>
        <el-col :span="12">职责:</el-col>
        <el-col :span="12">{{ character.job }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">职业:</el-col>
        <el-col :span="12">{{ character.class_1 }}</el-col>
      </el-row>
      <div v-if="character.job == '奶'">
        <el-row>
          <el-col :span="12">常驻力智</el-col>
          <el-col :span="12">{{ character.buff_default }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">常驻三攻</el-col>
          <el-col :span="12">{{ character.buff_atk }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">太阳力智</el-col>
          <el-col :span="12">{{ character.buff_burst }}</el-col>
        </el-row>
      </div>
      <div v-else>
        <el-row>
          <el-col :span="12">15s</el-col>
          <el-col :span="12">{{ character.damage_15s }}e</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">20s</el-col>
          <el-col :span="12">{{ character.damage_20s }}e</el-col>
        </el-row>
      </div>
    </div>
    <el-divider />
    <el-button type="primary" icon="el-icon-s-marketing" @click="createPanel" style="width:100%;">历史数据</el-button>
  </el-card>
</template>
<script>
export default {
  props: ['character'],
  methods: {
    createPanel() {
      this.$emit("createPanel", {
        title: "历史数据:" + this.character.character_name,
        type: "history",
        data: this.character,
      });
    },
  },
  data() {
    var url =
      'static/image/face/' +
      this.character.class_0 +
      '/' +
      this.character.class_1 +
      '.png'
    return {
      url
    }
  }
}
</script>
<style scoped>
.el-card__header {
  padding: 5px;
}
.el-image {
  overflow: unset;
}
.el-card__item--card {
  width: 50%;
  min-width: 170px;
}
</style>
