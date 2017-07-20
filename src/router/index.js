import Vue from 'vue'
import Router from 'vue-router'
// site
import Home from '@/components/Site/Home'
import Anuncios from '@/components/Site/Anuncios'
import Sobre from '@/components/Site/Sobre'
import Faq from '@/components/Site/Faq'
import Contato from '@/components/Site/Contato'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // site
    { path: '/', name: 'home', component: Home },
    { path: '/anuncios', name: 'anuncios', component: Anuncios },
    { path: '/sobre', name: 'sobre', component: Sobre },
    { path: '/faq', name: 'faq', component: Faq },
    { path: '/contato', name: 'contato', component: Contato }
  ]
})
