  <template>
    <div class="page faq">
        <section class="container">
            <div class="row">
                <div class="col-xs-10 col-xs-offset-1">
                    <div class="content">
                        <h2>Central de Ajuda</h2>
                        <p>O republica.online funciona a partir de uma ideia simples: que você possa encontrar ou divulgar uma república  de um jeito fácil e rápido.</p>

                        <div class="line"></div>

                        <div class="panel-group" id="accordion">

                          <div v-for="(question, index) in questions" class="panel panel-default" :key="index">
                            <div class="panel-heading">
                              <h4 class="panel-title">
                                <a :class="{
                                  'collapsed': index === 0 ? false : true
                                }"
                                data-toggle="collapse"
                                data-parent="#accordion"
                                :href="'#collapse-' + question.id">
                                  {{ question.title }}
                                </a>
                              </h4>
                            </div>

                            <div :class="{
                              'panel-collapse': true,
                              'collapse': true,
                              'in': index === 0 ? true : false
                            }"
                            :id="'collapse-' + question.id">
                              <div class="panel-body">
                                <p>
                                  {{ question.description }}
                                </p>
                              </div>
                            </div>
                          </div>

                        </div>
                    </div>
                </div>
             </div>
        </section>
    </div>
</template>

<script>
export default {
  name: 'faq',
  data () {
    return {
      questions: require('./faq.json')
    }
  }
}
</script>

<style lang="css" scoped>
.page {
  padding: 60px 0;
}
.page .content  h2 {
  font-size: 30px;
  font-weight: 800;
  margin: 20px auto;
}
.page .content  h4 {
  font-size: 16px;
  font-weight: 800;
  margin: 20px auto;
  text-transform: uppercase;
}
.page .content p {
  line-height: 30px;
}

.page .content .panel {
  margin-bottom: 15px;
  box-shadow: none;
}
</style>
