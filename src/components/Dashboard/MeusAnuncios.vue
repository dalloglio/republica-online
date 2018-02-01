<template>
  <div class="dashboard-meus-anuncios">
    <h2><span>Meus Anúncios</span>, anunciou?</h2>
    <p>Ta aqui!</p>
    <div v-if="ads.length > 0">
      <div class="line"></div>
      <table class="table table-hover">
        <tbody>
          <tr v-for="ad in ads">
            <td>
              <img v-if="ad.photo" :src="urlPhoto(ad.photo)" :alt="ad.title">
              <img v-else src="http://via.placeholder.com/150x95?text=+" :alt="ad.title">
            </td>
            <td width="200">
              <b>Anúncio:</b><br>
              <router-link :to="{ name: 'anuncio', params: { id: ad.id, slug: ad.slug } }" :title="ad.title" target="_blank">
                {{ ad.title }}
              </router-link>
            </td>
            <td>
              <b>Criado:</b><br>
              {{ $date.toNice(ad.created_at) }}
            </td>
            <td>
              <b>Status:</b><br>
              {{ ad.status ? 'Publicado' : 'Pausado' }}
            </td>
            <td>
              <b>Ações:</b><br>
              <button type="button" @click="onEdit(ad)"><i class="icon-edit"></i> Editar</button>
              <button type="button" @click="onDelete(ad)"><i class="icon-delete"></i> Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="loading">
      <p><strong>Um momento, estamos procurando seus anúncios...</strong></p>
    </div>

    <div v-if="!ads.length && !loading">
      <p><strong>Nenhum anúncio cadastrado, ainda!!!</strong></p>
      <p>
        <router-link :to="{ name: 'criar-anuncio' }" class="btn btn-lg btn-warning" title="Anuncie sua vaga!">
          Anuncie sua vaga!
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'dashboard-meus-anuncios',
    data () {
      return {
        loading: true
      }
    },
    computed: {
      ads () {
        let ads = this.$store.state.ad.ads
        return ads.data || []
      }
    },
    methods: {
      urlPhoto (photo) {
        return this.$store.getters.urlPhoto(photo.id)
      },
      onEdit (ad) {
        this.$router.push({ name: 'dashboard.meus-anuncios.edit', params: { id: ad.id } })
      },
      onDelete (ad) {
        if (confirm('Você tem certeza que deseja excluir este anúncio?')) {
          this.$store.dispatch('deleteAd', ad.id).then((response) => {
            if (response.ok) {
              alert('O anúncio foi excluído com sucesso.')
              this.getAds()
            } else {
              console.log(response.statusText)
            }
          }, (error) => console.log(error))
        }
      },
      getAds () {
        this.$store.dispatch('getAdsUser').then(() => {
          this.loading = false
        })
      }
    },
    created () {
      this.getAds()
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
