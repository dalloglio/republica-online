<template>
  <div class="page anuncios">
    <section id="anuncios">
      <div class="container">
        <h2>Encontramos 184 vagas pra você!</h2>
        <p>Utilize os filtros abaixo para refinar ainda mais a sua pesquisa.</p>
        <select id="order-as" class="form-control input-lg">
          <option value="">ordenar como:</option>
          <option value="novos">mais novos</option>
          <option value="antigos">mais antigos</option>
        </select>
      </div>
      <div class="line"></div>
      <div class="container">
        <div class="row">
          <div class="col-xs-3">
            <filtros-aplicados></filtros-aplicados>
            <filtros></filtros>
            <banner-meia-pagina></banner-meia-pagina>
            <banner-meia-pagina></banner-meia-pagina>
            <banner-meia-pagina></banner-meia-pagina>
          </div>
          <div class="col-xs-9">
            <div class="row">
              <div class="col-xs-12">
                <banner-outdoor></banner-outdoor>
              </div>
            </div>
            <div class="row">
              <div v-for="i in 24" class="col-xs-4">
                <thumbnail></thumbnail>
              </div>
            </div>
            <div class="row">
              <div class="col-xs-12">
                <pagination></pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <newsletter></newsletter>
  </div>
</template>

<script>
import BannerOutdoor from '@/components/Shared/BannerOutdoor'
import BannerMeiaPagina from '@/components/Shared/BannerMeiaPagina'
import Filtros from '@/components/Shared/Filtros'
import FiltrosAplicados from '@/components/Shared/FiltrosAplicados'
import Newsletter from '@/components/Shared/Newsletter'
import Pagination from '@/components/Shared/Pagination'
import Thumbnail from '@/components/Shared/Thumbnail'
export default {
  name: 'anuncios',
  components: {
    BannerOutdoor,
    BannerMeiaPagina,
    Filtros,
    FiltrosAplicados,
    Newsletter,
    Pagination,
    Thumbnail
  }
}
</script>

<style scoped>
#anuncios {
  padding: 60px 0;
}
#anuncios h2 {
  margin: 20px auto;
}
#anuncios .line {
  width: 200px;
  height: 5px;
  display: block;
  margin: 20px auto 30px;
  background-color: blue;
}

#order-as {
  position: absolute;
  width: 180px;
  right: 15px;
  top: 50px;
}
</style>
