import Vue from 'vue'

const ENDPOINT = process.env.API_VERSION + '/site/partners'

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

  mutations: {
    setPartners (state, data) {
      state.partners = data
    },

    setPartner (state, data) {
      state.partner = data
    }
  },

  actions: {
    getPartners ({ commit }, params) {
      Vue.http.get(ENDPOINT, {
        params
      }).then((response) => {
        commit('setPartners', response.body)
      })
    },

    getPartner ({ commit }, id) {
      Vue.http.get(ENDPOINT + '/' + id).then((response) => {
        commit('setPartner', response.body)
      })
    }
  }
}
