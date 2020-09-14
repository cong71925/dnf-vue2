<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>
        <router-link to="/">首页</router-link>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <router-link to="/setting/home">系统信息</router-link>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <router-link to="/setting/buffer">提升率模板</router-link>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <p></p>
    <el-alert
      title="计算模板说明"
      type="info"
      description="本页面用于修改输出类职业的三攻、力智以及受到的系统奶加成的模板；该模板用于计算奶系职业对输出类职业的相对提升率。"
      show-icon
    ></el-alert>
    <p></p>
    <el-card class="form">
      <el-form status-icon :model="form" :rules="rules" ref="form">
        <el-form-item label="模板C三攻: (默认2600)" prop="atk">
          <el-input maxlength="20" v-model.number="form.atk"></el-input>
        </el-form-item>
        <el-form-item label="模板C力智: (默认4600)" prop="strInt">
          <el-input maxlength="20" v-model.number="form.strInt"></el-input>
        </el-form-item>
        <el-form-item label="系统奶数值: (默认10000)" prop="systemBuff">
          <el-input maxlength="20" v-model.number="form.systemBuff"></el-input>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item>
          <div class="flex-box">
            <el-button type="primary" @click="submitForm('form')">修改</el-button>
            <div class="gutter"></div>
            <el-popconfirm
              confirmButtonText="确定"
              cancelButtonText="取消"
              icon="el-icon-info"
              iconColor="red"
              title="您确定要重置到默认状态吗？"
              @onConfirm="resetLiftRatioTemplate"
            >
              <el-button type="danger" slot="reference">重置</el-button>
            </el-popconfirm>
          </div>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store
            .dispatch("setting/changeLiftRatioTemplate", this.form)
            .then(() => {
              this.$message({
                showClose: true,
                type: "success",
                message: "修改成功",
              });
              this.$router.push("/setting/home");
            })
            .catch((msg) => {
              this.$message({
                showClose: true,
                type: "error",
                message: msg,
              });
            });
        } else {
          return false;
        }
      });
    },
    async resetLiftRatioTemplate() {
      await this.$store.dispatch("setting/resetLiftRatioTemplate");
      await this.$store.dispatch("setting/loadSetting");
      const templateCharacter = this.$store.state.setting.setting
        .templateCharacter;
      this.form.atk = templateCharacter.atk;
      this.form.strInt = templateCharacter.strInt;
      this.form.systemBuff = templateCharacter.systemBuff;
    },
  },
  data() {
    const templateCharacter = this.$store.state.setting.setting
      .templateCharacter;
    const rules = {
      atk: [{ required: true, message: "模板C三攻", trigger: "blur" }],
      strInt: [{ required: true, message: "模板C力智", trigger: "blur" }],
      systemBuff: [{ required: true, message: "系统奶数值", trigger: "blur" }],
    };
    return {
      form: {
        atk: templateCharacter.atk,
        strInt: templateCharacter.strInt,
        systemBuff: templateCharacter.systemBuff,
      },
      rules,
    };
  },
};
</script>
<style scoped>
@media (min-width: 500px) {
  .form {
    width: 100%;
  }
}
@media (min-width: 768px) {
  .form {
    width: 70%;
  }
}
@media (min-width: 1200px) {
  .form {
    width: 50%;
  }
}
.form {
  margin: auto;
}
.flex-box {
  display: flex;
  flex-direction: row-reverse;
}
.gutter {
  margin: 0 5px 0 5px;
}
</style>
