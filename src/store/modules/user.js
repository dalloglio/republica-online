import Vue from 'vue'

const ENDPOINT = process.env.API_VERSION + '/users'

export default {
  state: {
    user: {
      name: '',
      address: {},
      photo: {}
    },
    favorites: [],
    adFavorite: {}
  },

  getters: {
    userName: state => {
      let name = state.user.name
      if (!name) {
        return ''
      }
      let names = name.split(' ', 2)
      return names.join(' ')
    }
  },

  mutations: {
    setUser (state, data) {
      state.user = data
    },

    setUserFavorites (state, data) {
      state.favorites = data
    },

    setUserAdFavorite (state, data) {
      state.adFavorite = data
    }
  },

  actions: {
    getUser ({ commit }, id) {
      Vue.http.get(process.env.API_VERSION + '/user').then((response) => {
        commit('setUser', response.body)
      })
    },

    registerUser ({ commit }, data) {
      return new Promise((resolve, reject) => {
        Vue.http.post(ENDPOINT + '/register', data).then((response) => {
          resolve(response)
        }, (error) => {
          reject(error)
        })
      })
    },

    loginFacebook ({ commit }, data) {
      return new Promise((resolve, reject) => {
        Vue.http.post(ENDPOINT + '/facebook', data).then((response) => {
          resolve(response)
        }, (error) => {
          reject(error)
        })
      })
    },

    updateUser ({ commit }, data) {
      return new Promise((resolve, reject) => {
        Vue.http.put(process.env.API_VERSION + '/user', data).then((response) => {
          resolve(response)
        }, (error) => {
          reject(error)
        })
      })
    },

    updateUserPassword ({ commit }, data) {
      return new Promise((resolve, reject) => {
        Vue.http.patch(process.env.API_VERSION + '/user/password', data).then((response) => {
          resolve(response)
        }, (error) => {
          reject(error)
        })
      })
    },

    deleteUser ({ commit }, id) {
      return new Promise((resolve, reject) => {
        Vue.http.delete(ENDPOINT + '/' + id).then((response) => {
          resolve(response)
        }, (error) => {
          reject(error)
        })
      })
    },

    updateUserPhoto ({ commit }, data) {
      return new Promise((resolve, reject) => {
        Vue.http.post(process.env.API_VERSION + '/user/photo', data).then((response) => {
          resolve(response)
        }, (error) => {
          reject(error)
        })
      })
    },

    getUserFavorite ({ commit }, id) {
      Vue.http.get(process.env.API_VERSION + '/user/favorites/ads/' + id).then((response) => {
        commit('setUserAdFavorite', response.body)
      })
    },
    getUserFavorites ({ commit }) {
      Vue.http.get(process.env.API_VERSION + '/user/favorites').then((response) => {
        commit('setUserFavorites', response.body)
      })
    },
    createUserFavorite ({ commit }, id) {
      return new Promise((resolve, reject) => {
        Vue.http.post(process.env.API_VERSION + '/user/favorites/ads/' + id).then((response) => {
          resolve(response)
        }, (error) => {
          reject(error)
        })
      })
    },
    deleteUserFavorite ({ commit }, id) {
      return new Promise((resolve, reject) => {
        Vue.http.delete(process.env.API_VERSION + '/user/favorites/' + id).then((response) => {
          resolve(response)
        }, (error) => {
          reject(error)
        })
      })
    }
  }
}
