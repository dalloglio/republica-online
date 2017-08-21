<template>
  <div class="login">
    <div class="container">
      <div class="row">
        <div class="col-xs-4 col-xs-offset-1">
          <form autocomplete="off" id="login" @submit.prevent="onLogin">
            <h3 class="text-center">Login</h3>
            <btn-facebook @facebook-login="onLoginFacebook"></btn-facebook>
            <span class="or text-center">ou</span>
            <fieldset :disabled="loadingLogin">
              <div class="form-group">
                <label for="login_email" class="sr-only">E-mail</label>
                <input v-model.trim="login.username"
                type="email"
                id="login_email"
                name="login_email"
                class="form-control input-lg"
                placeholder="E-mail"
                maxlength="100"
                data-vv-as="e-mail"
                data-vv-rules="required|email"
                v-validate
                required
                autofocus>
                <span v-if="errors.has('login_email')" class="help-block">* {{ errors.first('login_email') }}</span>
              </div>
              <div class="form-group">
                <label for="login_password" class="sr-only">Senha</label>
                <input v-model="login.password"
                type="password"
                id="login_password"
                name="login_password"
                class="form-control input-lg"
                placeholder="Senha"
                minlength="6"
                maxlength="20"
                data-vv-as="senha"
                data-vv-rules="required|min:6|max:20"
                v-validate
                required>
                <span v-if="errors.has('login_password')" class="help-block">* {{ errors.first('login_password') }}</span>
              </div>
              <div class="checkbox">
                <input v-model="login.remember_me" type="checkbox" id="login_remember_me" checked>
                <label for="login_remember_me">Lembrar de mim</label>
                <router-link :to="{ name: 'auth.login' }" class="pull-right">Esqueci minha senha</router-link>
              </div>
              <div class="form-group">
                <button type="submit" class="btn btn-lg btn-success btn-block text-uppercase">Entrar</button>
              </div>
            </fieldset>
          </form>
        </div>

        <div class="col-xs-2">
          <div class="divider"></div>
        </div>

        <div class="col-xs-4">
          <form autocomplete="off" id="register" @submit.prevent="onRegister">
            <h3 class="text-center">Cadastre-se</h3>
            <btn-facebook @facebook-login="onLoginFacebook"></btn-facebook>
            <span class="or text-center">ou</span>
            <fieldset :disabled="loadingRegister">
              <div class="form-group">
                <label for="register_name" class="sr-only">Nome</label>
                <input v-model.trim="register.name"
                type="text"
                id="register_name"
                name="register_name"
                class="form-control input-lg"
                placeholder="Nome"
                minlength="3"
                maxlength="100"
                data-vv-as="nome"
                data-vv-rules="required|min:3|max:100"
                v-validate
                required>
                <span v-if="errors.has('register_name')" class="help-block">* {{ errors.first('register_name') }}</span>
              </div>
              <div class="form-group">
                <label for="register_email" class="sr-only">E-mail</label>
                <input v-model="register.email"
                type="email"
                id="register_email"
                name="register_email"
                class="form-control input-lg"
                placeholder="E-mail"
                maxlength="100"
                data-vv-as="email"
                data-vv-rules="required|email"
                v-validate
                required>
                <span v-if="errors.has('register_email')" class="help-block">* {{ errors.first('register_email') }}</span>
              </div>
              <div class="form-group">
                <label for="register_password" class="sr-only">Senha</label>
                <input v-model="register.password"
                type="password"
                id="register_password"
                name="register_password"
                class="form-control input-lg"
                placeholder="Senha"
                minlength="6"
                maxlength="20"
                data-vv-as="senha"
                data-vv-rules="required|confirmed:register_password_confirmation|min:6|max:20"
                v-validate
                required>
                <span v-if="errors.has('register_password')" class="help-block">* {{ errors.first('register_password') }}</span>
              </div>
              <div class="form-group">
                <label for="register_password_confirmation" class="sr-only">Repita a senha</label>
                <input v-model="register.password_confirmation"
                type="password"
                id="register_password_confirmation"
                name="register_password_confirmation"
                class="form-control input-lg"
                placeholder="Repita a senha"
                minlength="6"
                maxlength="20"
                data-vv-as="repita a senha"
                data-vv-rules="required|min:6|max:20"
                v-validate
                required>
                <span v-if="errors.has('register_password_confirmation')" class="help-block">* {{ errors.first('register_password_confirmation') }}</span>
              </div>
              <div class="form-group">
                <button type="submit" class="btn btn-lg btn-success btn-block text-uppercase">Cadastrar</button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BtnFacebook from './BtnFacebook'
export default {
  name: 'login',
  components: {
    BtnFacebook
  },
  data () {
    return {
      loadingLogin: false,
      loadingRegister: false,
      login: {
        username: 'ricardo.tech@live.com',
        password: '123456',
        remember_me: false
      },
      register: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    onLogin () {
      this.loadingLogin = true
      this.$store.dispatch('login', this.login).then((response) => {
        this.loadingLogin = false
        this.$router.push({ name: response.redirect })
      }, (error) => {
        this.loadingLogin = false
        console.log(error.message)
      })
    },
    onRegister () {
      this.loadingRegister = true
      this.$store.dispatch('registerUser', this.register).then((response) => {
        this.loadingRegister = false
        if (response.ok) {
          this.login.username = this.register.email
          this.login.password = this.register.password
          this.onLogin()
        }
      }, (error) => {
        this.loadingRegister = false
        console.log(error.message)
      })
    },
    onLoginFacebook (status, user) {
      if (status === false) {
        return
      }
      this.$store.dispatch('loginFacebook', user).then((response) => {
        if (response.ok) {
          this.login.username = user.email
          this.login.password = user.id
          this.onLogin()
        }
      }, (error) => {
        this.loadingRegister = false
        console.log(error.message)
      })
    }
  },
  created () {
    if (this.$store.getters.isAuthenticated) {
      this.$router.push({ name: 'dashboard.home' })
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
.or {
  display: block;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  margin: 25px auto;
}
.checkbox label,
.checkbox a {
  color: #fff;
}
.btn {
  font-weight: 600;
}
.divider {
  position: relative;
  width: 1px;
  height: 430px;
  margin: 105px auto 0;
  background-color: #eee;
  box-shadow: 0px 1px 2px 0px rgba(0,0,0,.3);
  display: block;
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
