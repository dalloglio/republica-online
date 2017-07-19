<template>
  <div class="menu">
    <nav class="pull-right">
      <ul class="nav nav-pills">
        <li v-for="item in items"><router-link :to="item.route" :title="item.title">{{ item.title }}</router-link></li>
      </ul>
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
        { route: { name: 'home' }, title: 'Sobre' },
        { route: { name: 'home' }, title: 'Central de Ajuda' },
        { route: { name: 'home' }, title: 'Contato' },
        { route: { name: 'home' }, title: 'Login' }
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
  font-weight: bold;
  padding-left: 40px;
  padding-right: 40px;
  margin: 20px 15px;
}
nav ul>li>a {
  font-weight: bold;
}
</style>
