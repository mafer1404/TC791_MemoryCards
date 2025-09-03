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
  startGame,
  flipCard,
  restartGame
} = useMemoryGame(cardsData);

function revealTemporarily() {
  revealAll.value = true;
  setTimeout(() => {
    revealAll.value = false;
  }, 5000);
}

function isFlipped(index) {
  return flippedIndexes.value.includes(index) || matchedIndexes.value.includes(index) || revealAll.value;
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
</style>
