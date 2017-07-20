<template>
  <section id="newsletter">
    <div class="container">
      <div class="row">
        <div class="col-xs-11 col-xs-offset-1">
          <h3>Receba <strong>ofertas, promoções</strong> e fique sabendo das <strong>novidades</strong> de sua cidade e faculdade!</h3>
        </div>
      </div>
      <form class="row">
        <div class="col-xs-2"></div>
        <div class="form-group col-xs-3">
          <input v-model.trim="newsletter.nome" type="text" class="form-control input-lg" maxlength="100" placeholder="Digite seu nome:">
        </div>
        <div class="form-group col-xs-3">
          <input v-model.trim="newsletter.email" type="email" class="form-control input-lg" maxlength="100" placeholder="Digite seu e-mail:">
        </div>
        <div class="col-xs-3">
          <button type="submit" class="btn btn-lg btn-success btn-block text-uppercase">Assinar</button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  name: 'newsletter',
  data () {
    return {
      newsletter: {}
    }
  }
}
</script>

<style>
#newsletter {
  padding: 20px 0;
}
</style>
