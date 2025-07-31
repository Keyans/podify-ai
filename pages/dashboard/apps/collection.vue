<template>
  <div class="p-6">
    <!-- 统计卡片 -->
    <div class="grid grid-cols-4 gap-6 mb-6">
      <div v-for="(stat, index) in statsData" :key="index" class="bg-dark-card rounded-lg shadow-sm border border-dark-border p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-dark-text-secondary">{{ stat.title }}</p>
            <p class="text-2xl font-bold text-dark-text mt-1">{{ stat.value }}</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 表格区域 -->
    <TaskTable 
      :data="tableData" 
      :loading="loading"
      :pagination="pagination"
      :virtualScroll="tableData.length > 100"
      :totalItems="pagination.total"
      :pageSize="pagination.limit"
      :showNewButton="false"
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
    >
      <template #extra-buttons>
        <button 
          class="flex items-center space-x-2 px-4 py-2 rounded-md text-sm"
          :style="{
            backgroundColor: 'var(--accent-color)',
            color: 'white'
          }"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span>下载采集插件</span>
        </button>
      </template>
    </TaskTable>

    <!-- 新建采集任务弹窗 -->
    <CollectionNewTaskModal 
      :isOpen="showCreateModal" 
      @close="showCreateModal = false"
      @submit="submitNewTask"
    />
    
    <!-- 采集任务详情弹窗 -->
    <CollectionDetailModal
      :isOpen="showDetailModal"
      :taskData="currentTaskData"
      type="product"
      @close="showDetailModal = false"
      @download="handleDownloadItems"
      @page-change="handleDetailPageChange"
    />
    
    <!-- 成功/失败消息提示 -->
    <div 
      v-if="notification.show"
      class="fixed top-16 left-1/2 transform -translate-x-1/2 z-50 px-5 py-4 rounded-md flex items-center shadow-lg"
      :style="{
        backgroundColor: notification.type === 'success' ? 'rgba(39, 174, 96, 0.9)' : 'rgba(235, 87, 87, 0.9)',
        color: 'white'
      }"
    >
      <div class="w-2 h-2 rounded-full mr-2" :style="{ backgroundColor: 'white' }"></div>
      <span>{{ notification.message }}</span>
      <div v-if="notification.type === 'error'" class="text-xs ml-2">
        请检查下网络连接后再试
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import TaskTable from '~/components/TaskTable.vue'
import CollectionNewTaskModal from '~/components/CollectionNewTaskModal.vue'
import CollectionDetailModal from '~/components/CollectionDetailModal.vue'

// 使用 dashboard 布局
definePageMeta({
  layout: 'dashboard'
})

// 注入API - 使用新的API结构
const { $collector, $apiConfig } = useNuxtApp()



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
  collectorType: null,
  collectorPlatform: null,
  status: null,
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
    const response = await $collector.getCollectorStats()
    
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
      page: pagination.value.page,
      limit: pagination.value.limit,
      ...filters.value
    }
    
    // 过滤掉空值
    Object.keys(params).forEach(key => {
      if (params[key] === '' || params[key] === null || params[key] === undefined) {
        delete params[key]
      }
    })
    
    const response = await $collector.getTaskList(params)
    
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
        status: getCollectorStatusText(item.collectorStatus),
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
        status: getCollectorStatusText(item.collectorStatus),
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
      showNotification('error', '任务列表加载失败')
    }
  }
}

// 转换采集器类型数字为文字
const getCollectorTypeText = (type) => {
  const typeMap = {
    1: '商品链接',
    2: '店铺链接', 
    3: '搜索采集',
    4: '采集插件'
  }
  return typeMap[type] || `类型${type}`
}

// 转换采集器平台数字为文字
const getCollectorPlatformText = (platform) => {
  const platformMap = {
    1: '亚马逊',
    2: 'TEMU',
    3: 'Shein',
    4: '1688',
    5: '淘宝'
  }
  return platformMap[platform] || `平台${platform}`
}

// 转换采集器状态数字为文字
const getCollectorStatusText = (status) => {
  const statusMap = {
    0: '待处理',
    1: '处理中', 
    2: '已完成',
    3: '失败',
    4: '已取消'
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

// 打开详情弹窗
const openDetailModal = async (task) => {
  try {
    // 先设置基本任务数据
  currentTaskData.value = task
  showDetailModal.value = true
    
    // 调用详情接口获取详细数据
    const detailResponse = await $collector.getTaskDetail({
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
    await $collector.deleteCollector(task.id)
    
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
    const response = await $collector.createCollector(formData)
    
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
      targetCount: formData.targetCount || 100,
    successCount: 0,
    status: 'processing',
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
  pagination.value = { ...pagination.value, ...newPagination }
  fetchTaskList()
}

// 处理分页大小变化
const handlePageSizeChange = (newPageSize) => {
  pagination.value.limit = newPageSize
  pagination.value.page = 1 // 重置到第一页
  fetchTaskList()
}

// 处理筛选条件变化
const handleFilterChange = (newFilters) => {
  filters.value = { ...filters.value, ...newFilters }
  pagination.value.page = 1 // 筛选时重置到第一页
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
    const detailResponse = await $collector.getTaskDetail({
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

// 页面加载时获取数据
onMounted(async () => {
  loading.value = true
  try {
    // 并行加载统计数据和任务列表
    await Promise.all([
      fetchCollectionStats(),
      fetchTaskList()
    ])
    
    // 只在成功加载时显示通知
    if (process.env.NODE_ENV !== 'development' || (tableData.value.length > 0)) {
      showNotification('success', '数据加载成功')
    }
  } catch (error) {
    console.error('页面数据加载失败:', error)
    
    // 开发环境下不显示错误通知，因为会使用模拟数据
    if (process.env.NODE_ENV !== 'development') {
      showNotification('error', '数据加载失败')
    }
  } finally {
    loading.value = false
  }
})
</script>