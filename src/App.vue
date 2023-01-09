<script setup>
import Grid from './components/Grid.vue';
</script>

<template>
	<div class="flex justify-center h-screen">
		<div class="flex flex-col justify-center">
			<div id="window" class="flex flex-col w-fit h-fit shadow-window bg-gray-win p-px">
				<div id="win-header" class="flex bg-blue-win p-px justify-between">
					<div class="flex">
						<div id="icon" class="flex justify-center">
							<img src="src/assets/img/Icon.png" alt="mine-icon" class="w-4 h-4 m-auto">
						</div>
						<p class="text-white text-smallest self-center font-retrobold ml-0.5 first-letter:mr-px tracking-wide">Minesweeper</p>
					</div>
					<div class="flex">
						<div class="flex ml-[5px]">
							<button><img src="src/assets/img/minimize.png" alt="minimize-icon" class="w-4 h-3.5"></button>
							<button><img src="src/assets/img/maximize.png" alt="maximize-icon" class="w-4 h-3.5"></button>
						</div>
						<button><img src="src/assets/img/close.png" alt="close-icon" class="w-4 h-3.5 ml-0.5"></button>
					</div>
				</div>
				<div id="win-buttons" class="flex mb-px">
					<button class="text-xs font-retro first-letter:underline ml-2">Game</button>
					<button class="text-xs font-retro first-letter:underline ml-3">Help</button>
				</div>
				<div id="game-window" class="flex flex-col w-fit h-fit self-center">
					<div id="top" class="flex w-full h-[3px] bg-white justify-end">
						<img src="src/assets/img/side-win.png" alt="side-shadow" class="w-[3px] h-[3px]">
					</div>
					<div id="middle" class="flex">
						<div id="right" class="w-[3px] h-full bg-white"></div>
						<div id="game-box" class="flex flex-col bg-gray-win">
							<div id="game-header" class="flex flex-col m-1.5 mb-0">
								<div id="top" class="flex w-full h-0.5 bg-dark-gray-win justify-end">
									<img src="src/assets/img/lside-win.png" alt="lside-shadow" class="h-0.5 w-0.5">
								</div>
								<div id="middle" class="flex">
									<div id="right" class="w-0.5 h-full bg-dark-gray-win"></div>
									<div id="display" class="flex justify-around w-full">
										<div id="left-diplay" class="w-[41px] h-[25px] bg-display my-1"></div>
										<button><img src="src/assets/img/happy-face.png" alt="face-button" class="mt-px"></button>
										<div id="left-right" class="w-[41px] h-[25px] bg-display my-1"></div>
									</div>
									<div id="left" class="w-0.5 h-full bg-white"></div>
								</div>
								<div id="bottom" class="w-full h-0.5 bg-white">
									<img src="src/assets/img/lside-win.png" alt="lside-shadow" class="h-0.5 w-0.5">
								</div>
							</div>
							<div id="game-body" class="flex flex-col m-1.5">
								<div id="top" class="flex w-full h-[3px] bg-dark-gray-win justify-end">
									<img src="src/assets/img/side-win.png" alt="side-shadow" class="w-[3px] h-[3px] rotate-180">
								</div>
								<div id="middle" class="flex">
									<div id="right" class="w-[3px] h-full bg-dark-gray-win"></div>
									<Grid></Grid>
									<div id="left" class="w-[3px] h-full bg-white"></div>
								</div>
								<div id="bottom" class="w-full h-[3px] bg-white">
									<img src="src/assets/img/side-win.png" alt="side-shadow" class="w-[3px] h-[3px] rotate-180">
								</div>
							</div>
						</div>
						<div id="left" class="w-[3px] h-full bg-dark-gray-win"></div>
					</div>
					<div id="bottom" class="w-full h-[3px] bg-dark-gray-win" >
						<img src="src/assets/img/side-win.png" alt="side-shadow" class="w-[3px] h-[3px]">
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
div, img {
  image-rendering: pixelated;
}
</style>
