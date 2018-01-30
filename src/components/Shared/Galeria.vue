<template>
  <div v-if="photos.length" class="row" id="galeria">
    <div class="thumbs col-xs-3">
      <div class="cycle-slideshow"
      data-cycle-slides="> div"
      data-cycle-fx="carousel"
      data-cycle-timeout="0"
      data-cycle-carousel-visible="4"
      data-cycle-carousel-vertical="true"
      data-cycle-auto-height="false">
        <div class="image" v-for="item in items" :key="item.id">
          <img :src="item.url" :alt="item.name">
        </div>
      </div>
    </div>

    <div class="images col-xs-9">
      <div class="cycle-slideshow"
      data-cycle-slides="> div"
      data-cycle-fx="scrollHorz"
      data-cycle-timeout="0"
      data-cycle-center-horz="true"
      data-cycle-center-vert="true"
      data-cycle-prev=".prev"
      data-cycle-next=".next">
        <div class="image" v-for="item in items" :key="item.id">
          <img :src="item.url" :alt="item.name">
        </div>
      </div>

      <div class="controls">
        <span class="prev"></span>
        <span class="next"></span>
      </div>
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

        // $('.thumbs .cycle-slide').click(function () {
        //     let index = $('#cycle-2').data('cycle.API').getSlideIndex(this);
        //     slideshow.cycle('goto', index);
        // });

        let thumbs = $('#galeria').find('.thumbs > .cycle-slideshow')
        let images = $('#galeria').find('.images > .cycle-slideshow')

        images.on('cycle-next cycle-prev', function (event, options) {
          thumbs.cycle('goto', options.currSlide)
        })
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
  .thumbs,
  .images {
    position: relative;
    overflow: hidden;
    height: 420px;
  }
  #galeria .thumbs .cycle-slideshow .image,
  #galeria .images .cycle-slideshow .image {
    width: 100%;
    position: relative;
    overflow: hidden;
    border-radius: 8px;
  }
  #galeria .thumbs .cycle-slideshow .image {
    position: relative !important;
    width: 189px;
    height: 120px;
    margin-bottom: 10px;
  }
  #galeria .images .cycle-slideshow .image {
    width: 100%;
    height: 420px;
  }
  #galeria .cycle-slideshow .image img {
    position: absolute;
    left: 50%;
    width: auto;
    -moz-transform: translateX(-50%);
    -webkit-transform: translateX(-50%);
    -o-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
  }
  #galeria .thumbs .cycle-slideshow .image img {
    height: 120px;
  }
  #galeria .images .cycle-slideshow .image img {
    height: 420px;
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
