<template>
  <div class="thumbnail-simple">
    <a :href="item.link" :title="item.title" class="thumbnail" target="_blank">
      <img :src="item.photo.url" :alt="item.title">
    </a>
  </div>
</template>

<script>
export default {
  name: 'thumbnail-simple',
  props: {
    item: {
      type: Object,
      default: function () {
        return {}
      },
      required: true
    }
  }
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
