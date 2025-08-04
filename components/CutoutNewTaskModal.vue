<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    <!-- 主弹窗 -->
    <div v-if="!showLibrarySelector" class="bg-dark-card rounded-lg w-full max-w-xl max-h-[90vh] overflow-y-auto text-dark-text">
      <!-- Header -->
      <div class="p-5 border-b border-dark-border flex justify-between items-center">
        <h3 class="font-medium text-dark-text">新建抠图任务</h3>
        <button @click="close" class="text-gray-400 hover:text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div class="p-6">
        <!-- Upload/Library Select Buttons -->
        <div class="flex space-x-4 mb-8">
          <button 
            @click="activeTab = 'upload'"
            class="flex-1 py-3 px-4 flex items-center justify-center border border-dark-border rounded-md hover:bg-dark-hover focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            上传图片
          </button>
          <button 
            @click="openLibrarySelector"
            class="flex-1 py-3 px-4 flex items-center justify-center border border-dark-border rounded-md hover:bg-dark-hover focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            图库选择
          </button>
        </div>
        
        <!-- 腾讯云 COS 上传组件 -->
        <div v-if="activeTab === 'upload'" class="mb-6">
          <TencentCosUpload
            ref="cosUploadRef"
            :multiple="true"
            :max-files="1000"
            upload-text="请在上方选择图片"
            @upload-success="handleUploadSuccess"
            @upload-error="handleUploadError"
            @files-change="handleFilesChange"
          />
        </div>
        
        <div class="text-sm text-gray-400 flex items-center mt-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          一次最多支持 1000 张图片
        </div>
      </div>
      
      <div class="p-5 border-t border-dark-border flex justify-end space-x-3">
        <button @click="close" class="px-4 py-2 border border-dark-border rounded-md text-gray-400 hover:bg-dark-hover">取消</button>
        <button 
          @click="submit" 
          :disabled="submitting"
          class="px-4 py-2 bg-cyan-400 text-white rounded-md hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          <div v-if="submitting" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
          {{ submitting ? '上传中...' : '提交任务' }}
        </button>
      </div>
    </div>
    
    <!-- 图库选择器弹窗 -->
    <div v-if="showLibrarySelector" class="bg-dark-card rounded-lg w-full max-w-xl max-h-[90vh] overflow-y-auto text-dark-text">
      <div class="p-5 border-b border-dark-border flex justify-between items-center">
        <h3 class="font-medium text-dark-text">从图库选择</h3>
        <button @click="closeLibrarySelector" class="text-gray-400 hover:text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <div class="p-6">
        <!-- 搜索区域 -->
        <div class="flex mb-6">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="搜索图片"
            class="flex-1 px-3 py-2 bg-dark-input border border-dark-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-dark-text"
          />
          <div class="relative ml-2">
            <button 
              @click="showCategoryDropdown = !showCategoryDropdown"
              class="px-3 py-2 bg-dark-input border border-dark-border rounded-md flex items-center"
            >
              {{ selectedCategory }}
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <!-- Dropdown Menu -->
            <div v-if="showCategoryDropdown" class="absolute top-full left-0 mt-1 w-32 bg-dark-card border border-dark-border rounded-md shadow-lg z-10">
              <button 
                v-for="category in ['全部', '产品', '服装', '配饰', '家居']" 
                :key="category"
                @click="selectCategory(category)"
                class="w-full text-left px-3 py-2 hover:bg-dark-hover"
              >
                {{ category }}
              </button>
            </div>
          </div>
        </div>
        
        <!-- 图库图片列表 -->
        <div class="grid grid-cols-5 gap-3">
          <div v-for="(image, index) in libraryImages" :key="index" class="relative">
            <div 
              class="relative h-20 w-full rounded-md overflow-hidden cursor-pointer"
              :class="{'ring-2 ring-green-500': image.selected}"
              @click="toggleSelectImage(index)"
            >
              <img :src="image.url" alt="图库图片" class="h-full w-full object-cover">
                              <div v-if="image.selected" class="absolute top-1 right-1 bg-cyan-400 rounded-full p-1">
                <svg class="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 分页 -->
        <div class="flex items-center justify-center mt-6 space-x-2">
          <button class="p-1 border border-dark-border rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button class="w-8 h-8 flex items-center justify-center border border-dark-border rounded-md bg-dark-hover">1</button>
          <button class="w-8 h-8 flex items-center justify-center border border-dark-border rounded-md">2</button>
          <button class="w-8 h-8 flex items-center justify-center border border-dark-border rounded-md">3</button>
          <span class="text-gray-400">...</span>
          <button class="p-1 border border-dark-border rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        <div class="text-sm text-gray-400 mt-4">
          已选 {{ selectedLibraryImages.length }} 张图片
        </div>
      </div>
      
      <div class="p-5 border-t border-dark-border flex justify-end space-x-3">
        <button @click="closeLibrarySelector" class="px-4 py-2 border border-dark-border rounded-md text-gray-400 hover:bg-dark-hover">取消</button>
        <button @click="confirmLibrarySelection" class="px-4 py-2 bg-cyan-400 text-white rounded-md hover:bg-cyan-500">确定选择 (5秒内)</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, defineProps, defineEmits, watch, computed } from 'vue'
import TencentCosUpload from './TencentCosUpload.vue'
import { createMattingTask } from '~/apis/business/matting'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['close', 'submit'])

// 状态变量
const activeTab = ref('upload')
const showLibrarySelector = ref(false)
const searchQuery = ref('')
const showCategoryDropdown = ref(false)
const selectedCategory = ref('全部')
const selectedFiles = ref([])

// COS 上传组件引用
const cosUploadRef = ref(null)

// 上传成功的文件列表
const uploadedFiles = ref([])

// 提交状态
const submitting = ref(false)

// 模拟图库图片数据
const libraryImages = ref([
  { id: 1, url: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Product+1', selected: false },
  { id: 2, url: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Product+2', selected: false },
  { id: 3, url: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=Product+3', selected: false },
  { id: 4, url: 'https://via.placeholder.com/150/FF00FF/FFFFFF?text=Product+4', selected: false },
  { id: 5, url: 'https://via.placeholder.com/150/FFFF00/000000?text=Product+5', selected: false },
  { id: 6, url: 'https://via.placeholder.com/150/000000/FFFFFF?text=Product+6', selected: false },
  { id: 7, url: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Product+7', selected: false },
  { id: 8, url: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Product+8', selected: false },
  { id: 9, url: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=Product+9', selected: false },
  { id: 10, url: 'https://via.placeholder.com/150/FF00FF/FFFFFF?text=Product+10', selected: false }
])

// 计算已选择的图库图片
const selectedLibraryImages = computed(() => {
  return libraryImages.value.filter(img => img.selected)
})

// COS 上传成功处理
const handleUploadSuccess = (result) => {
  console.log('文件上传成功:', result)
  uploadedFiles.value.push(result)
}

// COS 上传失败处理
const handleUploadError = (error) => {
  console.error('文件上传失败:', error)
}

// COS 文件变化处理
const handleFilesChange = (files) => {
  console.log('文件列表变化:', files)
}

// 处理文件上传 (保留用于图库选择)
const handleFileUpload = (event) => {
  const files = Array.from(event.target.files)
  
  // 为每个文件创建预览
  files.forEach(file => {
    const reader = new FileReader()
    reader.onload = (e) => {
      selectedFiles.value.push({
        file,
        preview: e.target.result,
        name: file.name
      })
    }
    reader.readAsDataURL(file)
  })
}

// 移除已选择的文件
const removeFile = (index) => {
  selectedFiles.value.splice(index, 1)
}

// 打开图库选择器
const openLibrarySelector = () => {
  showLibrarySelector.value = true
}

// 关闭图库选择器
const closeLibrarySelector = () => {
  showLibrarySelector.value = false
}

// 选择分类
const selectCategory = (category) => {
  selectedCategory.value = category
  showCategoryDropdown.value = false
  // 这里可以添加按分类筛选图片的逻辑
}

// 切换选择图片
const toggleSelectImage = (index) => {
  libraryImages.value[index].selected = !libraryImages.value[index].selected
}

// 确认图库选择
const confirmLibrarySelection = async () => {
  // 将选中的图库图片添加到已选文件
  for (const img of selectedLibraryImages.value) {
    try {
      // 获取图片信息
      const response = await fetch(img.url)
      const blob = await response.blob()
      
      // 创建临时图片对象获取尺寸
      const imgElement = new Image()
      const imageUrl = URL.createObjectURL(blob)
      
      await new Promise((resolve) => {
        imgElement.onload = () => {
          selectedFiles.value.push({
            file: new File([blob], `library-image-${img.id}.jpg`, { type: 'image/jpeg' }),
            preview: img.url,
            name: `library-image-${img.id}.jpg`,
            url: img.url,
            width: imgElement.naturalWidth,
            height: imgElement.naturalHeight,
            format: 'JPG',
            size: blob.size,
            uploaded: true, // 图库图片视为已上传
            uploadType: 2 // 图库上传类型
          })
          URL.revokeObjectURL(imageUrl)
          resolve()
        }
        imgElement.src = imageUrl
      })
    } catch (error) {
      console.error('获取图库图片信息失败:', error)
    }
  }
  
  // 关闭图库选择器
  closeLibrarySelector()
  
  // 重置图库选择状态
  libraryImages.value.forEach(img => {
    img.selected = false
  })
}

// 关闭弹窗
const close = () => {
  emits('close')
}

// 提交表单
const submit = async () => {
  try {
    submitting.value = true
    
    // 1. 先上传所有文件到 COS（自动上传，无需用户手动操作）
    let cosImageList = []
    if (cosUploadRef.value) {
      // 自动上传所有未上传的文件
      await cosUploadRef.value.uploadAllFiles()
      cosImageList = cosUploadRef.value.getImageInfoList()
    }
    
    // 2. 获取图库选择的图片信息
    const libraryImageList = selectedFiles.value
      .filter(file => file.uploaded && file.uploadType === 2)
      .map(file => ({
        imageName: file.name,
        imageUrl: file.url,
        fileSize: file.size,
        width: file.width,
        height: file.height,
        format: file.format
      }))
    
    // 3. 合并所有图片信息
    const allImageList = [...cosImageList, ...libraryImageList]
    
    if (allImageList.length === 0) {
      console.error('没有选择任何图片')
      return
    }
    
    // 4. 调用创建抠图任务接口
    const taskParams = {
      uploadType: cosImageList.length > 0 ? 1 : 2, // 如果有 COS 上传的图片就是本地上传，否则是图库上传
      imageList: allImageList
    }
    
    console.log('创建抠图任务参数:', taskParams)
    
    const response = await createMattingTask(taskParams)
    
    if (response.success) {
      console.log('抠图任务创建成功:', response)
      
      // 组装返回数据给父组件
      const formData = {
        files: allImageList,
        taskResponse: response.data,
        success: true
      }
      
      emits('submit', formData)
    } else {
      console.error('抠图任务创建失败:', response)
      
      // 返回失败信息给父组件
      const formData = {
        files: allImageList,
        taskResponse: null,
        success: false,
        error: response.message || '创建抠图任务失败'
      }
      
      emits('submit', formData)
    }
    
  } catch (error) {
    console.error('提交抠图任务失败:', error)
    
    // 返回失败信息给父组件
    const formData = {
      files: [],
      taskResponse: null,
      success: false,
      error: error.message || '提交抠图任务失败'
    }
    
    emits('submit', formData)
  } finally {
    submitting.value = false
  }
}

// 重置表单
const resetForm = () => {
  activeTab.value = 'upload'
  showLibrarySelector.value = false
  searchQuery.value = ''
  showCategoryDropdown.value = false
  selectedCategory.value = '全部'
  selectedFiles.value = []
  uploadedFiles.value = []
  submitting.value = false
  libraryImages.value.forEach(img => img.selected = false)
  
  // 重置 COS 上传组件
  if (cosUploadRef.value && cosUploadRef.value.uploadedFiles) {
    cosUploadRef.value.uploadedFiles.value = []
  }
}

// 监听弹窗关闭，重置表单
watch(() => props.isOpen, (newVal) => {
  if (!newVal) {
    resetForm()
  }
})
</script> 