<template>
  <div class="dashboard">
    <div class="container">
      <div class="row">
        <div class="col-xs-3">
          <dashboard-menu></dashboard-menu>
        </div>

        <div class="col-xs-9">
          <router-view></router-view>
        </div>
      </div>
    </div>

    <div v-if="bannersLargeRectangle" class="container banners">
      <div class="row">
        <div v-for="bannerLargeRectangle in bannersLargeRectangle" :key="bannerLargeRectangle.id" class="col-xs-4">
          <banner-retangulo-grande :banner="bannerLargeRectangle"></banner-retangulo-grande>
        </div>
      </div>
    </div>

    <newsletter></newsletter>
  </div>
</template>

<script>
import BannerRetanguloGrande from '@/components/Shared/BannerRetanguloGrande'
import DashboardMenu from '@/components/Dashboard/Shared/DashboardMenu'
import Newsletter from '@/components/Shared/Newsletter'
export default {
  name: 'dashboard',

  components: {
    BannerRetanguloGrande,
    DashboardMenu,
    Newsletter
  },

  computed: {
    bannersLargeRectangle () {
      return this.$store.state.banner.bannersLargeRectangle
    }
  },

  created () {
    this.$store.dispatch('getBannersLargeRectangle')
  }
}
</script>

<style>
.dashboard {
  padding: 160px 0 0;
}
.dashboard h2 {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 30px;
  color: #091e42;
  font-weight: 800;
}
.dashboard h2 span {
  color: #0052cc;
}
.banners {
  padding-left: 50px;
  padding-right: 50px;
}
</style>
