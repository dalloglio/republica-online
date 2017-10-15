<template>
  <span v-if="priceFormatted" class="currency">
    {{ priceFormatted }}
  </span>
</template>

<script>
  const FORMAT = '$ 0,0[.]00'
  export default {
    name: 'currency',
    props: {
      price: {
        type: [String, Number],
        required: true
      }
    },
    data () {
      return {
        priceFormatted: window.numeral(this.price).format(FORMAT)
      }
    }
  }
</script>
