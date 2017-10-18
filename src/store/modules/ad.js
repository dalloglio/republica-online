import Vue from 'vue'

const ENDPOINT = process.env.API_VERSION + '/site/ads'

export default {
  state: {
    ads: [],
    ad: {},
    latest: [],
    filters: {
      prices: {},
      categories: [],
      estados: [],
      cidades: []
    },
    contact: {
      ad: {
        photo: {}
      }
    }
  },

  mutations: {
    setAds (state, data) {
      state.ads = data
    },

    setAd (state, data) {
      state.ad = data
    },

    setAdContact (state, data) {
      state.contact = data
    },

    setLatest (state, data) {
      state.latest = data
    },

    setAdsFilterPrices (state, data) {
      state.filters.prices = data
    },

    setAdsFilterCategories (state, data) {
      state.filters.categories = data
    },

    setAdsFilterStates (state, data) {
      state.filters.estados = data
    },

    setAdsFilterCities (state, data) {
      state.filters.cidades = data
    }
  },

  actions: {
    getAdsUser ({ commit }) {
      Vue.http.get(process.env.API_VERSION + '/user/ads').then((response) => {
        commit('setAds', response.body)
      })
    },
    getAdUser ({ commit }, id) {
      Vue.http.get(process.env.API_VERSION + '/user/ads/' + id).then((response) => {
        commit('setAd', response.body)
      })
    },
    getAdsContactsUser ({ commit }) {
      Vue.http.get(process.env.API_VERSION + '/user/ads/contacts').then((response) => {
        commit('setAds', response.body)
      })
    },
    getAdContactUser ({ commit }, params) {
      Vue.http.get(process.env.API_VERSION + '/user/ads/' + params.ad_id + '/contacts/' + params.id).then((response) => {
        commit('setAdContact', response.body)
      })
    },
    getAds ({ commit }, params) {
      Vue.http.get(ENDPOINT, {
        params
      }).then((response) => {
        commit('setAds', response.body)
      })
    },
    getAdBySlug ({ commit }, slug) {
      Vue.http.get(ENDPOINT + '/' + slug).then((response) => {
        commit('setAd', response.body)
      })
    },
    getAd ({ commit }, id) {
      Vue.http.get(ENDPOINT + '/' + id).then((response) => {
        commit('setAd', response.body)
      })
    },
    getLatestAds ({ commit }, params) {
      Vue.http.get(ENDPOINT + '/latest', {
        params
      }).then((response) => {
        commit('setLatest', response.body)
      })
    },
    getAdsFilterPrices ({ commit }, params) {
      Vue.http.get(ENDPOINT + '/prices').then((response) => {
        commit('setAdsFilterPrices', response.body)
      })
    },
    getAdsFilterCategories ({ commit }, params) {
      Vue.http.get(ENDPOINT + '/categories').then((response) => {
        commit('setAdsFilterCategories', response.body)
      })
    },
    getAdsFilterStates ({ commit }, params) {
      Vue.http.get(ENDPOINT + '/states').then((response) => {
        commit('setAdsFilterStates', response.body)
      })
    },
    getAdsFilterCities ({ commit }, id) {
      Vue.http.get(ENDPOINT + '/states/' + id + '/cities').then((response) => {
        commit('setAdsFilterCities', response.body)
      })
    },
    createAd ({ commit }, data) {
      return new Promise((resolve, reject) => {
        Vue.http.post(process.env.API_VERSION + '/user/ads', data).then((response) => {
          resolve(response)
        }, (error) => {
          reject(error)
        })
      })
    },
    updateAd ({ commit }, params) {
      return new Promise((resolve, reject) => {
        Vue.http.put(process.env.API_VERSION + '/user/ads/' + params.id, params.data).then((response) => {
          resolve(response)
        }, (error) => {
          reject(error)
        })
      })
    },
    deleteAd ({ commit }, id) {
      return new Promise((resolve, reject) => {
        Vue.http.delete(process.env.API_VERSION + '/user/ads/' + id).then((response) => {
          resolve(response)
        }, (error) => {
          reject(error)
        })
      })
    },
    createAdContact ({ commit }, params) {
      return new Promise((resolve, reject) => {
        Vue.http.post(ENDPOINT + '/' + params.id + '/contacts', params.data).then((response) => {
          resolve(response)
        }, (error) => {
          reject(error)
        })
      })
    },
    deleteAdContact ({ commit }, params) {
      return new Promise((resolve, reject) => {
        Vue.http.delete(process.env.API_VERSION + '/user/ads/' + params.ad_id + '/contacts/' + params.id).then((response) => {
          resolve(response)
        }, (error) => {
          reject(error)
        })
      })
    },
    createAdPhoto ({ commit }, params) {
      return new Promise((resolve, reject) => {
        Vue.http.post(process.env.API_VERSION + '/user/ads/' + params.id + '/photos', params.data).then((response) => {
          resolve(response)
        }, (error) => {
          reject(error)
        })
      })
    },
    favoriteAdPhoto ({ commit }, params) {
      return new Promise((resolve, reject) => {
        Vue.http.post(process.env.API_VERSION + '/user/ads/' + params.ad_id + '/photos/' + params.id + '/favorite').then((response) => {
          resolve(response)
        }, (error) => {
          reject(error)
        })
      })
    }
  }
}
