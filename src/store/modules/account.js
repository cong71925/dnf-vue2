import axios from "../../axios"
import encrypt from "../../utils/encrypt.js"
const state = {
    userInfo: {},
    characterTypeNums: {}
}
const mutations = {
    setUserInfo(state, payload) {
        state.userInfo = payload
    },
    setCharacterTypeNums(state, payload){
        state.characterTypeNums = payload
    }
}
const actions = {
    getUserInfo(context) {
        return new Promise((resolve, reject) => {
            axios({
                url: 'account',
                method: 'get'
            })
                .then(response => {
                    if (response.data.code === 0) {
                        context.commit('setUserInfo', response.data.data)
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
    getCharacterTypeNums(context){
        return new Promise((resolve, reject) => {
            axios({
                url: 'account/getCharacterTypeNums',
                method: 'get'
            })
                .then(response => {
                    if (response.data.code === 0) {
                        context.commit('setCharacterTypeNums', response.data.data)                        resolve()
                    } else {
                        reject(response.data.msg)
                    }
                })
                .catch(() => {
                    reject("网络连接错误或服务器无响应！")
                })
        })
    },
    infoModify(context, payload) {
        return new Promise((resolve, reject) => {
            axios({
                url: 'account',
                method: 'post',
                data: {
                    username: payload.username,
                    nickname: payload.nickname,
                    server0: payload.serverSelect[0],
                    server1: payload.serverSelect[1],
                    club: payload.club
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
    passwordModify(context, payload) {
        return new Promise((resolve, reject) => {
            axios({
                url: 'account/updatePassword',
                method: 'post',
                data: {
                    passwordOld: encrypt.EncryptSha1(payload.passwordOld),
                    passwordNew: encrypt.EncryptSha1(payload.passwordNew)
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
    }

}
const getters = {}

export default { state, mutations, actions, getters, namespaced: true }