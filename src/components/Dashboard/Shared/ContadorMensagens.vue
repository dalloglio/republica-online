<template>
  <div class="contador contador-mensagens">
    <div class="count">
      <span>12</span>
    </div>
    <p>Você possui <strong>12</strong> novas mensagens!</p>
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
  background-image: url('../../../assets/img/contador-mensagens.png');
  background-repeat: no-repeat;
  background-position: 0 0;
}
.contador .count span {
  position: absolute;
  top: 31px;
  left: 158px;
  display: block;
  font-weight: 800;
  color: #0052cc;
}
</style>
