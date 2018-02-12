export default {
  install (Vue, options) {
    Vue.spinner = {
      modal: null,

      init (el) {
        this.modal = window.jQuery(el).modal({
          backdrop: 'static',
          keyboard: false,
          show: false
        })
      },

      open () {
        this.modal.modal('show')
      },

      close () {
        this.modal.modal('hide')
      }
    }

    Object.defineProperties(Vue.prototype, {
      spinner: {
        get: () => {
          return Vue.spinner
        }
      }
    })
  }
}
