<template>
  <div v-if="ad.id" class="page ad-share">
    <section class="container">
      <div class="row">
        <div class="col-xs-12 text-center">
          <img src="../../assets/img/icon-share.png" alt="Compartilhar anúncio" class="share">
        </div>
        <div class="col-xs-12">
          <h2>
            Eiii, psiuuuu<br>
            que tal divulgar sua vaga em suas redes heim?
          </h2>
          <p>Como dizem né, publicidade é a alma do negócio *D</p>

          <ul class="list-inline text-center">
            <li><a :href="urlShareFacebook" class="social-facebook" title="Compartilhar no Facebook" target="_blank">Facebook</a></li>
            <!-- <li><a :href="share('whatsapp')" class="social-whatsapp" title="Compartilhar no Whatsapp" target="_blank">Whatsapp</a></li> -->
            <li><a :href="urlShareGoogle" class="social-google" title="Compartilhar no Google" target="_blank">Google</a></li>
            <li><a :href="urlShareTwitter" class="social-twitter" title="Compartilhar no Twitter" target="_blank">Twitter</a></li>
            <!-- <li><a :href="share('instagram')" class="social-instagram" title="Compartilhar no Instagram" target="_blank">Instagram</a></li> -->
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'ad-share',
    data () {
      return {
        url: this.$http.options.url
      }
    },

    watch: {
      page (to, from) {
        this.seo.setPage(this.page)
        this.$emit('updateHead')
      }
    },

    computed: {
      urlShareFacebook () {
        let appID = process.env.FACEBOOK_APP_ID
        let url = `${this.url}/anuncio/${this.ad.id}/${this.ad.slug}`
        return `https://www.facebook.com/dialog/share?app_id=${appID}&display=page&href=${url}&redirect_uri=${url}`
      },
      urlShareGoogle () {
        let url = `${this.url}/anuncio/${this.ad.id}/${this.ad.slug}`
        return `https://plus.google.com/share?url=${url}`
      },
      urlShareTwitter () {
        let url = `${this.url}/anuncio/${this.ad.id}/${this.ad.slug}`
        return `https://twitter.com/intent/tweet?url=${url}`
      },
      ad () {
        return this.$store.state.ad.ad || {}
      },
      photo () {
        return this.ad.photo || {}
      },
      page () {
        let image = `${this.url}/static/republica-online.png`
        if (this.photo.id) {
          image = this.$store.getters.urlPhoto(this.photo.id)
        }
        return {
          title: this.ad.title || 'Compartilhar Anúncio',
          description: this.ad.description || 'O republica.online funciona a partir de uma ideia simples: que você possa encontrar ou divulgar uma república de um jeito fácil e rápido.',
          keywords: 'republica online,aluguel estudante,alugar apartamento',
          url: this.url + this.$route.fullPath,
          image: image,
          robots: 'index,follow',
          googlebot: 'index,follow'
        }
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

    created () {
      this.seo.init(this.page)
      this.$store.dispatch('getAd', this.$route.params.id)
    },

    beforeDestroy () {
      this.$store.commit('setAd', {})
    }
  }
</script>

<style scoped>
  .page {
    padding: 60px 0;
  }
  .page img.share {
    display: block;
    margin: 40px auto;
  }
  .page h2 {
    font-size: 36px;
    font-weight: 800;
    line-height: 1.7em;
    margin: 20px auto;
  }
  .page p {
    font-size: 18px;
    margin: 20px auto;
  }
  .page ul {
    margin: 80px auto 40px;
  }
  .page ul > li {
    margin: 8px;
  }
  .page ul > li > a {
    display: block;
    width: 108px;
    height: 108px;
    border-radius: 50%;
    text-indent: -9999px;
    overflow: hidden;
    border: 1px solid #fff;
    background-color: #fff;
    background-image: url('../../assets/img/icons-social.png');
    background-repeat: no-repeat;
  }
  .page ul > li > .social-facebook { background-position: -3px -3px }
  .page ul > li > .social-whatsapp { background-position: -113px -3px }
  .page ul > li > .social-google { background-position: -223px -3px }
  .page ul > li > .social-twitter { background-position: -333px -3px }
  .page ul > li > .social-instagram { background-position: -443px -3px }
</style>
