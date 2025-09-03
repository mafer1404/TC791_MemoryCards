<template>
  <div
    class="col-6 col-sm-4 col-md-3 col-lg-2 d-flex justify-content-center mb-3"
    style="perspective: 1000px;"
  >
    <div
      class="card"
      :class="{ flipped: isFlipped, matched: isMatched }"
      style="width: 230px; height: 190px; cursor: pointer; background-color: #d4f0d4; border: 2px solid #4caf50; border-radius: 8px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.15); position: relative;"
      @click="handleClick"
    >
      <div
        class="card-inner"
        style="width: 100%; height: 100%; position: relative; transition: transform 0.6s; transform-style: preserve-3d;"
      >
      <div
        class="card-front"
        style="width: 100%; height: 100%; position: absolute; backface-visibility: hidden; border-radius: 8px; overflow: hidden;
        transform: rotateY(180deg); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 5px;"
      >
        <img
          :src="`/images/${card.image}`"
          :alt="card.text"
          style="max-width: 200px; max-height: 100px; object-fit: contain; display: block; margin: auto;"
        />
        <p style="margin-top: 4px; font-size: 20px; color: #333; text-align: center;">{{ card.text }}</p>
      </div>
        <div
          class="card-back"
          style=" position: absolute; top: 50%; left: 50%; width: 90%; height: 90%; transform: translate(-50%, -50%); border-radius: 8px;
          backface-visibility: hidden; background-image: url('/images/back.png'); background-size: contain; background-repeat: no-repeat; background-position: center;"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { playSoundSequential } from '../utils/audioQueue';

const props = defineProps({
  card: Object,
  index: Number,
  isFlipped: Boolean,
  isMatched: Boolean,
});

const emit = defineEmits(['flip']);

function handleClick() {
  emit('flip', props.index);
  setTimeout(() => {
    if (props.card.sound) {
      playSoundSequential(`/sounds/${props.card.sound}`);
    }
  }, 1000);
}
</script>

<style scoped>
.card-inner {
  transition: transform 0.6s;
  transform-style: preserve-3d;
  position: relative;
  width: 100%;
  height: 100%;
}
.card.flipped > .card-inner {
  transform: rotateY(180deg);
}
.card.matched {
  visibility: hidden;
}
</style>
