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
import TermosDeUso from '@/components/Site/TermosDeUso'
import PoliticasDePrivacidade from '@/components/Site/PoliticasDePrivacidade'

// Auth
import AuthLogin from '@/components/Auth/Login'
import AuthLogout from '@/components/Auth/Logout'
import AuthPasswordEmail from '@/components/Auth/Password/Email'
import AuthPasswordReset from '@/components/Auth/Password/Reset'

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

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  } else {
    const position = {}
    if (to.hash) {
      position.selector = to.hash
      if (to.hash === '#anchor2') {
        position.offset = { y: 100 }
      }
    }

    if (to.matched.some(m => m.meta.scrollToTop)) {
      position.x = 0
      position.y = 0
    }
    return position
  }
}

const router = new Router({
  mode: 'history',
  base: __dirname,
  scrollBehavior,
  routes: [
    // Site
    { path: '/', name: 'home', component: Home, meta: { requiresAuth: false, scrollToTop: true } },
    { path: '/anuncios', name: 'anuncios', component: Anuncios, meta: { requiresAuth: false, scrollToTop: true } },
    { path: '/anuncio/:slug', name: 'anuncio', component: Anuncio, meta: { requiresAuth: false, scrollToTop: true } },
    { path: '/sobre', name: 'sobre', component: Sobre, meta: { requiresAuth: false, scrollToTop: true } },
    { path: '/faq', name: 'faq', component: Faq, meta: { requiresAuth: false, scrollToTop: true } },
    { path: '/contato', name: 'contato', component: Contato, meta: { requiresAuth: false, scrollToTop: true } },
    { path: '/termos-de-uso', name: 'termos-de-uso', component: TermosDeUso, meta: { requiresAuth: false, scrollToTop: true } },
    { path: '/politicas-de-privacidade', name: 'politicas-de-privacidade', component: PoliticasDePrivacidade, meta: { requiresAuth: false, scrollToTop: true } },

    // Site - Anúncio
    { path: '/publicar-anuncio', name: 'criar-anuncio', component: CriarAnuncio, meta: { requiresAuth: true, scrollToTop: true } },
    { path: '/compartilhar-anuncio', name: 'compartilhar-anuncio', component: CompartilharAnuncio, meta: { requiresAuth: false, scrollToTop: true } },

    // Auth
    { path: '/login', name: 'auth.login', component: AuthLogin, meta: { requiresAuth: false, scrollToTop: true } },
    { path: '/logout', name: 'auth.logout', component: AuthLogout, meta: { requiresAuth: true } },
    { path: '/password/email', name: 'auth.password.email', component: AuthPasswordEmail, meta: { requiresAuth: false, scrollToTop: true } },
    { path: '/password/reset', name: 'auth.password.reset', component: AuthPasswordReset, meta: { requiresAuth: false, scrollToTop: true } },

    // Dashboard
    {
      path: '/dashboard',
      component: Dashboard,
      redirect: { name: 'dashboard.home' },
      meta: {
        requiresAuth: true,
        scrollToTop: true
      },
      children: [{
        path: '/dashboard/home',
        name: 'dashboard.home',
        component: DashboardHome
      }, {
        path: '/dashboard/minha-conta',
        name: 'dashboard.minha-conta',
        component: DashboardMinhaConta
      }, {
        path: '/dashboard/meus-anuncios',
        name: 'dashboard.meus-anuncios',
        component: DashboardMeusAnuncios
      }, {
        path: '/dashboard/meus-anuncios/:id/edit',
        name: 'dashboard.meus-anuncios.edit',
        component: DashboardMeusAnunciosEdit
      }, {
        path: '/dashboard/meus-favoritos',
        name: 'dashboard.meus-favoritos',
        component: DashboardMeusFavoritos
      }, {
        path: '/dashboard/minhas-mensagens',
        name: 'dashboard.minhas-mensagens',
        component: DashboardMinhasMensagens
      }, {
        path: '/dashboard/minhas-mensagens/anuncio/:ad_id/contact/:id',
        name: 'dashboard.minhas-mensagens.show',
        component: DashboardMinhasMensagensShow
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
        name: 'auth.login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
