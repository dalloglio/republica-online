import Vue from 'vue'

const ENDPOINT_CIDADES = process.env.API_URL + '/cidades.json'

export default {
  state: {
    cidades: []
  },

  getters: {
    getCidadeByID: (state) => (id) => {
      return state.cidades.find((cidade) => cidade.ID === id)
    },
    getCidadeByNome: (state) => (nome) => {
      return state.cidades.find((cidade) => cidade.Nome === nome)
    }
  },

  mutations: {
    setCidades (state, data) {
      state.cidades = data
    }
  },

  actions: {
    getCidades ({ commit, state }) {
      return new Promise((resolve, reject) => {
        if (state.cidades.length) {
          resolve(state.cidades)
        } else {
          Vue.http.get(ENDPOINT_CIDADES).then((response) => {
            commit('setCidades', response.body)
            resolve(state.cidades)
          }, (error) => reject(error))
        }
      })
    }
  }
}
