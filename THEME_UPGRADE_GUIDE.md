# Ant Design Vue 主题系统升级指南

## 概述

本次升级将项目的主题系统从纯 CSS 变量覆盖方式改进为使用 Ant Design Vue 4.x 官方的 Design Token 主题系统，实现更好的一致性和维护性。

## 主要改进

### 1. 新增的文件

- **`components/ThemeProvider.vue`** - 全局主题提供者组件
- **`pages/dashboard/theme-demo.vue`** - 主题系统演示页面

### 2. 修改的文件

- **`plugins/antdv.ts`** - 简化，移除重复代码
- **`app.vue`** - 添加 ThemeProvider 包装
- **`assets/css/main.css`** - 优化 Ant Design 覆盖样式

## 新主题系统架构

```
app.vue
├── ThemeProvider (ConfigProvider)
    ├── NuxtLayout
    │   └── NuxtPage
    └── ImageViewer
```

### ThemeProvider 组件

使用 Ant Design Vue 的 `a-config-provider` 组件，通过 Design Token 系统自动为所有 Ant Design 组件应用主题：

```vue
<a-config-provider :theme="antdThemeConfig" :locale="locale">
  <slot />
</a-config-provider>
```

## 主题配置映射

| 原 CSS 变量 | Design Token | 说明 |
|------------|--------------|------|
| `--accent-color` | `colorPrimary` | 主色调 |
| `--bg-primary` | `colorBgBase` | 主背景色 |
| `--bg-secondary` | `colorBgContainer` | 卡片背景色 |
| `--text-primary` | `colorText` | 主文字色 |
| `--text-secondary` | `colorTextSecondary` | 次级文字色 |
| `--border-color` | `colorBorder` | 边框色 |

## 支持的组件主题

- ✅ **Button** - 按钮组件
- ✅ **Input** - 输入框组件  
- ✅ **Table** - 表格组件
- ✅ **Select** - 选择器组件
- ✅ **Pagination** - 分页组件
- ✅ **Card** - 卡片组件
- ✅ **Modal** - 对话框组件
- ✅ **Drawer** - 抽屉组件
- ✅ **Menu** - 菜单组件
- ✅ **Tabs** - 标签页组件

## 向后兼容性

1. **保持现有主题切换逻辑** - `useTheme.js` composable 保持不变
2. **保持 CSS 变量** - 继续更新 CSS 变量，确保自定义组件正常工作
3. **保持主题选择器** - `ThemeSelector.vue` 组件功能不变

## 使用方法

### 查看主题演示

访问 `/dashboard/theme-demo` 页面可以看到新主题系统的效果展示。

### 添加新的 Design Token

在 `ThemeProvider.vue` 中的 `getAntdThemeConfig` 函数中添加：

```javascript
const getAntdThemeConfig = (themeColors) => {
  return {
    token: {
      // 添加新的全局 token
      newTokenName: themeColors.newColor,
    },
    components: {
      // 添加组件特定的 token
      ComponentName: {
        componentToken: value,
      }
    }
  }
}
```

## 优势

1. **自动化** - 所有 Ant Design 组件自动应用主题，无需手动 CSS 覆盖
2. **一致性** - 使用官方设计规范，确保视觉一致性
3. **维护性** - 减少 CSS 覆盖，降低升级风险
4. **性能** - 基于 CSS-in-JS，按需注入样式
5. **类型安全** - 使用 TypeScript 支持的 Design Token 系统

## 迁移建议

1. **逐步迁移** - 可以逐个组件测试新主题系统的效果
2. **保留必要的 CSS 覆盖** - 对于有特殊需求的样式，继续使用 CSS 覆盖
3. **测试兼容性** - 在所有主题下测试组件显示效果

## 注意事项

- 新的主题系统需要 Ant Design Vue 4.x 版本支持
- 某些特殊的自定义样式可能需要调整
- 建议在开发环境充分测试后再部署到生产环境

## 相关资源

- [Ant Design Vue 主题配置官方文档](https://www.antdv.com/docs/vue/customize-theme)
- [Design Token 系统介绍](https://ant.design/docs/react/customize-theme)
- [ConfigProvider API 文档](https://antdv.com/components/config-provider)