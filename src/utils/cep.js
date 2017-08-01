const xxxxxxxx = 'xxxxxxxx'
const ENDPOINT = 'https://viacep.com.br/ws/' + xxxxxxxx + '/json/'

export default {
  install (Vue, options) {
    Vue.cep = {

      pesquisar (cep, formulario) {
        cep = cep.replace(/\D/g, '')

        if (!cep) return
        if (cep.length !== 8) return

        let url = ENDPOINT.replace(xxxxxxxx, cep)

        Vue.http.get(url, {
          before: function (request) {
            delete request.headers.map.Authorization
          }
        }).then((response) => {
          if (response.body.status === 400) return
          if (response.body.erro === true) return
          this.completarFormulario(formulario, response.body)
        })
      },

      completarFormulario (formulario, data) {
        if (data.bairro) formulario.neighborhood = data.bairro
        if (data.logradouro) formulario.street = data.logradouro
        if (data.complemento) formulario.sub_address = data.complemento
        if (data.localidade) formulario.city = data.localidade
        if (data.uf) formulario.state = data.uf
      }
    }

    Object.defineProperties(Vue.prototype, {
      cep: {
        get: () => {
          return Vue.cep
        }
      }
    })
  }
}
