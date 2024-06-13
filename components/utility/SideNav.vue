<template>
  <div class="max-h-screen bg-emerald-800 py-6">
    <div class="w-9/12 ml-auto h-screen space-y-10">
      <div>
        <!-- <NuxtImg src="/images/logo.png" class="h-28" alt="logo" /> -->
        <p class="text-2xl font-semibold">2FA Google</p>
      </div>

      <div class="h-full overflow-y-scroll">
        <ul class="text-sm h-full text-gray-200 space-y-8">
          <li>
            <NuxtLink
              to="/dashboard"
              active-class="text-yellow-eye font-semibold"
              class="flex justify-between text-white"
            >
              <div>Dashboard</div>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/dashboard/2fa"
              active-class="text-yellow-eye font-semibold"
              class="flex justify-between"
            >
              <div>Setup</div>
              <div
                v-if="$route.path === '/dashboard/2fa'"
                class="w-1.5 h-6 bg-yellow-eye"
              ></div>
            </NuxtLink>
          </li> 
          
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

