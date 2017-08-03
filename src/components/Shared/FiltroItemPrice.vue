<template>
  <div class="filtro-item-price">
    <div :class="{ 'panel': true, 'panel-default': true, 'border': border, 'no-border': !border }">

      <div class="panel-heading">
        <h4 class="panel-title">
          <a :class="{ 'collapsed': collapsed }" data-toggle="collapse" :href="'#' + panelCollapseID">
            {{ title }}<span class="glyphicon"></span>
          </a>
        </h4>
      </div>

      <div :id="panelCollapseID" :class="{ 'panel-collapse' : true, 'collapse': true, 'in': !collapsed }">
        <div class="panel-body">
          <form autocomplete="off" @submit.prevent="onSubmit">
            <div class="form-group">
              <input v-model.trim="price.from" type="text" class="form-control input-lg" maxlength="10" placeholder="De:">
            </div>
            <div class="form-group">
              <input v-model.trim="price.to" type="text" class="form-control input-lg" maxlength="10" placeholder="Até:">
            </div>
            <button type="submit" class="btn btn-lg btn-success btn-block text-uppercase">Aplicar!</button>
          </form>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'filtro-item-price',
  data () {
    return {
      collapsed: !this.open,
      price: {
        from: '',
        to: ''
      }
    }
  },
  methods: {
    onSubmit () {
      this.$router.push({ name: 'anuncios' })
    }
  },
  computed: {
    headID () {
      return 'heading-' + this.id
    },
    panelCollapseID () {
      return 'collapse-' + this.id
    }
  },
  props: {
    open: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
a:hover,
a:focus {
  text-decoration: none;
}
a[data-toggle] {
  position: relative;
  display: block;
}
a[data-toggle] span {
  position: absolute;
  right: 0;
}
.panel {
  padding: 0;
  margin: 0;
  border: 0 none;
  border-radius: 0;
  box-shadow: none;
}
.panel-default {
  background-color: rgba(0,0,0,0);
}
.panel-heading {
  background: rgba(0,0,0,0);
  padding: 15px 0;
  border: 0 none;
}
.panel-title {
  font-size: 14px;
}
.panel-body {
  padding: 10px 0;
}
.form-group {
  padding: 0 40px;
}
.glyphicon:before {
    content: "\E259";
}
.collapsed .glyphicon:before {
    content: "\E257";
}
.border {
  border-bottom: 1px solid #333;
}
.no-border {
  border-bottom: 1px solid transparent;
}
</style>
