<template>
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
import appLogo from '@/components/Shared/Logo.vue'
import appMenu from '@/components/Shared/Menu.vue'
export default {
  name: 'app-header',
  components: {
    appLogo,
    appMenu
  }
}
</script>

<style scoped>
header {
  position: relative;
  width: 100%;
  box-shadow: 0px 0px 6px 4px rgba(0,0,0,.1);
  background: #fff;
  z-index: 2;
}
#app.login header {
  background-color: transparent !important;
  box-shadow: none !important;
}
</style>
