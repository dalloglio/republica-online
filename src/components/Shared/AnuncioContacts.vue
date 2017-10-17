<template>
  <div class="anuncio-contacts">
    <div class="panel">
      <div class="panel-avatar">
        <a href="" title="Avatar">
          <img v-if="avatar" :src="avatar" :alt="user.name">
          <img v-else src="http://via.placeholder.com/120?text=+" :alt="user.name">
        </a>
      </div>
      <div class="panel-body">
        <p class="detail"><i class="icon icon-user"></i>{{ user.name }}</p>
        <p class="detail"><i class="icon icon-mobile"></i> {{ $mask.phone(contact.cellphone) }}</p>
        <p class="detail"><i class="icon icon-whatsapp"></i> {{ $mask.phone(contact.whatsapp) }}</p>
        <button
        type="button"
        class="btn btn-lg btn-block btn-warning"
        title="Enviar Mensagem!"
        @click="showModal">
          Enviar Mensagem!
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'anuncio-contacts',
    props: {
      ad: {
        type: Object,
        required: true
      }
    },
    methods: {
      showModal () {
        this.$parent.$refs.modalRef.show()
      }
    },
    computed: {
      avatar () {
        let photo = this.user.photo || {}
        return this.$store.getters.urlPhoto(photo.id)
      },
      contact () {
        return this.ad.contact || {}
      },
      user () {
        return this.ad.user || {}
      }
    }
  }
</script>

<style scoped>
  .anuncio-contacts {
    margin-top: 100px;
  }
  .panel {
    background-color: #f4f7f9;
    border-color: #f4f7f9;
    margin-top: 70px;
    margin-bottom: 30px;
  }
  .panel-avatar {
    position: relative;
    height: 140px;
  }
  .panel-avatar img {
    position: relative;
    display: block;
    width: 140px;
    height: 140px;
    margin: -70px auto 0;
    border-radius: 50%;
    border: 10px solid #f4f7f9;
  }
  .panel-body {
    padding: 15px 10px 20px;
  }
  p.detail {
    margin-bottom: 5px;
  }
  .icon {
      vertical-align: bottom;
  }
  button {
    font-weight: 800;
    margin-top: 20px;
  }
</style>
