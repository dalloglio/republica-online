<template>
  <div class="carousel">
    <div class="container">
      <div class="row">
        <div v-for="item in items" class="col-xs-2">
          <thumbnail-simple :item="item"></thumbnail-simple>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ThumbnailSimple from '@/components/Shared/ThumbnailSimple'
export default {
  name: 'carousel',
  props: {
    items: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  components: {
    ThumbnailSimple
  }
}
</script>
