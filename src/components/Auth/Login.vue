<template>
  <div class="login">
    <div class="container">
      <div class="row">
        <div class="col-xs-4 col-xs-offset-1">
          <form autocomplete="off" id="login" @submit.prevent="onLogin" data-vv-scope="login">

            <h3 class="text-center">Login</h3>
            <btn-facebook @facebook-login="onLoginFacebook"></btn-facebook>
            <span class="or text-center">ou</span>

            <fieldset :disabled="loadingLogin">
              <div class="form-group">
                <label for="login_email" class="sr-only">E-mail</label>
                <input v-model.trim="login.username"
                type="email"
                id="login_email"
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
                <label for="login_password" class="sr-only">Senha</label>
                <input v-model="login.password"
                type="password"
                id="login_password"
                name="password"
                class="form-control input-lg"
                placeholder="Senha"
                minlength="6"
                maxlength="20"
                data-vv-as="senha"
                data-vv-rules="required|min:6|max:20"
                v-validate
                required>
                <span v-if="errors.has('password')" class="help-block">* {{ errors.first('password') }}</span>
              </div>

              <div class="checkbox">
                <input v-model="login.remember_me" type="checkbox" id="login_remember_me" checked>
                <label for="login_remember_me">Lembrar de mim</label>
                <router-link :to="{ name: 'auth.password.email' }" class="pull-right">Esqueci minha senha</router-link>
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
          <form autocomplete="off" id="register" @submit.prevent="onRegister" data-vv-scope="register">

            <h3 class="text-center">Cadastre-se</h3>
            <btn-facebook @facebook-login="onLoginFacebook"></btn-facebook>
            <span class="or text-center">ou</span>

            <fieldset :disabled="loadingRegister">
              <div class="form-group">
                <label for="register_name" class="sr-only">Nome</label>
                <input v-model.trim="register.name"
                type="text"
                id="register_name"
                name="name"
                class="form-control input-lg"
                placeholder="Nome"
                minlength="3"
                maxlength="100"
                data-vv-as="nome"
                data-vv-rules="required|min:3|max:100"
                v-validate
                required>
                <span v-if="errors.has('name')" class="help-block">* {{ errors.first('name') }}</span>
              </div>

              <div class="form-group">
                <label for="register_email" class="sr-only">E-mail</label>
                <input v-model="register.email"
                type="email"
                id="register_email"
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
                <label for="register_password" class="sr-only">Senha</label>
                <input v-model="register.password"
                type="password"
                id="register_password"
                name="password"
                class="form-control input-lg"
                placeholder="Senha"
                minlength="6"
                maxlength="20"
                data-vv-as="senha"
                data-vv-rules="required|confirmed:password_confirmation|min:6|max:20"
                v-validate
                required>
                <span v-if="errors.has('password')" class="help-block">* {{ errors.first('password') }}</span>
              </div>

              <div class="form-group">
                <label for="register_password_confirmation" class="sr-only">Repita a senha</label>
                <input v-model="register.password_confirmation"
                type="password"
                id="register_password_confirmation"
                name="password_confirmation"
                class="form-control input-lg"
                placeholder="Repita a senha"
                minlength="6"
                maxlength="20"
                data-vv-as="repita a senha"
                data-vv-rules="required|min:6|max:20"
                v-validate
                required>
                <span v-if="errors.has('password_confirmation')" class="help-block">* {{ errors.first('password_confirmation') }}</span>
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
          username: '',
          password: '',
          remember_me: false
        },
        register: {
          name: '',
          email: '',
          password: '',
          password_confirmation: ''
        },
        url: this.$http.options.url
      }
    },
    methods: {
      initLoadingLogin () {
        this.$store.dispatch('setSpinnerDescription', 'Estamos realizando o seu login...')
        this.spinner.open()
        this.loadingLogin = true
      },
      stopLoadingLogin () {
        this.spinner.close()
        this.loadingLogin = false
      },
      initLoadingRegister () {
        this.$store.dispatch('setSpinnerDescription', 'Estamos realizando o seu cadastro...')
        this.spinner.open()
        this.loadingRegister = true
      },
      stopLoadingRegister () {
        this.spinner.close()
        this.loadingRegister = false
      },
      _login (user) {
        this.initLoadingLogin()
        this.$store.dispatch('login', user).then((response) => {
          this.stopLoadingLogin()
          setTimeout(() => {
            if (!this.$route.query.redirect) {
              this.$router.push({ name: response.redirect })
            } else {
              this.$router.push({ path: this.$route.query.redirect })
            }
          }, 300)
        }, (error) => {
          this.stopLoadingLogin()
          this.$message.error('O e-mail ou a senha estão incorretos.')
          console.log(error.message)
        })
      },
      _register (user) {
        this.initLoadingRegister()
        this.$store.dispatch('registerUser', user).then((response) => {
          if (response.ok) {
            setTimeout(() => {
              this._login({
                username: user.email,
                password: user.password
              })
            }, 300)
          } else {
            this.stopLoadingRegister()
          }
        }, (error) => {
          this.stopLoadingRegister()
          console.log(error)
          if (error.status === 422) {
            let errors = error.body
            Object.values(errors).map((err) => {
              err.forEach((msg) => {
                this.$message.error(msg)
              })
            })
          }
        })
      },
      onLogin () {
        this.$validator.validateAll('login').then((result) => {
          if (result) {
            this._login(this.login)
          } else {
            this.$message.info('Por favor, preencha corretamente os campos para fazer login.')
          }
        })
      },
      onRegister () {
        this.$validator.validateAll('register').then((result) => {
          if (result) {
            this._register(this.register)
          } else {
            this.$message.info('Por favor, preencha corretamente os campos para se registrar.')
          }
        })
      },
      onLoginFacebook (status, user) {
        if (status === false) {
          return
        }
        user.facebook = true
        this.$store.dispatch('loginFacebook', user).then((response) => {
          if (response.ok) {
            setTimeout(() => {
              this._login({
                username: user.email,
                password: user.id
              })
            }, 300)
          } else {
            this.stopLoadingLogin()
            this.stopLoadingRegister()
          }
        }, (error) => {
          this.stopLoadingLogin()
          this.stopLoadingRegister()
          console.log(error.message)
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
          title: 'Login',
          description: 'O republica.online funciona a partir de uma ideia simples: que você possa encontrar ou divulgar uma república de um jeito fácil e rápido.',
          keywords: 'republica online,aluguel estudante,alugar apartamento',
          url: this.url + this.$route.fullPath,
          image: `${this.url}/static/republica-online.png`,
          robots: 'index,follow',
          googlebot: 'index,follow'
        }
      }
    },
    created () {
      this.seo.init(this.page)
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
