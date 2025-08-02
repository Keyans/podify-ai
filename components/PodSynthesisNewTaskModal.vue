<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    <div class="bg-dark-card rounded-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto text-dark-text">
      <!-- Header -->
      <div class="p-5 border-b border-dark-border flex justify-between items-center">
        <h3 class="font-medium text-dark-text">新建合成任务</h3>
        <button @click="close" class="text-gray-400 hover:text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Steps -->
      <div class="flex justify-center border-b border-dark-border">
        <div class="flex">
          <div @click="currentStep = 1" :class="[
            'px-6 py-3 cursor-pointer flex items-center space-x-2',
            currentStep === 1 ? 'border-b-2 border-blue-500' : ''
          ]">
            <div class="w-6 h-6 rounded-full flex items-center justify-center"
              :class="currentStep === 1 ? 'bg-blue-500 text-white' : 'bg-gray-600 text-white'">1</div>
            <span :class="currentStep === 1 ? 'text-blue-500' : 'text-gray-400'">选择白品</span>
          </div>
          <div @click="currentStep = 2" :class="[
            'px-6 py-3 cursor-pointer flex items-center space-x-2',
            currentStep === 2 ? 'border-b-2 border-blue-500' : ''
          ]">
            <div class="w-6 h-6 rounded-full flex items-center justify-center"
              :class="currentStep === 2 ? 'bg-blue-500 text-white' : 'bg-gray-600 text-white'">2</div>
            <span :class="currentStep === 2 ? 'text-blue-500' : 'text-gray-400'">选择图案</span>
          </div>
          <div @click="currentStep = 3" :class="[
            'px-6 py-3 cursor-pointer flex items-center space-x-2',
            currentStep === 3 ? 'border-b-2 border-blue-500' : ''
          ]">
            <div class="w-6 h-6 rounded-full flex items-center justify-center"
              :class="currentStep === 3 ? 'bg-blue-500 text-white' : 'bg-gray-600 text-white'">3</div>
            <span :class="currentStep === 3 ? 'text-blue-500' : 'text-gray-400'">确认合成</span>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="p-6">
        <!-- Step 1: 选择白品 -->
        <div v-if="currentStep === 1" class="space-y-6">
          <div class="flex justify-between items-center">
            <div class="flex-1 mr-4">
              <input type="text" v-model="searchWhiteProduct" placeholder="搜索商品" class="w-full px-4 py-2 bg-dark-input border border-dark-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-dark-text">
            </div>
            <div class="relative">
              <button @click="showCategoryDropdown = !showCategoryDropdown" class="px-3 py-2 bg-dark-input border border-dark-border rounded-md flex items-center whitespace-nowrap">
                选择分类
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div v-if="showCategoryDropdown" class="absolute right-0 mt-1 w-40 bg-dark-card border border-dark-border rounded-md shadow-lg z-10">
                <div class="py-1">
                  <a href="#" @click.prevent="filterCategory('全部')" class="block px-4 py-2 text-sm text-dark-text hover:bg-dark-hover">全部</a>
                  <a href="#" @click.prevent="filterCategory('服装')" class="block px-4 py-2 text-sm text-dark-text hover:bg-dark-hover">服装</a>
                  <a href="#" @click.prevent="filterCategory('家居')" class="block px-4 py-2 text-sm text-dark-text hover:bg-dark-hover">家居</a>
                  <a href="#" @click.prevent="filterCategory('配饰')" class="block px-4 py-2 text-sm text-dark-text hover:bg-dark-hover">配饰</a>
                </div>
              </div>
            </div>
          </div>

          <!-- Products Grid -->
          <div class="grid grid-cols-5 gap-4">
            <div 
              v-for="(product, index) in filteredWhiteProducts" 
              :key="index" 
              @click="toggleSelectProduct(product)"
              :class="['rounded-lg border p-2 cursor-pointer overflow-hidden', product.selected ? 'border-green-500' : 'border-dark-border']"
            >
              <div class="relative h-36 mb-2">
                <img :src="product.image" alt="产品图片" class="h-full w-full object-cover rounded-md">
                <div v-if="product.selected" class="absolute top-2 right-2 bg-cyan-400 text-white rounded-full p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <p class="text-sm font-medium">{{ product.name }}</p>
              <p class="text-xs text-gray-400">{{ product.category }}</p>
            </div>
          </div>

          <!-- Pagination -->
          <div class="flex items-center justify-center space-x-2 mt-6">
            <button class="w-8 h-8 flex items-center justify-center rounded-md border border-dark-border">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button class="w-8 h-8 flex items-center justify-center rounded-md border border-dark-border bg-blue-600 text-white">1</button>
            <button class="w-8 h-8 flex items-center justify-center rounded-md border border-dark-border">2</button>
            <button class="w-8 h-8 flex items-center justify-center rounded-md border border-dark-border">3</button>
            <span class="mx-1">...</span>
            <button class="w-8 h-8 flex items-center justify-center rounded-md border border-dark-border">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Step 2: 选择图案 -->
        <div v-if="currentStep === 2">
          <div class="flex justify-between items-center mb-6">
            <div class="flex-1 mr-4">
              <input type="text" v-model="searchPattern" placeholder="搜索图案" class="w-full px-4 py-2 bg-dark-input border border-dark-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-dark-text">
            </div>
            <div class="flex space-x-2">
              <div class="relative">
                <button @click="showFromLibrary = true" class="px-3 py-2 bg-dark-input border border-dark-border rounded-md flex items-center">
                  从图库选择
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
              <div class="relative">
                <button @click="openFileUpload" class="px-3 py-2 bg-dark-input border border-dark-border rounded-md flex items-center">
                  上传图片
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </button>
                <input ref="fileInput" type="file" multiple accept="image/*" class="hidden" @change="handleFileUpload">
              </div>
            </div>
          </div>

          <!-- Patterns Grid -->
          <div class="grid grid-cols-5 gap-4">
            <div 
              v-for="(pattern, index) in filteredPatterns" 
              :key="index" 
              @click="toggleSelectPattern(pattern)"
              :class="['rounded-lg border p-2 cursor-pointer overflow-hidden', pattern.selected ? 'border-green-500' : 'border-dark-border']"
            >
              <div class="relative h-36 mb-2">
                <img :src="pattern.image" alt="图案图片" class="h-full w-full object-cover rounded-md">
                <div v-if="pattern.selected" class="absolute top-2 right-2 bg-cyan-400 text-white rounded-full p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- Selected Count -->
          <div class="mt-4 text-sm">
            <span>已选 {{ selectedPatterns.length }} 张图片</span>
          </div>
        </div>

        <!-- Step 3: 确认合成 -->
        <div v-if="currentStep === 3">
          <div class="space-y-6">
            <!-- SKU规则设置 -->
            <div>
              <label class="block text-sm font-medium text-gray-400 mb-2">设置SKU规则</label>
              <input type="text" v-model="skuRule" placeholder="请输入SKU规则" class="w-full px-4 py-2 bg-dark-input border border-dark-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-dark-text">
            </div>

            <!-- 选择的白品列表 -->
            <div>
              <label class="block text-sm font-medium text-gray-400 mb-2">选中的白品 ({{ selectedProducts.length }})</label>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div v-for="(product, index) in selectedProducts" :key="index" class="flex items-center p-2 bg-dark-input rounded-lg">
                  <img :src="product.image" alt="白品图片" class="w-12 h-12 object-cover rounded-md mr-2">
                  <div class="flex-1 overflow-hidden">
                    <p class="text-xs font-medium truncate">{{ product.name }}</p>
                    <p class="text-xs text-gray-400">{{ product.category }}</p>
                  </div>
                  <button @click="removeProduct(product)" class="ml-1 text-gray-400 hover:text-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- 选择的图案列表 -->
            <div>
              <label class="block text-sm font-medium text-gray-400 mb-2">选中的图案 ({{ selectedPatterns.length }})</label>
              <div class="grid grid-cols-5 gap-3">
                <div v-for="(pattern, index) in selectedPatterns" :key="index" class="relative">
                  <div class="relative h-24 rounded-md overflow-hidden">
                    <img :src="pattern.image" alt="图案图片" class="h-full w-full object-cover">
                    <button @click="removePattern(pattern)" class="absolute top-1 right-1 p-1 bg-black bg-opacity-50 rounded-full text-white hover:text-red-500">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- 合成预计结果 -->
            <div class="grid grid-cols-3 gap-4 pt-4 border-t border-dark-border">
              <div class="bg-dark-input rounded-md p-4">
                <div class="text-sm text-gray-400 mb-1">生成SPU数</div>
                <div class="font-medium text-xl">{{ calculateSPUs() }}</div>
              </div>
              <div class="bg-dark-input rounded-md p-4">
                <div class="text-sm text-gray-400 mb-1">生成SKU数</div>
                <div class="font-medium text-xl">{{ calculateSKUs() }}</div>
              </div>
              <div class="bg-dark-input rounded-md p-4">
                <div class="text-sm text-gray-400 mb-1">处理图片数</div>
                <div class="font-medium text-xl">{{ calculateTotalImages() }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="p-5 border-t border-dark-border flex justify-end space-x-3">
        <button v-if="currentStep > 1" @click="currentStep--" class="px-4 py-2 border border-dark-border rounded-md text-gray-400 hover:bg-dark-hover">
          上一步
        </button>
        <button v-if="currentStep < 3" @click="nextStep" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          下一步
        </button>
        <button v-if="currentStep === 3" @click="submit" class="px-4 py-2 bg-cyan-400 text-white rounded-md hover:bg-cyan-500">
          提交任务 (5秒内)
        </button>
        <button @click="close" class="px-4 py-2 border border-dark-border rounded-md text-gray-400 hover:bg-dark-hover">
          取消
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, defineProps, defineEmits } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['close', 'submit'])

// 状态
const currentStep = ref(1)
const showCategoryDropdown = ref(false)
const showFromLibrary = ref(false)
const searchWhiteProduct = ref('')
const searchPattern = ref('')
const skuRule = ref('')
const fileInput = ref(null)

// 模拟产品数据
const whiteProducts = ref([
  { id: 1, name: '纯棉圆领T恤', category: '服装', image: 'https://via.placeholder.com/300/FFFFFF?text=T-shirt', selected: false },
  { id: 2, name: '陶瓷马克杯', category: '家居', image: 'https://via.placeholder.com/300/F5F5F5?text=Mug', selected: false },
  { id: 3, name: '帆布手提袋', category: '配饰', image: 'https://via.placeholder.com/300/EEEEEE?text=Bag', selected: false },
  { id: 4, name: '方形抱枕', category: '家居', image: 'https://via.placeholder.com/300/F0F0F0?text=Pillow', selected: false },
  { id: 5, name: '连帽卫衣', category: '服装', image: 'https://via.placeholder.com/300/F8F8F8?text=Hoodie', selected: false },
  { id: 6, name: '棒球帽', category: '配饰', image: 'https://via.placeholder.com/300/F2F2F2?text=Cap', selected: false },
  { id: 7, name: '薄款卫衣', category: '服装', image: 'https://via.placeholder.com/300/FAFAFA?text=Sweatshirt', selected: false },
  { id: 8, name: '睡衣套装', category: '服装', image: 'https://via.placeholder.com/300/F7F7F7?text=Pajamas', selected: false }
])

// 模拟图案数据
const patterns = ref([
  { id: 1, image: 'https://via.placeholder.com/300/FF5733/FFFFFF?text=Pattern+1', selected: false },
  { id: 2, image: 'https://via.placeholder.com/300/33FF57/FFFFFF?text=Pattern+2', selected: false },
  { id: 3, image: 'https://via.placeholder.com/300/5733FF/FFFFFF?text=Pattern+3', selected: false },
  { id: 4, image: 'https://via.placeholder.com/300/33B5FF/FFFFFF?text=Pattern+4', selected: false },
  { id: 5, image: 'https://via.placeholder.com/300/FF33B5/FFFFFF?text=Pattern+5', selected: false },
  { id: 6, image: 'https://via.placeholder.com/300/B5FF33/FFFFFF?text=Pattern+6', selected: false },
  { id: 7, image: 'https://via.placeholder.com/300/33FFB5/FFFFFF?text=Pattern+7', selected: false },
  { id: 8, image: 'https://via.placeholder.com/300/B533FF/FFFFFF?text=Pattern+8', selected: false },
  { id: 9, image: 'https://via.placeholder.com/300/FFB533/FFFFFF?text=Pattern+9', selected: false },
  { id: 10, image: 'https://via.placeholder.com/300/3357FF/FFFFFF?text=Pattern+10', selected: false }
])

// 过滤后的白品列表
const filteredWhiteProducts = computed(() => {
  if (!searchWhiteProduct.value) return whiteProducts.value
  return whiteProducts.value.filter(product => 
    product.name.toLowerCase().includes(searchWhiteProduct.value.toLowerCase()) || 
    product.category.toLowerCase().includes(searchWhiteProduct.value.toLowerCase())
  )
})

// 过滤后的图案列表
const filteredPatterns = computed(() => {
  if (!searchPattern.value) return patterns.value
  // 这里只是一个简单的模拟实现，实际上可能需要更复杂的搜索逻辑
  return patterns.value
})

// 已选择的产品列表
const selectedProducts = computed(() => {
  return whiteProducts.value.filter(product => product.selected)
})

// 已选择的图案列表
const selectedPatterns = computed(() => {
  return patterns.value.filter(pattern => pattern.selected)
})

// 方法
const filterCategory = (category) => {
  // 这里可以添加按分类筛选的逻辑
  showCategoryDropdown.value = false
}

const toggleSelectProduct = (product) => {
  product.selected = !product.selected
}

const toggleSelectPattern = (pattern) => {
  pattern.selected = !pattern.selected
}

const removeProduct = (product) => {
  product.selected = false
}

const removePattern = (pattern) => {
  pattern.selected = false
}

const openFileUpload = () => {
  fileInput.value.click()
}

const handleFileUpload = (event) => {
  const files = event.target.files
  if (!files || files.length === 0) return

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        patterns.value.push({
          id: patterns.value.length + 1,
          image: e.target.result,
          selected: true
        })
      }
      reader.readAsDataURL(file)
    }
  }
  // 重置文件输入，允许重新选择相同的文件
  event.target.value = null
}

const nextStep = () => {
  if (currentStep.value === 1 && selectedProducts.value.length === 0) {
    alert('请至少选择一个白品')
    return
  }
  if (currentStep.value === 2 && selectedPatterns.value.length === 0) {
    alert('请至少选择一张图案')
    return
  }
  currentStep.value += 1
}

// 计算函数
const calculateSPUs = () => {
  return selectedProducts.value.length
}

const calculateSKUs = () => {
  // 这里是简化的计算，实际可能更复杂
  return selectedProducts.value.length * selectedPatterns.value.length
}

const calculateTotalImages = () => {
  // 这里是简化的计算，实际可能更复杂
  return selectedProducts.value.length * selectedPatterns.value.length * 5
}

const submit = () => {
  if (selectedProducts.value.length === 0 || selectedPatterns.value.length === 0) {
    alert('请至少选择一个白品和一个图案')
    return
  }

  const formData = {
    products: selectedProducts.value,
    patterns: selectedPatterns.value,
    skuRule: skuRule.value
  }

  emits('submit', formData)
}

const close = () => {
  // 重置所有状态
  currentStep.value = 1
  searchWhiteProduct.value = ''
  searchPattern.value = ''
  skuRule.value = ''
  whiteProducts.value.forEach(product => product.selected = false)
  patterns.value.forEach(pattern => pattern.selected = false)
  
  emits('close')
}
</script> 