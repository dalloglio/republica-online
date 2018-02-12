<template>
  <button type="button" v-if="ok" @click="login" :disabled="loading" class="btn btn-facebook btn-lg btn-block text-uppercase">
    <slot>
      <i class="icon-facebook"></i>
      Entrar
    </slot>
  </button>
</template>

<script>
  export default {
    name: 'btn-facebook',
    data () {
      return {
        ok: false,
        loading: false
      }
    },
    methods: {
      me () {
        return new Promise((resolve, reject) => {
          FB.api('/me?fields=id,name,first_name,last_name,email,gender,picture', (response) => {
            resolve(response)
          })
        })
      },

      login () {
        this.loading = true
        FB.login((response) => {
          if (response.status === 'connected') {
            this.me().then((res) => {
              this.loading = false
              this.$emit('facebook-login', true, res)
            })
          } else {
            this.loading = false
            this.$emit('facebook-login', false, null)
          }
        }, { scope: 'public_profile,email' })
      },

      logout () {
        FB.logout((response) => {
          console.log(response)
        })
      },

      ready () {
        this.ok = true
      }
    },
    mounted () {
      window.addEventListener('fb-sdk-ready', this.ready())
    },
    beforeDestroy () {
      window.removeEventListener('fb-sdk-ready', this.ready())
    },
    created () {
      /* global window, FB, document */
      (function (d, s, id) {
        var js
        var fjs = d.getElementsByTagName(s)[0]
        if (d.getElementById(id)) {
          return
        }
        js = d.createElement(s)
        js.id = id
        js.src = '//connect.facebook.net/pt_BR/sdk.js'
        fjs.parentNode.insertBefore(js, fjs)
      }(document, 'script', 'facebook-jssdk'))

      window.fbAsyncInit = function () {
        FB.init({
          appId: '252087528629349',
          cookie: true,
          xfbml: true,
          version: 'v2.10'
        })
        FB.AppEvents.logPageView()
        window.dispatchEvent(new Event('fb-sdk-ready'))
      }
    }
  }
</script>

<style scoped>
  .btn {
    font-weight: 600;
  }
  .btn-facebook {
    position: relative;
    background-color: #3b5998;
    color: #fff;
    overflow: hidden;
  }
  .icon-facebook {
    position: absolute;
    content: "";
    width: 45px;
    height:   45px;
    background-color: transparent;
    background-image: url('../../assets/img/icon-facebook.png');
    background-repeat: no-repeat;
    background-position: 0 0;
    top: -1px;
    left: -1px;
  }
</style>
