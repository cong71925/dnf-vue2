<template>
  <el-container>
    <el-main>
      <el-page-header @back="$router.push(`/group`)" content="创建新团队"></el-page-header>
      <p></p>
      <el-card class="form">
        <el-form :model="form" status-icon :rules="rules" ref="form">
          <el-form-item label="团队名:" prop="group_name">
            <el-input size="mini" v-model="form.group_name" show-word-limit maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="加入密码:" prop="join_password">
            <el-input size="mini" v-model="form.join_password" show-word-limit maxlength="6"></el-input>
          </el-form-item>
          <el-form-item label="允许加入">
            <el-switch v-model="form.attendable"></el-switch>
          </el-form-item>
          <el-divider></el-divider>
          <el-form-item>
            <el-button @click="reset">清空表单</el-button>
            <el-button type="primary" @click="submitForm('form')">确 定</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-main>
  </el-container>
</template>
<script>
export default {
  methods: {
    reset(){
        this.form = new this.baseForm
        this.$refs['form'].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store
            .dispatch("group/createGroup", this.form)
            .then(() => {
              this.$message({
                showClose: true,
                type: "success",
                message: "添加成功!",
              });
              this.$refs[formName].resetFields();
              this.$router.push("/group");
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
  },
  data() {
    const rules = {
      group_name: [
        { required: true, message: "请输入团队名称", trigger: "blur" },
        { min: 1, max: 20, message: "长度在 0 到 20 个字符", trigger: "blur" },
      ],
      join_password: [
        { required: true, message: "请输入加入密码", trigger: "blur" },
        { min: 6, max: 6, message: "长度在6个字符", trigger: "blur" },
      ],
    };
    const baseForm = class {
      group_name = "";
      join_password = null;
      attendable = true;
    };
    return {
      form: new baseForm,
      baseForm: baseForm,
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
</style>