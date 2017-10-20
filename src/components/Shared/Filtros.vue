<template>
  <div class="filtros">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">Refina sua busca</h3>
      </div>

      <!-- Categories -->
      <filtro-item-categoria :open="true" :border="true" :id="-3"></filtro-item-categoria>

      <!-- States -->
      <filtro-item-estado :open="false" :border="true" :id="-2"></filtro-item-estado>

      <!-- Cities -->
      <filtro-item-cidade :open="false" :border="true" :id="-1"></filtro-item-cidade>

      <!-- Filters -->
      <filtro-item v-for="(o, i) in filters" :open="false" :border="true" :id="i" :key="i" :filter="o"></filtro-item>

      <filtro-item-price :open="true" :border="false" :id="6" title="Valor"></filtro-item-price>
    </div>
  </div>
</template>

<script>
  import FiltroItem from '@/components/Shared/FiltroItem'
  import FiltroItemEstado from '@/components/Shared/FiltroItemEstado'
  import FiltroItemCidade from '@/components/Shared/FiltroItemCidade'
  import FiltroItemCategoria from '@/components/Shared/FiltroItemCategoria'
  import FiltroItemPrice from '@/components/Shared/FiltroItemPrice'
  export default {
    name: 'filtros',
    props: {
      filters: {
        type: Array,
        default: () => []
      }
    },
    components: {
      FiltroItem,
      FiltroItemEstado,
      FiltroItemCidade,
      FiltroItemCategoria,
      FiltroItemPrice
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
    font-weight: bold;
    font-size: 18px;
  }
  .panel-heading .panel-title {
    font-weight: 800;
    font-size: 18px;
  }
  .list-group-item {
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
