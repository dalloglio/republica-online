<template>
  <div class="login password-reset">
    <div class="container">
      <div class="row">
        <div class="col-xs-4 col-xs-offset-4">
          <form autocomplete="off" @submit.prevent="onSubmit">
            <h3 class="text-center">Resetar a senha</h3>
            <fieldset :disabled="loading">
              <div class="form-group">
                <label for="email" class="sr-only">E-mail</label>
                <input v-model="user.email"
                type="email"
                id="email"
                name="email"
                class="form-control input-lg"
                placeholder="E-mail"
                maxlength="100"
                data-vv-as="email"
                data-vv-rules="required|email"
                v-validate
                required>
                <span v-if="errors.has('email')" class="help-block">* {{ errors.first('email') }}</span>
              </div>

              <div class="form-group">
                <label for="password" class="sr-only">Nova senha</label>
                <input v-model="user.password"
                type="password"
                id="password"
                name="password"
                class="form-control input-lg"
                placeholder="Nova senha"
                minlength="6"
                maxlength="20"
                data-vv-as="Nova senha"
                data-vv-rules="required|min:6|max:20"
                v-validate
                required>
                <span v-if="errors.has('password')" class="help-block">* {{ errors.first('password') }}</span>
              </div>

              <div class="form-group">
                <label for="password_confirmation" class="sr-only">Repita a senha</label>
                <input v-model="user.password_confirmation"
                type="password"
                id="password_confirmation"
                name="password_confirmation"
                class="form-control input-lg"
                placeholder="Repita a senha"
                minlength="6"
                maxlength="20"
                data-vv-as="repita a senha"
                data-vv-rules="required|confirmed:password|min:6|max:20"
                v-validate
                required>
                <span v-if="errors.has('password_confirmation')" class="help-block">* {{ errors.first('password_confirmation') }}</span>
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
  name: 'password-reset',
  data () {
    return {
      loading: false,
      user: {
        email: '',
        password: '',
        password_confirmation: '',
        token: this.$route.query.token || ''
      }
    }
  },
  methods: {
    onSubmit () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.loading = true
          this.$store.dispatch('passwordReset', this.user).then((response) => {
            this.loading = false
            if (response.ok) {
              let message = response.body.message
              alert(message)
              this.$router.push({ name: 'auth.login' })
            }
          }, (error) => {
            this.loading = false
            console.log(error)
            alert(error.body.erro)
          })
        } else {
          console.log('Erro: Por favor, preencha corretamente os campos para enviar a nova senha.')
        }
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    if (!to.query.token) {
      next({ name: 'auth.password.email' })
    } else {
      next()
    }
  }
}
</script>

<style scoped>
.login {
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
