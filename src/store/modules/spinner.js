export default {
  state: {
    title: 'Aguarde...',
    description: 'Estamos carregando o conteúdo...'
  },

  mutations: {
    setSpinnerTitle (state, data) {
      state.title = data
    },
    setSpinnerDescription (state, data) {
      state.description = data
    }
  },

  actions: {
    setSpinnerTitle ({ commit }, data) {
      commit('setSpinnerTitle', data)
    },
    setSpinnerDescription ({ commit }, data) {
      commit('setSpinnerDescription', data)
    }
  }
}
