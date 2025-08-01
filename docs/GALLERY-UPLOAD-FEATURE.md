# 图库上传功能实现文档

## 功能概述

为图库管理系统添加了完整的图片上传功能，支持多种上传方式和自动处理。

## 功能特性

### 🚀 上传方式
- **单文件上传**: 选择单个或多个图片文件
- **文件夹上传**: 支持选择整个文件夹进行批量上传
- **ZIP上传**: 支持上传ZIP压缩包，自动解压并提取图片
- **拖拽上传**: 支持将文件或文件夹拖拽到上传区域

### 📁 支持格式
- **图片格式**: JPG、JPEG、PNG、WEBP
- **文件大小**: 单个文件最大10MB
- **压缩包**: ZIP格式

### 🏠 适用图库
1. **商品图库** (galleryType: 1)
2. **素材图库** (galleryType: 2)
3. **结果图库** (galleryType: 3)

## 技术实现

### API 接口
- **上传接口**: `POST /gallery/image/addAI`
- **临时密钥**: `GET /pod/business/oss/tencent/key/temporary`

### 文件流程
1. 用户选择/拖拽文件
2. 客户端验证文件格式和大小
3. 获取腾讯云临时密钥
4. 上传文件到COS存储
5. 调用后端API添加到图库
6. 刷新图库列表

### 组件结构
```
components/GalleryUploadModal.vue    # 主上传弹窗组件
├── 上传区域 (拖拽支持)
├── 文件列表预览
├── 进度条显示
└── 错误处理

apis/business/gallery.ts             # API接口定义
├── uploadGalleryImages()           # 上传图片到图库
├── GalleryUploadParams            # 上传参数类型
└── GalleryType 枚举               # 图库类型

pages/dashboard/images/
├── products.vue                   # 商品图库 (galleryType: 1)
├── materials.vue                  # 素材图库 (galleryType: 2)
└── processing-results.vue         # 结果图库 (galleryType: 3)
```

## 使用方法

### 1. 在页面中集成
```vue
<template>
  <!-- 上传按钮 -->
  <button @click="showUploadModal = true">
    上传图片
  </button>

  <!-- 上传弹窗 -->
  <GalleryUploadModal
    :isOpen="showUploadModal"
    :galleryType="1"
    @close="showUploadModal = false"
    @upload-success="handleUploadSuccess"
  />
</template>

<script setup>
import GalleryUploadModal from '~/components/GalleryUploadModal.vue'

const showUploadModal = ref(false)

const handleUploadSuccess = (data) => {
  // 上传成功后的处理
  console.log('上传成功:', data)
  // 刷新图库列表
  refreshList()
}
</script>
```

### 2. API调用示例
```javascript
import { uploadGalleryImages, GalleryType } from '~/apis/business/gallery'

const uploadParams = {
  galleryType: GalleryType.PRODUCTS, // 商品图库
  imageList: [
    {
      imageName: "example.jpg",
      imageUrl: "https://example.com/image.jpg",
      fileSize: 1024000,
      width: 1920,
      height: 1080,
      format: "JPEG"
    }
  ]
}

const response = await uploadGalleryImages(uploadParams)
```

## 依赖库

```json
{
  "cos-js-sdk-v5": "^1.10.1",  // 腾讯云COS SDK
  "jszip": "^3.10.1"           // ZIP文件解析
}
```

## 注意事项

### 🔒 安全性
- 使用临时密钥，避免密钥泄露
- 客户端文件类型验证
- 服务端二次验证

### 🎯 用户体验
- 实时上传进度显示
- 错误信息提示
- 支持重试失败上传
- 可取消上传过程

### 📊 性能优化
- 并发上传处理
- 大文件分片上传
- 上传队列管理

## 问题排查

### 常见问题
1. **上传失败**: 检查网络连接和文件格式
2. **密钥过期**: 自动重新获取临时密钥
3. **文件过大**: 提示用户文件大小限制
4. **ZIP解析失败**: 检查ZIP文件完整性

### 调试信息
- 浏览器控制台查看上传日志
- 网络面板检查API调用
- COS SDK错误信息 