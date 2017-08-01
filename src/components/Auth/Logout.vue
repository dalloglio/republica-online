<template></template>

<script>
export default {
  beforeCreate () {
    this.$auth.logout()
  }
}
</script>
