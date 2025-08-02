<template>
  <div>
    <!-- 工具栏 -->
    <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
      <!-- 左侧按钮 -->
      <div class="flex items-center space-x-2">
        <button 
          @click="$emit('newTask')"
          class="flex items-center space-x-1 px-4 py-2 rounded-md text-sm"
          :style="{
            backgroundColor: 'var(--bg-tertiary)',
            color: 'var(--text-primary)'
          }"
        >
          <span class="text-xl">+</span>
          <span>新建采集</span>
        </button>
      </div>

      <!-- 右侧筛选和搜索 -->
      <div class="flex flex-wrap items-center gap-2">
        <div class="relative">
          <input 
            type="text" 
            placeholder="高级搜索" 
            class="px-4 py-2 rounded-md text-sm w-36 focus:outline-none"
            :style="{
              backgroundColor: 'var(--bg-tertiary)',
              color: 'var(--text-primary)',
              borderColor: 'var(--border-color)'
            }"
          />
        </div>

        <div 
          class="relative inline-block"
          :style="{
            backgroundColor: 'var(--bg-tertiary)',
            color: 'var(--text-primary)',
            borderRadius: '0.375rem'
          }"
        >
          <select 
            class="block appearance-none px-4 py-2 pr-8 rounded-md text-sm focus:outline-none"
            :style="{
              backgroundColor: 'transparent',
              color: 'inherit'
            }"
          >
            <option>采集状态</option>
            <option>进行中</option>
            <option>已完成</option>
            <option>失败</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
            <svg class="w-4 h-4" :style="{ color: 'var(--text-secondary)' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>

        <div class="flex items-center">
          <button 
            class="px-4 py-2 rounded-md text-sm flex items-center space-x-1"
            :style="{
              backgroundColor: 'var(--bg-tertiary)',
              color: 'var(--text-primary)'
            }"
          >
            <span>开始日期</span>
            <svg class="w-4 h-4" :style="{ color: 'var(--text-secondary)' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          <span class="mx-2" :style="{ color: 'var(--text-secondary)' }">~</span>
          <button 
            class="px-4 py-2 rounded-md text-sm flex items-center space-x-1"
            :style="{
              backgroundColor: 'var(--bg-tertiary)',
              color: 'var(--text-primary)'
            }"
          >
            <span>结束日期</span>
            <svg class="w-4 h-4" :style="{ color: 'var(--text-secondary)' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
        </div>

        <div class="relative">
          <input 
            v-model="filters.search"
            type="text" 
            placeholder="采集ID" 
            class="px-4 py-2 rounded-md text-sm w-36 focus:outline-none"
            :style="{
              backgroundColor: 'var(--bg-tertiary)',
              color: 'var(--text-primary)',
              borderColor: 'var(--border-color)'
            }"
          />
        </div>

        <button 
          @click="applyFilters"
          class="px-4 py-2 rounded-md text-sm"
          :style="{
            backgroundColor: 'var(--accent-color)',
            color: 'white'
          }"
        >
          <span>查询</span>
        </button>

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
      </div>
    </div>

    <!-- 数据表格 -->
    <div class="overflow-hidden rounded-lg border" :style="{ borderColor: 'var(--border-color)' }">
      <table class="min-w-full divide-y" :style="{ borderColor: 'var(--border-color)' }">
        <thead :style="{ backgroundColor: 'var(--bg-tertiary)' }">
          <tr>
            <th class="px-6 py-3 text-left" :style="{ color: 'var(--text-secondary)' }">
              <input type="checkbox" class="rounded border-gray-300" v-model="selectAll" @change="toggleSelectAll">
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" :style="{ color: 'var(--text-secondary)' }">采集ID</th>
            <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" :style="{ color: 'var(--text-secondary)' }">采集类型</th>
            <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" :style="{ color: 'var(--text-secondary)' }">采集数量</th>
            <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" :style="{ color: 'var(--text-secondary)' }">采集状态</th>
            <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" :style="{ color: 'var(--text-secondary)' }">创建人</th>
            <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" :style="{ color: 'var(--text-secondary)' }">创建时间</th>
            <th class="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider" :style="{ color: 'var(--text-secondary)' }">操作</th>
          </tr>
        </thead>
        <tbody class="divide-y" :style="{ 
          backgroundColor: 'var(--bg-secondary)',
          borderColor: 'var(--border-color)'
        }">
          <tr 
            v-for="(item, index) in paginatedData" 
            :key="index" 
            class="hover:bg-opacity-50" 
            :style="{ backgroundColor: 'var(--bg-secondary)' }"
          >
            <td class="px-6 py-4">
              <input type="checkbox" class="rounded border-gray-300" v-model="selectedItems" :value="item.id">
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm" :style="{ color: 'var(--text-primary)' }">
              {{ item.id }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <span class="text-sm" :style="{ color: 'var(--text-primary)' }">{{ getTypeText(item.type) }}</span>
                <span 
                  v-if="item.platform" 
                  class="ml-2 px-2 py-1 text-xs rounded"
                  :style="{ 
                    backgroundColor: getPlatformBgColor(item.platform),
                    color: 'white'
                  }"
                >
                  {{ item.platform }}
                </span>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div>
                <div class="flex items-center justify-between mb-1">
                  <span class="text-xs" :style="{ color: 'var(--text-secondary)' }">目标：{{ item.targetCount || 100 }}</span>
                  <span class="text-xs" :style="{ color: getProgressColor(item.status) }">{{ getSuccessCount(item) }}</span>
                </div>
                <div class="w-full h-1 rounded-full" :style="{ backgroundColor: 'var(--bg-tertiary)' }">
                  <div class="h-1 rounded-full" :style="{
                    width: getProgressPercentage(item) + '%',
                    backgroundColor: getProgressColor(item.status)
                  }"></div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <span class="px-3 py-1 rounded-md text-xs"
                  :style="{
                    backgroundColor: getStatusBgColor(item.status),
                    color: 'white'
                  }"
                >
                  {{ getStatusText(item.status) }}
                </span>
                <span v-if="item.status === 'failed'" class="ml-2 text-xs underline cursor-pointer" :style="{ color: 'var(--text-secondary)' }">查看</span>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm" :style="{ color: 'var(--text-primary)' }">
              {{ item.creator || 'admin' }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm" :style="{ color: 'var(--text-primary)' }">
              {{ item.createdAt }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-center">
              <button 
                @click.stop="viewTaskDetail(item)"
                class="px-3 py-1 text-sm cursor-pointer" 
                :style="{ color: 'var(--accent-color)' }"
              >
                查看详情
              </button>
              <div class="relative inline-block text-left ml-2">
                <button 
                  @click.stop="showMoreOptions(item)"
                  class="inline-flex items-center text-sm rounded-md relative cursor-pointer"
                  :style="{ color: 'var(--text-secondary)' }"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
                
                <!-- 下拉菜单 -->
                <div 
                  v-if="showMoreMenu === item.id"
                  @click.stop
                  class="absolute right-0 mt-1 w-48 rounded-md shadow-lg z-50"
                  :style="{ 
                    backgroundColor: 'var(--bg-primary)',
                    borderColor: 'var(--border-color)',
                    border: '1px solid'
                  }"
                >
                  <div class="py-1">
                    <button
                      v-if="props.currentApp !== 'cropping'"
                      @click="quickAction('cropping', item)"
                      class="flex items-center px-4 py-2 text-sm w-full text-left hover:bg-dark-hover transition-colors cursor-pointer"
                      :style="{ color: 'var(--text-primary)' }"
                    >
                      <svg class="w-4 h-4 mr-3 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      智能裁图
                    </button>
                    <button
                      v-if="props.currentApp !== 'cutout'"
                      @click="quickAction('cutout', item)"
                      class="flex items-center px-4 py-2 text-sm w-full text-left hover:bg-dark-hover transition-colors cursor-pointer"
                      :style="{ color: 'var(--text-primary)' }"
                    >
                      <svg class="w-4 h-4 mr-3 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      一键抠图
                    </button>
                    <button
                      v-if="props.currentApp !== 'text-to-image'"
                      @click="quickAction('text-to-image', item)"
                      class="flex items-center px-4 py-2 text-sm w-full text-left hover:bg-dark-hover transition-colors cursor-pointer"
                      :style="{ color: 'var(--text-primary)' }"
                    >
                      <svg class="w-4 h-4 mr-3 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      文生图
                    </button>
                    <button
                      v-if="props.currentApp !== 'transform'"
                      @click="quickAction('transform', item)"
                      class="flex items-center px-4 py-2 text-sm w-full text-left hover:bg-dark-hover transition-colors cursor-pointer"
                      :style="{ color: 'var(--text-primary)' }"
                    >
                      <svg class="w-4 h-4 mr-3 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      超级裂变
                    </button>
                    <button
                      v-if="props.currentApp !== 'detection'"
                      @click="quickAction('detection', item)"
                      class="flex items-center px-4 py-2 text-sm w-full text-left hover:bg-dark-hover transition-colors cursor-pointer"
                      :style="{ color: 'var(--text-primary)' }"
                    >
                      <svg class="w-4 h-4 mr-3 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      侵权检测
                    </button>
                    <button
                      v-if="props.currentApp !== 'pod-synthesis'"
                      @click="quickAction('pod-synthesis', item)"
                      class="flex items-center px-4 py-2 text-sm w-full text-left hover:bg-dark-hover transition-colors cursor-pointer"
                      :style="{ color: 'var(--text-primary)' }"
                    >
                      <svg class="w-4 h-4 mr-3 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                      </svg>
                      POD合成
                    </button>
                    <button
                      v-if="props.currentApp !== 'title-generation'"
                      @click="quickAction('title-generation', item)"
                      class="flex items-center px-4 py-2 text-sm w-full text-left hover:bg-dark-hover transition-colors cursor-pointer"
                      :style="{ color: 'var(--text-primary)' }"
                    >
                      <svg class="w-4 h-4 mr-3 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5M18 7l-6 6-1-1" />
                      </svg>
                      标题生成
                    </button>
                    <hr class="my-1" :style="{ borderColor: 'var(--border-color)' }">
                    <button
                      @click="quickAction('delete', item)"
                      class="flex items-center px-4 py-2 text-sm w-full text-left hover:bg-red-500/10 transition-colors text-red-400 cursor-pointer"
                    >
                      <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1v3M4 7h16" />
                      </svg>
                      删除
                    </button>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          
          <!-- 无数据展示 -->
          <tr v-if="filteredData.length === 0">
            <td :colspan="8" class="py-8 text-center text-sm" :style="{ color: 'var(--text-secondary)' }">
              暂无数据
            </td>
          </tr>
        </tbody>
      </table>
      
      <!-- 分页 -->
      <div class="px-6 py-4 flex items-center justify-between" :style="{ 
        borderTop: '1px solid',
        borderColor: 'var(--border-color)',
        backgroundColor: 'var(--bg-secondary)'
      }">
        <div class="text-sm" :style="{ color: 'var(--text-secondary)' }">
          共 {{ totalItems }} 条记录
        </div>
        <div class="flex items-center">
          <span class="text-sm mr-2" :style="{ color: 'var(--text-secondary)' }">{{ pagination.pageSize }}/页</span>
          
          <button 
            @click="goToPage(pagination.currentPage - 1)"
            class="p-1 rounded border"
            :style="{ 
              borderColor: 'var(--border-color)',
              color: 'var(--text-secondary)',
              opacity: pagination.currentPage === 1 ? 0.5 : 1
            }"
            :disabled="pagination.currentPage === 1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div 
            v-for="page in visiblePages" 
            :key="page"
            @click="goToPage(page)"
            class="px-3 py-1 rounded cursor-pointer mx-0.5"
            :style="{ 
              backgroundColor: pagination.currentPage === page ? 'var(--accent-color)' : 'transparent',
              color: pagination.currentPage === page ? 'white' : 'var(--text-secondary)',
              borderColor: pagination.currentPage !== page ? 'var(--border-color)' : 'transparent',
              borderWidth: pagination.currentPage !== page ? '1px' : '0'
            }"
          >
            {{ page }}
          </div>

          <button 
            @click="goToPage(pagination.currentPage + 1)"
            class="p-1 rounded border"
            :style="{ 
              borderColor: 'var(--border-color)',
              color: 'var(--text-secondary)',
              opacity: pagination.currentPage === totalPages ? 0.5 : 1
            }"
            :disabled="pagination.currentPage === totalPages"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'

// 定义props和emits
const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  currentApp: {
    type: String,
    default: 'collection' // 当前应用类型，用于隐藏对应的菜单项
  }
})

const emits = defineEmits(['view', 'delete', 'page-change', 'filter-change', 'quick-action'])

// 响应式数据
const selectAll = ref(false)
const selectedItems = ref([])
const showMoreMenu = ref(null) // 添加更多菜单控制变量

// 事件监听器
const handleClickOutside = (event) => {
  // 检查点击是否在菜单外部
  if (showMoreMenu.value && !event.target.closest('.relative.inline-block.text-left')) {
    showMoreMenu.value = null
  }
}

// 生命周期钩子
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

// 过滤器状态
const filters = ref({
  status: 'all',
  date: 'all',
  search: ''
})

// 分页状态
const pagination = ref({
  currentPage: 1,
  pageSize: 10
})

// 根据筛选条件过滤数据
const filteredData = computed(() => {
  let result = [...props.data]
  
  // 按状态筛选
  if (filters.value.status !== 'all') {
    result = result.filter(item => item.status === filters.value.status)
  }
  
  // 按ID搜索
  if (filters.value.search) {
    const searchLower = filters.value.search.toLowerCase()
    result = result.filter(item => {
      return item.id.toLowerCase().includes(searchLower)
    })
  }
  
  return result
})

// 计算分页后的数据
const paginatedData = computed(() => {
  const startIndex = (pagination.value.currentPage - 1) * pagination.value.pageSize
  const endIndex = startIndex + pagination.value.pageSize
  return filteredData.value.slice(startIndex, endIndex)
})

// 总记录数
const totalItems = computed(() => filteredData.value.length)

// 总页数
const totalPages = computed(() => {
  return Math.max(1, Math.ceil(totalItems.value / pagination.value.pageSize))
})

// 可见页码
const visiblePages = computed(() => {
  if (totalPages.value <= 1) return [1]
  return [1, 2]
})

// 类型文本
const getTypeText = (type) => {
  const typeMap = {
    '商品链接': '商品',
    '店铺链接': '店铺',
    '搜索采集': '搜索',
    '采集插件': '插件'
  }
  return typeMap[type] || type
}

// 平台背景色
const getPlatformBgColor = (platform) => {
  if (platform.includes('亚马逊')) return '#232f3e'
  if (platform === 'TEMU') return '#eb2f96'
  if (platform === 'Shein') return '#333333'
  if (platform === '本地') return '#73d13d'
  return '#333333'
}

// 获取成功数量
const getSuccessCount = (item) => {
  if (item.status === 'completed') return '100'
  if (item.status === 'failed') return '0'
  return '95'
}

// 获取进度百分比
const getProgressPercentage = (item) => {
  if (item.status === 'completed') return 100
  if (item.status === 'failed') return 0
  return 95
}

// 状态文本
const getStatusText = (status) => {
  const statusMap = {
    'processing': '进行中',
    'completed': '已完成',
    'failed': '失败'
  }
  return statusMap[status] || status
}

// 状态背景色
const getStatusBgColor = (status) => {
  const statusBgColors = {
    'processing': 'rgba(53, 122, 232, 0.9)',
    'completed': 'rgba(39, 174, 96, 0.9)',
    'failed': 'rgba(235, 87, 87, 0.9)'
  }
  return statusBgColors[status] || '#333333'
}

// 进度条颜色
const getProgressColor = (status) => {
  const colors = {
    'processing': 'rgb(53, 122, 232)',
    'completed': 'rgb(39, 174, 96)',
    'failed': 'rgb(235, 87, 87)'
  }
  return colors[status] || 'var(--accent-color)'
}

// 表格操作
const toggleSelectAll = () => {
  if (selectAll.value) {
    selectedItems.value = paginatedData.value.map(item => item.id)
  } else {
    selectedItems.value = []
  }
}

// 监听选中项变化
watch(selectedItems, (newVal) => {
  selectAll.value = newVal.length === paginatedData.value.length && paginatedData.value.length > 0
}, { deep: true })

// 页码跳转
const goToPage = (page) => {
  if (page < 1 || page > totalPages.value) return
  pagination.value.currentPage = page
  emits('page-change', pagination.value)
}

// 应用过滤器
const applyFilters = () => {
  pagination.value.currentPage = 1
  emits('filter-change', filters.value)
}

// 查看任务详情
const viewTaskDetail = (item) => {
  emits('view', item)
}

// 显示更多选项
const showMoreOptions = (item) => {
  // 切换显示状态
  if (showMoreMenu.value === item.id) {
    showMoreMenu.value = null
  } else {
    showMoreMenu.value = item.id
  }
}

// 快捷操作
const quickAction = (action, item) => {
  showMoreMenu.value = null // 关闭菜单
  
  switch (action) {
    case 'cropping':
      console.log('跳转到智能裁图，处理项目:', item)
      // 这里可以发射事件或者使用路由跳转
      emits('quick-action', { action: 'cropping', item })
      break
    case 'cutout':
      console.log('跳转到一键抠图，处理项目:', item)
      emits('quick-action', { action: 'cutout', item })
      break
    case 'transform':
      console.log('跳转到超级裂变，处理项目:', item)
      emits('quick-action', { action: 'transform', item })
      break
    case 'detection':
      console.log('跳转到侵权检测，处理项目:', item)
      emits('quick-action', { action: 'detection', item })
      break
    case 'pod-synthesis':
      console.log('跳转到POD合成，处理项目:', item)
      emits('quick-action', { action: 'pod-synthesis', item })
      break
    case 'title-generation':
      console.log('跳转到标题生成，处理项目:', item)
      emits('quick-action', { action: 'title-generation', item })
      break
    case 'delete':
      console.log('删除项目:', item)
      emits('delete', item)
      break
  }
}
</script> 