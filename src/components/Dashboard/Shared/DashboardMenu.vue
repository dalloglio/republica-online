<template>
    <div class="dashboard-menu">
        <div class="panel">
            <div class="panel-avatar">
                <router-link :to="{ name: 'dashboard.minha-conta' }" :title="user.name" class="avatar">
                    <img :src="avatar" :alt="user.name">
                </router-link>
                <div class="edit-photo">
                    <input type="file" name="edit-photo" id="edit-photo" @change="onChangeAvatar" accept="image/*">
                    <label for="edit-photo">
                        <span class="glyphicon glyphicon-camera"></span>
                        editar foto
                    </label>
                </div>
                <h4>{{ name }}</h4>
                <p>membro desde: {{ $date.toDateBr(user.created_at) }}</p>
            </div>
            <div class="panel-body">
                <ul class="nav">
                    <li><router-link :to="{ name: 'dashboard.home' }">Início <span class="glyphicon glyphicon-menu-right"></span></router-link></li>
                    <li><router-link :to="{ name: 'dashboard.minha-conta' }">Meu Cadastro <span class="glyphicon glyphicon-menu-right"></span></router-link></li>
                    <li><router-link :to="{ name: 'dashboard.meus-anuncios' }">Meus Anúncios <span class="glyphicon glyphicon-menu-right"></span></router-link></li>
                    <li><router-link :to="{ name: 'dashboard.minhas-mensagens' }">Minhas Mensagens <span class="glyphicon glyphicon-menu-right"></span></router-link></li>
                    <li><router-link :to="{ name: 'dashboard.meus-favoritos' }">Meus Favoritos <span class="glyphicon glyphicon-menu-right"></span></router-link></li>
                    <li><router-link :to="{ name: 'auth.logout' }">Sair <span class="glyphicon glyphicon-menu-right"></span></router-link></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'dashboard-menu',
  data () {
    return {
      avatar: ''
    }
  },
  methods: {
    onChangeAvatar (e) {
      let file = e.target.files[0]
      this.avatar = URL.createObjectURL(file)
      let formData = new FormData()
      formData.append('photo', file)
      this.$store.dispatch('updateUserPhoto', formData).then((response) => {
        console.log(file)
      })
    }
  },
  computed: {
    user () {
      let user = this.$store.state.user.user
      if (user.photo) {
        this.avatar = this.$store.getters.urlPhoto(user.photo.id)
      }
      return user
    },
    name () {
      return this.$store.getters.userName
    }
  }
}
</script>

<style scoped>
.panel {
  position: relative;
  background-color: #f4f7f9;
}
.panel-body {
  padding: 0 15px 20px;
}

.panel-avatar {
  position: relative;
  text-align: center;
  padding: 70px 15px 0;
}
.panel-avatar h4 {
  font-size: 18px;
  font-weight: 800;
}
.panel-avatar .avatar {
  position: absolute;
  top: -70px;
  left: 50%;
  margin-left: -70px;
  width: 140px;
  height: 140px;
  border: 10px solid #f4f7f9;
  background-color: #091e42;
  border-radius: 50%;
  overflow: hidden;
}
.panel-avatar .avatar img {
  position: absolute;
  top: 0;
  left: 50%;
  -moz-transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
  -o-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
  transform: translateX(-50%);
  display: block;
  margin: 0 auto;
  height: 100%;
}
.panel-avatar .edit-photo {
  position: absolute;
  right: 15px;
  top: 15px;
}
.panel-avatar .edit-photo input {
  display: none;
}
.panel-avatar .edit-photo label {
  text-align: center;
  color: #0052cc;
  font-weight: normal;
  font-size: 13px;
  cursor: pointer;
}
.panel-avatar .edit-photo label span {
  font-size: 2em;
  display: block;
  color: #091e42;
}

.nav > li {
}
.nav > li > a {
  position: relative;
  padding: 15px 0;
  border-bottom: 1px solid #091e42;
  background-color: transparent;
  color: #091e42;
}
.nav > li:last-child > a {
  border-bottom: 0 none;
}
.nav > li > a:hover,
.nav > li > a:focus {
  background-color: transparent;
  color: #091e42;
}
.nav > li > a > span {
  position: absolute;
  right: 5px;
  top: 18px;
  font-size: 13px;
}
.nav > li.active > a > span,
.nav > li > a:hover > span,
.nav > li > a:focus > span {
  right: -5px;
}
</style>
