import { ref, computed } from 'vue';
import { shuffle } from '../utils/shuffle.js';

export function useMemoryGame(cardsData) {
  const showInstructions = ref(true);
  const showGameBoard = ref(false);
  const showWinMessage = ref(false);

  const flippedIndexes = ref([]);
  const matchedIndexes = ref([]);
  const lockBoard = ref(false);

  const totalPairs = cardsData.length;
  const deck = ref([]);

  const showVideoModal = ref(false);
  const currentVideo = ref(null);

  const revealAllStart = ref(false);
  const revealTimerStart = ref(0);
  const revealIntervalStart = ref(null);
  const totalRevealTime = 5;

  const shuffledDeck = computed(() => deck.value);

  function playClockSound() {
    try {
      const sound = new Audio('/sounds/ClockSound.mp3');
      sound.play();
    } catch (e) {
      //
    }
  }

  function getRandomPairs(cardsData, pairCount = 6) {
    const shuffled = [...cardsData].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, pairCount);
  }

  function startGame() {
    showInstructions.value = false;
    showGameBoard.value = true;
    showWinMessage.value = false;

    flippedIndexes.value = [];
    matchedIndexes.value = [];
    lockBoard.value = false;

    const selectedPairs = getRandomPairs(cardsData, 6);
    deck.value = shuffle([...selectedPairs, ...selectedPairs]);
    flippedIndexes.value = deck.value.map((_, i) => i);

    revealAllStart.value = true;
    revealTimerStart.value = totalRevealTime;
    playClockSound();

    clearInterval(revealIntervalStart.value);
    revealIntervalStart.value = setInterval(() => {
      revealTimerStart.value -= 1;
      if (revealTimerStart.value <= 0) {
        revealAllStart.value = false;
        flippedIndexes.value = [];
        clearInterval(revealIntervalStart.value);
      }
    }, 1000);
  }

  function flipCard(index) {
    if (lockBoard.value) return;
    if (flippedIndexes.value.includes(index) || matchedIndexes.value.includes(index)) return;

    flippedIndexes.value.push(index);

    if (flippedIndexes.value.length === 2) {
      lockBoard.value = true;
      checkForMatch();
    }
  }

function checkForMatch() {
  const [firstIndex, secondIndex] = flippedIndexes.value;

  if (deck.value[firstIndex].id === deck.value[secondIndex].id) {
    setTimeout(() => {
      matchedIndexes.value.push(firstIndex, secondIndex);
      flippedIndexes.value = [];
      lockBoard.value = false;

      currentVideo.value = deck.value[firstIndex].video;
      showVideoModal.value = true;

      if (matchedIndexes.value.length === totalPairs * 2) {
        showWinMessage.value = true;
        showGameBoard.value = false;
      }
    }, 5000);
  } else {
    setTimeout(() => {
      flippedIndexes.value = [];
      lockBoard.value = false;
    }, 4000);
  }
}

  function restartGame() {
    showWinMessage.value = false;
    startGame();
  }

  return {
    showInstructions,
    showGameBoard,
    showWinMessage,
    flippedIndexes,
    matchedIndexes,
    deck,
    shuffledDeck,
    showVideoModal,
    currentVideo,
    revealAllStart,
    revealTimerStart,
    totalRevealTime,
    startGame,
    flipCard,
    restartGame,
  };
}
