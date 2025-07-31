import { defineStore } from 'pinia'

// 预设主题配置
const themePresets = {
  dark: {
    name: '暗黑主题',
    colors: {
      bg: '#000000',
      card: '#111111',
      input: '#1a1a1a',
      border: '#333333',
      text: '#ffffff',
      textSecondary: '#b0b0b0',
      textTertiary: '#808080',
      accent: '#ff5722',
      accentHover: '#e64a19',
      success: '#4CAF50',
      warning: '#FFC107',
      error: '#f44336',
      info: '#2196F3',
    }
  },
  light: {
    name: '明亮主题',
    colors: {
      bg: '#f8f9fa',
      card: '#ffffff',
      input: '#f1f3f5',
      border: '#e9ecef',
      text: '#212529',
      textSecondary: '#495057',
      textTertiary: '#868e96',
      accent: '#ff5722',
      accentHover: '#e64a19',
      success: '#4CAF50',
      warning: '#FFC107',
      error: '#f44336',
      info: '#2196F3',
    }
  },
  blue: {
    name: '蓝色主题',
    colors: {
      bg: '#0a192f',
      card: '#112240',
      input: '#1d3557',
      border: '#2a446c',
      text: '#e6f1ff',
      textSecondary: '#c3d5e8',
      textTertiary: '#8892b0',
      accent: '#64ffda',
      accentHover: '#4cd5bd',
      success: '#4CAF50',
      warning: '#FFC107',
      error: '#f44336',
      info: '#2196F3',
    }
  },
  green: {
    name: '绿色主题',
    colors: {
      bg: '#121b12',
      card: '#1e2e1e',
      input: '#2c3c2c',
      border: '#3c4c3c',
      text: '#ffffff',
      textSecondary: '#b0c0b0',
      textTertiary: '#80a080',
      accent: '#4CAF50',
      accentHover: '#3d8c40',
      success: '#8BC34A',
      warning: '#FFC107',
      error: '#f44336',
      info: '#2196F3',
    }
  },
}

export const useThemeStore = defineStore('theme', {
  state: () => ({
    currentTheme: 'dark', // 默认主题
    customTheme: null, // 用户自定义主题
    themes: themePresets,
  }),

  getters: {
    // 获取当前主题配置
    activeTheme() {
      if (this.customTheme) {
        return this.customTheme
      }
      return this.themes[this.currentTheme]
    },

    // 获取所有可用主题
    availableThemes() {
      return Object.keys(this.themes).map(key => ({
        id: key,
        name: this.themes[key].name
      }))
    }
  },

  actions: {
    // 设置主题
    setTheme(themeId) {
      if (this.themes[themeId]) {
        this.currentTheme = themeId
        this.customTheme = null
        this.applyTheme()
      }
    },

    // 设置自定义主题
    setCustomTheme(customColors) {
      this.customTheme = {
        name: '自定义主题',
        colors: {
          ...this.themes[this.currentTheme].colors,
          ...customColors
        }
      }
      this.applyTheme()
    },

    // 应用主题到CSS变量
    applyTheme() {
      const theme = this.activeTheme.colors
      
      if (process.client) {
        const root = document.documentElement

        // 设置CSS变量
        root.style.setProperty('--bg-primary', theme.bg)
        root.style.setProperty('--bg-secondary', theme.card)
        root.style.setProperty('--bg-tertiary', theme.input)
        root.style.setProperty('--text-primary', theme.text)
        root.style.setProperty('--text-secondary', theme.textSecondary)
        root.style.setProperty('--text-tertiary', theme.textTertiary)
        root.style.setProperty('--border-color', theme.border)
        root.style.setProperty('--accent-color', theme.accent)
        root.style.setProperty('--accent-hover', theme.accentHover)
        
        // 保存到本地存储
        localStorage.setItem('theme', this.currentTheme)
        if (this.customTheme) {
          localStorage.setItem('customTheme', JSON.stringify(this.customTheme))
        } else {
          localStorage.removeItem('customTheme')
        }
        
        // 强制重新渲染样式
        document.body.classList.add('theme-updated')
        setTimeout(() => {
          document.body.classList.remove('theme-updated')
        }, 10)
      }
    },

    // 初始化主题
    initTheme() {
      if (process.client) {
        // 从本地存储恢复主题设置
        const savedTheme = localStorage.getItem('theme')
        const savedCustomTheme = localStorage.getItem('customTheme')
        
        if (savedTheme && this.themes[savedTheme]) {
          this.currentTheme = savedTheme
        }
        
        if (savedCustomTheme) {
          try {
            this.customTheme = JSON.parse(savedCustomTheme)
          } catch (e) {
            console.error('Failed to parse custom theme', e)
          }
        }
        
        this.applyTheme()
      }
    }
  }
}) 