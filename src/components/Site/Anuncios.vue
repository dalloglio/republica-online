<template>
  <div class="page anuncios">
    <section id="anuncios">
      <div class="container">
        <h2>Encontramos {{ totalAds }} vagas pra você!</h2>
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
            <filtros-aplicados></filtros-aplicados>
            <filtros></filtros>
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
            <div class="row">
              <div class="col-xs-12">
                <pagination></pagination>
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
    data () {
      return {
        order: 'latest',
        limit: 24,
        paginate: true,
        orderOptions = [
          { value: 'latest', label: 'mais recentes' },
          { value: 'oldest', label: 'mais antigos' }
        ]
      }
    },
    computed: {
      ads () {
        return this.$store.state.ad.latest || []
      },
      totalAds () {
        return this.ads.length
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
      }
    },
    methods: {
      changeOrder () {
        this.paginate()
      },
      paginate () {
        this.$store.dispatch('getAds', {
          limit: this.limit,
          order: this.order,
          paginate: this.paginate
        })
      }
    },
    created () {
      this.$store.dispatch('getBannersHalfPage', {})
      this.$store.dispatch('getBannersOutdoor', {})
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
