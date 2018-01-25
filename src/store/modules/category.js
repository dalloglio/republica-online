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
    getCategories ({ commit }, params) {
      return Vue.http.get(ENDPOINT, {
        params
      }).then((response) => {
        commit('setCategories', response.body)
      })
    },

    getCategory ({ commit }, id) {
      return Vue.http.get(ENDPOINT + '/' + id).then((response) => {
        commit('setCategory', response.body)
      })
    },

    getCategoryBySlug ({ commit }, slug) {
      return Vue.http.get(ENDPOINT + '/' + slug).then((response) => {
        commit('setCategory', response.body)
      })
    }
  }
}
