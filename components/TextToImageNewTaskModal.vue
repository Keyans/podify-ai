<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    <div class="bg-dark-card rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto text-dark-text">
      <!-- Header -->
      <div class="p-5 border-b border-dark-border flex justify-between items-center">
        <h3 class="font-medium text-dark-text">新建生图任务</h3>
        <button @click="close" class="text-gray-400 hover:text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div class="p-6">
        <!-- 生图提示词 -->
        <div class="mb-6">
          <label class="text-sm font-medium text-dark-text mb-3 block">生图提示词</label>
          
          <!-- 参考图展示区域 - 显示在输入框上方 -->
          <div v-if="referenceImages.length > 0" class="mb-3">
            <div class="flex flex-wrap gap-2">
              <div 
                v-for="(image, index) in referenceImages" 
                :key="index"
                class="relative group"
              >
                <div class="w-20 h-20 rounded-md border border-dark-border overflow-hidden">
                  <img 
                    :src="image.preview" 
                    :alt="image.name"
                    class="w-full h-full object-cover"
                    :class="{ 'opacity-50': image.uploading }"
                  />
                  <!-- 上传中的加载指示器 -->
                  <div v-if="image.uploading" class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <!-- 上传成功指示器 -->
                  <div v-else-if="image.url" class="absolute top-1 right-1">
                    <div class="w-3 h-3 bg-cyan-400 rounded-full flex items-center justify-center">
                      <svg class="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
                <button 
                  @click="removeReferenceImage(index)"
                  class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
          
          <div class="relative">
            <textarea 
              v-model="formData.promptWord"
              placeholder="请描述图片内容"
              class="w-full h-24 px-3 py-2 pr-20 bg-dark-input border border-dark-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-dark-text resize-none"
            />
            <div class="absolute bottom-2 right-2 flex items-center space-x-1">
              <!-- 参考图选择按钮 -->
              <div class="relative">
                <button 
                  @click="toggleImageOptions"
                  class="p-1.5 bg-dark-hover hover:bg-dark-border text-dark-text-secondary hover:text-dark-text rounded-md transition-colors"
                  title="添加参考图"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </button>
                
                <!-- 图片选择下拉菜单 -->
                <div v-if="showImageOptions" class="absolute bottom-full right-0 mb-2 w-48 bg-dark-card border border-dark-border rounded-lg shadow-lg z-10">
                  <div class="py-2">
                    <button 
                      @click="triggerFileInput"
                      class="w-full px-4 py-2 text-left text-sm text-dark-text hover:bg-dark-hover flex items-center space-x-2"
                    >
                      <svg class="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <span>上传图片文件</span>
                    </button>
                    <button 
                      @click="openGalleryModal"
                      class="w-full px-4 py-2 text-left text-sm text-dark-text hover:bg-dark-hover flex items-center space-x-2"
                    >
                      <svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      <span>从图库选择</span>
                    </button>
                  </div>
                </div>
              </div>
              
              <!-- 智能优化按钮 -->
            <button 
              @click="optimizePrompt"
                class="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 flex items-center"
            >
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              智能优化
            </button>
          </div>
          </div>
          
          <!-- 隐藏的文件输入 -->
          <input 
            ref="fileInput"
            type="file" 
            accept="image/*" 
            multiple
            class="hidden"
            @change="handleFileSelect"
          />
        </div>

        <!-- 生图尺寸 -->
        <div class="mb-6">
          <label class="text-sm font-medium text-dark-text mb-3 block">生图尺寸</label>
          <div class="text-sm text-blue-400 mb-3">这项可以稍等，训练好了再开放</div>
          
          <!-- 尺寸选项 - 8块布局 -->
          <div class="grid grid-cols-4 gap-3">
            <!-- 预设尺寸选项 -->
            <button 
              v-for="size in sizeOptions" 
              :key="size.value"
              @click="selectSize(size)"
              class="aspect-square border-2 rounded-md flex flex-col items-center justify-center text-xs hover:border-blue-500 transition-colors"
              :class="selectedSizeValue === size.value ? 'border-blue-500 bg-blue-500/10' : 'border-dark-border'"
            >
              <div 
                class="bg-gray-400 rounded-sm mb-1" 
                :style="getSizeStyle(size.width, size.height)"
              ></div>
              <span class="text-dark-text-secondary">{{ size.label }}</span>
            </button>
            
            <!-- 自定义尺寸选项 -->
            <button 
              @click="selectCustomSize"
              class="aspect-square border-2 rounded-md flex flex-col items-center justify-center text-xs hover:border-blue-500 transition-colors"
              :class="selectedSizeValue === 0 ? 'border-blue-500 bg-blue-500/10' : 'border-dark-border'"
            >
              <div class="w-6 h-6 bg-gray-400 rounded-sm mb-1 flex items-center justify-center">
                <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <span class="text-dark-text-secondary">自定义</span>
            </button>
          </div>
          
          <!-- 自定义尺寸输入框 -->
          <div v-if="selectedSizeValue === 0" class="mt-4 p-4 border border-dark-border rounded-lg bg-dark-input">
            <div class="flex items-center space-x-3">
              <div class="flex-1">
                <label class="text-xs text-dark-text-secondary mb-1 block">宽度</label>
                <input 
                  v-model="formData.creatorWidth"
                  type="number" 
                  placeholder="512"
                  class="w-full px-3 py-2 text-sm bg-dark-bg border border-dark-border rounded text-dark-text focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  min="64"
                  max="2048"
                />
              </div>
              <div class="flex items-center justify-center pt-6">
                <span class="text-dark-text-secondary text-sm">×</span>
              </div>
              <div class="flex-1">
                <label class="text-xs text-dark-text-secondary mb-1 block">高度</label>
                <input 
                  v-model="formData.creatorHeight"
                  type="number" 
                  placeholder="512"
                  class="w-full px-3 py-2 text-sm bg-dark-bg border border-dark-border rounded text-dark-text focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  min="64"
                  max="2048"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- 生图数量 -->
        <div class="mb-6">
          <label class="text-sm font-medium text-dark-text mb-3 block">生图数量</label>
          <div class="flex items-center">
            <select 
              v-model="formData.creatorNum"
              class="px-3 py-2 bg-dark-input border border-dark-border rounded-md text-dark-text focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <span class="text-sm text-dark-text-secondary ml-3">最小1张，最多每次10张</span>
          </div>
        </div>
      </div>
      
      <div class="p-5 border-t border-dark-border flex justify-end space-x-3">
        <button @click="close" class="px-4 py-2 border border-dark-border rounded-md text-dark-text-secondary hover:bg-dark-hover">取消</button>
        <button 
          @click="submit" 
          :disabled="submitting || !formData.promptWord.trim()"
          class="px-4 py-2 bg-cyan-400 text-white rounded-md hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          <div v-if="submitting" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
          {{ submitting ? '提交中...' : '提交任务' }}
        </button>
      </div>
    </div>
    
    <!-- 图库选择弹窗 -->
    <div v-if="showGalleryModal" class="fixed inset-0 bg-black bg-opacity-50 z-60 flex items-center justify-center">
      <div class="bg-dark-card rounded-lg w-full max-w-4xl max-h-[80vh] overflow-y-auto text-dark-text">
        <div class="p-5 border-b border-dark-border flex justify-between items-center">
          <h3 class="font-medium text-dark-text">从图库选择</h3>
          <button @click="closeGalleryModal" class="text-gray-400 hover:text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="p-6">
          <div class="grid grid-cols-4 gap-4">
            <div 
              v-for="image in galleryImages" 
              :key="image.id"
              @click="selectGalleryImage(image)"
              class="aspect-square bg-dark-input rounded-lg border-2 border-transparent hover:border-blue-500 cursor-pointer overflow-hidden"
              :class="{ 'border-blue-500 bg-blue-500/10': selectedGalleryImages.includes(image.id) }"
            >
              <img :src="image.url" :alt="image.name" class="w-full h-full object-cover" />
            </div>
          </div>
          
          <div class="mt-6 flex justify-end space-x-3">
            <button @click="closeGalleryModal" class="px-4 py-2 border border-dark-border rounded-md text-dark-text-secondary hover:bg-dark-hover">取消</button>
            <button 
              @click="confirmGallerySelection"
              :disabled="selectedGalleryImages.length === 0"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              确定选择 ({{ selectedGalleryImages.length }})
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, defineProps, defineEmits, watch, onMounted, onUnmounted } from 'vue'
import { createTextToImageTask } from '~/apis/business/text-to-image'
import { getTencentCosCredentials } from '~/apis/business/oss'
import tencentCOS from '~/utils/tencentCOS'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['close', 'submit'])

// 表单数据 - 按照新的API接口要求
const formData = reactive({
  promptWord: '',
  creatorSize: 4, // 默认选择 1:1 (对应value=4)
  creatorWidth: 100,
  creatorHeight: 100,
  creatorNum: 3,
  uploadType: 1, // 1: 本地上传, 2: 图库上传
  // 以下字段只有上传示例图时才会有
  imageName: '',
  imageUrl: '',
  fileSize: 0,
  width: 0,
  height: 0,
  format: ''
})

// 提交状态
const submitting = ref(false)

// 参考图相关
const referenceImages = ref([])
const fileInput = ref(null)
const showImageOptions = ref(false)

// 图库相关
const showGalleryModal = ref(false)
const selectedGalleryImages = ref([])
const galleryImages = ref([
  { id: 1, name: '示例图片1', url: 'https://picsum.photos/200/200?random=1' },
  { id: 2, name: '示例图片2', url: 'https://picsum.photos/200/200?random=2' },
  { id: 3, name: '示例图片3', url: 'https://picsum.photos/200/200?random=3' },
  { id: 4, name: '示例图片4', url: 'https://picsum.photos/200/200?random=4' },
  { id: 5, name: '示例图片5', url: 'https://picsum.photos/200/200?random=5' },
  { id: 6, name: '示例图片6', url: 'https://picsum.photos/200/200?random=6' },
  { id: 7, name: '示例图片7', url: 'https://picsum.photos/200/200?random=7' },
  { id: 8, name: '示例图片8', url: 'https://picsum.photos/200/200?random=8' }
])

// COS 相关
const cosInstance = ref(null)
const credentials = ref(null)

// 选中的尺寸值
const selectedSizeValue = ref(4) // 默认选择 1:1

// 尺寸选项 - 0到7分别对应不同状态
const sizeOptions = [
  { value: 1, label: '16:9', width: 1024, height: 576 },
  { value: 2, label: '4:3', width: 768, height: 576 },
  { value: 3, label: '3:2', width: 768, height: 512 },
  { value: 4, label: '1:1', width: 512, height: 512 },
  { value: 5, label: '2:3', width: 512, height: 768 },
  { value: 6, label: '3:4', width: 576, height: 768 },
  { value: 7, label: '9:16', width: 576, height: 1024 }
]

// 计算真实比例的尺寸样式
const getSizeStyle = (width, height) => {
  const maxSize = 24 // 最大尺寸24px
  const ratio = width / height
  
  let displayWidth, displayHeight
  
  if (ratio > 1) {
    // 宽大于高
    displayWidth = maxSize
    displayHeight = maxSize / ratio
  } else {
    // 高大于宽或相等
    displayHeight = maxSize
    displayWidth = maxSize * ratio
  }
  
  return {
    width: `${Math.round(displayWidth)}px`,
    height: `${Math.round(displayHeight)}px`
  }
}

// 点击外部关闭下拉菜单
const handleClickOutside = (event) => {
  if (showImageOptions.value) {
    showImageOptions.value = false
  }
}

// 组件挂载时添加全局点击监听
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

// 组件卸载时移除监听
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// 初始化COS
const initCOS = async () => {
  try {
    const response = await getTencentCosCredentials()
    if (response.success) {
      credentials.value = response.data
      
      // 动态导入COS SDK
      const COS = (await import('cos-js-sdk-v5')).default
      
      cosInstance.value = new COS({
        SecretId: credentials.value.tmpSecretId,
        SecretKey: credentials.value.tmpSecretKey,
        SecurityToken: credentials.value.sessionToken,
        StartTime: credentials.value.startTime,
        ExpiredTime: credentials.value.expiredTime
      })
    }
  } catch (error) {
    console.error('初始化COS失败:', error)
  }
}

// 生成唯一文件名
const generateFileName = (originalName) => {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(7)
  const extension = originalName.split('.').pop()
  return `${timestamp}_${random}.${extension}`
}

// 生成AI项目专用的文件路径
const generateAiFilePath = (fileName) => {
  // 获取当前日期，格式：YYYYMMDD
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const dateStr = `${year}${month}${day}`
  
  // 构建AI项目路径：pathPrefix/application/YYYYMMDD/filename (使用application目录)
  const aiPath = `application/${dateStr}/${fileName}`
  
  console.log('文生图 - 生成AI项目路径:', {
    dateStr,
    fileName,
    aiPath,
    fullPath: `${credentials.value.pathPrefix}/${aiPath}`
  })
  
  return aiPath
}

// 上传文件到COS（只在提交时调用）
const uploadFileToCos = async (file) => {
  try {
    const result = await tencentCOS.uploadFile(file, {
      galleryType: 'application'
    })

    console.log('文生图 - COS上传成功:', result)
    
    return {
      url: result.url,
      key: result.key,
      fileName: result.fileName
    }
  } catch (error) {
    console.error('文生图 - COS上传失败:', error)
    throw error
  }
}

// 选择预设尺寸
const selectSize = (size) => {
  selectedSizeValue.value = size.value
  formData.creatorSize = size.value
  // 清空自定义尺寸
  formData.creatorWidth = 100
  formData.creatorHeight = 100
}

// 选择自定义尺寸
const selectCustomSize = () => {
  selectedSizeValue.value = 0
  formData.creatorSize = 0
  // 设置默认的自定义尺寸
  if (!formData.creatorWidth || formData.creatorWidth === 100) formData.creatorWidth = 512
  if (!formData.creatorHeight || formData.creatorHeight === 100) formData.creatorHeight = 512
}

// 切换图片选项菜单
const toggleImageOptions = (event) => {
  event.stopPropagation()
  showImageOptions.value = !showImageOptions.value
}

// 触发文件选择
const triggerFileInput = () => {
  showImageOptions.value = false
  fileInput.value?.click()
}

// 打开图库弹窗
const openGalleryModal = () => {
  showImageOptions.value = false
  showGalleryModal.value = true
  selectedGalleryImages.value = []
}

// 关闭图库弹窗
const closeGalleryModal = () => {
  showGalleryModal.value = false
  selectedGalleryImages.value = []
}

// 选择图库图片
const selectGalleryImage = (image) => {
  const index = selectedGalleryImages.value.indexOf(image.id)
  if (index > -1) {
    selectedGalleryImages.value.splice(index, 1)
  } else {
    selectedGalleryImages.value.push(image.id)
  }
}

// 确认图库选择
const confirmGallerySelection = () => {
  const selectedImages = galleryImages.value.filter(img => selectedGalleryImages.value.includes(img.id))
  
  selectedImages.forEach(image => {
    referenceImages.value.push({
      file: null,
      preview: image.url,
      name: image.name,
      size: 0,
      width: 512,
      height: 512,
      format: 'JPG',
      uploading: false,
      url: image.url, // 图库图片直接有URL
      key: null,
      isFromGallery: true // 标记来自图库
    })
  })
  
  // 设置为图库上传
  if (selectedImages.length > 0) {
    formData.uploadType = 2
    const lastImage = selectedImages[selectedImages.length - 1]
    formData.imageName = lastImage.name
    formData.imageUrl = lastImage.url
    formData.fileSize = 0
    formData.width = 512
    formData.height = 512
    formData.format = 'JPG'
  }
  
  closeGalleryModal()
}

// 处理文件选择（本地上传，先预览不上传）
const handleFileSelect = async (event) => {
  const files = Array.from(event.target.files)
  
  for (const file of files) {
    if (file.type.startsWith('image/') && file.size <= 10 * 1024 * 1024) { // 10MB限制
      try {
        // 创建预览和获取图片尺寸
        const imageInfo = await processImageFile(file)
        
        // 添加到参考图列表，不上传，只显示预览
        referenceImages.value.push({
          ...imageInfo,
          uploading: false, // 不显示上传中状态
          url: null, // 暂时没有云端URL
          key: null,
          isFromGallery: false // 标记来自本地上传
        })
        
        // 设置uploadType为本地上传
        formData.uploadType = 1
        
        // 更新formData中的图片信息（只保存最后一张图片的信息）
        formData.imageName = imageInfo.name
        formData.imageUrl = '' // 本地上传暂时没有URL
        formData.fileSize = imageInfo.size
        formData.width = imageInfo.width
        formData.height = imageInfo.height
        formData.format = imageInfo.format
        
        console.log('图片添加成功，将在提交时上传到COS:', imageInfo)
      } catch (error) {
        console.error('图片处理失败:', error)
      }
    }
  }
  
  // 清空input
  event.target.value = ''
}

// 处理图片文件，获取尺寸信息
const processImageFile = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        resolve({
          file,
          preview: e.target.result,
          name: file.name,
          size: file.size,
          width: img.width,
          height: img.height,
          format: file.type.split('/')[1].toUpperCase()
        })
      }
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  })
}

// 移除参考图
const removeReferenceImage = (index) => {
  referenceImages.value.splice(index, 1)
  // 如果删除的是最后一张图片，清空图片相关字段
  if (referenceImages.value.length === 0) {
    formData.imageName = ''
    formData.imageUrl = ''
    formData.fileSize = 0
    formData.width = 0
    formData.height = 0
    formData.format = ''
    formData.uploadType = 1
  } else {
    // 更新为剩余图片中的最后一张
    const lastImage = referenceImages.value[referenceImages.value.length - 1]
    formData.imageName = lastImage.name
    formData.imageUrl = lastImage.url || ''
    formData.fileSize = lastImage.size
    formData.width = lastImage.width
    formData.height = lastImage.height
    formData.format = lastImage.format
    formData.uploadType = lastImage.isFromGallery ? 2 : 1
  }
}

// 智能优化提示词
const optimizePrompt = () => {
  console.log('智能优化提示词:', formData.promptWord)
  if (formData.promptWord.trim()) {
    formData.promptWord = formData.promptWord + ', high quality, detailed, professional'
  }
}

// 关闭弹窗
const close = () => {
  emits('close')
}

// 提交表单
const submit = async () => {
  try {
    submitting.value = true
    
    // 构建API请求参数
    const taskParams = {
      promptWord: formData.promptWord.trim(),
      creatorSize: formData.creatorSize,
      creatorWidth: formData.creatorWidth,
      creatorHeight: formData.creatorHeight,
      creatorNum: parseInt(formData.creatorNum)
    }
    
    // 如果有参考图，处理图片上传
    if (referenceImages.value.length > 0) {
      const lastImage = referenceImages.value[referenceImages.value.length - 1]
      
      if (!lastImage.isFromGallery && lastImage.file) {
        // 本地上传的图片，现在上传到COS
        console.log('上传本地图片到COS...')
        const uploadResult = await uploadFileToCos(lastImage.file)
        
        taskParams.uploadType = 1
        taskParams.imageName = lastImage.name
        taskParams.imageUrl = uploadResult.url
        taskParams.fileSize = lastImage.size
        taskParams.width = lastImage.width
        taskParams.height = lastImage.height
        taskParams.format = lastImage.format
      } else if (lastImage.isFromGallery) {
        // 图库图片，直接使用URL
        taskParams.uploadType = 2
        taskParams.imageName = lastImage.name
        taskParams.imageUrl = lastImage.url
        taskParams.fileSize = lastImage.size
        taskParams.width = lastImage.width
        taskParams.height = lastImage.height
        taskParams.format = lastImage.format
      }
    }
    
    console.log('创建文生图任务参数:', taskParams)
    
    const response = await createTextToImageTask(taskParams)
    
    if (response.success) {
      console.log('文生图任务创建成功:', response)
      
      const resultData = {
        taskParams: taskParams,
        taskResponse: response.data,
        success: true
      }
      
      emits('submit', resultData)
    } else {
      console.error('文生图任务创建失败:', response)
      
      const resultData = {
        taskParams: taskParams,
        taskResponse: null,
        success: false,
        error: response.message || '创建文生图任务失败'
      }
      
      emits('submit', resultData)
    }
    
  } catch (error) {
    console.error('提交文生图任务失败:', error)
    
    const resultData = {
      taskParams: formData,
      taskResponse: null,
      success: false,
      error: error.message || '提交文生图任务失败'
    }
    
    emits('submit', resultData)
  } finally {
    submitting.value = false
  }
}

// 重置表单
const resetForm = () => {
  formData.promptWord = ''
  formData.creatorSize = 4
  formData.creatorWidth = 100
  formData.creatorHeight = 100
  formData.creatorNum = 3
  formData.uploadType = 1
  formData.imageName = ''
  formData.imageUrl = ''
  formData.fileSize = 0
  formData.width = 0
  formData.height = 0
  formData.format = ''
  selectedSizeValue.value = 4 // 重置为 1:1
  referenceImages.value = []
  submitting.value = false
  showGalleryModal.value = false
  selectedGalleryImages.value = []
  showImageOptions.value = false
}

// 监听弹窗关闭，重置表单
watch(() => props.isOpen, (newVal) => {
  if (!newVal) {
    resetForm()
  } else {
    // 弹窗打开时初始化COS
    initCOS()
  }
})
</script> 