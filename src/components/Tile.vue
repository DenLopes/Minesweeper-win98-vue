<script setup>
const props = defineProps({
        tile: String,
        x: Number,
        y: Number,
    })

const applyTileImg = () => {
    switch(props.tile){
        case 'n':
            return new URL(`../assets/img/natural.png`, import.meta.url)
        case 'f':
            return new URL(`../assets/img/flag.png`, import.meta.url)
        case 'bh':
            return new URL(`../assets/img/bomb-hit.png`, import.meta.url)
        case 'b':
            return new URL(`../assets/img/bomb.png`, import.meta.url)
        case 'x':
            return new URL(`../assets/img/X.png`, import.meta.url)
        case '0':
            return new URL(`../assets/img/0.png`, import.meta.url)
        case '1':
            return new URL(`../assets/img/1.png`, import.meta.url)
        case '2':
            return new URL(`../assets/img/2.png`, import.meta.url)
        case '3':
            return new URL(`../assets/img/3.png`, import.meta.url)
        case '4':
            return new URL(`../assets/img/4.png`, import.meta.url)
        case '5':
            return new URL(`../assets/img/5.png`, import.meta.url)
        case '6':
            return new URL(`../assets/img/6.png`, import.meta.url)
        case '7':
            return new URL(`../assets/img/7.png`, import.meta.url)
        case '8':
            return new URL(`../assets/img/8.png`, import.meta.url)
    }
}
</script>

<template>
    <button @click="$emit('showTile', x, y)" @contextmenu.prevent="$emit('flag', x, y)" @press="$emit('flag', x, y)" class="w-4 h-4 bg-black" >
        <img :src="applyTileImg()" alt="tile">
    </button>
</template>

<style scoped>
img {
    image-rendering: pixelated;
}
</style>
