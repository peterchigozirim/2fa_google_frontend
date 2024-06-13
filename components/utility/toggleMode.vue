<template>
  <div @click="toggle('dark')" class="cursor-pointer hidden text-yellow dark:block">
    <icon  name="ph:moon-stars" class="text-lg"/>
  </div>
  <div @click="toggle('light')" class="cursor-pointer dark:hidden">
    <icon else name="material-symbols:light-mode" class="text-lg"/>
  </div>
</template>

<script setup>
  const colorMode = useColorMode()
  const toggle = () => {
    if (colorMode.value === 'dark') {
      colorMode.preference = 'light'
    }else{
      colorMode.preference = 'dark'
    }
  }
</script>