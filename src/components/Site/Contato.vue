<template>
    <div class="page contato">
        <section class="container">
            <div class="row">
                <div class="col-xs-10 col-xs-offset-1">
                    <div class="content">
                        <h2>Dúvidas, reclamações ou sugestões? Fale com a gente!</h2>
                        <p>Estamos aqui para atender você da melhor maneira! Fale conosco e deixe seu recado, sugestão ou opinião, responderemos o mais breve possível!</p>

                        <div class="line"></div>

                        <form autocomplete="off" @submit.prevent="onSubmit">
                            <fieldset class="row" :disabled="loading">
                              <div v-if="contact.ok === true" class="alert alert-success col-xs-12">Obrigado! Sua mensagem foi enviada com sucesso.</div>
                              <div v-if="contact.ok === false" class="alert alert-danger col-xs-12">Ops! Não foi possível enviar a sua mensagem Preencha corretamente o formulário.</div>
                              <div class="form-group col-xs-4">
                                  <input v-model.trim="contact.name" type="text" class="form-control input-lg" maxlength="100" placeholder="Nome" required autofocus>
                              </div>
                              <div class="form-group col-xs-4">
                                  <input v-model.trim="contact.email" type="email" class="form-control input-lg" maxlength="100" placeholder="E-mail" required>
                              </div>
                              <div class="form-group col-xs-4">
                                  <input v-model.trim="contact.phone" type="text" class="form-control input-lg" maxlength="15" placeholder="Telefone" required>
                              </div>
                              <div class="form-group col-xs-4">
                                  <input v-model.trim="contact.state" type="text" class="form-control input-lg" maxlength="100" placeholder="Cidade" required>
                              </div>
                              <div class="form-group col-xs-4">
                                  <input v-model.trim="contact.city" type="text" class="form-control input-lg" maxlength="100" placeholder="Cidade" required>
                              </div>
                              <div class="form-group col-xs-4">
                                  <input v-model.trim="contact.subject" type="text" class="form-control input-lg" maxlength="100" placeholder="Assunto" required>
                              </div>
                              <div class="form-group col-xs-12">
                                  <textarea v-model.trim="contact.message" class="form-control input-lg" maxlength="1000" placeholder="Mensagem" required rows="7"></textarea>
                              </div>
                              <div class="col-xs-2 col-xs-offset-10">
                                  <button type="submit" class="btn btn-lg btn-success btn-block text-uppercase">Enviar!</button>
                              </div>
                            </fieldset>
                        </form>
                    </div>
                </div>
             </div>
        </section>
    </div>
</template>

<script>
export default {
  name: 'contato',
  data () {
    return {
      loading: false,
      contact: {
        ok: '',
        name: '',
        email: '',
        phone: '',
        state: '',
        city: '',
        subject: '',
        message: ''
      }
    }
  },
  methods: {
    onSubmit () {
      this.loading = true
      let params = {
        form_id: 1,
        data: this.contact
      }
      this.$store.dispatch('createFormContact', params).then((response) => {
        this.loading = false
        this.contact.ok = response.ok
      }, (error) => {
        this.loading = false
        this.contact.ok = error.ok
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
.page {
  padding: 60px 0;
}
.page .content  h2 {
  font-size: 30px;
  font-weight: 800;
  margin: 20px auto;
}
.page .content  h3 {
  font-size: 24px;
  font-weight: 800;
  margin: 20px auto;
  text-transform: uppercase;
}
.page .content p {
  line-height: 30px;
}
</style>
