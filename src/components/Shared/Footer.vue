<template>
  <footer>
    <div class="container">
      <div class="row">
        <div class="col-xs-3">
          <h4 class="text-uppercase">Institucional</h4>
          <ul class="list-unstyled">
            <li><router-link :to="{ name: 'sobre' }" title='Sobre nós'>Sobre nós</router-link></li>
            <!-- <li><router-link :to="{ name: 'home' }" title='Parceiros'>Parceiros</router-link></li> -->
            <li><router-link :to="{ name: 'termos-de-uso' }" title='Termos de Uso'>Termos de Uso</router-link></li>
            <li><router-link :to="{ name: 'politicas-de-privacidade' }" title='Políticas de Privacidade'>Políticas de Privacidade</router-link></li>
          </ul>
        </div>

        <div class="col-xs-3">
          <h4 class="text-uppercase">Fale Conosco</h4>
          <ul class="list-unstyled">
            <li><router-link :to="{ name: 'contato' }" title='Contato'>Contato</router-link></li>
            <!-- <li><router-link :to="{ name: 'home' }" title='Trabalhe Conosco'>Trabalhe Conosco</router-link></li> -->
            <li><router-link :to="{ name: 'faq' }" title='Central de Ajuda'>Central de Ajuda</router-link></li>
            <li><router-link :to="{ name: 'criar-anuncio' }" title='Anuncie com a gente!'>Anuncie com a gente!</router-link></li>
          </ul>
        </div>

        <div class="col-xs-3">
          <h4 class="text-uppercase">Saiba mais</h4>
          <ul class="list-unstyled">
            <li><router-link :to="{ name: 'home' }" title='Internet'>Internet</router-link></li>
            <li><router-link :to="{ name: 'home' }" title='Cursos'>Cursos</router-link></li>
            <li><router-link :to="{ name: 'home' }" title='Energia'>Energia</router-link></li>
            <li><router-link :to="{ name: 'home' }" title='Água'>Água</router-link></li>
            <li><router-link :to="{ name: 'home' }" title='Modelo de Contrato'>Modelo de Contrato</router-link></li>
          </ul>
        </div>

        <div class="col-xs-3">
          <h4 class="text-uppercase">Categorias</h4>
          <ul class="list-unstyled">
            <li><router-link :to="{ name: 'home' }" title='Repúblicas'>Repúblicas</router-link></li>
            <li><router-link :to="{ name: 'home' }" title='Casas'>Casas</router-link></li>
            <li><router-link :to="{ name: 'home' }" title='Apartamentos'>Apartamentos</router-link></li>
            <li><router-link :to="{ name: 'home' }" title='Kitnetes'>Kitnetes</router-link></li>
            <li><router-link :to="{ name: 'home' }" title='Hotéis'>Hotéis</router-link></li>
          </ul>
        </div>
      </div>
    </div>

    <section id="payment">
      <div class="container">
        <div class="row">
          <div class="col-xs-3">
            <p>Seu pagamento será processado pela:</p>
            <p>
              <a href="https://www.cielo.com.br/" title="Cielo" target="_blank">
                <img src="../../assets/img/payments/cielo.png" alt="Cielo">
              </a>
              <a href="https://iugu.com/" title="Iugu" target="_blank">
                <img src="../../assets/img/payments/iugu.png" alt="Iugu">
              </a>
            </p>
          </div>

          <div class="col-xs-9">
            <p>Bandeiras aceitas:</p>
            <p>
              <a href="" title="MasterCard" class="bandeira">
                <img src="../../assets/img/payments/bandeiras/mastercard.png" alt="MasterCard">
              </a>
              <a href="" title="Visa" class="bandeira">
                <img src="../../assets/img/payments/bandeiras/visa.png" alt="Visa">
              </a>
              <a href="" title="American Express" class="bandeira">
                <img src="../../assets/img/payments/bandeiras/amex.png" alt="American Express">
              </a>
              <a href="" title="Diners Club" class="bandeira">
                <img src="../../assets/img/payments/bandeiras/diners-club.png" alt="Diners Club">
              </a>
              <a href="" title="Elo" class="bandeira">
                <img src="../../assets/img/payments/bandeiras/elo.png" alt="Elo">
              </a>
              <a href="" title="Boleto" class="bandeira">
                <img src="../../assets/img/payments/bandeiras/boleto.png" alt="Boleto">
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>

    <section id="copyright">
      <div class="container">
        <div class="row">
          <div class="col-xs-6 col-xs-offset-3">
            <hr>
            <p class="text-center">
                República Online é uma empresa do <a href="http://inove.online" target="_blank" title="Grupo Inove.online">Grupo Inove.online</a><br>
                CLASSIFICADOS E ANÚNCIOS ESTUDANTIS ONLINE LTDA<br>
                CNPJ: 23.458.507/0001-46
            </p>
          </div>
        </div>
      </div>
    </section>
  </footer>
</template>

<script>
export default {
  name: 'app-footer'
}
</script>

<style scoped>
footer {
  background-color: #f4f7f9;
  padding: 30px 0 0px;
}
h4 {
  font-weight: 800;
  font-size: 18px;
}
ul {
  margin-bottom: 30px;
}
ul > li  {
  margin-bottom: 10px;
}
ul > li > a {
  color: #091e42;
}

#payment {
  padding: 20px 0;
  background-color: #fff;
}
#payment .bandeira {
  margin-right: 20px;
}

#copyright {
  background-color: #fff;
  font-size: 12px;
  color: #757575;
}
#copyright hr {
  margin-top: 0;
}
#copyright a {
  color: #757575;
  font-weight: 600;
}
</style>
