<template>
  <div class="min-h-full  bg-emerald-50 dark:bg-black dark:text-white transition-all duration-5343A3800">
    <div class="flex">
      <UtilitySideNav
        :class="openNav ? 'left-0' : '-left-full'"
        class="fixed lg:left-0 top-0 lg:w-56 overflow-hidden h-screen transition-all duration-300"
      />
      <div class="lg:ml-[14rem] w-full min-h-screen md:h-auto">
        <div
          class="h-14 px-5 sticky z-30 dark:text-white text-xl top-0 font-medium capitalize bg-white dark:bg-black flex justify-between items-center"
        >
          <div class="md:hidden h-14 -ml-4">
            <!-- <NuxtImg src="/images/logo.png" class="h-full" alt="logo" /> -->
            <p class="text-2xl font-semibold">2FA-Google</p>
          </div>
          <div class="hidden md:block">
            <slot name="navName" />
          </div>
          
          <div class="flex gap-4">
            <UtilityToggleMode />
            <div class="md:block hidden">
              
              <UButton @click="isOpen = true" >
                <Icon name="uim:signout" class="text-red-500 text-2xl" />
              </UButton>
            </div>
            

            <button @click="openNav = !openNav" class="text-light-green dark:text-dark-light-green block md:hidden">
              <Icon name="material-symbols:menu" class="font-bold text-4xl" />
            </button>
          </div>
        </div>
        <div class="mx-auto max-w-7xl w-full h-full text-sm py-10 px-4">
          <slot />
        </div>
      </div>
    </div>

    <UModal v-model="isOpen" :class="'max-w-xs'" :ui="{ width: 'sm:max-w-xs w-11/12 md:w-full', padding: 'sm:py-0 px-0', container: 'flex items-start md:items-center' }">
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-500 dark:divide-gray-500 ', background: 'dark:bg-green', padding: 'px-0' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white jus">
              Are you sure?
            </h3>
          </div>
        </template>

        <div class="flex gap-3 justify-between">
          <UButton color="rose" variant="soft" @click="submit">Logout</UButton>
          <UButton color="cyan" variant="soft" @click="isOpen = false" >Close</UButton>
        </div>
      </UCard>
    </UModal>
  </div>
  <UtilityLoader v-show="store.loader" />
</template>

<script setup>
  const openNav = ref(false)
  const isOpen = ref(false)

  const store = userStore()

  const submit = async()=>{
    isOpen.value = false
    await store.handleLogout()
  }
  onMounted(() => {
    store.handleUser()
  })
</script>

<style>

</style>