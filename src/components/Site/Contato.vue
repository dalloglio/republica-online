<template>
    <div class="page contato">
        <section class="container">
            <div class="row">
                <div class="col-xs-10 col-xs-offset-1">
                    <div class="content">
                        <h2>Dúvidas, reclamações ou sugestões? Fale com a gente!</h2>
                        <p>Estamos aqui para atender você da melhor maneira! Fale conosco e deixe seu recado, sugestão ou opinião, responderemos o mais breve possível!</p>

                        <div class="line"></div>

                        <form autocomplete="off" class="row" @submit.prevent="onSubmit">
                            <div class="form-group col-xs-6">
                                <input v-model.trim="contact.name" type="text" class="form-control input-lg" maxlength="100" placeholder="Nome" required autofocus>
                            </div>
                            <div class="form-group col-xs-6">
                                <input v-model.trim="contact.email" type="email" class="form-control input-lg" maxlength="100" placeholder="E-mail" required>
                            </div>
                            <div class="form-group col-xs-6">
                                <input v-model.trim="contact.phone" type="text" class="form-control input-lg" maxlength="15" placeholder="Telefone" required>
                            </div>
                            <div class="form-group col-xs-6">
                                <input v-model.trim="contact.city" type="text" class="form-control input-lg" maxlength="100" placeholder="Cidade" required>
                            </div>
                            <div class="form-group col-xs-12">
                                <textarea v-model.trim="contact.message" class="form-control input-lg" maxlength="1000" placeholder="Mensagem" required rows="7"></textarea>
                            </div>
                            <div class="col-xs-2 col-xs-offset-10">
                                <button type="submit" class="btn btn-lg btn-success btn-block text-uppercase">Enviar!</button>
                            </div>
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
      contact: {
        name: '',
        email: '',
        phone: '',
        city: '',
        message: ''
      }
    }
  },
  methods: {
    onSubmit () {
    }
  }
}
</script>

<style lang="css" scoped>
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
.page .content  ul {
  margin-bottom: 30px;
}
.page .content  ul > li {
  line-height: 30px;
}
.page .content  ul > li h4 {
  font-size: 14px;
  font-weight: 600;
  display: inline-block;
}
</style>
