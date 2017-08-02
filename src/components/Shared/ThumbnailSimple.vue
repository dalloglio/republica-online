<template>
  <div class="thumbnail-simple">
    <router-link :to="{ name: 'home' }" title="Title" class="thumbnail">
      <img src="../../assets/img/parceiro.png" alt="Title">
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'thumbnail-simple'
}
</script>

<style scoped>
.thumbnail {
  border: 0 none;
  border-radius: 0;
  padding: 0;
  margin: 15px 0;
}
</style>
