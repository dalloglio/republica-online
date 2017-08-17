<template>
  <div class="dashboard-meus-favoritos">
    <h2><span>Meus Favoritos</span>, gostou desses anúncios?</h2>
    <p>Se você favoritou, vai estar aqui ;)</p>
    <div class="line"></div>

    <table class="table table-hover">
      <tbody>
        <tr v-for="favorite in favorites">
          <td width="1%">
            <span class="favorite glyphicon glyphicon-star"></span>
          </td>
          <td>
            <img :src="favorite.ad.photo.url" :alt="favorite.ad.title">
          </td>
          <td width="180">
            <b>Anúncio:</b><br>
            <router-link :to="{ name: 'anuncio', params: { slug: favorite.ad.slug } }" :title="favorite.ad.title" target="_blank">
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
</template>

<script>
export default {
  name: 'dashboard-meus-favoritos',
  computed: {
    favorites () {
      return this.$store.state.user.favorites
    }
  },
  methods: {
    onDelete (favorite) {
      if (confirm('Você tem certeza que deseja excluir este anúncio dos favoritos?')) {
        console.log(favorite)
      }
    }
  },
  created () {
    this.$store.dispatch('getUserFavorites')
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
