<template>
  <div class="thumbnail">
    <router-link :to="{ name: 'anuncio', params: { id: ad.id, slug: ad.slug } }" :title="ad.title">
      <div class="image">
        <img v-if="urlPhoto" :src="urlPhoto" :alt="ad.title">
        <img v-else src="http://via.placeholder.com/263x175&text=+" :alt="ad.title">
      </div>
      <span class="label label-success price">
        <currency :price="ad.price"></currency>
      </span>
    </router-link>
    <div class="caption">
      <h3>
        {{ ad.title }}
        <small>{{ address.city }} - {{ address.state_initials }}</small>
      </h3>

      <detail-icon v-for="detail in details" :key="detail.id" :model="detail" class="detail"></detail-icon>

      <p class="text-right">
        <router-link :to="{ name: 'anuncio', params: { id: ad.id, slug: ad.slug } }" class="btn btn-link" title="veja mais detalhes">
          veja mais detalhes <span class="glyphicon glyphicon-menu-right"></span>
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
import Currency from '@/components/Shared/Currency'
import DetailIcon from '@/components/Shared/DetailIcon'
export default {
  name: 'anuncio',
  components: {
    Currency,
    DetailIcon
  },
  props: {
    model: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      ad: this.model
    }
  },
  computed: {
    address () {
      return this.ad.address || {}
    },
    details () {
      return this.ad.details.slice(0, 3)
    },
    photo () {
      return this.ad.photo || {}
    },
    urlPhoto () {
      return this.$store.getters.urlPhoto(this.photo.id)
    }
  },
  beforeDestroy () {
    this.ad = {}
  }
}
</script>

<style scoped>
.thumbnail {
  border: 0 none;
  border-radius: 0;
  padding: 0;
  margin: 15px 0;
}
.thumbnail a {
  display: block;
  position: relative;
}
.thumbnail > a {
  min-height: 175px;
}
.thumbnail a .price {
  position: absolute;
  top: 15px;
  right: -15px;
  padding: 6px 18px;
  font-size: 18px;
  font-weight: 800;
  color: #091e42;
}
.thumbnail a .image {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #f1f1f1;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  overflow: hidden;
}
.thumbnail a img {
  position: relative;
  left: 50%;
  -moz-transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
  -o-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
  transform: translateX(-50%);
  max-width: none;
  width: auto;
  height: 100%;
}
.thumbnail .caption h3 {
  font-size: 18px;
  font-weight: 800;
  margin-top: 10px;
  width: auto;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.thumbnail .caption h3 small {
  display: block;
  font-size: 14px;
  line-height: 20px;
  color: #091e42;
}
.btn-link {
  margin-top: 15px;
  display: inline-block!important;
}
.btn-link span {
  margin-left: 20px;
}
</style>
