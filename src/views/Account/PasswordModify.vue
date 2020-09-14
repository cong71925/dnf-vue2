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
        <router-link to="/account/passwordmodify">修改密码</router-link>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <p></p>
    <el-card class="form">
      <el-form status-icon :model="form" :rules="rules" ref="form">
        <el-form-item label="请输入当前登录的密码" prop="passwordOld">
          <el-input maxlength="20" v-model="form.passwordOld" show-word-limit show-password></el-input>
        </el-form-item>
        <el-form-item label="请输入要修改的密码" prop="passwordNew">
          <el-input maxlength="20" v-model="form.passwordNew" show-word-limit show-password></el-input>
        </el-form-item>
        <el-form-item label="请再次输入修改的密码" prop="passwordCheck">
          <el-input maxlength="20" show-word-limit show-password v-model="form.passwordCheck"></el-input>
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
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("account/passwordModify", this.form)
            .then(() => {
              this.$message({
                showClose: true,
                type: "success",
                message: "修改成功"
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
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  data() {
    let form = {
      passwordOld: "",
      passwordNew: "",
      passwordCheck: ""
    };
    const checkPass = (rule, value, callback) => {
      if (value !== this.form.passwordNew) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    const rules = {
      passwordOld: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
      ],
      passwordNew: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
      ],
      passwordCheck: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" },
        { validator: checkPass, trigger: "blur" }
      ]
    };
    return {
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
