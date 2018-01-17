<template>
  <div class="mapa" id="map">
    <gmap-map
    ref="gmapRef"
    :center="center"
    :zoom="zoom"
    style="width: 100%; height: 250px">
      <gmap-marker v-if="marker.show" :position="center"></gmap-marker>
      <gmap-circle
      v-if="circle.show"
      :center="center"
      :draggable="circle.draggable"
      :editable="circle.editable"
      :options="circle.options"></gmap-circle>
    </gmap-map>
  </div>
</template>

<script>
  /* global google */
  export default {
    name: 'mapa',
    data () {
      return {
        address: 'Brasil',
        center: { lat: 0, lng: 0 },
        circle: {
          draggable: false,
          editable: false,
          show: false,
          options: {
            strokeColor: '#0052cc',
            strokeOpacity: 0.7,
            strokeWeight: 2,
            fillColor: '#0052cc',
            fillOpacity: 0.3,
            radius: 500000
          }
        },
        geocoderObject: null,
        geocoderStatus: null,
        geocoderResults: null,
        marker: {
          show: false
        },
        title: 'Brasil',
        zoom: 4
      }
    },
    methods: {
      searchAddress () {
        let self = this
        if (!self.geocoderObject) {
          self.geocoderObject = new google.maps.Geocoder()
        }
        return new Promise((resolve, reject) => {
          if (!self.address) {
            reject('O endereço está vázio')
          } else {
            self.geocoderObject.geocode({ 'address': self.address }, function (results, status) {
              self.geocoderStatus = status
              self.geocoderResults = results
              if (status === 'OK') {
                let result = results[0]
                self.title = result.formatted_address
                self.address = result.formatted_address
                self.updateCenter(result.geometry.location)
                resolve(status)
              } else {
                console.log('Endereço não foi encontrado: ' + status)
                reject(status)
              }
            })
          }
        })
      },
      setAddress (address) {
        this.address = address
      },
      setZoom (zoom) {
        this.zoom = zoom
      },
      addCircle () {
        this.circle.show = true
        let results = this.geocoderResults
        if (!results) {
          this.setZoom(4)
          this.circle.options.radius = 500000
        } else {
          let result = results.shift()
          if (result.types.indexOf('country') !== -1) {
            this.setZoom(4)
            this.circle.options.radius = 500000
          } else {
            this.setZoom(11)
            this.circle.options.radius = 5000
          }
        }
      },
      removeCircle () {
        this.circle.show = false
      },
      addMarker () {
        this.marker.show = true
        this.setZoom(15)
      },
      removeMarker () {
        this.marker.show = false
      },
      updateCenter (center) {
        this.center = {
          lat: center.lat(),
          lng: center.lng()
        }
      }
    },
    mounted () {
      let ref = this.$refs.gmapRef
      ref.$mapCreated.then(() => {
        this.searchAddress()
      })
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
