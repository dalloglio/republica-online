import router from '@/router'

const TOKEN_NAME = 'token'
const OAUTH_TOKEN_URI = process.env.API_URL + '/oauth/token'
const PASSWORD_EMAIL_URI = process.env.API_VERSION + '/password/email'
const PASSWORD_RESET_URI = process.env.API_VERSION + '/password/reset'
const LOGIN_REDIRECT = 'dashboard.home'
const LOGOUT_REDIRECT = 'auth.login'

export default {
  install (Vue, options) {
    Vue.auth = {
      login (user) {
        return new Promise((resolve, reject) => {
          Vue.http.post(OAUTH_TOKEN_URI, {
            grant_type: 'password',
            client_id: options.client_id,
            client_secret: options.client_secret,
            username: user.username,
            password: user.password,
            scope: ''
          }).then((response) => {
            this.setToken(response.body)
            if (this.isAuthenticated()) {
              resolve({
                status: true,
                redirect: LOGIN_REDIRECT
              })
            } else {
              reject({
                status: false,
                message: 'Você não esta autenticado.'
              })
            }
          }, (error) => {
            reject({
              status: false,
              error: error.body.error,
              message: error.body.message
            })
          })
        })
      },

      logout () {
        this.destroyToken()
        router.push({ name: LOGOUT_REDIRECT })
      },

      passwordReset (user) {
        return new Promise((resolve, reject) => {
          Vue.http.post(PASSWORD_RESET_URI, {
            email: user.email,
            password: user.password,
            password_confirmation: user.password_confirmation,
            token: user.token
          }).then((response) => {
            resolve(response)
          }, (error) => {
            reject(error)
          })
        })
      },

      passwordEmail (user) {
        return new Promise((resolve, reject) => {
          Vue.http.post(PASSWORD_EMAIL_URI, { email: user.email }).then((response) => {
            resolve(response)
          }, (error) => {
            reject(error)
          })
        })
      },

      setToken (token) {
        if (!token) {
          token = {
            token_type: '',
            expires_in: 0,
            expires: 0,
            access_token: '',
            request_token: ''
          }
        }

        if (token.expires_in) {
          let segundos = parseInt(token.expires_in)
          let now = Date.now()
          let expires = segundos * 1000
          token.expires = now + expires
          delete token.expires_in
        }

        localStorage.setItem(TOKEN_NAME, JSON.stringify(token))
      },

      getToken () {
        let token = localStorage.getItem(TOKEN_NAME)

        if (!token) {
          return null
        }

        token = JSON.parse(token)

        let now = Date.now()
        let expires = parseInt(token.expires)

        if (now > expires) {
          this.logout()
        }

        return token
      },

      destroyToken () {
        localStorage.removeItem(TOKEN_NAME)
      },

      getAccessToken () {
        let token = this.getToken()
        if (!token) {
          return ''
        }
        return token.access_token
      },

      isAuthenticated () {
        let token = this.getToken()
        if (!token) {
          return false
        }
        return true
      }
    }

    Object.defineProperties(Vue.prototype, {
      $auth: {
        get: () => {
          return Vue.auth
        }
      }
    })
  }
}
