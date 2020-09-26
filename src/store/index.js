import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import account from './modules/account'
import character from './modules/character'
import group from './modules/group'
import setting from './modules/setting'
import document from './modules/document'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload
    }
  },
  modules: {
    auth,
    account,
    character,
    group,
    setting,
    document
  }
})
