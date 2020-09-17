<template>
  <div class="panel">
    <el-container>
      <el-main>
        <el-form :model="form" status-icon :rules="rules" ref="form">
          <el-form-item label="用户名：" prop="username">
            <el-input v-model="form.username" maxlength="12" show-word-limit placeholder="用于账户登录"></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="password">
            <el-input
              v-model="form.password"
              placeholder="请输入密码"
              maxlength="20"
              show-word-limit
              show-password
              autocomplete="off"
              @keyup.enter.native="submitForm('form')"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="submit" @click="submitForm('form')">登录</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  methods: {
    login() {
      this.$store.commit("login");
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("auth/login", {
              username: this.form.username,
              password: this.form.password
            })
            .then(() => {
              this.$message({
                showClose: true,
                type: "success",
                message: "登录成功！"
              });
              this.$router.push({ name: "Home" });
            })
            .catch((msg) => {
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
    if (this.$store.state.isLogin) {
      this.$message({
        showClose: true,
        type: "error",
        message: "您已登录！"
      });
      this.$router.push("/");
    }
    const rules = {
      username: [
        { required: true, message: "用户名", trigger: "blur" },
        { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "blur" }
      ],
      password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
      ]
    };
    return {
      form: {
        username: "",
        password: ""
      },
      rules
    };
  }
};
</script>
<style scoped>
.panel {
  line-height: 200%;
  margin: auto;
  max-width: 600px;
}
.submit {
  margin-top: 30px;
  width: 100%;
  text-align: center;
}
</style>
