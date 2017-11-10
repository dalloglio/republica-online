<template>
  <div class="mapa" id="map"></div>
</template>

<script>
/* global google */
export default {
  name: 'mapa',
  props: {
    dataTitle: {
      type: String,
      default: 'Brasil'
    },
    dataAddress: {
      type: String,
      default: 'Brasil'
    },
    dataLatitude: {
      type: Number,
      default: 0
    },
    dataLongitude: {
      type: Number,
      default: 0
    },
    dataZoom: {
      type: Number,
      default: 5
    },
    dataTimeout: {
      type: Number,
      default: 300
    }
  },
  data () {
    return {
      map: null,
      marker: null,
      geocoder: null,
      circle: null,
      title: this.dataTitle,
      address: this.dataAddress,
      latitude: this.dataLatitude,
      longitude: this.dataLongitude,
      zoom: this.dataZoom,
      timeout: this.dataTimeout
    }
  },
  computed: {
    center () {
      return {
        lat: this.latitude,
        lng: this.longitude
      }
    }
  },
  methods: {
    initMap () {
      let el = document.getElementById('map')
      if (!el) {
        return
      }
      this.map = new google.maps.Map(el, {
        center: this.center,
        zoom: this.zoom
      })
      this.geocodeAddress()
    },
    addMarker () {
      let self = this
      self.removeMarker()
      setTimeout(() => {
        self.marker = new google.maps.Marker({
          position: self.center,
          map: self.map,
          title: self.title
        })
      }, self.timeout)
    },
    removeMarker () {
      if (this.marker) {
        this.marker.setMap(null)
      }
    },
    centerMap () {
      this.map.setCenter(this.center)
    },
    addCircle () {
      let self = this
      self.removeCircle()
      setTimeout(() => {
        self.circle = new google.maps.Circle({
          strokeColor: '#0052cc',
          strokeOpacity: 0.7,
          strokeWeight: 2,
          fillColor: '#0052cc',
          fillOpacity: 0.3,
          radius: 3000,
          map: self.map,
          center: self.center
        })
      }, self.timeout)
    },
    removeCircle () {
      if (this.circle) {
        this.circle.setMap(null)
      }
    },
    setAddress (address) {
      this.address = address
      this.title = address
    },
    setZoom (zoom) {
      this.map.setZoom(zoom)
    },
    geocodeAddress () {
      let self = this
      if (!self.geocoder) {
        self.geocoder = new google.maps.Geocoder()
      }
      self.geocoder.geocode({ 'address': self.address }, function (results, status) {
        if (status === 'OK') {
          let result = results[0]
          self.title = result.formatted_address
          self.latitude = result.geometry.location.lat()
          self.longitude = result.geometry.location.lng()
          self.centerMap()
        } else {
          console.log('Geocode was not successful for the following reason: ' + status)
        }
      })
    }
  },
  mounted () {
    window.addEventListener('google-maps-ready', this.initMap())
  },
  beforeDestroy () {
    window.removeEventListener('google-maps-ready', this.initMap())
  }
}
</script>

<style scoped>
#map {
  width: 100%;
  height: 250px;
  background-color: #f5f5f5;
  border-radius: 6px;
  overflow: hidden;
}
</style>
