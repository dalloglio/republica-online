<template>
  <div v-if="ad.id && categories.length" class="dashboard-meus-anuncios-show">
    <h2><span>Meus Anúncios</span>. Vamos editar sua vaga!</h2>
    <p>Preencha, preferencialmente, todos os campos e o mais detalhado possível, anúncios bem estruturados normalmente tem 70% a mais de visualizações!!!</p>
    <div class="line"></div>

    <form autocomplete="off" class="row" @submit.prevent="onSubmit" novalidate>
      <fieldset :disabled="loading" class="page">
        <div class="col-xs-4 text-right">
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

        <div class="col-xs-1 text-right">
          <label class="ad_status" for="ad_status">Status:</label>
        </div>
        <div class="form-group col-xs-3">
          <select
          v-model.trim="ad.status"
          id="ad_status"
          name="status"
          class="form-control input-lg"
          data-vv-as="status"
          data-vv-rules="required"
          v-validate>
            <option value="">Selecione</option>
            <option v-for="item in status" :value="item.status">{{ item.title }}</option>
          </select>
          <app-tooltip v-if="errors.has('status')" :title="errors.first('status')" class="question"></app-tooltip>
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
          @blur="pesquisarCep()"
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
          @app-upload-favorite="onUploadFavorite"
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
          <p>Ao salvar o anúncio você concorda e aceita os <router-link :to="{ name: 'termos-de-uso' }" target="_blank" title="Termos de Uso">Termos de Uso</router-link> e a <router-link :to="{ name: 'politicas-de-privacidade' }" target="_blank" title="Política de Privacidade">Política de Privacidade</router-link> da República Online.</p>
        </div>

        <div class="clearfix"></div>
        <br><br>

        <div class="col-xs-3 col-xs-offset-9">
          <button type="submit" class="btn btn-lg btn-success btn-block">Salvar agora!</button>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script>
  import AwesomeMask from 'awesome-mask'
  import Mapa from '@/components/Shared/Mapa'
  import AppTooltip from '@/components/Shared/Tooltip.vue'
  import AppUpload from '@/components/Shared/Upload.vue'
  export default {
    name: 'ad-update',
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
        model: {
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
            whatsapp: ''
          }
        },
        category: {},
        filters: [],
        status: [
          { key: 1, status: true, title: 'Publicado' },
          { key: 2, status: false, title: 'Pausado' }
        ],
        money: {
          decimal: ',',
          thousands: '.',
          prefix: '',
          suffix: '',
          precision: 2,
          masked: false
        }
      }
    },
    computed: {
      ad () {
        return this.$store.state.ad.ad || this.model
      },
      categories () {
        return this.$store.state.category.categories || []
      },
      photos () {
        let photos = this.ad.photos || []
        let data = photos.map((photo) => {
          photo.url = this.urlPhoto(photo)
          return photo
        })
        return data
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
      urlPhoto (photo) {
        return this.$store.getters.urlPhoto(photo.id)
      },
      openLoading () {
        this.loading = true
        this.$store.dispatch('setSpinnerDescription', 'Estamos salvando o seu anúncio...')
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
        this.$store.dispatch('updateAd', {
          id: this.$route.params.id,
          data: this.ad
        }).then((response) => {
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

        let filesToSave = files.filter((file) => {
          return file instanceof File || false
        })

        if (filesToSave.length > 0) {
          this.openLoadingPhotos()
          filesToSave.forEach((file, index) => {
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
                if (total === filesToSave.length) {
                  this.closeLoadingPhotos()
                  setTimeout(() => {
                    self.$router.push({ name: 'dashboard.meus-anuncios' })
                  }, 300)
                }
              }
            }, (error) => {
              console.log(error)
              this.$message.info('O arquivo ' + file.name + ' não foi enviado.')
              total++
              if (total === filesToSave.length) {
                this.closeLoadingPhotos()
                setTimeout(() => {
                  self.$router.push({ name: 'dashboard.meus-anuncios' })
                }, 300)
              }
            })
          })
        } else {
          this.closeLoadingPhotos()
          self.$router.push({ name: 'dashboard.meus-anuncios' })
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
        if (file.id) {
          this.$store.dispatch('deletePhoto', file.id).then((response) => {
            this.$message.success('A foto foi excluída com sucesso.')
          }, (error) => {
            console.log(error)
            this.$message.error('Não foi possível excluir a foto.')
          })
        }
      },
      onUploadFavorite (file) {
        if (file.id) {
          this.$store.dispatch('favoriteAdPhoto', {
            ad_id: this.$route.params.id,
            id: file.id
          })
        }
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
        this.category = {}
        this.filters = []
        this.ad.details = []

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
      this.$store.dispatch('getCategories').then(() => {
        this.$store.dispatch('getAdUser', this.$route.params.id).then((response) => {
          let ad = response.body || {}
          if (ad) {
            if (ad.details) {
              ad.details = ad.details.map((detail) => {
                return detail.input_id
              })
            }

            if (ad.category) {
              this.category = ad.category || {}
              this.filters = this.category.filters || []
              this.filters.forEach((filter, index) => {
                if (!ad.details[index]) {
                  ad.details[index] = ''
                }
              })
            }
          }

          let interval = setInterval(() => {
            if (this.$refs.mapaRef) {
              clearInterval(interval)
              this.searchAddress()
            }
          }, 500)
        })
      })
    },
    beforeDestroy () {
      this.$store.commit('setAd', {})
    }
  }
</script>

<style scoped>
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

  .page label {
    color: #0052cc;
    font-weight: 600;
  }
  .page label.ad_category_id,
  .page label.ad_status {
    margin: 11px auto;
  }

  .page .radio {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .page .radio label {
    font-weight: normal;
  }

  .uploader {
    position: relative;
    margin: 20px auto;
  }
  .uploader .clickable,
  .uploader .preview {
    position: relative;
    margin-bottom: 30px;
    border-radius: 6px;
  }
  .uploader .preview p {
    position: relative;
    font-weight: 800;
    text-transform: uppercase;
    text-align: center;
    margin: 0 auto;
    padding: 10px;
    border: 1px solid #0052cc;
    background-color: #fff;
    color: #0052cc;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }
  .uploader .preview p.favorite {
    background-color: #0052cc;
    color: #fff;
  }
  .uploader .preview p span {
    position: absolute;
    top: 50%;
    right: 10px;
    margin-top: -10px;
    font-size: 18px;
    line-height: 20px;
  }
  .uploader .preview p span:hover {
    cursor: pointer;
  }
  .uploader .preview .image {
    position: relative;
    width: 100%;
    height: 130px;
    background-color: #0052cc;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }
  .uploader .preview .image img {
    display: block;
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }
  .uploader .preview .image a {
    display: block;
    position: absolute;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 16px;
    color: #fff;
    background-color: #0052cc;
    border-radius: 50%;
    bottom: -15px;
    right: -15px;
    z-index: 1;
  }
  .uploader .clickable {
    position: relative;
    width: 100%;
    height: 172px;
    min-width: 100px;
    min-height:  100px;
    margin: 0;
    padding: 0;
    border: 1px solid #0052cc;
    background-color: #fff;
    background-image: url('../../assets/img/icon-camera.png');
    background-position: 50% 50%;
    background-repeat: no-repeat;
    -webkit-transition: all .3s ease;
    -moz-transition: all .3s ease;
    -ms-transition: all .3s ease;
    -o-transition: all .3s ease;
    transition: all .3s ease;
  }
  .uploader .clickable:hover {
    border-style: dashed;
    cursor: pointer;
    opacity: .7
  }
  .uploader .clickable input {
    display: none;
  }
</style>
