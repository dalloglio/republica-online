<template>
  <div class="modal modal-change-password fade">
    <div class="modal-dialog">
      <div class="modal-content">

        <div class="modal-body">

          <div v-if="send" class="message">
            <span class="glyphicon glyphicon-ok"></span>
            <h3>Sua senha<br>foi alterada com sucesso!</h3>
            <button type="button" data-dismiss="modal" class="btn btn-lg btn-warning">Fechar</button>
          </div>

          <fieldset :disabled="sending" v-else>
            <slot name="title"></slot>
            <form autocomplete="off" class="row" @submit.prevent="onSubmit">
                <div class="form-group col-xs-4">
                    <input v-model.trim="user.password_old" type="password" class="form-control input-lg" minlength="6" maxlength="20" placeholder="Senha antiga" required autofocus>
                </div>
                <div class="form-group col-xs-4">
                    <input v-model.trim="user.password" type="password" class="form-control input-lg" minlength="6" maxlength="20" placeholder="Nova senha" required>
                </div>
                <div class="form-group col-xs-4">
                    <input v-model.trim="user.password_confirmation" type="password" class="form-control input-lg" minlength="6" maxlength="20" placeholder="Repita a nova senha" required>
                </div>
                <div v-if="validationsErrors" class="col-xs-7">
                  <p v-for="error in validationsErrors" class="text-danger">{{ error }}</p>
                </div>
                <div class="col-xs-5">
                  <button type="submit" class="btn btn-lg btn-warning btn-block">Salvar</button>
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
  name: 'modal-change-password',
  data () {
    return {
      validationsErrors: [],
      sending: false,
      send: false,
      user: {
        password_old: '',
        password: '',
        password_confirmation: ''
      }
    }
  },
  methods: {
    show () {
      window.jQuery('.modal-change-password').modal('show')
    },
    hide () {
      window.jQuery('.modal-change-password').modal('hide')
    },
    reset () {
      this.user.password_old = ''
      this.user.password = ''
      this.user.password_confirmation = ''
      this.sending = false
      this.send = false
    },
    onSubmit () {
      this.sending = true
      this.$store.dispatch('updateUserPassword', this.user).then((response) => {
        this.sending = false
        if (response.ok) {
          this.send = true
        }
      }, (error) => {
        this.sending = false
        if (error.status === 422) {
          this.validationsErrors = []
          Object.values(error.body).map((e) => {
            e.map((msg) => {
              this.validationsErrors.push(msg)
            })
          })
        }
        console.log(error)
      })
    }
  },
  mounted () {
    let self = this
    window.jQuery('.modal-change-password').on('hidden.bs.modal', function (e) {
      self.reset()
    })
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
