import router from '@/router'

export default {
  install (Vue, options) {
    Vue.seo = {
      page: {
        title: 'República Online',
        description: 'O republica.online funciona a partir de uma ideia simples: que você possa encontrar ou divulgar uma república  de um jeito fácil e rápido.',
        keywords: 'republica online,aluguel estudante,alugar apartamento',
        url: process.env.APP_URL + router.fullPath,
        image: `${process.env.APP_URL}/static/republica-online.png`,
        robots: 'index,follow',
        googlebot: 'index,follow'
      },
      init (page) {
        this.setPage(page)
      },
      title () {
        return {
          inner: this.page.title
        }
      },
      meta () {
        return [
          { n: 'description', id: 'meta_description', c: this.page.description },
          { n: 'keywords', id: 'meta_keywords', c: this.page.keywords },

          // Facebook / Open Graph
          { p: 'og:url', id: 'og_url', c: this.page.url },
          { p: 'og:title', id: 'og_title', c: this.page.title },
          { p: 'og:description', id: 'og_description', c: this.page.description },
          { p: 'og:image', id: 'og_image', c: this.page.image },

          // Twitter Card
          { n: 'twitter:url', id: 'twitter_url', c: this.page.url },
          { n: 'twitter:title', id: 'twitter_title', c: this.page.title },
          { n: 'twitter:description', id: 'twitter_description', c: this.page.description },
          { n: 'twitter:image', id: 'twitter_image', c: this.page.image },

          // Google +
          { ip: 'name', id: 'ip_name', c: this.page.title },
          { ip: 'description', id: 'ip_description', c: this.page.description },
          { ip: 'image', id: 'ip_image', c: this.page.image },

          // Google & Bots
          { n: 'robots', id: 'bots_robots', c: this.page.robots },
          { n: 'googlebot', id: 'bots_googlebot', c: this.page.googlebot }
        ]
      },
      link () {
        return [
          { r: 'canonical', id: 'link_canonical', h: this.page.url }
        ]
      },
      setPage (page) {
        let p = window._.merge(this.page, page)
        this.page = p
      }
    }

    Object.defineProperties(Vue.prototype, {
      seo: {
        get: () => {
          return Vue.seo
        }
      }
    })
  }
}
