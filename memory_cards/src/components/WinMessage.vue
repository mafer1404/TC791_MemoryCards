<template>
  <div class="container my-5 d-flex justify-content-center">
    <div class="card p-4 text-center w-100">
      <h2 class="text-success">Congratulations!</h2>
      <p>You’ve found all the matching pairs in the game!</p>
      <button class="btn btn-primary mt-3" @click="$emit('restart')">Play again</button>
    </div>
  </div>
</template>

<style scoped>
  p {
    font-size: 1.3em;
  }
</style >