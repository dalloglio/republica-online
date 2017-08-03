<template>
  <header :class="{ home: isHome }">
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
    'app-logo': appLogo,
    'app-menu': appMenu
  },
  computed: {
    isHome () {
      return this.$store.getters.appPageIs('home')
    }
  }
}
</script>

<style scoped>
header {
  position: relative;
  width: 100%;
  box-shadow: 0px 0px 6px 4px rgba(0,0,0,.1);
  /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#463a94+0,f33b48+100 */
  background: #463a94; /* Old browsers */
  background: -moz-linear-gradient(left, #463a94 0%, #f33b48 100%); /* FF3.6-15 */
  background: -webkit-linear-gradient(left, #463a94 0%,#f33b48 100%); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(to right, #463a94 0%,#f33b48 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#463a94', endColorstr='#f33b48',GradientType=1 ); /* IE6-9 */
  z-index: 2;
}
header.home {
  background: #fff;
}
</style>
