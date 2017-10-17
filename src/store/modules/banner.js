import Vue from 'vue'

const ENDPOINT = process.env.API_VERSION + '/site/banners'

export default {
  state: {
    bannersLargeRectangle: [],
    bannersHalfPage: [],
    bannersOutdoor: []
  },

  mutations: {
    setBannersLargeRectangle (state, data) {
      state.bannersLargeRectangle = data
    },

    setBannersHalfPage (state, data) {
      state.bannersHalfPage = data
    },

    setBannersOutdoor (state, data) {
      state.bannersOutdoor = data
    }
  },

  actions: {
    getBannersLargeRectangle ({ commit }, params) {
      if (!params.random) {
        params.random = 1
      }
      if (!params.limit) {
        params.limit = 3
      }
      params.size = '336x280'
      Vue.http.get(ENDPOINT, { params: params }).then((response) => {
        commit('setBannersLargeRectangle', response.body)
      })
    },

    getBannersHalfPage ({ commit }, params) {
      params.size = '300x600'
      if (!params.random) {
        params.random = 1
      }
      if (!params.limit) {
        params.limit = 3
      }
      Vue.http.get(ENDPOINT, { params: params }).then((response) => {
        commit('setBannersHalfPage', response.body)
      })
    },

    getBannersOutdoor ({ commit }, params) {
      params.size = '970x250'
      if (!params.random) {
        params.random = 1
      }
      if (!params.limit) {
        params.limit = 1
      }
      Vue.http.get(ENDPOINT, { params: params }).then((response) => {
        commit('setBannersOutdoor', response.body)
      })
    }
  }
}
