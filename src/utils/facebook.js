/* global window, FB, document */

export default {
  install (Vue, options) {
    (function (d, s, id) {
      let js
      let fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(s)) {
        return
      }
      js = d.createElement(s)
      js.id = id
      js.src = '//connect.facebook.net/pt_BR/sdk.js'
      fjs.parentNode.insertBefore(js, fjs)
    }(document, 'script', 'facebook-jssdk'))

    Vue.FB = undefined

    window.fbAsyncInit = function () {
      FB.init(options)
      FB.AppEvents.logPageView()
      Vue.FB = FB
      window.dispatchEvent(new Event('fb-sdk-ready'))
    }

    Object.defineProperties(Vue.prototype, {
      $FB: {
        get: () => {
          return Vue.FB
        }
      }
    })
  }
}
