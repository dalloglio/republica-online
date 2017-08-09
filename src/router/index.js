import Vue from 'vue'
import Router from 'vue-router'

// Site
import Home from '@/components/Site/Home'
import Anuncios from '@/components/Site/Anuncios'
import Anuncio from '@/components/Site/Anuncio'
import Sobre from '@/components/Site/Sobre'
import Faq from '@/components/Site/Faq'
import Contato from '@/components/Site/Contato'
import CriarAnuncio from '@/components/Site/CriarAnuncio'
import CompartilharAnuncio from '@/components/Site/CompartilharAnuncio'

// Auth
import AuthLogin from '@/components/Auth/Login'
import AuthLogout from '@/components/Auth/Logout'

// Dashboard
import Dashboard from '@/components/Dashboard/Dashboard'
import DashboardHome from '@/components/Dashboard/Home'
import DashboardMinhaConta from '@/components/Dashboard/MinhaConta'
import DashboardMeusAnuncios from '@/components/Dashboard/MeusAnuncios'
import DashboardMeusAnunciosShow from '@/components/Dashboard/MeusAnunciosShow'
import DashboardMeusFavoritos from '@/components/Dashboard/MeusFavoritos'
import DashboardMinhasMensagens from '@/components/Dashboard/MinhasMensagens'
import DashboardMinhasMensagensShow from '@/components/Dashboard/MinhasMensagensShow'

// Page not found
import PageNotFound from '@/components/Site/PageNotFound'
import Teste from '@/components/Teste'

import FacebookCallback from '@/components/FacebookCallback'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    // Site
    { path: '/v1/', name: 'home', component: Home, meta: { requiresAuth: false } },
    { path: '/v1/anuncios', name: 'anuncios', component: Anuncios, meta: { requiresAuth: false } },
    { path: '/v1/anuncio/:slug', name: 'anuncio', component: Anuncio, meta: { requiresAuth: false } },
    { path: '/v1/sobre', name: 'sobre', component: Sobre, meta: { requiresAuth: false } },
    { path: '/v1/faq', name: 'faq', component: Faq, meta: { requiresAuth: false } },
    { path: '/v1/contato', name: 'contato', component: Contato, meta: { requiresAuth: false } },

    // Site - Anúncio
    { path: '/v1/publicar-anuncio', name: 'criar-anuncio', component: CriarAnuncio, meta: { requiresAuth: false } },
    { path: '/v1/compartilhar-anuncio', name: 'compartilhar-anuncio', component: CompartilharAnuncio, meta: { requiresAuth: false } },

    // Auth
    { path: '/v1/login', name: 'auth.login', component: AuthLogin, meta: { requiresAuth: false } },
    { path: '/v1/logout', name: 'auth.logout', component: AuthLogout, meta: { requiresAuth: true } },

    { path: '/v1/facebook/callback', name: 'facebook.callback', component: FacebookCallback, meta: { requiresAuth: false } },

    // Dashboard
    {
      path: '/v1/dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      },
      children: [{
        path: '/v1/dashboard/home',
        name: 'dashboard.home',
        component: DashboardHome,
        meta: {
          requiresAuth: true
        }
      }, {
        path: '/v1/dashboard/minha-conta',
        name: 'dashboard.minha-conta',
        component: DashboardMinhaConta,
        meta: {
          requiresAuth: true
        }
      }, {
        path: '/v1/dashboard/meus-anuncios',
        name: 'dashboard.meus-anuncios',
        component: DashboardMeusAnuncios,
        meta: {
          requiresAuth: true
        }
      }, {
        path: '/v1/dashboard/meus-anuncios/:id',
        name: 'dashboard.meus-anuncios.show',
        component: DashboardMeusAnunciosShow,
        meta: {
          requiresAuth: true
        }
      }, {
        path: '/v1/dashboard/meus-favoritos',
        name: 'dashboard.meus-favoritos',
        component: DashboardMeusFavoritos,
        meta: {
          requiresAuth: true
        }
      }, {
        path: '/v1/dashboard/minhas-mensagens',
        name: 'dashboard.minhas-mensagens',
        component: DashboardMinhasMensagens,
        meta: {
          requiresAuth: true
        }
      }, {
        path: '/v1/dashboard/minhas-mensagens/:id',
        name: 'dashboard.minhas-mensagens.show',
        component: DashboardMinhasMensagensShow,
        meta: {
          requiresAuth: true
        }
      }]
    },

    // Page not found
    { path: '*', component: PageNotFound },
    { path: '/teste', component: Teste }
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
