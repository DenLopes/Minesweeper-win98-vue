<script setup>
import { onMounted, ref } from 'vue';
import Grid from './components/Grid.vue';
import Menu from './components/Menu.vue';

let bArray = []
let tArray = []
let time = 0
let bombs = 10
let col = 7
let row = 7
let gameStop = false
let bomb_count = bombs
let interval 
const fromChild = ref()
const gridKey = ref(0)
const faceState = ref('')
const active = ref(false)
const ldArray = ref([])
const rdArray = ref([])

const numberToStringArray = (number) => {
	number = number.toString().split('')
	return number
}

const createDisplayUrlArray = (number ,array, sarray) => {
	array = numberToStringArray(number)
	if(array.length > 3){
		return
	}else{
		// add 0s to the front of the array
		if(array.length < 2){
		array.unshift('0', '0')
		}else if(array.length < 3){
		array.unshift('0')
		}
		for(let i = 0;i < array.length; i++){
			switch(array[i]){
			case '0':
            sarray[i] = new URL (`../src/assets/img/0-info.png`, import.meta.url)
            break
			case '1':
            sarray[i] = new URL (`../src/assets/img/1-info.png`, import.meta.url)
            break
			case '2':
            sarray[i] = new URL (`../src/assets/img/2-info.png`, import.meta.url)
            break
			case '3':
            sarray[i] = new URL (`../src/assets/img/3-info.png`, import.meta.url)
            break
			case '4':
            sarray[i] = new URL (`../src/assets/img/4-info.png`, import.meta.url)
            break
			case '5':
            sarray[i] = new URL (`../src/assets/img/5-info.png`, import.meta.url)
            break
			case '6':
            sarray[i] = new URL (`../src/assets/img/6-info.png`, import.meta.url)
            break
			case '7':
            sarray[i] = new URL (`../src/assets/img/7-info.png`, import.meta.url)
            break
			case '8':
            sarray[i] = new URL (`../src/assets/img/8-info.png`, import.meta.url)
            break
			case '9':
            sarray[i] = new URL (`../src/assets/img/9-info.png`, import.meta.url)
            break
			}
		}
	}
}

const gameWon = () => {
	faceState.value = "won"
	gameStop = true
	bomb_count = 0
	createDisplayUrlArray(bombs, bArray, ldArray.value)
}

const gameLost = () => {
	faceState.value = 'lost'
	gameStop = true
}

const mouseDown = () => {
	if(gameStop === false){
		faceState.value = 'o-o'
	}
}

const mouseUp = () => {
	if(gameStop === false){
		faceState.value = ''
	}
}

const faceClick = () => {
	faceState.value = 'click'
}

const faceUnClick = () => {
	faceState.value = ''
}

const changeFace = () => {
	switch(faceState.value){
		case 'won':
		return new URL ('../src/assets/img/chill-face.png', import.meta.url)
		case 'lost':
		return new URL ('../src/assets/img/dead-face.png', import.meta.url)
		case 'o-o':
		return new URL ('../src/assets/img/o-o-face.png', import.meta.url)
		case 'click':
		return new URL ('../src/assets/img/happy-face-clicked.png', import.meta.url)
		default:
		return new URL ('../src/assets/img/happy-face.png', import.meta.url)
	}
}

const updateTime = () => {
	time++
	createDisplayUrlArray(time, tArray, rdArray.value)
}
const listenPlay = () => {
	updateTime()
	return interval = setInterval(() => updateTime(), 1000)
}
const listenPause = () => {
	return clearInterval(interval)
}

const listenInflag = () => {
	bomb_count--
	createDisplayUrlArray(bomb_count, bArray, ldArray.value)
}
const listenOutflag = () => {
	bomb_count++
	createDisplayUrlArray(bomb_count, bArray, ldArray.value)
}

const toggleMenu = () => {
	active.value = !active.value
}

const difficulty = (dif) => {
	switch(dif){
		case 'hard':
			col = 23
			row = 23
			bombs = 99
			reloadGrid()
			break
		case 'inter':
			col = 15
			row = 15
			bombs = 40
			reloadGrid()
			break
		default:
			col = 7
			row = 7
			bombs = 10
			reloadGrid()
	}
}

const reloadGrid = () => {
	faceState.value = ''
	gameStop = false
	time = 0
	bomb_count = bombs
	gridKey.value++
	fromChild.value.gameInit()
	listenPause()
	createDisplayUrlArray(bombs, bArray, ldArray.value)
	createDisplayUrlArray(time, tArray, rdArray.value)
}

onMounted(() => {
	createDisplayUrlArray(bombs, bArray, ldArray.value)
	createDisplayUrlArray(time, tArray, rdArray.value)
})

</script>

<template>
	<div class="flex justify-center h-screen">
		<div class="flex flex-col justify-center">
			<div id="window" class="flex flex-col w-fit h-fit shadow-window bg-gray-win p-px scale-100">
				<div id="win-header" class="flex bg-blue-win p-px justify-between">
					<div class="flex">
						<div id="icon" class="flex justify-center">
							<img src="../src/assets/img/Icon.png" alt="mine-icon" class="w-4 h-4 m-auto">
						</div>
						<p class="text-white text-smallest self-center font-retrobold ml-0.5 first-letter:mr-px tracking-wide">Minesweeper</p>
					</div>
					<div class="flex">
						<div class="flex ml-[5px]">
							<button><img src="../src/assets/img/minimize.png" alt="minimize-icon" class="w-4 h-3.5"></button>
							<button><img src="../src/assets/img/maximize.png" alt="maximize-icon" class="w-4 h-3.5"></button>
						</div>
						<button><img src="../src/assets/img/close.png" alt="close-icon" class="w-4 h-3.5 ml-0.5"></button>
					</div>
				</div>
				<div id="win-buttons" class="relative flex mb-px">
					<button @click.stop="toggleMenu()" class="text-xs font-retro first-letter:underline ml-0.5 px-1.5 mt-0.5" :class="active ? 'shadow-in': ''">Game</button>
					<Menu 
					@click.stop="toggleMenu()"
					@newgame="reloadGrid()"
					@dif="difficulty" 
					v-show="active" 
					class="absolute top-[21px] left-0.5">
					</Menu>
					<button class="text-xs font-retro first-letter:underline ml-0.5 px-1.5 mt-0.5">Help</button>
				</div>
				<div id="game-window" class="flex flex-col w-fit h-fit self-center">
					<div id="top" class="flex w-full h-[3px] bg-white justify-end">
						<img src="../src/assets/img/side-win.png" alt="side-shadow" class="w-[3px] h-[3px]">
					</div>
					<div id="middle" class="flex">
						<div id="right" class="w-[3px] bg-white"></div>
						<div id="game-box" class="flex flex-col bg-gray-win">
							<div id="game-header" class="flex flex-col m-1.5 mb-0">
								<div id="top" class="flex w-full h-0.5 bg-dark-gray-win justify-end">
									<img src="../src/assets/img/lside-win.png" alt="lside-shadow" class="h-0.5 w-0.5">
								</div>
								<div id="middle" class="flex">
									<div id="right" class="w-0.5 bg-dark-gray-win"></div>
									<div id="display" class="flex justify-between w-full">
										<div id="left-diplay" class="flex w-[41px] h-[25px] bg-display my-1 ml-1.5 p-px">
											<img :src="image" v-for="image in ldArray" class="w-[13px] h-[23px]">
										</div>
										<button @click="reloadGrid()" >
											<img 
											:src="changeFace()" 
											@mousedown.left="faceClick()" 
											@mouseup.left="faceUnClick()" 
											@touchstart="faceClick()"
											@touchend="faceUnClick()" alt="face-button" class="mt-px">
										</button>
										<div id="left-right" class="flex w-[41px] h-[25px] bg-display my-1 mr-1.5 p-px">
											<img :src="image" v-for="image in rdArray" class="w-[13px] h-[23px]">
										</div>
									</div>
									<div id="left" class="w-0.5 bg-white"></div>
								</div>
								<div id="bottom" class="w-full h-0.5 bg-white">
									<img src="../src/assets/img/lside-win.png" alt="lside-shadow" class="h-0.5 w-0.5">
								</div>
							</div>
							<div id="game-body" class="flex flex-col m-1.5">
								<div id="top" class="flex w-full h-[3px] bg-dark-gray-win justify-end">
									<img src="../src/assets/img/side-win.png" alt="side-shadow" class="w-[3px] h-[3px] rotate-180">
								</div>
								<div id="middle" class="flex">
									<div id="right" class="w-[3px] bg-dark-gray-win"></div>
									<Grid 
									:bombs="bombs" 
									:col="col" 
									:row="row"
									:key="gridKey"
									ref="fromChild" 
									@play.once="listenPlay" 
									@pause.once="listenPause" 
									@flaged="listenInflag" 
									@unflaged="listenOutflag"
									@win="gameWon"
									@lose="gameLost"
									@gameInit="reloadGrid"
									@mousedown.left="mouseDown"
									@mouseup.left="mouseUp"
									@touchstart="mouseDown"
									@touchend="mouseUp"
									/>
									<div id="left" class="w-[3px] bg-white"></div>
								</div>
								<div id="bottom" class="w-full h-[3px] bg-white">
									<img src="../src/assets/img/side-win.png" alt="side-shadow" class="w-[3px] h-[3px] rotate-180">
								</div>
							</div>
						</div>
						<div id="left" class="w-[3px] bg-dark-gray-win"></div>
					</div>
					<div id="bottom" class="w-full h-[3px] bg-dark-gray-win" >
						<img src="../src/assets/img/side-win.png" alt="side-shadow" class="w-[3px] h-[3px]">
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
div, img {
  image-rendering: pixelated;
  user-select: none;
}
</style>
