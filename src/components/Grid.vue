<script setup>
import Tile from "../components/Tile.vue"
</script>

<template> 
    <div :style="{ 'grid-template-columns': 'repeat( '+(col+1)+', minmax(0, 1fr))'}" class="grid w-fit">
        <div v-for="(col, x_index) in grid" :key="x_index" class="grid w-fit">
            <div v-for="(state, y_index) in col" :key="y_index" class="grid w-fit">
                <Tile @showTile="changeGrid" :state="state" :x="x_index" :y="y_index"/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            col: 7,
            row: 7,
            bombs: 10,
            grid: [],
        }
    },
    methods: {
        getRandomInt(max) {
            return Math.floor(Math.random() * max);
        },
        createGrid() {
            for (let i = 0; i <= this.col; i++) {
                this.grid[i] = []
                for (let j = 0; j <= this.row; j++) {
                    this.grid[i][j] = false
                }
            }
            this.spreadBomb()
        },
        plantBomb() {
            const col = this.getRandomInt(this.col+1)
            const row = this.getRandomInt(this.row+1)
            if(this.grid[col][row]){
                this.plantBomb()
            }else{
                this.grid[col][row] = true
            }
        },
        spreadBomb() {
            for(let i = 1;i <= this.bombs; i++){
                this.plantBomb()
            }
        },
        changeGrid(x, y) {
            this.grid[x][y] = !this.grid[x][y]
        },
    },   
    mounted() {
        this.createGrid();

    }
}
</script>

<style scoped>
img {
  image-rendering: pixelated;
}
</style>
