import Vue from 'vue'

const ENDPOINT = process.env.API_VERSION + '/ads'

export default {
  state: {
    ads: [],
    ad: {
      address: {},
      contact: {},
      user: {},
      details: [],
      photos: []
    }
  },

  getters: {
    getAdById: (state, getters) => (id) => {
      if (state.ads.data) {
        return state.ads.data.find(ad => ad.id === id)
      } else {
        return {}
      }
    }
  },

  mutations: {
    setAds (state, data) {
      state.ads = data
    },

    setAd (state, data) {
      state.ad = data
    }
  },

  actions: {
    getAds ({ commit }) {
      Vue.http.get(ENDPOINT).then((response) => {
        commit('setAds', response.body)
      })
    },

    getAd ({ commit }, id) {
      return new Promise((resolve, reject) => {
        Vue.http.get(ENDPOINT + '/' + id).then((response) => {
          let ad = response.body
          if (!ad.address) {
            ad.address = {}
          }
          if (!ad.contact) {
            ad.contact = {}
          }
          if (!ad.user) {
            ad.user = {}
          }
          if (!ad.details) {
            ad.details = []
          }
          if (!ad.photos) {
            ad.photos = []
          }
          commit('setAd', ad)
          resolve(response)
        }, (error) => {
          reject(error)
        })
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
