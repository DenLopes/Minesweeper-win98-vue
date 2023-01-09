<script setup>
import Tile from "../components/Tile.vue"
import { onMounted, reactive } from "vue";

const col = 7
const row = 7
const bombs = 10
let grid = reactive([])

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function  plantBomb() {
    const colb = getRandomInt(col+1)
    const rowb = getRandomInt(row+1)
    if(grid[colb][rowb]){
        plantBomb()
    }else{
        grid[colb][rowb] = true
    }
}
function spreadBomb() {
    for(let i = 1;i <= bombs; i++){
        plantBomb()
    }
}
function createGrid() {
    for (let i = 0; i <= col; i++) {
        grid[i] = []
        for (let j = 0; j <= row; j++) {
            grid[i][j] = false
        }
    }
    spreadBomb()
}
function changeGrid(x, y) {
    grid[x][y] = !grid[x][y]
}

onMounted(() => {
   createGrid()
})


</script>

<template> 
    <div :style="{ 'grid-template-columns': 'repeat( '+(col+1)+', minmax(0, 1fr))'}" class="grid w-fit">
        <div v-for="(column, x_index) in grid" :key="x_index" class="grid w-fit">
            <div v-for="(state, y_index) in column" :key="y_index" class="grid w-fit">
                <Tile @showTile="changeGrid" :state="state" :x="x_index" :y="y_index"/>
            </div>
        </div>
    </div>
</template>

<style scoped>
img {
  image-rendering: pixelated;
}
</style>
