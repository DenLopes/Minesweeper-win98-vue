<script setup>
import { ref } from 'vue';

const emit = defineEmits(['dif', 'newgame'])

const selected = ref('')

const difficulty = (dif) => {
	switch(dif){
		case 'hard':
            selected.value = 'hard'
            emit('dif', 'hard')
			break
		case 'inter':
            selected.value = 'inter'
            emit('dif', 'inter')
			break
		default:
            selected.value = ''
            emit('dif', '')
	}

}

</script>

<template>
    <div class="flex w-37 h-fit bg-gray-win shadow-window z-10 p-px">
        <div id="menu" class="flex flex-col w-full text-xs tracking-wide font-retro leading-normal">
            <div id="new-game" class="hover:bg-blue-win hover:text-white">
                <div @click="emit('newgame')" class="flex justify-between pb-0.5">
                    <p class="ml-[21px] py-px first-letter:underline">New</p>
                    <p class="mr-[23px] py-px">F2</p>
                </div>
            </div>
            <div class="px-px">
                <div class="border-b border-dark-gray-win"></div>
                <div class="border-b border-white"></div>
            </div>
            <div id="begginer-difficulty" @click="difficulty('')" class="hover:bg-blue-win">
                <div class="flex h-full w-full hover:invert">
                    <div class="flex w-[21px]">
                        <img v-if="selected === ''" class="w-[7px] h-[7px] m-auto" src="../assets/img/select.png" alt="">
                    </div>
                    <p class="py-0.5 first-letter:underline">Begginer</p>
                </div>
            </div>
            <div id="intermediate-difficulty" @click="difficulty('inter')" class="hover:bg-blue-win">
                <div class="flex h-full w-full hover:invert">              
                    <div class="flex w-[21px]">
                        <img v-if="selected === 'inter'" class="w-[7px] h-[7px] m-auto" src="../assets/img/select.png" alt="">
                    </div>
                    <p class="py-0.5 first-letter:underline">Intermediate</p>
                </div>
            </div>
            <div id="hard-difficulty" @click="difficulty('hard')" class="flex hover:bg-blue-win">
                <div class="flex h-full w-full hover:invert">  
                    <div class="flex w-[21px]">
                        <img v-if="selected === 'hard'" class="w-[7px] h-[7px] m-auto" src="../assets/img/select.png" alt="">
                    </div>
                    <p class="py-0.5 first-letter:underline">Expert</p>
                </div>
            </div>
            <div id="custom-grid" class="flex hover:bg-blue-win hover:text-white">
                <p class="ml-[21px] py-0.5 first-letter:underline">Custom...</p>
            </div>
            <div class="px-px">
                <div class="border-b border-dark-gray-win"></div>
                <div class="border-b border-white"></div>
            </div>
            <div id="marks" class="hover:bg-blue-win">
                <div class="flex h-full w-full hover:invert">  
                    <p class="ml-[21px] py-0.5 first-letter:underline">Marks(?)</p>
                </div>
            </div>
            <div id="colors" class="hover:bg-blue-win">
                <div class="flex h-full w-full hover:invert">  
                    <div class="flex w-[21px]">
                        <img class="w-[7px] h-[7px] m-auto" src="../assets/img/select.png" alt="">
                    </div>
                    <p class="py-0.5">Co<span class="underline">l</span>or</p>
                </div>
            </div>
            <div class="px-px">
                <div class="border-b border-dark-gray-win"></div>
                <div class="border-b border-white"></div>
            </div>
            <div id="best-times" class="hover:bg-blue-win hover:text-white">
                <p class="ml-[21px] py-1">Best <span class="underline">T</span>imes...</p>
            </div>
            <div class="px-px">
                <div class="border-b border-dark-gray-win"></div>
                <div class="border-b border-white"></div>
            </div>
            <div id="exit" class="hover:bg-blue-win hover:text-white">
                <p class="ml-[21px] py-0.5">Exit</p>
            </div>
        </div>
    </div>
</template>