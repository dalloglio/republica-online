<template>
  <nav class="text-center">
    <ul class="pagination pagination-lg">
      <li>
        <a href="">Primeira</a>
      </li>
      <li><a href="#">1</a></li>
      <li><a href="#">2</a></li>
      <li><a href="#">3</a></li>
      <li><a href="#">4</a></li>
      <li><a href="#">5</a></li>
      <li><a href="#">6</a></li>
      <li>
        <a href="#">Última</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'pagination'
}
</script>

<style>
.pagination {
  margin: 20px auto;
}
.pagination > li > a{
  margin: 0 5px;
  border-radius: 6px;
}

</style>
