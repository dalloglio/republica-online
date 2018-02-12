<template>
  <div class="page page-not-found">
    <section class="container">
      <div class="row">
        <div class="col-xs-6">
          <div class="content">
            <h2>Ops!!! Página não encontrada!</h2>
            <p>A página que você acessou não existe ou então ela foi removida.</p>
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
            <router-link :to="{ name: 'home' }" class="btn btn-lg btn-success text-uppercase">Quero anunciar já!</router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import Search from '@/components/Shared/Search'
  export default {
    name: 'page-not-found',
    components: {
      Search
    },
    data () {
      return {
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
      page () {
        return {
          title: 'Página não encontrada',
          description: 'A página que você acessou não existe ou então ela foi removida.',
          keywords: 'republica online,aluguel estudante,alugar apartamento',
          url: this.url + this.$route.fullPath,
          image: `${this.url}/static/republica-online.png`,
          robots: 'index,follow',
          googlebot: 'index,follow'
        }
      }
    },
    created () {
      this.seo.init(this.page)
    }
  }
</script>

<style scoped>
  .page {
    padding: 60px 0;
  }
  .page .content {
      display: inline-block;
      background-color: #f4f7f9;
      padding: 20px 30px;
      border-radius: 15px;
  }
  .page .content  h2 {
    font-size: 30px;
    font-weight: 800;
    margin: 20px auto;
  }
  .page .content  h3 {
    font-size: 24px;
    font-weight: 800;
    margin: 20px auto;
    text-transform: uppercase;
  }
  .page .content p {
    line-height: 30px;
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
</style>
