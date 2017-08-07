<template>
  <div class="dashboard-minhas-mensagens-show">
    <h2><span>Minhas Mensagens</span>, será que deu match?</h2>
    <p>Você está visualizando a mensagem de {{ contact.name }}</p>
    <div class="line"></div>

    <div class="media">
      <div class="media-left">
        <router-link :to="{ name: 'anuncio', params: { slug: contact.ad.slug } }" :title="contact.ad.title">
          <img :src="contact.ad.photo" :alt="contact.ad.title" class="media-object">
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
        <p><b>Enviada em:</b><br>{{ contact.created_at }}</p>
        <p><b>Telefone p/ contato:</b><br>{{ contact.phone }}</p>
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
      return {
        id: 1,
        name: 'Gustavo',
        phone: '(99) 9 9999-9999',
        email: 'gustavo@email.com',
        message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt veritatis, eius laboriosam reprehenderit quod aliquid id quaerat, repudiandae quos at sapiente vel maxime libero similique voluptate possimus. Odio, voluptatum, in?',
        created_at: '2017-01-01 10:30:00',
        ad: {
          id: 1,
          slug: 'anuncio-a',
          title: 'Anúncio A',
          photo: 'http://lorempixel.com/150/95/nature/1/'
        }
      }
    }
  },
  methods: {
    onBack () {
      this.$router.push({ name: 'dashboard.minhas-mensagens' })
    },
    onDelete (ad) {
      if (confirm('Você tem certeza que deseja excluir esta mensagem?')) {
        this.$router.push({ name: 'dashboard.minhas-mensagens' })
      }
    }
  }
}
</script>

<style scoped>
.media .media-heading {
  font-weight: 800;
  border-bottom: 1px solid #091e42;
  padding-bottom: 10px;
}
</style>
