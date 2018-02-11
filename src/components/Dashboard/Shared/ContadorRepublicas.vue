<template>
  <div class="contador contador-republicas">
    <div class="count">
      <span>{{ count }}</span>
    </div>
    <p v-if="count === 0">Você ainda não possui nenhum república favorita :(</p>
    <p v-if="count === 1">Você possui <strong>{{ count }}</strong> república favorita :)</p>
    <p v-if="count > 1">Você possui <strong>{{ count }}</strong> repúblicas favoritas :)</p>
  </div>
</template>

<script>
  export default {
    name: 'contador-republicas',
    computed: {
      favorites () {
        return this.$store.state.user.favorites || []
      },
      count () {
        return this.favorites.length || 0
      }
    },
    created () {
      this.$store.dispatch('getUserFavorites')
    },
    beforeDestroy () {
      this.$store.commit('setUserFavorites', [])
    }
  }
</script>

<style scoped>
  .contador {
    position: relative;
  }
  .contador .count {
    position: relative;
    width: 260px;
    height: 120px;
    background-color: #fff;
    background-image: url('../../../assets/img/contador-republicas.png');
    background-repeat: no-repeat;
    background-position: 0 0;
  }
  .contador .count span {
    position: absolute;
    top: 30px;
    left: 166px;
    display: block;
    font-weight: 800;
    color: #0052cc;
  }
</style>
