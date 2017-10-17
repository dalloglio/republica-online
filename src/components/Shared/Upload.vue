<template>
  <div class="uploader clearfix">
    <div class="row">
      <div v-if="!maxFilesReached" class="col-xs-3">
        <input
        ref="inputFileRef"
        type="file"
        id="photos"
        name="photos"
        accept="image/*"
        multiple
        data-vv-as="imagens"
        data-vv-rules="image|size:5000"
        v-validate.reject
        @change="onUpload"
        :disabled="maxFilesReached">
        <label for="photos" class="clickable"></label>
      </div>

      <div v-for="(file, index) in files" class="col-xs-3">
        <div class="preview">
          <p :class="{ favorite: file.favorite }">
            Foto Principal
            <span :class="{
              'glyphicon': true,
              'glyphicon-star': file.favorite,
              'glyphicon-star-empty': !file.favorite
            }"
            @click="onFavorite(file)"></span>
          </p>
          <div class="image">
            <img :src="file.url" :alt="file.name">
            <a title="Remover"><span class="glyphicon glyphicon-trash" @click="onRemove(file, index)"></span></a>
          </div>
        </div>
      </div>
    </div>

    <div v-if="errors.has('photos')" class="row">
      <div class="col-xs-12">
        <span class="help-block">{{ errors.first('photos') }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app-upload',
  props: {
    maxFiles: {
      type: Number,
      default: 8
    },
    dataFiles: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      fileList: this.dataFiles
    }
  },
  computed: {
    files () {
      let files = this.fileList.slice(0, this.maxFiles)
      return files
    },
    maxFilesReached () {
      return this.fileList.length >= this.maxFiles || false
    }
  },
  methods: {
    onUpload (event) {
      let self = this
      this.$validator.validateAll().then((result) => {
        if (!this.errors.has('photos')) {
          let files = event.target.files
          let fileList = self.fileList
          for (let i in files) {
            let file = files[i]
            if (file instanceof File) {
              file.url = URL.createObjectURL(file)
              file.favorite = false
              fileList.push(file)
            }
          }
          if (fileList.length > self.maxFiles) {
            alert(`Apenas ${self.maxFiles} arquivos são permitidos.`)
          }
          self.fileList = fileList.slice(0, self.maxFiles)
          self.$refs.inputFileRef.value = ''
        }
      })
    },
    onRemove (file, index) {
      this.fileList.splice(index, 1)
      this.$emit('app-upload-remove', file)
    },
    onFavorite (file) {
      let files = []
      for (let i in this.fileList) {
        this.fileList[i].favorite = false
        files.push(this.fileList[i])
      }
      let index = files.indexOf(file)
      files[index].favorite = true
      this.fileList = files
      this.$emit('app-upload-favorite', file)
    }
  },
  created () {
    const dict = {
      pt_BR: {
        custom: {
          photos: {
            size: 'Ops! Só é permitido enviar arquivos de até 5MB.',
            image: 'Ops! Só é permitido enviar arquivos do tipo imagem (JPG, GIF e PNG).'
          }
        }
      }
    }
    this.$validator.updateDictionary(dict)
  }
}
</script>

<style scoped>
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
  z-index: 2;
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
.uploader input {
  display: none;
}
</style>
