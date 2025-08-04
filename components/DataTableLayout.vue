<template>
  <div class="p-6">
    <!-- 页面标题 -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-dark-text mb-2">{{ title }}</h1>
      <p class="text-dark-text-secondary">{{ description }}</p>
    </div>

    <!-- 统计卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div v-for="(stat, index) in stats" :key="index" class="bg-dark-card rounded-lg shadow-sm border border-dark-border p-6">
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

    <!-- 搜索过滤器区域 -->
    <div class="mb-6">
      <slot name="search-filters"></slot>
    </div>

    <!-- 操作按钮 -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex space-x-3">
        <button v-for="(button, index) in actionButtons" :key="index" 
                :class="getButtonClass(button)" 
                @click="$emit('action-click', button.action)">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="button.iconPath"/>
          </svg>
          <span>{{ button.label }}</span>
        </button>
        <!-- 批量导出按钮 -->
        <button v-if="selectedItems.length > 0" 
                :class="getButtonClass({ type: 'warning' })"
                @click="$emit('batch-export', selectedItems)">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          <span>批量导出</span>
          <span class="bg-dark-input bg-opacity-60 rounded-full px-2 py-0.5 text-xs font-medium ml-1">{{ selectedItems.length }}</span>
        </button>
      </div>
    </div>

    <!-- 数据表格 -->
    <div class="bg-dark-card rounded-lg shadow-sm border border-dark-border">
      <!-- 表格标题 -->
      <div class="px-6 py-4 border-b border-dark-border">
        <h3 class="text-lg font-medium text-dark-text">{{ tableTitle }}</h3>
        <p class="text-sm text-dark-text-secondary mt-1">{{ tableDescription }}</p>
      </div>

      <!-- 表格内容 -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-dark-border">
          <thead class="bg-dark-input">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-dark-text-secondary uppercase tracking-wider">
                <input type="checkbox" 
                       :checked="isAllSelected" 
                       @change="toggleSelectAll" 
                       class="rounded border-dark-border bg-dark-input text-dark-accent focus:ring-dark-accent">
              </th>
              <th v-for="(column, index) in columns" :key="index" 
                  class="px-6 py-3 text-left text-xs font-medium text-dark-text-secondary uppercase tracking-wider">
                {{ column.label }}
              </th>
            </tr>
          </thead>
          <tbody class="bg-dark-card divide-y divide-dark-border">
            <tr v-for="(item, index) in tableData" :key="item.id" 
                class="hover:bg-dark-input" 
                :class="{ 'bg-dark-accent bg-opacity-10': selectedItems.includes(item.id) }">
              <td class="px-6 py-4 whitespace-nowrap">
                <input type="checkbox" 
                       :checked="selectedItems.includes(item.id)" 
                       @change="toggleSelectItem(item.id)" 
                       class="rounded border-dark-border bg-dark-input text-dark-accent focus:ring-dark-accent">
              </td>
              <td v-for="(column, colIndex) in columns" :key="colIndex" 
                  class="px-6 py-4 whitespace-nowrap">
                <slot :name="`column-${column.key}`" :item="item" :value="item[column.key]">
                  <span v-if="column.type === 'text'" :class="column.class">{{ item[column.key] }}</span>
                  <span v-else-if="column.type === 'badge'" 
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" 
                        :class="getBadgeClass(item[column.key])">
                    {{ item[column.key] }}
                  </span>
                  <div v-else-if="column.type === 'user'" class="flex items-center">
                    <div class="w-6 h-6 bg-dark-accent rounded-full flex items-center justify-center mr-2">
                      <span class="text-dark-bg text-xs">{{ item[column.key].charAt(0).toUpperCase() }}</span>
                    </div>
                    <span class="text-sm text-dark-text">{{ item[column.key] }}</span>
                  </div>
                  <div v-else-if="column.key === 'actions'" class="flex space-x-2">
                    <button v-for="(action, actionIndex) in rowActions" :key="actionIndex" 
                            @click="$emit('row-action', { action: action.action, item })"
                            class="px-3 py-1 bg-dark-input border border-dark-border rounded text-xs text-dark-text hover:bg-dark-border transition-colors">
                      {{ getActionLabel(action.action) }}
                    </button>
                  </div>
                  <span v-else>{{ item[column.key] }}</span>
                </slot>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 分页 -->
      <div class="px-6 py-4 border-t border-dark-border flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <div class="text-sm text-dark-text-secondary">
            显示 {{ (currentPage - 1) * pageSize + 1 }} 至 {{ Math.min(currentPage * pageSize, totalItems) }} 条，共 {{ totalItems }} 条
          </div>
          <!-- 每页显示数量选择 -->
          <div class="flex items-center space-x-2">
            <span class="text-sm text-dark-text-secondary">每页显示</span>
            <select 
              :value="pageSize"
              @change="$emit('page-size-change', parseInt($event.target.value))"
              class="px-2 py-1 bg-dark-input border border-dark-border rounded text-sm text-dark-text focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <span class="text-sm text-dark-text-secondary">条</span>
          </div>
        </div>
        <nav class="flex items-center space-x-2">
          <button @click="$emit('page-change', currentPage - 1)"
                  :disabled="currentPage === 1"
                  class="px-3 py-1 rounded-md text-sm font-medium transition-colors"
                  :class="currentPage === 1 ? 'text-dark-text-tertiary cursor-not-allowed' : 'text-dark-text-secondary hover:text-dark-text'">
            上一页
          </button>
          
          <!-- 页码显示 -->
          <div class="flex items-center space-x-1">
            <template v-if="totalPages <= 7">
              <!-- 如果总页数小于等于7，显示所有页码 -->
              <button 
                v-for="page in totalPages" 
                :key="page"
                @click="$emit('page-change', page)"
                class="px-3 py-1 rounded-md text-sm font-medium transition-colors"
                :class="currentPage === page 
                  ? 'bg-cyan-400 text-dark-bg font-bold' 
                  : 'text-dark-text-secondary hover:text-white hover:bg-dark-input border border-dark-border'"
              >
                {{ page }}
              </button>
            </template>
            <template v-else>
              <!-- 复杂分页逻辑 -->
              <button 
                @click="$emit('page-change', 1)"
                class="px-3 py-1 rounded-md text-sm font-medium transition-colors"
                :class="currentPage === 1 
                  ? 'bg-cyan-400 text-dark-bg font-bold' 
                  : 'text-dark-text-secondary hover:text-white hover:bg-dark-input border border-dark-border'"
              >
                1
              </button>
              
              <span v-if="currentPage > 4" class="px-2 text-dark-text-tertiary">...</span>
              
              <template v-for="page in getVisiblePages" :key="page">
                <button 
                  @click="$emit('page-change', page)"
                  class="px-3 py-1 rounded-md text-sm font-medium transition-colors"
                  :class="currentPage === page 
                    ? 'bg-cyan-400 text-dark-bg font-bold' 
                    : 'text-dark-text-secondary hover:text-white hover:bg-dark-input border border-dark-border'"
                >
                  {{ page }}
                </button>
              </template>
              
              <span v-if="currentPage < totalPages - 3" class="px-2 text-dark-text-tertiary">...</span>
              
              <button 
                v-if="totalPages > 1"
                @click="$emit('page-change', totalPages)"
                class="px-3 py-1 rounded-md text-sm font-medium transition-colors"
                :class="currentPage === totalPages 
                  ? 'bg-cyan-400 text-dark-bg font-bold' 
                  : 'text-dark-text-secondary hover:text-white hover:bg-dark-input border border-dark-border'"
              >
                {{ totalPages }}
              </button>
            </template>
          </div>
          
          <button @click="$emit('page-change', currentPage + 1)"
                  :disabled="currentPage >= totalPages"
                  class="px-3 py-1 rounded-md text-sm font-medium transition-colors"
                  :class="currentPage >= totalPages ? 'text-dark-text-tertiary cursor-not-allowed' : 'text-dark-text-secondary hover:text-dark-text'">
            下一页
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: '数据管理'
  },
  description: {
    type: String,
    default: '查看和管理您的数据'
  },
  stats: {
    type: Array,
    default: () => []
  },
  actionButtons: {
    type: Array,
    default: () => []
  },
  tableTitle: {
    type: String,
    default: '数据列表'
  },
  tableDescription: {
    type: String,
    default: '所有数据记录'
  },
  columns: {
    type: Array,
    required: true
  },
  tableData: {
    type: Array,
    required: true
  },
  totalItems: {
    type: Number,
    default: 0
  },
  currentPage: {
    type: Number,
    default: 1
  },
  pageSize: {
    type: Number,
    default: 10
  },
  rowActions: {
    type: Array,
    default: () => []
  },
  badgeConfig: {
    type: Object,
    default: () => ({})
  }
})

const selectedItems = ref([])

const isAllSelected = computed(() => {
  return props.tableData.length > 0 && selectedItems.value.length === props.tableData.length
})

// 计算总页数
const totalPages = computed(() => {
  return Math.ceil(props.totalItems / props.pageSize)
})

// 计算可见的页码
const getVisiblePages = computed(() => {
  const pages = []
  const start = Math.max(2, props.currentPage - 2)
  const end = Math.min(totalPages.value - 1, props.currentPage + 2)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

const toggleSelectAll = () => {
  if (isAllSelected.value) {
    selectedItems.value = []
  } else {
    selectedItems.value = props.tableData.map(item => item.id)
  }
}

const toggleSelectItem = (id) => {
  const index = selectedItems.value.indexOf(id)
  if (index > -1) {
    selectedItems.value.splice(index, 1)
  } else {
    selectedItems.value.push(id)
  }
}

// 按钮样式
const getButtonClass = (button) => {
  const baseClass = 'flex items-center space-x-2 px-4 py-2 rounded-md transition-colors text-sm'
  
  // 新增各种按钮的黑色主题样式
  if (button.type === 'primary') {
    return `${baseClass} bg-dark-accent text-white hover:bg-dark-accent-hover`
  } else if (button.type === 'secondary') {
    return `${baseClass} bg-dark-input border border-dark-border text-dark-text hover:bg-dark-border`
  } else if (button.type === 'danger') {
    return `${baseClass} bg-dark-error bg-opacity-80 text-white hover:bg-dark-error`
  } else if (button.type === 'warning') {
    return `${baseClass} bg-dark-warning bg-opacity-80 text-dark-bg hover:bg-dark-warning`
  } else if (button.type === 'success') {
    return `${baseClass} bg-dark-success bg-opacity-80 text-white hover:bg-dark-success`
  } else {
    return `${baseClass} bg-dark-input border border-dark-border text-dark-text-secondary hover:bg-dark-border hover:text-dark-text`
  }
}

// 徽章样式
const getBadgeClass = (value) => {
  if (props.badgeConfig[value]) {
    return props.badgeConfig[value]
  }
  
  // 新增黑色主题默认徽章样式
  switch(value) {
    case '进行中':
      return 'bg-dark-success bg-opacity-20 text-dark-success'
    case '成功':
    case '已完成':
    case '已上线':
      return 'bg-dark-success bg-opacity-20 text-dark-success'
    case '失败':
    case '错误':
      return 'bg-dark-error bg-opacity-20 text-dark-error'
    case '警告':
    case '待处理':
      return 'bg-dark-warning bg-opacity-20 text-dark-warning'
    case '暂停':
    case '草稿':
      return 'bg-dark-text-tertiary bg-opacity-20 text-dark-text-secondary'
    default:
      return 'bg-dark-input text-dark-text-secondary'
  }
}

// 获取操作标签
const getActionLabel = (action) => {
  const actionMap = {
    'view': '查看详情',
    'edit': '编辑',
    'delete': '删除'
  }
  return actionMap[action] || action
}
</script>