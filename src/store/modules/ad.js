import Vue from 'vue'

const ENDPOINT = process.env.API_VERSION + '/ads'

export default {
  state: {
    ads: [],
    ad: {},
    latest: [],
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
    }
  },

  actions: {
    getAdsUser ({ commit }) {
      Vue.http.get(process.env.API_VERSION + '/user/ads').then((response) => {
        commit('setAds', response.body)
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
    getAds ({ commit }) {
      Vue.http.get(ENDPOINT).then((response) => {
        commit('setAds', response.body)
      })
    },

    getAd ({ commit }, id) {
      Vue.http.get(ENDPOINT + '/' + id).then((response) => {
        commit('setAd', response.body)
      })
    },

    getLatest ({ commit }, id) {
      Vue.http.get(ENDPOINT + '/' + id + '/latest').then((response) => {
        commit('setLatest', response.body)
      })
    },

    createAd ({ commit }, data) {
      return new Promise((resolve, reject) => {
        Vue.http.post(ENDPOINT, data).then((response) => {
          resolve(response)
        }, (error) => {
          reject(error)
        })
      })
    },

    updateAd ({ commit }, params) {
      return new Promise((resolve, reject) => {
        Vue.http.put(ENDPOINT + '/' + params.id, params.data).then((response) => {
          resolve(response)
        }, (error) => {
          reject(error)
        })
      })
    },

    deleteAd ({ commit }, id) {
      return new Promise((resolve, reject) => {
        Vue.http.delete(ENDPOINT + '/' + id).then((response) => {
          resolve(response)
        }, (error) => {
          reject(error)
        })
      })
    },

    createAdPhoto ({ commit }, params) {
      return new Promise((resolve, reject) => {
        Vue.http.post(ENDPOINT + '/' + params.id + '/photos', params.data).then((response) => {
          resolve(response)
        }, (error) => {
          reject(error)
        })
      })
    }
  }
}
