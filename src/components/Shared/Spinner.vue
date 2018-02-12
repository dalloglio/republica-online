<template>
  <div class="spinner modal fade" id="modal-spinner" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-body text-center">
          <h4>{{ title }}</h4>
          <p>{{ description }}</p>
          <img src="/static/spinner.svg" onerror="this.onerror=null; this.src='/static/spinner.gif'">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'spinner',
    computed: {
      title () {
        return this.$store.state.spinner.title
      },
      description () {
        return this.$store.state.spinner.description
      }
    },
    mounted () {
      this.spinner.init('#modal-spinner')
    }
  }
</script>

<style scoped>
  .modal-dialog {
    margin-top: 60px;
  }
  .modal-dialog .modal-content {
    border-radius: 0;
  }
  .modal-dialog .modal-content .modal-body {
    padding: 25px;
  }
  .modal-dialog .modal-content .modal-body h4 {
    font-weight: 700;
    margin-bottom: 5px;
  }
</style>
