import Vue from 'vue'

const ENDPOINT = process.env.API_VERSION + '/photos'

export default {
  getters: {
    urlPhoto: (state) => (photoId) => {
      return Vue.http.options.root + '/photo/' + photoId
    }
  },
  actions: {
    deletePhoto ({ commit }, id) {
      return new Promise((resolve, reject) => {
        Vue.http.delete(ENDPOINT + '/' + id).then((response) => {
          resolve(response)
        }, (error) => {
          reject(error)
        })
      })
    }
  }
}
