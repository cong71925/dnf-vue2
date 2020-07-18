<template>
  <div>
    <el-page-header @back="$router.push('/group')" content="团队管理"></el-page-header>
    <p></p>
    <div class="collapse" v-if="$store.state.auth.userID == groupInfo.admin_id">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item name="1">
          <template slot="title">
            <h3>成员管理</h3>
          </template>
          <el-table :data="memberList" style="width: 100%">
            <el-table-column prop="nickname" label="名称"></el-table-column>
            <el-table-column prop="club" label="冒险团"></el-table-column>
            <el-table-column label="操作" width="250px">
              <template slot-scope="scope">
                <el-button size="mini" @click="transferAdmin(scope.row.id)">转移管理员权限</el-button>
                <el-button size="mini" type="danger" @click="removeMember(scope.row.id)">移出团队</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <h3>团队信息修改</h3>
          </template>
          <p></p>
          <el-card class="form">
            <el-form>
              <el-form-item label="团队名称">
                <el-input type="text" maxlength="20" v-model="form.group_name" show-word-limit></el-input>
              </el-form-item>
              <el-form-item label="申请密码">
                <el-input show-password maxlength="6" v-model="form.join_password"></el-input>
              </el-form-item>
              <el-form-item label="允许加入">
                <el-switch v-model="form.attendable"></el-switch>
              </el-form-item>
              <el-divider></el-divider>
              <el-form-item>
                <el-button type="danger" @click="removeGroup">删除团队</el-button>
                <el-button type="primary" @click="updateGroup">提交修改</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div v-else>
      <el-card>
        <el-button type="danger" @click="quitGroup">退出团队</el-button>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  props: ["id"],
  computed: {
    groupInfo() {
      return this.$store.state.group.searchInfo;
    },
    memberList() {
      let temp = [];
      for (let i in this.$store.state.group.memberList) {
        if (
          this.groupInfo.admin_id !== this.$store.state.group.memberList[i].id
        ) {
          temp.push(this.$store.state.group.memberList[i]);
        }
      }
      return temp;
    }
  },
  watch: {
    groupInfo(val) {
      this.form.id = val.id;
      this.form.group_name = val.group_name;
      this.form.attendable = Boolean(val.attendable);
    }
  },
  created() {
    if (this.groupInfo != null) {
      this.form.id = this.groupInfo.id;
      this.form.group_name = this.groupInfo.group_name;
      this.form.attendable = Boolean(this.groupInfo.attendable);
    }
  },
  methods: {
    async transferAdmin(userID) {
      try {
        await this.$confirm("此操作将转移您的管理员权限, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        });
        await this.$store.dispatch("group/transferAdmin", {
          groupID: this.id,
          userID: userID
        });
        this.$store.dispatch("group/groupSearch", this.id);
      } catch (e) {
        this.$message({
          type: "info",
          message: e
        });
      }
    },
    async removeMember(userID) {
      try {
        await this.$confirm("您将要把该团员移出团队, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        });
        await this.$store.dispatch("group/deleteMember", {
          groupID: this.id,
          userID: userID
        });
        this.$store.dispatch("group/getGroupMember", this.id);
        this.$store.dispatch("group/groupSearch", this.id);
        this.$store.dispatch("group/getGroupCharacter", this.id);
      } catch (e) {
        this.$message({
          type: "info",
          message: e
        });
      }
    },
    async updateGroup() {
      try {
        await this.$store.dispatch("group/updateGroup", this.form);
        await this.$store.dispatch("group/groupSearch", this.id);
      } catch (e) {
        this.$message({
          showClose: true,
          type: "error",
          message: e
        });
      }
    },
    removeGroup() {
      this.$confirm("此操作将永久删除该团队, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store
            .dispatch("group/deleteGroup", this.id)
            .then(() => {
              this.$message({
                showClose: true,
                type: "success",
                message: "删除成功!"
              });
              this.$router.push({ path: "/group" });
            })
            .catch(msg => {
              this.$message({
                showClose: true,
                type: "error",
                message: msg
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    quitGroup() {
      this.$confirm("此操作将退出该团队, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store
            .dispatch("group/quitGroup", this.id)
            .then(() => {
              this.$message({
                showClose: true,
                type: "success",
                message: "删除成功!"
              });
              this.$router.push({ path: "/group" });
            })
            .catch(msg => {
              this.$message({
                showClose: true,
                type: "error",
                message: msg
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出"
          });
        });
    }
  },
  data() {
    return {
      admin: false,
      activeName: "1",
      form: {
        id: 0,
        group_name: "",
        join_password: "",
        attendable: false
      }
    };
  }
};
</script>

<style scoped>
.collapse {
  background-color: rgb(255, 255, 255);
  padding: 0 15px 0 15px;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
@media (min-width: 500px) {
  .form {
    width: 95%;
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