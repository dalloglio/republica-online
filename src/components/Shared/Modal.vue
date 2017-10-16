<template>
  <div class="modal fade">
    <div class="modal-dialog">
      <div class="modal-content">

        <div class="modal-body">

          <div v-if="send" class="message">
            <span class="glyphicon glyphicon-ok"></span>
            <h3>Sua mensagem<br>foi enviada com sucesso!</h3>
            <button type="button" data-dismiss="modal" class="btn btn-lg btn-warning">Fechar</button>
          </div>

          <fieldset :disabled="sending" v-else>
            <slot name="title"></slot>
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
                    <textarea v-model.trim="contact.message" class="form-control input-lg" maxlength="500" placeholder="Mensagem" required rows="5"></textarea>
                </div>
                <div class="col-xs-5 col-xs-offset-7">
                  <button type="submit" class="btn btn-lg btn-warning btn-block">Enviar Mensagem!</button>
                </div>
            </form>
          </fieldset>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'modal',
    props: {
      ad: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        sending: false,
        send: false,
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
      show () {
        window.jQuery('.modal').modal('show')
      },
      hide () {
        window.jQuery('.modal').modal('hide')
      },
      onSubmit () {
        this.sending = true
        let params = {
          id: this.ad.id,
          data: this.contact
        }
        this.$store.dispatch('createAdContact', params).then((response) => {
          this.sending = false
          this.send = true
        }, (error) => {
          console.log(error)
          this.sending = false
          this.send = false
        })
      }
    }
  }
</script>

<style>
  h3 {
    font-size: 24px;
    font-weight: 800;
    margin: 20px auto 30px;
  }
  .message {
    text-align: center;
    margin: 30px auto;
  }
  .message span {
    font-size: 3em;
  }
  .message h3 {
    font-size: 30px;
    font-weight: 800;
    line-height: 45px;
  }
</style>
