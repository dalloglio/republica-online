<template>
  <div class="dashboard-minhas-mensagens-show">
    <h2><span>Minhas Mensagens</span>, será que deu match?</h2>
    <p>Você está visualizando a mensagem de {{ contact.name }}</p>
    <div class="line"></div>

    <div class="media">
      <div class="media-left">
        <router-link :to="{ name: 'anuncio', params: { slug: contact.ad.slug } }" :title="contact.ad.title">
          <img :src="contact.ad.photo.url" :alt="contact.ad.title" class="media-object">
        </router-link>
      </div>
      <div class="media-body">
        <h4 class="media-heading">
          {{ contact.ad.title }}
          <div class="actions pull-right">
            <button type="button" @click="onBack" class="btn btn-info btn-xs">Voltar</button>
            <button type="button" @click="onDelete" class="btn btn-danger btn-xs">Excluir</button>
          </div>
        </h4>
        <p><b>Mensagem de:</b><br>{{ contact.name }} [{{ contact.email }}]</p>
        <p><b>Enviada em:</b><br>{{ $date.toNice(contact.created_at) }}</p>
        <p><b>Telefone p/ contato:</b><br>{{ $mask.phone(contact.phone) }}</p>
        <p><b>Mensagem:</b><br>{{ contact.message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dashboard-minhas-mensagens-show',
  computed: {
    contact () {
      return this.$store.state.ad.contact
    }
  },
  methods: {
    onBack () {
      this.$router.push({ name: 'dashboard.minhas-mensagens' })
    },
    onDelete (contact) {
      if (confirm('Você tem certeza que deseja excluir esta mensagem?')) {
        this.$store.dispatch('deleteAdContact', {
          ad_id: this.$route.params.ad_id,
          id: this.$route.params.id
        }).then((response) => {
          if (response.ok) {
            this.$router.push({ name: 'dashboard.minhas-mensagens' })
          }
        }, (error) => {
          console.log(error)
        })
      }
    }
  },
  created () {
    this.$store.dispatch('getAdContactUser', {
      ad_id: this.$route.params.ad_id,
      id: this.$route.params.id
    })
  }
}
</script>

<style scoped>
.media .media-heading {
  font-weight: 800;
  border-bottom: 1px solid #091e42;
  padding-bottom: 10px;
}
.media .media-object {
  width: 150px;
  height: 95px;
  border-radius: 6px;
}
</style>
