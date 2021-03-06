import axios from "../../axios"
const state = {}
const mutations = {}
const actions = {
    getCharacterList(content, payload) {
        return new Promise((resolve, reject) => {
            axios({
                url: 'character',
                method: 'get',
                params: {
                    page: payload.page,
                    pageSize: payload.pageSize
                }
            })
                .then(response => {
                    if (response.data.code === 0) {
                        resolve(response.data.data)
                    } else {
                        reject(response.data.msg)
                    }
                })
                .catch(() => {
                    reject("网络连接错误或服务器无响应！")
                })
        })
    },
    getCharacterHistorical(content, payload) {
        return new Promise((resolve, reject) => {
            axios({
                url: 'character/' + payload,
                method: 'get'
            })
                .then(response => {
                    if (response.data.code === 0) {
                        resolve(response.data.data)
                    } else {
                        reject(response.data.msg)
                    }
                })
                .catch(() => {
                    reject("网络连接错误或服务器无响应！")
                })
        })
    },
    createCharacter(content, payload) {
        return new Promise((resolve, reject) => {
            axios({
                url: 'character',
                method: 'post',
                data: {
                    character_name: payload.character_name,
                    job: payload.job[0],
                    class_0: payload.class[0],
                    class_1: payload.class[1],
                    damage_15s: payload.damage_15s,
                    damage_20s: payload.damage_20s,
                    buff_default: payload.buff_default,
                    buff_atk: payload.buff_atk,
                    buff_burst: payload.buff_burst
                }
            })
                .then(response => {
                    if (response.data.code === 0) {
                        resolve()
                    } else {
                        reject(response.data.msg)
                    }
                })
                .catch(() => {
                    reject("网络连接错误或服务器无响应！")
                })
        })
    },
    deleteCharacter(content, payload) {
        return new Promise((resolve, reject) => {
            axios({
                url: 'character/' + payload,
                method: 'delete'
            })
                .then(response => {
                    if (response.data.code === 0) {
                        resolve()
                    } else {
                        reject(response.data.msg)
                    }
                })
                .catch(() => {
                    reject("网络连接错误或服务器无响应！")
                })
        })
    },
    updateCharacter(content, payload) {
        return new Promise((resolve, reject) => {
            axios({
                url: 'character/' + payload.character_id,
                method: 'put',
                data: {
                    character_name: payload.character_name,
                    job: payload.job[0],
                    class_0: payload.class[0],
                    class_1: payload.class[1],
                    damage_15s: payload.damage_15s,
                    damage_20s: payload.damage_20s,
                    buff_default: payload.buff_default,
                    buff_atk: payload.buff_atk,
                    buff_burst: payload.buff_burst
                }
            })
                .then(response => {
                    if (response.data.code === 0) {
                        resolve()
                    } else {
                        reject(response.data.msg)
                    }
                })
                .catch(() => {
                    reject("网络连接错误或服务器无响应！")
                })
        })
    },
    deleteCharacterHistorical(content, payload) {
        return new Promise((resolve, reject) => {
            axios({
                url: 'character/historical/' + payload,
                method: 'delete'
            })
                .then(response => {
                    if (response.data.code === 0) {
                        resolve()
                    } else {
                        reject(response.data.msg)
                    }
                })
                .catch(() => {
                    reject("网络连接错误或服务器无响应！")
                })
        })
    },

}
const getters = {}

export default { state, mutations, actions, getters, namespaced: true }