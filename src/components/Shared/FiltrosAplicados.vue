<template>
  <div class="filtros-aplicados">
    <div class="panel panel-default panel-filtro">
      <div class="panel-heading">
        <h3 class="panel-title">Filtros Aplicados</h3>
      </div>

      <ul class="list-group">

        <!-- Category -->
        <li
        v-if="category.id"
        class="list-group-item">
          <span :title="category.title">{{ category.title }}</span>
          <router-link
          :to="{
            name: routeName('category'),
            params: routeParams('category'),
            query: routeQuery('category')
          }"
          title="Remover"
          class="pull-right">
            <span class="glyphicon glyphicon-trash"></span>
          </router-link>
        </li>

        <!-- Estado -->
        <li
        v-if="estado.ID"
        class="list-group-item">
          <span :title="estado.Nome">{{ estado.Nome }}</span>
          <router-link
          :to="{
            query: routeQuery('state')
          }"
          title="Remover"
          class="pull-right">
            <span class="glyphicon glyphicon-trash"></span>
          </router-link>
        </li>

        <!-- Cidade -->
        <li
        v-if="cidade.ID"
        class="list-group-item">
          <span :title="cidade.Nome">{{ cidade.Nome }}</span>
          <router-link
          :to="{
            query: routeQuery('city')
          }"
          title="Remover"
          class="pull-right">
            <span class="glyphicon glyphicon-trash"></span>
          </router-link>
        </li>

        <!-- Filters -->
        <li
        v-for="(filter, index) in filters"
        v-if="hasFilter(filter)"
        class="list-group-item">
          <span :title="filter.title">{{ getFilterValue(filter) }}</span>
          <router-link
          :to="{
            query: routeQuery('filter', filter)
          }"
          title="Remover"
          class="pull-right">
            <span class="glyphicon glyphicon-trash"></span>
          </router-link>
        </li>

        <!-- Prices -->
        <li
        v-if="priceFormatted"
        class="list-group-item">
          <span :title="priceFormatted">{{ priceFormatted }}</span>
          <router-link
          :to="{
            query: routeQuery('price')
          }"
          title="Remover"
          class="pull-right">
            <span class="glyphicon glyphicon-trash"></span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'filtros-aplicados',
    props: {
      filters: {
        type: Array,
        default: () => []
      }
    },
    computed: {
      estado () {
        let sigla = this.$route.query.uf
        return this.$store.getters.getEstadoBySigla(sigla)
      },
      cidade () {
        let nome = this.$route.query.cidade
        return this.$store.getters.getCidadeByNome(nome)
      },
      category () {
        return this.$store.state.category.category || {}
      },
      priceFormatted () {
        let format = '$ 0,0[.]00'
        let priceMin = this.$route.query.price_min || null
        let priceMax = this.$route.query.price_max || null
        if (priceMin && priceMax) {
          return window.numeral(priceMin).format(format) + ' até ' + window.numeral(priceMax).format(format)
        } else if (priceMin) {
          return 'A partir de ' + window.numeral(priceMin).format(format)
        } else if (priceMax) {
          return 'Até ' + window.numeral(priceMax).format(format)
        }
      },
      preparedRoute () {
        return {
          name: this.$route.name,
          params: this.$route.params,
          query: this.$route.query
        }
      }
    },
    methods: {
      routeName (type) {
        let name = this.$route.name
        if (type === 'category') {
          name = 'anuncios'
        }
        return name
      },
      routeParams (type) {
        let params = Object.assign({}, this.$route.params)
        if (type === 'category') {
          delete params.category_id
          delete params.category
        }
        return params
      },
      routeQuery (type, filter) {
        let query = Object.assign({}, this.$route.query)
        let order = query.order
        if (type === 'category') {
          query = {}
          if (order) {
            query.order = order
          }
        } else if (type === 'state') {
          delete query.uf
          delete query.cidade
        } else if (type === 'city') {
          delete query.cidade
        } else if (type === 'filter') {
          delete query[filter.slug]
        } else if (type === 'price') {
          delete query.price_min
          delete query.price_max
        } else {
          delete query[type]
        }
        return query
      },
      hasFilter (filter) {
        return this.$route.query[filter.slug] || false
      },
      getFilterValue (filter) {
        let slug = this.$route.query[filter.slug]
        return filter.values[slug]
      }
    },
    created () {
      this.$store.dispatch('getEstados')
      this.$store.dispatch('getCidades')
    }
  }
</script>

<style scoped>
  a {
    color: #333;
  }
  .panel {
    padding: 10px 20px;
  }
  .panel-default {
    background-color: #f4f7f9;
    border-color: #f4f7f9;
  }
  .panel-heading {
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .panel-heading .panel-title {
    font-weight: 800;
    font-size: 18px;
  }
  .list-group-item{
    padding-top: 15px;
    padding-bottom: 15px;
  }
  .panel-heading,
  .list-group-item {
    padding-left: 0;
    padding-right: 0;
    background-color: transparent;
    border-color: #333;
  }
  .panel-heading,
  .list-group-item:last-child {
    border-bottom: 0 none;
  }
</style>
