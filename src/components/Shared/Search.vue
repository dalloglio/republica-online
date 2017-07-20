<template>
  <div class="search">
    <form>
        <div class="form-group">
          <select class="form-control input-lg" v-model="estado">
            <option value="">Selecione o estado</option>
            <option v-for="estado in estados" :value="estado.abbr">{{ estado.name }}</option>
          </select>
        </div>
        <div class="form-group">
          <select class="form-control input-lg" v-model="cidade">
            <option value="">Selecione o cidade</option>
            <option v-for="cidade in cidades" :value="cidade.name">{{ cidade.name }}</option>
          </select>
        </div>
        <button type="submit" class="btn btn-lg btn-success btn-block text-uppercase">Buscar!</button>
      </form>
  </div>
</template>

<script>
export default {
  name: 'search',
  data () {
    return {
      estado: '',
      cidade: ''
    }
  },
  computed: {
    estados () {
      return [
        { abbr: 'PR', name: 'Paraná' },
        { abbr: 'SC', name: 'Santa Catarina' },
        { abbr: 'RS', name: 'Rio Grande do Sul' }
      ]
    },
    cidades () {
      return [
        { name: 'Curitiba' },
        { name: 'Florianópolis' },
        { name: 'Porto Alegre' }
      ]
    }
  }
}
</script>

<style>
.search {
  margin-top: 160px;
  margin-bottom: 180px;
}
.search form {
  padding-left: 60px;
  padding-right: 60px;
}
.search form .form-group {
  margin-bottom: 30px;
}
</style>
