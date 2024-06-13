<template>
  <NuxtLayout :name="layout">	
    <template #navName>
      <div>Dashboard</div>
    </template>

    <div class="grid  overflow-hidden">
      Dashboard
    </div>
  </NuxtLayout>
</template>

<script setup>

  definePageMeta({
    middleware: 'auth'
  })

  const layout = 'auth'

</script>

<style>

</style>