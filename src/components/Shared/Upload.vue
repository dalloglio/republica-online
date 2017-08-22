<template>
  <div class="uploader clearfix">
    <div v-if="photos.length < 8" class="col-xs-3">
      <label for="photos" class="clickable">
        <input ref="uploadRef" @change="onUpload" type="file" id="photos" accept="image/*" multiple>
      </label>
    </div>

    <div v-for="(photo, photo_index) in photos" class="col-xs-3">
      <div class="preview">
        <p :class="{ favorite: isFavorite(photo) }">
          Foto Principal
          <span :class="{
            'glyphicon': true,
            'glyphicon-star': isFavorite(photo) || false,
            'glyphicon-star-empty': !isFavorite(photo) || false
          }"
          @click="favorite(photo)"></span>
        </p>
        <div class="image">
          <img :src="photo.url" :alt="photo.name">
          <a title="Remover"><span class="glyphicon glyphicon-trash" @click="onRemove(photo)"></span></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app-upload',
  data () {
    return {
      fileList: []
    }
  },
  computed: {
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
    onUpload (event) {
      let files = event.target.files
      for (let i in files) {
        // let url = URL.createObjectURL(files[i])
        console.log(files[i])
        // files[i].url = url
      }
      this.fileList = files.slice(-3)
      this.$refs.uploadRef.value = ''
    },
    onRemove (photo) {

    },
    isFavorite (photo) {
      return this.photoFavoriteId === photo.id || false
    },
    favorite (photo) {
      if (this.photoFavoriteId === photo.id) {
        return
      }
      this.photoFavoriteId = photo.id
    }
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
