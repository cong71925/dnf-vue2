import axios from "../../axios"
const state = {
    // 文档存放的相对位置
    path: "../static/document/",
    catalogue: []
}
const mutations = {
    setCatalogue(state, payload) {
        state.catalogue = payload
    },
}
const actions = {
    getCatalogue({ state, commit }) {
        return new Promise((resolve, reject) => {
            axios({
                url: state.path + "catalogue.json",
                method: 'get'
            })
                .then(response => {
                    commit('setCatalogue', response.data)
                    resolve(response.data)
                })
                .catch(() => {
                    reject("获取文档目录失败！")
                })
        })
    },
    getMD({ state }, fileName) {
        return new Promise((resolve, reject) => {
            axios({
                url: state.path + fileName + ".md",
                method: 'get'
            })
                .then(response => {
                    resolve(response.data)
                })
                .catch(() => {
                    reject("文档不存在！")
                })
        })
    }
}
const getters = {}

export default { state, mutations, actions, getters, namespaced: true }