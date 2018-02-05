<template>
  <div class="login password-email">
    <div class="container">
      <div class="row">
        <div class="col-xs-4 col-xs-offset-4">
          <form autocomplete="off" @submit.prevent="onSubmit">
            <h3 class="text-center">Esqueci minha senha</h3>
            <fieldset :disabled="loading">
              <div class="form-group">
                <label for="email" class="sr-only">E-mail</label>
                <input v-model.trim="user.email"
                type="email"
                id="email"
                name="email"
                class="form-control input-lg"
                placeholder="E-mail"
                maxlength="100"
                data-vv-as="e-mail"
                data-vv-rules="required|email"
                v-validate
                required
                autofocus>
                <span v-if="errors.has('email')" class="help-block">* {{ errors.first('email') }}</span>
              </div>

              <div class="form-group">
                <button type="submit" class="btn btn-lg btn-success btn-block text-uppercase">Enviar</button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'password-email',
    data () {
      return {
        loading: false,
        user: {
          email: ''
        }
      }
    },
    methods: {
      openLoading () {
        this.loading = true
        this.$store.dispatch('setSpinnerDescription', 'Estamos enviando um e-mail para você com o link para redefinir a sua senha...')
        this.spinner.open()
      },
      closeLoading () {
        this.loading = false
        this.spinner.close()
      },
      onSubmit () {
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.openLoading()
            this.$store.dispatch('passwordEmail', this.user).then((response) => {
              this.closeLoading()
              if (response.ok) {
                let message = response.body.message
                this.$message.success(message)
                this.$router.push({ name: 'auth.login' })
              }
            }, (error) => {
              this.closeLoading()
              console.log(error)
              this.$message.error(error.body.erro)
            })
          } else {
            this.$message.info('Por favor, preencha corretamente os campos para resetar a senha.')
          }
        })
      }
    }
  }
</script>

<style scoped>
  .user {
    height: 679px;
  }
  form {
    margin: 100px auto;
  }
  h3 {
    font-size: 30px;
    font-weight: 800;
    color: #fff;
    margin: 30px auto;
  }
  .btn {
    font-weight: 600;
  }
  .form-group {
    margin-bottom: 15px;
  }
  .help-block {
    text-transform: lowercase;
    display: inline-block;
    margin: 2px 0;
    color: #fff;
    font-weight: 600;
  }
</style>
