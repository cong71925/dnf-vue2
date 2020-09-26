import axios from "../../axios"
import encrypt from "../../utils/encrypt.js"
const state = {
    userID: 0,
    token: null,
    isLogin: false,
    nickname: "",
    expire: 0,
    expireTime: 0
}
const mutations = {
    login(state, payload) {
        state.userID = payload.userID
        state.token = payload.token
        state.isLogin = true
        state.nickname = payload.nickname
        state.expire = payload.expire
        state.expireTime = new Date().getTime() / 1000 + payload.expire
        localStorage.setItem('userID', payload.userID)
        localStorage.setItem('token', payload.token)
        localStorage.setItem('isLogin', true)
        localStorage.setItem('nickname', payload.nickname)
        localStorage.setItem('expire', payload.expire)
        localStorage.setItem('expireTime', state.expireTime)
    },
    logout(state) {
        state.userID = 0
        state.token = null
        state.isLogin = false
        state.nickname = null
        state.expire = 0
        state.expireTime = 0
        localStorage.removeItem('userID')
        localStorage.removeItem('token')
        localStorage.removeItem('isLogin')
        localStorage.removeItem('nickname')
        localStorage.removeItem('expire')
        localStorage.removeItem('expireTime')
    },
    setToken(state, payload) {
        state.userID = payload.userID
        state.token = payload.token
        state.isLogin = true
        state.nickname = payload.nickname
        state.expire = payload.expire
        state.expireTime = payload.expireTime
    },
    // 刷新token有效期
    refreshExpireTime(state) {
        state.expireTime = new Date().getTime() / 1000 + state.expire
        localStorage.setItem('expireTime', state.expireTime)
    }
}
const actions = {
    login({ commit }, payload) {
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
                        commit('login', response.data.data)
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
    logout({ commit }) {
        return new Promise((resolve, reject) => {
            axios({
                url: 'logout',
                method: 'get'
            })
                .then(response => {
                    if (response.data.code === 0) {
                        commit('logout')
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
    register(content, payload) {
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
    getToken({ commit }) {
        if (localStorage.getItem('isLogin')) {
            const userID = Number(localStorage.getItem('userID'))
            const token = localStorage.getItem('token')
            const nickname = localStorage.getItem('nickname')
            const expire = Number(localStorage.getItem('expire'))
            const expireTime = Number(localStorage.getItem('expireTime'))
            const time = new Date().getTime() / 1000
            if (time > expireTime) {
                commit('logout')
            } else {
                commit('setToken', {
                    userID: userID,
                    token: token,
                    nickname: nickname,
                    expire: expire,
                    expireTime: expireTime
                })
            }
        }
    }
}
const getters = {}

export default { state, mutations, actions, getters, namespaced: true }