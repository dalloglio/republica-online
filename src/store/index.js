import Vue from 'vue'
import Vuex from 'vuex'

import ad from './modules/ad'
import app from './modules/app'
import banner from './modules/banner'
import category from './modules/category'
import filter from './modules/filter'
import form from './modules/form'
import partner from './modules/partner'
import photo from './modules/photo'
import user from './modules/user'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    ad,
    app,
    banner,
    category,
    filter,
    form,
    partner,
    photo,
    user
  }
})
