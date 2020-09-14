import axios from 'axios'
import store from '../store'
axios.defaults.baseURL = './api/'
axios.defaults.headers['Content-Type'] = 'application/json; charset=UTF-8'
axios.defaults.withCredentials = true

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    store.commit('setLoading', true)
    // 除登录与注册外所有请求附上token
    if (config.url !== 'login' && config.url !== 'register') {
        config.headers['token'] = store.state.auth.token
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    store.commit('setLoading', false)
    return Promise.reject(error);
})

// http response 拦截器
axios.interceptors.response.use(function (config) {
    //拦截响应，做统一处理 
    store.commit('setLoading', false)
    // token过期时注销
    if(config.data.code === -201){
        store.commit("auth/logout");
    } else {
        store.commit('auth/refreshExpireTime')
    }
    return config
}, function (error) {
    store.commit('setLoading', false)
    return Promise.reject(error)
})

export default axios