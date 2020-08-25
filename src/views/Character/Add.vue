<template>
  <div>
    <el-card class="form">
      <el-form :model="form" status-icon :rules="rules" ref="form" label-position="top">
        <el-form-item label="角色名:" prop="character_name">
          <el-input size="mini" v-model="form.character_name" show-word-limit maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="职业:" required>
          <div class="flex-box">
            <el-form-item prop="job">
              <el-cascader
                v-model="form.job"
                :options="job"
                size="mini"
                :props="{ expandTrigger: 'hover' }"
              ></el-cascader>
            </el-form-item>
            <div>-</div>
            <el-form-item prop="class">
              <el-cascader
                v-model="form.class"
                :options="classSub"
                size="mini"
                prop="class"
                :props="{ expandTrigger: 'hover' }"
              ></el-cascader>
            </el-form-item>
          </div>
        </el-form-item>
        <div v-if="form.job=='奶'">
          <div style="color:red; font-weight:bold;">
            <p>奶登记是buff的数值：</p>
            <p>
              <el-image
                :src="imgSrc[0]"
                :preview-src-list="imgSrc"
                :fit="'scale-down'"
                style="height: 160px;width: 300px"
              ></el-image>
              <el-image
                :src="imgSrc[1]"
                :preview-src-list="imgSrc"
                :fit="'scale-down'"
                style="height: 160px;width: 300px"
              ></el-image>
            </p>
            <p>奶妈和奶萝都是登记buff的数值就行了，不需要算上唱歌和偏爱，本项目在计算提升率时会自动计算。奶爸请登记叠满二觉后的buff和太阳，有条件的可以测有魔王契约假紫光环之类的buff。奶测buff可以找朋友进修炼场或者帝国竞技场，这里不再赘述。</p>
          </div>

          <el-form-item label="常驻力智:" prop="buff_default">
            <el-input size="mini" v-model.number="form.buff_default" show-word-limit maxlength="5"></el-input>
          </el-form-item>
          <el-form-item label="常驻三攻:" prop="buff_atk">
            <el-input size="mini" v-model.number="form.buff_atk" show-word-limit maxlength="5"></el-input>
          </el-form-item>
          <el-form-item label="太阳力智:" prop="buff_burst">
            <el-input size="mini" v-model.number="form.buff_burst" show-word-limit maxlength="5"></el-input>
          </el-form-item>
        </div>
        <div v-else>
          <el-form-item label="15s绿色沙袋伤害:" prop="damage_15s">
            <el-input size="mini" v-model.number="form.damage_15s" show-word-limit maxlength="5">
              <template slot="append">亿</template>
            </el-input>
          </el-form-item>
          <el-form-item label="20s绿色沙袋伤害:" prop="damage_20s">
            <el-input size="mini" v-model.number="form.damage_20s" show-word-limit maxlength="5">
              <template slot="append">亿</template>
            </el-input>
          </el-form-item>
        </div>
        <el-divider></el-divider>
        <el-form-item>
          <el-button>取 消</el-button>
          <el-button type="primary" @click="submitForm('form')">提交</el-button>
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
            .dispatch("character/createCharacter", this.form)
            .then(() => {
              this.$message({
                showClose: true,
                type: "success",
                message: "添加成功!",
              });
              this.$emit("update");
              this.$emit("removeTab")
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
    let form = {
      character_name: "",
      job: "",
      class: "",
      damage_15s: 0,
      damage_20s: 0,
      buff_default: 0,
      buff_atk: 0,
      buff_burst: 0,
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
      buff_default: [
        { type: "number", message: "请输入数字", trigger: "blur" },
      ],
      buff_atk: [{ type: "number", message: "请输入数字", trigger: "blur" }],
      buff_burst: [{ type: "number", message: "请输入数字", trigger: "blur" }],
      damage_15s: [{ type: "number", message: "请输入数字", trigger: "blur" }],
      damage_20s: [{ type: "number", message: "请输入数字", trigger: "blur" }],
    };
    return {
      form,
      rules,
      job: require("@/data/job.json").options,
      classSub: require("@/data/class.json").options,
      imgSrc: [
        "/static/image/index/buffDefault.jpg",
        "/static/image/index/buffBurst.jpg",
      ],
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
}
</style>