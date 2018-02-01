<template>
  <div id="app" :class="{ login: isLogin || isPasswordEmail || isPasswordReset }">
    <app-spinner></app-spinner>
    <app-header></app-header>
    <main>
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </main>
    <app-footer></app-footer>
  </div>
</template>

<script>
  import '@/assets/sass/app.scss'
  import appHeader from '@/components/Shared/Header.vue'
  import appFooter from '@/components/Shared/Footer.vue'
  import appSpinner from '@/components/Shared/Spinner.vue'
  export default {
    name: 'app',
    components: {
      appHeader,
      appFooter,
      appSpinner
    },
    watch: {
      '$route' (to, from) {
        this.$store.dispatch('setPage', to.name)
      }
    },
    methods: {
      checkAuthentication () {
        this.$store.dispatch('setAuthenticated')
      }
    },
    computed: {
      isLogin () {
        return this.$store.getters.appPageIs('auth.login')
      },
      isPasswordEmail () {
        return this.$store.getters.appPageIs('auth.password.email')
      },
      isPasswordReset () {
        return this.$store.getters.appPageIs('auth.password.reset')
      }
    },
    created () {
      this.checkAuthentication()
      this.$store.dispatch('setPage', this.$route.name)
    }
  }
</script>

<style>
  #app.login {
    background: transparent url('./assets/img/bg-login.jpg') no-repeat top center;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>
