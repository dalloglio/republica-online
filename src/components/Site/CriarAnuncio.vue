<template>
  <div class="page ad-create">
    <section class="container">
      <div class="row">
        <div class="col-xs-12">

          <h2>Vamos cadastrar sua vaga!</h2>
          <p>Preencha, preferencialmente, todos os campos e o mais detalhado possível, anúncios bem estruturados normalmente tem 70% a mais de visualizações!!!</p>

          <div class="line"></div>

          <form autocomplete="off" class="row" @submit.prevent="onSubmit">
            <fieldset>
              <div class="col-xs-3">
                <label class="ad_category_id" for="ad_category_id">Escolha a categoria do seu anúncio:</label>
              </div>
              <div class="form-group col-xs-4">
                <select v-model.trim="ad.category_id" id="ad_category_id" class="form-control input-lg" required autofocus>
                  <option value="">Selecione</option>
                  <option v-for="(category, category_index) in categories" :value="category.id">{{ category.title }}</option>
                </select>
              </div>

              <div class="clearfix"></div>

              <div class="form-group col-xs-10">
                <label for="ad_title" class="sr-only">Título:</label>
                <input v-model.trim="ad.title" id="ad_title" type="text" class="form-control input-lg" maxlength="100" placeholder="Título" required>
              </div>
              <div class="form-group col-xs-2">
                <label for="ad_price" class="sr-only">Valor:</label>
                <input v-model.trim="ad.price" id="ad_price" type="text" class="form-control input-lg" maxlength="15" placeholder="Valor" required>
              </div>
              <div class="form-group col-xs-12">
                <label for="ad_description" class="sr-only">Descrição</label>
                <textarea v-model.trim="ad.description" id="ad_description" class="form-control input-lg" maxlength="255" placeholder="Descrição" required rows="6"></textarea>
              </div>

              <div class="clearfix"></div>

              <div class="col-xs-12">
                <h3>Localização:</h3>
              </div>
              <div class="form-group col-xs-3">
                <label for="ad_address_zip_code" class="sr-only">Cep:</label>
                <input v-model.trim="ad.address.zip_code" id="ad_address_zip_code" type="text" class="form-control input-lg" maxlength="9" placeholder="Cep" required>
              </div>
              <div class="form-group col-xs-3">
                <label for="ad_address_state" class="sr-only">Estado:</label>
                <input v-model.trim="ad.address.state" id="ad_address_state" type="text" class="form-control input-lg" maxlength="50" placeholder="Estado" required>
              </div>
              <div class="form-group col-xs-3">
                <label for="ad_address_city" class="sr-only">Cidade:</label>
                <input v-model.trim="ad.address.city" id="ad_address_city" type="text" class="form-control input-lg" maxlength="50" placeholder="Cidade" required>
              </div>
              <div class="form-group col-xs-3">
                <label for="ad_address_neighborhood" class="sr-only">Bairro:</label>
                <input v-model.trim="ad.address.neighborhood" id="ad_address_neighborhood" type="text" class="form-control input-lg" maxlength="50" placeholder="Bairro" required>
              </div>
              <div class="form-group col-xs-6">
                <label for="ad_address_street" class="sr-only">Rua:</label>
                <input v-model.trim="ad.address.street" id="ad_address_street" type="text" class="form-control input-lg" maxlength="100" placeholder="Rua" required>
              </div>
              <div class="form-group col-xs-2">
                <label for="ad_address_number" class="sr-only">Número:</label>
                <input v-model.trim="ad.address.number" id="ad_address_number" type="text" class="form-control input-lg" maxlength="50" placeholder="Número" required>
              </div>
              <div class="form-group col-xs-4">
                <label for="ad_address_sub_address" class="sr-only">Complemento:</label>
                <input v-model.trim="ad.address.sub_address" id="ad_address_sub_address" type="text" class="form-control input-lg" maxlength="100" placeholder="Complemento">
              </div>

              <div class="col-xs-8">
                <mapa></mapa>
              </div>
              <div class="col-xs-4">
                <h4>No mapa:</h4>
                <div class="radio">
                  <input v-model="ad.address.show_on_map" type="radio" id="ad_address_show_on_map_0" :value="0">
                  <label for="ad_address_show_on_map_0">Não mostrar</label>
                </div>
                <div class="radio">
                  <input v-model="ad.address.show_on_map" type="radio" id="ad_address_show_on_map_1" :value="1">
                  <label for="ad_address_show_on_map_1">Mostrar a localização aproximada</label>
                </div>
                <div class="radio">
                  <input v-model="ad.address.show_on_map" type="radio" id="ad_address_show_on_map_2" :value="2">
                  <label for="ad_address_show_on_map_2">Mostrar a localização exata</label>
                </div>
              </div>

              <div class="clearfix"></div>

              <div class="col-xs-12">
                <h3>Filtros:</h3>
              </div>

              <div v-for="(filter, filter_index) in filters" class="form-group col-xs-3" :key="filter_index">
                <label :for="'ad_details_' + filter.id" class="sr-only">{{ filter.title }}</label>
                <select v-model.trim="ad.details[filter.id]" :id="'ad_details_' + filter.id" class="form-control input-lg">
                  <option value="">{{ filter.title }}</option>
                  <option v-for="(input, input_index) in filter.inputs" :value="input.key">{{ input.value }}</option>
                </select>
              </div>

              <div class="clearfix"></div>

              <div class="col-xs-12">
                <h3>Selecione algumas fotos:</h3>
                <p>Adicione até 8 imagens e selecione a que prefira como capa (clicando na estrelinha no canto superior direito). Aceitamos os formatos: JPG, GIF e PNG.</p>
              </div>

              <div class="clearfix"></div>

              <div class="uploader clearfix">
                <div v-if="photos.length < 8" class="col-xs-3">
                  <label for="photos" class="clickable">
                    <input type="file" id="photos" accept="image/*" multiple>
                  </label>
                </div>
                <div v-for="(photo, photo_index) in photos" class="col-xs-3">
                  <div class="preview">
                    <p :class="{ favorite: isPhotoFavorite(photo) }">
                      Foto Principal
                      <span :class="{
                        'glyphicon': true,
                        'glyphicon-star': isPhotoFavorite(photo) || false,
                        'glyphicon-star-empty': !isPhotoFavorite(photo) || false
                      }"
                      @click="favoritePhoto(photo)"></span>
                    </p>
                    <div class="image">
                      <img :src="photo.url" :alt="photo.name">
                      <a title="Remover"><span class="glyphicon glyphicon-trash" @click="removePhoto(photo)"></span></a>
                    </div>
                  </div>
                </div>
              </div>

              <div class="clearfix"></div>

              <div class="col-xs-12">
                <h3>Contatos:</h3>
              </div>
              <div class="form-group col-xs-3">
                <label for="ad_contact_name" class="sr-only">Nome:</label>
                <input v-model.trim="ad.contact.name" id="ad_contact_name" type="text" class="form-control input-lg" maxlength="100" placeholder="Nome" required>
              </div>
              <div class="form-group col-xs-3">
                <label for="ad_contact_cellphone" class="sr-only">Celular:</label>
                <input v-model.trim="ad.contact.cellphone" id="ad_contact_cellphone" type="text" class="form-control input-lg" maxlength="15" placeholder="Celular">
              </div>
              <div class="form-group col-xs-3">
                <label for="ad_contact_whatsapp" class="sr-only">Whatsapp:</label>
                <input v-model.trim="ad.contact.whatsapp" id="ad_contact_whatsapp" type="text" class="form-control input-lg" maxlength="15" placeholder="Whatsapp">
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
import Mapa from '@/components/Shared/Mapa'
export default {
  name: 'ad-create',
  components: {
    Mapa
  },
  data () {
    return {
      photoFavoriteId: null,
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
    categories () {
      return [{
        id: 1,
        title: 'Categoria A'
      }, {
        id: 2,
        title: 'Categoria B'
      }]
    },
    filters () {
      let filters = [{
        id: 1,
        title: 'Filtro 1',
        inputs: [
          { id: 1, key: 'option-a', value: 'Opção A' },
          { id: 2, key: 'option-b', value: 'Opção B' },
          { id: 3, key: 'option-c', value: 'Opção C' }
        ]
      }, {
        id: 2,
        title: 'Filtro 2',
        inputs: [
          { id: 1, key: 'option-a', value: 'Opção A' },
          { id: 2, key: 'option-b', value: 'Opção B' },
          { id: 3, key: 'option-c', value: 'Opção C' }
        ]
      }, {
        id: 3,
        title: 'Filtro 3',
        inputs: [
          { id: 1, key: 'option-a', value: 'Opção A' },
          { id: 2, key: 'option-b', value: 'Opção B' },
          { id: 3, key: 'option-c', value: 'Opção C' }
        ]
      }, {
        id: 4,
        title: 'Filtro 4',
        inputs: [
          { id: 1, key: 'option-a', value: 'Opção A' },
          { id: 2, key: 'option-b', value: 'Opção B' },
          { id: 3, key: 'option-c', value: 'Opção C' }
        ]
      }]

      filters.forEach((filter, index) => {
        this.ad.details[filter.id] = ''
      })

      return filters
    },
    photos () {
      this.photoFavoriteId = 1
      return [
        { id: 1, url: 'http://lorempixel.com/1280/720/nature/1/', name: 'Nature 1', favorite: true },
        { id: 2, url: 'http://lorempixel.com/1280/720/nature/2/', name: 'Nature 2', favorite: false },
        { id: 3, url: 'http://lorempixel.com/1280/720/nature/3/', name: 'Nature 3', favorite: false },
        { id: 4, url: 'http://lorempixel.com/1280/720/nature/4/', name: 'Nature 4', favorite: false },
        { id: 5, url: 'http://lorempixel.com/1280/720/nature/5/', name: 'Nature 5', favorite: false },
        { id: 6, url: 'http://lorempixel.com/1280/720/nature/6/', name: 'Nature 6', favorite: false },
        { id: 7, url: 'http://lorempixel.com/1280/720/nature/7/', name: 'Nature 7', favorite: false }
      ]
    }
  },
  methods: {
    onSubmit () {
    },
    isPhotoFavorite (photo) {
      return this.photoFavoriteId === photo.id || false
    },
    favoritePhoto (photo) {
      if (this.photoFavoriteId === photo.id) {
        return
      }
      this.photoFavoriteId = photo.id
    },
    removePhoto (photo) {

    }
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
  height: 170px;
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
  height: 212px;
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
