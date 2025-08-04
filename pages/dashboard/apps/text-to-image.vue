<template>
  <div class="flex flex-col h-screen bg-dark-bg overflow-hidden">
    <!-- 统计卡片 -->
    <div class="flex-shrink-0 p-4 border-b border-dark-border">
      <div class="grid grid-cols-4 gap-4">
        <div v-for="(stat, index) in stats" :key="index" class="bg-dark-card rounded-lg shadow-sm border border-dark-border p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-dark-text-secondary">{{ stat.label }}</p>
            <p class="text-2xl font-bold text-dark-text mt-1">{{ stat.value }}</p>
          </div>
          <div class="w-12 h-12 rounded-lg flex items-center justify-center" :class="stat.iconBg">
            <svg class="w-6 h-6" :class="stat.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="stat.iconPath"/>
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
      :currentApp="'text-to-image'"
      idLabel="生图"
      typeLabel="生图"
      quantityLabel="生图"
      statusLabel="任务"
      newButtonText="新建生图"
      :showType="false"
      @view="showTaskDetail"
      @newTask="showCreateModal = true"
      @page-change="handlePageChange"
      @filter-change="handleFilterChange"
      >
        <!-- 自定义搜索栏设计 -->
        <template #custom-filters>
          <div class="p-4 rounded-lg border border-dark-border bg-dark-card">
            <!-- 左右布局：左侧操作按钮，右侧搜索条件 -->
            <div class="flex items-center justify-between">
              <!-- 左侧：新建按钮 -->
              <div class="flex space-x-3">
                <button 
                  @click="showCreateModal = true"
                  class="flex items-center space-x-2 px-4 py-2 bg-cyan-400 text-white rounded-lg hover:bg-cyan-500 text-sm"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  <span>新建生图</span>
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

              <!-- 生图状态筛选 -->
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
                  <option value="waiting">等待中</option>
                  <option value="processing">生成中</option>
                  <option value="completed">已完成</option>
                  <option value="failed">失败</option>
                </select>
                <svg class="absolute right-2 top-3 w-4 h-4 pointer-events-none" :style="{ color: 'var(--text-secondary)' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>

              <!-- 开始日期 -->
              <div class="relative">
                <input 
                  type="date" 
                  v-model="filters.startDate" 
                  placeholder="开始日期"
                  class="px-4 py-2 rounded-lg border text-sm min-w-40"
                  :style="{
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    borderColor: 'var(--border-color)'
                  }"
                >
              </div>

              <!-- 结束日期 -->
              <div class="relative">
                <input 
                  type="date" 
                  v-model="filters.endDate" 
                  placeholder="结束日期"
                  class="px-4 py-2 rounded-lg border text-sm min-w-40"
                  :style="{
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    borderColor: 'var(--border-color)'
                  }"
                >
              </div>

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
  </div>

  <!-- 新建文生图任务弹窗 -->
  <TextToImageNewTaskModal 
    :isOpen="showCreateModal" 
    @close="showCreateModal = false"
    @submit="handleTaskSubmit"
  />

  <!-- 文生图任务详情弹窗 -->
  <TextToImageDetailModal
    :isOpen="showDetailModal"
    :taskData="currentTaskData"
    @close="showDetailModal = false"
    @download="handleDownloadImages"
    @page-change="handleDetailPageChange"
  />
</template>

<script setup>
import { ref, onMounted, computed, onBeforeUnmount } from 'vue'
import TaskTable from '~/components/TaskTable.vue'
import TextToImageNewTaskModal from '~/components/TextToImageNewTaskModal.vue'
import TextToImageDetailModal from '~/components/TextToImageDetailModal.vue'
import { getTextToImageStats, getTextToImageTaskList, getTextToImageTaskDetail } from '~/apis/business/text-to-image'
import { usePageRefresh, createPageRefreshHandler } from '~/composables/usePageRefresh'

// 使用 dashboard 布局
definePageMeta({
  layout: 'dashboard'
})

const route = useRoute()

// 控制新建文生图弹窗显示
const showCreateModal = ref(false)

// 控制详情弹窗显示
const showDetailModal = ref(false)
const currentTaskData = ref({})
const taskDetailData = ref([])
const detailLoading = ref(false)

// 页面加载状态
const loading = ref(false)

// 统计数据
const statsData = ref({
  count: '0',
  successCount: '0',
  failedCount: '0',
  successRate: 0,
  inProgressCount: '0',
  todayCount: '0'
})

// 计算属性：统计卡片数据
const stats = computed(() => [
  {
    label: '总生图数',
    value: statsData.value.count,
    iconPath: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    label: '成功率',
    value: `${statsData.value.successRate}%`,
    iconPath: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600'
  },
  {
    label: '处理中',
    value: statsData.value.inProgressCount,
    iconPath: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600'
  },
  {
    label: '今日生图',
    value: statsData.value.todayCount,
    iconPath: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600'
  }
])

// 表格数据
const tableData = ref([])

// 分页参数
const pageParams = ref({
  page: 1,
  limit: 10
})

// 筛选参数
const filterParams = ref({
  taskId: '',
  status: '',
  startTime: '',
  endTime: '',
  userId: ''
})

// 表单筛选器状态
const filters = ref({
  taskId: '',
  status: '',
  startDate: '',
  endDate: ''
})

// 重置筛选条件
const resetFilters = () => {
  filters.value = {
    taskId: '',
    status: '',
    startDate: '',
    endDate: ''
  }
  // 更新filterParams并重新获取数据
  filterParams.value = {
    taskId: filters.value.taskId || '',
    status: filters.value.status || '',
    startTime: filters.value.startDate || '',
    endTime: filters.value.endDate || '',
    userId: ''
  }
  pageParams.value.page = 1
  fetchTaskList()
}

// 获取统计数据
const fetchStats = async () => {
  try {
    const response = await getTextToImageStats()
    if (response.success) {
      // 根据新的API返回结构映射统计数据
      const data = response.data
      statsData.value = {
        count: data.count || '0',
        successCount: data.successCount || '0', 
        failedCount: data.failedCount || '0',
        successRate: data.successRate || 0,
        inProgressCount: data.inProgressCount || '0',
        todayCount: data.todayCount || '0'
      }
    }
  } catch (error) {
    console.error('获取文生图统计数据失败:', error)
  }
}

// 获取任务列表
const fetchTaskList = async () => {
  try {
    loading.value = true
    const params = {
      ...pageParams.value,
      ...filterParams.value
    }
    const response = await getTextToImageTaskList(params)
    if (response.success) {
      // 根据新的API返回结构映射数据字段到表格需要的格式
      const rawList = response.data?.list || response.data?.creatorList || []
      tableData.value = rawList.map(item => ({
        id: item.creatorId || item.id,        // 使用creatorId作为主键
        生图ID: item.creatorId || item.id,    // 生图ID使用creatorId字段
        目标: item.cropperNum || item.targetCount || item.size || '0',  // 使用cropperNum作为主要目标数量
        成功: item.current || item.successCount || '1',
        失败: '0', // 根据接口文档，暂时设为0
        任务状态: getStatusText(item.status),
        创建人: item.creatorId || item.creator || item.createBy,
        创建时间: item.createTime || item.createdAt,
        // 保留原始数据以备后用
        _raw: item
      }))
    }
  } catch (error) {
    console.error('获取文生图任务列表失败:', error)
  } finally {
    loading.value = false
  }
}

// 状态文本转换
const getStatusText = (status) => {
  const statusMap = {
    0: '进行中',
    1: '已完成',
    2: '失败',
    3: '暂停'
  }
  return statusMap[status] || '未知'
}

// 查看任务详情
const showTaskDetail = async (item) => {
  console.log('=== 开始查看详情调试 ===')
  console.log('点击查看详情，传入的item数据:', item)
  
  // 获取详情数据，使用 creatorId 或 id
  const taskId = item.id || item.生图ID || item._raw?.creatorId || item._raw?.id
  console.log('提取的taskId (实际是creatorId):', taskId)
  
  // 设置当前任务数据，包含详情数据结构
  currentTaskData.value = {
    ...item,
    detailList: [], // 初始化为空数组
    detailPagination: {
      page: 1,
      limit: 10,
      total: 0
    }
  }
  
  showDetailModal.value = true
  
  if (taskId) {
    console.log('开始调用fetchTaskDetail，taskId (creatorId):', taskId)
    await fetchTaskDetail(taskId)
  } else {
    console.error('无法获取taskId (creatorId)，item数据:', item)
  }
  console.log('=== 查看详情调试结束 ===')
}

// 获取任务详情
const fetchTaskDetail = async (taskId) => {
  try {
    detailLoading.value = true
    const params = {
      taskId,  // 使用 taskId 作为参数名，值为creatorId
      page: currentTaskData.value.detailPagination?.page || 1,
      limit: currentTaskData.value.detailPagination?.limit || 10
    }
    console.log('获取文生图任务详情，参数:', params)
    console.log('准备调用getTextToImageTaskDetail接口...')
    
    const response = await getTextToImageTaskDetail(params)
    console.log('文生图任务详情响应:', response)
    
    if (response && response.success) {
      console.log('接口调用成功，开始处理数据...')
      // 根据新的API返回结构处理详情数据
      const data = response.data
      const detailList = data?.creatorList || []
      console.log('从接口获取的creatorList:', detailList)
      
      // 转换数据格式以适配详情弹窗组件
      const transformedList = detailList.map((item, index) => ({
        id: index + 1,
        referenceImage: item.imageUrl, // 原图作为参考图
        resultImages: item.resultsImageUrl || [], // 结果图片数组
        dimensions: item.dimensions || '1024×1024', // 尺寸
        description: item.description || item.prompt || '文生图任务', // 描述
        prompt: item.prompt || '文生图提示词',
        status: getDetailStatusText(item.status), // 转换状态文本
        selected: false,
        _raw: item // 保留原始数据
      }))
      
      console.log('转换后的数据:', transformedList)
      
      // 更新当前任务数据中的详情信息
      currentTaskData.value = {
        ...currentTaskData.value,
        detailList: transformedList,
        detailPagination: {
          page: parseInt(data.current) || parseInt(params.page) || 1,
          limit: parseInt(data.size) || parseInt(params.limit) || 10,
          total: parseInt(data.total) || 0,
          pages: parseInt(data.pages) || 1
        }
      }
      
      console.log('更新后的currentTaskData:', currentTaskData.value)
      
      // 同时更新taskDetailData以保持兼容性
      taskDetailData.value = transformedList
    } else {
      console.error('接口返回失败或response为空:', response)
    }
  } catch (error) {
    console.error('获取文生图任务详情失败:', error)
    console.error('错误详情:', error.message, error.stack)
  } finally {
    detailLoading.value = false
    console.log('fetchTaskDetail结束，detailLoading设为false')
  }
}

// 详情状态文本转换
const getDetailStatusText = (status) => {
  const statusMap = {
    0: '处理中',
    1: '已完成', 
    2: '失败',
    3: '部分完成'
  }
  return statusMap[status] || '未知'
}

// 处理详情页面变化
const handleDetailPageChange = async (pagination) => {
  console.log('文生图详情页面变化:', pagination)
  
  // 更新当前任务数据的分页信息
  currentTaskData.value.detailPagination = {
    ...currentTaskData.value.detailPagination,
    page: pagination.page || pagination.current,
    limit: pagination.limit || pagination.size
  }
  
  // 重新获取详情数据，使用creatorId
  const taskId = currentTaskData.value.id || currentTaskData.value.生图ID || currentTaskData.value._raw?.creatorId || currentTaskData.value._raw?.id
  if (taskId) {
    await fetchTaskDetail(taskId)
  }
}

// 事件处理函数 
// 手动搜索
const handleSearch = () => {
  console.log('执行搜索，当前筛选条件:', filters.value)
  // 更新filterParams
  filterParams.value = {
    taskId: filters.value.taskId || '',
    status: filters.value.status || '',
    startTime: filters.value.startDate || '',
    endTime: filters.value.endDate || '',
    userId: ''
  }
  pageParams.value.page = 1 // 重置到第一页
  fetchTaskList()
}

const handleFilterChange = (filters) => {
  console.log('筛选条件变化:', filters)
  filterParams.value = { ...filterParams.value, ...filters }
  pageParams.value.page = 1 // 重置到第一页
  fetchTaskList()
}

const handlePageChange = (page) => {
  console.log('分页变化:', page)
  pageParams.value.page = page
  fetchTaskList()
}

// 处理新建文生图任务提交
const handleTaskSubmit = async (formData) => {
  console.log('新建文生图任务:', formData)
  
  try {
    // 关闭弹窗
    showCreateModal.value = false
    
    // 无论任务创建成功还是失败，都要刷新数据
    await Promise.all([
      fetchStats(),
      fetchTaskList()
    ])
    
    // 检查任务创建结果并显示相应提示
    if (formData.success && formData.taskResponse) {
      console.log('文生图任务创建成功，响应数据:', formData.taskResponse)
      console.log('文生图任务创建成功，数据已刷新')
      
      // 可以在这里添加成功提示
      // ElMessage.success('文生图任务创建成功')
      
    } else {
      console.error('文生图任务创建失败:', formData.error || '未知错误')
      
      // 可以在这里添加错误提示
      // ElMessage.error(formData.error || '文生图任务创建失败')
    }
    
  } catch (error) {
    console.error('处理文生图任务提交失败:', error)
    // 即使出错也要关闭弹窗
    showCreateModal.value = false
  }
}

// 处理图片下载
const handleDownloadImages = (images) => {
  console.log('下载文生图结果:', images)
  // 实际应用中应该调用下载API
}

// 重置筛选条件的函数
const resetFiltersFunc = () => {
  filters.value = {
    taskId: '',
    status: '',
    startDate: '',
    endDate: ''
  }
  filterParams.value = {
    taskId: '',
    status: '',
    startTime: '',
    endTime: '',
    userId: ''
  }
}

// 重置分页的函数
const resetPaginationFunc = () => {
  pageParams.value = {
    page: 1,
    limit: 10
  }
}

// 创建强制刷新处理器
const forceRefreshData = createPageRefreshHandler([fetchStats, fetchTaskList])

// 使用页面刷新组合式函数
usePageRefresh(forceRefreshData, '/dashboard/apps/text-to-image')

// 页面初始化
// 页面强制刷新监听
const handleForceRefresh = (event) => {
  if (event.detail?.path === route.path) {
    console.log('页面强制刷新:', route.path)
    // 重新加载页面数据
    Promise.all([
      fetchStats(),
      fetchTaskList()
    ]).catch(error => {
      console.error('强制刷新数据加载失败:', error)
    })
  }
}

onMounted(() => {
  // 立即显示页面，后台异步获取数据（不等待完成）
  Promise.all([
    fetchStats(),
    fetchTaskList()
  ]).catch(error => {
    console.error('数据加载失败:', error)
  })
  
  // 监听页面强制刷新事件
  window.addEventListener('page-force-refresh', handleForceRefresh)
})

onBeforeUnmount(() => {
  // 清理事件监听
  window.removeEventListener('page-force-refresh', handleForceRefresh)
})
</script> 