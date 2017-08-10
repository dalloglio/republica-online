<template>
  <div class="banner-outdoor">
    <a :href="banner.link" :title="banner.title" target="_blank" class="img-responsive">
      <img :src="banner.photo.url" :alt="banner.title">
    </a>
  </div>
</template>

<script>
export default {
  name: 'banner-outdoor',
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

<style scoped>
.banner-outdoor {
  margin-bottom: 15px;
}
.banner-outdoor img {
  border-radius: 6px;
}
</style>
