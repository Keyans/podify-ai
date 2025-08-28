<template>
  <div class="avatar-upload-container flex flex-col items-center">
    <!-- 上传区域 -->
    <div 
      class="upload-area border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200 relative overflow-hidden flex items-center justify-center"
      :class="[
        dragActive ? 'border-cyan-400 bg-cyan-500/5' : 'border-dark-border'
      ]"
      @drop.prevent="handleDrop"
      @dragover.prevent="handleDragOver"
      @dragleave.prevent="handleDragLeave"
      @dragenter.prevent
      @click="triggerFileInput"
    >
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        @change="handleFileChange"
        style="display: none;"
      >
      
      <!-- 无图片时的上传提示 - 只显示加号 -->
      <div v-if="!hasImage" class="flex items-center justify-center">
        <svg class="w-12 h-12 text-dark-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4v16m8-8H4"/>
        </svg>
      </div>

      <!-- 已上传图片预览 -->
      <div v-if="hasImage" class="absolute inset-0 group">
        <img 
          :src="imagePreview" 
          :alt="fileName"
          class="w-full h-full object-cover cursor-pointer rounded-lg"
          @click.stop="openPreview"
        />
        
        <!-- 上传进度覆盖层 -->
        <div 
          v-if="uploading" 
          class="absolute inset-0 bg-black/50 flex flex-col items-center justify-center"
        >
          <div class="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mb-2"></div>
          <div class="text-white text-sm font-medium">{{ uploadProgress }}%</div>
        </div>

        <!-- 悬停操作按钮 -->
        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div class="flex space-x-3">
            <button
              @click.stop="openPreview"
              class="w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-gray-700 hover:text-gray-900 transition-all"
              title="预览"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
            </button>
            <button
              @click.stop="removeImage"
              class="w-10 h-10 bg-red-500/90 hover:bg-red-500 rounded-full flex items-center justify-center text-white transition-all"
              title="删除"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- 上传状态指示器 -->
        <div class="absolute top-2 right-2">
          <!-- 上传成功 -->
          <div 
            v-if="uploaded && !error" 
            class="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center shadow-lg"
          >
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <!-- 上传失败 -->
          <div 
            v-else-if="error" 
            class="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-lg"
          >
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- 上传说明文字 -->
    <div v-if="!hasImage && (props.uploadText || props.uploadSubText)" class="mt-2 text-center">
      <p v-if="props.uploadText" class="text-xs font-medium text-dark-text mb-1">{{ props.uploadText }}</p>
      <p v-if="props.uploadSubText" class="text-xs text-dark-text-secondary">{{ props.uploadSubText }}</p>
    </div>

    <!-- 错误信息 -->
    <div v-if="error" class="mt-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
      <p class="text-sm text-red-400">{{ error }}</p>
    </div>


  </div>
</template>

<script setup>
import { ref, computed, defineExpose } from 'vue'
import tencentCOS from '~/utils/tencentCOS'

// Props
const props = defineProps({
  maxFileSize: {
    type: Number,
    default: 5 * 1024 * 1024 // 5MB
  },
  galleryType: {
    type: String,
    default: 'application'
  },
  autoUpload: {
    type: Boolean,
    default: true
  },
  uploadText: {
    type: String,
    default: '点击或拖拽上传图片'
  },
  uploadSubText: {
    type: String,
    default: '支持 JPG、PNG、GIF 格式，不超过 5MB'
  }
})

// Emits
const emits = defineEmits(['upload-success', 'upload-error'])

// 响应式数据
const fileInput = ref(null)
const dragActive = ref(false)
const imageFile = ref(null)
const imagePreview = ref('')
const fileName = ref('')
const uploading = ref(false)
const uploaded = ref(false)
const uploadProgress = ref(0)
const error = ref('')

// 计算属性
const hasImage = computed(() => {
  return !!imagePreview.value
})

// 触发文件选择
const triggerFileInput = () => {
  if (!hasImage.value) {
    fileInput.value?.click()
  }
}

// 处理文件选择
const handleFileChange = async (event) => {
  const file = event.target.files?.[0]
  if (file) {
    await processFile(file)
  }
  // 清空input value，允许选择相同文件
  event.target.value = ''
}

// 处理拖拽上传
const handleDrop = async (event) => {
  event.preventDefault()
  dragActive.value = false
  
  const file = event.dataTransfer.files?.[0]
  if (file) {
    await processFile(file)
  }
}

// 处理文件
const processFile = async (file) => {
  error.value = ''
  
  // 验证文件
  const validationError = validateFile(file)
  if (validationError) {
    error.value = validationError
    return
  }

  try {
    imageFile.value = file
    fileName.value = file.name
    uploaded.value = false
    uploading.value = false
    
    // 创建预览
    imagePreview.value = await createFilePreview(file)
    
    // 根据配置决定是否自动上传
    if (props.autoUpload) {
      await uploadImage()
    }
  } catch (err) {
    console.error('处理文件失败:', err)
    error.value = '处理文件失败'
  }
}

// 验证文件
const validateFile = (file) => {
  // 检查文件类型
  if (!file.type.startsWith('image/')) {
    return '只能上传图片文件'
  }

  // 检查文件大小
  if (file.size > props.maxFileSize) {
    const maxSizeMB = (props.maxFileSize / (1024 * 1024)).toFixed(1)
    return `文件大小不能超过 ${maxSizeMB}MB`
  }

  return null
}

// 创建文件预览
const createFilePreview = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => resolve(e.target.result)
    reader.readAsDataURL(file)
  })
}

// 上传图片 - 使用与TencentCosUpload相同的uploadFiles方法
const uploadImage = async () => {
  if (!imageFile.value) return

  uploading.value = true
  uploadProgress.value = 0
  error.value = ''

  try {
    console.log('🔄 开始上传头像到COS，使用统一的uploadFiles方法...')
    
    // 使用与TencentCosUpload相同的uploadFiles方法
    const result = await tencentCOS.uploadFiles(
      [imageFile.value], // 传入文件数组
      {
        galleryType: props.galleryType,
        concurrent: 1, // 单文件上传，并发数为1
        onFileProgress: (fileIndex, progress, file) => {
          uploadProgress.value = Math.round(progress.percent)
          console.log(`📊 上传进度: ${progress.percent}%`)
        },
        onOverallProgress: (percent, completed, total) => {
          console.log(`📈 整体进度: ${percent}%, 完成: ${completed}/${total}`)
        }
      }
    )

    // 处理上传结果
    if (result.success > 0 && result.results[0] && result.results[0].success) {
      const uploadResult = result.results[0]
      uploaded.value = true
      uploading.value = false
      uploadProgress.value = 100

      console.log('✅ 头像上传成功:', uploadResult)

      // 触发成功事件 - 保持与原来相同的事件格式
      emits('upload-success', {
        url: uploadResult.url,
        key: uploadResult.key,
        fileName: uploadResult.fileName || fileName.value,
        width: uploadResult.width,
        height: uploadResult.height
      })
    } else {
      // 上传失败
      const uploadError = result.results[0]?.error || '上传失败'
      throw new Error(uploadError)
    }

  } catch (err) {
    console.error('❌ 头像上传失败:', err)
    error.value = err.message || '上传失败'
    uploading.value = false
    uploaded.value = false
    uploadProgress.value = 0
    
    // 触发失败事件
    emits('upload-error', { error: err.message })
  }
}

// 移除图片
const removeImage = () => {
  imageFile.value = null
  imagePreview.value = ''
  fileName.value = ''
  uploading.value = false
  uploaded.value = false
  uploadProgress.value = 0
  error.value = ''
}

// 打开预览 - 使用应用的统一图片查看器
const openPreview = () => {
  if (imagePreview.value) {
    // 使用全局的图片查看器
    const { $imageViewer } = useNuxtApp()
    $imageViewer.showImage(imagePreview.value, fileName.value || '头像预览')
  }
}

// 获取上传的图片信息 - 与TencentCosUpload兼容的格式
const getImageInfo = () => {
  return {
    file: imageFile.value,
    preview: imagePreview.value,
    fileName: fileName.value,
    uploaded: uploaded.value,
    uploading: uploading.value,
    error: error.value,
    progress: uploadProgress.value
  }
}

// 添加与TencentCosUpload兼容的方法
const getImageInfoList = () => {
  if (!imageFile.value) return []
  
  return [getImageInfo()]
}

// 添加清空文件的方法，与TencentCosUpload兼容
const clearFiles = () => {
  removeImage()
}

// 重新上传
const retryUpload = async () => {
  if (imageFile.value) {
    await uploadImage()
  }
}

// 手动上传文件
const uploadFile = async () => {
  if (imageFile.value && !uploaded.value) {
    await uploadImage()
  }
}

// 清除错误状态
const clearError = () => {
  uploadError.value = ''
}

// 暴露方法给父组件 - 包括与TencentCosUpload兼容的方法
defineExpose({
  removeImage,
  getImageInfo,
  getImageInfoList,
  clearFiles,
  retryUpload,
  uploadFile,
  clearError
})
</script>

<style scoped>
.upload-area {
  width: 120px;
  height: 120px;
  border-radius: 8px;
}

.upload-area:hover {
  border-color: var(--accent-color);
}

/* 动画效果 */
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 响应式调整 */
@media (max-width: 640px) {
  .upload-area {
    min-height: 150px;
  }
}
</style>