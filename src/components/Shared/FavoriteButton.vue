<template>
  <button v-if="isFavorite"
  type="button"
  class="favorite-button"
  title="Remover dos favoritos!"
  @click="removeFavorite()">
    Remover dos favoritos!
  </button>
  <button v-else
  type="button"
  class="favorite-button"
  title="Adicionar aos favoritos!"
  @click="addFavorite()">
    Adicionar aos favoritos!
  </button>
  </a>
</template>

<script>
  export default {
    name: 'favorite-button',
    props: {
      ad: {
        type: Object,
        required: true
      }
    },
    methods: {
      goToLogin () {
        this.$router.push({
          name: 'auth.login',
          query: { redirect: this.$route.fullPath }
        })
      },
      addFavorite () {
        if (!this.loggedIn) {
          if (confirm('Você deseja fazer login para adicionar este anúncio aos seus favoritos?')) {
            this.goToLogin()
          }
          return
        }
        this.$store.dispatch('createUserFavorite', this.ad.id).then((response) => {
          if (response.ok) {
            this.getFavorite()
          }
        }, (error) => {
          alert('Não foi possível adicionar este anúncio aos seus favoritos!')
          console.log(error)
        })
      },
      removeFavorite () {
        if (!this.loggedIn) {
          return
        }
        if (!this.favorite.id) {
          return
        }
        this.$store.dispatch('deleteUserFavorite', this.favorite.id).then((response) => {
          if (response.ok) {
            this.getFavorite()
          }
        }, (error) => {
          alert('Não foi possível remover este anúncio dos seus favoritos!')
          console.log(error)
        })
      },
      getFavorite () {
        if (!this.loggedIn) {
          return
        }
        this.$store.dispatch('getUserFavorite', this.ad.id)
      }
    },
    computed: {
      favorite () {
        return this.$store.state.user.adFavorite || {}
      },
      isFavorite () {
        if (!this.favorite.id) {
          return false
        }
        return Number(this.favorite.ad_id) === Number(this.ad.id)
      },
      loggedIn () {
        return this.$store.getters.isAuthenticated || false
      }
    },
    created () {
      this.getFavorite()
    },
    beforeDestroy () {
      this.$store.commit('setUserAdFavorite', {})
    }
  }
</script>

<style scoped>
  .favorite-button {
    font-size: 16px;
    font-weight: 800;
    margin-top: 20px;
  }
</style>
