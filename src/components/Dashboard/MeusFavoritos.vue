<template>
  <div class="dashboard-meus-favoritos">
    <h2><span>Meus Favoritos</span>, gostou desses anúncios?</h2>
    <p>Se você favoritou, vai estar aqui ;)</p>

    <div v-if="favorites.length > 0">
      <div class="line"></div>
      <table class="table table-hover">
        <tbody>
          <tr v-for="favorite in favorites" v-if="favorite.ad">
            <td width="1%">
              <span class="favorite glyphicon glyphicon-star"></span>
            </td>
            <td>
              <img v-if="favorite.ad.photo" :src="urlPhoto(favorite.ad.photo)" :alt="favorite.ad.title">
              <img v-else src="http://via.placeholder.com/150x95?text=+" :alt="favorite.ad.title">
            </td>
            <td width="180">
              <b>Anúncio:</b><br>
              <router-link :to="{ name: 'anuncio', params: { id: favorite.ad.id, slug: favorite.ad.slug } }" :title="favorite.ad.title" target="_blank">
                {{ favorite.ad.title }}
              </router-link>
            </td>
            <td width="150">
              <b>Categoria:</b><br>
              {{ favorite.ad.category.title }}
            </td>
            <td>
              <b>Salvo em:</b><br>
              {{ $date.toNice(favorite.created_at) }}
            </td>
            <td>
              <b>Ações:</b><br>
              <button type="button" @click="onDelete(favorite)"><i class="icon-delete"></i> Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="loading">
      <p><strong>Um momento...estamos procurando seus anúncios favoritos.</strong></p>
    </div>

    <div v-if="!favorites.length && !loading">
      <p><strong>Você ainda não possui nenhum república favorita :(</strong></p>
      <p>
        <router-link :to="{ name: 'anuncios' }" class="btn btn-lg btn-warning" title="Ver anúncios">
          Ver anúncios
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'dashboard-meus-favoritos',
    data () {
      return {
        loading: true
      }
    },
    computed: {
      favorites () {
        return this.$store.state.user.favorites
      }
    },
    methods: {
      urlPhoto (photo) {
        return this.$store.getters.urlPhoto(photo.id)
      },
      onDelete (favorite) {
        if (confirm('Você tem certeza que deseja excluir este anúncio dos favoritos?')) {
          this.$store.dispatch('deleteUserFavorite', favorite.id).then((response) => {
            if (response.ok) {
              this.getFavorites()
            }
          }, (error) => {
            console.log(error)
          })
        }
      },

      getFavorites () {
        this.$store.dispatch('getUserFavorites').then(() => {
          this.loading = false
        })
      }
    },
    created () {
      this.getFavorites()
    },
    beforeDestroy () {
      this.$store.commit('setUserFavorites', [])
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
  table tr td i.icon-delete {
    background-position: 0 -30px;
  }
  table tr td .favorite {
    color: #fdc400;
    font-size: 20px;
  }
</style>
