<template>
  <div class="flex flex-col h-screen bg-dark-bg overflow-hidden">
    <!-- 统计卡片 -->
    <div class="flex-shrink-0 p-4 border-b border-dark-border">
      <div class="grid grid-cols-4 gap-4">
        <div v-for="(stat, index) in stats" :key="index" class="bg-dark-card rounded-lg shadow-sm border border-dark-border p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-dark-text-secondary">{{ stat.title }}</p>
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
        idLabel="刊登"
        typeLabel="刊登"
        quantityLabel="刊登"
        statusLabel="任务"
        newButtonText="新建刊登"
        :showType="true"
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
              <!-- 左侧：操作按钮组 -->
              <div class="flex space-x-3">
                <button 
                  @click="showCreateModal = true"
                  class="flex items-center space-x-2 px-4 py-2 bg-cyan-400 text-white rounded-lg hover:bg-cyan-500 text-sm"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  <span>新建刊登</span>
                </button>
                
                <button 
                  class="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 text-sm"
                  @click="handleBatchExport"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>批量导出</span>
                </button>

                <button 
                  class="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                  <span>模板管理</span>
                </button>
            </div>

              <!-- 右侧：搜索过滤区域 -->
            <div class="flex items-center space-x-4">
              <!-- 任务ID搜索 -->
              <div class="relative">
                <input 
                  type="text" 
                  v-model="filters.taskId" 
                  @input="handleFilterChange"
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

              <!-- 目标平台筛选 -->
              <div class="relative">
                <select 
                  v-model="filters.platform" 
                  @change="handleFilterChange"
                  class="appearance-none px-4 py-2 pr-8 rounded-lg border text-sm min-w-32"
                  :style="{
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    borderColor: 'var(--border-color)'
                  }"
                >
                  <option value="">全部平台</option>
                  <option value="淘宝">淘宝</option>
                  <option value="天猫">天猫</option>
                  <option value="京东">京东</option>
                  <option value="拼多多">拼多多</option>
                  <option value="抖音">抖音</option>
                </select>
                <svg class="absolute right-2 top-3 w-4 h-4 pointer-events-none" :style="{ color: 'var(--text-secondary)' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>

              <!-- 任务状态筛选 -->
              <div class="relative">
                <select 
                  v-model="filters.status" 
                  @change="handleFilterChange"
                  class="appearance-none px-4 py-2 pr-8 rounded-lg border text-sm min-w-32"
                  :style="{
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    borderColor: 'var(--border-color)'
                  }"
                >
                  <option value="">全部状态</option>
                  <option value="waiting">等待中</option>
                  <option value="processing">刊登中</option>
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
                  @change="handleFilterChange"
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
                  @change="handleFilterChange"
                  placeholder="结束日期"
                  class="px-4 py-2 rounded-lg border text-sm min-w-40"
                  :style="{
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    borderColor: 'var(--border-color)'
                  }"
                >
      </div>

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

  <!-- 新建刊登任务弹窗 -->
  <BatchListingNewTaskModal 
    :isOpen="showCreateModal" 
    @close="showCreateModal = false"
    @submit="handleTaskSubmit"
  />

  <!-- 刊登任务详情弹窗 -->
  <BatchListingDetailModal
    :isOpen="showDetailModal"
    :taskData="currentTaskData"
    @close="showDetailModal = false"
    @download="handleDownloadResults"
    @page-change="handleDetailPageChange"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DataTableLayout from '~/components/DataTableLayout.vue'
import { usePageRefresh, createPageRefreshHandler } from '~/composables/usePageRefresh'

// 使用 dashboard 布局
definePageMeta({
  layout: 'dashboard'
})

useHead({
  title: '批量刊登 - CUZCUZAI',
  meta: [
    { name: 'description', content: 'CUZCUZAI 批量刊登管理页面' }
  ]
})

// 统计数据
const stats = ref([
  {
    label: '总刊登数',
    value: '3,248',
    iconPath: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    label: '成功率',
    value: '92.6%',
    iconPath: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600'
  },
  {
    label: '今日刊登',
    value: '156',
    iconPath: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600'
  },
  {
    label: '处理中',
    value: '23',
    iconPath: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600'
  }
])

// 操作按钮
const actionButtons = ref([
  {
    label: '新建刊登',
    type: 'primary',
    action: 'create-listing',
    iconPath: 'M12 6v6m0 0v6m0-6h6m-6 0H6'
  },
  {
    label: '导入商品',
    type: 'secondary',
    action: 'import-products',
    iconPath: 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10'
  },
  {
    label: '模板管理',
    type: 'secondary',
    action: 'template-management',
    iconPath: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
  },
  {
    label: '批量操作',
    type: 'success',
    action: 'batch-operation',
    iconPath: 'M4 6h16M4 10h16M4 14h16M4 18h16'
  }
])

// 表格列配置
const columns = ref([
  { key: 'checkbox', label: '', width: '50px' },
  { key: '任务ID', label: '任务ID', sortable: true, width: '120px' },
  { key: '任务名称', label: '任务名称', sortable: true, width: '150px' },
  { key: '目标平台', label: '目标平台', sortable: false, width: '180px' },
  { key: '刊登数量', label: '刊登数量', sortable: true, width: '100px' },
  { key: '成功率', label: '成功率', sortable: true, width: '120px' },
  { key: '刊登状态', label: '刊登状态', sortable: true, width: '100px' },
  { key: '操作人', label: '操作人', sortable: true, width: '120px' },
  { key: '创建时间', label: '创建时间', sortable: true, width: '150px' },
  { 
    key: 'actions', 
    label: '操作', 
    width: '120px',
    actions: [
      {
        action: 'view',
        label: '查看详情',
        type: 'primary',
        iconPath: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
      },
      {
        action: 'more',
        label: '更多',
        type: 'dropdown'
      }
    ]
  }
])

// 表格数据
const tableData = ref([
  {
    id: 'BATCH001',
    任务ID: 'BATCH001',
    任务名称: '春季新品批量上架',
    目标平台: '淘宝,天猫,京东',
    刊登数量: '120个',
    成功率: '95.8%',
    刊登状态: '已完成',
    操作人: '张经理',
    创建时间: '2024-01-15 14:30:25'
  },
  {
    id: 'BATCH002',
    任务ID: 'BATCH002',
    任务名称: '电子产品促销活动',
    目标平台: '京东,拼多多',
    刊登数量: '85个',
    成功率: '88.2%',
    刊登状态: '已完成',
    操作人: '李主管',
    创建时间: '2024-01-15 13:45:12'
  },
  {
    id: 'BATCH003',
    任务ID: 'BATCH003',
    任务名称: '服装类目批量发布',
    目标平台: '淘宝,抖音',
    刊登数量: '200个',
    成功率: '76.5%',
    刊登状态: '刊登中',
    操作人: '王小美',
    创建时间: '2024-01-15 12:20:08'
  },
  {
    id: 'BATCH004',
    任务ID: 'BATCH004',
    任务名称: '家居用品上新',
    目标平台: '天猫,京东,拼多多',
    刊登数量: '0个',
    成功率: '0%',
    刊登状态: '失败',
    操作人: '赵助理',
    创建时间: '2024-01-15 11:15:33'
  },
  {
    id: 'BATCH005',
    任务ID: 'BATCH005',
    任务名称: '美妆护肤品推广',
    目标平台: '淘宝,抖音',
    刊登数量: '150个',
    成功率: '92.0%',
    刊登状态: '已完成',
    操作人: '孙总监',
    创建时间: '2024-01-15 10:05:17'
  },
  {
    id: 'BATCH006',
    任务ID: 'BATCH006',
    任务名称: '数码配件批量刊登',
    目标平台: '京东,拼多多',
    刊登数量: '75个',
    成功率: '84.0%',
    刊登状态: '已完成',
    操作人: '周专员',
    创建时间: '2024-01-15 09:30:45'
  },
  {
    id: 'BATCH007',
    任务ID: 'BATCH007',
    任务名称: '运动户外用品发布',
    目标平台: '淘宝,天猫,京东,抖音',
    刊登数量: '45个',
    成功率: '68.9%',
    刊登状态: '等待中',
    操作人: '吴运营',
    创建时间: '2024-01-15 08:45:20'
  }
])

// 状态徽章配置
const badgeConfig = ref({
  '已完成': { class: 'bg-green-100 text-green-800', text: '已完成' },
  '刊登中': { class: 'bg-yellow-100 text-yellow-800', text: '刊登中' },
  '失败': { class: 'bg-red-100 text-red-800', text: '失败' },
  '等待中': { class: 'bg-gray-100 text-gray-800', text: '等待中' },
  '暂停': { class: 'bg-orange-100 text-orange-800', text: '暂停' }
})

// 筛选器状态
const filters = ref({
  taskId: '',
  platform: '',
  status: '',
  startDate: '',
  endDate: ''
})

// 重置筛选条件
const resetFilters = () => {
  filters.value = {
    taskId: '',
    platform: '',
    status: '',
    startDate: '',
    endDate: ''
  }
  // 这里可以触发数据重新加载
  console.log('筛选条件已重置')
}

// 事件处理函数
const handleActionClick = (action) => {
  console.log('Action clicked:', action)
  // 根据不同的action执行相应的操作
  switch (action) {
    case 'create-listing':
      // 新建刊登任务逻辑
      break
    case 'import-products':
      // 导入商品逻辑
      break
    case 'template-management':
      // 模板管理逻辑
      break
    case 'batch-operation':
      // 批量操作逻辑
      break
  }
}

const handleBatchExport = (selectedItems) => {
  console.log('Batch export:', selectedItems)
  // 批量导出选中的刊登任务
}

const handleRowAction = (action, item) => {
  console.log('Row action:', action, item)
  // 处理行操作，如查看详情、编辑、删除、重新刊登等
}

const handlePageChange = (page) => {
  console.log('Page changed:', page)
  // 处理分页变化
}

// 创建强制刷新处理器
const forceRefreshData = createPageRefreshHandler([
  // 这里可以添加数据获取函数
  () => {
    console.log('刷新批量刊登数据')
    // 重新获取数据
  }
])

// 使用页面刷新组合式函数
usePageRefresh(forceRefreshData, '/dashboard/apps/batch-listing')

// 页面初始化
onMounted(() => {
  console.log('批量刊登页面已加载')
})
</script>