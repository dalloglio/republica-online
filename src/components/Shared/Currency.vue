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
      let price = parseFloat(Number(this.price).toFixed(2))
      return {
        priceFormatted: window.numeral(price).format(FORMAT)
      }
    }
  }
</script>
