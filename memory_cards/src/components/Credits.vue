<template>
  <div class="container my-5 d-flex justify-content-center">
    <div class="border rounded shadow p-3 d-flex justify-content-center
      align-items-center gap-3 w-100 flex-wrap">
      <img
        :src="`/images/CreditsMafer.jpg`"
        alt="Foto de perfil"
        class="rounded-circle me-3"
        style="width: 60px; height: 60px; object-fit: cover;"
      />
      
      <p class="mb-0 align-self-center">
        Créditos: María Fernanda Herrera Gutiérrez</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CreditsFooter'
  }
</script>