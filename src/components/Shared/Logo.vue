<template>
  <div class="logo">
    <router-link :to="{ name: 'home' }" title="República Online" v-if="isHome">
      <img src="../../assets/img/logo.png" alt="República Online">
    </router-link>

    <router-link :to="{ name: 'home' }" title="República Online" class="white" v-else>
      <img src="../../assets/img/logo-white.png" alt="República Online">
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'app-logo',
  computed: {
    isHome () {
      return this.$store.getters.appPageIs('home')
    }
  }
}
</script>

<style scoped>
.logo a {
  display: inline-block;
  margin: 24px 0;
}
.logo a.white {
  margin: 57px 0 15px;
}
</style>
