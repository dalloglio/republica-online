import router from '@/router'

export default {
  install (Vue, options) {
    Vue.url = {
      go (to) {
        router.push(to)
      }
    }

    Object.defineProperties(Vue.prototype, {
      url: {
        get: () => {
          return Vue.url
        }
      }
    })
  }
}
