<template>
  <div class="filtros">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">Refina sua busca</h3>
      </div>

      <filtro-item :open="true" :border="true" :id="0" title="Tipo de quarto"></filtro-item>
      <filtro-item :open="true" :border="true" :id="1" title="Tipo de quarto"></filtro-item>
      <filtro-item :open="false" :border="true" :id="2" title="Tipo de quarto"></filtro-item>
      <filtro-item :open="false" :border="true" :id="3" title="Tipo de quarto"></filtro-item>
      <filtro-item :open="false" :border="true" :id="4" title="Tipo de quarto"></filtro-item>
      <filtro-item :open="false" :border="false" :id="5" title="Tipo de quarto"></filtro-item>
    </div>
  </div>
</template>

<script>
import FiltroItem from '@/components/Shared/FiltroItem'
export default {
  name: 'filtros',
  components: {
    FiltroItem
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
  background-color: rgba(0,0,0,.1);
}
.panel-heading {
  font-weight: bold;
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
