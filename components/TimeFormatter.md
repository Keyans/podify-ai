# TimeFormatter 组件

## 概述

TimeFormatter 是一个通用的时间格式化组件，用于在整个应用中统一时间显示格式。

## 特性

- 🕒 统一的时间格式化（默认：YYYY-MM-DD HH:mm:ss）
- 🎨 支持自定义样式类名
- 🛡️ 内置错误处理和空值处理
- 📱 支持多种时间格式选项
- 🔧 易于使用和扩展

## 使用方法

### 基本用法

```vue
<template>
  <TimeFormatter :time="'2025-01-15 14:30:25'" />
</template>

<script setup>
import TimeFormatter from '~/components/TimeFormatter.vue'
</script>
```

### 自定义样式

```vue
<template>
  <TimeFormatter 
    :time="createTime" 
    class-name="text-sm text-gray-600 font-mono"
  />
</template>
```

### 不同格式

```vue
<template>
  <!-- 只显示日期 -->
  <TimeFormatter :time="date" format="YYYY-MM-DD" />
  
  <!-- 只显示时间 -->
  <TimeFormatter :time="date" format="HH:mm:ss" />
  
  <!-- 日期和小时分钟 -->
  <TimeFormatter :time="date" format="YYYY-MM-DD HH:mm" />
</template>
```

### 自定义占位符

```vue
<template>
  <TimeFormatter 
    :time="null" 
    placeholder="暂无时间"
  />
</template>
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| time | string \| number \| Date \| null | - | 要格式化的时间 |
| format | string | 'YYYY-MM-DD HH:mm:ss' | 时间格式 |
| className | string | '' | 自定义CSS类名 |
| placeholder | string | '-' | 空值时显示的占位符 |

## 支持的格式

- `YYYY-MM-DD HH:mm:ss` - 完整日期时间（默认）
- `YYYY-MM-DD` - 仅日期
- `HH:mm:ss` - 仅时间
- `YYYY-MM-DD HH:mm` - 日期和小时分钟

## 错误处理

组件内置了完善的错误处理机制：

- 自动检测无效的时间值
- 捕获格式化过程中的异常
- 在出错时显示占位符或原始值
- 在控制台输出警告信息（开发模式）

## 在项目中的使用示例

### 店铺管理页面

```vue
<!-- pages/dashboard/store/index.vue -->
<template>
  <div class="flex items-center">
    <span class="w-16 flex-shrink-0">授权时间：</span>
    <TimeFormatter 
      :time="item.createTime" 
      class-name="text-xs text-dark-text-secondary" 
    />
  </div>
</template>
```

### 店铺详情弹窗

```vue
<!-- components/StoreDetailModal.vue -->
<template>
  <div>
    <h4 class="font-medium text-dark-text mb-2">创建时间</h4>
    <TimeFormatter 
      :time="storeDetail.createTime" 
      class-name="text-dark-text-secondary text-sm"
    />
  </div>
</template>
```

## 扩展建议

如需支持更多时间格式，可以在组件的 `formattedTime` 计算属性中添加新的格式选项：

```javascript
switch (props.format) {
  case 'YYYY年MM月DD日':
    return `${year}年${month}月${day}日`
  case 'MM/DD/YYYY':
    return `${month}/${day}/${year}`
  // 添加更多格式...
}
```