<template>
  <div class="dashboard-minhas-mensagens">
    <h2><span>Minhas Mensagens</span>, será que deu match?</h2>
    <p>Veja as mensagens enviadas por seus interessados 8)</p>

    <div v-if="contacts.length > 0">
      <div class="line"></div>
      <table class="table table-hover">
        <tbody>
          <tr v-for="(contact, contactIindex) in contacts">
            <td width="1%">
              <span v-if="!contact.viewed_at" class="label label-success">Nova</span>
              <span v-else class="label label-default">Visualizada</span>
            </td>
            <td>
              <img v-if="contact.ad.photo" :src="urlPhoto(contact.ad.photo)" :alt="contact.ad.title">
              <img v-else src="http://via.placeholder.com/150x95?text=+" :alt="contact.ad.title">
            </td>
            <td width="150">
              <b>Anúncio:</b><br>
              <router-link :to="{ name: 'anuncio', params: { id: contact.ad.id, slug: contact.ad.slug } }" :title="contact.ad.title" target="_blank">
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

    <div v-if="loading">
      <p><strong>Um momento, estamos procurando suas mensagens...</strong></p>
    </div>

    <div v-if="!contacts.length && !loading">
      <p>
        <strong>Nenhuma mensagem recebida, ainda!!!</strong>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'dashboard-minhas-mensagens',
    data () {
      return {
        loading: true
      }
    },
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
              if (contact.origin === 'page_form_ad') {
                contact.ad = {}
                contact.ad.id = ad.id
                contact.ad.slug = ad.slug
                contact.ad.title = ad.title
                contact.ad.photo = ad.photo
                contacts.push(contact)
              }
            })
          }
        })

        contacts.sort((a, b) => {
          let result = new Date(b.created_at) - new Date(a.created_at)
          console.log(result)
          return result
        })

        return contacts
      }
    },
    methods: {
      urlPhoto (photo) {
        return this.$store.getters.urlPhoto(photo.id)
      },
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
              this.getAdsContactsUser()
            }
          }, (error) => {
            console.log(error)
          })
        }
      },
      getAdsContactsUser () {
        this.$store.dispatch('getAdsContactsUser').then(() => {
          this.loading = false
        })
      }
    },
    created () {
      this.getAdsContactsUser()
    },
    beforeDestroy () {
      this.$store.commit('setAds', [])
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
