<template>
  <el-card class="form">
    <el-form :model="form" ref="form" :rules="rules">
      <el-form-item label="角色名:" prop="character_name">
        <el-input size="mini" v-model="form.character_name"></el-input>
      </el-form-item>
      <el-form-item label="职责" prop="job">
        <el-cascader
          v-model="form.job"
          :options="job"
          size="mini"
          :props="{ expandTrigger: 'hover' }"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="职业" prop="class">
        <el-cascader
          v-model="form.class"
          :options="classSub"
          size="mini"
          :props="{ expandTrigger: 'hover' }"
        ></el-cascader>
      </el-form-item>
      <div v-if="form.job=='奶'">
        <el-form-item label="常驻力智" prop="buff_default">
          <el-input size="mini" v-model.number="form.buff_default" show-word-limit maxlength="5"></el-input>
        </el-form-item>
        <el-form-item label="常驻三攻" prop="buff_atk">
          <el-input size="mini" v-model.number="form.buff_atk" show-word-limit maxlength="5"></el-input>
        </el-form-item>
        <el-form-item label="太阳" prop="buff_burst">
          <el-input size="mini" v-model.number="form.buff_burst" show-word-limit maxlength="5"></el-input>
        </el-form-item>
      </div>
      <div v-else>
        <el-form-item label="15s伤害" prop="damage_15s">
          <el-input size="mini" v-model.number="form.damage_15s" show-word-limit maxlength="5">
            <template slot="append">e</template>
          </el-input>
        </el-form-item>
        <el-form-item label="20s伤害" prop="damage_20s">
          <el-input size="mini" v-model.number="form.damage_20s" show-word-limit maxlength="5">
            <template slot="append">e</template>
          </el-input>
        </el-form-item>
      </div>
      <el-divider></el-divider>
      <el-form-item>
        <el-button type="primary" @click="modifyCharacter">提交修改</el-button>
        <el-button type="danger" @click="removeCharacter">删除角色</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
export default {
  props: ["character"],
  computed: {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.modifyCharacter();
        } else {
          return false;
        }
      });
    },
    removeCharacter() {
      this.$confirm("此操作将永久删除该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store
            .dispatch("character/deleteCharacter", this.character.id)
            .then(() => {
              this.$message({
                showClose: true,
                type: "success",
                message: "删除成功!",
              });
              this.$emit("update");
              this.$emit("removeTab");
            })
            .catch((msg) => {
              this.$message({
                showClose: true,
                type: "error",
                message: msg,
              });
            });
        })
        .catch(() => {
          this.$message({
            showClose: true,
            type: "info",
            message: "已取消删除",
          });
        });
    },
    modifyCharacter() {
      this.$store
        .dispatch("character/updateCharacter", this.form)
        .then(() => {
          this.$message({
            showClose: true,
            type: "success",
            message: "修改成功!",
          });
          this.$emit("update");
        })
        .catch((msg) => {
          this.$message({
            showClose: true,
            type: "error",
            message: msg,
          });
        });
    },
  },
  data() {
    const job = require("@/data/job.json").options;
    const classSub = require("@/data/class.json").options;
    let form = {
      character_id: this.character.id,
      character_name: this.character.character_name,
      job: this.character.job,
      class: [this.character.class_0, this.character.class_1],
      damage_15s: this.character.damage_15s,
      damage_20s: this.character.damage_20s,
      buff_default: this.character.buff_default,
      buff_atk: this.character.buff_atk,
      buff_burst: this.character.buff_burst,
    };
    const rules = {
      character_name: [
        { required: true, message: "请输入角色名称", trigger: "blur" },
        { min: 1, max: 20, message: "长度在 0 到 20 个字符", trigger: "blur" },
      ],
      job: [
        {
          type: "array",
          required: true,
          message: "请选择职责",
          trigger: "change",
        },
      ],
      class: [
        {
          type: "array",
          required: true,
          message: "请选择职业",
          trigger: "change",
        },
      ],
    };
    return {
      rules,
      form,
      classSub,
      job,
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