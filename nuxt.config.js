// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@vee-validate/nuxt',
    'nuxt-icon'
  ],
  veeValidate: {
    // disable or enable auto imports
    autoImports: true,
    // Use different names for components
    componentNames: {
      Form: 'VeeForm',
      Field: 'VeeField',
      FieldArray: 'VeeFieldArray',
      ErrorMessage: 'ErrorMessage',
    },
  },
  plugins: [
    { src: '~/plugins/vee-validate' },
  ],
  piniaPersistedstate: {
    cookieOptions: {
      sameSite: 'lax',
    },
  },
  runtimeConfig: {
    // Keys within public, will be also exposed to the client-side
    public: {
      appURL: process.env.APP_URL,
      apiURL: process.env.API_URL,
      localURL: process.env.LOCAL_API_URL,
    }
  },
})