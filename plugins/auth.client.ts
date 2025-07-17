export default defineNuxtPlugin(() => {
  const authStore = useAuthStore()
  
  // 在客户端启动时检查认证状态
  authStore.checkAuth()
}) 