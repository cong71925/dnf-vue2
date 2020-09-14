const mixin = {
    components: {
        "ve-bar": () => import("v-charts/lib/bar.common"),
    },
    methods: {
        resize() {
            this.$refs.charts.echarts.resize();
        },
        handleClick(index) {
            this.index = index;
        },
    },
    data() {
        return {
            chartExtend: {
                series: {
                    label: { show: true },
                },
            },
        }
    }
}

export default mixin