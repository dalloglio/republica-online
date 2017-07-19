<template>
  <div class="home">
    <section id="intro">
      <div class="container">
        <div class="row">
          <div class="col-xs-7 info">
            <h1>Vamos encontrar uma<br>república com a <span class="text-uppercase">sua</span> cara!</h1>
            <p>Primeiro selecione o estado<br>e depois a cidade</p>
            <p><small>* depois nós iremos filtrar em mais detalhes a sua nova república ok?</small></p>
          </div>

          <div class="col-xs-5 search">
            <form>
              <div class="form-group">
                <select class="form-control input-lg" v-model="estado">
                  <option value="">Selecione o estado</option>
                  <option v-for="estado in estados" :value="estado.abbr">{{ estado.name }}</option>
                </select>
              </div>
              <div class="form-group">
                <select class="form-control input-lg" v-model="cidade">
                  <option value="">Selecione o cidade</option>
                  <option v-for="cidade in cidades" :value="cidade.name">{{ cidade.name }}</option>
                </select>
              </div>
              <button type="submit" class="btn btn-lg btn-success btn-block text-uppercase">Buscar!</button>
            </form>
          </div>
        </div>
      </div>
    </section>

    <section id="overview">
      <div class="container">
        <div class="row">
          <div class="col-xs-3">
            <h4><span class="glyphicon glyphicon-star"></span>Faça uma busca</h4>
            <p>Veja a lista de opções próximas ao local de sua escolha.</p>
          </div>
          <div class="col-xs-3">
            <h4><span class="glyphicon glyphicon-star"></span>Encontre o local ideal</h4>
            <p>Encontre a opção que mais se encaixa com seu perfil e necessidades!</p>
          </div>
          <div class="col-xs-3">
            <h4><span class="glyphicon glyphicon-star"></span>Troque mensagens</h4>
            <p>Converse com o responsável pela república, tire suas dúvidas e combine os detalhes...</p>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12">
            <h4>eee pronto, agora é só mudar *)</h4>
            <p>e se você tiver qualquer dúvida, basta acessar a <router-link :to="{ name: 'faq' }">nossa central de ajuda</router-link> ou <router-link :to="{ name: 'contato' }">falar com a gente!</router-link></p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      estado: '',
      cidade: ''
    }
  },
  computed: {
    estados () {
      return [
        { abbr: 'PR', name: 'Paraná' },
        { abbr: 'SC', name: 'Santa Catarina' },
        { abbr: 'RS', name: 'Rio Grande do Sul' }
      ]
    },
    cidades () {
      return [
        { name: 'Curitiba' },
        { name: 'Florianópolis' },
        { name: 'Porto Alegre' }
      ]
    }
  }
}
</script>

<style lang="css" scoped>
#intro {
  height: 538px;
  background-color: rgba(0,0,0,.1);
}
#intro .info {
  margin-top: 120px;
  margin-bottom: 120px;
}
#intro .info h1 {
  font-weight: bold;
  font-size: 50px;
  line-height: 1.45
}
#intro .info p {
  font-size: 16px;
  line-height: 2.45;
  margin-bottom: 0;
}
#intro .info p small {
  color: blue;
}
#intro .search {
  margin-top: 160px;
  margin-bottom: 180px;
}
#intro .search form {
  padding-left: 60px;
  padding-right: 60px;
}
#intro .search form .form-group {
  margin-bottom: 30px;
}
</style>
