<template>
  <a-config-provider
    :theme="antdThemeConfig"
    :locale="locale"
  >
    <slot />
  </a-config-provider>
</template>

<script setup>
import { computed, watch } from 'vue'
import { ConfigProvider } from 'ant-design-vue'
import zhCN from 'ant-design-vue/locale/zh_CN'
import { useThemeStore } from '~/composables/useTheme'

// 主题配置工具函数
const getAntdThemeConfig = (themeColors) => {
  return {
    token: {
      // 主色
      colorPrimary: themeColors.accent,
      colorSuccess: themeColors.success || '#52c41a',
      colorWarning: themeColors.warning || '#faad14', 
      colorError: themeColors.error || '#ff4d4f',
      colorInfo: themeColors.info || '#1677ff',
      
      // 背景色
      colorBgBase: themeColors.bg,
      colorBgContainer: themeColors.card,
      colorBgElevated: themeColors.card,
      colorBgLayout: themeColors.bg,
      
      // 文字颜色
      colorText: themeColors.text,
      colorTextSecondary: themeColors.textSecondary,
      colorTextTertiary: themeColors.textTertiary,
      colorTextQuaternary: themeColors.textTertiary,
      
      // 边框色
      colorBorder: themeColors.border,
      colorBorderSecondary: themeColors.border,
      
      // 圆角
      borderRadius: 6,
      borderRadiusLG: 8,
      borderRadiusSM: 4,
      
      // 阴影
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
      boxShadowSecondary: '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
    },
    components: {
      // 表格组件特殊配置
      Table: {
        headerBg: themeColors.card,
        headerColor: themeColors.text,
        rowHoverBg: themeColors.input,
        borderColor: themeColors.border,
      },
      // 按钮组件
      Button: {
        colorPrimary: themeColors.accent,
        colorPrimaryHover: themeColors.accentHover,
        colorPrimaryActive: themeColors.accentHover,
      },
      // 输入框组件
      Input: {
        colorBgContainer: themeColors.input,
        colorBorder: themeColors.border,
        colorText: themeColors.text,
      },
      // 选择器组件
      Select: {
        colorBgContainer: themeColors.input,
        colorBorder: themeColors.border,
        colorText: themeColors.text,
      },
      // 分页组件
      Pagination: {
        colorPrimary: themeColors.accent,
        colorText: themeColors.text,
        colorBgContainer: themeColors.card,
      },
      // 卡片组件
      Card: {
        colorBgContainer: themeColors.card,
        colorBorderSecondary: themeColors.border,
      },
      // 模态框组件
      Modal: {
        colorBgElevated: themeColors.card,
        colorText: themeColors.text,
      },
      // 抽屉组件
      Drawer: {
        colorBgElevated: themeColors.card,
        colorText: themeColors.text,
      }
    }
  }
}

// 使用主题 store
const themeStore = useThemeStore()

// 设置中文语言包
const locale = zhCN

// 计算 Ant Design Vue 主题配置
const antdThemeConfig = computed(() => {
  const activeTheme = themeStore.activeTheme
  if (!activeTheme) return {}
  
  return getAntdThemeConfig(activeTheme.colors)
})

// 监听主题变化，同时更新 CSS 变量（保持向后兼容）
watch(
  () => themeStore.activeTheme,
  (newTheme) => {
    if (newTheme && process.client) {
      // 保持现有的 CSS 变量更新逻辑，确保向后兼容
      themeStore.applyTheme()
    }
  },
  { immediate: true }
)
</script>

<style scoped>
/* 这里可以添加一些全局的主题相关样式 */
</style>