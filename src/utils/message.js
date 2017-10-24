export default {
  install (Vue, options) {
    Vue.message = {
      show (message, options) {
        Vue.toasted.show(message, options)
      },

      success (message, options) {
        Vue.toasted.success(message, options)
      },

      info (message, options) {
        Vue.toasted.info(message, options)
      },

      error (message, options) {
        Vue.toasted.error(message, options)
      }
    }

    Object.defineProperties(Vue.prototype, {
      $message: {
        get: () => {
          return Vue.message
        }
      }
    })
  }
}
