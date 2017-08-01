import Vue from 'vue'

const ENDPOINT = process.env.API_VERSION + '/partners'

export default {
  state: {
    partners: [],
    partner: {
      photo: {
        id: null,
        name: null,
        photo: null,
        size: null,
        type: null,
        url: null
      }
    }
  },

  getters: {
    getPartnerById: (state, getters) => (id) => {
      if (state.partners.data) {
        return state.partners.data.find(partner => partner.id === id)
      } else {
        return {}
      }
    }
  },

  mutations: {
    setPartners (state, data) {
      state.partners = data
    },

    setPartner (state, data) {
      state.partner = data
    }
  },

  actions: {
    getPartners ({ commit }) {
      Vue.http.get(ENDPOINT).then((response) => {
        commit('setPartners', response.body)
      })
    },

    getPartner ({ commit }, id) {
      Vue.http.get(ENDPOINT + '/' + id).then((response) => {
        commit('setPartner', response.body)
      })
    },

    createPartner ({ commit }, data) {
      return new Promise((resolve, reject) => {
        Vue.http.post(ENDPOINT, data).then((response) => {
          resolve(response)
        }, (error) => {
          reject(error)
        })
      })
    },

    updatePartner ({ commit }, params) {
      return new Promise((resolve, reject) => {
        Vue.http.put(ENDPOINT + '/' + params.id, params.data).then((response) => {
          resolve(response)
        }, (error) => {
          reject(error)
        })
      })
    },

    deletePartner ({ commit }, id) {
      return new Promise((resolve, reject) => {
        Vue.http.delete(ENDPOINT + '/' + id).then((response) => {
          resolve(response)
        }, (error) => {
          reject(error)
        })
      })
    },

    createPartnerPhoto ({ commit }, params) {
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
