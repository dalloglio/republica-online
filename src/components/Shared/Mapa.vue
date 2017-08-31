<template>
    <div class="mapa" id="map">
      <gmap-map :center="center" :zoom="zoom" style="width: 100%; height: 250px;">
        <gmap-marker :position="marker.position" :clickable="true" :draggable="true"></gmap-marker>
      </gmap-map>
    </div>
</template>

<script>
export default {
  name: 'Mapa',
  data () {
    return {
      zoom: 10,
      center: {
        lat: -27.0012367,
        lng: -48.6460931
      },
      marker: {
        position: {
          lat: -27.0012367,
          lng: -48.6460931
        }
      }
    }
  }
}
</script>

<style scoped>
.mapa {
  width: 100%;
  height: 280px;
  border-radius: 6px;
  overflow: hidden;
}
</style>
