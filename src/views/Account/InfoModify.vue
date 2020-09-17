<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>
        <router-link to="/">首页</router-link>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <router-link to="/account/home">个人信息</router-link>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <router-link to="/account/infomodify">信息修改</router-link>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <p></p>
    <el-alert
      title="用户信息修改说明"
      type="info"
      description="用户名一栏请谨慎修改，并保存好修改后的用户名，该栏影响的是账号登录时使用的用户名，谨防丢失。"
      show-icon
    ></el-alert>
    <p></p>
    <el-card class="form">
    <el-form :model="form" status-icon :rules="rules" ref="form">
      <el-form-item label="用户名：" prop="username">
        <el-input v-model="form.username" maxlength="12" show-word-limit placeholder="用于账户登录"></el-input>
      </el-form-item>
      <el-form-item label="昵称：" prop="nickname">
        <el-input v-model="form.nickname" maxlength="12" show-word-limit placeholder="可重复，可修改"></el-input>
      </el-form-item>
      <el-form-item label="冒险团名称：" prop="club">
        <el-input
          v-model="form.club"
          maxlength="20"
          show-word-limit
          placeholder="请填写真实冒险团名称，方便好友找到您"
        ></el-input>
      </el-form-item>
      <el-form-item label="所属服务器：" prop="serverSelect">
        <span class="demonstration"></span>
        <el-cascader
          v-model="form.serverSelect"
          :options="server"
          :props="{ expandTrigger: 'hover' }"
          :key="form.serverSelect[1]"
        ></el-cascader>
      </el-form-item>
      <el-divider></el-divider>
      <el-form-item>
        <el-button type="primary" style="float:right;" @click="submitForm('form')">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  </div>
</template>
<script>
export default {
  computed: {
    userInfo() {
      return this.$store.state.account.userInfo;
    }
  },
  watch: {
    userInfo(val) {
      this.form.username = val.username;
      this.form.nickname = val.nickname;
      this.form.club = val.club;
      this.form.serverSelect[0] = val.server0;
      this.form.serverSelect[1] = val.server1;
    }
  },
  created() {
    if (this.userInfo != null) {
      this.form.username = this.userInfo.username;
      this.form.nickname = this.userInfo.nickname;
      this.form.club = this.userInfo.club;
      this.form.serverSelect[0] = this.userInfo.server0;
      this.form.serverSelect[1] = this.userInfo.server1;
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("account/infoModify", this.form)
            .then(() => {
              this.$message({
                showClose: true,
                type: "success",
                message: "修改成功"
              });
              this.$store.dispatch("account/getUserInfo").catch(msg => {
                this.$message({
                  showClose: true,
                  type: "error",
                  message: msg
                });
              });
              this.$router.push({ name: "AccountHome" });
            })
            .catch(msg => {
              this.$message({
                showClose: true,
                type: "error",
                message: msg
              });
            });
        } else {
          return false;
        }
      });
    }
  },
  data() {
    let form = {
      username: "",
      nickname: "",
      club: "",
      serverSelect: ["", ""]
    };
    const rules = {
      username: [
        { required: true, message: "用户名", trigger: "blur" },
        { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "blur" }
      ],
      nickname: [
        { required: true, message: "请输入昵称", trigger: "blur" },
        { min: 2, max: 12, message: "长度在 2 到 12 个字符", trigger: "blur" }
      ],
      serverSelect: [
        {
          type: "array",
          required: true,
          message: "请选择服务器",
          trigger: "change"
        }
      ],
      club: [
        { required: true, message: "请填写冒险团名称", trigger: "blur" },
        { max: 20, message: "长度在 0 到 20 个字符", trigger: "blur" }
      ]
    };
    const server = require("@/data/server.json").options;
    return {
      server,
      form,
      rules
    };
  }
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
</style>
