<template>
  <div>
    <el-card>
      <buffer-charts
        :data="historicalData"
        :character="character"
        :fullScreen.sync="fullScreen"
        height="500px"
        v-if="character.job === '奶'"
      />
      <center-charts :data="historicalData" :fullScreen="false" height="500px" v-else />
    </el-card>
  </div>
</template>
<script>
import centerCharts from "@/components/charts/history/Center.vue";
import bufferCharts from "@/components/charts/history/Buffer.vue";
export default {
  props: ["character"],
  components: { "center-charts": centerCharts, "buffer-charts": bufferCharts },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$store
        .dispatch("character/getCharacterHistorical", this.character.id)
        .then((result) => {
          this.historicalData = JSON.parse(JSON.stringify(result));
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
    return {
      historicalData: [],
      fullScreen: false,
    };
  },
};
</script>

<style scoped>
.el-card {
  margin: 10px 0 10px 0;
}
</style>