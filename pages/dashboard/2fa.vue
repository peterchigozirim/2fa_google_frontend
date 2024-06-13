<template>
  <NuxtLayout :name="layout">	
    <template #navName>
      <div>Dashboard</div>
    </template>

    <div class="h-full flex justify-center">
      <div class="max-w-sm mx-auto space-y-6">
        <div class="text-lg font-bold">
          <p>TWO-FACTOR AUTHENTICATION</p>
          <hr />
        </div>
        <div v-if="inlineUrl">
          <NuxtImg :src="inlineUrl" alt="QR Code" class="mx-auto" />
          <p>Secret: {{ secret }}</p>
          <form @submit.prevent="enable2FA" class="space-y-4">
            <div>
              <label for="otp">OTP</label>
              <UInput color="primary" v-model="otp" id="otp" variant="outline" placeholder="OTP..." />
            </div>
            <UButton color="primary" type="submit" variant="outline">Enable 2FA</UButton>
          </form>
        </div>
        <div class="text-center flex gap-2 items-center">
          <p>Enable two-factor-google-authenticatiom</p>
          <UToggle
            on-icon="i-heroicons-check-20-solid"
            off-icon="i-heroicons-x-mark-20-solid"
            color="primary"
            v-model="selected"
            @change="setUp"
            :ui="{active: 'bg-emerald-500 dark:bg-emerald-400'}"
          />
        </div>
        <div>
          
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
  definePageMeta({
    middleware: 'auth'
  })
  const store = userStore()
  const layout = 'auth'
  const toast = useToast()
  const selected = ref(false)
  const loader =ref(false)
  const secret = ref('')
  const inlineUrl = ref('')
  const otp = ref('')

  onMounted(() => {
    selected.value = store.user.google2fa_enabled? true : false
  })

  const setUp = async ()=>{
    if(selected.value == true){
      loader.value = true;
      const {data, error, status, pending} = await useApi('api/2fa/setup',{
        method: "POST",
        watch: false,
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
        store.handleUser()
        secret.value = await data.value.secret
        inlineUrl.value = await data.value.inlineUrl
        toast.add({
          id: 'success',
          title: 'Successful',
          color: 'emerald',
          description: data.value.message,
          icon: 'i:octicon-desktop-download-24',
          timeout: 3000,
        })
      } 
    }else if (store.faConfirmation) {
      loader.value = true;
      const {data, error, status, pending} = await useApi('api/2fa/disable',{
        method: "POST",
        watch: false,
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
        store.handleUser()
        secret.value = await data.value.secret
        inlineUrl.value = await data.value.inlineUrl
        toast.add({
          id: 'success',
          title: 'Successful',
          color: 'emerald',
          description: data.value.message,
          icon: 'i:octicon-desktop-download-24',
          timeout: 3000,
        })
      } 
    }
    else{
      inlineUrl.value = ''
      secret.value = ''
    }
  }

  const enable2FA = async () => {
    loader.value = true 
    let form = new FormData()
    form.append('secret', secret.value)
    form.append('otp', otp.value)
    const {data, error, status, pending } = await useApi('api/2fa/enable',{
      method: 'POST',
      body: form,
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
      console.log(data.value);
      secret.value = await data.value.secret
      inlineUrl.value = await data.value.inlineUrl
      toast.add({
        id: 'success',
        title: 'Successful',
        color: 'emerald',
        description: 'Two-Factor Authentication Enable',
        icon: 'i:octicon-desktop-download-24',
        timeout: 3000,
      })
    }
  }


</script>

<style>

</style>