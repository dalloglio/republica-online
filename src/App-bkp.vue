<template>
  <div class="hello">
    <div class="fb-login-button"
      onlogin="me()"
      data-scope="public_profile,email"
      data-width="320"
      data-max-rows="1"
      data-size="small"
      data-button-type="login_with"
      data-show-faces="false"
      data-auto-logout-link="false"
      data-use-continue-as="false"></div>
    <div id="status"></div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      FB: null,
      facebookReady: false
    }
  },
  beforeCreate () {
    /* global window, FB, document */

    (function (d, s, id) {
      let js
      let fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(s)) {
        return
      }
      js = d.createElement(s)
      js.id = id
      js.src = '//connect.facebook.net/pt_BR/sdk.js'
      fjs.parentNode.insertBefore(js, fjs)
    }(document, 'script', 'facebook-jssdk'))

    let self = this
    window.fbAsyncInit = function () {
      FB.init({
        appId: '252087528629349',
        cookie: true,
        xfbml: true,
        version: 'v2.10'
      })
      FB.AppEvents.logPageView()
      self.FB = FB
      window.dispatchEvent(new Event('fb-sdk-ready'))
    }
  },
  methods: {
    onFacebookReady () {
      this.facebookReady = true
    }
  },
  mounted () {
    window.addEventListener('fb-sdk-ready', this.onFacebookReady)
  },
  beforeDestroy () {
    window.removeEventListener('fb-sdk-ready', this.onFacebookReady)
  }
}
</script>
