<template>
  <div v-if="media.photo" class="banner-outdoor">
    <a :href="media.link" :title="media.title" target="_blank">
      <img :src="media.photo.url" :alt="media.title" class="img-responsive">
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
  },
  computed: {
    media () {
      return this.banner
    }
  }
}
</script>

<style scoped>
.banner-outdoor {
  margin-bottom: 15px;
}
.banner-outdoor a {
  display: inline-block;
}
.banner-outdoor a img {
  border-radius: 6px;
}
</style>
