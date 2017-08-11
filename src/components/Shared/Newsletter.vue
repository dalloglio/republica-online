<template>
  <section id="newsletter">
    <div class="container">
      <div class="row">
        <div class="col-xs-11 col-xs-offset-1">
          <h3>Receba <strong>ofertas, promoções</strong> e fique sabendo das <strong>novidades</strong> de sua cidade e faculdade!</h3>
        </div>
      </div>
      <form autocomplete="off" @submit.prevent="onSubmit">
        <fieldset class="row" :disabled="loading">
          <div class="col-xs-10 col-xs-offset-1 text-center">
            <div v-if="newsletter.ok === true" class="alert alert-success col-xs-12">
              <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <strong>Obrigado!</strong> Você se cadastrou com sucesso.
            </div>
            <div v-if="newsletter.ok === false" class="alert alert-danger col-xs-12">
              <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <strong>Ops!</strong> Não foi possível cadastrar as suas informações. Por favor, tente novamente.
            </div>
          </div>
          <div class="clearfix"></div>
          <div class="col-xs-2"></div>
          <div class="form-group col-xs-3">
            <input v-model.trim="newsletter.name" type="text" class="form-control input-lg" maxlength="100" placeholder="Digite seu nome:" required>
          </div>
          <div class="form-group col-xs-3">
            <input v-model.trim="newsletter.email" type="email" class="form-control input-lg" maxlength="100" placeholder="Digite seu e-mail:" required>
          </div>
          <div class="col-xs-3">
            <button type="submit" class="btn btn-lg btn-success btn-block text-uppercase">Assinar</button>
          </div>
        </fieldset>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  name: 'newsletter',
  data () {
    return {
      loading: false,
      newsletter: {
        ok: '',
        name: '',
        email: ''
      }
    }
  },
  methods: {
    onSubmit () {
      this.loading = true
      let params = {
        form_id: 2,
        data: this.newsletter
      }
      this.$store.dispatch('createFormContact', params).then((response) => {
        this.loading = false
        this.newsletter.ok = response.ok
        this.newsletter.name = ''
        this.newsletter.email = ''
        let self = this
        setTimeout(() => {
          self.newsletter.ok = ''
        }, 10000)
      }, (error) => {
        this.loading = false
        this.newsletter.ok = error.ok
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
#newsletter {
  padding: 10px 0;
  background-color: #fff;
  background-image: url('../../assets/img/bg-newsletter.jpg');
  background-position: bottom center;
  background-repeat: no-repeat;
}
#newsletter h3 {
  font-size: 24px;
  margin-bottom: 20px;
}
#newsletter h3 strong {
  font-weight: 800;
}
</style>
