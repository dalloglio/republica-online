<template>
  <div class="login">
    <div class="row">
      <div class="col-xs-4 col-xs-offset-4">
        <div class="panel panel-default">
          <div class="panel-body">
            <h1><small>Dashboard</small>Login</h1>
            <form @submit.prevent="onSubmit">
              <div class="form-group">
                <input v-model="user.username" class="form-control" required="true" placeholder="E-mail" type="email" minlength="3" maxlength="255" autofocus="true"/>
              </div>
              <div class="form-group">
                <input v-model="user.password" class="form-control" required="true" placeholder="Senha" type="password" minlength="6" maxlength="20"/>
              </div>
              <button type="primary" class="btn btn-default pull-right">Entrar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      user: {
        username: 'ricardo.tech@live.com',
        password: '123456'
      }
    }
  },
  methods: {
    onSubmit: function () {
      this.$auth.login(this.user).then((response) => {
        if (response.status === true) {
          this.$router.push({ name: response.redirect })
        } else {
          this.message('Oops, não foi possível fazer login! ' + response.message)
        }
      }, (error) => {
        this.message('Oops, não foi possível fazer login! ' + error.message)
      })
    },
    message: function (msg) {
      console.log(msg)
    }
  }
}
</script>

<style scoped>
</style>
