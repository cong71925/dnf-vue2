import axios from "../../axios"
import encrypt from "../../utils/encrypt.js"
const state = {
    userID: 0,
    token: null,
    isLogin: false,
    nickname: ""
}
const mutations = {
    login(state, payload) {
        state.userID = payload.userID
        state.token = payload.token
        state.isLogin = true
        state.nickname = payload.nickname
        sessionStorage.setItem('userID', payload.userID)
        sessionStorage.setItem('token', payload.token)
        sessionStorage.setItem('isLogin', true)
        sessionStorage.setItem('nickname', payload.nickname)
    },
    logout(state) {
        state.userID = 0
        state.token = null
        state.isLogin = false
        sessionStorage.removeItem('userID')
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('isLogin')
        sessionStorage.removeItem('nickname')
    },
    setToken(state, payload) {
        state.userID = payload.userID
        state.token = payload.token
        state.isLogin = true
        state.nickname = payload.nickname
    }
}
const actions = {
    login(context, payload) {
        return new Promise((resolve, reject) => {
            axios({
                url: 'login',
                method: 'post',
                data: {
                    username: payload.username,
                    password: encrypt.EncryptSha1(payload.password)
                }
            })
                .then(response => {
                    if (response.data.code === 0) {
                        context.commit('login', response.data.data)
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
    register(context, payload) {
        return new Promise((resolve, reject) => {
            axios({
                url: 'register',
                method: 'post',
                data: {
                    username: payload.username,
                    password: encrypt.EncryptSha1(payload.password),
                    nickname: payload.nickname,
                    server0: payload.server_select[0],
                    server1: payload.server_select[1],
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
    getToken(context) {
        if (sessionStorage.getItem('isLogin')) {
            const userID = sessionStorage.getItem('userID')
            const token = sessionStorage.getItem('token')
            const nickname = sessionStorage.getItem('nickname')
            context.commit('setToken', {
                userID: userID,
                token: token,
                nickname: nickname
            })
        }
    }

}
const getters = {}

export default { state, mutations, actions, getters, namespaced: true }