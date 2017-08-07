<template>
  <div class="dashboard-minhas-mensagens">
    <h2><span>Minhas Mensagens</span>, será que deu match?</h2>
    <p>Veja as mensagens enviadas por seus interessados 8)</p>
    <div class="line"></div>

    <table class="table table-hover">
      <tbody>
        <tr v-for="contact in contacts">
          <td>
            <img :src="contact.ad.photo" :alt="contact.ad.title">
          </td>
          <td>
            <b>Anúncio:</b><br>
            {{ contact.ad.title }}
          </td>
          <td>
            <b>De:</b><br>
            {{ contact.name }}
          </td>
          <td>
            <b>Enviada em:</b><br>
            {{ contact.created_at }}
          </td>
          <td>
            <b>Ações:</b><br>
            <button type="button" @click="onShow(contact)"><i class="icon-edit"></i> Ver</button>
            <button type="button" @click="onDelete(contact)"><i class="icon-delete"></i> Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'dashboard-minhas-mensagens',
  computed: {
    contacts () {
      return [{
        id: 1,
        name: 'Gustavo',
        phone: '(99) 9 9999-9999',
        email: 'gustavo@email.com',
        message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt veritatis, eius laboriosam reprehenderit quod aliquid id quaerat, repudiandae quos at sapiente vel maxime libero similique voluptate possimus. Odio, voluptatum, in?',
        created_at: '2017-01-01 10:30:00',
        ad: {
          id: 1,
          title: 'Anúncio A',
          photo: 'http://lorempixel.com/150/95/nature/1/'
        }
      }, {
        id: 2,
        name: 'Maria',
        phone: '(99) 9 9999-9999',
        email: 'gustavo@email.com',
        message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt veritatis, eius laboriosam reprehenderit quod aliquid id quaerat, repudiandae quos at sapiente vel maxime libero similique voluptate possimus. Odio, voluptatum, in?',
        created_at: '2017-01-01 11:30:00',
        ad: {
          id: 2,
          title: 'Anúncio B',
          photo: 'http://lorempixel.com/150/95/nature/2/'
        }
      }, {
        id: 3,
        name: 'João',
        phone: '(99) 9 9999-9999',
        email: 'gustavo@email.com',
        message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt veritatis, eius laboriosam reprehenderit quod aliquid id quaerat, repudiandae quos at sapiente vel maxime libero similique voluptate possimus. Odio, voluptatum, in?',
        created_at: '2017-01-01 12:30:00',
        ad: {
          id: 3,
          title: 'Anúncio C',
          photo: 'http://lorempixel.com/150/95/nature/3/'
        }
      }]
    }
  },
  methods: {
    onShow (ad) {
      this.$router.push({ name: 'dashboard-minhas-mensagens.show', params: { id: ad.id } })
    },
    onDelete (ad) {
      if (confirm('Você tem certeza que deseja excluir esta mensagem?')) {
        console.log(ad)
      }
    }
  }
}
</script>

<style scoped>
table tr td:first-child {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
table tr td:last-child {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}
table tr td img {
  display: block;
  width: 150px;
  height: 95px;
  border-radius: 6px;
}
table tr td {
  vertical-align: middle;
  padding: 15px;
  border-color: #091e42;
}
table tr:first-child td {
  border-top: 0 none;
}
table tr td button {
  background-color: transparent;
  border: 0 none;
  box-shadow: none;
  overflow: hidden;
}
table tr td i {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  width: 30px;
  height: 30px;
  top: -2px;
  background-color: transparent;
  background-image: url('../../assets/img/icons-table.png');
  background-repeat: no-repeat;
}
table tr td i.icon-edit {
  background-position: 0 0;
}
table tr td i.icon-delete {
  background-position: 0 -30px;
}
</style>
