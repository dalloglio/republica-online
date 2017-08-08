<template>
  <button v-if="facebookReady" @click="login">Login</button>
</template>

<script>
export default {
  data () {
    return {
      facebookReady: false
    }
  },
  methods: {
    onFacebookReady () {
      this.facebookReady = true
    },
    login () {
      this.$FB.getLoginStatus(response => {
        if (response.status === 'connected') {
          console.log(response.authResponse)
        }
      })
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
