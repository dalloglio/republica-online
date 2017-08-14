<template>
  <div v-if="media.photo" class="banner-meia-pagina">
    <a :href="media.link" :title="media.title" target="_blank">
      <img :src="media.photo.url" :alt="media.title" class="img-responsive">
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
  },
  computed: {
    media () {
      return this.banner
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
