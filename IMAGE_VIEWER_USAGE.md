# 图片放大查看器使用指南

## 🎯 功能概述

已为整个应用添加了全局图片放大查看功能，支持：
- 点击图片放大查看
- 多图片轮播浏览
- 键盘操作（ESC关闭，← →切换）
- 自动骨架屏加载
- 错误状态处理

## 🚀 使用方法

### 1. 自动启用（推荐）

只需为图片添加以下任一属性，即可自动启用放大功能：

```html
<!-- 方法1：使用 data-zoomable 属性 -->
<img src="/path/to/image.jpg" alt="描述" data-zoomable />

<!-- 方法2：使用 zoom-image 类名 -->
<img src="/path/to/image.jpg" alt="描述" class="zoom-image" />

<!-- 方法3：使用 data-image-viewer 属性 -->
<img src="/path/to/image.jpg" alt="描述" data-image-viewer />
```

### 2. 使用优化的图片组件

```vue
<template>
  <!-- 基础用法 -->
  <OptimizedImage 
    src="/path/to/image.jpg" 
    alt="图片描述" 
  />

  <!-- 禁用放大功能 -->
  <OptimizedImage 
    src="/path/to/image.jpg" 
    alt="图片描述" 
    :zoomable="false"
  />

  <!-- 自定义样式 -->
  <OptimizedImage 
    src="/path/to/image.jpg" 
    alt="图片描述"
    container-class="rounded-lg shadow-lg"
    image-class="w-full h-48 object-cover"
  />
</template>
```

### 3. 图片分组浏览

将相关图片放在同一个容器中，支持轮播浏览：

```html
<div data-image-group>
  <img src="/image1.jpg" alt="图片1" data-zoomable />
  <img src="/image2.jpg" alt="图片2" data-zoomable />
  <img src="/image3.jpg" alt="图片3" data-zoomable />
</div>
```

### 4. 程序化调用

```vue
<script setup>
const { $imageViewer } = useNuxtApp()

// 显示单张图片
const showSingleImage = () => {
  $imageViewer.showImage('/path/to/image.jpg', '图片描述')
}

// 显示图片组
const showImageGroup = () => {
  const images = ['/img1.jpg', '/img2.jpg', '/img3.jpg']
  $imageViewer.showImage('/img1.jpg', '第一张图片', images)
}
</script>
```

## 🎨 现有页面集成

### 对于详情弹窗中的图片

只需添加 `data-zoomable` 属性：

```vue
<!-- 原来的代码 -->
<img :src="item.image" :alt="item.title" class="w-full h-full object-cover" />

<!-- 修改后 -->
<img :src="item.image" :alt="item.title" class="w-full h-full object-cover" data-zoomable />
```

### 对于产品列表中的图片

```vue
<!-- 为整个列表添加分组 -->
<div class="product-grid" data-image-group>
  <div v-for="product in products" :key="product.id" class="product-item">
    <img 
      :src="product.image" 
      :alt="product.title" 
      class="zoom-image w-full h-48 object-cover"
    />
  </div>
</div>
```

## ⌨️ 快捷键

- `ESC` - 关闭图片查看器
- `←` / `→` - 切换上一张/下一张图片（多图片时）
- 点击图片外区域 - 关闭查看器

## 🎯 特性

- ✅ **自动检测**: 页面中的图片自动添加放大功能
- ✅ **动态加载**: 支持动态添加的图片
- ✅ **多图浏览**: 支持图片组轮播
- ✅ **键盘操作**: 完整的键盘快捷键支持
- ✅ **响应式**: 适配各种屏幕尺寸
- ✅ **加载状态**: 内置骨架屏和错误处理
- ✅ **性能优化**: 图片懒加载和内存管理

## 🔧 配置选项

在 `OptimizedImage` 组件中可以配置：

```typescript
interface Props {
  src: string           // 图片地址
  alt?: string         // 图片描述
  zoomable?: boolean   // 是否可放大 (默认: true)
  showZoomIcon?: boolean // 是否显示放大图标 (默认: true)
  containerClass?: string // 容器样式类
  imageClass?: string    // 图片样式类
  skeletonClass?: string // 骨架屏样式类
  errorClass?: string    // 错误状态样式类
}
```

现在你可以在任何页面中使用这些功能，所有图片都将自动支持放大查看！