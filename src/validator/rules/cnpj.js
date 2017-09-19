const validator = {
  messages: {
    en: (field, args) => {
      return 'The ' + field + ' field is invalid.'
    },
    pt_br: (field, args) => {
      return 'O campo ' + field + ' é inválido.'
    }
  },
  validate (value, args) {
    let val = value.replace(/\D/g, '')

    if (val.match(/^\d{2}\d{3}\d{3}\d{4}\d{2}$/) != null) {
      let val1 = val.substring(0, 2)
      let val2 = val.substring(2, 5)
      let val3 = val.substring(5, 8)
      let val4 = val.substring(8, 12)
      let val5 = val.substring(12, 14)

      let i
      let number
      let result = true

      number = (val1 + val2 + val3 + val4 + val5)

      let s = number
      let c = s.substr(0, 12)
      let dv = s.substr(12, 2)
      let d1 = 0

      for (i = 0; i < 12; i++) {
        d1 += c.charAt(11 - i) * (2 + (i % 8))
      }

      if (d1 === 0) {
        result = false
      }

      d1 = 11 - (d1 % 11)

      if (d1 > 9) d1 = 0

      if (dv.charAt(0) !== d1) {
        result = false
      }

      d1 *= 2
      for (i = 0; i < 12; i++) {
        d1 += c.charAt(11 - i) * (2 + ((i + 1) % 8))
      }

      d1 = 11 - (d1 % 11)
      if (d1 > 9) d1 = 0

      if (dv.charAt(1) !== d1) {
        result = false
      }

      return result
    }
    return false
  }
}

export default validator
