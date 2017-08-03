<template>
    <div class="galeria">
        <div class="row" id="galeria">
            <div class="col-xs-3 images">
                <img src="http://lorempixel.com/189/120/food/1/" alt="Image 1" class="img-responsive">
                <img src="http://lorempixel.com/189/120/food/2/" alt="Image 2" class="img-responsive">
                <img src="http://lorempixel.com/189/120/food/3/" alt="Image 3" class="img-responsive">
                <img src="http://lorempixel.com/189/120/food/4/" alt="Image 4" class="img-responsive">
            </div>
            <div class="col-xs-9 image">
                <img src="http://lorempixel.com/628/420/food/5/" alt="Image 5" class="img-responsive">
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'galeria'
}
</script>

<style scoped>
#galeria {
    position: relative;
    width: auto;
    height: 420px;
    overflow: hidden;
}
#galeria .images img {
    margin-bottom: 10px;
}
#galeria img {
    border-radius: 10px
}
</style>
