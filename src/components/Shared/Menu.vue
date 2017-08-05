<template>
  <div class="menu">
    <nav :class="{ 'pull-right': true }">
      <ul class="nav nav-pills pull-right">
        <li v-for="item in items"><router-link :to="item.route" :title="item.title">{{ item.title }}</router-link></li>
      </ul>
      <div class="clearfix"></div>
      <router-link :to="{ name: 'home' }" class="btn btn-lg btn-warning pull-right" title="Anuncie sua vaga!">
        Anuncie sua vaga!
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'app-menu',
  data () {
    return {
      items: [
        { route: { name: 'sobre' }, title: 'Sobre' },
        // { route: { name: 'faq' }, title: 'Central de Ajuda' },
        { route: { name: 'contato' }, title: 'Contato' },
        { route: { name: 'auth.login' }, title: 'Login' }
      ]
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
