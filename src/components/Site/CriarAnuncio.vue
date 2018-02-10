<template>
  <div class="page ad-create">
    <section class="container">
      <div class="row">
        <div class="col-xs-12">

          <h2>Vamos cadastrar sua vaga!</h2>
          <p>Preencha, preferencialmente, todos os campos e o mais detalhado possível, anúncios bem estruturados normalmente tem 70% a mais de visualizações!!!</p>

          <div class="line"></div>

          <form autocomplete="off" class="row" @submit.prevent="onSubmit" novalidate>
            <fieldset :disabled="loading">
              <div class="col-xs-3 text-right">
                <label class="ad_category_id" for="ad_category_id">Escolha a categoria do seu anúncio:</label>
              </div>
              <div class="form-group col-xs-4">
                <select
                @change="getCategory()"
                v-model.trim="ad.category_id"
                id="ad_category_id"
                name="categoria"
                class="form-control input-lg"
                data-vv-as="categoria"
                data-vv-rules="required"
                v-validate>
                  <option value="">Selecione</option>
                  <option v-for="(category, category_index) in categories" :value="category.id">{{ category.title }}</option>
                </select>
                <app-tooltip v-if="errors.has('categoria')" :title="errors.first('categoria')" class="question"></app-tooltip>
              </div>

              <div class="clearfix"></div>

              <div class="form-group col-xs-10">
                <label for="ad_title" class="sr-only">Título:</label>
                <input
                v-model.trim="ad.title"
                id="ad_title"
                name="title"
                type="text"
                class="form-control input-lg"
                minlength="3"
                maxlength="100"
                placeholder="Título"
                data-vv-as="título"
                data-vv-rules="required"
                v-validate>
                <app-tooltip v-if="errors.has('title')" :title="errors.first('title')" class="question"></app-tooltip>
              </div>

              <div class="form-group col-xs-2">
                <label for="ad_price" class="sr-only">Valor:</label>
                <money
                v-model="ad.price"
                v-bind="money"
                id="ad_price"
                name="price"
                class="form-control input-lg"
                maxlength="13"
                placeholder="Valor"
                data-vv-as="valor"
                data-vv-rules="required"
                v-validate></money>
                <app-tooltip v-if="errors.has('price')" :title="errors.first('price')" class="question"></app-tooltip>
              </div>

              <div class="form-group col-xs-12">
                <label for="ad_description" class="sr-only">Descrição</label>
                <textarea
                v-model.trim="ad.description"
                id="ad_description"
                name="description"
                class="form-control input-lg"
                maxlength="500"
                placeholder="Descrição"
                data-vv-as="descrição"
                data-vv-rules="required|max:500"
                v-validate
                rows="6"></textarea>
                <app-tooltip v-if="errors.has('description')" :title="errors.first('description')" class="question"></app-tooltip>
              </div>

              <div class="clearfix"></div>

              <div class="col-xs-12">
                <h3>Localização:</h3>
              </div>
              <div class="form-group col-xs-3">
                <label for="ad_address_zip_code" class="sr-only">Cep:</label>
                <input
                v-model.trim="ad.address.zip_code"
                id="ad_address_zip_code"
                name="cep"
                type="text"
                class="form-control input-lg"
                maxlength="9"
                placeholder="Cep"
                @blur="pesquisarCep"
                data-vv-as="cep"
                data-vv-rules="required|cep"
                v-validate
                v-mask="'99999-999'">
                <app-tooltip v-if="errors.has('cep')" :title="errors.first('cep')" class="question"></app-tooltip>
              </div>

              <div class="form-group col-xs-3">
                <label for="ad_address_state_initials" class="sr-only">Estado:</label>
                <input
                v-model.trim="ad.address.state_initials"
                id="ad_address_state_initials"
                name="state_initials"
                type="text"
                class="form-control input-lg"
                maxlength="2"
                placeholder="Estado"
                data-vv-as="estado"
                data-vv-rules="required|max:2"
                v-validate
                @blur="searchAddress()">
                  <app-tooltip v-if="errors.has('state_initials')" :title="errors.first('state_initials')" class="question"></app-tooltip>
              </div>

              <div class="form-group col-xs-3">
                <label for="ad_address_city" class="sr-only">Cidade:</label>
                <input
                v-model.trim="ad.address.city"
                id="ad_address_city"
                name="city"
                type="text"
                class="form-control input-lg"
                maxlength="50"
                placeholder="Cidade"
                data-vv-as="cidade"
                data-vv-rules="required|max:50"
                v-validate
                @blur="searchAddress()">
                <app-tooltip v-if="errors.has('city')" :title="errors.first('city')" class="question"></app-tooltip>
              </div>

              <div class="form-group col-xs-3">
                <label for="ad_address_neighborhood" class="sr-only">Bairro:</label>
                <input
                v-model.trim="ad.address.neighborhood"
                id="ad_address_neighborhood"
                name="neighborhood"
                type="text"
                class="form-control input-lg"
                maxlength="50"
                placeholder="Bairro"
                data-vv-as="bairro"
                data-vv-rules="required|max:50"
                v-validate
                @blur="searchAddress()">
                <app-tooltip v-if="errors.has('neighborhood')" :title="errors.first('neighborhood')" class="question"></app-tooltip>
              </div>

              <div class="form-group col-xs-6">
                <label for="ad_address_street" class="sr-only">Rua:</label>
                <input
                v-model.trim="ad.address.street"
                id="ad_address_street"
                name="street"
                type="text"
                class="form-control input-lg"
                maxlength="100"
                placeholder="Rua"
                data-vv-as="rua"
                data-vv-rules="required|max:100"
                v-validate
                @blur="searchAddress()">
                <app-tooltip v-if="errors.has('street')" :title="errors.first('street')" class="question"></app-tooltip>
              </div>

              <div class="form-group col-xs-2">
                <label for="ad_address_number" class="sr-only">Número:</label>
                <input
                v-model.trim="ad.address.number"
                id="ad_address_number"
                name="number"
                type="text"
                class="form-control input-lg"
                maxlength="50"
                placeholder="Número"
                data-vv-as="número"
                data-vv-rules="required|max:50"
                v-validate
                ref="number"
                @blur="searchAddress()">
                <app-tooltip v-if="errors.has('number')" :title="errors.first('number')" class="question"></app-tooltip>
              </div>

              <div class="form-group col-xs-4">
                <label for="ad_address_sub_address" class="sr-only">Complemento:</label>
                <input
                v-model.trim="ad.address.sub_address"
                id="ad_address_sub_address"
                name="sub_address"
                type="text"
                class="form-control input-lg"
                maxlength="100"
                placeholder="Complemento"
                data-vv-as="complemento"
                data-vv-rules="max:100"
                v-validate
                @blur="searchAddress()">
                <app-tooltip v-if="errors.has('sub_address')" :title="errors.first('sub_address')" class="question"></app-tooltip>
              </div>

              <div class="col-xs-8">
                <mapa ref="mapaRef"></mapa>
              </div>

              <div class="col-xs-4">
                <h4>No mapa:</h4>
                <div class="radio">
                  <input v-model="ad.address.show_on_map" type="radio" id="ad_address_show_on_map_default" value="default" @change="searchAddress()">
                  <label for="ad_address_show_on_map_default">Não mostrar</label>
                </div>
                <div class="radio">
                  <input v-model="ad.address.show_on_map" type="radio" id="ad_address_show_on_map_approximate" value="approximate" @change="searchAddress()">
                  <label for="ad_address_show_on_map_approximate">Mostrar a localização aproximada</label>
                </div>
                <div class="radio">
                  <input v-model="ad.address.show_on_map" type="radio" id="ad_address_show_on_map_exact" value="exact" @change="searchAddress()">
                  <label for="ad_address_show_on_map_exact">Mostrar a localização exata</label>
                </div>
              </div>

              <div class="clearfix"></div>

              <div v-if="filters.length" class="col-xs-12">
                <h3>Filtros:</h3>
              </div>

              <div v-for="(filter, filter_index) in filters" class="form-group col-xs-3" :key="filter.id">
                <label :for="'ad_details_' + filter.id" class="sr-only">{{ filter.title }}</label>
                <select
                v-model.trim="ad.details[filter_index]"
                :id="'ad_details_' + filter.id"
                :name="filter.slug"
                class="form-control input-lg">
                  <option value="">{{ filter.description }}</option>
                  <option v-for="input in filter.inputs" :key="input.id" :value="input.id">{{ input.value }}</option>
                </select>
              </div>

              <div class="clearfix"></div>

              <div class="col-xs-12">
                <h3>Selecione algumas fotos:</h3>
                <p>Adicione até 8 imagens e selecione a que prefira como capa (clicando na estrelinha no canto superior direito). Aceitamos os formatos: JPG, GIF e PNG.</p>
              </div>

              <div class="clearfix"></div>

              <div class="col-xs-12">
                <app-upload
                ref="uploadRef"
                :max-files="8"
                :data-files="photos"
                @app-upload-remove="onUploadRemove"></app-upload>
              </div>

              <div class="clearfix"></div>

              <div class="col-xs-12">
                <h3>Contatos:</h3>
              </div>
              <div class="form-group col-xs-3">
                <label for="ad_contact_name" class="sr-only">Nome:</label>
                <input
                v-model.trim="ad.contact.name"
                id="ad_contact_name"
                name="contact_name"
                type="text"
                class="form-control input-lg"
                maxlength="100"
                placeholder="Nome"
                data-vv-as="nome"
                data-vv-rules="required|max:100"
                v-validate>
                <app-tooltip v-if="errors.has('contact_name')" :title="errors.first('contact_name')" class="question"></app-tooltip>
              </div>

              <div class="form-group col-xs-3">
                <label for="ad_contact_cellphone" class="sr-only">Celular:</label>
                <input
                v-model.trim="ad.contact.cellphone"
                id="ad_contact_cellphone"
                name="contact_cellphone"
                type="text"
                class="form-control input-lg"
                maxlength="15"
                placeholder="Celular"
                data-vv-as="celular"
                data-vv-rules="required|celular"
                v-validate
                v-mask="'(99) 99999-9999'">
                <app-tooltip v-if="errors.has('contact_cellphone')" :title="errors.first('contact_cellphone')" class="question"></app-tooltip>
              </div>

              <div class="form-group col-xs-3">
                <label for="ad_contact_whatsapp" class="sr-only">Whatsapp:</label>
                <input
                v-model.trim="ad.contact.whatsapp"
                id="ad_contact_whatsapp"
                name="contact_whatsapp"
                type="text"
                class="form-control input-lg"
                maxlength="15"
                placeholder="Whatsapp"
                data-vv-as="whatsapp"
                data-vv-rules="required|celular"
                v-validate
                v-mask="'(99) 99999-9999'">
                <app-tooltip v-if="errors.has('contact_whatsapp')" :title="errors.first('contact_whatsapp')" class="question"></app-tooltip>
              </div>

              <div class="clearfix"></div>

              <div class="col-xs-12">
                <p>Ao publicar um anúncio você concorda e aceita os <router-link :to="{ name: 'termos-de-uso' }" target="_blank" title="Termos de Uso">Termos de Uso</router-link> e a <router-link :to="{ name: 'politicas-de-privacidade' }" target="_blank" title="Política de Privacidade">Política de Privacidade</router-link> da República Online.</p>
              </div>

              <div class="clearfix"></div>
              <br><br>

              <div class="col-xs-3 col-xs-offset-9">
                <button type="submit" class="btn btn-lg btn-success btn-block">Publicar agora!</button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import AwesomeMask from 'awesome-mask'
  import Mapa from '@/components/Shared/Mapa'
  import AppTooltip from '@/components/Shared/Tooltip.vue'
  import AppUpload from '@/components/Shared/Upload.vue'
  export default {
    name: 'ad-create',
    directives: {
      'mask': AwesomeMask
    },
    components: {
      Mapa,
      AppTooltip,
      AppUpload
    },
    data () {
      return {
        loading: false,
        ad: {
          status: true,
          category_id: '',
          title: '',
          price: '',
          description: '',
          address: {
            zip_code: '',
            state_initial: '',
            state: '',
            city: '',
            state_id: '',
            city_id: '',
            neighborhood: '',
            street: '',
            number: '',
            sub_address: '',
            show_on_map: 'default'
          },
          details: [],
          photos: [],
          contact: {
            name: '',
            cellphone: '',
            whatsapp: '',
            origin: 'page_create_ad'
          }
        },
        category: {},
        filters: [],
        money: {
          decimal: ',',
          thousands: '.',
          prefix: '',
          suffix: '',
          precision: 2,
          masked: false
        },
        url: this.$http.options.url
      }
    },
    head: {
      title () {
        return this.seo.title()
      },
      meta () {
        return this.seo.meta()
      },
      link () {
        return this.seo.link()
      }
    },
    computed: {
      page () {
        return {
          title: 'Anuncie sua vaga',
          description: 'Vamos anunciar para quem realmente quer comprar! Anuncie em nosso portal! Conheça todos os planos e fale diretamente com o seu mercado consumidor!',
          keywords: 'republica online,aluguel estudante,alugar apartamento',
          url: this.url + this.$route.fullPath,
          image: `${this.url}/static/republica-online.png`,
          robots: 'index,follow',
          googlebot: 'index,follow'
        }
      },
      categories () {
        return this.$store.state.category.categories
      },
      photos () {
        return this.ad.photos
      },
      formattedAddress () {
        let i = 0
        let address = []
        if (this.ad.address.zip_code) { address[i++] = `Cep: ${this.ad.address.zip_code}` }
        if (this.ad.address.street) { address[i++] = `${this.ad.address.street}` }
        if (this.ad.address.number) { address[i++] = `${this.ad.address.number}` }
        if (this.ad.address.neighborhood) { address[i++] = `${this.ad.address.neighborhood}` }
        if (this.ad.address.state) { address[i++] = `${this.ad.address.state}` }
        if (this.ad.address.city) { address[i++] = `${this.ad.address.city}` }
        address[i++] = 'Brasil'
        return address.join(', ')
      }
    },
    methods: {
      openLoading () {
        this.loading = true
        this.$store.dispatch('setSpinnerDescription', 'Estamos cadastrando o seu anúncio...')
        this.spinner.open()
      },
      closeLoading () {
        this.loading = false
        this.spinner.close()
      },
      openLoadingPhotos () {
        this.loading = true
        this.$store.dispatch('setSpinnerDescription', 'Estamos salvando as fotos do anúncio...')
        this.spinner.open()
      },
      closeLoadingPhotos () {
        this.loading = false
        this.spinner.close()
      },
      onSubmit () {
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.save()
          } else {
            this.$message.info('Preencha corretamente o formulário.')
          }
        })
      },
      save () {
        this.openLoading()
        this.$store.dispatch('createAd', this.ad).then((response) => {
          if (response.ok) {
            this.closeLoading()
            setTimeout(() => {
              this.saveFiles(response)
            }, 500)
          } else {
            this.closeLoading()
            this.$message.error('Oops, não foi possível salvar! Por favor, preencha todos os campos e tente novamente.')
          }
        }, (error) => {
          this.closeLoading()
          if (error.status === 422) {
            this.showErrors(error.data)
          } else {
            this.$message.error(error.statusText)
            console.log(error)
          }
        })
      },
      saveFiles (response) {
        let ad = response.body
        let self = this
        let total = 0
        let files = self.$refs.uploadRef.files
        if (files.length > 0) {
          this.openLoadingPhotos()
          files.forEach((file, index) => {
            let formData = new FormData()
            formData.append('favorite', file.favorite ? 1 : 0)
            formData.append('photo', file, file.name)
            let params = {
              id: ad.id,
              data: formData
            }
            self.$store.dispatch('createAdPhoto', params).then((response) => {
              if (response.ok) {
                total++
                if (total === files.length) {
                  this.closeLoadingPhotos()
                  setTimeout(() => {
                    self.$router.push({ name: 'compartilhar-anuncio', params: { id: ad.id, slug: ad.slug } })
                  }, 300)
                }
              }
            }, (error) => {
              console.log(error)
              this.$message.info('O arquivo ' + file.name + ' não foi enviado.')
              total++
              if (total === files.length) {
                this.closeLoadingPhotos()
                setTimeout(() => {
                  self.$router.push({ name: 'compartilhar-anuncio', params: { id: ad.id, slug: ad.slug } })
                }, 300)
              }
            })
          })
        } else {
          this.closeLoadingPhotos()
          self.$router.push({ name: 'compartilhar-anuncio', params: { slug: ad.slug } })
        }
      },
      showErrors (errors) {
        Object.values(errors).map((error) => {
          error.map((erro) => {
            this.$message.error(erro)
          })
        })
      },
      onUploadRemove (file) {
        console.log(file)
      },
      pesquisarCep () {
        if (this.ad.address.zip_code !== '') {
          this.loading = true
          this.cep.pesquisar(this.ad.address.zip_code, this.ad.address).then((response) => {
            this.loading = false
            this.searchAddress()
          }, (error) => {
            this.loading = false
            console.log(error)
          })
        }
      },
      searchAddress () {
        let self = this
        let ref = self.$refs.mapaRef

        ref.removeMarker()
        ref.removeCircle()
        ref.setAddress(self.formattedAddress)
        ref.searchAddress().then((status) => {
          if (self.ad.address.show_on_map === 'default') {
            ref.setAddress('Brasil')
            ref.setZoom(4)
          } else if (self.ad.address.show_on_map === 'approximate') {
            ref.addCircle()
          } else if (self.ad.address.show_on_map === 'exact') {
            ref.addMarker()
          }
        }, (error) => console.log(error))
      },
      getCategory () {
        let id = this.ad.category_id
        if (id) {
          let category = this.categories.find((category) => Number(category.id) === Number(id))
          if (category) {
            this.category = category || {}
            this.filters = this.category.filters || []
            this.resetDetails(this.filters)
          }
        }
      },
      resetDetails (filters) {
        filters.forEach((filter, index) => {
          this.ad.details[index] = ''
        })
      }
    },
    created () {
      this.seo.init(this.page)
      this.$store.dispatch('getCategories')
    }
  }
</script>

<style lang="css" scoped>
  .page {
    padding: 60px 0;
  }
  .page .line {
    margin-bottom: 60px;
  }
  .page h2 {
    font-size: 30px;
    font-weight: 800;
    margin: 20px auto;
  }
  .page h3 {
    font-size: 30px;
    font-weight: 800;
    margin: 20px auto;
  }
  .page h4 {
    font-size: 30px;
    font-weight: 800;
    margin: 0px auto 20px;
  }
  .page .btn {
    font-weight: 800;
  }

  label {
    color: #0052cc;
    font-weight: 600;
  }
  label.ad_category_id {
    margin: 11px auto;
  }

  .radio {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .radio label {
    font-weight: normal;
  }
</style>
