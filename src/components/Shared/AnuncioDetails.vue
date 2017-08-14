<template>
  <div class="anuncio-details">
    <div class="panel">
      <div class="panel-heading">
        <h4 class="panel-title">
          <span class="price">R$ 500,00</span>
        </h4>
      </div>
      <div class="panel-body">
        <p class="detail"><i class="icon icon-map-marker"></i>Palmas - TO</p>
        <p class="detail"><i class="icon icon-sexo"></i> Masculina</p>
        <p class="detail"><i class="icon icon-cama"></i> Compartilhado</p>
        <p class="detail"><i class="icon icon-dinheiro"></i> Contas inclusas</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'anuncio-details'
}
</script>

<style scoped>
.panel {
  background-color: #f4f7f9;
  border-color: #f4f7f9;
  margin-bottom: 30px;
}
.panel-heading {
  background-color: #57d9a3;
  padding: 18px 15px;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
}
.panel-title {
  font-weight: 800;
  font-size: 30px;
  color: #091e42;
}
.panel-body {
  padding: 15px 10px 20px;
}
p.detail {
  margin-bottom: 5px;
}
.icon {
    vertical-align: bottom;
}
</style>
