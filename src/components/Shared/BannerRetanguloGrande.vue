<template>
  <div class="banner-retangulo-grande">
    <a :href="banner.link" :title="banner.title" target="_blank" class="img-responsive">
      <img :src="banner.photo.url" :alt="banner.title">
    </a>
  </div>
</template>

<script>
export default {
  name: 'banner-retangulo-grande',
  props: {
    banner: {
      type: Object,
      required: true,
      default: () => {
        return {}
      }
    }
  }
}
</script>

<style>
.banner-retangulo-grande {
  margin: 60px 0;
}
.banner-retangulo-grande img {
  width: 336px;
  height: 280px;
}
</style>
