<template>
  <div v-if="ad.id" class="page anuncio">
    <section id="anuncio">
      <div class="container">

        <h2>{{ ad.title }}</h2>

        <div class="row">
          <div class="col-xs-9">
            <galeria :photos="photos"></galeria>
            <div v-if="ad.description">
              <h3>Descrição:</h3>
              <p>{{ ad.description }}</p>
            </div>
          </div>
          <div class="col-xs-3">
            <anuncio-details :ad="ad"></anuncio-details>
            <anuncio-contacts :ad="ad"></anuncio-contacts>
          </div>
        </div>

        <div class="row">
          <div v-if="true" class="col-xs-9">
            <h3>Localização:</h3>
            <mapa ref="mapaRef"></mapa>

            <h3>Talvez você goste destes aqui também *)</h3>
            <div v-if="false" class="row">
              <div v-for="i in 3" class="col-xs-4">
                <thumbnail></thumbnail>
              </div>
            </div>

            <div v-if="bannersLargeRectangle" class="row">
              <div v-if="bannersLargeRectangle[0]" class="banner-336x280 col-xs-5 col-xs-offset-1">
                <banner-retangulo-grande :banner="bannersLargeRectangle[0]"></banner-retangulo-grande>
              </div>
              <div v-if="bannersLargeRectangle[1]" class="banner-336x280 col-xs-5">
                <banner-retangulo-grande :banner="bannersLargeRectangle[1]"></banner-retangulo-grande>
              </div>
            </div>
          </div>
          <div class="col-xs-3">
            <h3>&nbsp;</h3>
            <banner-meia-pagina v-for="bannerHalfPage in bannersHalfPage" :key="bannerHalfPage.id" :banner="bannerHalfPage"></banner-meia-pagina>
          </div>
        </div>

      </div>
    </section>

    <modal ref="modalRef" :ad="ad">
      <h3 slot="title">{{ ad.title }}</h3>
    </modal>
  </div>
</template>

<script>
  import AnuncioContacts from '@/components/Shared/AnuncioContacts'
  import AnuncioDetails from '@/components/Shared/AnuncioDetails'
  import BannerMeiaPagina from '@/components/Shared/BannerMeiaPagina'
  import BannerRetanguloGrande from '@/components/Shared/BannerRetanguloGrande'
  import Galeria from '@/components/Shared/Galeria'
  import Mapa from '@/components/Shared/Mapa'
  import Modal from '@/components/Shared/Modal'
  import Thumbnail from '@/components/Shared/Thumbnail'
  export default {
    name: 'anuncio',
    components: {
      AnuncioContacts,
      AnuncioDetails,
      BannerMeiaPagina,
      BannerRetanguloGrande,
      Galeria,
      Mapa,
      Modal,
      Thumbnail
    },

    methods: {
      searchAddress () {
        let zoom = 5
        let self = this
        let mapaRef = self.$refs.mapaRef
        if (!mapaRef) {
          return
        }
        mapaRef.removeMarker()
        mapaRef.removeCircle()
        if (self.address.show_on_map === 'default') {
          zoom = 4
          mapaRef.setAddress('Brasil')
        } else if (self.address.show_on_map === 'approximate') {
          zoom = 5
          mapaRef.setAddress(self.formattedAddress)
          mapaRef.addCircle()
        } else if (self.address.show_on_map === 'exact') {
          zoom = 16
          mapaRef.setAddress(self.formattedAddress)
          mapaRef.addMarker()
        }
        mapaRef.geocodeAddress()
        mapaRef.setZoom(zoom)
      },
      showModal () {
        this.$refs.modalRef.show()
      }
    },

    computed: {
      ad () {
        let ad = this.$store.state.ad.ad || {}
        if (ad.id) {
          setTimeout(() => {
            this.searchAddress()
          }, 2000)
        }
        return ad
      },
      address () {
        return this.ad.address || {}
      },
      contact () {
        return this.ad.contact || {}
      },
      details () {
        return this.ad.details || []
      },
      photo () {
        return this.ad.photo || {}
      },
      photos () {
        return this.ad.photos || []
      },
      user () {
        return this.ad.user || {}
      },
      bannersLargeRectangle () {
        return this.$store.state.banner.bannersLargeRectangle
      },
      bannersHalfPage () {
        return this.$store.state.banner.bannersHalfPage
      },
      formattedAddress () {
        let i = 0
        let address = []
        if (this.address.zip_code) { address[i++] = `Cep: ${this.address.zip_code}` }
        if (this.address.street) { address[i++] = `${this.address.street}` }
        if (this.address.number) { address[i++] = `${this.address.number}` }
        if (this.address.neighborhood) { address[i++] = `${this.address.neighborhood}` }
        if (this.address.state) { address[i++] = `${this.address.state}` }
        if (this.address.city) { address[i++] = `${this.address.city}` }
        address[i++] = 'Brasil'
        return address.join(', ')
      }
    },

    created () {
      this.$store.dispatch('getAd', this.$route.params.id)
      this.$store.dispatch('getBannersLargeRectangle', { limit: 2 })
      this.$store.dispatch('getBannersHalfPage', { limit: 2 })
    },

    beforeDestroy () {
      this.$store.commit('setAd', {})
    }
  }
</script>

<style scoped>
  #anuncio {
    padding: 60px 0;
  }
  #anuncio h2 {
    font-size: 30px;
    font-weight: 800;
    margin: 20px auto 60px;
  }
  #anuncio h3 {
    font-size: 30px;
    font-weight: 800;
    margin: 20px auto;
  }
  #anuncio p {
    line-height: 1.6em;
  }
</style>
