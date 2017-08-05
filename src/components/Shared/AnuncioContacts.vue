<template>
  <div class="anuncio-contacts">
    <div class="panel">
      <div class="panel-avatar">
        <a href="" title="Avatar">
          <img src="https://randomuser.me/api/portraits/men/81.jpg" alt="Avatar">
        </a>
      </div>
      <div class="panel-body">
        <p class="detail"><i class="icon icon-user"></i>João Pedro</p>
        <p class="detail"><i class="icon icon-mobile"></i> (99) 9 9876-5432</p>
        <p class="detail"><i class="icon icon-whatsapp"></i> (99) 9 9876-5432</p>
        <button type="button" class="btn btn-lg btn-block btn-warning" title="Enviar Mensagem!" @click="showModal">
          Enviar Mensagem!
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'anuncio-contacts',
  methods: {
    showModal () {
      this.$parent.$refs.modalRef.show()
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
