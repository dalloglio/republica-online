<template>
  <footer>
    <div class="container">
      <div class="row">
        <div class="col-xs-3">
          <h4 class="text-uppercase">Institucional</h4>
          <ul class="list-unstyled">
            <li><router-link :to="{ name: 'home' }" title='Sobre nós'>Sobre nós</router-link></li>
            <li><router-link :to="{ name: 'home' }" title='Parceiros'>Parceiros</router-link></li>
            <li><router-link :to="{ name: 'home' }" title='Termos de Uso'>Termos de Uso</router-link></li>
            <li><router-link :to="{ name: 'home' }" title='Políticas de Privacidade'>Políticas de Privacidade</router-link></li>
          </ul>
        </div>

        <div class="col-xs-3">
          <h4 class="text-uppercase">Fale Conosco</h4>
          <ul class="list-unstyled">
            <li><router-link :to="{ name: 'home' }" title='Contato'>Contato</router-link></li>
            <li><router-link :to="{ name: 'home' }" title='Trabalhe Conosco'>Trabalhe Conosco</router-link></li>
            <li><router-link :to="{ name: 'home' }" title='Central de Ajuda'>Central de Ajuda</router-link></li>
            <li><router-link :to="{ name: 'home' }" title='Anuncie com a gente!'>Anuncie com a gente!</router-link></li>
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
              <a href="" title="Cielo">
                <img src="http://via.placeholder.com/120x60?text=Cielo" alt="Cielo">
              </a>
              <a href="" title="Iugu">
                <img src="http://via.placeholder.com/120x60?text=Iugu" alt="Iugu">
              </a>
            </p>
          </div>

          <div class="col-xs-9">
            <p>Bandeiras aceitas:</p>
            <p>
              <a href="" title="MasterCard">
                <img src="http://via.placeholder.com/90x50?text=MasterCard" alt="MasterCard">
              </a>
              <a href="" title="Visa">
                <img src="http://via.placeholder.com/90x50?text=Visa" alt="Visa">
              </a>
              <a href="" title="American Express">
                <img src="http://via.placeholder.com/90x50?text=American Express" alt="American Express">
              </a>
              <a href="" title="Diners Club">
                <img src="http://via.placeholder.com/90x50?text=Diners Club" alt="Diners Club">
              </a>
              <a href="" title="Elo">
                <img src="http://via.placeholder.com/90x50?text=Elo" alt="Elo">
              </a>
              <a href="" title="Boleto">
                <img src="http://via.placeholder.com/90x50?text=Boleto" alt="Boleto">
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
            <p class="text-center text-muted">
              <small>
                República Online é uma empresa do <a href="http://inove.online" target="_blank" title="Grupo Inove.online">Grupo Inove.online</a><br>
                CLASSIFICADOS E ANÚNCIOS ESTUDANTIS ONLINE LTDA<br>
                CNPJ: 23.458.507/0001-46
              </small>
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
  background-color: rgba(0,0,0,.1);
  padding: 20px 0 0;
}
h4 {
  font-weight: bold;
}
ul {
  margin-bottom: 20px;
}
ul > li  {
  margin-bottom: 10px;
}

#payment {
  padding: 20px 0;
  background-color: #fff;
}

#copyright {
  background-color: #fff;
}
#copyright hr {
  margin-top: 0;
}
#copyright a {
  color: inherit;
  font-weight: bold;
}
</style>
