<template>
  <div class="dashboard-meus-favoritos">
    <h2><span>Meus Favoritos</span>, gostou desses anúncios?</h2>
    <p>Se você favoritou, vai estar aqui ;)</p>
    <div class="line"></div>

    <table class="table table-hover">
      <tbody>
        <tr v-for="ad in ads">
          <td width="1%">
            <span class="favorite glyphicon glyphicon-star"></span>
          </td>
          <td>
            <img :src="ad.photo" :alt="ad.title">
          </td>
          <td>
            <b>Anúncio:</b><br>
            {{ ad.title }}
          </td>
          <td>
            <b>Categoria:</b><br>
            {{ ad.category }}
          </td>
          <td>
            <b>Salvo em:</b><br>
            {{ ad.created_at }}
          </td>
          <td>
            <b>Ações:</b><br>
            <button type="button" @click="onDelete(ad)"><i class="icon-delete"></i> Excluir</button>
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
    ads () {
      return [
        { id: 1, slug: 'anuncio-a', title: 'Anúncio A', category: 'República', created_at: '2017-01-01 10:30:00', photo: 'http://lorempixel.com/150/95/nature/1/' },
        { id: 2, slug: 'anuncio-b', title: 'Anúncio B', category: 'República', created_at: '2017-01-02 11:30:00', photo: 'http://lorempixel.com/150/95/nature/2/' },
        { id: 3, slug: 'anuncio-c', title: 'Anúncio C', category: 'República', created_at: '2017-01-03 12:30:00', photo: 'http://lorempixel.com/150/95/nature/3/' }
      ]
    }
  },
  methods: {
    onDelete (ad) {
      if (confirm('Você tem certeza que deseja excluir este anúncio dos favoritos?')) {
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
table tr td i.icon-delete {
  background-position: 0 -30px;
}
table tr td .favorite {
  color: #fdc400;
  font-size: 20px;
}
</style>
