<template>
  <nav v-if="pages > 1" class="text-center">
    <ul class="pagination pagination-lg">

      <li v-if="paginator.current_page > 1" :class="{ active: paginator.current_page === 1 || false }">
        <router-link :to="{ path: $route.path, query: { page: 1 } }">Primeira</router-link>
      </li>

      <li v-for="(page, i) in pages" :key="i" :class="{ active: paginator.current_page === page ? true : false }">
        <router-link :to="{ path: $route.path, query: { page: page } }">{{ page }}</router-link>
      </li>

      <li v-if="paginator.current_page < pages" :class="{ active: paginator.current_page === pages || false }">
        <router-link :to="{ path: $route.path, query: { page: pages } }">Última</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'pagination',
  props: {
    paginator: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    pages () {
      return Math.ceil(this.paginator.total / this.paginator.per_page)
    }
  }
}
</script>

<style>
.pagination {
  margin: 20px auto;
}
.pagination > li > a {
  margin: 0 5px;
  border-radius: 6px;
  border-color: #0052cc;
}
.pagination > li > a:hover,
.pagination > li > a:focus {
  border-color: #0052cc;
  background-color: #0052cc;
  color: #fff;
}

</style>
