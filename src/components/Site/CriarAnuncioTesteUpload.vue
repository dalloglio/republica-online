<template>
  <div class="page ad-create">
    <section class="container">
      <div class="row">
        <div class="col-xs-12">
          <form autocomplete="off" class="row" @submit.prevent="onSubmit">
            <h3>Selecione algumas fotos:</h3>
            <p>Adicione até 8 imagens e selecione a que prefira como capa (clicando na estrelinha no canto superior direito). Aceitamos os formatos: JPG, GIF e PNG.</p>
            <app-upload ref="uploadRef" :max-files="4" :data-files="photos" @app-upload-remove="onUploadRemove"></app-upload>
            <button type="submit" class="btn btn-lg btn-success btn-block">Publicar agora!</button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import AppUpload from '@/components/Shared/Upload.vue'
export default {
  name: 'ad-create',
  components: {
    AppUpload
  },
  computed: {
    photos () {
      return []
    }
  },
  methods: {
    onSubmit () {
      let files = this.$refs.uploadRef.files
      console.log(files)
    },
    onUploadRemove (file) {
      console.log(file)
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
</style>
