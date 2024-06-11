import { defineStore } from 'pinia'
import { useApi } from '~/composables/api';

export const userStore = defineStore('user', ()=>{
  const user = ref(null)
  const loader = ref(false);
  const msg = ref(null);
  const toast = useToast()
  
  const isLoginedIn = computed(() => !!user.value)

  const handleLogin = async (credentials)=>{
    loader.value = true;
    await useApi("sanctum/csrf-cookie")
    const {data, error, status, pending} = await useApi('api/login',{
      method: "POST",
      body: credentials,
      watch: false,
    })
    
    if (error.value) {
      loader.value = pending.value
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
      user.value = await data.value.user
      let token = await data.value.token
      localStorage.setItem('token', token)
      toast.add({
        id: 'success',
        title: 'Successful',
        color: 'emerald',
        description: data.value.message,
        icon: 'i:octicon-desktop-download-24',
        timeout: 3000,
      })
      loader.value = pending.value
      return navigateTo('/dashboard', {replace: true})
    }
  }

  const handleRegister = async (credentials)=>{
    loader.value = true;
    await useApi("sanctum/csrf-cookie")
    const {data, error, status, pending} = await useApi('api/register',{
      method: "POST",
      body: credentials,
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
      user.value = await data.value.user
      let token = await data.value.token
      localStorage.setItem('token', token)
      toast.add({
        id: 'success',
        title: 'Successful',
        color: 'emerald',
        description: data.value.message,
        icon: 'i:octicon-desktop-download-24',
        timeout: 3000,
      })
      return navigateTo('/dashboard', {replace: true})
    }
  }

  const handleUser = async()=>{
    const {data, error, status, pending} = await useApi('api/user')
    
    if (error.value) {
      user.value = null
      toast.add({
        id: 'error',
        title: 'Session Expire',
        color: 'rose',
        description: error.value.statusMessage,
        icon: 'ph:warning-diamond-fill',
        timeout: 3000,
      })
      if(error.value.statusCode === 401 || error.value.statusCode === 405) {
        return resetUser();
      }
      return navigateTo('/login')

    }
    if (status.value ==='success') {
      user.value = data.value
    }
  }

  const handlegetOtp = async(email)=>{
    loader.value = true;
    const {data, error, status, pending} = await useApi('api/get-otp',{
      method: "POST",
      body: email,
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

  const handleForgetPassword = async(form)=>{
    loader.value = true;
    const {data, error, status, pending} = await useApi('api/forget-password',{
      method: "POST",
      body: form,
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
      toast.add({
        id: 'success',
        title: 'Successful',
        color: 'emerald',
        description: data.value.message,
        icon: 'i:octicon-desktop-download-24',
        timeout: 3000,
      })
      return navigateTo('/login', {replace: true})
    }
  }

  const handleLogout = async()=>{
    const token = useCookie("XSRF-TOKEN");
    const session = useCookie("laravel_session");
    localStorage.removeItem('token')
    session.value = null
    token.value = null
    user.value = null
    isLoginedIn.value = false
    toast.add({
      id: 'logout',
      title: 'Successful',
      color: 'cyan',
      description: 'Logout Success',
      icon: 'i:octicon-desktop-download-24',
      timeout: 3000,
    })
    return navigateTo("/login")
  }

  const resetUser = async () => {
    
    const token =  useCookie("XSRF-TOKEN");
    window.localStorage.removeItem('token')
    token.value = null
    user.value = null
  }

  return{ user, isLoginedIn, loader, handleLogin, handleRegister, handleUser, handlegetOtp, handleForgetPassword, handleLogout }
}, {persist: true} )
