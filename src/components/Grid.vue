<script setup>
import Tile from "../components/Tile.vue";
import { onMounted, reactive } from "vue";

const props = defineProps({
    bombs: Number,
    col: Number,
    row: Number,
})

const emit = defineEmits(['play', 'pause', 'flaged', 'unflaged', 'win', 'lose'])

const col = props.col
const row = props.row
const bombs = props.bombs
let game_stop = false
let bomb_count = bombs
const grid = []
let sgrid = reactive([])

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function  plantBomb() {
    const colb = getRandomInt(col+1)
    const rowb = getRandomInt(row+1)
    if(grid[colb][rowb] === 'b'){
        plantBomb()
    }else{
        grid[colb][rowb] = 'b'
    }
}

function spreadBomb() {
    for(let i = 1;i <= bombs; i++){
        plantBomb()
    }
}

function createGrid(array, value) {
    for (let i = 0; i <= col; i++) {
        array[i] = []
        for (let j = 0; j <= row; j++) {
            array[i][j] = value
        }
    }
}

function lookForBombs() {
    let bomb = 0
    for (let i = 0; i <= col; i++) {
        for (let j = 0; j <= row; j++) {
            if(grid[i][j] === 'b') {
                continue
            }
            bomb = 0
            for(let k = -1; k <= 1; k++){
                for(let y = -1; y <= 1; y++){
                    if(k === 0 && y === 0){
                         continue;
                    }
                    let x_pixel = i + k
                    let y_pixel = j + y
                    if(x_pixel > -1 && x_pixel <= col && y_pixel > -1 && y_pixel <= row){
                        if(grid[i+k][j+y] === 'b') {
                            bomb++
                        }
                    }
                }
            }
        grid[i][j] = bomb.toString()
        }
        
    }
}

function gameRules(x, y) {
    emit('play')
    if(game_stop === false){
        if(grid[x][y] === 'b'){
            for (let i = 0; i <= col; i++) {
                for (let j = 0; j <= row; j++) {
                    if(grid[i][j] === 'b' && sgrid[i][j] === 'n'){
                        sgrid[i][j] = 'b'
                    }else if(grid[i][j] !== 'b' && sgrid[i][j] === 'f'){
                        sgrid[i][j] = 'x'
                    }
                }
            }
            sgrid[x][y] = 'bh'
            emit('lose')
            emit('pause')
            game_stop = true
            return
        }else if(grid[x][y] === '0' && sgrid[x][y] !== 'f'){
            sgrid[x][y] = grid[x][y]
            floodfill(x, y)
        }else if(sgrid[x][y] === 'f'){
            bomb_count++
            emit('unflaged')
            sgrid[x][y] = grid[x][y]
            gameRules(x, y)
        }else{
            sgrid[x][y] = grid[x][y]
        }
        checkIfWon()
    }
}

function floodfill(x, y) {
    for(let k = -1; k <= 1; k++){
        for(let j = -1; j <= 1; j++){
            let x_pixel = x + k
            let y_pixel = y + j
            if(x_pixel > -1 && x_pixel <= col && y_pixel > -1 && y_pixel <= row){
                if(grid[x_pixel][y_pixel] !== 'b' && sgrid[x_pixel][y_pixel] === 'n'){
                    gameRules(x_pixel, y_pixel)
                }
            }
        }
    }
}

function flag(x ,y) {
    emit('play')
    if(sgrid[x][y] === 'n' && !game_stop && bomb_count > 0){
        bomb_count--
        sgrid[x][y] = 'f'
        emit('flaged')
    }else if(sgrid[x][y] === 'f' && !game_stop){
        bomb_count++
        sgrid[x][y] = 'n'
        emit('unflaged')
    }
}

function checkIfWon() {
    let aux = 0
    for (let i = 0; i <= col; i++) {
        for (let j = 0; j <= row; j++) {
            if(sgrid[i][j] === 'n' || sgrid[i][j] === 'f'){
                aux++
            }
        }
    }
    if(aux === bombs){
        game_stop = true
        emit('win')
        emit('pause')
        for (let i = 0; i <= col; i++) {
            for (let j = 0; j <= row; j++) {
                if(sgrid[i][j] === 'n' && grid[i][j] === 'b'){
                    sgrid[i][j] = 'f'
                }
            }
        }
    }
}

function gameInit() {
    game_stop = false
    bomb_count = bombs
    createGrid(sgrid, 'n')
    createGrid(grid, '0')
    spreadBomb()
    lookForBombs()
}

defineExpose({
    gameInit,
})

onMounted(() => {
    gameInit()
})

</script>

<template> 
    <div :style="{ 'grid-template-columns': 'repeat( '+(col+1)+', minmax(0, 1fr))'}" class="grid w-fit">
        <div v-for="(column, x_index) in sgrid" :key="x_index" class="grid w-fit">
            <div v-for="(state, y_index) in column" :key="y_index" class="grid w-fit">
                <Tile @showTile="gameRules" @flag="flag" :tile="state" :x="x_index" :y="y_index"/>
            </div>
        </div>
    </div>
</template>

<style scoped>
img {
  image-rendering: pixelated;
}
</style>
