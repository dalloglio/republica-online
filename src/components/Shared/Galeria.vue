<template>
  <div class="galeria">
    <div class="row" id="galeria">
      <div class="col-xs-3 galeria-thumbs">
        <slick ref="thumbs" :options="thumbs" class="thumbs">
          <img src="http://lorempixel.com/189/120/nature/1/" alt="Image 1" width="189" height="120">
          <img src="http://lorempixel.com/189/120/nature/2/" alt="Image 2" width="189" height="120">
          <img src="http://lorempixel.com/189/120/nature/3/" alt="Image 3" width="189" height="120">
          <img src="http://lorempixel.com/189/120/nature/4/" alt="Image 4" width="189" height="120">
          <img src="http://lorempixel.com/189/120/nature/5/" alt="Image 5" width="189" height="120">
          <img src="http://lorempixel.com/189/120/nature/6/" alt="Image 6" width="189" height="120">
          <img src="http://lorempixel.com/189/120/nature/7/" alt="Image 7" width="189" height="120">
          <img src="http://lorempixel.com/189/120/nature/8/" alt="Image 8" width="189" height="120">
        </slick>
      </div>
      <div class="col-xs-9 galeria-images">
        <slick ref="images" :options="images" class="images">
          <img src="http://lorempixel.com/628/420/nature/1/" alt="Image 1" width="629" height="420">
          <img src="http://lorempixel.com/628/420/nature/2/" alt="Image 2" width="629" height="420">
          <img src="http://lorempixel.com/628/420/nature/3/" alt="Image 3" width="629" height="420">
          <img src="http://lorempixel.com/628/420/nature/4/" alt="Image 4" width="629" height="420">
          <img src="http://lorempixel.com/628/420/nature/5/" alt="Image 5" width="629" height="420">
          <img src="http://lorempixel.com/628/420/nature/6/" alt="Image 6" width="629" height="420">
          <img src="http://lorempixel.com/628/420/nature/7/" alt="Image 7" width="629" height="420">
          <img src="http://lorempixel.com/628/420/nature/8/" alt="Image 8" width="629" height="420">
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
