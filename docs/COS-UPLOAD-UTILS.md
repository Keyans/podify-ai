# 腾讯云COS上传和ZIP解压工具使用指南

## 概述

为了简化腾讯云COS上传逻辑和ZIP文件处理，我们创建了两个统一的工具类：

1. `~/utils/tencentCOS.js` - 腾讯云COS上传工具类
2. `~/utils/zipUtils.js` - ZIP文件解压工具类

## 腾讯云COS工具类使用

### 基本导入

```javascript
import tencentCOS from '~/utils/tencentCOS'
```

### 单个文件上传

```javascript
// 上传单个文件
const uploadSingleFile = async (file) => {
  try {
    const result = await tencentCOS.uploadFile(file, {
      galleryType: 'application', // 'application' | 'official'
      onProgress: (progress) => {
        console.log(`上传进度: ${progress.percent}%`)
      }
    })
    
    console.log('上传成功:', result)
    // result = {
    //   success: true,
    //   url: "https://...",
    //   key: "upload/gallery/application/20250102/filename.jpg",
    //   fileName: "filename_timestamp_random.jpg",
    //   originalName: "filename.jpg",
    //   size: 1024000,
    //   type: "image/jpeg",
    //   width: 1920,
    //   height: 1080
    // }
    
  } catch (error) {
    console.error('上传失败:', error)
  }
}
```

### 批量文件上传

```javascript
// 批量上传文件
const uploadMultipleFiles = async (files) => {
  try {
    const result = await tencentCOS.uploadFiles(files, {
      galleryType: 'application',
      concurrent: 3, // 并发数
      onFileProgress: (fileIndex, progress, file) => {
        console.log(`文件 ${file.name} 上传进度: ${progress.percent}%`)
      },
      onOverallProgress: (percent, completed, total) => {
        console.log(`整体进度: ${percent}%, 完成: ${completed}/${total}`)
      }
    })
    
    console.log('批量上传结果:', result)
    // result = {
    //   results: [...], // 每个文件的上传结果
    //   success: 5,     // 成功数量
    //   error: 0,       // 失败数量
    //   total: 5        // 总数量
    // }
    
  } catch (error) {
    console.error('批量上传失败:', error)
  }
}
```

### 在Vue组件中使用

```vue
<template>
  <div>
    <input 
      type="file" 
      multiple 
      accept="image/*" 
      @change="handleFileSelect"
    >
    <div v-if="uploading">上传中... {{ progress }}%</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import tencentCOS from '~/utils/tencentCOS'

const uploading = ref(false)
const progress = ref(0)

const handleFileSelect = async (event) => {
  const files = Array.from(event.target.files)
  if (files.length === 0) return
  
  uploading.value = true
  progress.value = 0
  
  try {
    const result = await tencentCOS.uploadFiles(files, {
      galleryType: 'application',
      onOverallProgress: (percent) => {
        progress.value = percent
      }
    })
    
    console.log('上传完成:', result)
    
    // 发送成功事件
    emit('upload-success', result)
    
  } catch (error) {
    console.error('上传失败:', error)
    
    // 发送失败事件
    emit('upload-error', error)
    
  } finally {
    uploading.value = false
  }
}
</script>
```

## ZIP工具类使用

### 基本导入

```javascript
import { extractImagesFromZip, validateZipFile } from '~/utils/zipUtils'
```

### ZIP文件解压

```javascript
// 解压ZIP文件并提取图片
const handleZipUpload = async (zipFile) => {
  try {
    // 先验证ZIP文件
    const validationError = validateZipFile(zipFile)
    if (validationError) {
      console.error('ZIP文件验证失败:', validationError)
      return
    }
    
    // 解压并提取图片
    const result = await extractImagesFromZip(zipFile, {
      maxFiles: 100,
      maxFileSize: 10 * 1024 * 1024, // 10MB
      onProgress: (progress) => {
        console.log(`解压进度: ${progress.percent}% (${progress.current}/${progress.total})`)
      }
    })
    
    if (result.success) {
      console.log(`解压成功，提取到 ${result.total} 个图片文件`)
      
      // 获取提取的图片文件
      const imageFiles = result.files
      
      // 可以继续上传到COS
      const uploadResult = await tencentCOS.uploadFiles(imageFiles, {
        galleryType: 'application'
      })
      
    } else {
      console.error('解压失败:', result.error)
    }
    
  } catch (error) {
    console.error('处理ZIP文件失败:', error)
  }
}
```

### 在Vue组件中使用ZIP工具

```vue
<template>
  <div>
    <input 
      type="file" 
      accept=".zip"
      @change="handleZipSelect"
    >
    <div v-if="extracting">
      <div>解压中... {{ extractProgress }}%</div>
      <div>上传中... {{ uploadProgress }}%</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { extractImagesFromZip, validateZipFile } from '~/utils/zipUtils'
import tencentCOS from '~/utils/tencentCOS'

const extracting = ref(false)
const extractProgress = ref(0)
const uploadProgress = ref(0)

const handleZipSelect = async (event) => {
  const file = event.target.files[0]
  if (!file) return
  
  extracting.value = true
  extractProgress.value = 0
  uploadProgress.value = 0
  
  try {
    // 验证ZIP文件
    const validationError = validateZipFile(file)
    if (validationError) {
      alert(validationError)
      return
    }
    
    // 解压ZIP文件
    const extractResult = await extractImagesFromZip(file, {
      onProgress: (progress) => {
        extractProgress.value = progress.percent
      }
    })
    
    if (!extractResult.success) {
      alert('ZIP文件解压失败: ' + extractResult.error)
      return
    }
    
    // 上传提取的图片
    const uploadResult = await tencentCOS.uploadFiles(extractResult.files, {
      galleryType: 'application',
      onOverallProgress: (percent) => {
        uploadProgress.value = percent
      }
    })
    
    console.log('处理完成:', uploadResult)
    
  } catch (error) {
    console.error('处理失败:', error)
    alert('处理失败: ' + error.message)
    
  } finally {
    extracting.value = false
  }
}
</script>
```

## 路径结构说明

### galleryType 参数说明

- `'application'`: 应用级图片，路径为 `upload/gallery/application/YYYYMMDD/filename.ext`
- `'official'`: 官方图片，路径为 `upload/gallery/official/YYYYMMDD/filename.ext`

### 自动生成的文件名格式

```
原始文件名_时间戳_随机字符串.扩展名
例如: avatar_1735776000000_abc123.jpg
```

## 错误处理

### COS上传错误

```javascript
try {
  const result = await tencentCOS.uploadFile(file)
} catch (error) {
  // 可能的错误类型：
  // - 网络错误
  // - 凭证过期
  // - 文件过大
  // - CORS错误
  console.error('上传失败:', error.message)
}
```

### ZIP解压错误

```javascript
try {
  const result = await extractImagesFromZip(zipFile)
  if (!result.success) {
    // 解压失败的可能原因：
    // - ZIP文件损坏
    // - 文件过大
    // - 不支持的压缩格式
    console.error('解压失败:', result.error)
  }
} catch (error) {
  console.error('解压异常:', error.message)
}
```

## 最佳实践

1. **always处理错误**: 所有异步操作都要用try-catch包裹
2. **显示进度**: 利用onProgress回调显示上传/解压进度
3. **文件验证**: 上传前验证文件类型和大小
4. **批量操作**: 大量文件使用批量上传，设置合适的并发数
5. **用户反馈**: 提供清晰的成功/失败反馈

## 旧代码迁移

如果你的组件中有类似这样的旧代码：

```javascript
// 旧代码 ❌
import COS from 'cos-js-sdk-v5'
import { getTencentCosCredentials } from '~/apis/business/oss'

const initCOS = async () => {
  const response = await getTencentCosCredentials()
  // ... 复杂的初始化逻辑
}

const uploadFile = async (file) => {
  // ... 复杂的上传逻辑
}
```

可以简化为：

```javascript
// 新代码 ✅
import tencentCOS from '~/utils/tencentCOS'

const uploadFile = async (file) => {
  return await tencentCOS.uploadFile(file, {
    galleryType: 'application'
  })
}
```

现在COS上传变得更加简单、统一和可靠！🎉 