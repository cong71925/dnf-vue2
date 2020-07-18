import axios from "../../axios"
const state = {
    characterList: [],
    historicalList: [],
    count: 0
}
const mutations = {
    setCharacterList(state, payload) {
        state.characterList = payload.list
        state.count = payload.count
    },
    setHistoricalList(state, payload) {
        state.historicalList = payload
    }
}
const actions = {
    getCharacterList(context, payload) {
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
                        console.log(response.data)
                        context.commit('setCharacterList', response.data.data)
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
    getCharacterHistorical(context, payload) {
        return new Promise((resolve, reject) => {
            axios({
                url: 'character/' + payload,
                method: 'get'
            })
                .then(response => {
                    if (response.data.code === 0) {
                        console.log(response.data)
                        context.commit('setHistoricalList', response.data.data)
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
    createCharacter(context, payload) {
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
    deleteCharacter(context, payload) {
        return new Promise((resolve, reject) => {
            axios({
                url: 'character/' + payload,
                method: 'delete'
            })
                .then(response => {
                    console.log(response.data)
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
    updateCharacter(context, payload) {
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
    deleteCharacterHistorical(context, payload) {
        return new Promise((resolve, reject) => {
            axios({
                url: 'character/historical/' + payload,
                method: 'delete'
            })
                .then(response => {
                    console.log(response.data)
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