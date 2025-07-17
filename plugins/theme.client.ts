export default defineNuxtPlugin(() => {
  const themeStore = useThemeStore()
  
  // 在客户端启动时初始化主题
  themeStore.initTheme()
}) 