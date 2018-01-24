<template>
  <div class="page home">
    <section id="intro">
      <div class="container">
        <div class="row">
          <div class="col-xs-7 info">
            <h1>Vamos encontrar uma<br>república com a <span class="text-uppercase">sua</span> cara!</h1>
            <p>Primeiro selecione o estado<br>e depois a cidade</p>
            <p><small>* depois nós iremos filtrar em mais detalhes a sua nova república ok?</small></p>
          </div>
          <div class="col-xs-5">
            <search></search>
          </div>
        </div>
      </div>
    </section>

    <section id="overview">
      <div class="container">
        <div class="row">
          <div class="col-xs-3">
            <h4><i class="icon icon-buscar"></i>Faça uma busca</h4>
            <p>Veja a lista de opções próximas ao local de sua escolha.</p>
          </div>
          <div class="col-xs-3">
            <h4><i class="icon icon-encontrar"></i>Encontre o local ideal</h4>
           <p>Encontre a opção que mais se encaixa com seu perfil e necessidades!</p>
          </div>
          <div class="col-xs-3">
            <h4><i class="icon icon-mensagens"></i>Troque mensagens</h4>
           <p>Converse com o responsável pela república, tire suas dúvidas e combine os detalhes...</p>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 latest">
            <h4>eee pronto, agora é só mudar *)</h4>
           <p>e se você tiver qualquer dúvida, basta acessar a <router-link :to="{ name: 'faq' }">nossa central de ajuda</router-link> ou <router-link :to="{ name: 'contato' }">falar com a gente!</router-link></p>
          </div>
        </div>
      </div>
    </section>

    <section v-if="latestAds.length" id="latest">
      <div class="container">
        <h2>Estes aqui são os últimos anúncios!</h2>
        <p>Veja a lista de opções próximas ao local de sua escolha.</p>
      </div>
      <div class="line"></div>
      <div class="container">
        <div class="row">
          <div v-for="ad in latestAds" class="col-xs-3">
            <thumbnail :model="ad"></thumbnail>
          </div>
        </div>
      </div>
    </section>

    <section id="cta">
      <div class="container">
        <div class="row">
          <div class="col-xs-8 call">
            <h1>Vamos anunciar para quem<br>realmente quer comprar!</h1>
            <p>Anuncie em nosso portal!</p>
            <p>Conheça todos os planos e fale diretamente com o seu mercado consumidor!</p>
            <p><small>Solicite a um de nossos parceiros maiores detalhes, ficaremos satisfeitos em ajudar =D</small></p>
          </div>
          <div class="col-xs-4 action">
            <router-link :to="{ name: 'criar-anuncio' }" class="btn btn-lg btn-success text-uppercase">Quero anunciar já!</router-link>
          </div>
        </div>
      </div>
    </section>

    <section v-if="partners && partners.length > 0" id="partners">
      <div class="container">
        <h2>Conheça nossos parceiros!</h2>
        <p>Estas são algumas das empresas e entidades que acreditam na República Online.</p>
      </div>
      <div class="line"></div>
      <carousel :items="partners"></carousel>
    </section>

    <newsletter></newsletter>
  </div>
</template>

<script>
  import Carousel from '@/components/Shared/Carousel'
  import Newsletter from '@/components/Shared/Newsletter'
  import Search from '@/components/Shared/Search'
  import Thumbnail from '@/components/Shared/Thumbnail'
  export default {
    name: 'home',
    components: {
      Carousel,
      Newsletter,
      Search,
      Thumbnail
    },
    computed: {
      latestAds () {
        return this.$store.state.ad.latest || []
      },
      partners () {
        return this.$store.state.partner.partners || []
      }
    },
    created () {
      this.$store.dispatch('getLatestAds')
      this.$store.dispatch('getPartners', {
        limit: 6,
        random: true
      })
    },
    beforeDestroy () {
      this.$store.commit('setLatest', [])
    }
  }
</script>

<style scoped>
  #intro {
    overflow: hidden;
    height: 511px;
    background-color: #fff;
    background-image: url('../../assets/img/icon-livros.png');
    background-position: bottom center;
    background-repeat: no-repeat;
  }
  #intro .info {
    margin-top: 120px;
    margin-bottom: 120px;
  }
  #intro .info h1 {
    font-weight: 800;
    font-size: 48px;
    line-height: 72px
  }
  #intro .info p {
    font-size: 18px;
    line-height: 2.45;
    margin-bottom: 0;
  }
  #intro .info p small {
    color: blue;
  }

  #overview {
    position: relative;
    padding: 20px 0 40px;
    background-color: #f4f7f9;
    background-image: url('../../assets/img/icon-mochila.png'), url('../../assets/img/barra-20.png');
    background-position: bottom center;
    background-repeat: no-repeat, no-repeat;
    z-index: 2;
  }
  #overview h4 {
    margin-bottom: 20px;
    font-weight: 800;
    font-size: 18px;
  }
  #overview p {
    margin: 20px 0;
    font-size: 14px;
  }
  #overview .icon {
      vertical-align: bottom;
      margin-right: 10px;
  }
  #overview .latest h4, #overview .latest p {
    margin: 0 0 10px;
  }

  #latest {
    padding: 60px 0;
  }
  #latest h2 {
    font-weight: 800;
    font-size: 30px;
    margin: 20px auto;
  }
  #latest .line {
    width: 200px;
    height: 5px;
    display: block;
    margin: 20px auto;
    background-color: #0052cc;
  }

  #cta {
    height: 500px;
    background-color: #fff;
    background-image: url('../../assets/img/bg-cta-call.png');
    background-position: bottom center;
    background-repeat: no-repeat;
    overflow: hidden;
  }
  #cta .call {
    margin-top: 100px;
    margin-bottom: 100px;
  }
  #cta .call h1 {
    font-weight: 800;
    font-size: 48px;
    line-height: 72px;
  }
  #cta .call p {
    font-size: 18px;
    line-height: 2.45;
    margin-bottom: 0;
  }
  #cta .call p small {
    color: #0052cc;
  }
  #cta .action {
    margin-top: 380px;
    left: -85px;
  }
  #cta .action a {
    padding-left: 80px;
    padding-right: 80px;
  }

  #partners {
    padding: 60px 0;
  }
  #partners h2 {
    margin: 20px auto;
    font-weight: 800;
    font-size: 30px;
    margin: 20px auto;
  }
  #partners .line {
    width: 200px;
    height: 5px;
    display: block;
    margin: 20px auto;
    background-color: #0052cc;
  }
</style>
