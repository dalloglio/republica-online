<template>
    <div class="dashboard-menu">
        <div class="panel">
            <div class="panel-avatar">
                <a href="" title="Avatar" class="avatar">
                    <img src="https://randomuser.me/api/portraits/men/81.jpg" alt="Avatar">
                </a>
                <div class="edit-photo">
                    <input type="file" id="edit-photo">
                    <label for="edit-photo">
                        <span class="glyphicon glyphicon-camera"></span>
                        editar foto
                    </label>
                </div>
                <h4>Francisco Antunes</h4>
                <p>membro desde: 14/05/2017</p>
            </div>
            <div class="panel-body">
                <ul class="nav">
                    <li><router-link :to="{ name: 'dashboard.minha-conta' }">Meu Cadastro <span class="glyphicon glyphicon-menu-right"></span></router-link></li>
                    <li><router-link :to="{ name: 'dashboard.meus-anuncios' }">Meus Anúncios <span class="glyphicon glyphicon-menu-right"></span></router-link></li>
                    <li><router-link :to="{ name: 'dashboard.minhas-mensagens' }">Minhas Mensagens <span class="glyphicon glyphicon-menu-right"></span></router-link></li>
                    <li><router-link :to="{ name: 'dashboard.meus-favoritos' }">Meus Favoritos <span class="glyphicon glyphicon-menu-right"></span></router-link></li>
                </ul>
            </div>
        </div>
    </div>
</template>

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
  border-radius: 50%;
  overflow: hidden;
}
.panel-avatar .avatar img {
  display: block;
  margin: 0 auto;
  max-width: 100%;
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
