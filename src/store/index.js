import Vue from 'vue'
import Vuex from 'vuex'

import ad from './modules/ad'
import app from './modules/app'
import auth from './modules/auth'
import banner from './modules/banner'
import category from './modules/category'
import cidade from './modules/cidade'
import estado from './modules/estado'
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
    auth,
    banner,
    category,
    cidade,
    estado,
    filter,
    form,
    partner,
    photo,
    user
  }
})
