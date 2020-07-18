<template>
  <el-container>
    <el-aside width="auto">
      <el-menu :default-active="activeName" :collapse="isCollapse">
        <el-menu-item index="GroupViewHome" @click="goto('GroupViewHome')">
          <i class="el-icon-odometer"></i>
          <span>团队总览</span>
        </el-menu-item>
        <el-menu-item index="GroupViewMember" @click="goto('GroupViewMember')">
          <i class="el-icon-s-custom"></i>
          <span>成员信息</span>
        </el-menu-item>
        <el-menu-item index="GroupViewCharacter" @click="goto('GroupViewCharacter')">
          <i class="el-icon-user"></i>
          <span slot="title">角色总览</span>
        </el-menu-item>
        <el-menu-item index="GroupViewSetting" @click="goto('GroupViewSetting')">
          <i class="el-icon-setting"></i>
          <span slot="title">团队管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>
<script>
export default {
  props: ["id"],
  computed: {
    activeName() {
      return this.$route.name;
    }
  },
  watch: {
    screenWidth(val) {
      if (!this.timer) {
        this.screenWidth = val;
        this.timer = true;
        let that = this;
        setTimeout(function() {
          if (that.screenWidth < 768) {
            that.isCollapse = true;
          } else {
            that.isCollapse = false;
          }
          that.timer = false;
        }, 600);
      }
    }
  },
  created: function() {
    this.getGroupInfo();
    this.getGroupMember();
    this.getMemberInfo();
  },
  mounted() {
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        this.screenWidth = window.screenWidth;
      })();
    };
  },
  methods: {
    goto(gotoName) {
      this.$router.push({
        name: gotoName,
        params: { id: this.id }
      });
    },
    async getData() {
      try {
        this.$store.dispatch("group/groupSearch", this.id);
        this.$store.dispatch("group/getGroupMember", this.id);
        this.$store.dispatch("group/getGroupMember", this.id);
      } catch (e) {
        this.$message({
          showClose: true,
          type: "error",
          message: e
        });
      }
    },
    getGroupInfo() {
      this.$store
        .dispatch("group/groupSearch", this.id)
        .then(() => {})
        .catch(msg => {
          this.$message({
            showClose: true,
            type: "error",
            message: msg
          });
        });
    },
    getGroupMember() {
      this.$store
        .dispatch("group/getGroupMember", this.id)
        .then(() => {})
        .catch(msg => {
          this.$message({
            showClose: true,
            type: "error",
            message: msg
          });
        });
    },
    getMemberInfo() {
      this.$store
        .dispatch("group/getGroupCharacter", this.id)
        .then(() => {})
        .catch(msg => {
          this.$message({
            showClose: true,
            type: "error",
            message: msg
          });
        });
    }
  },
  data() {
    let screenWidth = document.body.clientWidth;
    let isCollapse = false;
    return {
      screenWidth,
      isCollapse
    };
  }
};
</script>
<style scoped>
.el-menu {
  height: 100%;
}
</style>
