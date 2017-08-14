import Vue from 'vue'

export default {
  state: {
    isAuthenticated: false
  },

  mutations: {
    isAuthenticated (state, data) {
      state.isAuthenticated = data
    }
  },

  actions: {
    login ({ commit }, data) {
      return new Promise((resolve, reject) => {
        Vue.auth.login(data).then((response) => {
          commit('isAuthenticated', response.status)
          resolve(response)
        }, (error) => {
          commit('isAuthenticated', error.status)
          reject(error)
        })
      })
    },

    logout ({ commit }) {
      commit('isAuthenticated', false)
      Vue.auth.logout()
    }
  }
}
