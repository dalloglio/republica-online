import Vue from 'vue'

const ENDPOINT = process.env.API_VERSION + '/users'

export default {
  state: {
    users: [],
    user: {
      address: {
        zip_code: '',
        street: '',
        number: '',
        sub_address: '',
        neighborhood: '',
        country: 'Brasil',
        state: '',
        city: '',
        show_on_map: '0'
      },
      photo: {}
    }
  },

  getters: {
    getUserById: (state, getters) => (id) => {
      if (state.users.data) {
        return state.users.data.find(user => user.id === id)
      } else {
        return {}
      }
    }
  },

  mutations: {
    setUsers (state, data) {
      state.users = data
    },

    setUser (state, data) {
      state.user = data
    }
  },

  actions: {
    getUsers ({ commit }) {
      return new Promise((resolve, reject) => {
        Vue.http.get(ENDPOINT).then((response) => {
          commit('setUsers', response.body)
          resolve(response)
        }, (error) => {
          reject(error)
        })
      })
    },

    getUser ({ commit }, id) {
      return new Promise((resolve, reject) => {
        Vue.http.get(ENDPOINT + '/' + id).then((response) => {
          let user = response.body
          if (!user.address) {
            user.address = {
              zip_code: '',
              street: '',
              number: '',
              sub_address: '',
              neighborhood: '',
              country: 'Brasil',
              state: '',
              city: '',
              show_on_map: '0'
            }
          }
          if (!user.photo) {
            user.photo = {}
          }
          commit('setUser', user)
          resolve(response)
        }, (error) => {
          reject(error)
        })
      })
    },

    createUser ({ commit }, data) {
      return new Promise((resolve, reject) => {
        Vue.http.post(ENDPOINT, data).then((response) => {
          resolve(response)
        }, (error) => {
          reject(error)
        })
      })
    },

    updateUser ({ commit }, params) {
      return new Promise((resolve, reject) => {
        Vue.http.put(ENDPOINT + '/' + params.id, params.data).then((response) => {
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

    createUserPhoto ({ commit }, params) {
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
