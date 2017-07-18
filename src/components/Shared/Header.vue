<template>
  <header>
    <div class="container">
      <app-logo></app-logo>
      <app-menu></app-menu>
    </div>
  </header>
</template>

<script>
import appLogo from '@/components/Shared/Logo.vue'
import appMenu from '@/components/Shared/Menu.vue'
export default {
  name: 'app-header',
  components: {
    'app-logo': appLogo,
    'app-menu': appMenu
  }
}
</script>

<style lang="css" scoped>
header {
  width: 100%;
  height: 150px;
  background-color: #333;
}
</style>
