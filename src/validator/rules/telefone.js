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
    // validação de telefones fixos
    let regExp = new RegExp(/^[1-9]{2}[2-3][0-9]{3}[0-9]{4}$/, 'g')
    let telefone = value.replace(/\D/g, '')
    return regExp.test(telefone)
  }
}

export default validator
