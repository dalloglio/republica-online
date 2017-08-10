<template>
  <div class="page anuncio">
    <section id="anuncio">
      <div class="container">

        <h2>República Dom Almir de Almeida Sales</h2>

        <div class="row">
          <div class="col-xs-9">
            <galeria></galeria>
            <h3>Descrição:</h3>
            <p>É um fato conhecido de todos que um leitor se distrairá com o conteúdo de texto legível de uma página quando estiver examinando sua diagramação. A vantagem de usar Lorem Ipsum é que ele tem uma distribuição normal de letras, ao contrário de "Conteúdo aqui, conteúdo aqui", fazendo com que ele tenha uma aparência similar a de um texto legível. Muitos softwares de publicação e editores de páginas na internet agora usam Lorem Ipsum como texto-modelo padrão, e uma rápida busca por 'lorem ipsum' mostra vários websites ainda em sua fase de construção. Várias versões novas surgiram ao longo dos anos, eventualmente por acidente...</p>
          </div>
          <div class="col-xs-3">
            <anuncio-details></anuncio-details>
            <anuncio-contacts ></anuncio-contacts>
          </div>
        </div>

        <div class="row">
          <div class="col-xs-9">
            <h3>Localização:</h3>
            <mapa></mapa>

            <h3>Talvez você goste destes aqui também *)</h3>
            <div class="row">
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

    <modal ref="modalRef">
      <h3 slot="title">República Dom Almir de Almeida Sales</h3>
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
    showModal () {
      this.$refs.modalRef.show()
    }
  },

  computed: {
    bannersLargeRectangle () {
      return this.$store.state.banner.bannersLargeRectangle
    },
    bannersHalfPage () {
      return this.$store.state.banner.bannersHalfPage
    }
  },

  created () {
    this.$store.dispatch('getBannersLargeRectangle', { limit: 2 })
    this.$store.dispatch('getBannersHalfPage')
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
