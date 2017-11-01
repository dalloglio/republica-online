<template>
  <p v-if="detail.id" class="detail" :title="filter.description">
    <img v-if="urlPhoto" :src="urlPhoto" :alt="filter.description">
    <img v-else src="http://via.placeholder.com/40&text=+" :alt="filter.description">
    {{ detail.value }}
  </p>
</template>

<script>
  export default {
    name: 'detail-icon',
    props: {
      model: {
        type: Object,
        default: () => {}
      }
    },
    computed: {
      detail () {
        return this.model
      },
      filter () {
        return this.detail.filter || {}
      },
      photo () {
        return this.filter.photo || {}
      },
      urlPhoto () {
        return this.$store.getters.urlPhoto(this.photo.id)
      }
    }
  }
</script>

<style>
  .detail img {
    width: 40px;
    height: 40px;
    display: inline-block;
  }
</style>
