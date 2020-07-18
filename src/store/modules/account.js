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
    logout(state) {
        state.userID = 0
        state.token = null
        state.isLogin = false
        localStorage.removeItem('userID')
        localStorage.removeItem('token')
    },
    setToken(state, payload) {
        state.userID = payload.userID
        state.token = payload.token
        state.isLogin = true
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
                        context.commit('setCharacterTypeNums', response.data.data)
                        console.log(response.data)
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
    logout(context) {
        return new Promise((resolve, reject) => {
            axios({
                url: 'logout',
                method: 'get'
            })
                .then(response => {
                    if (response.data.code === 0) {
                        context.commit('logout')
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
    infoModify(context, payload) {
        console.log(payload)
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
                        console.log(response.data)
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
        console.log(payload)
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
                    console.log(response.data)
                    if (response.data.code === 0) {
                        console.log(response.data)
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