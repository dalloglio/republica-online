<template>
  <div class="dashboard home">
    <h1>Olá!<small>Seja bem vindo</small></h1>
    <p>Aqui esta o painel de administração de conteúdo do site.</p>
  </div>
</template>

<script>
export default {
  name: 'dashboard-home'
}
</script>

<style scoped>
  .home {
    height: 100%;
    text-align: center;
  }
  .el-row {
    height: 100%;
  }
  small {
    display: block;
  }
  p {
    color: #999;
  }
</style>
