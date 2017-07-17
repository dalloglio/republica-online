<template>
    <el-menu mode="vertical" theme="dark">
        <el-menu-item-group v-for="(group, x) in groups" :title="group.name" :key="x">
            <el-menu-item :disabled="false" :route="{ path: '/' }" v-for="(item, y) in group.data" :key="y" index="increment">
                <i :class="item.icon"></i>{{ item.title }}
            </el-menu-item>
        </el-menu-item-group>
    </el-menu>
</template>

<script>
  export default {
    name: 'navbar',
    data () {
      return {
        index: 1,
        groups: [
          {
            name: 'Banners',
            data: [
              { icon: 'el-icon-menu', title: 'Gerenciar' },
              { icon: 'el-icon-plus', title: 'Adicionar' }
            ]
          },
          {
            name: 'Usuários',
            data: [
              { icon: 'el-icon-menu', title: 'Gerenciar' },
              { icon: 'el-icon-plus', title: 'Adicionar' }
            ]
          }
        ]
      }
    },
    methods: {
      increment () {
        return this.index++
      }
    }
  }
</script>
