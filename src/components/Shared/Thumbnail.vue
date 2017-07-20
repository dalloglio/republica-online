<template>
  <div class="thumbnail">
    <router-link :to="{ name: 'home' }" title="Anúncio">
      <img src="http://via.placeholder.com/300x200" alt="Anúncio">
      <span class="price">R$ 550,00</span>
    </router-link>
    <div class="caption">
      <h3>República Dom Almir<small>Palmas - TO</small></h3>
      <p class="detail"><span class="glyphicon glyphicon-ok"></span> Masculina</p>
      <p class="detail"><span class="glyphicon glyphicon-ok"></span> Compartilhado</p>
      <p class="detail"><span class="glyphicon glyphicon-ok"></span> Contas inclusas</p>
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
  padding: 3px 18px;
  border-radius: 4px;
  background-color: green;
  color: lightblue;
  font-weight: bold;
  font-size: 16px;
}
.thumbnail a img {
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}
.thumbnail .caption h3 {
  font-size: 16px;
  margin-top: 10px;
}
.thumbnail .caption h3 small {
  display: block;
  font-size: 14px;
  line-height: 20px;
}
</style>
