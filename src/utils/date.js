import moment from 'moment'
import 'moment/locale/pt-br'

moment.locale('pt-BR')

export default {
  install (Vue, options) {
    Vue.date = {

      locale () {
        console.log(moment.locale())
      },

      toDate (date) {
        if (date) {
          return moment(date).format('YYYY-MM-DD')
        }
        return date
      },

      toDateBr (date) {
        if (date) {
          return moment(date).format('DD/MM/YYYY')
        }
        return date
      },

      toDateTimeBr (date) {
        if (date) {
          return moment(date).format('DD/MM/YYYY HH:mm:ss')
        }
        return date
      },

      toNice (date) {
        if (date) {
          return moment(date).format('DD/MM/YYYY [às] HH:mm')
        }
        return date
      }
    }

    Object.defineProperties(Vue.prototype, {
      $date: {
        get: () => {
          return Vue.date
        }
      }
    })
  }
}
