<template>
  <div class="logo">
    <router-link v-if="isLogin" :to="{ name: 'home' }" title="República Online">
      <img src="../../assets/img/logo-white.png" alt="República Online">
    </router-link>

    <router-link v-else :to="{ name: 'home' }" title="República Online">
      <img src="../../assets/img/logo.png" alt="República Online">
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'app-logo',
  computed: {
    isLogin () {
      return this.$store.getters.appPageIs('auth.login')
    }
  }
}
</script>

<style scoped>
.logo a {
  display: inline-block;
  margin: 24px 0;
}
</style>
