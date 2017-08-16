export default {
  install (Vue, options) {
    Vue.mask = {
      phone (val) {
        if (!val) {
          return
        }
        let r = val.replace(/\D/g, '')
        if (r.length === 11) {
          r = r.replace(/^([0-9]{2})([0-9]{5})([0-9]{4})/, '($1) $2-$3')
        } else if (r.length === 10) {
          r = r.replace(/^([0-9]{2})([0-9]{4})([0-9]{4})/, '($1) $2-$3')
        }
        return r
      }
    }

    Object.defineProperties(Vue.prototype, {
      $mask: {
        get: () => {
          return Vue.mask
        }
      }
    })
  }
}
