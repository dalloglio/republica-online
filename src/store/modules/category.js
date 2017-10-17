import Vue from 'vue'

const ENDPOINT = process.env.API_VERSION + '/site/categories'

export default {
  state: {
    categories: [],
    category: {
      filters: []
    }
  },

  mutations: {
    setCategories (state, data) {
      state.categories = data
    },

    setCategory (state, data) {
      state.category = data
    }
  },

  actions: {
    getCategories ({ commit }) {
      Vue.http.get(ENDPOINT).then((response) => {
        commit('setCategories', response.body)
      })
    },

    getCategory ({ commit }, id) {
      Vue.http.get(ENDPOINT + '/' + id).then((response) => {
        commit('setCategory', response.body)
      })
    }
  }
}
