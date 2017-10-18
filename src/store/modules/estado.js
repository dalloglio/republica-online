import Vue from 'vue'

const ENDPOINT_ESTADOS = process.env.API_URL + '/estados.json'

export default {
  state: {
    estados: []
  },

  getters: {
    getEstadoByID: (state) => (id) => {
      return state.estados.find((estado) => estado.ID === id) || {}
    },
    getEstadoBySigla: (state) => (sigla) => {
      return state.estados.find((estado) => estado.Sigla === sigla) || {}
    }
  },

  mutations: {
    setEstados (state, data) {
      state.estados = data
    }
  },

  actions: {
    getEstados ({ commit, state }) {
      return new Promise((resolve, reject) => {
        if (state.estados.length) {
          resolve(state.estados)
        } else {
          Vue.http.get(ENDPOINT_ESTADOS).then((response) => {
            commit('setEstados', response.body)
            resolve(state.estados)
          }, (error) => reject(error))
        }
      })
    }
  }
}
