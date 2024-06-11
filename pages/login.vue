<template>
  <NuxtLayout>
    <div class="max-w-md mx-auto h-screen flex flex-col justify-center">
      <div class="text-2xl text-center mb-10 font-bold">
        <p>Sign in</p>
      </div>
      <div class="w-full">
        <VeeForm :validation-schema="schema" @submit="submit">        
          <div class="w-full text-auth-text dark:text-white mb-5">
            <label class="block font-medium mb-1"> Email Address</label>
            <VeeField
              type="email"
              name="email"
              placeholder="Enter Email Address"
              required
              class="bg-btn-green/25 px-3 dark:border-auth-icon border-btn-green border rounded-md h-10 w-full outline-btn-green/70 ring-0"
            />
            <ErrorMessage
              class="text-red-600 text-xs first-letter:capitalize"
              name="email"
            />
          </div>
          <div class="w-full text-auth-text dark:text-white mb-10">
            <label class="block font-medium mb-1">Password</label>
            <div class="relative">
              <VeeField
                :type="showPass ? 'text' : 'password'"
                name="password"
                placeholder="Enter Password"
                required
                class="bg-btn-green/25 dark:border-auth-icon border-btn-green border px-3 rounded-md h-10 w-full outline-btn-green/70 ring-0"
              />
              <div
                class="absolute top-2 right-2 cursor-pointer"
                @click="showPass = !showPass"
              >
                <Icon
                  v-if="showPass"
                  name="ri:eye-fill"
                  class=" text-btn-green dark:text-auth-icon text-xl"
                />
                <Icon
                  v-else
                  name="ri:eye-off-fill"
                  class="text-btn-green dark:text-auth-icon text-xl"
                />
              </div>
            </div>
            <ErrorMessage
              class="text-red-600 text-xs first-letter:capitalize"
              name="password"
            />
          </div>
          <div class="mb-4">
            <button class="h-10 w-full block bg-black bg- text-white rounded-md">
              Sign In
            </button>
          </div>
        </VeeForm>
        
      </div>
    </div>
    <!-- <UtilityLoader v-show="store.loader" /> -->
  </NuxtLayout>
</template>

<script setup>
  const store = userStore();
  definePageMeta({
    middleware: 'auth'
  })


  const showPass = ref(false);

  const schema = {
    email: "required|email",
    password: "required|min:6",
  };

  const submit = async(values, {resetForm})=>{
    await store.handleLogin(values)
    // resetForm()
  }
</script>

<style>

</style>