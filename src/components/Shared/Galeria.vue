<template>
  <div v-if="items.length" class="row" id="galeria">
    <div v-if="items.length > 1" class="thumbs col-xs-3">
      <div class="cycle-slideshow"
      data-cycle-slides="> div"
      data-cycle-fx="carousel"
      data-cycle-timeout="0"
      :data-cycle-carousel-visible="items.length < 4 ? items.length : 4"
      data-cycle-carousel-vertical="true"
      data-cycle-auto-height="false"
      data-cycle-log="false">
        <div class="image" v-for="(item, index) in items" :key="item.id" :data-index="index">
          <img :src="urlPhoto(item)" :alt="item.title">
        </div>
      </div>
    </div>

    <div v-if="items.length > 0" :class="items.length === 1 ? 'images col-xs-12' : 'images col-xs-9'">
      <div class="cycle-slideshow"
      data-cycle-slides="> div"
      data-cycle-fx="fade"
      data-cycle-timeout="0"
      data-cycle-center-horz="true"
      data-cycle-center-vert="true"
      data-cycle-prev=".prev"
      data-cycle-next=".next"
      data-cycle-log="false">
        <div class="image" v-for="(item, index) in items" :key="item.id" :data-index="index">
          <img :src="urlPhoto(item)" :alt="item.title">
        </div>
      </div>

      <div v-if="items.length > 1" class="controls">
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
    computed: {
      items () {
        let photos = this.photos || []
        let index = photos.findIndex((photo) => photo.favorite === true)
        if (index !== -1) {
          let favorite = photos.splice(index, 1)
          photos.unshift(favorite[0])
        }
        return photos
      }
    },
    methods: {
      urlPhoto (photo) {
        return this.$store.getters.urlPhoto(photo.id)
      }
    },
    mounted () {
      let self = this
      window.jQuery(document).ready(function ($) {
        require('@/assets/vendor/jquery.cycle2/jquery.cycle2.js')
        require('@/assets/vendor/jquery.cycle2/jquery.cycle2.carousel.js')
        require('@/assets/vendor/jquery.cycle2/jquery.cycle2.center.js')

        let thumbs = $('#galeria').find('.thumbs > .cycle-slideshow')
        let images = $('#galeria').find('.images > .cycle-slideshow')

        images.on('cycle-next cycle-prev', function (event, options) {
          if (self.items.length > 3) {
            thumbs.cycle('goto', options.currSlide)
          }
        })

        thumbs.on('click', '.image', function () {
          let index = $(this).data('index')
          thumbs.cycle('goto', index)
          images.cycle('goto', index)
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
  #galeria .images.col-xs-12,
  #galeria .images.col-xs-12 .cycle-slideshow .image,
  #galeria .images.col-xs-12 .cycle-slideshow .image img {
    height: 500px;
  }
  .prev,
  .next {
    position: absolute;
    top: 50%;
    margin-top: -30px;
    width: 60px;
    height: 60px;
    color: #fff;
    display: none;
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

  #galeria .images:hover .prev,
  #galeria .images:hover .next {
    display: block;
  }
  #galeria .thumbs .cycle-slideshow .image img:hover {
    cursor: pointer;
  }
</style>
