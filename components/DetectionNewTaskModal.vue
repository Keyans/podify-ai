<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    <div class="bg-dark-card rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto text-dark-text">
      <!-- Header -->
      <div class="p-5 border-b border-dark-border flex justify-between items-center">
        <h3 class="font-medium text-dark-text">新建检测任务</h3>
        <button @click="close" class="text-gray-400 hover:text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div class="p-6">
        <!-- 上传方式选择 -->
        <div class="grid grid-cols-2 gap-4 mb-6">
          <!-- 上传图片 -->
          <div 
            @click="selectUploadMethod('upload')"
            class="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors"
            :class="uploadMethod === 'upload' ? 'border-blue-500 bg-blue-500/10' : 'border-dark-border hover:border-blue-400'"
          >
            <svg class="w-8 h-8 mx-auto mb-2" :class="uploadMethod === 'upload' ? 'text-blue-500' : 'text-dark-text-secondary'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
            </svg>
            <div class="text-sm font-medium text-dark-text">上传图片</div>
          </div>

          <!-- 图库选择 -->
          <div 
            @click="selectUploadMethod('gallery')"
            class="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors"
            :class="uploadMethod === 'gallery' ? 'border-blue-500 bg-blue-500/10' : 'border-dark-border hover:border-blue-400'"
          >
            <svg class="w-8 h-8 mx-auto mb-2" :class="uploadMethod === 'gallery' ? 'text-blue-500' : 'text-dark-text-secondary'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            <div class="text-sm font-medium text-dark-text">图库选择</div>
          </div>
        </div>

        <!-- 腾讯云 COS 上传组件 -->
        <div v-if="uploadMethod === 'upload'" class="mb-6">
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

        <!-- 图库选择区域 -->
        <div v-if="uploadMethod === 'gallery'" class="mb-6">
          <!-- 图库选择弹窗 -->
          <div v-if="showGalleryModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div class="bg-dark-card rounded-lg w-full max-w-4xl max-h-[80vh] overflow-hidden text-dark-text">
              <!-- 图库弹窗标题 -->
              <div class="p-4 border-b border-dark-border flex justify-between items-center">
                <h4 class="font-medium text-dark-text">从图库选择</h4>
                <button @click="closeGalleryModal" class="text-gray-400 hover:text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <!-- 搜索和筛选区域 -->
              <div class="p-4 border-b border-dark-border">
                <div class="flex items-center space-x-4">
                  <!-- 搜索框 -->
                  <div class="flex-1 relative">
                    <input 
                      v-model="gallerySearch"
                      type="text"
                      placeholder="搜索图片"
                      class="w-full px-3 py-2 bg-dark-input border border-dark-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-dark-text pl-10"
                      @input="handleGallerySearch"
                    />
                    <svg class="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                    </svg>
                  </div>

                  <!-- 分类筛选 -->
                  <div class="relative">
                    <select 
                      v-model="selectedCategory"
                      @change="handleCategoryChange"
                      class="px-3 py-2 bg-dark-input border border-dark-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-dark-text"
                    >
                      <option value="">选择分类</option>
                      <option value="nature">自然风景</option>
                      <option value="architecture">建筑</option>
                      <option value="abstract">抽象艺术</option>
                      <option value="technology">科技</option>
                      <option value="business">商务</option>
                      <option value="lifestyle">生活方式</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- 图库内容区域 -->
              <div class="p-4 overflow-y-auto" style="max-height: 400px;">
                <div class="grid grid-cols-5 gap-4 mb-4">
                  <div v-for="(image, index) in paginatedGalleryImages" :key="image.id" class="relative group cursor-pointer">
                    <img 
                      :src="image.url" 
                      :alt="image.name"
                      @click="toggleGalleryImage(image)"
                      class="w-full h-24 object-cover rounded-lg border transition-all"
                      :class="selectedGalleryImages.includes(image.id) ? 'border-blue-500 ring-2 ring-blue-500' : 'border-dark-border hover:border-blue-400'"
                    />
                    <!-- 选中标记 -->
                    <div v-if="selectedGalleryImages.includes(image.id)" class="absolute top-1 right-1">
                      <div class="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 无数据提示 -->
                <div v-if="filteredGalleryImages.length === 0" class="text-center py-8 text-dark-text-secondary">
                  <svg class="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  <p>没有找到相关图片</p>
                </div>
              </div>

              <!-- 分页区域 -->
              <div v-if="filteredGalleryImages.length > 0" class="p-4 border-t border-dark-border">
                <div class="flex items-center justify-between">
                  <div class="text-sm text-dark-text-secondary">
                    已选择 {{ selectedGalleryImages.length }} 张图片
                  </div>
                  
                  <!-- 分页控件 -->
                  <div class="flex items-center space-x-2">
                    <button 
                      @click="goToGalleryPage(galleryPagination.currentPage - 1)"
                      :disabled="galleryPagination.currentPage === 1"
                      class="px-3 py-1 text-sm rounded border border-dark-border text-dark-text disabled:opacity-50 disabled:cursor-not-allowed hover:bg-dark-hover"
                    >
                      <
                    </button>
                    
                    <span class="text-sm text-dark-text">
                      {{ galleryPagination.currentPage }}
                    </span>
                    
                    <button 
                      @click="goToGalleryPage(galleryPagination.currentPage + 1)"
                      :disabled="galleryPagination.currentPage >= galleryTotalPages"
                      class="px-3 py-1 text-sm rounded border border-dark-border text-dark-text disabled:opacity-50 disabled:cursor-not-allowed hover:bg-dark-hover"
                    >
                      >
                    </button>
                    
                    <span class="text-sm text-dark-text-secondary">
                      ...
                    </span>
                    
                    <button 
                      @click="goToGalleryPage(galleryTotalPages)"
                      :disabled="galleryPagination.currentPage >= galleryTotalPages"
                      class="px-3 py-1 text-sm rounded border border-dark-border text-dark-text disabled:opacity-50 disabled:cursor-not-allowed hover:bg-dark-hover"
                    >
                      >
                    </button>
                  </div>
                </div>
              </div>

              <!-- 图库弹窗底部按钮 -->
              <div class="p-4 border-t border-dark-border flex justify-end space-x-3">
                <button @click="closeGalleryModal" class="px-4 py-2 border border-dark-border rounded-md text-dark-text-secondary hover:bg-dark-hover">
                  取消
                </button>
                <button 
                  @click="confirmGallerySelection"
                  :disabled="selectedGalleryImages.length === 0"
                  class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  确定选择 ({{ selectedGalleryImages.length }}张)
                </button>
              </div>
            </div>
          </div>

          <!-- 图库选择触发按钮 -->
          <div 
            @click="openGalleryModal"
            class="border-2 border-dashed border-dark-border rounded-lg p-12 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-500/5 transition-colors"
          >
            <svg class="w-12 h-12 mx-auto mb-4 text-dark-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            <div class="text-lg font-medium text-dark-text mb-2">从图库选择图片</div>
            <div class="text-sm text-dark-text-secondary">
              点击打开图库，选择需要检测的图片
            </div>
          </div>

          <!-- 已选择的图库图片展示 -->
          <div v-if="selectedGalleryImages.length > 0" class="mt-4">
            <div class="grid grid-cols-5 gap-4 mb-4">
              <div v-for="imageId in selectedGalleryImages" :key="imageId" class="relative group">
                <img 
                  :src="getGalleryImageById(imageId)?.url" 
                  :alt="getGalleryImageById(imageId)?.name"
                  class="w-full h-24 object-cover rounded-lg border border-blue-500"
                />
                <!-- 删除按钮 -->
                <button 
                  @click="removeGalleryImage(imageId)"
                  class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            </div>
            
            <div class="flex items-center text-sm text-dark-text-secondary">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              已选择 {{ selectedGalleryImages.length }} 张图片
            </div>
          </div>
        </div>

        <div class="text-sm text-gray-400 flex items-center mt-4">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          适用能仅为辅助工具，受限于技术本身与商品动态，无法 100% 精准无误，建议您自行甄别
        </div>
      </div>
      
      <div class="p-5 border-t border-dark-border flex justify-end space-x-3">
        <button @click="close" class="px-4 py-2 border border-dark-border rounded-md text-dark-text-secondary hover:bg-dark-hover">取消</button>
        <button 
          @click="submit" 
          :disabled="submitting || !canSubmit"
          class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          <div v-if="submitting" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
          {{ submitting ? '提交中...' : `提交任务 (${getTotalImageCount()}张图片)` }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, defineProps, defineEmits, watch, computed } from 'vue'
import TencentCosUpload from '~/components/TencentCosUpload.vue'
import { createDetectionTask } from '~/apis/business/detection'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['close', 'submit'])

// 上传方式
const uploadMethod = ref('upload')

// 提交状态
const submitting = ref(false)

// COS 上传组件引用
const cosUploadRef = ref(null)

// 上传成功的文件列表
const uploadedFiles = ref([])

// 图库相关状态
const showGalleryModal = ref(false)
const gallerySearch = ref('')
const selectedCategory = ref('')
const selectedGalleryImages = ref([])

// 图库分页
const galleryPagination = ref({
  currentPage: 1,
  pageSize: 10
})

// 图库图片（模拟数据）
const allGalleryImages = ref([
  // 自然风景
  { id: 1, name: '日落风景', url: 'https://via.placeholder.com/150x150/ff7f50/fff?text=日落', category: 'nature', tags: ['日落', '风景', '自然'] },
  { id: 2, name: '山脉景观', url: 'https://via.placeholder.com/150x150/87ceeb/fff?text=山脉', category: 'nature', tags: ['山脉', '自然', '风景'] },
  { id: 3, name: '海洋波浪', url: 'https://via.placeholder.com/150x150/4682b4/fff?text=海洋', category: 'nature', tags: ['海洋', '波浪', '蓝色'] },
  
  // 建筑
  { id: 4, name: '现代建筑', url: 'https://via.placeholder.com/150x150/708090/fff?text=建筑', category: 'architecture', tags: ['建筑', '现代', '城市'] },
  { id: 5, name: '摩天大楼', url: 'https://via.placeholder.com/150x150/2f4f4f/fff?text=大楼', category: 'architecture', tags: ['大楼', '城市', '高楼'] },
  
  // 抽象艺术
  { id: 6, name: '几何图案', url: 'https://via.placeholder.com/150x150/9370db/fff?text=几何', category: 'abstract', tags: ['几何', '抽象', '艺术'] },
  { id: 7, name: '色彩渐变', url: 'https://via.placeholder.com/150x150/ff69b4/fff?text=渐变', category: 'abstract', tags: ['渐变', '色彩', '抽象'] },
  { id: 8, name: '线条艺术', url: 'https://via.placeholder.com/150x150/32cd32/fff?text=线条', category: 'abstract', tags: ['线条', '艺术', '设计'] },
  
  // 科技
  { id: 9, name: '电路板', url: 'https://via.placeholder.com/150x150/00ced1/fff?text=电路', category: 'technology', tags: ['电路', '科技', '电子'] },
  { id: 10, name: '数据可视化', url: 'https://via.placeholder.com/150x150/ffd700/000?text=数据', category: 'technology', tags: ['数据', '图表', '科技'] },
  
  // 商务
  { id: 11, name: '办公环境', url: 'https://via.placeholder.com/150x150/696969/fff?text=办公', category: 'business', tags: ['办公', '商务', '工作'] },
  { id: 12, name: '团队合作', url: 'https://via.placeholder.com/150x150/bc8f8f/fff?text=团队', category: 'business', tags: ['团队', '合作', '商务'] },
  
  // 生活方式
  { id: 13, name: '咖啡时光', url: 'https://via.placeholder.com/150x150/daa520/fff?text=咖啡', category: 'lifestyle', tags: ['咖啡', '生活', '休闲'] },
  { id: 14, name: '健身运动', url: 'https://via.placeholder.com/150x150/ff6347/fff?text=运动', category: 'lifestyle', tags: ['运动', '健身', '生活'] },
  { id: 15, name: '美食摄影', url: 'https://via.placeholder.com/150x150/ffa500/fff?text=美食', category: 'lifestyle', tags: ['美食', '摄影', '生活'] }
])

// 筛选后的图库图片
const filteredGalleryImages = computed(() => {
  let result = [...allGalleryImages.value]
  
  // 按分类筛选
  if (selectedCategory.value) {
    result = result.filter(image => image.category === selectedCategory.value)
  }
  
  // 按搜索关键词筛选
  if (gallerySearch.value.trim()) {
    const searchLower = gallerySearch.value.toLowerCase()
    result = result.filter(image => 
      image.name.toLowerCase().includes(searchLower) ||
      image.tags.some(tag => tag.toLowerCase().includes(searchLower))
    )
  }
  
  return result
})

// 图库总页数
const galleryTotalPages = computed(() => {
  return Math.ceil(filteredGalleryImages.value.length / galleryPagination.value.pageSize)
})

// 分页后的图库图片
const paginatedGalleryImages = computed(() => {
  const start = (galleryPagination.value.currentPage - 1) * galleryPagination.value.pageSize
  const end = start + galleryPagination.value.pageSize
  return filteredGalleryImages.value.slice(start, end)
})

// 选择上传方式
const selectUploadMethod = (method) => {
  uploadMethod.value = method
}

// COS 上传成功处理
const handleUploadSuccess = (result) => {
  console.log('文件上传成功:', result)
  uploadedFiles.value.push(result)
}

// COS 上传失败处理
const handleUploadError = (error) => {
  console.error('文件上传失败:', error)
}

// 文件变化处理
const handleFilesChange = (files) => {
  console.log('文件列表变化:', files)
}

// 打开图库弹窗
const openGalleryModal = () => {
  showGalleryModal.value = true
}

// 关闭图库弹窗
const closeGalleryModal = () => {
  showGalleryModal.value = false
}

// 确认图库选择
const confirmGallerySelection = () => {
  closeGalleryModal()
}

// 处理图库搜索
const handleGallerySearch = () => {
  galleryPagination.value.currentPage = 1
}

// 处理分类变化
const handleCategoryChange = () => {
  galleryPagination.value.currentPage = 1
}

// 图库分页跳转
const goToGalleryPage = (page) => {
  if (page >= 1 && page <= galleryTotalPages.value) {
    galleryPagination.value.currentPage = page
  }
}

// 切换图库图片选择
const toggleGalleryImage = (image) => {
  const index = selectedGalleryImages.value.indexOf(image.id)
  if (index > -1) {
    selectedGalleryImages.value.splice(index, 1)
  } else {
    if (selectedGalleryImages.value.length < 1000) {
      selectedGalleryImages.value.push(image.id)
    } else {
      console.warn('最多只能选择1000张图片')
    }
  }
}

// 根据ID获取图库图片
const getGalleryImageById = (id) => {
  return allGalleryImages.value.find(img => img.id === id)
}

// 移除图库图片
const removeGalleryImage = (imageId) => {
  const index = selectedGalleryImages.value.indexOf(imageId)
  if (index > -1) {
    selectedGalleryImages.value.splice(index, 1)
  }
}

// 获取总图片数量
const getTotalImageCount = () => {
  if (uploadMethod.value === 'upload') {
    return cosUploadRef.value ? cosUploadRef.value.getImageInfoList().length : 0
  } else {
    return selectedGalleryImages.value.length
  }
}

// 检查是否可以提交
const canSubmit = computed(() => {
  if (uploadMethod.value === 'upload') {
    return cosUploadRef.value ? cosUploadRef.value.getImageInfoList().length > 0 : false
  } else {
    return selectedGalleryImages.value.length > 0
  }
})

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
    if (uploadMethod.value === 'upload' && cosUploadRef.value) {
      await cosUploadRef.value.uploadAllFilesToCos()
      cosImageList = cosUploadRef.value.getImageInfoList()
    }
    
    // 2. 获取图库选择的图片信息
    const libraryImageList = allGalleryImages.value
      .filter(img => selectedGalleryImages.value.includes(img.id))
      .map(img => ({
        imageName: img.name,
        imageUrl: img.url,
        fileSize: 0, // 图库图片可能没有文件大小信息
        width: 0,    // 图库图片可能没有尺寸信息
        height: 0,
        format: 'JPG' // 默认格式
      }))
    
    // 3. 合并所有图片信息
    const allImageList = uploadMethod.value === 'upload' ? cosImageList : libraryImageList
    
    if (allImageList.length === 0) {
      console.error('没有选择任何图片')
      return
    }
    
    // 4. 调用创建侵权检测任务接口
    const taskParams = {
      uploadType: uploadMethod.value === 'upload' ? 0 : 1, // 0-上传图片，1-图库选择
      imageList: allImageList
    }
    
    console.log('创建侵权检测任务参数:', taskParams)
    
    const response = await createDetectionTask(taskParams)
    
    if (response.success) {
      console.log('侵权检测任务创建成功:', response)
      
      const resultData = {
        taskParams: taskParams,
        taskResponse: response.data,
        success: true
      }
      
      emits('submit', resultData)
    } else {
      console.error('侵权检测任务创建失败:', response)
      
      const resultData = {
        taskParams: taskParams,
        taskResponse: null,
        success: false,
        error: response.message || '创建侵权检测任务失败'
      }
      
      emits('submit', resultData)
    }
    
  } catch (error) {
    console.error('提交侵权检测任务失败:', error)
    
    const resultData = {
      taskParams: {},
      taskResponse: null,
      success: false,
      error: error.message || '提交侵权检测任务失败'
    }
    
    emits('submit', resultData)
  } finally {
    submitting.value = false
  }
}

// 重置表单
const resetForm = () => {
  uploadMethod.value = 'upload'
  uploadedFiles.value = []
  selectedGalleryImages.value = []
  showGalleryModal.value = false
  gallerySearch.value = ''
  selectedCategory.value = ''
  galleryPagination.value.currentPage = 1
  submitting.value = false
  
  // 重置 COS 上传组件
  if (cosUploadRef.value) {
    cosUploadRef.value.clearFiles()
  }
}

// 监听弹窗关闭，重置表单
watch(() => props.isOpen, (newVal) => {
  if (!newVal) {
    resetForm()
  }
})
</script> 