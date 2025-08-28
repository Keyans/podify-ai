<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    <!-- 主弹窗 -->
    <div v-if="!showLibrarySelector" class="bg-dark-card rounded-lg w-full max-w-xl max-h-[90vh] overflow-y-auto text-dark-text">
      <!-- Header -->
      <div class="p-5 border-b border-dark-border flex justify-between items-center">
        <h3 class="font-medium text-dark-text">新建裂变任务</h3>
        <button @click.stop="close" class="text-gray-400 hover:text-gray-300">
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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            上传图片
          </button>
          <button 
            @click="activeTab = 'gallery'"
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
        <div v-else class="mb-6">
          <GalleryPickerModal :inline="true" :isOpen="true" :maxSelect="1000" @change="handleGalleryPicked" />
        </div>
        
        <!-- 一键抠图选项 -->
        <div class="mb-6">
          <div class="flex items-center justify-between p-4 bg-dark-input border border-dark-border rounded-md">
            <div class="flex items-center">
              <input
                id="auto-cutout"
                type="checkbox"
                v-model="enableAutoCutout"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label for="auto-cutout" class="ml-3 text-sm font-medium text-dark-text">
                一键抠图
              </label>
            </div>
            <div class="text-xs text-gray-400">
              自动去除图片背景
            </div>
          </div>
        </div>
        
        <!-- 裂变数量设置 -->
        <div class="mt-6">
          <label class="block text-sm font-medium text-gray-400 mb-2">裂变数量</label>
          <div class="flex items-center">
            <select 
              v-model="fissionCount" 
              class="bg-dark-input border border-dark-border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-dark-text"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <span class="ml-3 text-sm text-gray-400">最小1个，最多每张图片裂变5个</span>
          </div>
        </div>
        
        <div class="text-sm text-gray-400 flex items-center mt-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          一次最多支持 1000 张图片，已选择 {{ selectedFiles.length }} 张
        </div>
      </div>
      
      <!-- Footer Buttons -->
      <div class="p-5 border-t border-dark-border flex justify-end space-x-3">
        <button @click.stop="close" class="px-4 py-2 border border-dark-border rounded-md text-gray-400 hover:bg-dark-hover">取消</button>
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
    
    <!-- 统一图库选择器（不再使用弹窗模式） -->
  </div>
</template>

<script setup>
import { ref, reactive, defineProps, defineEmits, watch, computed } from 'vue'
import TencentCosUpload from './TencentCosUpload.vue'
import GalleryPickerModal from './GalleryPickerModal.vue'
import { createFissionTask } from '~/apis/business/fission'

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
const fissionCount = ref('3') // 默认裂变数量改为3
const enableAutoCutout = ref(false) // 一键抠图选项
const submitting = ref(false)

// COS 上传组件引用
const cosUploadRef = ref(null)

// 上传成功的文件列表
const uploadedFiles = ref([])

// 模拟图库图片数据
const libraryImages = ref([
  { id: 1, url: 'https://via.placeholder.com/150/000000/FFFFFF?text=T-shirt+1', selected: false },
  { id: 2, url: 'https://via.placeholder.com/150/000000/FFFFFF?text=T-shirt+2', selected: false },
  { id: 3, url: 'https://via.placeholder.com/150/000000/FFFFFF?text=T-shirt+3', selected: false },
  { id: 4, url: 'https://via.placeholder.com/150/000000/FFFFFF?text=T-shirt+4', selected: false },
  { id: 5, url: 'https://via.placeholder.com/150/000000/FFFFFF?text=T-shirt+5', selected: false },
  { id: 6, url: 'https://via.placeholder.com/150/000000/FFFFFF?text=T-shirt+6', selected: false },
  { id: 7, url: 'https://via.placeholder.com/150/000000/FFFFFF?text=T-shirt+7', selected: false },
  { id: 8, url: 'https://via.placeholder.com/150/000000/FFFFFF?text=T-shirt+8', selected: false },
  { id: 9, url: 'https://via.placeholder.com/150/000000/FFFFFF?text=T-shirt+9', selected: false },
  { id: 10, url: 'https://via.placeholder.com/150/000000/FFFFFF?text=T-shirt+10', selected: false }
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

// 统一图库回填
const handleGalleryPicked = (list) => {
  list.forEach(img => {
    selectedFiles.value.push({
      file: null,
      preview: img.imageUrl,
      name: img.imageName || 'gallery-image.jpg',
      url: img.imageUrl,
      width: 0,
      height: 0,
      format: 'JPG',
      size: 0,
      uploaded: true,
      uploadType: 2
    })
  })
  closeLibrarySelector()
}

// 关闭弹窗
const close = () => {
  emits('close')
}

// 提交表单
const submit = async () => {
  try {
    submitting.value = true
    
    // 1. 先上传所有文件到 COS
    let cosImageList = []
    if (cosUploadRef.value) {
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
    
    // 4. 调用创建复变任务接口
    const taskParams = {
      uploadType: cosImageList.length > 0 ? 1 : 2, // 如果有 COS 上传的图片就是本地上传，否则是图库上传
      fissionNum: parseInt(fissionCount.value), // 裂变数量
      imageList: allImageList
    }
    
    console.log('创建复变任务参数:', taskParams)
    
    const response = await createFissionTask(taskParams)
    
    if (response.success) {
      console.log('任务创建成功:', response)
      
      // 组装返回数据给父组件
      const formData = {
        files: allImageList,
        fissionCount: parseInt(fissionCount.value),
        autoCutout: enableAutoCutout.value,
        taskResponse: response.data,
        success: true
      }
      
      emits('submit', formData)
    } else {
      console.error('任务创建失败:', response)
      
      // 返回失败信息给父组件
      const formData = {
        files: allImageList,
        fissionCount: parseInt(fissionCount.value),
        autoCutout: enableAutoCutout.value,
        taskResponse: null,
        success: false,
        error: response.message || '创建任务失败'
      }
      
      emits('submit', formData)
    }
    
  } catch (error) {
    console.error('提交任务失败:', error)
    
    // 返回失败信息给父组件
    const formData = {
      files: [],
      fissionCount: parseInt(fissionCount.value),
      autoCutout: enableAutoCutout.value,
      taskResponse: null,
      success: false,
      error: error.message || '提交任务失败'
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
  fissionCount.value = '3'
  enableAutoCutout.value = false
  submitting.value = false
  uploadedFiles.value = []
  libraryImages.value.forEach(img => {
    img.selected = false
  })
  
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