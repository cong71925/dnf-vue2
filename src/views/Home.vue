<template>
  <el-container>
    <el-main class="el-main">
      <el-backtop></el-backtop>
      <div class="banner">
        <div class="context">
          <div class="title">
            <h1>DNF团队数据管理系统</h1>
            <p>轻松创建您的团队！</p>
            <div class="button-group" v-if="$store.state.auth.isLogin">
              <router-link to="/character">
                <el-button>添加角色</el-button>
              </router-link>
              <router-link to="/group">
                <el-button type="primary">添加团队</el-button>
              </router-link>
            </div>
            <div class="button-group" v-else>
              <router-link to="/login">
                <el-button>登录</el-button>
              </router-link>
              <router-link to="/register">
                <el-button type="primary">注册</el-button>
              </router-link>
            </div>
          </div>
          <div></div>
          <div class="snow-man-box">
            <div>
              <img class="snow-man-1" src="@/assets/fatSnowMan/女肥法师.png" alt="fit" />
              <img class="snow-man-2" src="@/assets/fatSnowMan/女肥法师.png" alt="fit" />
              <img class="snow-man-3" src="@/assets/fatSnowMan/女肥法师.png" alt="fit" />
            </div>
          </div>
        </div>
      </div>
      <div class="card-show">
        <div class="context">
          <el-card class="auto-hide">
            <img src="@/assets/element-ui.jpg" style="width: auto;height: 250px;" alt="fit" />
          </el-card>
          <div></div>
          <div class="title">
            <h1>卡片式的显示风格</h1>
            <p>基于Element-ui，清爽简洁的界面!</p>
          </div>
        </div>
      </div>
      <div class="charts-show">
        <div class="context">
          <div class="title">
            <h1>直观的数据展示方式</h1>
            <p>通过图表展示数据，直观又好看！</p>
          </div>
          <el-card>
            <div class="button-group">
              <el-button-group>
                <el-button
                  :type="chartsType==='center'?'primary':''"
                  size="mini"
                  @click="chartsType='center'"
                >输出</el-button>
                <el-button
                  :type="chartsType==='buffer'?'primary':''"
                  size="mini"
                  @click="chartsType='buffer'"
                >奶</el-button>
              </el-button-group>
              <el-button-group v-if="chartsType==='buffer'" style="margin-left: 5px;">
                <el-button :type="boost?'primary':''" size="mini" @click="boost=!boost">唱歌</el-button>
                <el-button
                  :type="favoritism?'primary':''"
                  size="mini"
                  @click="favoritism=!favoritism"
                >偏爱</el-button>
              </el-button-group>
            </div>
            <p></p>
            <buffer-charts :data="bufferDataComputed" v-if="chartsType==='buffer'" />
            <center-charts :data="centerData" v-if="chartsType==='center'" />
          </el-card>
        </div>
      </div>
      <div class="bottom-show">
        <div class="context">
          <div class="snow-man-box">
            <div>
              <img class="snow-man-1" src="@/assets/fatSnowMan/伊斯塔肥灵.png" alt="fit" />
              <img class="snow-man-2" src="@/assets/fatSnowMan/元素肥灵.png" alt="fit" />
              <img class="snow-man-3" src="@/assets/fatSnowMan/肥灵胖怪.png" alt="fit" />
              <img class="snow-man-4" src="@/assets/fatSnowMan/肥蚀.png" alt="fit" />
              <img class="snow-man-5" src="@/assets/fatSnowMan/肥月女神.png" alt="fit" />
            </div>
          </div>
          <div></div>
          <div class="title">
            <h1>开始使用</h1>
            <p>现在，开始使用吧！</p>
            <div class="button-group">
              <router-link to="/document/home">
                <el-button>使用说明</el-button>
              </router-link>
              <router-link to="/register" v-if="!$store.state.auth.isLogin">
                <el-button type="primary">注册</el-button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="context">
          <div class="icon-box">
            <el-link href="https://github.com/cong71925/dnf-vue2" :underline="false" target="_blank">
              <icon-base icon-name="github" height="30" width="30" class="icon">
                <icon-github />
              </icon-base>
            </el-link>
            <el-link href="mailto:cong71925@gmail.com" :underline="false" target="_blank">
              <icon-base icon-name="邮件" height="30" width="30" class="icon">
                <icon-mail />
              </icon-base>
            </el-link>
            <el-link href="https://blog.congvps.top" :underline="false" target="_blank">
              <icon-base icon-name="博客" height="30" width="30" class="icon">
                <icon-blog />
              </icon-base>
            </el-link>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import adapter from "@/utils/adapter.js";
export default {
  components: {
    BufferCharts: () => import("@/components/charts/characterList/Buffer"),
    CenterCharts: () => import("@/components/charts/characterList/Center"),
    IconBase: () => import("@/components/icon/IconBase"),
    IconGithub: () => import("@/components/icon/github/Index"),
    IconMail: () => import("@/components/icon/mail/Index"),
    IconBlog: () => import("@/components/icon/blog/Index"),
  },
  computed: {
    bufferDataComputed() {
      let data = this.bufferData;
      let result = data.map((value) => {
        let payload = {
          bufferData: value,
          hasSystemBuff: false,
          boost: this.boost,
          favoritism: this.favoritism,
          templateCharacter: this.$store.state.setting.setting
            .templateCharacter,
        };
        value.LiftRatioDefault = adapter.GetLiftRatio(payload);
        payload.hasSystemBuff = true;
        value.LiftRatioBurst = adapter.GetLiftRatio(payload);
        value = adapter.BufferDataAdapter(payload);
        return value;
      });
      return result;
    },
  },
  data() {
    return {
      chartsType: "center",
      boost: true,
      favoritism: true,
      centerData: [
        {
          character_name: "测试1",
          damage_15s: 2000,
          damage_20s: 3000,
        },
        {
          character_name: "测试2",
          damage_15s: 4000,
          damage_20s: 4200,
        },
        {
          character_name: "测试3",
          damage_15s: 3800,
          damage_20s: 4600,
        },
        {
          character_name: "测试4",
          damage_15s: 5000,
          damage_20s: 6000,
        },
      ],
      bufferData: [
        {
          character_name: "神思者",
          class_1: "神思者",
          buff_atk: 3200,
          buff_default: 20000,
          buff_burst: 22000,
        },
        {
          character_name: "炽天使",
          class_1: "炽天使",
          buff_atk: 2400,
          buff_default: 16000,
          buff_burst: 23000,
        },
        {
          character_name: "冥月女神",
          class_1: "冥月女神",
          buff_atk: 2400,
          buff_default: 16000,
          buff_burst: 23000,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.el-main {
  padding: 0;
}
.button-group {
  display: flex;
  a {
    margin: 0 5px 0 5px;
  }
}

.context {
  margin: auto;
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  padding: 30px 30px 30px 30px;

  .title {
    h1 {
      font-size: 40px;
      line-height: 40px;
      margin: 20px 0 20px 0;
    }
  }
}
.banner {
  width: 100%;
  overflow: hidden;
  background-color: white;

  .snow-man-box {
    margin-top: 35px;
    position: relative;
    animation: RtoL 2s;

    .snow-man-1 {
      position: relative;
      transform: rotateY(180deg);
      z-index: 2;
    }

    .snow-man-2 {
      position: relative;
      transform: rotateY(180deg);
      z-index: 2;
    }

    .snow-man-3 {
      position: absolute;
      transform: rotateY(180deg);
      top: -35px;
      left: 25px;
    }
  }
}

.card-show {
  width: 100%;
  background-color: #f2f6fc;
  .context {
    animation: fadeIn 2s;
    .title {
      text-align: right;
    }
  }
}

.charts-show {
  width: 100%;
  overflow: hidden;
  background-color: white;
  .context {
    flex-direction: column;
    justify-content: flex-start;
  }
}

.bottom-show {
  width: 100%;
  background-color: #f2f6fc;
  .context {
    .title {
      text-align: right;
    }

    .snow-man-box {
      margin-top: 35px;
      position: relative;
      animation: LtoR 2s;

      .snow-man-1 {
        position: relative;
        z-index: 2;
      }

      .snow-man-2 {
        position: relative;
        z-index: 2;
      }

      .snow-man-3 {
        position: relative;
        z-index: 2;
      }
      .snow-man-4 {
        position: absolute;
        top: -35px;
        left: 50px;
      }
      .snow-man-5 {
        position: absolute;
        top: -35px;
        left: 120px;
      }
    }
  }
}

.footer {
  background-color: white;

  .context {
    justify-content: center;
  }

  .icon-box {
    color: #606266;
    text-align: center;

    .icon {
      margin: 0 10px 0 10px;
    }
  }
}

@media (max-width: 768px) {
  .snow-man-box {
    display: none;
  }
  .auto-hide {
    display: none;
  }
  .context {
    .title {
      h1 {
        font-size: 20px;
        line-height: 20px;
      }
    }
  }
}

@keyframes RtoL {
  from {
    right: -300px;
  }
  to {
    right: 0;
  }
}

@keyframes LtoR {
  from {
    left: -300px;
  }
  to {
    left: 0;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>