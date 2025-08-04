<template>
  <div 
    v-if="isOpen" 
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    @click="closeModal"
  >
    <div 
      class="bg-dark-card rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden border border-dark-border"
      @click.stop
    >
      <!-- 弹窗头部 -->
      <div class="flex items-center justify-between p-4 border-b border-dark-border">
        <h2 class="text-xl font-semibold text-dark-text">
          上传图片到{{ galleryTypeText }}
        </h2>
        <button 
          @click="closeModal"
          class="text-dark-text-secondary hover:text-dark-text"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- 弹窗内容 -->
      <div class="p-6 overflow-y-auto max-h-[70vh]">
        <!-- 上传区域 -->
        <div 
          ref="dropArea"
          @drop="handleDrop"
          @dragover.prevent
          @dragenter.prevent
          class="border-2 border-dashed border-dark-border rounded-lg p-8 text-center transition-colors"
          :class="{'border-blue-500 bg-blue-50/10': dragActive}"
        >
          <div class="flex flex-col items-center">
            <svg class="w-12 h-12 text-dark-text-secondary mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
            </svg>
            
            <h3 class="text-lg font-medium text-dark-text mb-2">上传图片</h3>
            <p class="text-dark-text-secondary mb-4">拖拽图片文件到此处，或点击下方按钮选择</p>
            
            <!-- 上传按钮组 -->
            <div class="flex space-x-4">
              <button 
                @click="triggerFileInput"
                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
                选择图片
              </button>
              
              <button 
                @click="triggerFolderInput"
                class="px-4 py-2 bg-cyan-400 text-white rounded-md hover:bg-cyan-500 flex items-center"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/>
                </svg>
                选择文件夹
              </button>
              
              <button 
                @click="triggerZipInput"
                class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-4-4m4 4l4-4m5.618-6.016A9 9 0 0121 12a9 9 0 01-9 9"/>
                </svg>
                上传ZIP文件
              </button>
            </div>
            
            <p class="text-xs text-dark-text-secondary mt-4">
              支持 JPG、PNG、WEBP 格式，单个文件不超过 10MB
            </p>
          </div>
        </div>

        <!-- 文件输入 -->
        <input 
          ref="fileInput"
          type="file"
          multiple
          accept="image/jpeg,image/jpg,image/png,image/webp"
          @change="handleFileSelect"
          class="hidden"
        />
        
        <input 
          ref="folderInput"
          type="file"
          multiple
          webkitdirectory
          accept="image/jpeg,image/jpg,image/png,image/webp"
          @change="handleFileSelect"
          class="hidden"
        />
        
        <input 
          ref="zipInput"
          type="file"
          accept=".zip"
          @change="handleZipSelect"
          class="hidden"
        />

        <!-- 文件列表 -->
        <div v-if="files.length > 0" class="mt-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-dark-text">待上传文件 ({{ files.length }})</h3>
            <button 
              @click="clearFiles"
              class="text-red-500 hover:text-red-600 text-sm"
            >
              清空列表
            </button>
          </div>
          
          <div class="space-y-2 max-h-64 overflow-y-auto">
            <div 
              v-for="(file, index) in files" 
              :key="file.id"
              class="flex items-center justify-between p-3 bg-dark-input rounded-lg"
            >
              <div class="flex items-center flex-1">
                <img 
                  v-if="file.preview"
                  :src="file.preview"
                  :alt="file.name"
                  class="w-10 h-10 object-cover rounded mr-3"
                />
                <div class="flex-1">
                  <p class="text-dark-text text-sm font-medium truncate">{{ file.name }}</p>
                  <p class="text-dark-text-secondary text-xs">{{ formatFileSize(file.size) }}</p>
                </div>
              </div>
              
              <!-- 进度条 -->
              <div v-if="file.uploading" class="mx-4 w-24">
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    class="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    :style="{ width: file.progress + '%' }"
                  ></div>
                </div>
                <p class="text-xs text-center mt-1">{{ file.progress }}%</p>
              </div>
              
              <!-- 状态图标 -->
              <div class="flex items-center">
                <svg v-if="file.uploaded" class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <svg v-else-if="file.error" class="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                
                <button 
                  @click="removeFile(index)"
                  class="text-dark-text-secondary hover:text-red-500"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          <!-- 错误信息 -->
          <div v-if="error" class="mt-4 p-3 bg-red-100 border border-red-300 rounded-lg">
            <p class="text-red-700 text-sm">{{ error }}</p>
          </div>
        </div>
      </div>

      <!-- 弹窗底部 -->
      <div class="flex items-center justify-between p-4 border-t border-dark-border">
        <div class="text-sm text-dark-text-secondary">
          共 {{ files.length }} 个文件，已上传 {{ uploadedCount }} 个
        </div>
        
        <div class="flex space-x-3">
          <button 
            @click="closeModal"
            class="px-4 py-2 text-dark-text border border-dark-border rounded-md hover:bg-dark-hover"
          >
            取消
          </button>
          
          <button 
            @click="startUpload"
            :disabled="files.length === 0 || uploading"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ uploading ? '上传中...' : '开始上传' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { uploadGalleryImages, GalleryType } from '~/apis/business/gallery'
import JSZip from 'jszip'
import tencentCOS from '~/utils/tencentCOS'
import { extractImagesFromZip, validateZipFile } from '~/utils/zipUtils'

// Props
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  galleryType: {
    type: Number,
    required: true
  }
})

// Emits
const emit = defineEmits(['close', 'upload-success'])

// 响应式数据
const dropArea = ref(null)
const fileInput = ref(null)
const folderInput = ref(null)
const zipInput = ref(null)

const files = ref([])
const dragActive = ref(false)
const uploading = ref(false)
const error = ref('')

// (已移除COS相关变量，现在使用统一的tencentCOS工具类)

// 计算属性
const galleryTypeText = computed(() => {
  const typeMap = {
    1: '商品图库',
    2: '素材图库', 
    3: '结果图库'
  }
  return typeMap[props.galleryType] || '图库'
})

const uploadedCount = computed(() => {
  return files.value.filter(file => file.uploaded).length
})

// 文件类型和大小限制
const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
const maxFileSize = 10 * 1024 * 1024 // 10MB

// (已移除旧的COS相关函数，现在使用统一的tencentCOS工具类)

// 验证文件
const validateFile = (file) => {
  if (!allowedTypes.includes(file.type)) {
    return `不支持的文件格式: ${file.name}`
  }
  
  if (file.size > maxFileSize) {
    return `文件过大: ${file.name} (${formatFileSize(file.size)})`
  }
  
  return null
}

// 格式化文件大小
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// 创建文件预览
const createFilePreview = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      resolve(e.target.result)
    }
    reader.readAsDataURL(file)
  })
}

// 处理文件选择
const handleFileSelect = async (event) => {
  const selectedFiles = Array.from(event.target.files)
  await processFiles(selectedFiles)
  // 清空 input 值
  event.target.value = ''
}

// 处理ZIP文件选择
const handleZipSelect = async (event) => {
  const zipFile = event.target.files[0]
  if (!zipFile) return
  
  try {
    const zip = new JSZip()
    const contents = await zip.loadAsync(zipFile)
    const imageFiles = []
    
    for (const [filename, file] of Object.entries(contents.files)) {
      if (!file.dir && /\.(jpg|jpeg|png|webp)$/i.test(filename)) {
        const blob = await file.async('blob')
        const imageFile = new File([blob], filename.split('/').pop(), { type: getImageType(filename) })
        imageFiles.push(imageFile)
      }
    }
    
    if (imageFiles.length === 0) {
      error.value = 'ZIP文件中没有找到图片文件'
      return
    }
    
    await processFiles(imageFiles)
  } catch (err) {
    error.value = '解析ZIP文件失败：' + err.message
  }
  
  event.target.value = ''
}

// 获取图片类型
const getImageType = (filename) => {
  const ext = filename.split('.').pop().toLowerCase()
  const typeMap = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'webp': 'image/webp'
  }
  return typeMap[ext] || 'image/jpeg'
}

// 处理拖拽
const handleDrop = async (event) => {
  event.preventDefault()
  dragActive.value = false
  
  const droppedFiles = []
  const items = event.dataTransfer.items
  
  if (items) {
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      if (item.kind === 'file') {
        const file = item.getAsFile()
        if (file) droppedFiles.push(file)
      }
    }
  } else {
    droppedFiles.push(...event.dataTransfer.files)
  }
  
  await processFiles(droppedFiles)
}

// 处理文件
const processFiles = async (selectedFiles) => {
  error.value = ''
  
  for (const file of selectedFiles) {
    // 验证文件
    const validationError = validateFile(file)
    if (validationError) {
      error.value = validationError
      continue
    }
    
    // 检查是否已经添加过
    const exists = files.value.some(f => f.name === file.name && f.size === file.size)
    if (exists) continue
    
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
      key: null
    }
    
    // 创建预览
    if (file.type.startsWith('image/')) {
      fileObj.preview = await createFilePreview(file)
    }
    
    files.value.push(fileObj)
  }
}

// 上传文件到COS
const uploadFileToCos = async (fileObj) => {
  try {
    const result = await tencentCOS.uploadFile(fileObj.file, {
      galleryType: 'application',
      onProgress: (progress) => {
        fileObj.progress = progress.percent
      }
    })

    console.log('Gallery上传 - COS上传成功:', result)
    
    return {
      url: result.url,
      key: result.key,
      fileName: result.fileName
    }
  } catch (error) {
    console.error('Gallery上传 - COS上传失败:', error)
    throw error
  }
}

// 开始上传
const startUpload = async () => {
  if (files.value.length === 0) return
  
  uploading.value = true
  error.value = ''
  
  try {
    // 获取图片尺寸信息
    const getImageDimensions = (file) => {
      return new Promise((resolve) => {
        const img = new Image()
        img.onload = () => {
          resolve({ width: img.width, height: img.height })
        }
        img.onerror = () => {
          resolve({ width: 0, height: 0 })
        }
        img.src = URL.createObjectURL(file)
      })
    }
    
    // 上传所有文件到COS
    const uploadPromises = files.value
      .filter(fileObj => !fileObj.uploaded && !fileObj.error)
      .map(async (fileObj) => {
        try {
          fileObj.uploading = true
          
          // 获取图片尺寸
          const dimensions = await getImageDimensions(fileObj.file)
          
          // 上传到COS
          const result = await uploadFileToCos(fileObj)
          
          fileObj.uploading = false
          fileObj.uploaded = true
          fileObj.url = result.url
          fileObj.key = result.key
          fileObj.dimensions = dimensions
          
          return {
            imageName: fileObj.name,
            imageUrl: result.url,
            fileSize: fileObj.size,
            width: dimensions.width,
            height: dimensions.height,
            format: fileObj.file.type.split('/')[1].toUpperCase()
          }
        } catch (err) {
          fileObj.uploading = false
          fileObj.error = err.message
          console.error('文件上传失败:', err)
          return null
        }
      })
    
    const uploadResults = await Promise.all(uploadPromises)
    const successfulUploads = uploadResults.filter(result => result !== null)
    
    if (successfulUploads.length === 0) {
      throw new Error('没有文件上传成功')
    }
    
    // 调用添加图库接口
    const galleryParams = {
      galleryType: props.galleryType,
      imageList: successfulUploads
    }
    
    const response = await uploadGalleryImages(galleryParams)
    
    if (response.success) {
      emit('upload-success', {
        count: successfulUploads.length,
        files: successfulUploads
      })
      
      // 清空文件列表
      files.value = []
      closeModal()
    } else {
      throw new Error(response.message || '添加到图库失败')
    }
    
  } catch (err) {
    error.value = err.message
    console.error('上传失败:', err)
  } finally {
    uploading.value = false
  }
}

// 移除文件
const removeFile = (index) => {
  files.value.splice(index, 1)
}

// 清空文件列表
const clearFiles = () => {
  files.value = []
  error.value = ''
}

// 触发文件选择
const triggerFileInput = () => {
  fileInput.value?.click()
}

const triggerFolderInput = () => {
  folderInput.value?.click()
}

const triggerZipInput = () => {
  zipInput.value?.click()
}

// 关闭弹窗
const closeModal = () => {
  if (!uploading.value) {
    emit('close')
    files.value = []
    error.value = ''
  }
}

// 拖拽事件
const onDragEnter = () => { dragActive.value = true }
const onDragLeave = () => { dragActive.value = false }

// 监听拖拽事件
nextTick(() => {
  if (dropArea.value) {
    dropArea.value.addEventListener('dragenter', onDragEnter)
    dropArea.value.addEventListener('dragleave', onDragLeave)
  }
})
</script> 