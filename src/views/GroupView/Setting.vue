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
                <el-popconfirm
                  confirmButtonText="确定"
                  cancelButtonText="取消"
                  icon="el-icon-info"
                  iconColor="red"
                  title="您确定要转移您的管理员权限吗？"
                  @onConfirm="transferAdmin(scope.row.id)"
                >
                  <el-button slot="reference" size="mini">转移管理员权限</el-button>
                </el-popconfirm>
                <el-popconfirm
                  confirmButtonText="确定"
                  cancelButtonText="取消"
                  icon="el-icon-info"
                  iconColor="red"
                  title="您确定要把该团员移出团队吗？"
                  @onConfirm="removeMember(scope.row.id)"
                >
                  <el-button slot="reference" size="mini" type="danger">移出团队</el-button>
                </el-popconfirm>
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
        <el-collapse-item name="3">
          <template slot="title">
            <h3>团队申请密码修改</h3>
          </template>
          <p></p>
          <el-card class="form">
            <el-form>
              <el-form-item label="申请密码">
                <el-input show-password maxlength="6" v-model="form.join_password" show-word-limit>
                  <el-button slot="append" @click="updatePassword"><i class="el-icon-upload2" /> </el-button>
                </el-input>
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
    },
  },
  watch: {
    groupInfo: {
      handler(val) {
        this.form.id = val.id;
        this.form.group_name = val.group_name;
        this.form.attendable = val.attendable === "true";
      },
      immediate: true
    },
  },
  methods: {
    async transferAdmin(userID) {
      try {
        await this.$store.dispatch("group/transferAdmin", {
          groupID: this.id,
          userID: userID,
        });
        this.$message({
          showClose: true,
          type: "success",
          message: "转移成功",
        });
        this.$store.dispatch("group/groupSearch", this.id);
      } catch (e) {
        this.$message({
          type: "info",
          message: e,
        });
      }
    },
    async removeMember(userID) {
      try {
        await this.$store.dispatch("group/deleteMember", {
          groupID: this.id,
          userID: userID,
        });
        this.$message({
          showClose: true,
          type: "success",
          message: "移除成功",
        });
        this.$store.dispatch("group/getGroupMember", this.id);
        this.$store.dispatch("group/groupSearch", this.id);
        this.$store.dispatch("group/getGroupCharacter", this.id);
      } catch (e) {
        this.$message({
          type: "info",
          message: e,
        });
      }
    },
    async updateGroup() {
      try {
        await this.$store.dispatch("group/updateGroup", this.form);
        this.$message({
          showClose: true,
          type: "success",
          message: "修改成功",
        });
        this.$store.dispatch("group/groupSearch", this.id);
      } catch (e) {
        this.$message({
          showClose: true,
          type: "error",
          message: e,
        });
      }
    },
    removeGroup() {
      this.$confirm("此操作将永久删除该团队, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store
            .dispatch("group/deleteGroup", this.id)
            .then(() => {
              this.$message({
                showClose: true,
                type: "success",
                message: "删除成功!",
              });
              this.$router.push({ path: "/group" });
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
            type: "info",
            message: "已取消删除",
          });
        });
    },
    quitGroup() {
      this.$confirm("此操作将退出该团队, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store
            .dispatch("group/quitGroup", this.id)
            .then(() => {
              this.$message({
                showClose: true,
                type: "success",
                message: "退出成功!",
              });
              this.$router.push({ path: "/group" });
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
            type: "info",
            message: "已取消退出",
          });
        });
    },
    async updatePassword() {
      try {
        await this.$store.dispatch("group/updatePassword", this.form);
        this.$message({
          showClose: true,
          type: "success",
          message: "修改成功",
        });
      } catch (e) {
        this.$message({
          showClose: true,
          type: "error",
          message: e,
        });
      }
    },
  },
  data() {
    return {
      admin: false,
      activeName: "1",
      form: {
        id: 0,
        group_name: "",
        join_password: "",
        attendable: false,
      },
    };
  },
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
.el-table .el-button {
  margin: 0 2px 0 2px;
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