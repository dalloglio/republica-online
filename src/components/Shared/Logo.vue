<template>
  <div class="logo">
    <router-link :to="{ name: 'home' }" title="Logo">
      <img src="http://via.placeholder.com/400x100?text=Logo" alt="Logo">
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
  margin: 20px 0;
}
</style>
