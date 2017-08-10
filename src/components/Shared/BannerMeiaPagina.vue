<template>
  <div class="banner-meia-pagina">
    <a :href="banner.link" :title="banner.title" target="_blank" class="img-responsive">
      <img :src="banner.photo.url" :alt="banner.title">
    </a>
  </div>
</template>

<script>
export default {
  name: 'banner-meia-pagina',
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
.banner-meia-pagina {
  margin-bottom: 30px;
}
.banner-meia-pagina img {
  border-radius: 6px;
}
</style>
