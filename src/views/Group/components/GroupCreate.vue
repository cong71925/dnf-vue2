<template>
  <el-dialog title="创建团队" :visible.sync="visible" width="90%">
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
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm('form')">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: ["dialogVisible"],
  watch: {
    dialogVisible(val) {
      this.visible = val;
    },
    visible(val) {
      this.$emit("update:dialogVisible", val);
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("group/createGroup", this.form)
            .then(() => {
              this.$message({
                  showClose: true,
                  type: "success",
                  message: "添加成功!"
                });
                this.$refs[formName].resetFields();
                this.$emit("update");
                this.visible = false;
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
    const rules = {
      group_name: [
        { required: true, message: "请输入团队名称", trigger: "blur" },
        { min: 1, max: 20, message: "长度在 0 到 20 个字符", trigger: "blur" }
      ],
      join_password: [
        { required: true, message: "请输入加入密码", trigger: "blur" },
        { min: 6, max: 6, message: "长度在6个字符", trigger: "blur" }
      ]
    };
    return {
      form: {
        group_name: "",
        join_password: null,
        attendable: true
      },
      rules,
      visible: this.dialogVisible
    };
  }
};
</script>
<style>
.card {
  text-align: center;
}
.character_info {
  text-align: left;
}
</style>
