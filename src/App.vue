<template>
  <div id="app">
    <app-header></app-header>
    <main>
      <router-view></router-view>
    </main>
    <app-footer></app-footer>
  </div>
</template>

<script>
import appHeader from '@/components/Shared/Header.vue'
import appFooter from '@/components/Shared/Footer.vue'
export default {
  name: 'app',
  components: {
    'app-header': appHeader,
    'app-footer': appFooter
  }
}
</script>

<style>
body {

}
</style>
