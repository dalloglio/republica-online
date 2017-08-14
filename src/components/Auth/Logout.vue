<template></template>

<script>
export default {
  beforeCreate () {
    this.$store.dispatch('logout')
  }
}
</script>
