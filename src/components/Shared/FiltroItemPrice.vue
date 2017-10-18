<template>
  <div class="filtro-item-price">
    <div :class="{ 'panel': true, 'panel-default': true, 'border': border, 'no-border': !border }">

      <div class="panel-heading">
        <h4 class="panel-title">
          <a :class="{ 'collapsed': collapsed }" data-toggle="collapse" :href="'#' + panelCollapseID">
            {{ title }}<span class="glyphicon"></span>
          </a>
        </h4>
      </div>

      <div :id="panelCollapseID" :class="{ 'panel-collapse' : true, 'collapse': true, 'in': !collapsed }">
        <div class="panel-body">
          <form autocomplete="off" @submit.prevent="onSubmit">
            <div class="form-group">
              <money
              v-model="price.min"
              v-bind="money"
              class="form-control input-lg"
              placeholder="De:"></money>
            </div>
            <div class="form-group">
              <money
              v-model="price.max"
              v-bind="money"
              class="form-control input-lg"
              placeholder="Até:"></money>
            </div>
            <button type="submit" class="btn btn-lg btn-success btn-block text-uppercase">Aplicar!</button>
          </form>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'filtro-item-price',
  data () {
    return {
      collapsed: !this.open,
      price: {
        min: this.$route.query.price_min || '',
        max: this.$route.query.price_max || ''
      },
      money: {
        decimal: ',',
        thousands: '.',
        prefix: '',
        suffix: '',
        precision: 2,
        masked: false
      }
    }
  },
  created () {
    this.$store.dispatch('getAdsFilterPrices')
  },
  methods: {
    routeName () {
      return this.$route.name
    },
    routeParams () {
      return this.$route.params
    },
    routeQuery () {
      let query = {}
      Object.keys(this.$route.query).map((key) => {
        query[key] = this.$route.query[key]
      })

      if (query.price_min) {
        delete query.price_min
      }
      if (query.price_max) {
        delete query.price_max
      }

      if (this.price.min) {
        query.price_min = this.price.min
      }
      if (this.price.max) {
        query.price_max = this.price.max
      }
      return query
    },
    onSubmit () {
      this.$router.push({
        name: this.routeName(),
        params: this.routeParams(),
        query: this.routeQuery()
      })
    }
  },
  computed: {
    prices () {
      let prices = this.$store.state.ad.filters.prices || { min: 0, max: 999999999 }
      return prices
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
    },
    title: {
      type: String,
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
.form-group {
  padding: 0 40px;
  margin-bottom: 15px;
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
