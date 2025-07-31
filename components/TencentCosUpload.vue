<template>
  <div class="tencent-cos-upload">
    <!-- 上传区域 -->
    <div 
      v-if="uploadedFiles.length === 0"
      @drop="handleDrop"
      @dragover.prevent
      @dragenter.prevent
      @click="triggerFileInput"
      class="border border-dashed border-dark-border rounded-lg p-6 flex flex-col items-center justify-center h-64 cursor-pointer hover:border-gray-400 transition-colors"
    >
      <svg class="w-10 h-10 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
      <p class="text-gray-400 mb-2 text-center">{{ uploadText }}</p>
      <p class="text-sm text-gray-500">支持 JPG、PNG、WEBP 格式，单张图片不超过 10MB</p>
    </div>

    <!-- 已上传文件预览 -->
    <div v-if="uploadedFiles.length > 0" class="grid grid-cols-5 gap-3">
      <div v-for="(file, index) in uploadedFiles" :key="index" class="relative group">
        <div class="relative h-20 w-full rounded-md overflow-hidden bg-gray-100">
          <!-- 图片预览 -->
          <img 
            v-if="file.preview" 
            :src="file.preview" 
            :alt="file.name" 
            class="h-full w-full object-cover"
          />
          
          <!-- 上传进度 -->
          <div 
            v-if="file.uploading" 
            class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          >
            <div class="text-white text-center">
              <div class="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-1"></div>
              <div class="text-xs">{{ file.progress }}%</div>
            </div>
          </div>
          
          <!-- 上传成功标识 -->
          <div 
            v-if="file.uploaded && !file.uploading" 
            class="absolute top-1 left-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center"
          >
            <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <!-- 上传失败标识 -->
          <div 
            v-if="file.error" 
            class="absolute top-1 left-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
          >
            <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          
          <!-- 删除按钮 -->
          <button 
            @click="removeFile(index)"
            class="absolute top-1 right-1 w-5 h-5 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <!-- 文件名 -->
        <p class="text-xs text-gray-400 mt-1 truncate" :title="file.name">{{ file.name }}</p>
      </div>
      
      <!-- 添加更多文件按钮 -->
      <div 
        v-if="uploadedFiles.length < maxFiles"
        @click="triggerFileInput"
        class="h-20 w-full rounded-md border border-dashed border-dark-border flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
      >
        <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
      </div>
    </div>

    <!-- 隐藏的文件输入 -->
    <input 
      ref="fileInput"
      type="file" 
      :multiple="multiple"
      :accept="accept"
      @change="handleFileSelect"
      class="hidden"
    />

    <!-- 上传提示信息 -->
    <div v-if="error" class="mt-2 text-sm text-red-500">
      {{ error }}
    </div>
    
    <div v-if="uploadedFiles.length > 0" class="mt-2 text-sm text-gray-500">
      已选择 {{ uploadedFiles.length }} 个文件
      <span v-if="maxFiles > 1">，最多可选择 {{ maxFiles }} 个文件</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import COS from 'cos-js-sdk-v5'
import { getTencentCosCredentials } from '~/apis/business/oss'

// Props
const props = defineProps({
  multiple: {
    type: Boolean,
    default: true
  },
  maxFiles: {
    type: Number,
    default: 1000
  },
  accept: {
    type: String,
    default: 'image/*'
  },
  uploadText: {
    type: String,
    default: '请在上方选择图片'
  },
  autoUpload: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['upload-success', 'upload-error', 'files-change'])

// 响应式数据
const fileInput = ref(null)
const uploadedFiles = ref([])
const error = ref('')
const cosInstance = ref(null)
const credentials = ref(null)

// 文件类型
const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
const maxFileSize = 10 * 1024 * 1024 // 10MB

// 获取腾讯云临时密钥
const getCredentials = async () => {
  try {
    const response = await getTencentCosCredentials()
    if (response.success) {
      credentials.value = response.data
      
      // 初始化 COS 实例
      cosInstance.value = new COS({
        SecretId: credentials.value.tmpSecretId,
        SecretKey: credentials.value.tmpSecretKey,
        SecurityToken: credentials.value.sessionToken,
        StartTime: credentials.value.startTime,
        ExpiredTime: credentials.value.expiredTime
      })
    } else {
      throw new Error(response.message || '获取上传凭证失败')
    }
  } catch (err) {
    error.value = '获取上传凭证失败：' + err.message
    console.error('获取腾讯云凭证失败:', err)
  }
}

// 生成唯一文件名
const generateFileName = (originalName) => {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(7)
  const extension = originalName.split('.').pop()
  return `${timestamp}_${random}.${extension}`
}

// 验证文件
const validateFile = (file) => {
  if (!allowedTypes.includes(file.type)) {
    return '不支持的文件格式，请选择 JPG、PNG 或 WEBP 格式的图片'
  }
  
  if (file.size > maxFileSize) {
    return '文件大小不能超过 10MB'
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

// 获取图片尺寸信息
const getImageDimensions = (file) => {
  return new Promise((resolve) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    
    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight
      })
      URL.revokeObjectURL(url)
    }
    
    img.onerror = () => {
      resolve({ width: 0, height: 0 })
      URL.revokeObjectURL(url)
    }
    
    img.src = url
  })
}

// 获取文件格式
const getFileFormat = (file) => {
  const extension = file.name.split('.').pop()?.toUpperCase()
  return extension || 'UNKNOWN'
}

// 上传文件到 COS
const uploadFileToCos = async (fileInfo) => {
  if (!cosInstance.value || !credentials.value) {
    throw new Error('COS 实例未初始化')
  }

  return new Promise((resolve, reject) => {
    const fileName = generateFileName(fileInfo.file.name)
    const key = `${credentials.value.pathPrefix}/${fileName}`
    
    cosInstance.value.uploadFile({
      Bucket: credentials.value.bucketName,
      Region: credentials.value.region,
      Key: key,
      Body: fileInfo.file,
      onProgress: (progressData) => {
        const percent = Math.round(progressData.percent * 100)
        fileInfo.progress = percent
        
        // 找到对应的文件并更新进度
        const index = uploadedFiles.value.findIndex(f => f.id === fileInfo.id)
        if (index !== -1) {
          uploadedFiles.value[index].progress = percent
        }
      }
    }, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve({
          url: `https://${data.Location}`,
          key: key,
          fileName: fileName
        })
      }
    })
  })
}

// 处理文件选择
const handleFileSelect = async (event) => {
  const files = Array.from(event.target.files)
  await processFiles(files)
  // 清空 input 值，允许重复选择同一文件
  event.target.value = ''
}

// 处理拖拽上传
const handleDrop = async (event) => {
  event.preventDefault()
  const files = Array.from(event.dataTransfer.files)
  await processFiles(files)
}

// 处理文件
const processFiles = async (files) => {
  error.value = ''
  
  // 检查文件数量限制
  if (uploadedFiles.value.length + files.length > props.maxFiles) {
    error.value = `最多只能上传 ${props.maxFiles} 个文件`
    return
  }
  
  for (const file of files) {
    // 验证文件
    const validationError = validateFile(file)
    if (validationError) {
      error.value = validationError
      continue
    }
    
    // 获取图片尺寸信息
    const dimensions = await getImageDimensions(file)
    
    // 创建文件信息对象
    const fileInfo = {
      id: Date.now() + Math.random(),
      file: file,
      name: file.name,
      size: file.size,
      preview: await createFilePreview(file),
      uploading: false,
      uploaded: false,
      progress: 0,
      error: null,
      url: null,
      // 图片属性信息
      width: dimensions.width,
      height: dimensions.height,
      format: getFileFormat(file),
      fileName: null,
      key: null
    }
    
    uploadedFiles.value.push(fileInfo)
    
    // 自动上传
    if (props.autoUpload) {
      await uploadFile(fileInfo)
    }
  }
  
  // 触发文件变化事件
  emit('files-change', uploadedFiles.value)
}

// 上传单个文件
const uploadFile = async (fileInfo) => {
  try {
    fileInfo.uploading = true
    fileInfo.error = null
    
    // 确保有有效的凭证
    if (!credentials.value) {
      await getCredentials()
    }
    
    const result = await uploadFileToCos(fileInfo)
    
    fileInfo.uploading = false
    fileInfo.uploaded = true
    fileInfo.url = result.url
    fileInfo.key = result.key
    fileInfo.fileName = result.fileName
    
    emit('upload-success', {
      file: fileInfo,
      url: result.url,
      key: result.key
    })
    
  } catch (err) {
    fileInfo.uploading = false
    fileInfo.error = err.message
    
    emit('upload-error', {
      file: fileInfo,
      error: err.message
    })
    
    console.error('文件上传失败:', err)
  }
}

// 删除文件
const removeFile = (index) => {
  uploadedFiles.value.splice(index, 1)
  emit('files-change', uploadedFiles.value)
}

// 触发文件选择
const triggerFileInput = () => {
  fileInput.value?.click()
}

// 获取上传成功的文件列表
const getUploadedFiles = () => {
  return uploadedFiles.value.filter(file => file.uploaded && !file.error)
}

// 重新上传失败的文件
const retryFailedUploads = async () => {
  const failedFiles = uploadedFiles.value.filter(file => file.error && !file.uploading)
  
  for (const file of failedFiles) {
    await uploadFile(file)
  }
}

// 手动上传所有文件到 COS（在提交任务时调用）
const uploadAllFilesToCos = async () => {
  // 获取凭证
  await getCredentials()
  
  // 上传所有未上传的文件
  const unuploadedFiles = uploadedFiles.value.filter(file => !file.uploaded && !file.uploading && !file.error)
  
  for (const file of unuploadedFiles) {
    await uploadFile(file)
  }
  
  return uploadedFiles.value.filter(file => file.uploaded)
}

// 获取本地选择的文件（未上传到 COS）
const getLocalFiles = () => {
  return uploadedFiles.value.filter(file => !file.uploaded)
}

// 获取所有图片的完整信息（用于提交任务）
const getImageInfoList = () => {
  return uploadedFiles.value
    .filter(file => file.uploaded && file.url)
    .map(file => ({
      imageName: file.name,
      imageUrl: file.url,
      fileSize: file.size,
      width: file.width,
      height: file.height,
      format: file.format
    }))
}

// 暴露方法给父组件
defineExpose({
  getUploadedFiles,
  retryFailedUploads,
  uploadAllFilesToCos,
  getLocalFiles,
  getImageInfoList,
  uploadedFiles
})

// 组件挂载时不获取凭证，只有在需要上传时才获取
onMounted(() => {
  // 不再自动获取凭证
})

// 监听文件变化
watch(uploadedFiles, (newFiles) => {
  emit('files-change', newFiles)
}, { deep: true })
</script>

<style scoped>
.tencent-cos-upload {
  width: 100%;
}

/* 拖拽时的样式 */
.border-dashed:hover {
  border-color: #6b7280;
}
</style> 