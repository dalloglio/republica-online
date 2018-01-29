<template>
  <div v-if="photos.length" class="row" id="galeria">
    <div class="galeria-thumbs col-xs-3">
      <img v-for="item in items" :src="item.url" :alt="item.name" :key="item.id" class="img-responsive">
    </div>

    <div class="galeria-images col-xs-9">
      <img v-for="item in items" :src="item.url" :alt="item.name" :key="item.id" class="img-responsive">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'galeria',
    props: {
      photos: {
        type: Array,
        required: true
      }
    },
    components: {},
    data () {
      return {
        items: [
          { id: 1, url: 'http://localhost:8080/static/banners/1.jpg', name: 'Image 1' },
          { id: 2, url: 'http://localhost:8080/static/banners/2.jpg', name: 'Image 2' },
          { id: 3, url: 'http://localhost:8080/static/banners/3.jpg', name: 'Image 3' },
          { id: 4, url: 'http://localhost:8080/static/banners/4.jpg', name: 'Image 4' },
          { id: 5, url: 'http://localhost:8080/static/banners/5.jpg', name: 'Image 5' },
          { id: 6, url: 'http://localhost:8080/static/banners/6.jpg', name: 'Image 6' }
        ]
      }
    },

    methods: {
      urlPhoto (photo) {
        return this.$store.getters.urlPhoto(photo.id)
      }
    },

    mounted () {
      window.jQuery(document).ready(function ($) {
        require('@/assets/vendor/jquery.cycle2/jquery.cycle2.js')
        require('@/assets/vendor/jquery.cycle2/jquery.cycle2.carousel.js')
        require('@/assets/vendor/jquery.cycle2/jquery.cycle2.center.js')

        let thumbs = $('#galeria').find('.galeria-thumbs')
        let images = $('#galeria').find('.galeria-images')

        thumbs.cycle({
          'fx': 'carousel',
          'carousel-vertical': true,
          'carousel-visible': 4,
          'timeout': 1000
        })

        images.cycle({
          'center-horz': true,
          'center-vert': true,
          'timeout': 1000
        })
        images.on('cycle-prev', function (event, options) {})
        images.on('cycle-next', function (event, options) {})
      })
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
  #galeria .galeria-thumbs img,
  #galeria .thumbs img {
    width: 189px;
    height: 120px;
    outline: none;
    margin-bottom: 10px;
  }
  #galeria .galeria-images img,
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
