<template>
  <div class="page home">
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

    <section id="latest">
      <div class="container">
        <h2>Estes aqui são os últimos anúncios!</h2>
        <p>Veja a lista de opções próximas ao local de sua escolha.</p>
      </div>
      <div class="line"></div>
      <div class="container">
        <div class="row">
          <div v-for="i in 4" class="col-xs-3">
            <thumbnail></thumbnail>
          </div>
        </div>
      </div>
    </section>

    <section id="cta">
      <div class="container">
        <div class="row">
          <div class="col-xs-7 call">
            <h1>Vamos anunciar para quem<br>realmente quer comprar!</h1>
            <p>Anuncie em nosso portal!</p>
            <p>Conheça todos os planos e fale diretamente com o seu mercado consumidor!</p>
            <p><small>Solicite a um de nossos parceiros maiores detalhes, ficaremos satisfeitos em ajudar =D</small></p>
          </div>
          <div class="col-xs-5 action">
            <router-link :to="{ name: 'home' }" class="btn btn-lg btn-success text-uppercase">Quero anunciar já!</router-link>
          </div>
        </div>
      </div>
    </section>

    <section id="partners">
      <div class="container">
        <h2>Conheça nossos parceiros!</h2>
        <p>Estas são algumas das empresas e entidades que acreditam na República Online.</p>
      </div>
      <div class="line"></div>
      <carousel></carousel>
    </section>

    <section id="newsletter">
      <div class="container">
        <div class="row">
          <div class="col-xs-11 col-xs-offset-1">
            <h3>Receba <strong>ofertas, promoções</strong> e fique sabendo das <strong>novidades</strong> de sua cidade e faculdade!</h3>
          </div>
        </div>
        <form class="row">
          <div class="col-xs-2"></div>
          <div class="form-group col-xs-3">
            <input v-model.trim="newsletter.nome" type="text" class="form-control input-lg" maxlength="100" placeholder="Digite seu nome:">
          </div>
          <div class="form-group col-xs-3">
            <input v-model.trim="newsletter.email" type="email" class="form-control input-lg" maxlength="100" placeholder="Digite seu e-mail:">
          </div>
          <div class="col-xs-3">
            <button type="submit" class="btn btn-lg btn-success btn-block text-uppercase">Assinar</button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import Carousel from '@/components/Site/Shared/Carousel'
import Thumbnail from '@/components/Site/Shared/Thumbnail'
export default {
  name: 'home',
  components: {
    Carousel,
    Thumbnail
  },
  data () {
    return {
      estado: '',
      cidade: '',
      newsletter: {}
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
  background-color: #fff;
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

#overview {
  padding: 20px 0;
  background-color: rgba(0,0,0,.1);
}

#latest {
  padding: 60px 0;
}
#latest h2 {
  margin: 20px auto;
}
#latest .line {
  width: 200px;
  height: 5px;
  display: block;
  margin: 20px auto;
  background-color: blue;
}

#cta {
  height: 500px;
  background-color: #eee;
}
#cta .call {
  margin-top: 100px;
  margin-bottom: 100px;
}
#cta .call h1 {
  font-weight: bold;
  font-size: 50px;
  line-height: 1.45
}
#cta .call p {
  font-size: 16px;
  line-height: 2.45;
  margin-bottom: 0;
}
#cta .call p small {
  color: blue;
}
#cta .action {
  margin-top: 350px;
}
#cta .action a {
  padding-left: 80px;
  padding-right: 80px;
}

#partners {
  padding: 60px 0;
}
#partners h2 {
  margin: 20px auto;
}
#partners .line {
  width: 200px;
  height: 5px;
  display: block;
  margin: 20px auto;
  background-color: blue;
}

#newsletter {
  padding: 20px 0;
}
</style>
