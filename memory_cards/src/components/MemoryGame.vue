<template>
  <div>
    <HeaderHomePage />
  </div>
  <div>
    <Instructions v-if="showInstructions" @start="startGame" />
    <div v-if="showGameBoard" class="container">
      <div class="row justify-content-center g-1 mb-3">
        <Card
          v-for="(card, index) in shuffledDeck.slice(0, 6)"
          :key="index"
          :card="card"
          :index="index"
          :isFlipped="isFlipped(index)"
          :isMatched="matchedIndexes.includes(index)"
          @flip="flipCard"
          class="col-2 d-flex justify-content-center"
        />
      </div>
      <div class="row justify-content-center g-1">
        <Card
          v-for="(card, index) in shuffledDeck.slice(6, 12)"
          :key="index + 6"
          :card="card"
          :index="index + 6"
          :isFlipped="isFlipped(index + 6)"
          :isMatched="matchedIndexes.includes(index + 6)"
          @flip="flipCard"
          class="col-2 d-flex justify-content-center"
        />
      </div>
    </div>
    <div v-if="showGameBoard" class="text-center my-4">
      <button @click="revealTemporarily" class="btn btn-warning">
        Need a hint? Reveal all cards for 5 seconds!
      </button>
    </div>

    <div v-if="revealAllStart" class="progress-container">
      <div class="progress-bar" :style="{ width: ((revealTimerStart / totalRevealTime) * 100) + '%' }"></div>
      <span class="progress-text">{{ revealTimerStart }}s</span>
    </div>

    <div v-if="revealAll" class="progress-container">
      <div class="progress-bar" :style="{ width: (revealTimer * 20) + '%' }"></div>
      <span class="progress-text">{{ revealTimer }}s</span>
    </div>

    <div v-if="showVideoModal" class="modal-backdrop">
      <div class="modal-content">
        <video :src="`/videos/${currentVideo}`" controls autoplay></video>
        <button @click="closeVideoModal" class="btn btn-success">Close</button>
      </div>
    </div>
    <WinMessage v-if="showWinMessage" @restart="restartGame" />
  </div>
  <CreditsFooter />
</template>

<script setup>
import Instructions from './GameInstructions.vue';
import Card from './MemoryCard.vue';
import WinMessage from './WinMessage.vue';
import HeaderHomePage from "./LogoHeader.vue";
import CreditsFooter from "./Credits.vue";
import { cardsData } from '../data/cardsData.js';
import { useMemoryGame } from '../composables/UseMemoryGame.js';
import { ref } from 'vue';
const revealTimer = ref(0);
const revealInterval = ref(null);
const revealAll = ref(false);

const {
  showInstructions,
  showGameBoard,
  showWinMessage,
  flippedIndexes,
  matchedIndexes,
  shuffledDeck,
  showVideoModal,
  currentVideo,
  revealAllStart,   
  revealTimerStart, 
  totalRevealTime,
  startGame,
  flipCard,
  restartGame
} = useMemoryGame(cardsData);

function playClockSound() {
  try {
    const sound = new Audio('/sounds/ClockSound.mp3');
    sound.play();
  } catch (e) {
    //
  }
}

async function revealTemporarily() {
  try {
    const sound = new Audio('/sounds/PopSound.mp3');
    await sound.play();
  } catch (e) {
    //
  }
  playClockSound();
  revealAll.value = true;
  revealTimer.value = 5;
  clearInterval(revealInterval.value);
  revealInterval.value = setInterval(() => {
    revealTimer.value -= 1;
    if (revealTimer.value <= 0) {
      revealAll.value = false;
      clearInterval(revealInterval.value);
    }
  }, 1000);
}

function isFlipped(index) {
  return flippedIndexes.value.includes(index) ||
  matchedIndexes.value.includes(index) || revealAll.value;
}

function closeVideoModal() {
  showVideoModal.value = false;
  if (matchedIndexes.value.length === shuffledDeck.value.length) {
    showWinMessage.value = true;
    showGameBoard.value = false;
  }
}

</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-content {
  background: #fff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1000px;
  max-width: 90vw;
}

.modal-content video {
  width: 820px;
  height: 640px;
  border-radius: 8px;
  background: #000;
  margin-bottom: 16px;
}
.progress-container {
  width: 100%;
  max-width: 400px;
  margin: 0 auto 16px auto;
  position: relative;
  height: 32px;
  background: #eee;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.progress-bar {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background: #ffc107;
  transition: width 1s linear;
  z-index: 1;
}
.progress-text {
  position: relative;
  z-index: 2;
  font-weight: bold;
  color: #333;
}
</style>
