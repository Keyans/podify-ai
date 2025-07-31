<template>
  <div class="theme-selector">
    <!-- 主题选择器按钮 -->
    <button 
      @click="toggleThemePanel" 
      class="theme-btn flex items-center space-x-2 p-2 rounded-md hover:bg-dark-input"
      :style="{ color: 'var(--text-primary)' }"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
      </svg>
      <span>主题</span>
    </button>
    
    <!-- 主题面板 -->
    <div 
      v-if="isThemePanelOpen" 
      class="theme-panel absolute right-0 top-full mt-2 p-4 rounded-md shadow-lg z-50"
      :style="{ 
        backgroundColor: 'var(--bg-secondary)',
        borderColor: 'var(--border-color)',
        borderWidth: '1px' 
      }"
    >
      <h3 
        class="font-medium mb-3"
        :style="{ color: 'var(--text-primary)' }"
      >
        选择主题
      </h3>
      
      <!-- 预设主题 -->
      <div class="grid grid-cols-2 gap-2 mb-4">
        <button 
          v-for="theme in availableThemes" 
          :key="theme.id" 
          @click="setTheme(theme.id)" 
          class="theme-preset p-2 rounded-md border flex items-center space-x-2"
          :class="{ 'border-accent': currentTheme === theme.id }"
          :style="{ 
            backgroundColor: themes[theme.id].colors.card,
            borderColor: currentTheme === theme.id ? 'var(--accent-color)' : 'var(--border-color)',
            color: themes[theme.id].colors.text
          }"
        >
          <div 
            class="w-3 h-3 rounded-full" 
            :style="{ backgroundColor: themes[theme.id].colors.accent }"
          ></div>
          <span>{{ theme.name }}</span>
        </button>
      </div>
      
      <!-- 自定义主题 -->
      <div
        class="border rounded-md p-3 mb-3"
        :style="{ borderColor: 'var(--border-color)' }"
      >
        <h4 
          class="text-sm font-medium mb-2"
          :style="{ color: 'var(--text-primary)' }"
        >
          自定义主题色
        </h4>
        <div class="flex items-center space-x-2 mb-2">
          <span 
            class="text-xs"
            :style="{ color: 'var(--text-secondary)' }"
          >
            主色调:
          </span>
          <input 
            type="color" 
            v-model="accentColor" 
            class="w-6 h-6"
            @change="updateCustomTheme"
          />
        </div>
        <div class="flex items-center space-x-2">
          <span 
            class="text-xs"
            :style="{ color: 'var(--text-secondary)' }"
          >
            背景色:
          </span>
          <input 
            type="color" 
            v-model="bgColor" 
            class="w-6 h-6"
            @change="updateCustomTheme" 
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useThemeStore } from '~/composables/useTheme'

const themeStore = useThemeStore()

// 获取主题数据
const currentTheme = computed(() => themeStore.currentTheme)
const availableThemes = computed(() => themeStore.availableThemes)
const themes = computed(() => themeStore.themes)

// 自定义主题颜色
const accentColor = ref('#ff5722')
const bgColor = ref('#000000')

// 主题面板状态
const isThemePanelOpen = ref(false)

// 初始化自定义颜色值
onMounted(() => {
  const activeTheme = themeStore.activeTheme.colors
  accentColor.value = activeTheme.accent
  bgColor.value = activeTheme.bg
  
  // 添加点击外部关闭面板的事件监听
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

// 切换主题面板显示
const toggleThemePanel = (event) => {
  event.stopPropagation()
  isThemePanelOpen.value = !isThemePanelOpen.value
}

// 设置主题
const setTheme = (themeId) => {
  themeStore.setTheme(themeId)
  // 更新自定义颜色输入框的值
  const activeTheme = themeStore.activeTheme.colors
  accentColor.value = activeTheme.accent
  bgColor.value = activeTheme.bg
  // 强制应用主题变化
  themeStore.applyTheme()
}

// 更新自定义主题
const updateCustomTheme = () => {
  themeStore.setCustomTheme({
    accent: accentColor.value,
    accentHover: adjustBrightness(accentColor.value, -20),
    bg: bgColor.value,
    card: adjustBrightness(bgColor.value, 10),
    input: adjustBrightness(bgColor.value, 20),
    border: adjustBrightness(bgColor.value, 30),
  })
  // 强制应用主题变化
  themeStore.applyTheme()
}

// 点击外部关闭面板
const handleClickOutside = (event) => {
  const themeSelector = document.querySelector('.theme-selector')
  if (themeSelector && !themeSelector.contains(event.target)) {
    isThemePanelOpen.value = false
  }
}

// 辅助函数: 调整颜色亮度
function adjustBrightness(hex, percent) {
  // 转换hex到rgb
  let r = parseInt(hex.substring(1, 3), 16)
  let g = parseInt(hex.substring(3, 5), 16)
  let b = parseInt(hex.substring(5, 7), 16)

  // 调整亮度
  r = Math.max(0, Math.min(255, r + percent))
  g = Math.max(0, Math.min(255, g + percent))
  b = Math.max(0, Math.min(255, b + percent))

  // 转回hex
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}
</script>

<style scoped>
.theme-panel {
  min-width: 240px;
}
</style> 