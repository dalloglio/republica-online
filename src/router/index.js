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
import DashboardMeusAnunciosEdit from '@/components/Dashboard/MeusAnunciosEdit'
import DashboardMeusFavoritos from '@/components/Dashboard/MeusFavoritos'
import DashboardMinhasMensagens from '@/components/Dashboard/MinhasMensagens'
import DashboardMinhasMensagensShow from '@/components/Dashboard/MinhasMensagensShow'

// Page not found
import PageNotFound from '@/components/Site/PageNotFound'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    // Site
    { path: '/', name: 'home', component: Home, meta: { requiresAuth: false } },
    { path: '/anuncios', name: 'anuncios', component: Anuncios, meta: { requiresAuth: false } },
    { path: '/anuncio/:slug', name: 'anuncio', component: Anuncio, meta: { requiresAuth: false } },
    { path: '/sobre', name: 'sobre', component: Sobre, meta: { requiresAuth: false } },
    { path: '/faq', name: 'faq', component: Faq, meta: { requiresAuth: false } },
    { path: '/contato', name: 'contato', component: Contato, meta: { requiresAuth: false } },

    // Site - Anúncio
    { path: '/publicar-anuncio', name: 'criar-anuncio', component: CriarAnuncio, meta: { requiresAuth: false } },
    { path: '/compartilhar-anuncio', name: 'compartilhar-anuncio', component: CompartilharAnuncio, meta: { requiresAuth: false } },

    // Auth
    { path: '/login', name: 'auth.login', component: AuthLogin, meta: { requiresAuth: false } },
    { path: '/logout', name: 'auth.logout', component: AuthLogout, meta: { requiresAuth: true } },

    // Dashboard
    {
      path: '/dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      },
      children: [{
        path: '/dashboard/home',
        name: 'dashboard.home',
        component: DashboardHome,
        meta: {
          requiresAuth: true
        }
      }, {
        path: '/dashboard/minha-conta',
        name: 'dashboard.minha-conta',
        component: DashboardMinhaConta,
        meta: {
          requiresAuth: true
        }
      }, {
        path: '/dashboard/meus-anuncios',
        name: 'dashboard.meus-anuncios',
        component: DashboardMeusAnuncios,
        meta: {
          requiresAuth: true
        }
      }, {
        path: '/dashboard/meus-anuncios/:id/edit',
        name: 'dashboard.meus-anuncios.edit',
        component: DashboardMeusAnunciosEdit,
        meta: {
          requiresAuth: true
        }
      }, {
        path: '/dashboard/meus-favoritos',
        name: 'dashboard.meus-favoritos',
        component: DashboardMeusFavoritos,
        meta: {
          requiresAuth: true
        }
      }, {
        path: '/dashboard/minhas-mensagens',
        name: 'dashboard.minhas-mensagens',
        component: DashboardMinhasMensagens,
        meta: {
          requiresAuth: true
        }
      }, {
        path: '/dashboard/minhas-mensagens/anuncio/:ad_id/contact/:id',
        name: 'dashboard.minhas-mensagens.show',
        component: DashboardMinhasMensagensShow,
        meta: {
          requiresAuth: true
        }
      }]
    },

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
