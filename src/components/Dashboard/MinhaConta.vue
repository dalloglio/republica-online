<template>
  <div class="dashboard-minha-conta">
    <h2><span>Minha Conta</span>, sem os 10% do garçon!</h2>
    <p>Chamamos de conta, mas não cobramos nada ;)</p>
    <div class="line"></div>

    <form autocomplete="off" class="row" @submit.prevent="onSubmit">
      <fieldset :disabled="loading">
        <div class="form-group col-xs-5">
          <label for="user_name" class="sr-only">Nome:</label>
          <input v-model.trim="user.name" id="user_name" type="text" class="form-control input-lg" maxlength="100" placeholder="Nome" required autofocus>
        </div>
        <div class="form-group col-xs-3">
          <label for="user_cpf" class="sr-only">CPF:</label>
          <input v-model.trim="user.cpf" id="user_cpf" type="text" class="form-control input-lg" maxlength="14" placeholder="CPF" required v-mask="'999.999.999-99'">
        </div>
        <div class="form-group col-xs-4">
          <label for="user_birthday" class="sr-only">Data de Nascimento:</label>
          <input v-model.trim="user.birthday" id="user_birthday" type="date" class="form-control input-lg" maxlength="10" placeholder="Data de Nascimento" required>
        </div>
        <div class="form-group col-xs-4">
          <label for="user_gender" class="sr-only">Sexo:</label>
          <select v-model.trim="user.gender" id="user_gender" class="form-control input-lg" required>
            <option value="">Selecione</option>
            <option v-for="gender in genders" :value="gender.key">{{ gender.value }}</option>
          </select>
        </div>
        <div class="form-group col-xs-5">
          <label for="user_email" class="sr-only">E-mail:</label>
          <input v-model.trim="user.email" id="user_email" type="email" class="form-control input-lg" maxlength="100" placeholder="E-mail" required>
        </div>
        <div class="form-group col-xs-3">
          <button type="button" class="btn btn-link btn-password" title="Trocar de senha" @click="showModal">Trocar de senha</button>
        </div>

        <div class="clearfix"></div>

        <div class="form-group col-xs-2">
          <label for="user_address_zip_code" class="sr-only">Cep:</label>
          <input v-model.lazy="user.address.zip_code" id="user_address_zip_code" type="text" class="form-control input-lg" minlength="9" maxlength="9" placeholder="Cep" @blur="pesquisarCep" required v-mask="'99999-999'">
        </div>
        <div class="form-group col-xs-2">
          <label for="user_address_state_initials" class="sr-only">Estado:</label>
          <input v-model.trim="user.address.state_initials" id="user_address_state_initials" type="text" class="form-control input-lg" maxlength="2" placeholder="Estado" required>
        </div>
        <div class="form-group col-xs-4">
          <label for="user_address_city" class="sr-only">Cidade:</label>
          <input v-model.trim="user.address.city" id="user_address_city" type="text" class="form-control input-lg" maxlength="50" placeholder="Cidade" required>
        </div>
        <div class="form-group col-xs-4">
          <label for="user_address_neighborhood" class="sr-only">Bairro:</label>
          <input v-model.trim="user.address.neighborhood" id="user_address_neighborhood" type="text" class="form-control input-lg" maxlength="50" placeholder="Bairro" required>
        </div>
        <div class="form-group col-xs-6">
          <label for="user_address_street" class="sr-only">Rua:</label>
          <input v-model.trim="user.address.street" id="user_address_street" type="text" class="form-control input-lg" maxlength="100" placeholder="Rua" required>
        </div>
        <div class="form-group col-xs-2">
          <label for="user_address_number" class="sr-only">Número:</label>
          <input v-model.trim="user.address.number" id="user_address_number" type="text" class="form-control input-lg" maxlength="50" placeholder="Número" ref="addressNumberRef" required>
        </div>
        <div class="form-group col-xs-4">
          <label for="user_address_sub_address" class="sr-only">Complemento:</label>
          <input v-model.trim="user.address.sub_address" id="user_address_sub_address" type="text" class="form-control input-lg" maxlength="100" placeholder="Complemento">
        </div>

        <div class="col-xs-4 col-xs-offset-8">
          <button type="submit" class="btn btn-lg btn-success btn-block">Salvar</button>
        </div>
      </fieldset>
    </form>

    <modal-change-password ref="modalRef">
      <h3 slot="title">Trocar de senha</h3>
    </modal-change-password>
  </div>
</template>

<script>
import AwesomeMask from 'awesome-mask'
import ModalChangePassword from '@/components/Dashboard/Shared/ModalChangePassword'
export default {
  name: 'dashboard-minha-conta',
  directives: {
    'mask': AwesomeMask
  },
  components: {
    ModalChangePassword
  },
  data () {
    return {
      loading: false,
      genders: [
        { key: 'Male', value: 'Masculinho' },
        { key: 'Female', value: 'Feminino' }
      ]
    }
  },
  methods: {
    onSubmit () {
      this.loading = true
      this.$store.dispatch('updateUser', this.user).then((response) => {
        this.loading = false
        if (response.ok) {
          this.$store.dispatch('getUser')
          alert('Salvo com sucesso!')
        }
      }, (error) => {
        this.loading = false
        console.log(error)
      })
    },
    showModal () {
      this.$refs.modalRef.validationsErrors = []
      this.$refs.modalRef.show()
    },
    pesquisarCep () {
      if (this.user.address.zip_code !== '') {
        this.loading = true
        this.cep.pesquisar(this.user.address.zip_code, this.user.address).then((response) => {
          this.loading = false
          this.$refs.addressNumberRef.focus()
        }, (error) => {
          this.loading = false
          console.log(error)
        })
      }
    }
  },
  computed: {
    user () {
      let user = this.$store.state.user.user
      if (!user.address) {
        user.address = {}
      }
      if (!user.photo) {
        user.photo = {}
      }
      return user
    }
  }
}
</script>

<style scoped>
.btn-password {
  font-weight: 600;
  color: #57d9a3;
  line-height: 24px;
  padding: 10px;
}
</style>
