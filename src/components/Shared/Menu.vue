<template>
  <div class="menu">
    <nav :class="{ 'pull-right': true }">
      <ul class="nav nav-pills pull-right">
        <li><router-link :to="{ name: 'sobre' }" title="Sobre">Sobre</router-link></li>
        <!-- <li><router-link :to="{ name: 'faq' }" title="Central de Ajuda">Central de Ajuda</router-link></li> -->
        <li><router-link :to="{ name: 'contato' }" title="Contato">Contato</router-link></li>
        <li v-if="isAuthenticated"><router-link :to="{ name: 'dashboard.home' }" title="Minha Conta">Minha Conta</router-link></li>
        <li v-if="isAuthenticated"><router-link :to="{ name: 'auth.logout' }" title="Sair">Sair</router-link></li>
        <li v-if="!isAuthenticated"><router-link :to="{ name: 'auth.login' }" title="Login">Login</router-link></li>
      </ul>
      <div class="clearfix"></div>
      <router-link :to="{ name: 'criar-anuncio' }" class="btn btn-lg btn-warning pull-right" title="Anuncie sua vaga!">
        Anuncie sua vaga!
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'app-menu',
  computed: {
    isAuthenticated () {
      return this.$store.getters.isAuthenticated
    }
  }
}
</script>

<style lang="css" scoped>
nav > ul {
  margin: 7.5px 0;
}
nav > a {
  padding-left: 40px;
  padding-right: 40px;
  margin: 20px 15px;
}
nav ul > li > a {
  font-weight: 800;
  color: inherit;
}
.nav > li > a:hover,
.nav > li > a:focus,
.nav > li > a.router-link-exact-active {
  border: 0 none;
  outline: none;
  background-color: transparent;
  text-decoration: underline;
}
#app.login nav ul > li > a {
  color: #fff;
}
</style>
