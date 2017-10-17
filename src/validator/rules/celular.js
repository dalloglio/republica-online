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
    // validação de telefones celulares com o nono dígito
    let regExp = new RegExp(/^[1-9]{2}9[7-9][0-9]{3}[0-9]{4}$/, 'g')
    let celular = value.replace(/\D/g, '')
    return regExp.test(celular)
  }
}

export default validator
