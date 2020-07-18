<template>
  <el-dialog title="查询结果" :visible.sync="visible" width="90%">
    <el-row>
      <el-col :span="12">ID:</el-col>
      <el-col :span="12">{{ $store.state.group.searchInfo.id }}</el-col>
    </el-row>
    <el-row>
      <el-col :span="12">团队名:</el-col>
      <el-col :span="12">{{ $store.state.group.searchInfo.group_name }}</el-col>
    </el-row>
    <el-row>
      <el-col :span="12">创建时间:</el-col>
      <el-col :span="12">{{ $store.state.group.searchInfo.create_time }}</el-col>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-form :model="form" status-icon :rules="rules" ref="form" size="small">
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            maxlength="6"
            show-word-limit
            placeholder="请输入团队加入密码"
            show-password
            autocomplete="off"
          >
            <el-button slot="append" icon="el-icon-plus" @click="joinGroup('form')"></el-button>
          </el-input>
        </el-form-item>
      </el-form>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: ["dialogVisible", "searchInput"],
  watch: {
    dialogVisible(val) {
      this.visible = val;
    },
    visible(val) {
      this.$emit("update:dialogVisible", val);
    }
  },
  methods: {
    joinGroup(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("group/groupJoin", {
              id: this.$store.state.group.searchInfo.id,
              join_password: this.form.password
            })
            .then(() => {
              this.$message({
                showClose: true,
                type: "success",
                message: "成功加入团队"
              });
              this.visible = false;
              this.$emit("update");
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
      password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { min: 6, max: 6, message: "长度在 6 个字符", trigger: "blur" }
      ]
    };
    return {
      visible: this.dialogVisible,
      rules,
      form: {
        password: ""
      }
    };
  }
};
</script>
<style>
</style>
