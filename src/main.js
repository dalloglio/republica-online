// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
window.$ = window.jQuery = require('jquery')
window.numeral = require('numeral')
require('../node_modules/numeral/locales/pt-br.js')
window.numeral.locale('pt-br')
require('bootstrap-sass')
require('./validator/messages')
require('./validator/validates')

import Vue from 'vue'
import VueResource from 'vue-resource'
import VeeValidate from 'vee-validate'
import App from './App'
import router from './router'
import { store } from './store'
import UtilsAuth from './utils/auth'
import UtilsCep from './utils/cep'
import UtilsDate from './utils/date'
import UtilsUrl from './utils/url'
import UtilsMask from './utils/mask'
import UtilsMessage from './utils/message'
import money from 'v-money'
import Toasted from 'vue-toasted'
import VueAnalytics from 'vue-analytics'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueResource)
Vue.use(VeeValidate, { locale: 'pt_br' })

Vue.use(UtilsAuth, { client_id: process.env.API_CLIENT_ID, client_secret: process.env.API_CLIENT_SECRET })
Vue.use(UtilsCep)
Vue.use(UtilsDate)
Vue.use(UtilsUrl)
Vue.use(UtilsMask)
Vue.use(money, { precision: 2 })
Vue.use(Toasted, {
  position: 'top-right',
  duration: 5000
})
Vue.use(UtilsMessage)
Vue.use(VueAnalytics, {
  id: 'UA-81847611-1',
  router
})
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBXTivuAEMn8JRNyiJGmYHD6KM9UtDuJBs'
    // libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
  }
})

Vue.http.options.root = process.env.API_URL

Vue.http.interceptors.push(function (request, next) {
  request.headers.set('Authorization', 'Bearer ' + Vue.auth.getAccessToken())
  next()
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
