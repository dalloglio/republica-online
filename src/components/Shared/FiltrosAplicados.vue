<template>
  <div class="filtros-aplicados">
    <div class="panel panel-default panel-filtro">
      <div class="panel-heading">
        <h3 class="panel-title">Panel title</h3>
      </div>

      <ul class="list-group">
        <li class="list-group-item">Tocantins <a href="" title="Remover" class="pull-right"><span class="glyphicon glyphicon-trash"></span></a></li>
        <li class="list-group-item">Palmas <a href="" title="Remover" class="pull-right"><span class="glyphicon glyphicon-trash"></span></a></li>
        <li class="list-group-item">Masculina <a href="" title="Remover" class="pull-right"><span class="glyphicon glyphicon-trash"></span></a></li>
        <li class="list-group-item">Compartilhado <a href="" title="Remover" class="pull-right"><span class="glyphicon glyphicon-trash"></span></a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'filtros-aplicados'
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
  padding-top: 10px;
  padding-bottom: 10px;
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
