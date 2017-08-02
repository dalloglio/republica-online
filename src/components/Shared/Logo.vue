<template>
  <div class="logo">
    <router-link :to="{ name: 'home' }" title="República Online">
      <img src="../../assets/img/logo.png" alt="República Online">
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'app-logo'
}
</script>

<style scoped>
.logo a {
  display: inline-block;
  margin: 24px 0;
}
</style>
