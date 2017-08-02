<template>
  <div class="thumbnail">
    <router-link :to="{ name: 'home' }" title="Anúncio">
      <img src="../../assets/img/anuncio-1.jpg" alt="Anúncio">
      <span class="label label-success price">R$ 550,00</span>
    </router-link>
    <div class="caption">
      <h3>República Dom Almir<small>Palmas - TO</small></h3>
      <p class="detail"><i class="icon icon-sexo"></i> Masculina</p>
      <p class="detail"><i class="icon icon-cama"></i> Compartilhado</p>
      <p class="detail"><i class="icon icon-dinheiro"></i> Contas inclusas</p>
      <p class="text-right">
        <router-link :to="{ name: 'home' }" class="btn btn-link" title="veja mais detalhes">
          veja mais detalhes <span class="glyphicon glyphicon-menu-right"></span>
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'anuncio'
}
</script>

<style scoped>
.thumbnail {
  border: 0 none;
  border-radius: 0;
  padding: 0;
  margin: 15px 0;
}
.thumbnail a {
  display: block;
  position: relative;
}
.thumbnail a .price {
  position: absolute;
  top: 15px;
  right: -15px;
  padding: 6px 18px;
  font-size: 18px;
  font-weight: 800;
  color: #091e42;
}
.thumbnail a img {
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}
.thumbnail .caption h3 {
  font-size: 18px;
  font-weight: 800;
  margin-top: 10px;
}
.thumbnail .caption h3 small {
  display: block;
  font-size: 14px;
  line-height: 20px;
  color: #091e42;
}
.thumbnail .caption .detail {
  margin-bottom: 0;
}
.icon {
    vertical-align: bottom;
}
.btn-link {
  margin-top: 15px;
  display: inline-block!important;
}
.btn-link span {
  margin-left: 20px;
}
</style>
