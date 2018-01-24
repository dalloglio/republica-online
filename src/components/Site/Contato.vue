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
                <div class="form-group col-xs-4">
                  <input
                  v-model.trim="contact.name"
                  name="name"
                  type="text"
                  class="form-control input-lg"
                  maxlength="100"
                  placeholder="Nome"
                  data-vv-as="nome"
                  data-vv-rules="required|min:3|max:100"
                  v-validate
                  required
                  autofocus>
                  <span v-if="errors.has('name')" class="help-block">* {{ errors.first('name') }}</span>
                </div>

                <div class="form-group col-xs-4">
                  <input
                  v-model.trim="contact.email"
                  name="email"
                  type="email"
                  class="form-control input-lg"
                  maxlength="100"
                  placeholder="E-mail"
                  data-vv-as="email"
                  data-vv-rules="required|email|max:100"
                  v-validate
                  required>
                  <span v-if="errors.has('email')" class="help-block">* {{ errors.first('email') }}</span>
                </div>

                <div class="form-group col-xs-4">
                  <input
                  v-model.trim="contact.phone"
                  name="phone"
                  type="text"
                  class="form-control input-lg"
                  maxlength="15"
                  placeholder="Telefone"
                  data-vv-as="nome"
                  data-vv-rules="required|min:11|max:15"
                  v-validate
                  required
                  v-mask="'(99) 99999-9999'">
                  <span v-if="errors.has('phone')" class="help-block">* {{ errors.first('phone') }}</span>
                </div>

                <div class="form-group col-xs-4">
                  <input
                  v-model.trim="contact.state"
                  name="state"
                  type="text"
                  class="form-control input-lg"
                  maxlength="100"
                  placeholder="Estado"
                  data-vv-as="estado"
                  data-vv-rules="required"
                  v-validate
                  required>
                  <span v-if="errors.has('state')" class="help-block">* {{ errors.first('state') }}</span>
                </div>

                <div class="form-group col-xs-4">
                  <input
                  v-model.trim="contact.city"
                  name="city"
                  type="text"
                  class="form-control input-lg"
                  maxlength="100"
                  placeholder="Cidade"
                  data-vv-as="cidade"
                  data-vv-rules="required"
                  v-validate
                  required>
                  <span v-if="errors.has('city')" class="help-block">* {{ errors.first('city') }}</span>
                </div>

                <div class="form-group col-xs-4">
                  <input
                  v-model.trim="contact.subject"
                  name="subject"
                  type="text"
                  class="form-control input-lg"
                  maxlength="100"
                  placeholder="Assunto"
                  data-vv-as="assunto"
                  data-vv-rules="required|min:3|max:100"
                  v-validate
                  required>
                  <span v-if="errors.has('subject')" class="help-block">* {{ errors.first('subject') }}</span>
                </div>

                <div class="form-group col-xs-12">
                  <textarea
                  v-model.trim="contact.message"
                  name="message"
                  class="form-control input-lg"
                  maxlength="1000"
                  placeholder="Mensagem"
                  rows="7"
                  data-vv-as="nome"
                  data-vv-rules="required|min:10|max:1000"
                  v-validate
                  required></textarea>
                  <span v-if="errors.has('message')" class="help-block">* {{ errors.first('message') }}</span>
                </div>

                <div class="col-xs-10">
                  <div v-if="contact.ok === true" class="alert alert-success col-xs-12">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <strong>Obrigado!</strong> Sua mensagem foi enviada com sucesso.
                  </div>
                  <div v-if="contact.ok === false" class="alert alert-danger col-xs-12">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <strong>Ops!</strong> Não foi possível enviar a sua mensagem Preencha corretamente o formulário.
                  </div>
                </div>

                <div class="col-xs-2">
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
  import AwesomeMask from 'awesome-mask'
  export default {
    name: 'contato',
    directives: {
      'mask': AwesomeMask
    },
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
        },
        url: this.$http.options.url
      }
    },
    methods: {
      onSubmit () {
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.loading = true
            let params = {
              form_id: 1,
              data: this.contact
            }
            this.$store.dispatch('createFormContact', params).then((response) => {
              this.loading = false
              this.contact.ok = response.ok
              this.contact.name = ''
              this.contact.email = ''
              this.contact.phone = ''
              this.contact.state = ''
              this.contact.city = ''
              this.contact.subject = ''
              this.contact.message = ''
              let self = this
              setTimeout(() => {
                this.errors.clear()
              }, 100)
              setTimeout(() => {
                self.contact.ok = ''
              }, 10000)
            }, (error) => {
              this.loading = false
              this.contact.ok = error.ok
              console.log(error)
            })
          } else {
            console.log('Erro: Por favor, preencha corretamente o formulário.')
          }
        })
      }
    },
    head: {
      title () {
        return this.seo.title()
      },
      meta () {
        return this.seo.meta()
      },
      link () {
        return this.seo.link()
      }
    },
    computed: {
      page () {
        return {
          title: 'Contato',
          description: 'Estamos aqui para atender você da melhor maneira! Fale conosco e deixe seu recado, sugestão ou opinião, responderemos o mais breve possível!',
          keywords: 'contato republica online,aluguel estudante,alugar apartamento',
          url: this.url + this.$route.fullPath,
          image: `${this.url}/static/republica-online.png`,
          robots: 'index,follow',
          googlebot: 'index,follow'
        }
      }
    },
    created () {
      this.seo.init(this.page)
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
  .page .form-group {
    position: relative;
  }
  .page .form-group .help-block {
    position: absolute;
  }
</style>
