import Vue from 'vue'

export default {
  state: {
    isAuthenticated: false
  },

  getters: {
    isAuthenticated: (state) => {
      return state.isAuthenticated
    }
  },

  mutations: {
    setAuthenticated (state, data) {
      state.isAuthenticated = data
    }
  },

  actions: {
    login ({ commit }, data) {
      return new Promise((resolve, reject) => {
        Vue.auth.login(data).then((response) => {
          commit('setAuthenticated', true)
          resolve(response)
        }, (error) => {
          commit('setAuthenticated', false)
          reject(error)
        })
      })
    },

    logout ({ commit }) {
      Vue.auth.logout()
      commit('setAuthenticated', false)
    },

    passwordReset ({ commit }, data) {
      return new Promise((resolve, reject) => {
        Vue.auth.passwordReset(data).then((response) => {
          resolve(response)
        }, (error) => {
          reject(error)
        })
      })
    },

    passwordEmail ({ commit }, data) {
      return new Promise((resolve, reject) => {
        Vue.auth.passwordEmail(data).then((response) => {
          resolve(response)
        }, (error) => {
          reject(error)
        })
      })
    },

    setAuthenticated ({commit}) {
      commit('setAuthenticated', Vue.auth.isAuthenticated())
    }
  }
}
