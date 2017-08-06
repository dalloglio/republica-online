<template>
  <div class="contador contador-comunidades">
    <div class="count">
      <span>0</span>
    </div>
    <p>Você ainda não está em nenhuma comunidade privada :(</p>
  </div>
</template>

<style scoped>
.contador {
  position: relative;
}
.contador .count {
  position: relative;
  width: 260px;
  height: 120px;
  background-color: #fff;
  background-image: url('../../../assets/img/contador-comunidades.png');
  background-repeat: no-repeat;
  background-position: 0 0;
}
.contador .count span {
  position: absolute;
  top: 31px;
  left: 157px;
  display: block;
  font-weight: 800;
  color: #0052cc;
}
</style>
