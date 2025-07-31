<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    <div class="bg-dark-card rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto text-dark-text">
      <!-- 弹窗头部 -->
      <div class="p-5 border-b border-dark-border flex justify-between items-center">
        <h3 class="font-medium text-dark-text">合成详情 <span class="text-gray-400 text-sm">任务ID：{{ taskData?.id || 'COL001' }}</span></h3>
        <button @click="close" class="text-gray-400 hover:text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <!-- 弹窗内容 -->
      <div class="p-6">
        <!-- 统计卡片 -->
        <div class="grid grid-cols-4 gap-4 mb-6">
          <div class="bg-dark-input rounded-md p-4">
            <div class="text-sm text-gray-400 mb-1">生成SPU数</div>
            <div class="font-medium">25,212</div>
          </div>
          <div class="bg-dark-input rounded-md p-4">
            <div class="text-sm text-gray-400 mb-1">生成SKU数</div>
            <div class="font-medium">156</div>
          </div>
          <div class="bg-dark-input rounded-md p-4">
            <div class="text-sm text-gray-400 mb-1">成功数</div>
            <div class="font-medium">156</div>
          </div>
          <div class="bg-dark-input rounded-md p-4">
            <div class="text-sm text-gray-400 mb-1">失败数</div>
            <div class="font-medium">156</div>
          </div>
        </div>
        
        <!-- 筛选区域 -->
        <div class="flex mb-4">
          <div class="relative">
            <button @click="showProductDropdown = !showProductDropdown" class="px-3 py-2 bg-dark-input border border-dark-border rounded-md flex items-center mr-2">
              产品选择
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div v-if="showProductDropdown" class="absolute mt-1 w-40 bg-dark-card border border-dark-border rounded-md shadow-lg z-10">
              <div class="py-1">
                <a href="#" @click.prevent="filterByProduct('全部')" class="block px-4 py-2 text-sm text-dark-text hover:bg-dark-hover">全部</a>
                <a href="#" @click.prevent="filterByProduct('纯棉圆领T恤')" class="block px-4 py-2 text-sm text-dark-text hover:bg-dark-hover">纯棉圆领T恤</a>
                <a href="#" @click.prevent="filterByProduct('陶瓷马克杯')" class="block px-4 py-2 text-sm text-dark-text hover:bg-dark-hover">陶瓷马克杯</a>
                <a href="#" @click.prevent="filterByProduct('帆布手提袋')" class="block px-4 py-2 text-sm text-dark-text hover:bg-dark-hover">帆布手提袋</a>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 表格 -->
        <div class="overflow-x-auto">
          <table class="min-w-full">
            <thead>
              <tr class="border-b border-dark-border">
                <th class="py-3 px-4 text-left">
                  <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" />
                </th>
                <th class="py-3 px-4 text-left">序号</th>
                <th class="py-3 px-4 text-left">产品</th>
                <th class="py-3 px-4 text-left">图案</th>
                <th class="py-3 px-4 text-left">结果</th>
                <th class="py-3 px-4 text-left">SKU</th>
                <th class="py-3 px-4 text-left">生成时间</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in synthesisItems" :key="index" class="border-b border-dark-border">
                <td class="py-3 px-4">
                  <input type="checkbox" v-model="item.selected" />
                </td>
                <td class="py-3 px-4">{{ index + 1 }}</td>
                <td class="py-3 px-4">
                  <div class="w-16 h-16 bg-dark-hover rounded-md overflow-hidden">
                    <img :src="item.productImage" alt="产品图片" class="w-full h-full object-cover" />
                  </div>
                </td>
                <td class="py-3 px-4">
                  <div class="w-16 h-16 bg-dark-hover rounded-md overflow-hidden">
                    <img :src="item.patternImage" alt="图案图片" class="w-full h-full object-cover" />
                  </div>
                </td>
                <td class="py-3 px-4">
                  <div class="w-16 h-16 bg-dark-hover rounded-md overflow-hidden">
                    <img v-if="item.resultImage" :src="item.resultImage" alt="结果图片" class="w-full h-full object-cover" />
                    <div v-else class="w-full h-full bg-dark-hover flex items-center justify-center">
                      <span class="text-xs text-gray-500">无图片</span>
                    </div>
                  </div>
                </td>
                <td class="py-3 px-4">
                  <span class="text-blue-400">{{ item.sku }}</span>
                </td>
                <td class="py-3 px-4">{{ item.createdTime }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- 分页 -->
        <div class="flex items-center justify-between mt-6">
          <div class="text-sm text-gray-400">
            共 {{ totalItems }} 条记录
          </div>
          <div class="flex items-center space-x-2">
            <button class="w-8 h-8 flex items-center justify-center rounded-md border border-dark-border">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            </button>
            <button class="w-8 h-8 flex items-center justify-center rounded-md border border-dark-border">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button class="w-8 h-8 flex items-center justify-center rounded-md border border-dark-border bg-green-600 text-white">2</button>
            <button class="w-8 h-8 flex items-center justify-center rounded-md border border-dark-border">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button class="w-8 h-8 flex items-center justify-center rounded-md border border-dark-border">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </button>
            <div class="flex items-center space-x-1 ml-2">
              <span class="text-sm text-gray-400">跳转</span>
              <input type="text" class="w-12 px-2 py-1 bg-dark-input border border-dark-border rounded-md text-center text-sm" value="2">
              <span class="text-sm text-gray-400">页</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 弹窗底部 -->
      <div class="p-5 border-t border-dark-border flex justify-end space-x-3">
        <button @click="close" class="px-4 py-2 border border-dark-border rounded-md text-gray-400 hover:bg-dark-hover">关闭</button>
        <button @click="exportDetail" class="px-4 py-2 border border-dark-border rounded-md text-gray-400 hover:bg-dark-hover flex items-center">
          导出详情
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </button>
        <div class="relative">
          <button @click="showMoreActions = !showMoreActions" class="px-4 py-2 border border-dark-border rounded-md text-gray-400 hover:bg-dark-hover flex items-center">
            智能裁剪
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div v-if="showMoreActions" class="absolute right-0 bottom-full mb-2 w-40 bg-dark-card border border-dark-border rounded-md shadow-lg z-10">
            <div class="py-1">
              <a href="#" class="block px-4 py-2 text-sm text-dark-text hover:bg-dark-hover">导出为CSV</a>
              <a href="#" class="block px-4 py-2 text-sm text-dark-text hover:bg-dark-hover">导出为PDF</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, defineProps, defineEmits, watch } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  taskData: {
    type: Object,
    default: () => ({})
  }
})

const emits = defineEmits(['close', 'download'])

// 状态变量
const selectAll = ref(false)
const showProductDropdown = ref(false)
const showMoreActions = ref(false)
const selectedProduct = ref('全部')
const totalItems = ref(5)

// 合成数据
const synthesisItems = ref([
  { 
    selected: false, 
    productImage: 'https://via.placeholder.com/150/FFFFFF?text=T-shirt', 
    patternImage: 'https://via.placeholder.com/150/FF5733/FFFFFF?text=Pattern',
    resultImage: 'https://via.placeholder.com/150/000000/FFFFFF?text=Result', 
    sku: 'X0046V7ZYT',
    createdTime: '2025-07-24 01:12:39'
  },
  { 
    selected: false, 
    productImage: 'https://via.placeholder.com/150/FFFFFF?text=T-shirt', 
    patternImage: 'https://via.placeholder.com/150/33FF57/FFFFFF?text=Pattern',
    resultImage: 'https://via.placeholder.com/150/000000/FFFFFF?text=Result', 
    sku: 'X0046Y1FMR',
    createdTime: '2025-07-24 01:12:39'
  },
  { 
    selected: false, 
    productImage: 'https://via.placeholder.com/150/FFFFFF?text=T-shirt', 
    patternImage: 'https://via.placeholder.com/150/5733FF/FFFFFF?text=Pattern',
    resultImage: 'https://via.placeholder.com/150/000000/FFFFFF?text=Result', 
    sku: 'X00445P17P',
    createdTime: '2025-07-24 01:12:39'
  },
  { 
    selected: false, 
    productImage: 'https://via.placeholder.com/150/FFFFFF?text=T-shirt', 
    patternImage: 'https://via.placeholder.com/150/33B5FF/FFFFFF?text=Pattern',
    resultImage: 'https://via.placeholder.com/150/000000/FFFFFF?text=Result', 
    sku: 'X003AD7BST',
    createdTime: '2025-07-24 01:12:39'
  },
  { 
    selected: false, 
    productImage: 'https://via.placeholder.com/150/FFFFFF?text=T-shirt', 
    patternImage: 'https://via.placeholder.com/150/FF33B5/FFFFFF?text=Pattern',
    resultImage: 'https://via.placeholder.com/150/000000/FFFFFF?text=Result', 
    sku: 'X003AD8Y53',
    createdTime: '2025-07-24 01:12:39'
  }
])

// 切换全选
const toggleSelectAll = () => {
  synthesisItems.value.forEach(item => {
    item.selected = selectAll.value
  })
}

// 监听单个选择变化
watch(synthesisItems, () => {
  selectAll.value = synthesisItems.value.length > 0 && synthesisItems.value.every(item => item.selected)
}, { deep: true })

// 按产品筛选
const filterByProduct = (product) => {
  selectedProduct.value = product
  showProductDropdown.value = false
  // 这里可以添加筛选逻辑
}

// 导出详情
const exportDetail = () => {
  const selectedItems = synthesisItems.value.filter(item => item.selected)
  console.log('导出详情:', selectedItems)
  emits('download', selectedItems)
}

// 关闭弹窗
const close = () => {
  emits('close')
}
</script> 