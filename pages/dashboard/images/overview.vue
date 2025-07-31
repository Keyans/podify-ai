<template>
  <div class="p-6">
    <!-- 页面标题 -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-dark-text mb-2">图库概览</h1>
      <p class="text-dark-text-secondary">管理和浏览您的图片资源</p>
    </div>

    <!-- 图库卡片网格 -->
    <div class="grid grid-cols-3 gap-6">
      <!-- 结果图库 -->
      <div class="bg-dark-card rounded-lg shadow-sm border border-dark-border overflow-hidden hover:shadow-md transition-shadow cursor-pointer" @click="navigateToGallery('results')">
        <div class="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <div class="text-center text-white">
            <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            <h3 class="text-xl font-bold">结果图库</h3>
            <p class="text-blue-100 mt-2">处理完成的图片结果</p>
          </div>
        </div>
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h4 class="font-semibold text-dark-text">结果图库</h4>
              <p class="text-sm text-dark-text-secondary">查看所有处理完成的图片</p>
            </div>
            <div class="text-right">
              <div class="text-2xl font-bold text-dark-text">{{ stats.results.count }}</div>
              <div class="text-xs text-dark-text-secondary">张图片</div>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div class="text-center">
              <div class="text-lg font-semibold text-green-600">{{ stats.results.success }}</div>
              <div class="text-xs text-dark-text-secondary">成功</div>
            </div>
            <div class="text-center">
              <div class="text-lg font-semibold text-blue-600">{{ stats.results.processing }}</div>
              <div class="text-xs text-dark-text-secondary">处理中</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 商品图库 -->
      <div class="bg-dark-card rounded-lg shadow-sm border border-dark-border overflow-hidden hover:shadow-md transition-shadow cursor-pointer" @click="navigateToGallery('products')">
        <div class="aspect-video bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
          <div class="text-center text-white">
            <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
            </svg>
            <h3 class="text-xl font-bold">商品图库</h3>
            <p class="text-green-100 mt-2">商品相关的图片资源</p>
          </div>
        </div>
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h4 class="font-semibold text-dark-text">商品图库</h4>
              <p class="text-sm text-dark-text-secondary">管理商品相关图片</p>
            </div>
            <div class="text-right">
              <div class="text-2xl font-bold text-dark-text">{{ stats.products.count }}</div>
              <div class="text-xs text-dark-text-secondary">张图片</div>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div class="text-center">
              <div class="text-lg font-semibold text-green-600">{{ stats.products.active }}</div>
              <div class="text-xs text-dark-text-secondary">已上架</div>
            </div>
            <div class="text-center">
              <div class="text-lg font-semibold text-gray-600">{{ stats.products.draft }}</div>
              <div class="text-xs text-dark-text-secondary">草稿</div>
            </div>
            </div>
          </div>
        </div>

      <!-- 素材图库 -->
      <div class="bg-dark-card rounded-lg shadow-sm border border-dark-border overflow-hidden hover:shadow-md transition-shadow cursor-pointer" @click="navigateToGallery('materials')">
        <div class="aspect-video bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
          <div class="text-center text-white">
            <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
            </svg>
            <h3 class="text-xl font-bold">素材图库</h3>
            <p class="text-orange-100 mt-2">设计和创作素材</p>
          </div>
        </div>
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h4 class="font-semibold text-dark-text">素材图库</h4>
              <p class="text-sm text-dark-text-secondary">创作和设计素材</p>
            </div>
            <div class="text-right">
              <div class="text-2xl font-bold text-dark-text">{{ stats.materials.count }}</div>
              <div class="text-xs text-dark-text-secondary">张图片</div>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div class="text-center">
              <div class="text-lg font-semibold text-orange-600">{{ stats.materials.categories }}</div>
              <div class="text-xs text-dark-text-secondary">分类</div>
            </div>
            <div class="text-center">
              <div class="text-lg font-semibold text-purple-600">{{ stats.materials.recent }}</div>
              <div class="text-xs text-dark-text-secondary">最近添加</div>
            </div>
          </div>
        </div>
      </div>
              </div>
              
    <!-- 快速操作区域 -->
    <div class="mt-8">
      <h2 class="text-lg font-semibold text-dark-text mb-4">快速操作</h2>
      <div class="grid grid-cols-4 gap-4">
        <button 
          @click="quickAction('upload')"
          class="p-4 bg-dark-card border border-dark-border rounded-lg hover:bg-dark-hover transition-colors text-center"
        >
          <svg class="w-8 h-8 mx-auto mb-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
          </svg>
          <div class="text-sm font-medium text-dark-text">上传图片</div>
        </button>
        
        <button 
          @click="quickAction('organize')"
          class="p-4 bg-dark-card border border-dark-border rounded-lg hover:bg-dark-hover transition-colors text-center"
        >
          <svg class="w-8 h-8 mx-auto mb-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
          </svg>
          <div class="text-sm font-medium text-dark-text">整理分类</div>
        </button>
        
        <button 
          @click="quickAction('search')"
          class="p-4 bg-dark-card border border-dark-border rounded-lg hover:bg-dark-hover transition-colors text-center"
        >
          <svg class="w-8 h-8 mx-auto mb-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
          <div class="text-sm font-medium text-dark-text">搜索图片</div>
                </button>
        
        <button 
          @click="quickAction('batch')"
          class="p-4 bg-dark-card border border-dark-border rounded-lg hover:bg-dark-hover transition-colors text-center"
        >
          <svg class="w-8 h-8 mx-auto mb-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
                  </svg>
          <div class="text-sm font-medium text-dark-text">批量处理</div>
                </button>
      </div>
              </div>
              
    <!-- 最近活动 -->
    <div class="mt-8">
      <h2 class="text-lg font-semibold text-dark-text mb-4">最近活动</h2>
      <div class="bg-dark-card rounded-lg border border-dark-border p-6">
        <div class="space-y-4">
          <div v-for="activity in recentActivities" :key="activity.id" class="flex items-center space-x-4">
            <div class="w-10 h-10 rounded-full flex items-center justify-center" :class="activity.iconBg">
              <svg class="w-5 h-5" :class="activity.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="activity.iconPath"/>
              </svg>
              </div>
            <div class="flex-1">
              <div class="text-sm font-medium text-dark-text">{{ activity.action }}</div>
              <div class="text-xs text-dark-text-secondary">{{ activity.time }}</div>
            </div>
            <div class="text-sm text-dark-text-secondary">{{ activity.count }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { navigateTo } from '#app'

// 使用 dashboard 布局
definePageMeta({
  layout: 'dashboard'
})

// 统计数据
const stats = ref({
  results: {
    count: '1,234',
    success: '1,156',
    processing: '78'
  },
  products: {
    count: '892',
    active: '756',
    draft: '136'
  },
  materials: {
    count: '2,458',
    categories: '24',
    recent: '56'
  }
})

// 最近活动
const recentActivities = ref([
  {
    id: 1,
    action: '上传了 24 张商品图片',
    time: '2 小时前',
    count: '24张',
    iconPath: 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    id: 2,
    action: '生成了新的图片结果',
    time: '4 小时前',
    count: '12张',
    iconPath: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600'
  },
  {
    id: 3,
    action: '整理了素材分类',
    time: '1 天前',
    count: '3个分类',
    iconPath: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600'
  }
])

// 导航到图库页面
const navigateToGallery = (type) => {
  switch (type) {
    case 'results':
      navigateTo('/dashboard/images/processing-results')
      break
    case 'products':
      navigateTo('/dashboard/images/products')
      break
    case 'materials':
      navigateTo('/dashboard/images/materials')
      break
  }
}

// 快速操作
const quickAction = (action) => {
  console.log('快速操作:', action)
  // 这里可以根据不同的操作执行相应的功能
  switch (action) {
    case 'upload':
      // 打开上传弹窗
      break
    case 'organize':
      // 打开整理界面
      break
    case 'search':
      // 跳转到搜索页面
      break
    case 'batch':
      // 打开批量处理界面
      break
  }
}

// 获取统计数据
const fetchStats = async () => {
  // 这里可以调用API获取真实的统计数据
  console.log('获取图库统计数据')
}

// 页面初始化
onMounted(() => {
  fetchStats()
})
</script>