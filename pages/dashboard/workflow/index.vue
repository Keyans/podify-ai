<template>
  <div class="flex flex-col h-screen bg-dark-bg">
    <!-- 顶部区域：统计数据、搜索筛选 -->
    <div class="border-b border-dark-border">
      <!-- 统计信息卡片 -->
      <div class="p-6 border-b border-dark-border">
        <div class="grid grid-cols-4 gap-4">
          <div class="bg-dark-input rounded-lg p-4">
        <div class="flex items-center justify-between">
          <div>
                <p class="text-sm text-dark-text-secondary">总任务数</p>
                <p class="text-2xl font-bold text-dark-text">{{ stats.totalTasks }}</p>
          </div>
              <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2V9a2 2 0 00-2-2h-2m-2 4h6m-6 4h6m-7-7V3a2 2 0 112 0v4M9 5a2 2 0 012 2v6a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h2z"/>
            </svg>
          </div>
        </div>
      </div>

          <div class="bg-dark-input rounded-lg p-4">
        <div class="flex items-center justify-between">
          <div>
                <p class="text-sm text-dark-text-secondary">处理中</p>
                <p class="text-2xl font-bold text-dark-text">{{ stats.processing }}</p>
          </div>
              <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
        </div>
      </div>

          <div class="bg-dark-input rounded-lg p-4">
        <div class="flex items-center justify-between">
          <div>
                <p class="text-sm text-dark-text-secondary">已完成</p>
                <p class="text-2xl font-bold text-dark-text">{{ stats.completed }}</p>
          </div>
              <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
        </div>
      </div>

          <div class="bg-dark-input rounded-lg p-4">
        <div class="flex items-center justify-between">
          <div>
                <p class="text-sm text-dark-text-secondary">今日任务</p>
                <p class="text-2xl font-bold text-dark-text">{{ stats.todayTasks }}</p>
          </div>
              <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
              </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 操作按钮 -->
      <div class="p-6 border-b border-dark-border">
        <div class="flex items-center space-x-3">
          <button 
            @click="showNewTaskModal = true"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
        </svg>
            新建工作流任务
      </button>
          <button 
            @click="showWorkflowManagement = true"
            class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
            工作流管理
      </button>
    </div>
      </div>

      <!-- 搜索和筛选栏 -->
      <div class="p-6">
        <div class="flex items-center justify-between">
      <div class="flex items-center space-x-4">
            <!-- 高级搜索 -->
            <button 
              @click="showAdvancedSearch = !showAdvancedSearch"
              class="px-3 py-2 bg-dark-input border border-dark-border rounded-md text-dark-text hover:bg-dark-hover flex items-center"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              高级搜索
            </button>

            <!-- 任务状态筛选 -->
            <select 
              v-model="filters.status"
              class="px-3 py-2 bg-dark-input border border-dark-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-dark-text"
            >
              <option value="">任务状态</option>
              <option value="processing">进行中</option>
              <option value="completed">已完成</option>
              <option value="failed">已失败</option>
              <option value="cancelled">已取消</option>
          </select>

            <!-- 日期筛选 -->
            <div class="flex items-center space-x-2">
              <input 
                v-model="filters.startDate"
                type="date"
                class="px-3 py-2 bg-dark-input border border-dark-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-dark-text"
                placeholder="开始日期"
              />
              <span class="text-dark-text-secondary">-</span>
              <input 
                v-model="filters.endDate"
                type="date"
                class="px-3 py-2 bg-dark-input border border-dark-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-dark-text"
                placeholder="结束日期"
              />
            </div>

            <!-- 工作流ID搜索 -->
            <div class="relative">
              <input 
                v-model="filters.workflowId"
                type="text"
                placeholder="工作流ID"
                class="w-32 px-3 py-2 bg-dark-input border border-dark-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-dark-text"
              />
            </div>

            <!-- 搜索按钮 -->
            <button 
              @click="search"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              查询
            </button>
        </div>

          <div class="text-sm text-dark-text-secondary">
            共 {{ totalWorkflows }} 条记录
        </div>
        </div>
      </div>
    </div>

    <!-- 工作流表格区域 -->
    <div class="flex-1 min-h-0 overflow-hidden p-4">
      <div class="h-full bg-dark-card rounded-lg border border-dark-border flex flex-col">
        <!-- 表格头部 -->
        <div class="flex-shrink-0">
          <table class="w-full">
            <thead class="bg-dark-border">
              <tr>
                <th class="px-4 py-3 text-left text-xs font-medium text-dark-text-secondary uppercase tracking-wider w-12">
                  <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" class="rounded border-dark-border">
                </th>
                <th class="px-4 py-3 text-left text-xs font-medium text-dark-text-secondary uppercase tracking-wider">
                  工作流ID
                </th>
                <th class="px-4 py-3 text-left text-xs font-medium text-dark-text-secondary uppercase tracking-wider">
                  工作流名称
                </th>
                <th class="px-4 py-3 text-left text-xs font-medium text-dark-text-secondary uppercase tracking-wider">
                  工作流流程
                </th>
                <th class="px-4 py-3 text-left text-xs font-medium text-dark-text-secondary uppercase tracking-wider">
                  执行状态
                </th>
                <th class="px-4 py-3 text-left text-xs font-medium text-dark-text-secondary uppercase tracking-wider">
                  创建人
                </th>
                <th class="px-4 py-3 text-left text-xs font-medium text-dark-text-secondary uppercase tracking-wider">
                  创建时间
                </th>
                <th class="px-4 py-3 text-left text-xs font-medium text-dark-text-secondary uppercase tracking-wider">
                  操作
            </th>
          </tr>
        </thead>
          </table>
              </div>
        
        <!-- 表格内容区域 - 精确自适应高度 -->
        <div class="flex-1 min-h-0 overflow-auto">
          <table class="w-full">
            <tbody class="divide-y divide-dark-border bg-dark-card">
              <tr v-for="workflow in paginatedWorkflows" :key="workflow.id" class="hover:bg-dark-hover">
                <td class="px-4 py-3">
                  <input type="checkbox" v-model="selectedItems" :value="workflow.id" class="rounded border-dark-border">
            </td>
                <td class="px-4 py-3 text-sm font-medium text-dark-text">
                  {{ workflow.id }}
            </td>
                <td class="px-4 py-3">
              <div class="flex items-center">
                    <div class="w-8 h-8 rounded-md flex items-center justify-center mr-3"
                         :class="getWorkflowTypeClass(workflow.type)">
                      <span class="text-xs font-medium">{{ getWorkflowTypeText(workflow.type) }}</span>
                </div>
                    <span class="text-sm font-medium text-dark-text">{{ workflow.name }}</span>
              </div>
            </td>
                <td class="px-4 py-3">
                <div class="flex items-center space-x-2">
                    <div v-for="(step, index) in workflow.steps" :key="index" class="flex items-center">
                      <div class="flex items-center space-x-1">
                        <div class="w-2 h-2 rounded-full" :class="getStepStatusClass(step.status)"></div>
                        <span class="text-xs text-dark-text-secondary">{{ step.name }}</span>
                </div>
                      <svg v-if="index < workflow.steps.length - 1" class="w-3 h-3 mx-2 text-dark-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                      </svg>
                </div>
              </div>
            </td>
                <td class="px-4 py-3">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                        :class="getStatusClass(workflow.status)">
                    {{ getStatusText(workflow.status) }}
                    <span v-if="workflow.status === 'processing'" class="ml-1">
                      耗时: {{ workflow.executionTime }}
                    </span>
                  </span>
            </td>
                <td class="px-4 py-3 text-sm text-dark-text">
                  {{ workflow.creator }}
            </td>
                <td class="px-4 py-3 text-sm text-dark-text-secondary">
                  {{ workflow.createdAt }}
            </td>
                <td class="px-4 py-3">
                <div class="flex items-center space-x-2">
                    <button 
                      @click="viewDetails(workflow)"
                      class="text-blue-600 hover:text-blue-700 text-sm"
                    >
                      查看详情
                    </button>
                    <button 
                      v-if="workflow.status === 'processing'"
                      @click="cancelWorkflow(workflow)"
                      class="text-red-600 hover:text-red-700 text-sm"
                    >
                      取消
                    </button>
                    <button 
                      v-else-if="workflow.status === 'failed' || workflow.status === 'cancelled'"
                      @click="retryWorkflow(workflow)"
                      class="text-blue-600 hover:text-blue-700 text-sm"
                    >
                      重新执行
                    </button>
                    <button class="text-dark-text-secondary hover:text-dark-text">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
                      </svg>
                    </button>
              </div>
            </td>
          </tr>

              <!-- 无数据时的占位内容 -->
              <tr v-if="paginatedWorkflows.length === 0">
                <td colspan="8" class="px-6 py-20">
                  <div class="flex flex-col items-center justify-center text-center text-dark-text-secondary" style="min-height: 300px;">
                    <svg class="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
                    </svg>
                    <p class="text-lg font-medium mb-2">暂无工作流</p>
                    <p class="text-sm opacity-75">还没有创建任何工作流任务</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
        </div>

        <!-- 分页区域 -->
        <div class="flex-shrink-0 p-4 border-t border-dark-border flex items-center justify-between">
          <div class="text-sm text-dark-text-secondary">
            显示 {{ (currentPage - 1) * pageSize + 1 }} 到 {{ Math.min(currentPage * pageSize, totalWorkflows) }} 条，共 {{ totalWorkflows }} 条
          </div>
          
        <div class="flex items-center space-x-2">
            <select 
              v-model="pageSize"
              class="px-2 py-1 bg-dark-input border border-dark-border rounded text-sm text-dark-text"
            >
              <option value="10">10/页</option>
              <option value="20">20/页</option>
              <option value="50">50/页</option>
            </select>
            
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
            
            <div class="flex items-center space-x-2 ml-4">
              <span class="text-sm text-dark-text-secondary">跳转</span>
              <input 
                type="number" 
                v-model="jumpPage"
                @keyup.enter="jumpToPage"
                class="w-16 px-2 py-1 text-sm rounded border border-dark-border bg-dark-input text-dark-text text-center"
                min="1"
                :max="totalPages"
              >
              <span class="text-sm text-dark-text-secondary">页</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// 使用 dashboard 布局
definePageMeta({
  layout: 'dashboard'
})

// 统计数据
const stats = ref({
  totalTasks: '8,156',
  processing: '1,234',
  completed: '45,678',
  todayTasks: '323'
})

// 筛选条件
const filters = ref({
  status: '',
  startDate: '',
  endDate: '',
  workflowId: ''
})

// 弹窗状态
const showNewTaskModal = ref(false)
const showWorkflowManagement = ref(false)
const showAdvancedSearch = ref(false)

// 选择状态
const selectedItems = ref([])
const selectAll = ref(false)

// 分页
const currentPage = ref(1)
const pageSize = ref(10)
const jumpPage = ref('')

// 工作流数据
const workflows = ref([
  {
    id: 'CD006',
    name: '商品采集+智能裁图',
    type: 'product',
    steps: [
      { name: '开始', status: 'completed' },
      { name: '智能裁图', status: 'completed' },
      { name: '结束', status: 'pending' }
    ],
    status: 'processing',
    executionTime: '45分钟',
    creator: 'admin',
    createdAt: '2025-07-23 11:45:06'
  },
  {
    id: 'CD007',
    name: '完整电商流程',
    type: 'ecommerce',
    steps: [
      { name: '开始', status: 'completed' },
      { name: '商品采集', status: 'completed' },
      { name: '智能裁图', status: 'completed' },
      { name: '结束', status: 'completed' }
    ],
    status: 'completed',
    executionTime: '45分钟',
    creator: 'admin',
    createdAt: '2025-07-23 11:45:06'
  },
  {
    id: 'CD010',
    name: '完整电商流程',
    type: 'ecommerce',
    steps: [
      { name: '开始', status: 'completed' },
      { name: '商品采集', status: 'completed' },
      { name: '智能裁图', status: 'failed' },
      { name: '结束', status: 'pending' }
    ],
    status: 'completed',
    executionTime: '45分钟',
    creator: 'admin',
    createdAt: '2025-07-23 11:45:06'
  },
  {
    id: 'CD008',
    name: '一键抠图+超级裂变',
    type: 'cutout',
    steps: [
      { name: '开始', status: 'completed' },
      { name: '一键抠图', status: 'completed' },
      { name: '超级裂变', status: 'processing' },
      { name: '结束', status: 'pending' }
    ],
    status: 'processing',
    executionTime: '45分钟',
    creator: 'admin',
    createdAt: '2025-07-23 11:45:06'
  },
  {
    id: 'CD005',
    name: '商品采集+智能裁图',
    type: 'product',
    steps: [
      { name: '开始', status: 'completed' },
      { name: '商品采集', status: 'completed' },
      { name: '智能裁图', status: 'completed' },
      { name: '一键抠图', status: 'processing' },
      { name: '结束', status: 'pending' }
    ],
    status: 'processing',
    executionTime: '45分钟',
    creator: 'admin',
    createdAt: '2025-07-23 11:45:06'
  },
  {
    id: 'CD009',
    name: '商品采集+智能裁图',
    type: 'product',
    steps: [
      { name: '开始', status: 'completed' },
      { name: '商品采集', status: 'completed' },
      { name: '智能裁图', status: 'failed' },
      { name: '保存结果', status: 'pending' },
      { name: '结束', status: 'pending' }
    ],
    status: 'failed',
    executionTime: '45分钟',
    creator: 'admin',
    createdAt: '2025-07-23 11:45:06'
  },
  {
    id: 'CD003',
    name: '商品采集+智能裁图',
    type: 'product',
    steps: [
      { name: '开始', status: 'completed' },
      { name: '商品采集', status: 'completed' },
      { name: '智能裁图', status: 'completed' },
      { name: '结束', status: 'completed' }
    ],
    status: 'processing',
    executionTime: '45分钟',
    creator: 'admin',
    createdAt: '2025-07-23 11:45:06'
  },
  {
    id: 'CD002',
    name: '完整电商流程',
    type: 'ecommerce',
    steps: [
      { name: '开始', status: 'completed' },
      { name: '商品采集', status: 'completed' },
      { name: '智能裁图', status: 'completed' },
      { name: '结束', status: 'completed' }
    ],
    status: 'processing',
    executionTime: '45分钟',
    creator: 'admin',
    createdAt: '2025-07-23 11:45:06'
  },
  {
    id: 'CD004',
    name: '一键抠图+超级裂变',
    type: 'cutout',
    steps: [
      { name: '开始', status: 'completed' },
      { name: '一键抠图', status: 'completed' },
      { name: '超级裂变', status: 'completed' },
      { name: '结束', status: 'completed' }
    ],
    status: 'processing',
    executionTime: '45分钟',
    creator: 'admin',
    createdAt: '2025-07-23 11:45:06'
  },
  {
    id: 'CD001',
    name: '商品采集+智能裁图',
    type: 'product',
    steps: [
      { name: '开始', status: 'completed' },
      { name: '商品采集', status: 'completed' },
      { name: '智能裁图', status: 'completed' },
      { name: '结束', status: 'completed' }
    ],
    status: 'processing',
    executionTime: '45分钟',
    creator: 'admin',
    createdAt: '2025-07-23 11:45:06'
  }
])

// 计算属性
const totalWorkflows = computed(() => workflows.value.length)
const totalPages = computed(() => Math.ceil(totalWorkflows.value / pageSize.value))

const paginatedWorkflows = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return workflows.value.slice(start, end)
})

// 工作流类型相关方法
const getWorkflowTypeClass = (type) => {
  const classes = {
    product: 'bg-green-100 text-green-600',
    ecommerce: 'bg-blue-100 text-blue-600', 
    cutout: 'bg-purple-100 text-purple-600'
  }
  return classes[type] || 'bg-gray-100 text-gray-600'
}

const getWorkflowTypeText = (type) => {
  const texts = {
    product: '商品',
    ecommerce: '电商',
    cutout: '抠图'
  }
  return texts[type] || '其他'
}

// 步骤状态相关方法
const getStepStatusClass = (status) => {
  const classes = {
    completed: 'bg-green-500',
    processing: 'bg-blue-500',
    failed: 'bg-red-500',
    pending: 'bg-gray-300'
  }
  return classes[status] || 'bg-gray-300'
}

// 执行状态相关方法
const getStatusClass = (status) => {
  const classes = {
    processing: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800',
    cancelled: 'bg-gray-100 text-gray-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const getStatusText = (status) => {
  const texts = {
    processing: '进行中',
    completed: '已完成',
    failed: '失败',
    cancelled: '已取消'
  }
  return texts[status] || '未知'
}

// 操作方法
const search = () => {
  console.log('搜索工作流:', filters.value)
  // 实际应用中调用API进行搜索
}

const toggleSelectAll = () => {
  if (selectAll.value) {
    selectedItems.value = paginatedWorkflows.value.map(w => w.id)
  } else {
    selectedItems.value = []
  }
}

const viewDetails = (workflow) => {
  console.log('查看工作流详情:', workflow)
  // 实际应用中打开详情弹窗或跳转到详情页面
}

const cancelWorkflow = (workflow) => {
  console.log('取消工作流:', workflow.id)
  // 实际应用中调用API取消工作流
}

const retryWorkflow = (workflow) => {
  console.log('重新执行工作流:', workflow.id)
  // 实际应用中调用API重新执行工作流
}

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const jumpToPage = () => {
  const page = parseInt(jumpPage.value)
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    jumpPage.value = ''
  }
}

// 页面初始化
onMounted(() => {
  console.log('工作流页面初始化')
})
</script> 