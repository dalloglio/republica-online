<template>
  <div class="page ad-share">
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
            <li><a :href="share('facebook')" class="social-facebook" title="Compartilhar no Facebook" target="_blank">Facebook</a></li>
            <li><a :href="share('whatsapp')" class="social-whatsapp" title="Compartilhar no Whatsapp" target="_blank">Whatsapp</a></li>
            <li><a :href="share('google')" class="social-google" title="Compartilhar no Google" target="_blank">Google</a></li>
            <li><a :href="share('twitter')" class="social-twitter" title="Compartilhar no Twitter" target="_blank">Twitter</a></li>
            <li><a :href="share('instagram')" class="social-instagram" title="Compartilhar no Instagram" target="_blank">Instagram</a></li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ad-share',
  methods: {
    share (name) {
      let networks = [
        { name: 'facebook', url: 'https://www.facebook.com/sharer.php?url=' },
        { name: 'whatsapp', url: 'whatsapp://send?text=' },
        { name: 'google', url: 'https://plus.google.com/share?url=' },
        { name: 'twitter', url: 'https://twitter.com/intent/tweet?url=' },
        { name: 'instagram', url: 'https://instagram.com/share?url=' }
      ]

      let network = networks.find(network => network.name === name)
      let url = 'http://republica.online/'
      return network.url + url
    }
  }
}
</script>

<style lang="css" scoped>
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
