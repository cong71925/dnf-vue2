<template>
  <div>
    <el-page-header @back="$router.push('/group')" content="角色总览"></el-page-header>
    <p></p>
    <div class="collapse">
      <el-collapse accordion>
        <el-collapse-item>
          <template slot="title">
            <h3>纯C</h3>
            <el-badge type="info" :value="centerList.length" />
          </template>
          <el-button-group class="button-group">
            <el-button
              size="mini"
              :type="centerViewType==='table'?'primary':''"
              @click="centerViewType='table'"
            >表格</el-button>
            <el-button
              size="mini"
              :type="centerViewType==='chart'?'primary':''"
              @click="centerViewType='chart'"
            >条形图</el-button>
          </el-button-group>
          <centerChart v-if="centerViewType==='chart'" :data="centerList" :height="centerList.length * 70 + 100 +'px'" />
          <el-table
            v-show="centerViewType==='table'"
            :data="centerList"
            style="width: 100%"
            :default-sort="{prop: 'damage_20s', order: 'descending'}"
          >
            <el-table-column prop="character_name" label="角色名" sortable></el-table-column>
            <el-table-column
              prop="class_1"
              label="职业"
              :filters="centerClassFilters"
              :filter-method="filterHandler"
              sortable
            ></el-table-column>
            <el-table-column
              prop="nickname"
              label="所属成员"
              :filters="centerNicknameFilters"
              :filter-method="filterHandler"
              sortable
            ></el-table-column>
            <el-table-column prop="damage_15s" label="15S" sortable></el-table-column>
            <el-table-column prop="damage_20s" label="20S" sortable></el-table-column>
          </el-table>
        </el-collapse-item>
        <el-collapse-item>
          <template slot="title">
            <h3>辅C</h3>
            <el-badge type="info" :value="supportList.length" />
          </template>
          <el-button-group class="button-group">
            <el-button
              size="mini"
              :type="supportViewType==='table'?'primary':''"
              @click="supportViewType='table'"
            >表格</el-button>
            <el-button
              size="mini"
              :type="supportViewType==='chart'?'primary':''"
              @click="supportViewType='chart'"
            >条形图</el-button>
          </el-button-group>
          <centerChart v-if="supportViewType==='chart'" :data="supportList" :height="supportList.length * 70 + 100 +'px'" />
          <el-table
            v-show="supportViewType==='table'"
            :data="supportList"
            style="width: 100%"
            :default-sort="{prop: 'damage_20s', order: 'descending'}"
          >
            <el-table-column prop="character_name" label="角色名" sortable></el-table-column>
            <el-table-column
              prop="class_1"
              label="职业"
              :filters="supportClassFilters"
              :filter-method="filterHandler"
              sortable
            ></el-table-column>
            <el-table-column
              prop="nickname"
              label="所属成员"
              :filters="supportNicknameFilters"
              :filter-method="filterHandler"
              sortable
            ></el-table-column>
            <el-table-column prop="damage_15s" label="15S" sortable></el-table-column>
            <el-table-column prop="damage_20s" label="20S" sortable></el-table-column>
          </el-table>
        </el-collapse-item>
        <el-collapse-item>
          <template slot="title">
            <h3>奶</h3>
            <el-badge type="info" :value="bufferData.length" />
          </template>
          <el-button-group class="button-group">
            <el-button
              size="mini"
              :type="bufferViewType==='table'?'primary':''"
              @click="bufferViewType='table'"
            >表格</el-button>
            <el-button
              size="mini"
              :type="bufferViewType==='chart'?'primary':''"
              @click="bufferViewType='chart'"
            >条形图</el-button>
          </el-button-group>
          <el-button-group class="button-group">
            <el-button size="mini" :type="boost?'primary':''" @click="boost = !boost">唱歌</el-button>
            <el-button
              size="mini"
              :type="favoritism?'primary':''"
              @click="favoritism =! favoritism"
            >偏爱</el-button>
          </el-button-group>
          <bufferChart v-if="bufferViewType==='chart'" :data="bufferList" :height="bufferData.length * 70 + 100 +'px'" />
          <el-table
            v-show="bufferViewType==='table'"
            :data="bufferList"
            style="width: 100%"
            :default-sort="{prop: 'LiftRatioBurst', order: 'descending'}"
          >
            <el-table-column prop="character_name" label="角色名" sortable></el-table-column>
            <el-table-column
              prop="class_1"
              label="职业"
              :filters="[{text: '神思者', value: '神思者'}, {text: '炽天使', value: '炽天使'}, {text: '冥月女神', value: '冥月女神'}]"
              :filter-method="filterHandler"
              sortable
            ></el-table-column>
            <el-table-column
              prop="nickname"
              label="所属成员"
              :filters="bufferNicknameFilters"
              :filter-method="filterHandler"
              sortable
            ></el-table-column>
            <el-table-column prop="buff_default" label="常驻力智" sortable></el-table-column>
            <el-table-column prop="buff_atk" label="常驻三攻" sortable></el-table-column>
            <el-table-column prop="buff_burst" label="太阳力智" sortable></el-table-column>
            <el-table-column prop="LiftRatioDefault" label="无系统奶提升率" sortable></el-table-column>
            <el-table-column prop="LiftRatioBurst" label="有系统奶提升率" sortable></el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script>
import adapter from "@/utils/adapter.js";
import centerChart from "./components/charts/Center";
import bufferChart from "./components/charts/Buffer";
export default {
  components: { centerChart, bufferChart },
  created() {},
  computed: {
    centerList() {
      return this.$store.state.group.characterSort.centerList;
    },
    supportList() {
      return this.$store.state.group.characterSort.supportList;
    },
    bufferData() {
      return this.$store.state.group.characterSort.bufferList;
    },
    bufferList() {
      let data = this.bufferData;
      let result = data.map(value => {
        let payload = {
          bufferData: value,
          hasSystemBuff: false,
          boost: this.boost,
          favoritism: this.favoritism
        };
        value.LiftRatioDefault = adapter.GetLiftRatio(payload);
        payload.hasSystemBuff = true;
        value.LiftRatioBurst = adapter.GetLiftRatio(payload);
        value = adapter.BufferDataAdapter(payload);
        return value;
      });
      return result;
    },
    centerClassFilters() {
      let map = new Map();
      let result = [];
      for (let i of this.centerList) {
        if (!map.has(i.class_1)) {
          map.set(i.class_1, i.class_1);
        }
      }
      map.forEach((value, index) => {
        result.push({ text: index, value: index });
      });
      return result;
    },
    supportClassFilters() {
      let map = new Map();
      let result = [];
      for (let i of this.supportList) {
        if (!map.has(i.class_1)) {
          map.set(i.class_1, i.class_1);
        }
      }

      map.forEach((value, index) => {
        result.push({ text: index, value: index });
      });
      return result;
    },
    centerNicknameFilters() {
      let map = new Map();
      let result = [];
      for (let i of this.centerList) {
        if (!map.has(i.nickname)) {
          map.set(i.nickname, i.nickname);
        }
      }
      map.forEach((value, index) => {
        result.push({ text: index, value: index });
      });
      return result;
    },
    supportNicknameFilters() {
      let map = new Map();
      let result = [];
      for (let i of this.supportList) {
        if (!map.has(i.nickname)) {
          map.set(i.nickname, i.nickname);
        }
      }
      map.forEach((value, index) => {
        result.push({ text: index, value: index });
      });
      return result;
    },
    bufferNicknameFilters() {
      let map = new Map();
      let result = [];
      for (let i of this.bufferList) {
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
      boost: true,
      favoritism: true,
      centerViewType: "table",
      supportViewType: "table",
      bufferViewType: "table"
    };
  }
};
</script>
<style scoped>
.el-card {
  text-align: center;
}
.el-card__body {
  padding: 5px;
}
.collapse {
  background-color: rgb(255, 255, 255);
  padding: 0 15px 0 15px;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.button-group {
  margin-right: 10px;
}
</style>
