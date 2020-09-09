<template>
  <el-card class="card" @click.native="visible = true">
    <div slot="header">{{ data.group_name }}</div>
    <el-row>
      <el-col :span="12">id:</el-col>
      <el-col :span="12">{{ data.id }}</el-col>
    </el-row>
    <el-row>
      <el-col :span="12">创建日期:</el-col>
      <el-col :span="12">{{ date }}</el-col>
    </el-row>
    <p></p>
    <el-collapse-transition>
      <el-form v-if="visible" :model="form" status-icon :rules="rules" ref="form" size="small">
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            maxlength="6"
            show-word-limit
            placeholder="请输入团队加入密码"
            show-password
            autocomplete="off"
            @keyup.enter.native="joinGroup"
          >
            <el-button slot="append" icon="el-icon-plus" @click="joinGroup"></el-button>
          </el-input>
        </el-form-item>
      </el-form>
    </el-collapse-transition>
  </el-card>
</template>
<script>
export default {
  props: ["data"],
  computed: {
    date() {
      return new Date(this.data.create_time).toLocaleDateString();
    },
  },
  methods: {
    joinGroup() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("group/groupJoin", {
              id: this.data.id,
              join_password: this.form.password
            })
            .then(() => {
              this.$message({
                showClose: true,
                type: "success",
                message: "成功加入团队"
              });
              this.$router.push('/group');
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
      rules: rules,
      visible: false,
      form: { password: "" },
    };
  },
};
</script>
<style scoped>
.card {
  text-align: left;
  margin: 5px 0 5px 0;
}
.card:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.4);
}
.card:active {
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
}
</style>