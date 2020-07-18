import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import account from './modules/account'
import character from './modules/character'
import group from './modules/group'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false
  },
  mutations: {
    setLoading(state, payload){
      state.loading = payload
    }
  },
  actions: {
  },
  modules: {
    auth: auth,
    account: account,
    character: character,
    group: group
  }
})
