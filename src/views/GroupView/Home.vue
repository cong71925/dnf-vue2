<template>
  <div class="container">
    <el-page-header @back="$router.push('/group')" content="团队详情"></el-page-header>
    <p></p>
    <el-row :gutter="20">
      <el-col :xs="24" :lg="12">
        <el-card class="box-card">
          <div class="info">
            <div class="info-left">
              <p>团队名称：</p>
              <p>id：</p>
              <p>创建日期：</p>
              <p>人数：</p>
            </div>
            <div class="info-right">
              <p>{{ groupInfo.group_name }}</p>
              <p>{{ groupInfo.id }}</p>
              <p>{{ groupInfo.create_time }}</p>
              <p>{{ groupInfo.count }}</p>
            </div>
          </div>
        </el-card>
        <el-card class="box-card">
          <CharacterTypeCharts :data="characterTypeNums" />
        </el-card>
      </el-col>
      <el-col :xs="24" :lg="12">
        <el-card class="box-card">
          <CharacterClassCharts :data="characterList" height="600px" />
        </el-card>
      </el-col>
    </el-row>
    <p></p>
    <div class="collapse">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item name="2">
          <template slot="title">
            <h3>成员信息</h3>
            <el-badge type="info" :value="memberList.length" />
          </template>
          <el-table class="table" :data="memberList" style="width: 100%">
            <el-table-column prop="nickname" label="名称"></el-table-column>
            <el-table-column prop="club" label="冒险团"></el-table-column>
            <el-table-column prop="server_1" label="服务器"></el-table-column>
            <el-table-column prop="count" label="角色数"></el-table-column>
          </el-table>
        </el-collapse-item>
        <el-collapse-item name="3">
          <template slot="title">
            <h3>角色信息</h3>
            <el-badge type="info" :value="characterList.length" />
          </template>
          <el-table :data="characterList" style="width: 100%">
            <el-table-column prop="character_name" label="角色名" sortable></el-table-column>
            <el-table-column
              prop="job"
              label="职责"
              :filters="characterJobFilters"
              :filter-method="filterHandler"
              sortable
            ></el-table-column>
            <el-table-column
              prop="class_1"
              label="职业"
              :filters="characterClassFilters"
              :filter-method="filterHandler"
              sortable
            ></el-table-column>
            <el-table-column
              prop="nickname"
              label="所属成员"
              :filters="characterNicknameFilters"
              :filter-method="filterHandler"
              sortable
            ></el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script>
import CharacterTypeCharts from "@/components/charts/CharacterType.vue";
import CharacterClassCharts from "@/components/charts/CharacterClass.vue";
export default {
  props: ["id"],
  components: { CharacterTypeCharts, CharacterClassCharts },
  computed: {
    groupInfo() {
      return this.$store.state.group.searchInfo;
    },
    memberList() {
      return this.$store.state.group.memberList;
    },
    characterList() {
      return this.$store.state.group.characterList;
    },
    characterTypeNums() {
      return {
        centerNums: this.$store.state.group.characterSort.centerList.length,
        supportNums: this.$store.state.group.characterSort.supportList.length,
        bufferNums: this.$store.state.group.characterSort.bufferList.length
      };
    },
    characterJobFilters() {
      let map = new Map();
      let result = [];
      for (let i of this.characterList) {
        if (!map.has(i.job)) {
          map.set(i.job, i.job);
        }
      }
      map.forEach((value, index) => {
        result.push({ text: index, value: index });
      });
      return result;
    },
    characterClassFilters() {
      let map = new Map();
      let result = [];
      for (let i of this.characterList) {
        if (!map.has(i.class_1)) {
          map.set(i.class_1, i.class_1);
        }
      }
      map.forEach((value, index) => {
        result.push({ text: index, value: index });
      });
      return result;
    },
    characterNicknameFilters() {
      let map = new Map();
      let result = [];
      for (let i of this.characterList) {
        if (!map.has(i.nickname)) {
          map.set(i.nickname, i.nickname);
        }
      }
      map.forEach((value, index) => {
        result.push({ text: index, value: index });
      });
      return result;
    }
  },
  methods: {
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    }
  },
  data() {
    return {
      activeName: 2
    };
  }
};
</script>
<style scoped>
.info {
  font-size: 14px;
  display: flex;
}
.info p {
  padding: 2px 0 2px 0;
}
.info-left {
  font-weight: 600;
}

.info-right {
  flex: 1;
  text-align: right;
}
.collapse {
  background-color: rgb(255, 255, 255);
  padding: 0 15px 0 15px;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.box-card {
  margin: 10px 0 10px 0;
}
</style>

