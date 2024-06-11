export default defineNuxtRouteMiddleware((to, from) => {
    const store = userStore()
    if (!store.isLoginedIn) {

        if (to.path === '/login') {
            return true
        }
        else if (to.path === '/register') {
            return true
        }
        else if (to.path === '/forget-password') {
            return true
        } else{
            return navigateTo('/login')
        }
    }
    if (store.isLoginedIn) {
        if (to.path === '/login') {
            return navigateTo('/dashboard')
        }
    }
})
