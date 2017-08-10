<template>
  <div class="login">

    <div class="container">
      <div class="row">
        <div class="col-xs-4 col-xs-offset-1">
          <form autocomplete="off" id="login" @submit.prevent="onLogin">
            <h3 class="text-center">Login</h3>
            <button-facebook-login></button-facebook-login>
            <span class="or text-center">ou</span>
            <fieldset>
              <div class="form-group">
                <label for="login_email" class="sr-only">E-mail</label>
                <input v-model="login.username" type="email" id="login_email" class="form-control input-lg" placeholder="E-mail" maxlength="100" required autofocus>
              </div>
              <div class="form-group">
                <label for="login_password" class="sr-only">Senha</label>
                <input v-model="login.password" type="password" id="login_password" class="form-control input-lg" placeholder="Senha" minlength="6" maxlength="20" required>
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
            <button-facebook-login></button-facebook-login>
            <span class="or text-center">ou</span>
            <fieldset>
              <div class="form-group">
                <label for="register_name" class="sr-only">Nome</label>
                <input v-model="register.name" type="text" id="register_name" class="form-control input-lg" placeholder="Nome" maxlength="100" required>
              </div>
              <div class="form-group">
                <label for="register_email" class="sr-only">E-mail</label>
                <input v-model="register.username" type="email" id="register_email" class="form-control input-lg" placeholder="E-mail" maxlength="100" required>
              </div>
              <div class="form-group">
                <label for="register_password" class="sr-only">Senha</label>
                <input v-model="register.password" type="password" id="register_password" class="form-control input-lg" placeholder="Senha" minlength="6" maxlength="20" required>
              </div>
              <div class="form-group">
                <label for="register_password_repeat" class="sr-only">Repita a senha</label>
                <input v-model="register.password_repeat" type="password" id="register_password_repeat" class="form-control input-lg" placeholder="Repita a senha" minlength="6" maxlength="20" required>
                <span class="help-block">* As senhas não conferem</span>
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
import ButtonFacebookLogin from './ButtonFacebookLogin'
export default {
  name: 'login',
  components: {
    ButtonFacebookLogin
  },
  data () {
    return {
      login: {
        username: 'ricardo.tech@live.com',
        password: '123456',
        remember_me: false
      },
      register: {
        name: '',
        username: '',
        password: '',
        remember_me: false
      }
    }
  },
  methods: {
    onLogin () {
      this.$auth.login(this.login).then((response) => {
        if (response.status === true) {
          this.$router.push({ name: response.redirect })
        } else {
          console.log('Oops, não foi possível fazer login! ' + response.message)
        }
      }, (error) => {
        console.log('Oops, não foi possível fazer login! ' + error.message)
      })
    },
    onRegister () {
    },
    loginFacebook (response) {
      this.$FB.Event.unsubscribe('auth.login', this.loginFacebook)
      if (response.status === 'connected') {
        this.me()
      }
    },
    me () {
      this.$FB.api('/me?fields=id,name,first_name,last_name,email,gender,picture', (response) => {
        console.log(response)
      })
    },
    facebookReady () {
      this.$FB.Event.subscribe('auth.login', this.loginFacebook)
    }
  },
  mounted () {
    window.addEventListener('fb-sdk-ready', this.facebookReady)
  },
  beforeDestroy () {
    window.removeEventListener('fb-sdk-ready', this.facebookReady)
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
.btn-facebook {
  position: relative;
  background-color: #3b5998;
  color: #fff;
  overflow: hidden;
}
.icon-facebook {
  position: absolute;
  content: "";
  width: 45px;
  height:   45px;
  background-color: transparent;
  background-image: url('../../assets/img/icon-facebook.png');
  background-repeat: no-repeat;
  background-position: 0 0;
  top: -1px;
  left: -1px;
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
