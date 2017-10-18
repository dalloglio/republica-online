<template>
  <div class="anuncio-details">
    <div class="panel">
      <div class="panel-heading">
        <h4 class="panel-title">
          <span class="price">
            <currency :price="ad.price"></currency>
          </span>
        </h4>
      </div>
      <div class="panel-body">
        <p class="detail"><i class="icon icon-map-marker"></i>{{ `${address.city} - ${address.state_initials}` }}</p>
        <p v-for="(detail, i) in details" class="detail" :key="i">
          <i :class="`icon ${detail.filter_icon}`"></i> {{ detail ? detail.value : '-' }}
        </p>
        <favorite-button :ad="ad" class="btn btn-lg btn-block btn-warning"></favorite-button>
      </div>
    </div>
  </div>
</template>

<script>
  import Currency from '@/components/Shared/Currency'
  import FavoriteButton from '@/components/Shared/FavoriteButton'
  export default {
    name: 'anuncio-details',
    components: {
      Currency,
      FavoriteButton
    },
    props: {
      ad: {
        type: Object,
        required: true
      }
    },
    computed: {
      address () {
        return this.ad.address || []
      },
      details () {
        return this.ad.details || []
      }
    }
  }
</script>

<style scoped>
  .panel {
    background-color: #f4f7f9;
    border-color: #f4f7f9;
    margin-bottom: 30px;
  }
  .panel-heading {
    background-color: #57d9a3;
    padding: 18px 15px;
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
  }
  .panel-title {
    font-weight: 800;
    font-size: 30px;
    color: #091e42;
  }
  .panel-body {
    padding: 15px 10px 20px;
  }
  p.detail {
    margin-bottom: 5px;
  }
  .icon {
      vertical-align: bottom;
  }
</style>
