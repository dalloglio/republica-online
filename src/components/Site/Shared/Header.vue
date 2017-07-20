<template lang="html">
  <header>
    <div class="container">
      <div class="row">
        <div class="col-xs-5">
          <app-logo></app-logo>
        </div>
        <div class="col-xs-7">
          <app-menu></app-menu>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import appLogo from '@/components/Site/Shared/Logo.vue'
import appMenu from '@/components/Site/Shared/Menu.vue'
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
  position: relative;
  width: 100%;
  background-color: #fff;
  box-shadow: 0px 0px 6px 4px rgba(0,0,0,.1);
  z-index: 2;
}
</style>
