<template>
  <div class="dashboard-minhas-mensagens">
    <h2><span>Minhas Mensagens</span>, será que deu match?</h2>
    <p>Veja as mensagens enviadas por seus interessados 8)</p>

    <div v-if="contacts.length > 0">
      <div class="line"></div>
      <table class="table table-hover">
        <tbody>
          <tr v-for="(contact, contactIindex) in contacts">
            <td>
              <img :src="contact.ad.photo.url" :alt="contact.ad.title">
            </td>
            <td width="150">
              <b>Anúncio:</b><br>
              <router-link :to="{ name: 'anuncio', params: { slug: contact.ad.slug } }" :title="contact.ad.title" target="_blank">
                {{ contact.ad.title }}
              </router-link>
            </td>
            <td width="150">
              <b>De:</b><br>
              {{ contact.name }}
            </td>
            <td>
              <b>Enviada em:</b><br>
              {{ $date.toNice(contact.created_at) }}
            </td>
            <td>
              <b>Ações:</b><br>
              <button type="button" @click="onShow(contact)"><i class="icon-edit"></i> Ver</button>
              <button type="button" @click="onDelete(contact, contactIindex)"><i class="icon-delete"></i> Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else>
      <p>
        <strong>Nenhuma mensagem recebida, ainda!!!</strong>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dashboard-minhas-mensagens',
  computed: {
    ads () {
      let ads = this.$store.state.ad.ads
      if (!ads.data) {
        return []
      }
      return ads.data
    },
    contacts () {
      let ads = this.ads
      if (!ads || ads.length <= 0) {
        return []
      }
      let contacts = []
      ads.forEach((ad, index) => {
        if (ad.contacts) {
          ad.contacts.forEach((contact, key) => {
            contact.ad = {}
            contact.ad.id = ad.id
            contact.ad.slug = ad.slug
            contact.ad.title = ad.title
            contact.ad.photo = ad.photo
            contacts.push(contact)
          })
        }
      })
      return contacts
    }
  },
  methods: {
    onShow (contact) {
      this.$router.push({ name: 'dashboard.minhas-mensagens.show', params: { ad_id: contact.ad.id, id: contact.id } })
    },
    onDelete (contact, index) {
      if (confirm('Você tem certeza que deseja excluir esta mensagem?')) {
        this.$store.dispatch('deleteAdContact', {
          ad_id: contact.ad.id,
          id: contact.id
        }).then((response) => {
          if (response.ok) {
            this.$store.dispatch('getAdsContactsUser')
          }
        }, (error) => {
          console.log(error)
        })
      }
    }
  },
  created () {
    this.$store.dispatch('getAdsContactsUser')
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
  vertical-align: top;
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
