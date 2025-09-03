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

  const shuffledDeck = computed(() => deck.value);

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

    setTimeout(() => {
      flippedIndexes.value = [];
    }, 5000);
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

      // Mostrar el modal después de que las cartas desaparecen
      currentVideo.value = deck.value[firstIndex].video;
      showVideoModal.value = true;

      if (matchedIndexes.value.length === totalPairs * 2) {
        showWinMessage.value = true;
        showGameBoard.value = false;
      }
    }, 3000);
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
    startGame,
    flipCard,
    restartGame,
  };
}
