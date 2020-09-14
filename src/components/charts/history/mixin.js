import format from "@/utils/format.js";
import "v-charts/lib/index.common";
const mixin = {
    components: {
        "ve-chart": () => import("v-charts/lib/chart.common"),
    },
    computed: {
        toolbox() {
            const options = this.myToolOptions;
            return {
                width: "30%",
                feature: {
                    myToolFullScreen: {
                        show: true,
                        title: this.fullScreen
                            ? options.shrinkScreen.title
                            : options.fullScreen.title,
                        icon: this.fullScreen
                            ? options.shrinkScreen.icon
                            : options.fullScreen.icon,
                        onclick: () => {
                            this.resize();
                        },
                    },
                },
            };
        },
    },
    methods: {
        resize() {
            this.$emit("update:isFullScreen", !this.isFullScreen);
            this.$nextTick(() => {
                this.$refs.charts.echarts.resize();
            });
        },
    },
    data() {
        return {
            chartExtend: {
                series: {
                    label: {
                        show: true,
                    },
                    smooth: false
                },
                xAxis: {
                    axisLabel: {
                        show: true,
                        formatter: (data) => format.formatDate(data),
                    },
                },
            },
            dataZoom: {
                type: "slider",
                start: 0,
                end: 100,
            },
            chartLegend: {
                left: "left",
                width: "70%"
            },
            myToolOptions: {
                fullScreen: {
                    title: "切换至页面全屏",
                    icon: require("@/components/icon/fullScreen/path.json").path,
                },
                shrinkScreen: {
                    title: "窗口化",
                    icon: require("@/components/icon/shrinkScreen/path.json").path,
                },
                histogram: {
                    title: "切换至柱状图",
                    icon: require("@/components/icon/histogram/path.json").path,
                },
                "line&histogram": {
                    title: "切换至柱状折线图",
                    icon: require("@/components/icon/line&histogram/path.json").path,
                },
                line: {
                    title: "切换至折线图",
                    icon: require("@/components/icon/line/path.json").path,
                },
            },
        };
    },
}

export default mixin