<template>
  <el-col :xs="24" :sm="12" :md="8" :lg="6">
    <el-card>
      <div class="character-info">
        <div class="title">
          <el-image style="width: 40px; height: 40px" :src="imgUrl" fit="fit"></el-image>
          <div>{{ character.character_name }}</div>
        </div>
        <el-row class="context">
          <div>
            <el-col :span="12">职业:</el-col>
            <el-col :span="12">{{ character.class_1 }}</el-col>
            <el-col :span="12">职责:</el-col>
            <el-col :span="12">{{ character.job }}</el-col>
            <div v-if="character.job == '奶'">
              <el-col :span="12">常驻力智:</el-col>
              <el-col :span="12">{{ bufferData.buff_default }}</el-col>
              <el-col :span="12">常驻三攻:</el-col>
              <el-col :span="12">{{ bufferData.buff_atk }}</el-col>
              <el-col :span="12">太阳力智:</el-col>
              <el-col :span="12">{{ bufferData.buff_burst }}</el-col>
              <el-col :span="12">无系统奶提升率:</el-col>
              <el-col :span="12">{{ bufferData.liftRatioDefault }}倍</el-col>
              <el-col :span="12">有系统奶提升率:</el-col>
              <el-col :span="12">{{ bufferData.liftRatioBurst }}倍</el-col>
            </div>
            <div v-else>
              <el-col :span="12">15s绿纱袋:</el-col>
              <el-col :span="12">{{ character.damage_15s }}e</el-col>
              <el-col :span="12">20s绿纱袋:</el-col>
              <el-col :span="12">{{ character.damage_20s }}e</el-col>
            </div>
          </div>
        </el-row>
      </div>
      <el-divider />
      <el-button-group style="width:100%;">
        <el-button
          type="primary"
          icon="el-icon-s-marketing"
          @click="setHistoricalDataVisible"
          style="width:50%;"
        >历史数据</el-button>
        <el-button type="primary" icon="el-icon-edit" style="width:50%;" @click="createPanel">修改信息</el-button>
      </el-button-group>
    </el-card>
  </el-col>
</template>
<script>
import adapter from "@/utils/adapter.js";
export default {
  props: ["character", "boost", "favoritism"],
  computed: {
    bufferData() {
      let data = this.character;
      let payload = {
        bufferData: data,
        hasSystemBuff: false,
        boost: this.boost,
        favoritism: this.favoritism,
        templateCharacter: this.$store.state.setting.setting.templateCharacter
      };
      data.liftRatioDefault = adapter.GetLiftRatio(payload);
      payload.hasSystemBuff = true;
      data.liftRatioBurst = adapter.GetLiftRatio(payload);
      data = adapter.BufferDataAdapter(payload);
      return data;
    },
    imgUrl() {
      const class_0 = this.character.class_0;
      const class_1 = this.character.class_1;
      return `static/image/face/${class_0}/${class_1}.png`;
    },
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.modifyCharacter();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    setHistoricalDataVisible() {
      this.$emit("getHistoricalData", this.character);
    },
    createPanel() {
      this.$emit("createPanel", {
        title: "修改信息:" + this.character.character_name,
        type: "modify",
        data: this.character,
      });
    },
  },
  data() {
    return {};
  },
};
</script>
<style scoped>
.character-info {
  display: flex;
  height: 200px;
  font-size: 14px;
  flex-direction: column;
}
.el-col {
  padding: 2px 0 2px 0;
  margin: auto;
}
.title {
  display: -webkit-flex; /* Safari */
  display: flex;
  align-items: center;
}
.context {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>

