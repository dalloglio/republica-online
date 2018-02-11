<template>
  <div class="dashboard-minhas-mensagens-show">
    <h2><span>Minhas Mensagens</span>, será que deu match?</h2>
    <p v-if="loading"><strong>Um momento, estamos procurando a mensagem...</strong></p>
    <p v-else>Você está visualizando a mensagem de {{ contact.name }}</p>

    <div class="line"></div>

    <div v-if="ad.id" class="media">
      <div class="media-left">
        <router-link :to="{ name: 'anuncio', params: { id: ad.id, slug: ad.slug } }" :title="ad.title">
          <img v-if="ad.photo" :src="urlPhoto(ad.photo)" :alt="ad.title" class="media-object">
          <img v-else src="http://via.placeholder.com/150x95?text=+" :alt="ad.title" class="media-object">
        </router-link>
      </div>
      <div class="media-body">
        <h4 class="media-heading">
          {{ ad.title }}
          <div class="actions pull-right">
            <button type="button" @click="onBack" class="btn btn-info btn-xs">Voltar</button>
            <button type="button" @click="onDelete" class="btn btn-danger btn-xs">Excluir</button>
          </div>
        </h4>
        <p v-if="contact.name || contact.email"><b>Mensagem de:</b><br>{{ contact.name }} <span v-if="contact.email">[{{ contact.email }}]</span></p>
        <p v-if="contact.created_at"><b>Enviada em:</b><br>{{ $date.toNice(contact.created_at) }}</p>
        <p v-if="contact.viewed_at"><b>Visualizada em:</b><br>{{ $date.toNice(contact.viewed_at) }}</p>
        <p v-if="contact.city"><b>Cidade:</b><br>{{ contact.city }}</p>
        <p v-if="contact.phone"><b>Telefone p/ contato:</b><br>{{ $mask.phone(contact.phone) }}</p>
        <p v-if="contact.message"><b>Mensagem:</b><br>{{ contact.message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'dashboard-minhas-mensagens-show',
    data () {
      return {
        loading: true
      }
    },
    computed: {
      ad () {
        return this.contact.ad || {}
      },
      contact () {
        return this.$store.state.ad.contact
      }
    },
    methods: {
      urlPhoto (photo) {
        return this.$store.getters.urlPhoto(photo.id)
      },
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
      }).then(() => {
        this.loading = false
      })
    },
    beforeDestroy () {
      this.$store.commit('setAdContact', {})
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
