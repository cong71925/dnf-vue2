const setting = require("../../data/config.json").setting
const state = {
    setting: {
        templateCharacter: {
            atk: 0,
            strInt: 0,
            systemBuff: 0
        }
    }
}
const mutations = {
    saveSetting(state, payload) {
        state.setting = payload
        localStorage.setItem('setting', JSON.stringify(state.setting))
    },
    loadSetting(state) {
        const payload = JSON.parse(localStorage.getItem('setting'))
        for (let i in setting) {
            if (payload === null) {
                if (setting[i] instanceof Object) state.setting[i] = { ...setting[i] }
                else state.setting[i] = setting[i]
            }
            else if (payload[i] === undefined) {
                if (setting[i] instanceof Object) state.setting[i] = { ...setting[i] }
                else state.setting[i] = setting[i]
            } else {
                if (payload[i] instanceof Object) state.setting[i] = { ...payload[i] }
                else state.setting[i] = payload[i]
            }
        }
    },
    resetSetting() {
        localStorage.removeItem('setting')
    },
}
const actions = {
    loadSetting(content) {
        content.commit('loadSetting')
    },
    changeLiftRatioTemplate({ commit, state }, payload) {
        let result = { ...state.setting }
        result.templateCharacter.systemBuff = payload.systemBuff
        result.templateCharacter.atk = payload.atk
        result.templateCharacter.strInt = payload.strInt
        commit('saveSetting', result)
    },
    resetLiftRatioTemplate({ state, commit }) {
        return new Promise(resolve => {
            let result = { ...state.setting }
            result.templateCharacter = undefined
            result.systemBuff = undefined
            commit('saveSetting', result)
            resolve()
        })
    },
}
const getters = {}

export default { state, mutations, actions, getters, namespaced: true }