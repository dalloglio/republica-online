<template>
  <div class="page ad-create">
    <section class="container">
      <div class="row">
        <div class="col-xs-12">

          <h2>Vamos cadastrar sua vaga!</h2>
          <p>Preencha, preferencialmente, todos os campos e o mais detalhado possível, anúncios bem estruturados normalmente tem 70% a mais de visualizações!!!</p>

          <div class="line"></div>

          <form autocomplete="off" class="row" @submit.prevent="onSubmit">
            <fieldset :disabled="loading">
              <div class="col-xs-3">
                <label class="ad_category_id" for="ad_category_id">Escolha a categoria do seu anúncio:</label>
              </div>
              <div class="form-group col-xs-4">
                <select
                v-model.trim="ad.category_id"
                id="ad_category_id"
                name="categoria"
                class="form-control input-lg"
                data-vv-as="categoria"
                data-vv-rules="required"
                v-validate
                required
                autofocus>
                  <option value="">Selecione</option>
                  <option v-for="(category, category_index) in categories" :value="category.id">{{ category.title }}</option>
                </select>
                <span v-if="errors.has('categoria')" class="help-block">* {{ errors.first('categoria') }}</span>
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
                v-validate
                required>
                <span v-if="errors.has('title')" class="help-block">* {{ errors.first('title') }}</span>
              </div>

              <div class="form-group col-xs-2">
                <label for="ad_price" class="sr-only">Valor:</label>
                <input
                v-model.trim="ad.price"
                id="ad_price"
                name="price"
                type="text"
                class="form-control input-lg"
                maxlength="15"
                placeholder="Valor"
                data-vv-as="valor"
                data-vv-rules="required"
                v-validate
                required
                v-mask="'money'">
                <span v-if="errors.has('price')" class="help-block">* {{ errors.first('price') }}</span>
              </div>

              <div class="form-group col-xs-12">
                <label for="ad_description" class="sr-only">Descrição</label>
                <textarea
                v-model.trim="ad.description"
                id="ad_description"
                name="description"
                class="form-control input-lg"
                maxlength="255"
                placeholder="Descrição"
                data-vv-as="descrição"
                data-vv-rules="required|max:255"
                v-validate
                required
                rows="6"></textarea>
                <span v-if="errors.has('description')" class="help-block">* {{ errors.first('description') }}</span>
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
                <span v-if="errors.has('cep')" class="help-block">* {{ errors.first('cep') }}</span>
              </div>

              <div class="form-group col-xs-3">
                <label for="ad_address_state" class="sr-only">Estado:</label>
                <input
                v-model.trim="ad.address.state"
                id="ad_address_state"
                name="state"
                type="text"
                class="form-control input-lg"
                maxlength="50"
                placeholder="Estado"
                data-vv-as="estado"
                data-vv-rules="required|max:50"
                v-validate
                required>
                <span v-if="errors.has('state')" class="help-block">* {{ errors.first('state') }}</span>
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
                required>
                <span v-if="errors.has('city')" class="help-block">* {{ errors.first('city') }}</span>
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
                required>
                <span v-if="errors.has('neighborhood')" class="help-block">* {{ errors.first('neighborhood') }}</span>
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
                required>
                <span v-if="errors.has('street')" class="help-block">* {{ errors.first('street') }}</span>
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
                required
                ref="number"
                @blur="searchAddress()">
                <span v-if="errors.has('number')" class="help-block">* {{ errors.first('number') }}</span>
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
                v-validate>
                <span v-if="errors.has('sub_address')" class="help-block">* {{ errors.first('sub_address') }}</span>
              </div>

              <div class="col-xs-8">
                <mapa ref="mapaRef"></mapa>
              </div>

              <div class="col-xs-4">
                <h4>No mapa:</h4>
                <div class="radio">
                  <input v-model="ad.address.show_on_map" type="radio" id="ad_address_show_on_map_0" :value="0" @change="searchAddress()">
                  <label for="ad_address_show_on_map_0">Não mostrar</label>
                </div>
                <div class="radio">
                  <input v-model="ad.address.show_on_map" type="radio" id="ad_address_show_on_map_1" :value="1" @change="searchAddress()">
                  <label for="ad_address_show_on_map_1">Mostrar a localização aproximada</label>
                </div>
                <div class="radio">
                  <input v-model="ad.address.show_on_map" type="radio" id="ad_address_show_on_map_2" :value="2" @change="searchAddress()">
                  <label for="ad_address_show_on_map_2">Mostrar a localização exata</label>
                </div>
              </div>

              <div class="clearfix"></div>

              <div v-if="filters.length" class="col-xs-12">
                <h3>Filtros:</h3>
              </div>

              <div v-for="(filter, filter_index) in filters" class="form-group col-xs-3" :key="filter.id">
                <label :for="'ad_details_' + filter.id" class="sr-only">{{ filter.title }}</label>
                <select
                v-model.trim="ad.details[filter.id]"
                :id="'ad_details_' + filter.id"
                :name="filter.slug"
                class="form-control input-lg"
                :data-vv-as="filter.title"
                data-vv-rules="required"
                v-validate
                >
                  <option value="">{{ filter.title }}</option>
                  <option v-for="(input, input_index) in filter.inputs" :value="input.key">{{ input.value }}</option>
                </select>
                <span v-if="errors.has(filter.slug)" class="help-block">* {{ errors.first(filter.slug) }}</span>
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
                v-validate
                required>
                <span v-if="errors.has('contact_name')" class="help-block">* {{ errors.first('contact_name') }}</span>
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
                <span v-if="errors.has('contact_cellphone')" class="help-block">* {{ errors.first('contact_cellphone') }}</span>
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
                <span v-if="errors.has('contact_whatsapp')" class="help-block">* {{ errors.first('contact_whatsapp') }}</span>
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
import AppUpload from '@/components/Shared/Upload.vue'
export default {
  name: 'ad-create',
  directives: {
    'mask': AwesomeMask
  },
  components: {
    Mapa,
    AppUpload
  },
  data () {
    return {
      loading: false,
      ad: {
        category_id: '',
        title: '',
        price: '',
        description: '',
        address: {
          zip_code: '',
          state: '',
          city: '',
          neighborhood: '',
          street: '',
          number: '',
          sub_address: '',
          show_on_map: 0
        },
        details: [],
        photos: [],
        contact: {
          name: '',
          cellphone: '',
          whatsapp: ''
        }
      }
    }
  },
  computed: {
    category () {
      if (!this.ad.category_id) {
        return {}
      }
      return this.categories.find(category => category.id === this.ad.category_id)
    },
    categories () {
      return this.$store.state.category.categories
    },
    filters () {
      let filters = this.category.filters || []
      // this.ad.details[]
      return filters
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
    onSubmit () {
      this.loading = true
      // Usuário deve estar logado para poder criar o anúncio
      setTimeout(() => {
        this.loading = false
        alert('O anúncio foi criado com sucesso.')
        this.$router.push({ name: 'compartilhar-anuncio' })
      }, 2000)
      // this.$store.dispatch('createAd', this.form).then((response) => {
      //   if (response.ok) {
      //     this.ad.id = response.body.id
      //     let files = this.$refs.uploadRef.files
      //   } else {
      //     this.loading = false
      //   }
      // }, (error) => {
      //   this.loading = false
      //   console.log(error)
      //   this.$message({
      //     showClose: true,
      //     message: 'Oops, não foi possível salvar! Por favor, preencha todos os campos e tente novamente.',
      //     type: 'error'
      //   })
      // })
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
      let zoom = 5
      let self = this
      self.$refs.mapaRef.removeMarker()
      self.$refs.mapaRef.removeCircle()
      if (self.ad.address.show_on_map === 0) {
        zoom = 4
        self.$refs.mapaRef.setAddress('Brasil')
      } else if (self.ad.address.show_on_map === 1) {
        zoom = 5
        self.$refs.mapaRef.setAddress(self.formattedAddress)
        self.$refs.mapaRef.addCircle()
      } else if (self.ad.address.show_on_map === 2) {
        zoom = 16
        self.$refs.mapaRef.setAddress(self.formattedAddress)
        self.$refs.mapaRef.addMarker()
      }
      self.$refs.mapaRef.geocodeAddress()
      self.$refs.mapaRef.setZoom(zoom)
    }
  },
  created () {
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
select#ad_category_id {
  margin-left: -30px;
}

.radio {
  margin-top: 20px;
  margin-bottom: 20px;
}
.radio label {
  font-weight: normal;
}
</style>
