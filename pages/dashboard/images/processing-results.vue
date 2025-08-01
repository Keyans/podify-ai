<template>
  <div class="p-6">
    <!-- 页面标题 -->
    <div class="flex items-center justify-between mb-6">
  <div>
        <h1 class="text-2xl font-bold text-dark-text mb-2">结果图库</h1>
        <p class="text-dark-text-secondary">查看和管理所有处理完成的图片结果</p>
      </div>
      <div class="flex items-center space-x-3">
        <button 
          @click="showUploadModal = true"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
          </svg>
          上传图片
        </button>
        <button 
          @click="refreshImages"
          class="px-4 py-2 border border-dark-border rounded-md text-dark-text hover:bg-dark-hover flex items-center"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
          刷新
        </button>
      </div>
    </div>

    <!-- 筛选和搜索栏 -->
    <div class="mb-6">
      <div class="flex items-center justify-between bg-dark-card rounded-lg border border-dark-border p-4">
        <div class="flex items-center space-x-4">
          <!-- 搜索框 -->
          <div class="relative">
            <input 
              v-model="searchQuery"
              type="text"
              placeholder="搜索图片..."
              class="w-64 px-3 py-2 bg-dark-input border border-dark-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-dark-text pl-10"
            />
            <svg class="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>

          <!-- 分类筛选 -->
          <select 
            v-model="selectedCategory"
            class="px-3 py-2 bg-dark-input border border-dark-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-dark-text"
          >
            <option value="">所有分类</option>
            <option value="text-to-image">文生图</option>
            <option value="background-removal">背景移除</option>
            <option value="image-enhancement">图片增强</option>
            <option value="style-transfer">风格转换</option>
          </select>

          <!-- 状态筛选 -->
          <select 
            v-model="selectedStatus"
            class="px-3 py-2 bg-dark-input border border-dark-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-dark-text"
          >
            <option value="">所有状态</option>
            <option value="completed">已完成</option>
            <option value="processing">处理中</option>
            <option value="failed">失败</option>
          </select>

          <!-- 时间筛选 -->
          <select 
            v-model="selectedTimeRange"
            class="px-3 py-2 bg-dark-input border border-dark-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-dark-text"
          >
            <option value="">所有时间</option>
            <option value="today">今天</option>
            <option value="week">本周</option>
            <option value="month">本月</option>
          </select>
        </div>

        <div class="flex items-center space-x-4">
          <!-- 视图切换 -->
          <div class="flex items-center bg-dark-input rounded-md p-1">
            <button 
              @click="viewMode = 'grid'"
              :class="viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-dark-text-secondary'"
              class="p-2 rounded-md transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
            </svg>
            </button>
            <button 
              @click="viewMode = 'list'"
              :class="viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-dark-text-secondary'"
              class="p-2 rounded-md transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
            </svg>
            </button>
        </div>

          <!-- 批量选择 -->
          <button 
            v-if="selectedImages.length > 0"
            @click="showBatchActions = !showBatchActions"
            class="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center relative"
          >
            已选择 {{ selectedImages.length }} 项
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>

            <!-- 批量操作下拉菜单 -->
            <div v-if="showBatchActions" class="absolute top-full right-0 mt-2 w-48 bg-dark-card border border-dark-border rounded-md shadow-lg z-10">
              <div class="py-1">
                <button 
                  @click="batchDownload"
                  class="w-full text-left px-4 py-2 text-sm text-dark-text hover:bg-dark-hover"
                >
                  批量下载
                </button>
                <button 
                  @click="batchDelete"
                  class="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-dark-hover"
                >
                  批量删除
                </button>
                <button 
                  @click="batchMove"
                  class="w-full text-left px-4 py-2 text-sm text-dark-text hover:bg-dark-hover"
                >
                  移动到文件夹
        </button>
              </div>
            </div>
          </button>
              </div>
              </div>
            </div>

    <!-- 图片网格视图 -->
    <div v-if="viewMode === 'grid'">
      <!-- 加载状态 -->
      <div v-if="loading" class="flex items-center justify-center py-12">
        <div class="text-center">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p class="mt-2 text-dark-text-secondary">加载中...</p>
        </div>
      </div>
      
      <!-- 图片网格 -->
      <div v-else class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      <div 
          v-for="image in images" 
          :key="image.imageName + image.createTime" 
        class="relative group bg-dark-card rounded-lg overflow-hidden border border-dark-border hover:shadow-md transition-shadow cursor-pointer"
        @click="openImageDetail(image)"
      >
        <!-- 选择框 -->
              <div class="absolute top-2 left-2 z-10">
          <input 
            type="checkbox" 
            v-model="selectedImages" 
            :value="image.id"
            @click.stop
            class="w-4 h-4 rounded border-dark-border"
          />
              </div>

        <!-- 图片 -->
        <div class="aspect-square bg-gray-200 overflow-hidden">
          <img 
              :src="image.imageUrl"
              :alt="image.imageName"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
            </div>

        <!-- 状态标识 -->
        <div class="absolute top-2 right-2">
            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              完成
          </span>
            </div>

        <!-- 悬停操作 -->
        <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
          <button 
            @click.stop="previewImage(image)"
            class="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
            </svg>
          </button>
          <button 
            @click.stop="downloadImage(image)"
            class="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-4-4m4 4l4-4m-6 4V4"/>
            </svg>
          </button>
            </div>

        <!-- 图片信息 -->
        <div class="p-3">
            <h3 class="text-sm font-medium text-dark-text truncate">{{ image.imageName }}</h3>
          <div class="flex items-center justify-between mt-2 text-xs text-dark-text-secondary">
              <span>{{ image.createBy }}</span>
              <span>{{ image.createTime }}</span>
            </div>
              </div>
            </div>
          </div>
        </div>

    <!-- 列表视图 -->
    <div v-if="viewMode === 'list'" class="bg-dark-card rounded-lg border border-dark-border overflow-hidden">
      <!-- 加载状态 -->
      <div v-if="loading" class="flex items-center justify-center py-12">
        <div class="text-center">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p class="mt-2 text-dark-text-secondary">加载中...</p>
        </div>
      </div>
      
      <!-- 图片列表 -->
      <table v-else class="w-full">
        <thead class="bg-dark-border">
          <tr>
            <th class="px-4 py-3 text-left text-xs font-medium text-dark-text-secondary uppercase tracking-wider">
              <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" class="rounded border-dark-border">
            </th>
            <th class="px-4 py-3 text-left text-xs font-medium text-dark-text-secondary uppercase tracking-wider">图片</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-dark-text-secondary uppercase tracking-wider">名称</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-dark-text-secondary uppercase tracking-wider">分类</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-dark-text-secondary uppercase tracking-wider">尺寸</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-dark-text-secondary uppercase tracking-wider">状态</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-dark-text-secondary uppercase tracking-wider">创建时间</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-dark-text-secondary uppercase tracking-wider">操作</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-dark-border">
          <tr v-for="image in images" :key="image.imageName + image.createTime" class="hover:bg-dark-hover">
            <td class="px-4 py-3">
              <input type="checkbox" v-model="selectedImages" :value="image.id" class="rounded border-dark-border">
            </td>
            <td class="px-4 py-3">
              <img :src="image.imageUrl" :alt="image.imageName" class="w-12 h-12 rounded object-cover">
            </td>
            <td class="px-4 py-3 text-sm font-medium text-dark-text">{{ image.imageName }}</td>
                          <td class="px-4 py-3 text-sm text-dark-text-secondary">{{ image.createBy }}</td>
              <td class="px-4 py-3 text-sm text-dark-text-secondary">{{ image.createTime }}</td>
            <td class="px-4 py-3">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                完成
              </span>
            </td>
            <td class="px-4 py-3">
              <div class="flex items-center space-x-2">
                <button 
                  @click="openImageDetail(image)"
                  class="text-blue-600 hover:text-blue-700"
                >
                  查看
                </button>
                <button 
                  @click="downloadImage(image)"
                  class="text-green-600 hover:text-green-700"
                >
                  下载
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

        <!-- 分页 -->
    <div class="mt-6 flex items-center justify-between">
      <div class="text-sm text-dark-text-secondary">
        显示 {{ (currentPage - 1) * pageSize + 1 }} 到 {{ Math.min(currentPage * pageSize, totalImages) }} 条，共 {{ totalImages }} 条
          </div>
      
          <div class="flex items-center space-x-2">
        <button 
          @click="goToPage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-3 py-1 rounded border border-dark-border text-dark-text disabled:opacity-50 disabled:cursor-not-allowed hover:bg-dark-hover"
        >
              上一页
            </button>
        
        <span class="px-3 py-1 bg-blue-600 text-white rounded">{{ currentPage }}</span>
        
        <button 
          @click="goToPage(currentPage + 1)"
          :disabled="currentPage >= totalPages"
          class="px-3 py-1 rounded border border-dark-border text-dark-text disabled:opacity-50 disabled:cursor-not-allowed hover:bg-dark-hover"
        >
              下一页
            </button>
      </div>
    </div>
  </div>

  <!-- 图片详情弹窗 -->
  <ImageDetailModal
    :isOpen="showDetailModal"
    :image="selectedImage"
    @close="showDetailModal = false"
    @download="downloadImage"
    @delete="deleteImage"
  />

  <!-- 上传图片弹窗 -->
  <GalleryUploadModal
    :isOpen="showUploadModal"
    :galleryType="3"
    @close="showUploadModal = false"
    @upload-success="handleUploadSuccess"
  />
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import ImageDetailModal from '~/components/ImageDetailModal.vue'
import GalleryUploadModal from '~/components/GalleryUploadModal.vue'
import { getGalleryStats, getGalleryImageList, GalleryType } from '~/apis/business/gallery'

// 使用 dashboard 布局
definePageMeta({
  layout: 'dashboard'
})

// 搜索和筛选
const searchQuery = ref('')
const selectedCategory = ref('')
const selectedStatus = ref('')
const selectedTimeRange = ref('')

// 视图模式
const viewMode = ref('grid')

// 选择状态
const selectedImages = ref([])
const selectAll = ref(false)
const showBatchActions = ref(false)

// 分页
const currentPage = ref(1)
const pageSize = ref(24)

// 弹窗状态
const showDetailModal = ref(false)
const showUploadModal = ref(false)
const selectedImage = ref(null)

// 图片数据和加载状态
const images = ref([])
const loading = ref(false)
const pagination = ref({
  current: 1,
  size: 24,
  pages: 1,
  total: 0
})

// 分页计算
const totalImages = computed(() => parseInt(pagination.value.total))
const totalPages = computed(() => parseInt(pagination.value.pages))

// 获取结果图片列表数据
const fetchImages = async () => {
  try {
    loading.value = true
    const params = {
      galleryType: GalleryType.RESULTS,
      page: currentPage.value,
      limit: pageSize.value
    }
    
    // 添加搜索条件
  if (searchQuery.value) {
      params.imageName = searchQuery.value
  }
  
    // 添加分类筛选
  if (selectedCategory.value) {
      params.categoryId = selectedCategory.value
    }
    
    const response = await getGalleryImageList(params)
    
    if (response.success && response.data) {
      const data = response.data
      images.value = data.imageList
      pagination.value = {
        current: parseInt(data.current),
        size: parseInt(data.size),
        pages: parseInt(data.pages),
        total: parseInt(data.total)
      }
    }
  } catch (error) {
    console.error('获取结果图片列表失败:', error)
    images.value = []
  } finally {
    loading.value = false
  }
}

// 状态处理
const getStatusText = (status) => {
  const statusMap = {
    completed: '已完成',
    processing: '处理中',
    failed: '失败'
  }
  return statusMap[status] || '未知'
}

const getStatusClass = (status) => {
  const statusClasses = {
    completed: 'bg-green-100 text-green-800',
    processing: 'bg-yellow-100 text-yellow-800',
    failed: 'bg-red-100 text-red-800'
  }
  return statusClasses[status] || 'bg-gray-100 text-gray-800'
}

// 操作方法
const openImageDetail = (image) => {
  selectedImage.value = image
  showDetailModal.value = true
}

const previewImage = (image) => {
  openImageDetail(image)
}

const downloadImage = (image) => {
  console.log('下载图片:', image.imageName)
  // 实际应用中应该调用下载API
}

const deleteImage = (image) => {
  console.log('删除图片:', image.imageName)
  // 实际应用中应该调用删除API
}

const refreshImages = () => {
  console.log('刷新图片列表')
  // 实际应用中应该重新获取图片列表
}

const toggleSelectAll = () => {
  if (selectAll.value) {
    selectedImages.value = images.value.map(img => img.imageName + img.createTime)
  } else {
    selectedImages.value = []
  }
}

const batchDownload = () => {
  console.log('批量下载:', selectedImages.value)
  showBatchActions.value = false
}

const batchDelete = () => {
  console.log('批量删除:', selectedImages.value)
  showBatchActions.value = false
}

const batchMove = () => {
  console.log('批量移动:', selectedImages.value)
  showBatchActions.value = false
}

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

// 防抖定时器
let searchTimer = null

// 监听搜索和筛选变化
watch([searchQuery, selectedCategory], () => {
  currentPage.value = 1 // 重置到第一页
  
  // 清除之前的定时器
  if (searchTimer) {
    clearTimeout(searchTimer)
  }
  
  // 设置新的定时器
  searchTimer = setTimeout(() => {
    fetchImages()
  }, 500)
})

// 页面初始化
onMounted(() => {
  console.log('结果图库页面初始化')
  fetchImages()
})

// 上传成功回调
const handleUploadSuccess = (data) => {
  console.log('上传成功:', data)
  // 刷新图片列表
  fetchImages()
}
</script> 