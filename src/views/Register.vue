<template>
  <div id="panel_register">
    <el-container>
      <el-main>
        <el-form :model="form" status-icon :rules="rules" ref="form">
          <el-form-item label="用户名：" prop="username">
            <el-input
              v-model="form.username"
              maxlength="12"
              show-word-limit
              placeholder="用于账户登录"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="password">
            <el-input
              v-model="form.password"
              placeholder="请输入密码"
              maxlength="20"
              show-word-limit
              show-password
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码：" prop="password_check">
            <h4></h4>
            <el-input
              v-model="form.password_check"
              placeholder="请再次输入密码"
              maxlength="20"
              show-word-limit
              show-password
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="昵称：" prop="nickname">
            <el-input
              v-model="form.nickname"
              maxlength="12"
              show-word-limit
              placeholder="可重复，可修改"
            ></el-input>
          </el-form-item>
          <el-form-item label="冒险团名称：" prop="club">
            <el-input
              v-model="form.club"
              maxlength="20"
              show-word-limit
              placeholder="请填写真实冒险团名称，方便好友找到您"
            ></el-input>
          </el-form-item>
          <el-form-item label="所属服务器：" prop="server_select">
            <span class="demonstration"></span>
            <el-cascader
              v-model="form.server_select"
              :options="server"
              :props="{ expandTrigger: 'hover' }"
            ></el-cascader>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" id="submit" @click="submitForm('form')">注册</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("auth/register", this.form)
            .then(() => {
              this.$message({
                showClose: true,
                type: "success",
                message: "注册成功！"
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
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  data() {
    let form = {
      username: '',
      password: '',
      password_check: '',
      nickname: '',
      server_select: '',
      club: ''
    }
    const checkPass = (rule, value, callback) => {
      if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    const rules = {
      username: [
        { required: true, message: '用户名', trigger: 'blur' },
        { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
      ],
      password_check: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
        { validator: checkPass, trigger: 'blur' }
      ],
      nickname: [
        { required: true, message: '请输入昵称', trigger: 'blur' },
        { min: 2, max: 12, message: '长度在 2 到 12 个字符', trigger: 'blur' }
      ],
      server_select: [
        {
          type: 'array',
          required: true,
          message: '请选择服务器',
          trigger: 'change'
        }
      ],
      club: [
        { required: true, message: '请填写冒险团名称', trigger: 'blur' },
        { max: 20, message: '长度在 0 到 20 个字符', trigger: 'blur' }
      ]
    }
    const server = require('@/data/server.json').options
    return {
      form,
      rules,
      server
    }
  }
}
</script>
<style>
#panel_register {
  line-height: 200%;
  margin: auto;
  max-width: 600px;
}
#submit {
  margin-top: 30px;
  width: 100%;
  text-align: center;
}
</style>
