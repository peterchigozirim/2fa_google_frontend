<template>
  <div
    class="fixed bg-emerald-50 z-50 top-0 text-dark-main left-0 w-full min-h-screen flex justify-center items-center"
  >
    <div class="text-center flex flex-col items-center">
      <div>
        <NuxtImg src="/images/loader.svg" class="md:w-24 md:h-24 h-16 w-16 mx-auto" alt="" />
      </div>
      <div class="text-xl text-center">
        <p>Loading ..</p>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
  .bg {
    background: linear-gradient(
        0deg,
        rgba(255, 255, 255, 0.32),
        rgba(255, 255, 255, 0.32)
      ),
      url("/images/guest-bg.jpg");
  }

  .dark .dark\:bg {
    background: linear-gradient(0deg, rgba(35, 40, 38, 0.9) rgba(35, 40, 38, 0.9)),
      url("/images/guest-bg.jpg");
  }
</style>
