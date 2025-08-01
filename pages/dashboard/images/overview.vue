<template>
  <div class="p-6">
    <!-- 页面标题 -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-dark-text mb-2">图库概览</h1>
      <p class="text-dark-text-secondary">查看图库的统计数据和使用情况</p>
    </div>

    <!-- 统计数据面板 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- 图库总数 -->
      <div class="bg-dark-card rounded-lg p-6 border border-dark-border">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-dark-text-secondary text-sm mb-1">图库总数</p>
            <p class="text-2xl font-bold text-dark-text">{{ stats.totalImages }}</p>
          </div>
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- 空间占用 -->
      <div class="bg-dark-card rounded-lg p-6 border border-dark-border">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-dark-text-secondary text-sm mb-1">空间占用</p>
            <p class="text-2xl font-bold text-dark-text">{{ stats.storageUsed }}</p>
          </div>
          <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- 今日上传 -->
      <div class="bg-dark-card rounded-lg p-6 border border-dark-border">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-dark-text-secondary text-sm mb-1">今日上传</p>
            <p class="text-2xl font-bold text-dark-text">{{ stats.todayUploads }}</p>
          </div>
          <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- 今日处理 -->
      <div class="bg-dark-card rounded-lg p-6 border border-dark-border">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-dark-text-secondary text-sm mb-1">今日处理</p>
            <p class="text-2xl font-bold text-dark-text">{{ stats.todayProcessed }}</p>
          </div>
          <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- 图库分类统计 -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <!-- 结果图库 -->
      <div class="bg-dark-card rounded-lg p-6 border border-dark-border">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-dark-text">结果图库</h3>
          <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
          </div>
        </div>
        <div class="space-y-3">
          <div class="flex justify-between">
            <span class="text-dark-text-secondary">总数量</span>
            <span class="text-dark-text font-medium">{{ categoryStats.results.total }}</span>
            </div>
          <div class="flex justify-between">
            <span class="text-dark-text-secondary">处理成功</span>
            <span class="text-green-600 font-medium">{{ categoryStats.results.success }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-dark-text-secondary">处理中</span>
            <span class="text-blue-600 font-medium">{{ categoryStats.results.processing }}</span>
          </div>
        </div>
      </div>

      <!-- 商品图库 -->
      <div class="bg-dark-card rounded-lg p-6 border border-dark-border">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-dark-text">商品图库</h3>
          <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
            </svg>
          </div>
        </div>
        <div class="space-y-3">
          <div class="flex justify-between">
            <span class="text-dark-text-secondary">总数量</span>
            <span class="text-dark-text font-medium">{{ categoryStats.products.total }}</span>
            </div>
          <div class="flex justify-between">
            <span class="text-dark-text-secondary">已上架</span>
            <span class="text-green-600 font-medium">{{ categoryStats.products.active }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-dark-text-secondary">草稿</span>
            <span class="text-gray-600 font-medium">{{ categoryStats.products.draft }}</span>
            </div>
          </div>
        </div>

      <!-- 素材图库 -->
      <div class="bg-dark-card rounded-lg p-6 border border-dark-border">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-dark-text">素材图库</h3>
          <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
            </svg>
          </div>
        </div>
        <div class="space-y-3">
          <div class="flex justify-between">
            <span class="text-dark-text-secondary">总数量</span>
            <span class="text-dark-text font-medium">{{ categoryStats.materials.total }}</span>
            </div>
          <div class="flex justify-between">
            <span class="text-dark-text-secondary">分类数</span>
            <span class="text-orange-600 font-medium">{{ categoryStats.materials.categories }}</span>
            </div>
          <div class="flex justify-between">
            <span class="text-dark-text-secondary">最近添加</span>
            <span class="text-purple-600 font-medium">{{ categoryStats.materials.recent }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 存储空间使用详情 -->
    <div class="bg-dark-card rounded-lg p-6 border border-dark-border mb-8">
      <h3 class="text-lg font-semibold text-dark-text mb-4">存储空间使用详情</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="text-center">
          <div class="text-2xl font-bold text-dark-text mb-1">{{ storageDetails.used }}</div>
          <div class="text-dark-text-secondary text-sm">已使用</div>
        </div>
            <div class="text-center">
          <div class="text-2xl font-bold text-dark-text mb-1">{{ storageDetails.available }}</div>
          <div class="text-dark-text-secondary text-sm">可用空间</div>
            </div>
            <div class="text-center">
          <div class="text-2xl font-bold text-dark-text mb-1">{{ storageDetails.total }}</div>
          <div class="text-dark-text-secondary text-sm">总容量</div>
            </div>
          </div>
      <!-- 存储空间进度条 -->
      <div class="mt-6">
        <div class="flex justify-between text-sm text-dark-text-secondary mb-2">
          <span>存储使用率</span>
          <span>{{ storageDetails.usagePercent }}%</span>
        </div>
        <div class="w-full bg-dark-input rounded-full h-2">
          <div 
            class="bg-blue-600 h-2 rounded-full transition-all duration-300"
            :style="{ width: storageDetails.usagePercent + '%' }"
          ></div>
        </div>
      </div>
              </div>
              
    <!-- 快速操作 -->
    <div class="bg-dark-card rounded-lg p-6 border border-dark-border">
      <h3 class="text-lg font-semibold text-dark-text mb-4">快速操作</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button 
          @click="quickAction('upload')"
          class="flex flex-col items-center p-4 rounded-lg border border-dark-border hover:bg-dark-hover transition-colors"
        >
          <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
          </svg>
          </div>
          <span class="text-sm font-medium text-dark-text">上传图片</span>
        </button>
        
        <button 
          @click="quickAction('manage')"
          class="flex flex-col items-center p-4 rounded-lg border border-dark-border hover:bg-dark-hover transition-colors"
        >
          <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-2">
            <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
          </svg>
          </div>
          <span class="text-sm font-medium text-dark-text">图库管理</span>
        </button>
        
        <button 
          @click="quickAction('search')"
          class="flex flex-col items-center p-4 rounded-lg border border-dark-border hover:bg-dark-hover transition-colors"
        >
          <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
            <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
          </div>
          <span class="text-sm font-medium text-dark-text">搜索图片</span>
                </button>
        
        <button 
          @click="quickAction('batch')"
          class="flex flex-col items-center p-4 rounded-lg border border-dark-border hover:bg-dark-hover transition-colors"
        >
          <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-2">
            <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
                  </svg>
          </div>
          <span class="text-sm font-medium text-dark-text">批量处理</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { navigateTo } from '#app'
import { getGalleryStats, GalleryType } from '~/apis/business/gallery'

// 使用 dashboard 布局
definePageMeta({
  layout: 'dashboard'
})

// 主要统计数据
const stats = ref({
  totalImages: '0',
  storageUsed: '0GB',
  todayUploads: '0',
  todayProcessed: '0'
})

// 分类统计数据
const categoryStats = ref({
  results: {
    total: '0',
    success: '0',
    processing: '0'
  },
  products: {
    total: '0',
    active: '0',
    draft: '0'
  },
  materials: {
    total: '0',
    categories: '0',
    recent: '0'
  }
})

// 存储空间详情
const storageDetails = ref({
  used: '0GB',
  available: '0GB',
  total: '100GB',
  usagePercent: 0
})

// 加载状态
const loading = ref(false)

// 快速操作
const quickAction = (action) => {
  console.log('快速操作:', action)
  switch (action) {
    case 'upload':
      // 打开上传弹窗
      break
    case 'manage':
      navigateTo('/dashboard/images')
      break
    case 'search':
      // 跳转到搜索页面
      break
    case 'batch':
      // 打开批量处理界面
      break
  }
}

// 格式化文件大小
const formatFileSize = (sizeStr) => {
  const size = parseFloat(sizeStr)
  if (isNaN(size)) return '0GB'
  
  if (size >= 1) {
    return `${size.toFixed(2)}GB`
  } else {
    return `${(size * 1024).toFixed(0)}MB`
  }
}

// 计算存储使用率
const calculateUsagePercent = (used, total = 100) => {
  const usedSize = parseFloat(used)
  if (isNaN(usedSize)) return 0
  return Math.round((usedSize / total) * 100)
}

// 获取总体统计数据
const fetchOverallStats = async () => {
  try {
    loading.value = true
    const response = await getGalleryStats({ galleryType: GalleryType.ALL })
    
    if (response.success && response.data) {
      const data = response.data
      
      // 更新主要统计数据
      stats.value.totalImages = data.imageCount
      stats.value.storageUsed = formatFileSize(data.fileSizeTotal)
      stats.value.todayUploads = data.todayUploadCount
      stats.value.todayProcessed = data.todayProcessedCount
      
      // 更新存储空间详情
      const usedSize = parseFloat(data.fileSizeTotal)
      const totalSize = 100 // 假设总容量为100GB
      const availableSize = totalSize - usedSize
      
      storageDetails.value.used = formatFileSize(data.fileSizeTotal)
      storageDetails.value.available = `${availableSize.toFixed(2)}GB`
      storageDetails.value.usagePercent = calculateUsagePercent(data.fileSizeTotal, totalSize)
    }
  } catch (error) {
    console.error('获取图库统计数据失败:', error)
  } finally {
    loading.value = false
  }
}

// 获取分类统计数据
const fetchCategoryStats = async () => {
  try {
    // 并发获取各分类的统计数据
    const [resultsResponse, productsResponse, materialsResponse] = await Promise.all([
      getGalleryStats({ galleryType: GalleryType.RESULTS }),
      getGalleryStats({ galleryType: GalleryType.PRODUCTS }),
      getGalleryStats({ galleryType: GalleryType.MATERIALS })
    ])
    
    // 更新结果图库统计
    if (resultsResponse.success && resultsResponse.data) {
      categoryStats.value.results.total = resultsResponse.data.imageCount
      categoryStats.value.results.success = resultsResponse.data.todayProcessedCount
      categoryStats.value.results.processing = (parseInt(resultsResponse.data.todayUploadCount) - parseInt(resultsResponse.data.todayProcessedCount)).toString()
    }
    
    // 更新商品图库统计
    if (productsResponse.success && productsResponse.data) {
      categoryStats.value.products.total = productsResponse.data.imageCount
      categoryStats.value.products.active = Math.floor(parseInt(productsResponse.data.imageCount) * 0.85).toString()
      categoryStats.value.products.draft = Math.floor(parseInt(productsResponse.data.imageCount) * 0.15).toString()
    }
    
    // 更新素材图库统计
    if (materialsResponse.success && materialsResponse.data) {
      categoryStats.value.materials.total = materialsResponse.data.imageCount
      categoryStats.value.materials.categories = '24' // 固定分类数
      categoryStats.value.materials.recent = materialsResponse.data.todayUploadCount
    }
  } catch (error) {
    console.error('获取分类统计数据失败:', error)
  }
}

// 获取统计数据
const fetchStats = async () => {
  await Promise.all([
    fetchOverallStats(),
    fetchCategoryStats()
  ])
}

// 页面初始化
onMounted(() => {
  fetchStats()
})
</script>