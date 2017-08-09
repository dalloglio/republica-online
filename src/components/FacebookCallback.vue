<template>
  <div>
    {{ res }}
  </div>
</template>

<script>
export default {
  data () {
    return {
      res: ''
    }
  },
  created () {
    let self = this
    if (self.$route.query.code) {
      self.exchangecode(self.$route.query.code)
    } else if (self.$route.query.error) {
      console.log(self.$route.query.error_description)
    }
  },
  methods: {
    exchangecode (code) {
      if (code) {
        this.$http.get('https://graph.facebook.com/v2.10/oauth/access_token', {
          params: {
            client_id: '252087528629349',
            client_secret: '54da75be23a46fe1bcd8e4766cf2c1ef',
            redirect_uri: 'http://localhost:8080/v1/facebook/callback',
            code: code
          }
        }).then((response) => {
          this.res = response
        }, (error) => {
          this.res = error
        })
      }
    }
  }
}
</script>
