import Vue from 'vue'
import Router from 'vue-router'

// Site
import Home from '@/components/Site/Home'
import Anuncios from '@/components/Site/Anuncios'
import Sobre from '@/components/Site/Sobre'
import Faq from '@/components/Site/Faq'
import Contato from '@/components/Site/Contato'

// Auth
import AuthLogin from '@/components/Auth/Login'
import AuthLogout from '@/components/Auth/Logout'

// Dashboard
import Dashboard from '@/components/Dashboard/Home'

// Page not found
import PageNotFound from '@/components/Shared/PageNotFound'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    // Site
    { path: '/v1/', name: 'home', component: Home, meta: { requiresAuth: false } },
    { path: '/v1/anuncios', name: 'anuncios', component: Anuncios, meta: { requiresAuth: false } },
    { path: '/v1/sobre', name: 'sobre', component: Sobre, meta: { requiresAuth: false } },
    { path: '/v1/faq', name: 'faq', component: Faq, meta: { requiresAuth: false } },
    { path: '/v1/contato', name: 'contato', component: Contato, meta: { requiresAuth: false } },

    // Auth
    { path: '/v1/login', name: 'auth.login', component: AuthLogin, meta: { requiresAuth: false } },
    { path: '/v1/logout', name: 'auth.logout', component: AuthLogout, meta: { requiresAuth: true } },

    // Dashboard
    { path: '/v1/dashboard', name: 'dashboard.home', component: Dashboard, meta: { requiresAuth: true } },

    // Page not found
    { path: '*', component: PageNotFound }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!Vue.auth.isAuthenticated()) {
      next({
        name: 'auth.login'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
