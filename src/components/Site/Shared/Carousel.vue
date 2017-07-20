<template>
  <div class="carousel">
    <div class="container">
      <div class="row">
        <div v-for="i in 6" class="col-xs-2">
          <thumbnail-simple></thumbnail-simple>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ThumbnailSimple from '@/components/Site/Shared/ThumbnailSimple'
export default {
  name: 'carousel',
  components: {
    ThumbnailSimple
  }
}
</script>
