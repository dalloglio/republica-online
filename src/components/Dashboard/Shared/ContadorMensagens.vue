<template>
  <div class="contador contador-mensagens">
    <div class="count">
      <span>{{ count }}</span>
    </div>
    <p v-if="count === 1">Você possui <strong>{{ count }}</strong> nova mensagem!</p>
    <p v-else>Você possui <strong>{{ count }}</strong> novas mensagens!</p>
  </div>
</template>

<script>
  export default {
    name: 'contador-mensagens',
    created () {
      this.$store.dispatch('getAdsContactsUserUnread')
    },
    beforeDestroy () {
      this.$store.commit('setAdsContactsUserUnread', [])
    },
    computed: {
      ads () {
        return this.$store.state.ad.messages.unread || []
      },
      contacts () {
        let contacts = []
        this.ads.forEach((ad) => {
          ad.contacts.forEach((contact) => {
            if (contact.origin === 'page_form_ad' && !contact.viewed_at) {
              contacts.push(contact)
            }
          })
        })
        return contacts
      },
      count () {
        return this.contacts.length || 0
      }
    }
  }
</script>

<style scoped>
.contador {
  position: relative;
}
.contador .count {
  position: relative;
  width: 260px;
  height: 120px;
  background-color: #fff;
  background-image: url('../../../assets/img/contador-mensagens.png');
  background-repeat: no-repeat;
  background-position: 0 0;
}
.contador .count span {
  position: absolute;
  top: 31px;
  left: 163px;
  display: block;
  font-weight: 800;
  color: #0052cc;
}
</style>
