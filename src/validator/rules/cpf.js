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

    if (val.match(/^\d{3}\d{3}\d{3}\d{2}$/) != null) {
      let val1 = val.substring(0, 3)
      let val2 = val.substring(3, 6)
      let val3 = val.substring(6, 9)
      let val4 = val.substring(9, 11)

      let i
      let number
      let result = true

      number = (val1 + val2 + val3 + val4)

      let s = number
      let c = s.substr(0, 9)
      let dv = s.substr(9, 2)
      let d1 = 0

      for (i = 0; i < 9; i++) {
        d1 += c.charAt(i) * (10 - i)
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
      for (i = 0; i < 9; i++) {
        d1 += c.charAt(i) * (11 - i)
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
