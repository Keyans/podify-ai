<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    <div class="bg-dark-card rounded-lg w-full max-w-xl max-h-[90vh] overflow-y-auto text-dark-text">
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
          <div class="flex items-center justify-between mb-2">
            <label class="text-sm font-medium text-dark-text">生图提示词</label>
            <span class="text-green-400 text-sm">添加参考图</span>
          </div>
          
          <!-- 参考图展示区域 -->
          <div v-if="referenceImages.length > 0" class="mb-3">
            <div class="flex flex-wrap gap-2">
              <div 
                v-for="(image, index) in referenceImages" 
                :key="index"
                class="relative group"
              >
                <div class="w-16 h-16 rounded-md border border-dark-border overflow-hidden">
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
                    <div class="w-3 h-3 bg-green-500 rounded-full flex items-center justify-center">
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
              v-model="formData.prompt"
              placeholder="请描述图片内容"
              class="w-full h-24 px-3 py-2 bg-dark-input border border-dark-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-dark-text resize-none"
            />
            <div class="absolute bottom-2 right-2 flex items-center space-x-2">
              <!-- 图片上传按钮 -->
              <button 
                @click="triggerFileInput"
                class="px-2 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 flex items-center"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
              <!-- 智能优化按钮 -->
            <button 
              @click="optimizePrompt"
                class="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 flex items-center"
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
          <div class="grid grid-cols-4 gap-3 mb-3">
            <button 
              v-for="size in sizeOptions" 
              :key="size.key"
              @click="selectSize(size)"
              class="aspect-square border-2 rounded-md flex flex-col items-center justify-center text-xs hover:border-blue-500 transition-colors"
              :class="selectedSize.key === size.key ? 'border-blue-500 bg-blue-500/10' : 'border-dark-border'"
            >
              <div class="w-6 h-4 bg-gray-400 rounded-sm mb-1" :style="{ aspectRatio: size.width / size.height }"></div>
              <span class="text-dark-text-secondary">{{ size.label }}</span>
            </button>
          </div>
          
          <!-- 自定义尺寸 -->
          <div class="border-2 border-dashed border-dark-border rounded-md p-4">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm text-dark-text-secondary">自定义尺寸</span>
            </div>
            <div class="flex items-center space-x-3">
              <div class="flex-1">
                <label class="text-xs text-dark-text-secondary mb-1 block">宽度</label>
                <input 
                  v-model="customSize.width"
                  type="number" 
                  placeholder="512"
                  class="w-full px-3 py-2 text-sm bg-dark-input border border-dark-border rounded text-dark-text focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
                  v-model="customSize.height"
                  type="number" 
                  placeholder="512"
                  class="w-full px-3 py-2 text-sm bg-dark-input border border-dark-border rounded text-dark-text focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
              v-model="formData.count"
              class="px-3 py-2 bg-dark-input border border-dark-border rounded-md text-dark-text focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <span class="text-sm text-dark-text-secondary ml-3">最小1张，最多支持10张</span>
          </div>
        </div>
      </div>
      
      <div class="p-5 border-t border-dark-border flex justify-end space-x-3">
        <button @click="close" class="px-4 py-2 border border-dark-border rounded-md text-dark-text-secondary hover:bg-dark-hover">取消</button>
        <button 
          @click="submit" 
          :disabled="submitting || !formData.prompt.trim()"
          class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          <div v-if="submitting" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
          {{ submitting ? '提交中...' : '提交任务 (5秒内)' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, defineProps, defineEmits, watch } from 'vue'
import { createTextToImageTask } from '~/apis/business/text-to-image'
import { getTencentCosCredentials } from '~/apis/business/oss'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['close', 'submit'])

// 表单数据
const formData = reactive({
  prompt: '',
  negativePrompt: '',
  width: 512,
  height: 512,
  count: 1,
  style: '',
  seed: null
})

// 提交状态
const submitting = ref(false)

// 参考图相关
const referenceImages = ref([])
const fileInput = ref(null)

// COS 相关
const cosInstance = ref(null)
const credentials = ref(null)

// 尺寸选项
const sizeOptions = [
  { key: '16:9', label: '16:9', width: 1024, height: 576 },
  { key: '4:3', label: '4:3', width: 768, height: 576 },
  { key: '3:2', label: '3:2', width: 768, height: 512 },
  { key: '1:1', label: '1:1', width: 512, height: 512 },
  { key: '2:3', label: '2:3', width: 512, height: 768 },
  { key: '3:4', label: '3:4', width: 576, height: 768 },
  { key: '9:16', label: '9:16', width: 576, height: 1024 }
]

// 选中的尺寸
const selectedSize = ref(sizeOptions[3]) // 默认选择 1:1

// 自定义尺寸
const customSize = reactive({
  width: '',
  height: ''
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

// 上传文件到COS
const uploadFileToCos = async (file) => {
  if (!cosInstance.value || !credentials.value) {
    await initCOS()
  }

  return new Promise((resolve, reject) => {
    const fileName = generateFileName(file.name)
    const key = `${credentials.value.pathPrefix}/${fileName}`
    
    cosInstance.value.uploadFile({
      Bucket: credentials.value.bucketName,
      Region: credentials.value.region,
      Key: key,
      Body: file
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

// 选择尺寸
const selectSize = (size) => {
  selectedSize.value = size
  formData.width = size.width
  formData.height = size.height
  // 清空自定义尺寸
  customSize.width = ''
  customSize.height = ''
}

// 触发文件选择
const triggerFileInput = () => {
  fileInput.value?.click()
}

// 处理文件选择
const handleFileSelect = async (event) => {
  const files = Array.from(event.target.files)
  
  for (const file of files) {
    if (file.type.startsWith('image/') && file.size <= 10 * 1024 * 1024) { // 10MB限制
      try {
        // 创建预览和获取图片尺寸
        const imageInfo = await processImageFile(file)
        
        // 添加到参考图列表
        referenceImages.value.push({
          ...imageInfo,
          uploading: true,
          url: null,
          key: null
        })
        
        // 上传到COS
        const uploadResult = await uploadFileToCos(file)
        
        // 更新图片信息
        const imageIndex = referenceImages.value.findIndex(img => img.file === file)
        if (imageIndex !== -1) {
          referenceImages.value[imageIndex].uploading = false
          referenceImages.value[imageIndex].url = uploadResult.url
          referenceImages.value[imageIndex].key = uploadResult.key
        }
        
        console.log('图片上传成功:', uploadResult)
      } catch (error) {
        console.error('图片上传失败:', error)
        // 移除上传失败的图片
        const imageIndex = referenceImages.value.findIndex(img => img.file === file)
        if (imageIndex !== -1) {
          referenceImages.value.splice(imageIndex, 1)
        }
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
}

// 智能优化提示词
const optimizePrompt = () => {
  console.log('智能优化提示词:', formData.prompt)
  if (formData.prompt.trim()) {
    formData.prompt = formData.prompt + ', high quality, detailed, professional'
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
    
    // 检查是否使用自定义尺寸
    if (customSize.width && customSize.height) {
      formData.width = parseInt(customSize.width)
      formData.height = parseInt(customSize.height)
    }
    
    // 调用创建文生图任务接口
    const taskParams = {
      prompt: formData.prompt.trim(),
      negativePrompt: formData.negativePrompt || undefined,
      width: formData.width,
      height: formData.height,
      count: parseInt(formData.count),
      style: formData.style || undefined,
      seed: formData.seed || undefined,
      referenceImages: referenceImages.value
        .filter(img => img.url && !img.uploading) // 只包含上传成功的图片
        .map(img => ({
          imageName: img.name,
          imageUrl: img.url,
          fileSize: img.size,
          width: img.width,
          height: img.height,
          format: img.format,
          key: img.key
        }))
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
  formData.prompt = ''
  formData.negativePrompt = ''
  formData.width = 512
  formData.height = 512
  formData.count = 1
  formData.style = ''
  formData.seed = null
  selectedSize.value = sizeOptions[3] // 重置为 1:1
  customSize.width = ''
  customSize.height = ''
  referenceImages.value = []
  submitting.value = false
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