<template>
  <div id="app">
    <el-row :gutter="0" class="tac">
      <el-col :xs="24" :sm="4" :md="4" :lg="4">
        <navbar></navbar>
      </el-col>
      <el-col :xs="24" :sm="20" :md="20" :lg="20">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Navbar from '@/components/Shared/Navbar'
  export default {
    name: 'app',
    components: {
      'navbar': Navbar
    }
  }
</script>

<style>
  body {
    margin: 0px;
    padding: 0px;
  }
</style>
