export default {
  install (Vue, options) {
    (function () {
      let script = document.createElement('script')
      script.src = '//maps.googleapis.com/maps/api/js?key=' + options.key + '&language=pt-BR'
      script.type = 'text/javascript'
      script.async = 'true'
      script.defer = 'true'
      script.onload = script.onreadystatechange = function () {
        let rs = this.readyState
        if (rs && rs !== 'complete' && rs !== 'loaded') {
          return
        }
        window.dispatchEvent(new Event('google-maps-ready'))
      }
      let s = document.getElementsByTagName('script')[0]
      s.parentNode.insertBefore(script, s)
    })()
  }
}
