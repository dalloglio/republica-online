<template>
  <div class="dashboard-home">
    <h2><span>Ricardo Pires</span>, esta é sua dashboard!</h2>
    <p>Aqui você encontrará todas as informações de sua conta, anúncios e mensagens.</p>
    <div class="line"></div>

    <div class="row">
      <div class="col-xs-4">
        <contador-republicas></contador-republicas>
      </div>
      <div class="col-xs-4">
        <contador-mensagens></contador-mensagens>
      </div>
      <div class="col-xs-4">
        <contador-comunidades></contador-comunidades>
      </div>
    </div>
  </div>
</template>

<script>
import ContadorComunidades from '@/components/Dashboard/Shared/ContadorComunidades'
import ContadorMensagens from '@/components/Dashboard/Shared/ContadorMensagens'
import ContadorRepublicas from '@/components/Dashboard/Shared/ContadorRepublicas'
export default {
  name: 'dashboard-home',
  components: {
    ContadorComunidades,
    ContadorMensagens,
    ContadorRepublicas
  }
}
</script>
