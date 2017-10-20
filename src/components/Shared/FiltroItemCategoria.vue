<template>
  <div v-if="categories.length" class="filtro-item filtro-item-categoria">
    <div :class="{ 'panel': true, 'panel-default': true, 'border': border, 'no-border': !border }">

      <div class="panel-heading">
        <h4 class="panel-title">
          <a :class="{ 'collapsed': collapsed }" data-toggle="collapse" :href="'#' + panelCollapseID">
            Categorias
            <span class="glyphicon"></span>
          </a>
        </h4>
      </div>

      <div :id="panelCollapseID" :class="{ 'panel-collapse' : true, 'collapse': true, 'in': !collapsed }">
        <div class="panel-body">
          <ul class="list-unstyled">
            <li
            v-for="category in categories"
            :key="category.id">
              <router-link
              :to="{
                name: 'anuncios.category',
                params: {
                  category: category.slug,
                  category_id: category.id
                }
              }"
              :title="category.title">{{ category.title }}</router-link>
            </li>
          </ul>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'filtro-item-categoria',
  data () {
    return {
      collapsed: !this.open
    }
  },
  created () {
    this.$store.dispatch('getAdsFilterCategories')
  },
  computed: {
    categories () {
      return this.$store.state.ad.filters.categories || []
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
