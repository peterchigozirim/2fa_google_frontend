<template>
  <div class="h-screen flex justify-center dark:bg-black items-center">
    <div class="space-y-6 overflow-hidden">
      <div class="text-4xl font-Lato">
        Verify Two-Factor Authentication
      </div>
      <div class="max-w-sm mx-auto">
        <form @submit.prevent="verify2FA">
          <div class="space-y-4">
            <div>
              <label class="block">OTP:</label>
              <UInput color="emerald" size="md" v-model="otp" required variant="outline" placeholder="Enter OTP" />
            </div>
            <div>
              <UButton color="emerald" size="md" type="submit" :block="true" variant="outline">Verify OTP</UButton>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>

  definePageMeta({
    middleware: 'auth'
  })

  const store = userStore()
  const toast = useToast()
  const otp = ref('')
  const loader = ref(false);

  const verify2FA = async () => {
  const {data, error, status, pending } = await useApi('api/2fa/verify',{
    method: 'POST',
    body: { otp: otp.value },
    watch : false
  })
  loader.value = pending.value
  if (error.value) {
    return toast.add({
      id: 'error',
      title: 'Something Went Error.',
      color: 'rose',
      description: error.value.data.message,
      icon: 'ph:warning-diamond-fill',
      timeout: 3000,
    })
  }
  if (status.value === 'success') {
    toast.add({
      id: 'success',
      title: 'Successful',
      color: 'emerald',
      description: 'OTP verified successfully',
      icon: 'i:octicon-desktop-download-24',
      timeout: 3000,
    })
    store.faConfirmation = true
    return navigateTo('/dashboard')
  }
}

</script>

<style>

</style>