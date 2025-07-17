import { ref, watch, computed, readonly } from 'vue';
import { defineStore } from 'pinia';

// 主题类型
export type Theme = 'light' | 'dark' | 'auto';

// 获取系统主题偏好
const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
};

// 从localStorage获取保存的主题
const getSavedTheme = (): Theme => {
  if (process.client) {
    const saved = localStorage.getItem('theme') as Theme;
    if (saved && ['light', 'dark', 'auto'].includes(saved)) {
      return saved;
    }
  }
  return 'auto';
};

export const useThemeStore = defineStore('theme', () => {
  // 状态
  const isDark = ref(false)
  const theme = ref<'light' | 'dark' | 'auto'>('auto')

  // 计算属性
  const currentTheme = computed(() => {
    if (theme.value === 'auto') {
      return isDark.value ? 'dark' : 'light'
    }
    return theme.value
  })

  // 方法
  const toggleTheme = () => {
    if (theme.value === 'light') {
      theme.value = 'dark'
    } else if (theme.value === 'dark') {
      theme.value = 'light'
    } else {
      // auto模式下，切换为相反的主题
      theme.value = isDark.value ? 'light' : 'dark'
    }
    applyTheme()
  }

  const setTheme = (newTheme: 'light' | 'dark' | 'auto') => {
    theme.value = newTheme
    applyTheme()
  }

  const applyTheme = () => {
    if (process.client) {
      const html = document.documentElement
      
      if (theme.value === 'dark' || (theme.value === 'auto' && isDark.value)) {
        html.classList.add('dark')
      } else {
        html.classList.remove('dark')
      }
      
      // 保存到localStorage
      localStorage.setItem('theme', theme.value)
    }
  }

  const initTheme = () => {
    if (process.client) {
      // 从localStorage读取主题设置
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'auto' | null
      
      if (savedTheme) {
        theme.value = savedTheme
      }
      
      // 检测系统主题偏好
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      isDark.value = mediaQuery.matches
      
      // 监听系统主题变化
      mediaQuery.addEventListener('change', (e) => {
        isDark.value = e.matches
        if (theme.value === 'auto') {
          applyTheme()
        }
      })
      
      // 应用初始主题
      applyTheme()
    }
  }

  return {
    // 状态
    isDark: readonly(isDark),
    theme: readonly(theme),
    
    // 计算属性
    currentTheme,
    
    // 方法
    toggleTheme,
    setTheme,
    initTheme
  }
})


