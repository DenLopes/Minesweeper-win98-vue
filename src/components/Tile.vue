<script setup>
const props = defineProps({
        state: Boolean,
        x: Number,
        y: Number,
    })


function applyTileImg() {
    if(props.state) {
        return new URL(`../assets/img/bomb.png`, import.meta.url)
    }else {
        return new URL(`../assets/img/natural.png`, import.meta.url)
    }
}


</script>

<template>
    <button @click="$emit('showTile', x, y)" class="w-4 h-4 bg-black" >
        <img :src="applyTileImg()" alt="tile">
    </button>
</template>

<style scoped>
img {
  image-rendering: pixelated;
}
</style>
