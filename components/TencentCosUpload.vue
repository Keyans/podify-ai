<template>
  <div class="cos-upload-container">
    <!-- 文件选择区域 -->
    <div 
      class="upload-dropzone border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors"
      :class="dragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300'"
      @drop="handleDrop"
      @dragover.prevent="dragActive = true"
      @dragleave="dragActive = false"
      @click="triggerFileInput"
    >
      <input
        ref="fileInput"
        type="file"
        multiple
        accept="image/*"
        @change="handleFileChange"
        style="display: none;"
      >
      
      <div class="upload-icon mb-4">
        <svg class="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
        </svg>
      </div>
      
      <div class="upload-text">
        <p class="text-lg font-medium text-gray-700 mb-2">点击或拖拽上传图片</p>
        <p class="text-sm text-gray-500">支持 JPG、PNG、GIF 格式，单个文件不超过 10MB</p>
      </div>
    </div>

    <!-- 文件列表 -->
    <div v-if="files.length > 0" class="file-list mt-6">
      <!-- 文件统计信息 -->
      <div class="flex justify-between items-center mb-4">
        <div class="text-sm text-gray-600">
          共 {{ files.length }} 个文件，已上传 {{ uploadedCount }} 个
        </div>
        <button 
          v-if="files.length > maxDisplayFiles"
          @click="toggleShowAll"
          class="text-sm text-blue-600 hover:text-blue-700"
        >
          {{ showAllFiles ? '收起' : `查看全部 (${files.length})` }}
        </button>
      </div>

      <!-- 缩略图网格 -->
      <div class="grid grid-cols-6 gap-3">
        <div 
          v-for="(file, index) in displayFiles" 
          :key="file.id"
          class="relative group aspect-square border rounded-lg overflow-hidden"
          :class="file.error ? 'border-red-300 bg-red-50' : file.uploaded ? 'border-cyan-300 bg-cyan-50' : 'border-gray-300 bg-gray-50'"
        >
          <!-- 文件预览 -->
          <div class="w-full h-full relative">
            <img 
              v-if="file.preview" 
              :src="file.preview" 
              :alt="file.name"
              class="w-full h-full object-cover"
            >
            <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center">
              <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>

            <!-- 上传进度覆盖层 -->
            <div 
              v-if="file.uploading" 
              class="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center"
            >
              <div class="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mb-2"></div>
              <div class="text-white text-xs font-medium">{{ file.progress }}%</div>
            </div>

            <!-- 状态图标 -->
            <div class="absolute top-1 left-1">
              <!-- 上传成功 -->
              <div 
                v-if="file.uploaded && !file.error" 
                class="w-5 h-5 bg-cyan-400 rounded-full flex items-center justify-center"
              >
                <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <!-- 上传失败 -->
              <div 
                v-else-if="file.error" 
                class="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
              >
                <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </div>
            </div>

            <!-- 删除按钮 -->
            <button 
              @click="removeFile(file.id)"
              class="absolute top-1 right-1 w-5 h-5 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>

            <!-- 文件名提示 -->
            <div 
              class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-xs p-1 truncate opacity-0 group-hover:opacity-100 transition-opacity"
              :title="file.name"
            >
              {{ file.name }}
            </div>
          </div>
        </div>
      </div>

      <!-- 错误信息汇总 -->
      <div v-if="errorFiles.length > 0" class="mt-4 p-3 bg-red-50 border border-red-300 rounded-lg">
        <div class="text-sm text-red-700 font-medium mb-2">
          {{ errorFiles.length }} 个文件上传失败：
        </div>
        <div class="space-y-1">
          <div v-for="file in errorFiles" :key="file.id" class="text-xs text-red-600">
            • {{ file.name }}: {{ file.error }}
          </div>
        </div>
      </div>

      <!-- 上传进度提示 -->
      <div v-if="uploading" class="mt-4 flex items-center justify-center space-x-2 text-blue-600">
        <div class="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <span class="text-sm">正在上传文件...</span>
      </div>
    </div>

    <!-- 全局错误信息 -->
    <div v-if="globalError" class="global-error mt-4 p-4 bg-red-50 border border-red-300 rounded-lg">
      <p class="text-sm text-red-700">{{ globalError }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineExpose, nextTick } from 'vue'
import tencentCOS from '~/utils/tencentCOS'

// Props
const props = defineProps({
  maxFiles: {
    type: Number,
    default: 10
  },
  maxFileSize: {
    type: Number,
    default: 10 * 1024 * 1024 // 10MB
  },
  accept: {
    type: String,
    default: 'image/*'
  },
  galleryType: {
    type: String,
    default: 'application' // 'application' | 'official'
  }
})

// Emits
const emits = defineEmits(['upload-success', 'upload-error', 'files-change'])

// 响应式数据
const files = ref([])
const dragActive = ref(false)
const uploading = ref(false)
const globalError = ref('')
const fileInput = ref(null)
const showAllFiles = ref(false)
const maxDisplayFiles = 12 // 默认显示12个文件

// 计算属性
const allFilesUploaded = computed(() => {
  return files.value.length > 0 && files.value.every(file => file.uploaded || file.error)
})

const displayFiles = computed(() => {
  if (showAllFiles.value || files.value.length <= maxDisplayFiles) {
    return files.value
  }
  return files.value.slice(0, maxDisplayFiles)
})

const errorFiles = computed(() => {
  return files.value.filter(file => file.error)
})

const uploadedCount = computed(() => {
  return files.value.filter(file => file.uploaded && !file.error).length
})

// 触发文件选择
const triggerFileInput = () => {
  fileInput.value?.click()
}

// 处理文件选择
const handleFileChange = async (event) => {
  const selectedFiles = Array.from(event.target.files || [])
  await processFiles(selectedFiles)
  // 清空input value，允许选择相同文件
  event.target.value = ''
}

// 处理拖拽上传
const handleDrop = async (event) => {
  event.preventDefault()
  dragActive.value = false
  
  const droppedFiles = Array.from(event.dataTransfer.files || [])
  await processFiles(droppedFiles)
}

// 处理文件
const processFiles = async (selectedFiles) => {
  globalError.value = ''
  
  const filesToProcess = []
  
  // 先验证所有文件
  for (const file of selectedFiles) {
    // 验证文件数量
    if (files.value.length + filesToProcess.length >= props.maxFiles) {
      globalError.value = `最多只能上传 ${props.maxFiles} 个文件`
      break
    }

    // 验证文件
    const validationError = validateFile(file)
    if (validationError) {
      globalError.value = validationError
      continue
    }

    // 检查是否已存在
    const exists = files.value.some(f => f.name === file.name && f.size === file.size)
    if (exists) continue

    filesToProcess.push(file)
  }

  // 批量处理文件并生成预览
  for (const file of filesToProcess) {
    try {
      // 创建文件对象
      const fileObj = {
        id: Date.now() + Math.random(),
        file,
        name: file.name,
        size: file.size,
        preview: null,
        uploading: false,
        uploaded: false,
        progress: 0,
        error: null,
        url: null,
        key: null,
        width: null,
        height: null
      }

      // 如果是图片，立即生成预览
      if (file.type.startsWith('image/')) {
        try {
          console.log('🖼️ 开始生成预览:', file.name)
          fileObj.preview = await createFilePreview(file)
          console.log('✅ 预览生成成功:', file.name)
        } catch (error) {
          console.error('❌ 预览生成失败:', file.name, error)
          // 使用占位符预览
          fileObj.preview = null
        }
      }

      // 添加到文件列表
      files.value.push(fileObj)
    } catch (error) {
      console.error('❌ 处理文件失败:', file.name, error)
    }
  }

  emits('files-change', files.value)
}

// 验证文件
const validateFile = (file) => {
  // 检查文件类型
  if (!file.type.startsWith('image/')) {
    return '只能上传图片文件'
  }

  // 检查文件大小
  if (file.size > props.maxFileSize) {
    return `文件大小不能超过 ${formatFileSize(props.maxFileSize)}`
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

// 上传所有文件
const uploadAllFiles = async () => {
  if (uploading.value) return

  uploading.value = true
  globalError.value = ''

  try {
    const filesToUpload = files.value.filter(f => !f.uploaded && !f.error)
    
    if (filesToUpload.length === 0) {
      globalError.value = '没有需要上传的文件'
      return
    }

    // 使用工具类批量上传
    const result = await tencentCOS.uploadFiles(
      filesToUpload.map(f => f.file),
      {
        galleryType: props.galleryType,
        concurrent: 3,
        onFileProgress: (fileIndex, progress, file) => {
          const fileObj = filesToUpload[fileIndex]
          if (fileObj) {
            fileObj.uploading = true
            fileObj.progress = progress.percent
          }
        },
        onOverallProgress: (percent, completed, total) => {
          console.log(`整体进度: ${percent}%, 完成: ${completed}/${total}`)
        }
      }
    )

    // 更新文件状态
    result.results.forEach((uploadResult, index) => {
      const fileObj = filesToUpload[index]
      if (fileObj) {
        fileObj.uploading = false
        if (uploadResult.success) {
          fileObj.uploaded = true
          fileObj.url = uploadResult.url
          fileObj.key = uploadResult.key
          fileObj.width = uploadResult.width
          fileObj.height = uploadResult.height
          fileObj.progress = 100
        } else {
          fileObj.error = uploadResult.error || '上传失败'
        }
      }
    })

    if (result.success > 0) {
      emits('upload-success', {
        uploadedFiles: result.results.filter(r => r.success),
        total: result.total,
        success: result.success,
        error: result.error
      })
    }

    if (result.error > 0) {
      emits('upload-error', {
        errorFiles: result.results.filter(r => !r.success),
        total: result.total,
        success: result.success,
        error: result.error
      })
    }

  } catch (error) {
    console.error('批量上传失败：', error)
    globalError.value = error.message || '上传失败'
    emits('upload-error', { error: error.message })
  } finally {
    uploading.value = false
  }
}

// 移除文件
const removeFile = (fileId) => {
  const index = files.value.findIndex(f => f.id === fileId)
  if (index > -1) {
    files.value.splice(index, 1)
    emits('files-change', files.value)
  }
}

// (已移除clearAllFiles方法，用户不需要清空功能)

// 格式化文件大小
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// 获取图片信息列表（供外部调用）
const getImageInfoList = () => {
  return files.value
    .filter(file => file.uploaded && !file.error)
    .map(file => ({
      imageName: file.name.replace(/\.[^/.]+$/, ''),
      imageUrl: file.url,
      fileSize: String(file.size),
      width: file.width || 0,
      height: file.height || 0,
      format: (file.file.type || "").split("/").pop() || "",
    }))
}

// 切换显示全部文件
const toggleShowAll = () => {
  showAllFiles.value = !showAllFiles.value
}

// 暴露方法给父组件
defineExpose({
  uploadAllFiles,
  getImageInfoList
})
</script>

<style scoped>
.upload-dropzone {
  transition: border-color 0.2s ease, background-color 0.2s ease;
}

.upload-dropzone:hover {
  border-color: #3b82f6;
  background-color: #eff6ff;
}

.file-item {
  transition: all 0.2s ease;
}

.aspect-square {
  aspect-ratio: 1 / 1;
}

/* 缩略图hover效果 */
.group:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
}

/* 上传进度动画 */
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

/* 响应式网格调整 */
@media (max-width: 768px) {
  .grid-cols-6 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .grid-cols-6 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style> 