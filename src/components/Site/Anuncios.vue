<template>
  <div class="page anuncios">
    <section id="anuncios">
      <div class="container">
        <h2>Encontramos {{ paginator.total || 0 }} vagas pra você!</h2>
        <p>Utilize os filtros abaixo para refinar ainda mais a sua pesquisa.</p>
        <select
        v-model="order"
        id="order-as"
        class="form-control input-lg"
        @change="changeOrder()">
          <option value="">ordenar como:</option>
          <option
          v-for="item in orderOptions"
          :key="item.value"
          :value="item.value">{{ item.label }}</option>
        </select>
      </div>
      <div class="line"></div>
      <div class="container">
        <div class="row">
          <div class="col-xs-3">
            <filtros-aplicados :filters="filters"></filtros-aplicados>
            <filtros :filters="filters"></filtros>
            <banner-meia-pagina v-for="bannerHalfPage in bannersHalfPage" :key="bannerHalfPage.id" :banner="bannerHalfPage"></banner-meia-pagina>
          </div>
          <div class="col-xs-9">
            <div v-if="bannersOutdoor" class="row">
              <div class="col-xs-12">
                <banner-outdoor :banner="bannersOutdoor[0]"></banner-outdoor>
              </div>
            </div>
            <div class="row">
              <div v-for="ad in ads" class="col-xs-4">
                <thumbnail :model="ad"></thumbnail>
              </div>
            </div>
            <div v-if="ads.length" class="row">
              <div class="col-xs-12">
                <pagination :paginator="paginator"></pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <newsletter></newsletter>
  </div>
</template>

<script>
  import BannerOutdoor from '@/components/Shared/BannerOutdoor'
  import BannerMeiaPagina from '@/components/Shared/BannerMeiaPagina'
  import Filtros from '@/components/Shared/Filtros'
  import FiltrosAplicados from '@/components/Shared/FiltrosAplicados'
  import Newsletter from '@/components/Shared/Newsletter'
  import Pagination from '@/components/Shared/Pagination'
  import Thumbnail from '@/components/Shared/Thumbnail'
  export default {
    name: 'anuncios',
    components: {
      BannerOutdoor,
      BannerMeiaPagina,
      Filtros,
      FiltrosAplicados,
      Newsletter,
      Pagination,
      Thumbnail
    },
    watch: {
      '$route' (to, from) {
        this.$store.commit('setAds', [])
        this.$store.commit('setCategory', {})
        this.start()
      }
    },
    data () {
      return {
        page: 1,
        order: 'latest',
        orderOptions: [
          { value: 'latest', label: 'mais recentes' },
          { value: 'oldest', label: 'mais antigos' }
        ],
        url: this.$http.options.url
      }
    },
    head: {
      title () {
        return this.seo.title()
      },
      meta () {
        return this.seo.meta()
      },
      link () {
        return this.seo.link()
      }
    },
    computed: {
      ads () {
        return this.$store.state.ad.ads.data || []
      },
      category () {
        return this.$store.state.category.category || {}
      },
      filters () {
        return this.category.filters || []
      },
      paginator () {
        let ads = this.$store.state.ad.ads || []
        return ads
      },
      bannersHalfPage () {
        let banners = this.$store.state.banner.bannersHalfPage
        if (!banners) {
          return []
        }
        return banners
      },
      bannersOutdoor () {
        let banners = this.$store.state.banner.bannersOutdoor
        if (!banners) {
          return [
            { photo: {} }
          ]
        }
        return banners
      },
      pageSeo () {
        return {
          title: 'Anúncios',
          description: 'O republica.online funciona a partir de uma ideia simples: que você possa encontrar ou divulgar uma república de um jeito fácil e rápido.',
          keywords: 'anúncios,republica online,aluguel estudante,alugar apartamento',
          url: this.url + this.$route.fullPath,
          image: `${this.url}/static/republica-online.png`,
          robots: 'index,follow',
          googlebot: 'index,follow'
        }
      }
    },
    methods: {
      start () {
        if (this.$route.params.category_id) {
          this.$store.dispatch('getCategory', this.$route.params.category_id).then(() => {
            setTimeout(() => {
              this.paginate()
            }, 500)
          })
        } else {
          this.paginate()
        }
      },
      changeOrder () {
        if (this.order === '') {
          this.$router.push({ name: this.$route.name })
        } else {
          this.$router.push({ name: this.$route.name, query: { order: this.order } })
        }
      },
      paginate () {
        let params = {}
        if (this.$route.query.page) {
          params.page = this.$route.query.page
        }
        if (this.order) {
          params.order = this.order
        }
        if (this.$route.params.category_id) {
          params.category = this.$route.params.category_id
        }
        if (this.$route.query.uf) {
          params.uf = this.$route.query.uf
        }
        if (this.$route.query.cidade) {
          params.cidade = this.$route.query.cidade
        }
        if (this.$route.query.price_min) {
          params.price_min = this.$route.query.price_min
        }
        if (this.$route.query.price_max) {
          params.price_max = this.$route.query.price_max
        }

        let filters = {}
        this.filters.forEach((filter) => {
          if (this.$route.query[filter.slug]) {
            filters[filter.slug] = this.$route.query[filter.slug]
          }
        })
        if (Object.keys(filters).length) {
          params.filters = JSON.stringify(filters)
        }

        this.$store.dispatch('getAds', params)
      }
    },
    created () {
      this.$store.dispatch('getBannersHalfPage', {})
      this.$store.dispatch('getBannersOutdoor', {})
      this.seo.init(this.pageSeo)
      this.start()
    },
    beforeDestroy () {
      this.$store.commit('setAds', [])
    }
  }
</script>

<style scoped>
#anuncios {
  padding: 60px 0;
}
#anuncios h2 {
  font-size: 30px;
  font-weight: 800;
  margin: 20px auto;
}
#anuncios .line {
  width: 200px;
  height: 5px;
  display: block;
  margin: 20px auto 30px;
  background-color: blue;
}

#order-as {
  position: absolute;
  width: 180px;
  right: 15px;
  top: 50px;
  font-weight: 600;
}
</style>
