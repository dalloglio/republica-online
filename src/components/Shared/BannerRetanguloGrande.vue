<template>
  <div v-if="media.photo" class="banner-retangulo-grande">
    <a :href="media.link" :title="media.title" target="_blank" class="img-responsive">
      <img :src="urlPhoto(media.photo.id)" :alt="media.title">
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
  },
  computed: {
    media () {
      return this.banner
    }
  },
  methods: {
    urlPhoto (id) {
      return this.$store.getters.urlPhoto(id)
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
