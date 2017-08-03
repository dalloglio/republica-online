import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    app
  }
})
