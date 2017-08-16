<template>
  <div class="dashboard-meus-anuncios">
    <h2><span>Meus Anúncios</span>, anunciou?</h2>
    <p>Ta aqui!</p>
    <div class="line"></div>

    <table class="table table-hover">
      <tbody>
        <tr v-for="ad in ads">
          <td>
            <img :src="ad.photo.url" :alt="ad.title">
          </td>
          <td width="200">
            <b>Anúncio:</b><br>
            <router-link :to="{ name: 'anuncio', params: { slug: ad.slug } }" :title="ad.title" target="_blank">
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
</template>

<script>
export default {
  name: 'dashboard-meus-anuncios',
  computed: {
    ads () {
      let ads = this.$store.state.ad.ads
      if (!ads.data) {
        return []
      }
      return ads.data
    }
  },
  methods: {
    onEdit (ad) {
      this.$router.push({ name: 'dashboard.meus-anuncios.edit', params: { id: ad.id } })
    },
    onDelete (ad) {
      if (confirm('Você tem certeza que deseja excluir este anúncio?')) {
        console.log(ad)
      }
    }
  },
  created () {
    this.$store.dispatch('getAdsUser')
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
