<template>
  <div class="flex flex-col h-screen bg-dark-bg overflow-hidden">
    <!-- 统计卡片 -->
    <div class="flex-shrink-0 p-4 border-b border-dark-border">
      <div class="grid grid-cols-4 gap-4">
        <div v-for="(stat, index) in statsData" :key="index" class="bg-dark-card rounded-lg shadow-sm border border-dark-border p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-dark-text-secondary">{{ stat.title }}</p>
            <p class="text-2xl font-bold text-dark-text mt-1">{{ stat.value }}</p>
            </div>
            <div class="w-12 h-12 rounded-lg flex items-center justify-center bg-blue-100">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 任务表格区域 - 精确自适应高度 -->
    <div class="flex-1 min-h-0 p-4">
    <TaskTable 
      :data="tableData" 
      :loading="loading"
      :pagination="pagination"
      :virtualScroll="tableData && tableData.length > 100"
      :totalItems="pagination && pagination.total || 0"
      :pageSize="pagination && pagination.limit || 10"
      :showNewButton="false"
      :currentApp="'collection'"
      idLabel="采集"
      typeLabel="采集"
      quantityLabel="采集"
      statusLabel="采集"
      newButtonText="新建采集"
      @view="openDetailModal"
      @delete="deleteTask"
      @newTask="showCreateModal = true"
      @page-change="handlePageChange"
      @page-size-change="handlePageSizeChange"
      @filter-change="handleFilterChange"
      @preload="handlePreloadImages"
    >
        <!-- 自定义搜索栏设计 -->
        <template #custom-filters>
          <div class="p-4 rounded-lg border border-dark-border bg-dark-card">
            <!-- 左右布局：左侧操作按钮，右侧搜索条件 -->
            <div class="flex items-center justify-between">
              <!-- 左侧：操作按钮组 -->
              <div class="flex space-x-3">
                <button 
                  @click="showCreateModal = true"
                  class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm border transition-colors flex items-center space-x-2"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  <span>新建采集</span>
                </button>
                
        <button 
                  class="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span>下载采集插件</span>
        </button>

                <button 
                  class="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  <span>采集规则</span>
                </button>
            </div>

              <!-- 右侧：搜索过滤区域 -->
            <div class="flex items-center space-x-4">
              <!-- 任务ID搜索 -->
              <div class="relative">
                <input 
                  type="text" 
                  v-model="filters.taskId" 
                  placeholder="搜索任务ID"
                  class="pl-10 pr-4 py-2 rounded-lg border text-sm w-48"
                  :style="{
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    borderColor: 'var(--border-color)'
                  }"
                >
                <svg class="absolute left-3 top-3 w-4 h-4" :style="{ color: 'var(--text-secondary)' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>

              <!-- 采集类型筛选 -->
              <div class="relative">
                <select 
                  v-model="filters.collectorType" 
                  class="appearance-none px-4 py-2 pr-8 rounded-lg border text-sm min-w-32"
                  :style="{
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    borderColor: 'var(--border-color)'
                  }"
                >
                  <option value="">全部类型</option>
                  <option value="1">商品</option>
                  <option value="2">店铺</option>
                  <option value="3">搜索</option>
                  <option value="4">其他</option>
                </select>
                <svg class="absolute right-2 top-3 w-4 h-4 pointer-events-none" :style="{ color: 'var(--text-secondary)' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>

              <!-- 采集平台筛选 -->
              <div class="relative">
                <select 
                  v-model="filters.collectorPlatform" 
                  class="appearance-none px-4 py-2 pr-8 rounded-lg border text-sm min-w-32"
                  :style="{
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    borderColor: 'var(--border-color)'
                  }"
                >
                  <option value="">全部平台</option>
                  <option value="1">TEMU</option>
                  <option value="2">亚马逊</option>
                  <option value="3">Shein</option>
                </select>
                <svg class="absolute right-2 top-3 w-4 h-4 pointer-events-none" :style="{ color: 'var(--text-secondary)' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>

              <!-- 任务状态筛选 -->
              <div class="relative">
                <select 
                  v-model="filters.status" 
                  class="appearance-none px-4 py-2 pr-8 rounded-lg border text-sm min-w-32"
                  :style="{
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    borderColor: 'var(--border-color)'
                  }"
                >
                  <option value="">全部状态</option>
                  <option value="0">待处理</option>
                  <option value="1">进行中</option>
                  <option value="2">已完成</option>
                  <option value="3">部分失败</option>
                  <option value="4">失败</option>
                </select>
                <svg class="absolute right-2 top-3 w-4 h-4 pointer-events-none" :style="{ color: 'var(--text-secondary)' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>

              <!-- 开始日期 -->
              <input 
                type="date" 
                v-model="filters.startDate"
                class="px-4 py-2 rounded-lg border text-sm"
                :style="{
                  backgroundColor: 'var(--bg-tertiary)',
                  color: 'var(--text-primary)',
                  borderColor: 'var(--border-color)'
                }"
              />

              <!-- 结束日期 -->
              <input 
                type="date" 
                v-model="filters.endDate"
                class="px-4 py-2 rounded-lg border text-sm"
                :style="{
                  backgroundColor: 'var(--bg-tertiary)',
                  color: 'var(--text-primary)',
                  borderColor: 'var(--border-color)'
                }"
              />

              <!-- 搜索按钮 -->
              <button 
                @click="handleSearch"
                class="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                <span>搜索</span>
              </button>

              <!-- 重置按钮 -->
              <button 
                @click="resetFilters"
                class="px-4 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-700"
                :style="{
                  backgroundColor: 'var(--bg-tertiary)',
                  color: 'var(--text-secondary)',
                  borderColor: 'var(--border-color)'
                }"
              >
                重置
              </button>
              </div>
            </div>
          </div>
      </template>
    </TaskTable>
    </div>

    <!-- 新建任务弹窗 -->
    <CollectionNewTaskModal 
      :isOpen="showCreateModal" 
      @close="showCreateModal = false"
      @submit="submitNewTask"
    />
    
    <!-- 任务详情弹窗 -->
    <CollectionDetailModal
      :isOpen="showDetailModal"
      :taskData="currentTaskData"
      @close="showDetailModal = false"
      @page-change="handleDetailPageChange"
    />
    
    <!-- 成功/失败消息提示 -->
    <div 
      v-if="notification.show"
      class="fixed top-16 left-1/2 transform -translate-x-1/2 z-50 px-5 py-4 rounded-md flex items-center shadow-lg"
      :class="notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'"
    >
      <div class="w-2 h-2 rounded-full mr-2 bg-white"></div>
      <span class="text-white">{{ notification.message }}</span>
      <div v-if="notification.type === 'error'" class="text-xs ml-2 text-white">
        请检查下网络连接后再试
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue'
import { usePageRefresh, createPageRefreshHandler } from '~/composables/usePageRefresh'
import TaskTable from '~/components/TaskTable.vue'
import CollectionNewTaskModal from '~/components/CollectionNewTaskModal.vue'
import CollectionDetailModal from '~/components/CollectionDetailModal.vue'
import { 
  getCollectorStats, 
  getTaskList, 
  getTaskDetail, 
  createCollector, 
  deleteCollector 
} from '~/apis/business/collector'

// 使用 dashboard 布局
definePageMeta({
  layout: 'dashboard'
})

// 页面状态
const loading = ref(false)
const showCreateModal = ref(false)
const showDetailModal = ref(false)
const currentTaskData = ref({})

// 分页和筛选状态
const pagination = ref({
  page: 1,
  limit: 10,
  total: 0
})

const filters = ref({
  taskId: '',
  collectorType: '',
  collectorPlatform: '',
  status: '',
  startDate: '',
  endDate: '',
  startTime: '',
  endTime: '',
  userId: ''
})

// 提示消息相关
const notification = ref({
  show: false,
  type: 'success',
  message: ''
})
let notificationTimer = null

// 统计数据
const statsData = ref([
  { title: '总采集', value: 0 },
  { title: '成功率', value: '0%' },
  { title: '进行中', value: '0' },
  { title: '今日采集', value: 0 }
])

// 表格数据
const tableData = ref([])

// 获取采集统计数据
const fetchCollectionStats = async () => {
  try {
    const response = await getCollectorStats()
    
    // 更新统计数据
    if (response && response.data) {
      const data = response.data
      
      // 更新统计数据（健壮的字段映射）
      // 总采集数 - 尝试多种可能的字段名
      const totalCount = data.count || data.total || data.totalCount || data.collectorCount || 0
      
      // 成功率 - 尝试多种可能的字段名，并确保乘以100
      const successRate = data.successRate || data.success_rate || data.rate || 0
      const successRatePercent = Math.round(successRate * 100)
      
      // 进行中数量 - 尝试多种可能的字段名  
      const inProgressCount = data.inProgressCount || data.processingCount || data.runningCount || data.processing || 0
      
      // 今日采集数 - 尝试多种可能的字段名
      const todayCount = data.todayCount || data.today || data.todayTotal || 0
      
      // 更新统计数据
      statsData.value[0].value = totalCount
      statsData.value[1].value = `${successRatePercent}%`
      statsData.value[2].value = inProgressCount  
      statsData.value[3].value = todayCount
    }
  } catch (error) {
    console.error('获取采集统计数据失败:', error)
    
    // 开发环境下使用模拟数据
    if (process.env.NODE_ENV === 'development') {
      console.warn('使用模拟统计数据')
      statsData.value[0].value = 2
      statsData.value[1].value = '100%'
      statsData.value[2].value = 1
      statsData.value[3].value = 2
    } else {
      throw error
    }
  }
}

// 获取任务列表数据
const fetchTaskList = async () => {
  try {
    const params = {
      page: pagination.value?.page || 1,
      limit: pagination.value?.limit || 10,
      ...filters.value
    }
    
    // 将startDate/endDate转换为startTime/endTime以匹配API参数
    if (params.startDate) {
      params.startTime = params.startDate
      delete params.startDate
    }
    if (params.endDate) {
      params.endTime = params.endDate
      delete params.endDate
    }
    
    // 过滤掉空值
    Object.keys(params).forEach(key => {
      if (params[key] === '' || params[key] === null || params[key] === undefined) {
        delete params[key]
      }
    })
    
    const response = await getTaskList(params)
    
    if (response && response.data) {
      const data = response.data
      
      // 根据实际API格式映射数据 - collectorList而不是list
      const rawList = data.collectorList || []
      
      // 转换数据格式以适配表格组件
      const mappedList = rawList.map(item => ({
        id: item.collectorId,
        type: getCollectorTypeText(item.collectorType),
        platform: getCollectorPlatformText(item.collectorPlatform), 
        targetCount: item.collectorNum || 0,
        successCount: item.collectorSuccessNum || 0,
        failCount: item.collectorFailNum || 0,
        status: item.collectorStatus,  // 保持原始数字状态值
        creator: item.createBy || 'unknown',
        createdAt: item.createTime || '',
        // 保留原始数据以备查看详情时使用
        rawData: item
      }))
      
      // 更新表格数据
      tableData.value = mappedList
      
      // 更新分页信息 - 根据实际API字段
      pagination.value = {
        page: parseInt(data.current || '1'),
        limit: parseInt(data.size || '10'),
        total: parseInt(data.total || '0')
      }
    }
  } catch (error) {
    console.error('获取任务列表失败:', error)
    
    // 开发环境下使用模拟数据
    if (process.env.NODE_ENV === 'development') {
      console.warn('使用模拟任务列表数据')
      
      // 模拟数据
      const mockData = [{
        collectorId: '195016341186703360',
        collectorType: 4,
        collectorPlatform: 1,
        collectorNum: 2,
        collectorSuccessNum: 2,
        collectorFailNum: 0,
        collectorStatus: 1,
        createBy: 'api_key_0',
        createTime: '2025-07-29 19:56:04'
      }]
      
      // 转换数据格式
      const mappedList = mockData.map(item => ({
        id: item.collectorId,
        type: getCollectorTypeText(item.collectorType),
        platform: getCollectorPlatformText(item.collectorPlatform),
        targetCount: item.collectorNum || 0,
        successCount: item.collectorSuccessNum || 0,
        failCount: item.collectorFailNum || 0,
        status: item.collectorStatus,  // 保持原始数字状态值
        creator: item.createBy || 'unknown',
        createdAt: item.createTime || '',
        rawData: item
      }))
      
      tableData.value = mappedList
      
      // 模拟分页信息
      pagination.value = {
        page: 1,
        limit: 10,
        total: 1
      }
    } else {
      // 生产环境下，确保tableData不为undefined
      tableData.value = []
      pagination.value = {
        page: 1,
        limit: 10,
        total: 0
      }
      showNotification('error', '任务列表加载失败')
    }
  }
}

// 转换采集器类型数字为文字
const getCollectorTypeText = (type) => {
  const typeMap = {
    1: '商品',
    2: '店铺', 
    3: '搜索',
    4: '其他'
  }
  return typeMap[type] || `类型${type}`
}

// 转换采集器平台数字为文字
const getCollectorPlatformText = (platform) => {
  const platformMap = {
    1: 'TEMU',
    2: '亚马逊',
    3: 'Shein'
  }
  return platformMap[platform] || `平台${platform}`
}

// 转换采集器状态数字为文字
const getCollectorStatusText = (status) => {
  const statusMap = {
    0: '待处理',
    1: '进行中', 
    2: '已完成',
    3: '部分失败',
    4: '失败'
  }
  return statusMap[status] || `状态${status}`
}

// 转换产品状态数字为文字
const getProductStatusText = (status) => {
  const statusMap = {
    0: '待处理',
    1: '处理中',
    2: '已完成', 
    3: '失败',
    4: '已取消',
    5: '部分成功'
  }
  return statusMap[status] || `状态${status}`
}

// 预加载缓存
const preloadCache = new Set()

// 处理表格行hover预加载
const handlePreloadImages = async (item) => {
  // 防止重复预加载同一个任务
  if (preloadCache.has(item.id)) {
    console.log(`🔄 [Collection] 任务 ${item.id} 已预加载，跳过`)
    return
  }
  
  console.log(`👆 [Collection] 开始hover预加载任务 ${item.id}`)
  
  try {
    // 获取详情数据
    const detailResponse = await getTaskDetail({
      taskId: item.id,
      page: 1,
      limit: 10
    })
    
    if (detailResponse && detailResponse.data) {
      const productList = detailResponse.data.productList || []
      const imageUrls = productList
        .map(product => product.image)
        .filter(Boolean) // 过滤掉空值
        .slice(0, 5) // 只预加载前5张图片，避免过度占用带宽
      
      // 批量预加载图片 (普通优先级)
      if (imageUrls.length > 0) {
        const { default: imagePreloader } = await import('~/utils/imagePreloader')
        imagePreloader.preloadBatch(imageUrls, 'normal')
        preloadCache.add(item.id) // 标记已预加载
        console.log(`✅ [Collection] hover预加载任务 ${item.id} 的 ${imageUrls.length} 张图片`)
      }
    }
  } catch (error) {
    console.log('❌ [Collection] hover预加载图片失败:', error)
  }
}

// 预加载任务详情图片 (点击时高优先级)
const preloadTaskImages = async (taskId) => {
  console.log(`🚀 [Collection] 开始高优先级预加载任务 ${taskId}`)
  
  try {
    // 先获取详情数据
    const detailResponse = await getTaskDetail({
      taskId: taskId,
      page: 1,
      limit: 10
    })
    
    if (detailResponse && detailResponse.data) {
      const productList = detailResponse.data.productList || []
      const imageUrls = productList
        .map(product => product.image)
        .filter(Boolean) // 过滤掉空值
      
      // 批量预加载图片 (高优先级)
      if (imageUrls.length > 0) {
        const { default: imagePreloader } = await import('~/utils/imagePreloader')
        await imagePreloader.preloadBatch(imageUrls, 'high')
        preloadCache.add(taskId) // 标记已预加载
        console.log(`✅ [Collection] 高优先级预加载任务 ${taskId} 的 ${imageUrls.length} 张图片完成`)
      }
    }
  } catch (error) {
    console.log('❌ [Collection] 高优先级预加载图片失败:', error)
  }
}

// 打开详情弹窗
const openDetailModal = async (task) => {
  try {
    console.log(`🔍 [Collection] 打开详情弹窗，任务ID: ${task.id}`)
    
    // 先设置基本任务数据并显示弹窗
    currentTaskData.value = task
    showDetailModal.value = true
    
    // 只有在没有预加载过的情况下才进行高优先级预加载
    if (!preloadCache.has(task.id)) {
      console.log(`📥 [Collection] 任务 ${task.id} 未预加载，开始高优先级预加载`)
      preloadTaskImages(task.id)
    } else {
      console.log(`✅ [Collection] 任务 ${task.id} 已预加载，直接显示`)
    }
    
    // 调用详情接口获取详细数据
    const detailResponse = await getTaskDetail({
      taskId: task.id,
      page: 1,
      limit: 10
    })
    
    // 更新任务详情数据
    if (detailResponse && detailResponse.data) {
      const data = detailResponse.data
      
      // 处理产品数据 - 根据实际API返回的productList字段
      const productList = data.productList || []
      
      // 转换产品数据格式以适配详情弹窗组件
      const formattedProducts = productList.map(product => ({
        id: product.id,
        image: product.image,
        title: product.title,
        platform: getCollectorPlatformText(product.platform),
        price: product.price,
        status: getProductStatusText(product.status),
        url: product.url,
        categoryId: product.categoryId,
        // 保留原始数据
        rawData: product
      }))
      
      currentTaskData.value = {
        ...currentTaskData.value,
        detailList: formattedProducts,
        detailTotal: parseInt(data.total || '0'),
        detailPagination: {
          page: parseInt(data.current || '1'),
          limit: parseInt(data.size || '10'), 
          total: parseInt(data.total || '0')
        }
      }
    }
  } catch (error) {
    console.error('获取任务详情失败:', error)
    
    // 开发环境下使用模拟详情数据
    if (process.env.NODE_ENV === 'development') {
      console.warn('使用模拟任务详情数据')
      
      // 模拟产品详情数据
      const mockProductList = [
        {
          id: '1',
          image: '/images/ai-generate.jpg',
          title: '3件女士无袖圆领上衣 - 休闲优雅A字裙',
          platform: 1,
          price: '$16.10',
          status: 2,
          url: 'https://example.com/product1',
          categoryId: 'cat001'
        },
        {
          id: '2', 
          image: '/images/fashion-model1.jpg',
          title: '三件套2025款美时尚保体怀孕松上衣领',
          platform: 1,
          price: '$18.81',
          status: 2,
          url: 'https://example.com/product2',
          categoryId: 'cat002'
        }
      ]
      
      // 转换产品数据格式
      const formattedProducts = mockProductList.map(product => ({
        id: product.id,
        image: product.image,
        title: product.title,
        platform: getCollectorPlatformText(product.platform),
        price: product.price,
        status: getProductStatusText(product.status),
        url: product.url,
        categoryId: product.categoryId,
        rawData: product
      }))
      
      currentTaskData.value = {
        ...currentTaskData.value,
        detailList: formattedProducts,
        detailTotal: 2,
        detailPagination: {
          page: 1,
          limit: 10,
          total: 2
        }
      }
    } else {
      showNotification('error', '获取任务详情失败')
    }
  }
}

// 删除任务
const deleteTask = async (task) => {
  try {
    // 调用删除API
    await deleteCollector(task.id)
    
    // 更新本地数据
  const index = tableData.value.findIndex(item => item.id === task.id)
  if (index !== -1) {
    tableData.value.splice(index, 1)
    }
    
    showNotification('success', '任务删除成功！')
  } catch (error) {
    console.error('删除任务失败:', error)
    showNotification('error', '任务删除失败')
  }
}

// 提交新建采集任务
const submitNewTask = async (formData) => {
  try {
    // 调用创建API
    const response = await createCollector(formData)
    
    // 创建本地任务对象
  const newTask = {
      id: response.data?.id || `COL${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
    type: formData.type === 'product' ? '商品链接' : 
          formData.type === 'store' ? '店铺链接' : 
          formData.type === 'search' ? '搜索采集' : '采集插件',
    platform: formData.selectedPlatform ? (
      formData.selectedPlatform === 'amazon' ? '亚马逊' : 
      formData.selectedPlatform === 'temu' ? 'TEMU' : 
      'Shein'
    ) : '亚马逊',
    targetCount: formData.targetCount || 1,  // 使用1作为最小合理默认值，而不是100
    successCount: 0,
    status: 1,  // 1对应"进行中"状态
    creator: 'admin',
    createdAt: new Date().toLocaleString()
  }
  
  // 添加到表格数据
  tableData.value.unshift(newTask)
  
  // 更新统计数据
    statsData.value[0].value += 1
  statsData.value[3].value += 1
  
  // 关闭弹窗
  showCreateModal.value = false
  
  // 显示成功通知
  showNotification('success', '任务提交成功！')
  } catch (error) {
    console.error('提交任务失败:', error)
    showNotification('error', '任务提交失败')
}
}

// 处理分页变化
const handlePageChange = (newPagination) => {
  if (pagination.value) {
  pagination.value = { ...pagination.value, ...newPagination }
  }
  fetchTaskList()
}

// 处理分页大小变化
const handlePageSizeChange = (newPageSize) => {
  if (pagination.value) {
  pagination.value.limit = newPageSize
  pagination.value.page = 1 // 重置到第一页
  }
  fetchTaskList()
}

// 手动搜索
const handleSearch = () => {
  console.log('执行搜索，当前筛选条件:', filters.value)
  if (pagination.value) {
    pagination.value.page = 1 // 重置到第一页
  }
  fetchTaskList()
}

// 处理筛选条件变化
const handleFilterChange = (newFilters) => {
  filters.value = { ...filters.value, ...newFilters }
  if (pagination.value) {
  pagination.value.page = 1 // 筛选时重置到第一页
  }
  fetchTaskList()
}

// 重置筛选条件
const resetFilters = () => {
  filters.value = {
    taskId: '',
    collectorType: '',
    collectorPlatform: '',
    status: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    userId: ''
  }
  if (pagination.value) {
  pagination.value.page = 1
  }
  fetchTaskList()
}

// 处理下载项目
const handleDownloadItems = (items) => {
  console.log('下载选中项目:', items)
}

// 处理详情弹窗的分页变化
const handleDetailPageChange = async (newPagination) => {
  if (!currentTaskData.value || !currentTaskData.value.id) {
    return
  }
  
  try {
    const detailResponse = await getTaskDetail({
      taskId: currentTaskData.value.id,
      page: newPagination.page || 1,
      limit: newPagination.limit || 10
    })
    
    if (detailResponse && detailResponse.data) {
      const data = detailResponse.data
      
      // 处理产品数据 - 根据实际API返回的productList字段
      const productList = data.productList || []
      
      // 转换产品数据格式以适配详情弹窗组件
      const formattedProducts = productList.map(product => ({
        id: product.id,
        image: product.image,
        title: product.title,
        platform: getCollectorPlatformText(product.platform),
        price: product.price,
        status: getProductStatusText(product.status),
        url: product.url,
        categoryId: product.categoryId,
        // 保留原始数据
        rawData: product
      }))
      
      currentTaskData.value = {
        ...currentTaskData.value,
        detailList: formattedProducts,
        detailTotal: parseInt(data.total || '0'),
        detailPagination: {
          page: parseInt(data.current || newPagination.page || '1'),
          limit: parseInt(data.size || newPagination.limit || '10'),
          total: parseInt(data.total || '0')
        }
      }
    }
  } catch (error) {
    console.error('获取任务详情分页数据失败:', error)
    
    // 开发环境下保持当前数据，不显示错误
    if (process.env.NODE_ENV === 'development') {
      console.warn('详情分页数据获取失败，保持当前数据')
    } else {
      showNotification('error', '获取详情数据失败')
    }
  }
}

// 显示通知消息
const showNotification = (type, message) => {
  // 清除之前的计时器
  if (notificationTimer) {
    clearTimeout(notificationTimer)
  }
  
  // 设置新的通知
  notification.value = {
    show: true,
    type,
    message
  }
  
  // 3秒后自动隐藏
  notificationTimer = setTimeout(() => {
    notification.value.show = false
  }, 3000)
}

// 重置筛选条件的函数
const resetFiltersFunc = () => {
  filterParams.value = {
    taskId: '',
    keyword: '',
    platform: '',
    status: '',
    startTime: '',
    endTime: ''
  }
}

// 重置分页的函数
const resetPaginationFunc = () => {
  pagination.page = 1
  pagination.limit = 10
}

// 创建强制刷新处理器
const forceRefreshData = createPageRefreshHandler([fetchCollectionStats, fetchTaskList])

// 使用页面刷新组合式函数
usePageRefresh(forceRefreshData, '/dashboard/apps/collection')

// 页面强制刷新监听
const handleForceRefresh = (event) => {
  if (event.detail?.path === route.path) {
    console.log('页面强制刷新:', route.path)
    loading.value = true
    // 重新加载页面数据
    Promise.all([
      fetchCollectionStats(),
      fetchTaskList()
    ])
    .catch(error => {
      console.error('强制刷新数据加载失败:', error)
    })
    .finally(() => {
      loading.value = false
    })
  }
}

// 页面加载时获取数据
onMounted(() => {
  loading.value = true
  // 立即显示页面，后台异步获取数据（不等待完成）
  Promise.all([
      fetchCollectionStats(),
      fetchTaskList()
    ])
  .then(() => {
    // 只在成功加载时显示通知
    if (process.env.NODE_ENV !== 'development' || (tableData.value && tableData.value.length > 0)) {
      showNotification('success', '数据加载成功')
    }
  })
  .catch(error => {
    console.error('页面数据加载失败:', error)
    
    // 开发环境下不显示错误通知，因为会使用模拟数据
    if (process.env.NODE_ENV !== 'development') {
      showNotification('error', '数据加载失败')
    }
  })
  .finally(() => {
    loading.value = false
  })
  
  // 监听页面强制刷新事件
  window.addEventListener('page-force-refresh', handleForceRefresh)
})

onBeforeUnmount(() => {
  // 清理事件监听
  window.removeEventListener('page-force-refresh', handleForceRefresh)
})
</script>