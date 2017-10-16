<template>
  <div v-if="photos.length" class="galeria">
    <div class="row" id="galeria">
      <div class="col-xs-3 galeria-thumbs">
        <slick ref="thumbs" :options="thumbs" class="thumbs">
          <img v-for="photo in photos" :key="photo.id" :src="urlPhoto(photo)" :alt="photo.name" width="189" height="120">
        </slick>
      </div>
      <div class="col-xs-9 galeria-images">
        <slick ref="images" :options="images" class="images">
          <img v-for="photo in photos" :key="photo.id" :src="urlPhoto(photo)" :alt="photo.name" width="629" height="420">
        </slick>
        <span@click="prev()" class="prev"></span>
        <span@click="next()" class="next"></span>
      </div>
    </div>
  </div>
</template>

<script>
  import Slick from 'vue-slick'
  import 'slick-carousel/slick/slick.css'
  export default {
    name: 'galeria',
    props: {
      photos: {
        type: Array,
        required: true
      }
    },
    components: {
      Slick
    },
    data () {
      return {
        images: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: false,
          fade: true,
          asNavFor: '.thumbs'
        },
        thumbs: {
          slidesToShow: 4,
          slidesToScroll: 1,
          asNavFor: '.images',
          vertical: true,
          verticalSwiping: true,
          arrows: false,
          dots: false,
          useTransform: false,
          adaptiveHeight: true,
          infinite: true,
          focusOnSelect: true
        }
      }
    },

    methods: {
      urlPhoto (photo) {
        return this.$store.getters.urlPhoto(photo.id)
      },
      next () {
        this.$refs.images.next()
      },
      prev () {
        this.$refs.images.prev()
      }
    }
  }
</script>

<style scoped>
  #galeria {
    z-index: 1;
    position: relative;
  }
  #galeria,
  .galeria-thumbs,
  .galeria-images {
    position: relative;
    overflow: hidden;
    height: 420px;
  }
  #galeria img {
    border-radius: 8px;
  }
  #galeria .thumbs img {
    width: 189px;
    height: 120px;
    outline: none;
    margin-bottom: 10px;
  }
  #galeria .images img {
    width: 628px;
    height: 420px;
    outline: none;
  }
  .prev,
  .next {
    position: absolute;
    top: 50%;
    margin-top: -30px;
    width: 60px;
    height: 60px;
    color: #fff;
    display: block;
    z-index: 1100;
    cursor: pointer;
    -webkit-transition: all .3s linear;
    -moz-transition: all .3s linear;
    -ms-transition: all .3s linear;
    -o-transition: all .3s linear;
    transition: all .3s linear;
  }
  .prev {
    left: 20px;
    background: transparent url('../../assets/img/prev.png') no-repeat 0 0;
  }
  .next {
    right: 20px;
    background: transparent url('../../assets/img/next.png') no-repeat 0 0;
  }
</style>
