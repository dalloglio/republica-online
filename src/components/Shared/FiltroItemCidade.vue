<template>
  <div v-if="cidades.length" class="filtro-item filtro-item-cidade">
    <div :class="{ 'panel': true, 'panel-default': true, 'border': border, 'no-border': !border }">

      <div class="panel-heading">
        <h4 class="panel-title">
          <a :class="{ 'collapsed': collapsed }" data-toggle="collapse" :href="'#' + panelCollapseID">
            Cidades
            <span class="glyphicon"></span>
          </a>
        </h4>
      </div>

      <div :id="panelCollapseID" :class="{ 'panel-collapse' : true, 'collapse': true, 'in': !collapsed }">
        <div class="panel-body">
          <ul class="list-unstyled">
            <li
            v-for="cidade in cidades"
            :key="cidade.ID">
              <router-link
              :to="{
                name: routeName(),
                params: routeParams(),
                query: routeQuery(cidade.Nome)
              }"
              :title="cidade.Nome">{{ cidade.Nome }}</router-link>
            </li>
          </ul>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'filtro-item-cidade',
  data () {
    return {
      collapsed: !this.open
    }
  },
  created () {
    this.getCities()
  },
  watch: {
    '$route.query.uf' (to, from) {
      this.$store.commit('setAdsFilterCities', [])
      this.getCities()
    }
  },
  methods: {
    getCities () {
      if (this.estado.ID) {
        this.$store.dispatch('getAdsFilterCities', this.estado.ID)
      }
    },
    routeName () {
      return this.$route.name
    },
    routeParams () {
      return this.$route.params
    },
    routeQuery (val) {
      let query = {}
      Object.keys(this.$route.query).map((key) => {
        query[key] = this.$route.query[key]
      })
      query.uf = this.$route.query.uf
      query.cidade = val
      return query
    }
  },
  computed: {
    estado () {
      return this.$store.getters.getEstadoBySigla(this.$route.query.uf)
    },
    cidades () {
      return this.$store.state.ad.filters.cidades || []
    },
    headID () {
      return 'heading-' + this.id
    },
    panelCollapseID () {
      return 'collapse-' + this.id
    }
  },
  props: {
    open: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped>
a:hover,
a:focus {
  text-decoration: none;
}
a[data-toggle] {
  position: relative;
  display: block;
}
a[data-toggle] span {
  position: absolute;
  right: 0;
}
.panel {
  padding: 0;
  margin: 0;
  border: 0 none;
  border-radius: 0;
  box-shadow: none;
}
.panel-default {
  background-color: rgba(0,0,0,0);
}
.panel-heading {
  background: rgba(0,0,0,0);
  padding: 15px 0;
  border: 0 none;
}
.panel-title {
  font-size: 14px;
}
.panel-body {
  padding: 10px 0;
}
ul {
  padding-left: 20px;
}
ul li a {
  padding-top: 5px;
  padding-bottom: 5px;
  display: inline-block;
}
.glyphicon:before {
    content: "\E259";
}
.collapsed .glyphicon:before {
    content: "\E257";
}
.border {
  border-bottom: 1px solid #333;
}
.no-border {
  border-bottom: 1px solid transparent;
}
</style>
