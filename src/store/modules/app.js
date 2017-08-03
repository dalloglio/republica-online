export default {
  state: {
    page: 'home'
  },

  getters: {
    appPageIs: (state) => (page) => {
      return state.page === page || false
    }
  },

  mutations: {
    setPage (state, page) {
      state.page = page
    }
  },

  actions: {
    setPage ({ commit }, page) {
      commit('setPage', page)
    }
  }
}
