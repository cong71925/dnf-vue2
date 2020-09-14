const mixin = {
    props: {
        data: {
            type: Array,
            default: () => []
        },
        hidden: {
            type: Array,
            default: () => []
        }
    },
    computed: {
        showColumnList() {
            let result = {
                character_name: true,
                class_1: true,
                nickname: true,
            }
            this.hidden.forEach((value) => {
                for (let i in result) {
                    if (i === value) result[i] = false
                }
            })
            return result
        },
        classFilters() {
            let map = new Map();
            let result = [];
            for (let i of this.data) {
                if (!map.has(i.class_1)) {
                    map.set(i.class_1, i.class_1);
                }
            }
            map.forEach((value, index) => {
                result.push({ text: index, value: index });
            });
            return result;
        },
        nicknameFilters() {
            let map = new Map();
            let result = [];
            for (let i of this.data) {
                if (!map.has(i.nickname)) {
                    map.set(i.nickname, i.nickname);
                }
            }
            map.forEach((value, index) => {
                result.push({ text: index, value: index });
            });
            return result;
        },
    },
    methods: {
        filterHandler(value, row, column) {
            const property = column["property"];
            return row[property] === value;
        },
    },
}

export default mixin