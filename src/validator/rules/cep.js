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
    let cep = value.replace(/\D/g, '')
    if (!cep) return false
    if (cep.length !== 8) return false
    let regExp = new RegExp(/^[0-9]{8}$/, 'g')
    return regExp.test(cep)
  }
}

export default validator
