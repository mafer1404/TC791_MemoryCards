<template>
  <div class="container my-5 d-flex justify-content-center">
    <div class="card p-4 text-center w-100">
      <h2 class="mb-3" style="color: #219ebc;">Instructions</h2>
      <ol class="text-start mx-auto" style="max-width: 600px;">
        <li>
          Find all the matching pairs of cards that represent elements of the environment, natural resources, values, and community services.
        </li>
        <li>
          You have five seconds to look at the cards, then they will flip over.
        </li>
        <li>
          At any moment, the <span class="badge bg-warning text-dark">Reveal</span> button can be pressed to show all cards again for 5 seconds.
        </li>
        <li>
          Each time a pair is matched, a video will display its importance in nature.
        </li>
        <li>
          When all pairs have been found, a <span class="badge bg-success">Play Again</span> button will appear to restart the game.
        </li>
      </ol>
      <h3 class="mt-4" style="color: #219ebc;">Good luck!</h3>
      <button class="btn btn-success mt-3" @click="handleStart">Start game</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async popSound() {
      try {
        const sound = new Audio('/sounds/PopSound.mp3');
        await sound.play();
      } catch (e) {
        //
      }
    },
    async handleStart() {
      await this.popSound();
      this.$emit('start');
    }
  }
}
</script>