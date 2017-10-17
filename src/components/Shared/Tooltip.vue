<template>
  <div class="app-tooltip">
    <span class="glyphicon glyphicon-question-sign"></span>
    <span :class="{
      title: true,
      dark: theme === 'dark' || false,
      light: theme === 'light' || false,
      top: placement === 'top' || false,
      left: placement === 'left' || false,
      right: placement === 'right' || false,
      bottom: placement === 'bottom' || false
      }">{{ title }}</span>
  </div>
</template>

<script>
  export default {
    name: 'app-tooltip',
    props: {
      title: {
        type: String,
        default: ''
      },
      placement: {
        type: String,
        default: 'top'
      },
      theme: {
        type: String,
        default: 'dark'
      }
    }
  }
</script>

<style scoped>
  .app-tooltip {
    position: absolute;
    z-index: 10;
  }
  .app-tooltip .title {
    background-color: rgba(0,0,0,.8);
    color: #fff;
    text-shadow: 0px 0px 1px #000;
    text-align: center;
    text-transform: lowercase;
    font-size: 14px;
    line-height: 20px;
    position: absolute;
    min-width: 200px;
    max-width: 300px;
    border-radius: 4px;
    margin: 0;
    padding: 3px 6px;
    z-index: 10;
    visibility: hidden;
    opacity: 0;
    -webkit-transition: opacity .4s;
    -moz-transition: opacity .4s;
    -ms-transition: opacity .4s;
    -o-transition: opacity .4s;
    transition: opacity .4s;
  }
  .app-tooltip .title.left,
  .app-tooltip .title.right {
    top: 0;
  }
  .app-tooltip .title.left {
    right: 100%;
    margin-right: 3px;
  }
  .app-tooltip .title.right {
    left: 100%;
    margin-left: 3px;
  }

  .app-tooltip .title.top,
  .app-tooltip .title.bottom {
    right: 0;
  }
  .app-tooltip .title.top {
    bottom: 100%;
    margin-bottom: 3px;
  }
  .app-tooltip .title.bottom {
    top: 100%;
    margin-top: 3px;
  }

  .app-tooltip .title::after {
    content: " ";
    position: absolute;
    border-width: 5px;
    border-style: solid;
    border-color: transparent;
  }

  .app-tooltip .title.left::after,
  .app-tooltip .title.right::after {
    top: 5px;
  }
  .app-tooltip .title.left::after {
    left: 100%;
    border-left-color: rgba(0,0,0,.8);
  }
  .app-tooltip .title.right::after {
    right: 100%;
    border-right-color: rgba(0,0,0,.8);
  }
  .app-tooltip .title.top::after,
  .app-tooltip .title.bottom::after {
    right: 5px;
  }
  .app-tooltip .title.top::after {
    top: 100%;
    border-top-color: rgba(0,0,0,.8);
  }
  .app-tooltip .title.bottom::after {
    bottom: 100%;
    border-bottom-color: rgba(0,0,0,.8);
  }

  .app-tooltip .glyphicon {
    position: relative;
    width: 20px;
    height: 20px;
    font-size: 14px;
    line-height: 14px;
    padding: 3px;
  }
  .app-tooltip .glyphicon:hover + .title {
    visibility: visible;
    opacity: 1;
  }
</style>
