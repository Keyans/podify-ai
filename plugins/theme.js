import { useThemeStore } from '~/composables/useTheme'

export default defineNuxtPlugin((nuxtApp) => {
  // 等待app挂载后初始化主题
  nuxtApp.hook('app:mounted', () => {
    const themeStore = useThemeStore()
    themeStore.initTheme()
  })
}) 