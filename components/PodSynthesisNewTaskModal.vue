<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    <div class="bg-dark-card rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto text-dark-text">
      <!-- Header -->
      <div class="p-5 border-b border-dark-border flex justify-between items-center">
        <h3 class="font-medium text-dark-text text-lg">新建合成任务</h3>
        <button @click="close" class="text-gray-400 hover:text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Steps -->
      <div class="flex justify-center border-b border-dark-border bg-dark-bg">
        <div class="flex">
          <div @click="currentStep = 1" :class="[
            'px-6 py-3 cursor-pointer flex items-center space-x-2',
            currentStep === 1 ? 'border-b-2' : ''
          ]" 
          :style="currentStep === 1 ? { borderColor: 'var(--accent-color)' } : {}">
            <div class="w-6 h-6 rounded flex items-center justify-center text-sm font-medium"
              :style="currentStep === 1 ? { 
                backgroundColor: 'var(--accent-color)', 
                color: 'white' 
              } : { 
                backgroundColor: '#4a5568', 
                color: 'white' 
              }">1</div>
            <span :style="currentStep === 1 ? { color: 'var(--accent-color)' } : { color: '#9ca3af' }">选择白品</span>
          </div>
          <div @click="currentStep = 2" :class="[
            'px-6 py-3 cursor-pointer flex items-center space-x-2',
            currentStep === 2 ? 'border-b-2' : ''
          ]"
          :style="currentStep === 2 ? { borderColor: 'var(--accent-color)' } : {}">
            <div class="w-6 h-6 rounded flex items-center justify-center text-sm font-medium"
              :style="currentStep === 2 ? { 
                backgroundColor: 'var(--accent-color)', 
                color: 'white' 
              } : { 
                backgroundColor: '#4a5568', 
                color: 'white' 
              }">2</div>
            <span :style="currentStep === 2 ? { color: 'var(--accent-color)' } : { color: '#9ca3af' }">选择图案</span>
          </div>
          <div @click="currentStep = 3" :class="[
            'px-6 py-3 cursor-pointer flex items-center space-x-2',
            currentStep === 3 ? 'border-b-2' : ''
          ]"
          :style="currentStep === 3 ? { borderColor: 'var(--accent-color)' } : {}">
            <div class="w-6 h-6 rounded flex items-center justify-center text-sm font-medium"
              :style="currentStep === 3 ? { 
                backgroundColor: 'var(--accent-color)', 
                color: 'white' 
              } : { 
                backgroundColor: '#4a5568', 
                color: 'white' 
              }">3</div>
            <span :style="currentStep === 3 ? { color: 'var(--accent-color)' } : { color: '#9ca3af' }">确认合成</span>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="p-6">
        <!-- Step 1: 选择白品 -->
        <div v-if="currentStep === 1" class="space-y-6">
          <!-- Search and Filter Bar -->
          <div class="flex justify-between items-center">
            <div class="flex-1 mr-4">
              <input 
                type="text" 
                v-model="searchWhiteProduct" 
                placeholder="搜索商品" 
                class="w-full px-4 py-2 border rounded-md text-sm focus:ring-2 focus:border-transparent"
                :style="{
                  backgroundColor: 'var(--bg-tertiary)',
                  color: 'var(--text-primary)',
                  borderColor: 'var(--border-color)'
                }"
              >
            </div>
            <div class="relative">
              <button 
                @click="showCategoryDropdown = !showCategoryDropdown" 
                class="px-4 py-2 border rounded-md flex items-center whitespace-nowrap text-sm"
                :style="{
                  backgroundColor: 'var(--bg-tertiary)',
                  color: 'var(--text-primary)',
                  borderColor: 'var(--border-color)'
                }"
              >
                {{ selectedCategory }}
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div v-if="showCategoryDropdown" class="absolute right-0 mt-1 w-40 bg-dark-card border border-dark-border rounded-md shadow-lg z-10">
                <div class="py-1">
                  <a href="#" @click.prevent="filterCategory('选择分类')" class="block px-4 py-2 text-sm text-dark-text hover:bg-dark-hover">全部</a>
                  <a href="#" @click.prevent="filterCategory('服装')" class="block px-4 py-2 text-sm text-dark-text hover:bg-dark-hover">服装</a>
                  <a href="#" @click.prevent="filterCategory('家居')" class="block px-4 py-2 text-sm text-dark-text hover:bg-dark-hover">家居</a>
                  <a href="#" @click.prevent="filterCategory('配饰')" class="block px-4 py-2 text-sm text-dark-text hover:bg-dark-hover">配饰</a>
                </div>
              </div>
            </div>
          </div>

          <!-- Products Grid -->
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div 
              v-for="(product, index) in filteredWhiteProducts" 
              :key="index" 
              @click="toggleSelectProduct(product)"
              class="group relative rounded-lg overflow-hidden border cursor-pointer transition-all duration-200 hover:shadow-md"
              :style="{
                borderColor: product.selected ? 'var(--accent-color)' : 'var(--border-color)',
                backgroundColor: 'var(--bg-secondary)'
              }"
            >
              <!-- Selection Checkbox - 左上角 -->
              <div class="absolute top-2 left-2 z-10">
                <input 
                  type="checkbox" 
                  :checked="product.selected"
                  @click.stop
                  @change="toggleSelectProduct(product)"
                  class="w-4 h-4 rounded"
                  :style="{
                    accentColor: 'var(--accent-color)'
                  }"
                />
              </div>

              <!-- Product Image -->
              <div class="aspect-square overflow-hidden">
                <img 
                  :src="product.image" 
                  :alt="product.name" 
                  class="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <!-- Product Info Overlay -->
              <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                <h3 class="text-white text-sm font-medium truncate">{{ product.name }}</h3>
                <div class="flex items-center justify-between mt-1">
                  <span class="text-white text-xs opacity-80">{{ product.category }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Pagination and Count -->
          <div class="border-t pt-6 mt-6" :style="{ borderColor: 'var(--border-color)' }">
            <div class="flex items-center justify-between">
              <div class="text-sm" :style="{ color: 'var(--text-secondary)' }">
                已选择 {{ selectedProducts.length }} 款产品，共 {{ filteredWhiteProducts.length }} 款
              </div>
              
              <!-- 分页控件 -->
              <div class="flex items-center space-x-2">
                <button 
                  @click="goToProductPage(productPagination.currentPage - 1)"
                  :disabled="productPagination.currentPage === 1"
                  class="px-3 py-1 text-sm rounded border disabled:opacity-50 disabled:cursor-not-allowed"
                  :style="{
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)',
                    backgroundColor: 'var(--bg-tertiary)'
                  }"
                >
                  上一页
                </button>
                
                <span 
                  class="px-3 py-1 rounded text-sm text-white"
                  :style="{ backgroundColor: 'var(--accent-color)' }"
                >
                  {{ productPagination.currentPage }}
                </span>
                
                <button 
                  @click="goToProductPage(productPagination.currentPage + 1)"
                  :disabled="productPagination.currentPage >= productTotalPages"
                  class="px-3 py-1 text-sm rounded border disabled:opacity-50 disabled:cursor-not-allowed"
                  :style="{
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)',
                    backgroundColor: 'var(--bg-tertiary)'
                  }"
                >
                  下一页
                </button>
                
                <!-- 页面大小选择 -->
                <select 
                  v-model="productPagination.pageSize" 
                  @change="handleProductPageSizeChange"
                  class="ml-4 px-2 py-1 text-sm rounded border"
                  :style="{
                    borderColor: 'var(--border-color)',
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)'
                  }"
                >
                  <option value="12">12/页</option>
                  <option value="24">24/页</option>
                  <option value="48">48/页</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 2: 选择图案 -->
        <div v-if="currentStep === 2" class="space-y-6">
          <!-- Action Buttons -->
          <div class="flex space-x-3">
            <button 
              @click="showFromLibrary = true" 
              class="px-4 py-2 border rounded-md flex items-center text-sm"
              :style="{
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--text-primary)',
                borderColor: 'var(--border-color)'
              }"
            >
              从图库选择
            </button>
            <button 
              @click="openFileUpload" 
              class="px-4 py-2 border rounded-md flex items-center text-sm"
              :style="{
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--text-primary)',
                borderColor: 'var(--border-color)'
              }"
            >
              上传图片
            </button>
            <input ref="fileInput" type="file" multiple accept="image/*" class="hidden" @change="handleFileUpload">
          </div>

          <!-- Search Bar -->
          <div class="flex justify-between items-center">
            <div class="flex-1 mr-4">
              <input 
                type="text" 
                v-model="searchPattern" 
                placeholder="搜索图案" 
                class="w-full px-4 py-2 border rounded-md text-sm focus:ring-2 focus:border-transparent"
                :style="{
                  backgroundColor: 'var(--bg-tertiary)',
                  color: 'var(--text-primary)',
                  borderColor: 'var(--border-color)'
                }"
              >
            </div>
            <div class="relative">
              <button 
                @click="showPatternCategoryDropdown = !showPatternCategoryDropdown" 
                class="px-4 py-2 border rounded-md flex items-center whitespace-nowrap text-sm"
                :style="{
                  backgroundColor: 'var(--bg-tertiary)',
                  color: 'var(--text-primary)',
                  borderColor: 'var(--border-color)'
                }"
              >
                选择分类
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div v-if="showPatternCategoryDropdown" class="absolute right-0 mt-1 w-40 bg-dark-card border border-dark-border rounded-md shadow-lg z-10">
                <div class="py-1">
                  <a href="#" @click.prevent="filterPatternCategory('全部')" class="block px-4 py-2 text-sm text-dark-text hover:bg-dark-hover">全部</a>
                  <a href="#" @click.prevent="filterPatternCategory('抽象')" class="block px-4 py-2 text-sm text-dark-text hover:bg-dark-hover">抽象</a>
                  <a href="#" @click.prevent="filterPatternCategory('几何')" class="block px-4 py-2 text-sm text-dark-text hover:bg-dark-hover">几何</a>
                  <a href="#" @click.prevent="filterPatternCategory('自然')" class="block px-4 py-2 text-sm text-dark-text hover:bg-dark-hover">自然</a>
                </div>
              </div>
            </div>
          </div>

          <!-- Patterns Grid -->
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div 
              v-for="(pattern, index) in filteredPatterns" 
              :key="index" 
              @click="toggleSelectPattern(pattern)"
              class="group relative rounded-lg overflow-hidden border cursor-pointer transition-all duration-200 hover:shadow-md"
              :style="{
                borderColor: pattern.selected ? 'var(--accent-color)' : 'var(--border-color)',
                backgroundColor: 'var(--bg-secondary)'
              }"
            >
              <!-- Selection Checkbox - 左上角 -->
              <div class="absolute top-2 left-2 z-10">
                <input 
                  type="checkbox" 
                  :checked="pattern.selected"
                  @click.stop
                  @change="toggleSelectPattern(pattern)"
                  class="w-4 h-4 rounded"
                  :style="{
                    accentColor: 'var(--accent-color)'
                  }"
                />
              </div>

              <!-- Pattern Image -->
              <div class="aspect-square overflow-hidden">
                <img 
                  :src="pattern.image" 
                  alt="图案图片" 
                  class="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>

          <!-- Pagination and Count -->
          <div class="border-t pt-6 mt-6" :style="{ borderColor: 'var(--border-color)' }">
            <div class="flex items-center justify-between">
              <div class="text-sm" :style="{ color: 'var(--text-secondary)' }">
                已选择 {{ selectedPatterns.length }} 张图片，共 {{ filteredPatterns.length }} 张
              </div>
              
              <!-- 分页控件 -->
              <div class="flex items-center space-x-2">
                <button 
                  @click="goToPatternPage(patternPagination.currentPage - 1)"
                  :disabled="patternPagination.currentPage === 1"
                  class="px-3 py-1 text-sm rounded border disabled:opacity-50 disabled:cursor-not-allowed"
                  :style="{
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)',
                    backgroundColor: 'var(--bg-tertiary)'
                  }"
                >
                  上一页
                </button>
                
                <span 
                  class="px-3 py-1 rounded text-sm text-white"
                  :style="{ backgroundColor: 'var(--accent-color)' }"
                >
                  {{ patternPagination.currentPage }}
                </span>
                
                <button 
                  @click="goToPatternPage(patternPagination.currentPage + 1)"
                  :disabled="patternPagination.currentPage >= patternTotalPages"
                  class="px-3 py-1 text-sm rounded border disabled:opacity-50 disabled:cursor-not-allowed"
                  :style="{
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)',
                    backgroundColor: 'var(--bg-tertiary)'
                  }"
                >
                  下一页
                </button>
                
                <!-- 页面大小选择 -->
                <select 
                  v-model="patternPagination.pageSize" 
                  @change="handlePatternPageSizeChange"
                  class="ml-4 px-2 py-1 text-sm rounded border"
                  :style="{
                    borderColor: 'var(--border-color)',
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)'
                  }"
                >
                  <option value="12">12/页</option>
                  <option value="24">24/页</option>
                  <option value="48">48/页</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 3: 确认合成 -->
        <div v-if="currentStep === 3" class="space-y-6">
          <!-- 确认合成信息 -->
          <div class="mb-6">
            <h4 class="text-lg font-medium mb-4" :style="{ color: 'var(--text-primary)' }">确认合成信息</h4>
            
            <!-- SKU规则设置 -->
            <div class="mb-6">
              <label class="block text-sm font-medium mb-2" :style="{ color: 'var(--text-secondary)' }">设置SKU规则</label>
              <input 
                type="text" 
                v-model="skuRule" 
                placeholder="请输入SKU规则" 
                class="w-full px-4 py-2 border rounded-md text-sm focus:ring-2 focus:border-transparent"
                :style="{
                  backgroundColor: 'var(--bg-tertiary)',
                  color: 'var(--text-primary)',
                  borderColor: 'var(--border-color)'
                }"
              >
            </div>

            <!-- 左右布局：选中项目 -->
            <div class="flex space-x-8">
              <!-- 左侧：选中的白品 -->
              <div class="flex-1">
                <div class="flex items-center justify-between mb-4">
                  <h5 class="font-medium" :style="{ color: 'var(--text-primary)' }">选中的白品 ({{ selectedProducts.length }})</h5>
                  <button 
                    class="text-sm px-2 py-1 rounded border"
                    :style="{
                      color: 'var(--text-secondary)',
                      borderColor: 'var(--border-color)'
                    }"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                </div>
                
                <div class="space-y-3 max-h-64 overflow-y-auto">
                  <div 
                    v-for="(product, index) in selectedProducts" 
                    :key="index" 
                    class="flex items-center p-3 rounded-lg border"
                    :style="{
                      backgroundColor: 'var(--bg-secondary)',
                      borderColor: 'var(--border-color)'
                    }"
                  >
                    <img :src="product.image" alt="白品图片" class="w-12 h-12 object-cover rounded-md mr-3">
                    <div class="flex-1 overflow-hidden">
                      <p class="text-sm font-medium truncate" :style="{ color: 'var(--text-primary)' }">{{ product.name }}</p>
                      <p class="text-xs mt-1" :style="{ color: 'var(--text-secondary)' }">{{ product.category }}</p>
                    </div>
                    <button @click="removeProduct(product)" class="ml-2 p-1 rounded hover:bg-red-100">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400 hover:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <!-- 右侧：选中的图案 -->
              <div class="flex-1">
                <div class="flex items-center justify-between mb-4">
                  <h5 class="font-medium" :style="{ color: 'var(--text-primary)' }">选中的图案 ({{ selectedPatterns.length }})</h5>
                  <button 
                    class="text-sm px-2 py-1 rounded border"
                    :style="{
                      color: 'var(--text-secondary)',
                      borderColor: 'var(--border-color)'
                    }"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                </div>
                
                <div class="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto">
                  <div 
                    v-for="(pattern, index) in selectedPatterns" 
                    :key="index" 
                    class="relative rounded-lg border overflow-hidden"
                    :style="{
                      backgroundColor: 'var(--bg-secondary)',
                      borderColor: 'var(--border-color)'
                    }"
                  >
                    <div class="relative h-24">
                      <img :src="pattern.image" alt="图案图片" class="h-full w-full object-cover">
                      <button 
                        @click="removePattern(pattern)" 
                        class="absolute top-1 right-1 p-1 bg-black bg-opacity-50 rounded-full text-white hover:text-red-500"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 预计合成结果 -->
          <div class="border-t pt-6" :style="{ borderColor: 'var(--border-color)' }">
            <h5 class="font-medium mb-4" :style="{ color: 'var(--text-primary)' }">预计合成结果</h5>
            <div class="grid grid-cols-3 gap-4">
              <div 
                class="rounded-lg p-4 text-center"
                :style="{ backgroundColor: 'var(--bg-secondary)' }"
              >
                <div class="text-sm mb-2" :style="{ color: 'var(--text-secondary)' }">生成SPU数</div>
                <div class="text-2xl font-bold" :style="{ color: 'var(--text-primary)' }">{{ calculateSPUs() }}</div>
              </div>
              <div 
                class="rounded-lg p-4 text-center"
                :style="{ backgroundColor: 'var(--bg-secondary)' }"
              >
                <div class="text-sm mb-2" :style="{ color: 'var(--text-secondary)' }">生成SKU数</div>
                <div class="text-2xl font-bold" :style="{ color: 'var(--text-primary)' }">{{ calculateSKUs() }}</div>
              </div>
              <div 
                class="rounded-lg p-4 text-center"
                :style="{ backgroundColor: 'var(--bg-secondary)' }"
              >
                <div class="text-sm mb-2" :style="{ color: 'var(--text-secondary)' }">处理图片数</div>
                <div class="text-2xl font-bold" :style="{ color: 'var(--text-primary)' }">{{ calculateTotalImages() }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="p-5 border-t flex justify-end space-x-3" :style="{ borderColor: 'var(--border-color)' }">
        <button 
          v-if="currentStep > 1" 
          @click="currentStep--" 
          class="px-4 py-2 border rounded-md text-sm"
          :style="{
            borderColor: 'var(--border-color)',
            color: 'var(--text-secondary)',
            backgroundColor: 'var(--bg-tertiary)'
          }"
        >
          上一步
        </button>
        <button 
          @click="close" 
          class="px-4 py-2 border rounded-md text-sm"
          :style="{
            borderColor: 'var(--border-color)',
            color: 'var(--text-secondary)',
            backgroundColor: 'var(--bg-tertiary)'
          }"
        >
          取消
        </button>
        <button 
          v-if="currentStep < 3" 
          @click="nextStep" 
          class="px-4 py-2 text-white rounded-md text-sm"
          :style="{
            backgroundColor: 'var(--accent-color)'
          }"
        >
          下一步
        </button>
        <button 
          v-if="currentStep === 3" 
          @click="submit" 
          class="px-4 py-2 text-white rounded-md text-sm"
          :style="{
            backgroundColor: 'var(--accent-color)'
          }"
        >
          提交任务 (5分钟)
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
const showPatternCategoryDropdown = ref(false)
const showFromLibrary = ref(false)
const searchWhiteProduct = ref('')
const searchPattern = ref('')
const skuRule = ref('')
const fileInput = ref(null)
const selectedCategory = ref('选择分类')

// 分页状态
const productPagination = ref({
  currentPage: 1,
  pageSize: 24,
  total: 0
})

const patternPagination = ref({
  currentPage: 1,
  pageSize: 24,
  total: 0
})

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

// 分页计算
const productTotalPages = computed(() => {
  return Math.ceil(whiteProducts.value.length / productPagination.value.pageSize)
})

const patternTotalPages = computed(() => {
  return Math.ceil(patterns.value.length / patternPagination.value.pageSize)
})

// 方法
const filterCategory = (category) => {
  selectedCategory.value = category
  showCategoryDropdown.value = false
  // 这里可以添加按分类筛选的逻辑
}

const filterPatternCategory = (category) => {
  showPatternCategoryDropdown.value = false
  // 这里可以添加按图案分类筛选的逻辑
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

// 产品分页方法
const goToProductPage = (page) => {
  if (page >= 1 && page <= productTotalPages.value) {
    productPagination.value.currentPage = page
  }
}

const handleProductPageSizeChange = () => {
  productPagination.value.currentPage = 1
}

// 图案分页方法
const goToPatternPage = (page) => {
  if (page >= 1 && page <= patternTotalPages.value) {
    patternPagination.value.currentPage = page
  }
}

const handlePatternPageSizeChange = () => {
  patternPagination.value.currentPage = 1
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
  selectedCategory.value = '选择分类'
  showCategoryDropdown.value = false
  showPatternCategoryDropdown.value = false
  showFromLibrary.value = false
  
  // 重置分页状态
  productPagination.value = {
    currentPage: 1,
    pageSize: 24,
    total: 0
  }
  patternPagination.value = {
    currentPage: 1,
    pageSize: 24,
    total: 0
  }
  
  whiteProducts.value.forEach(product => product.selected = false)
  patterns.value.forEach(pattern => pattern.selected = false)
  
  emits('close')
}
</script> 