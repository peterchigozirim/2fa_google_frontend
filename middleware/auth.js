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
        if (to.path == '/dashboard/verify-2fa'&& store.faConfirmation) {
            return navigateTo('/dashboard')
        }
        if (to.path !== '/dashboard/verify-2fa' && !!store.user.google2fa_enabled && store.faConfirmation === false) {
            return navigateTo('/dashboard/verify-2fa')
        }
        if (to.path === '/login') {
            return navigateTo('/dashboard')
        }
    }
})
