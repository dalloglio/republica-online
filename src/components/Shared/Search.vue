<template>
  <div v-if="estados.length" class="search">
    <form autocomplete="off" @submit.prevent="onSubmit">
      <div class="form-group">
        <select class="form-control input-lg" v-model="estado">
          <option value="">Selecione o estado</option>
          <option v-for="o in estados" :value="o">{{ o.Nome }}</option>
        </select>
      </div>
      <div class="form-group">
        <select class="form-control input-lg" v-model="cidade">
          <option value="">Selecione a cidade</option>
          <option v-for="o in cidades" :value="o">{{ o.Nome }}</option>
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
    methods: {
      onSubmit () {
        let query = {}
        if (this.estado.Sigla) {
          query.uf = this.estado.Sigla
        }
        if (this.cidade.Nome) {
          query.cidade = this.cidade.Nome
        }
        this.$router.push({ name: 'anuncios', query: query })
      }
    },
    computed: {
      estados () {
        return this.$store.state.estado.estados || []
      },
      cidades () {
        if (this.estado.ID) {
          return this.$store.getters.getCidadesByEstado(this.estado.ID)
        }
        return []
      }
    },
    created () {
      this.$store.dispatch('getEstados')
      this.$store.dispatch('getCidades')
    }
  }
</script>

<style>
  .search {
    margin-top: 160px;
    margin-bottom: 180px;
  }
  .search form {
    padding-left: 40px;
    padding-right: 40px;
  }
  .search form .form-group {
    margin-bottom: 30px;
  }
</style>
