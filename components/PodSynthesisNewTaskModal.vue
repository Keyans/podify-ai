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
                @input="handleSearchInput"
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
                  <!-- 加载状态 -->
                  <div v-if="categoriesLoading" class="px-4 py-2 text-sm text-gray-500">
                    加载中...
                  </div>
                  <!-- 动态分类选项 -->
                  <template v-else>
                    <a 
                      href="#" 
                      v-for="category in allCategories" 
                      :key="category"
                      @click.prevent="filterCategory(category === '全部' ? '选择分类' : category)" 
                      class="block px-4 py-2 text-sm text-dark-text hover:bg-dark-hover"
                    >
                      {{ category }}
                    </a>
                  </template>
                </div>
              </div>
            </div>
          </div>

          <!-- 加载状态 -->
          <div v-if="loading" class="flex justify-center items-center py-12">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2" :style="{ borderColor: 'var(--accent-color)' }"></div>
            <span class="ml-2" :style="{ color: 'var(--text-secondary)' }">加载中...</span>
          </div>

          <!-- 错误状态 -->
          <div v-else-if="error" class="text-center py-12">
            <div class="text-red-500 mb-4">{{ error }}</div>
            <button 
              @click="fetchWhiteProducts(true)" 
              :disabled="isRequestPending"
              class="px-4 py-2 text-white rounded-md text-sm disabled:opacity-50"
              :style="{ backgroundColor: 'var(--accent-color)' }"
            >
              {{ isRequestPending ? '加载中...' : '重新加载' }}
            </button>
          </div>

          <!-- Products Grid -->
          <div v-else class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div 
              v-for="(product, index) in filteredWhiteProducts" 
              :key="index" 
              @click="toggleSelectProduct(product)"
              class="group relative bg-dark-input rounded-lg overflow-hidden border border-dark-border hover:shadow-md transition-all cursor-pointer"
              :class="{
                'border-blue-500': product.selected,
                'border-dark-border': !product.selected
              }"
            >
              <!-- Selection Checkbox - 左上角 -->
              <div class="absolute top-2 left-2 z-10">
                <input 
                  type="checkbox" 
                  :checked="product.selected"
                  @click.stop
                  @change="toggleSelectProduct(product)"
                  class="w-4 h-4 rounded border-dark-border"
                />
              </div>

              <!-- Product Image -->
              <div class="aspect-square overflow-hidden">
                <OptimizedImage
                  :src="product.imageUrl || product.image" 
                  :alt="product.name" 
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  :zoomable="true"
                  :show-zoom-icon="false"
                  container-class="w-full h-full"
                  :lazy="true"
                  priority="normal"
                />
              </div>

              <!-- Product Info Overlay -->
              <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                <h3 class="text-white text-sm font-medium truncate">{{ product.name }}</h3>
                <div class="flex items-center justify-between mt-1">
                  <span class="text-white text-xs font-medium">{{ product.price }}</span>
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
          <a-tabs v-model:activeKey="activeKey">
            <!-- 从图库选择标签页 -->
            <a-tab-pane key="1" tab="从图库选择">
              <Gallery 
                v-model="selectedPatternsFromGallery"
                @selection-change="handleGallerySelectionChange"
              />
            </a-tab-pane>
            
            <!-- 上传图片标签页 -->
            <a-tab-pane key="2" tab="上传图片">
              <div class="space-y-6">
                <!-- 上传按钮 -->
                <div class="flex justify-center">
                  <button 
                    @click="openFileUpload"
                    class="px-6 py-3 rounded-md text-sm font-medium transition-colors"
                    :style="{
                      backgroundColor: 'var(--accent-color)',
                      color: 'white'
                    }"
                  >
                    选择图片文件
                  </button>
                  <input 
                    ref="fileInput" 
                    type="file" 
                    multiple 
                    accept="image/*" 
                    class="hidden" 
                    @change="handleFileUpload"
                  >
                </div>
                
                <!-- 上传的图片展示 -->
                <div v-if="uploadedPatterns.length > 0" class="space-y-4">
                  <h4 class="text-sm font-medium" :style="{ color: 'var(--text-primary)' }">
                    已上传的图片 ({{ uploadedPatterns.length }})
                  </h4>
                  
                  <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    <div 
                      v-for="(pattern, index) in uploadedPatterns" 
                      :key="index" 
                      @click="toggleSelectPattern(pattern)"
                      class="group relative rounded-lg overflow-hidden border cursor-pointer transition-all duration-200 hover:shadow-md"
                      :style="{
                        borderColor: pattern.selected ? 'var(--accent-color)' : 'var(--border-color)',
                        backgroundColor: 'var(--bg-secondary)'
                      }"
                    >
                      <!-- 选择复选框 -->
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
                      
                      <!-- 删除按钮 -->
                      <div class="absolute top-2 right-2 z-10">
                        <button 
                          @click.stop="removeUploadedPattern(index)"
                          class="w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center hover:bg-red-600 transition-colors"
                        >
                          ×
                        </button>
                      </div>

                      <!-- 图片 -->
                      <div class="aspect-square overflow-hidden">
                        <img 
                          :src="pattern.image" 
                          alt="上传的图片" 
                          class="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <!-- 统计信息 -->
                  <div class="text-sm" :style="{ color: 'var(--text-secondary)' }">
                    已选择 {{ selectedUploadedPatterns.length }} 张图片，共 {{ uploadedPatterns.length }} 张
                  </div>
                </div>
                
                <!-- 空状态 -->
                <div v-else class="text-center py-12">
                  <div class="text-sm" :style="{ color: 'var(--text-secondary)' }">
                    还没有上传任何图片，点击上方按钮选择图片文件
                  </div>
                </div>
              </div>
            </a-tab-pane>
          </a-tabs>
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

          <!-- 错误提示 -->
          <div v-if="submitError" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-red-700 text-sm">{{ submitError }}</span>
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
          :disabled="submitting"
          class="px-4 py-2 text-white rounded-md text-sm flex items-center space-x-2"
          :style="{
            backgroundColor: submitting ? '#6b7280' : 'var(--accent-color)',
            cursor: submitting ? 'not-allowed' : 'pointer'
          }"
        >
          <div v-if="submitting" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          <span>{{ submitting ? '提交中...' : '提交任务' }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, defineProps, defineEmits, onMounted, watch } from 'vue'
import { getWhiteProductList } from '~/apis/business/white'
import { getGalleryCategories, GalleryType } from '~/apis/business/gallery'
import { addPodComposerTask } from '~/apis/business/pod-composer'
import OptimizedImage from '~/components/OptimizedImage.vue'
import Gallery from '~/components/pod-synthesis/Gallery.vue'
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
const skuRule = ref('')
const fileInput = ref(null)
const selectedCategory = ref('选择分类')

// 图案选择相关
const selectedPatternsFromGallery = ref([])
const uploadedPatterns = ref([])
const activeKey = ref('1') // 控制a-tabs的活动标签页

// 加载状态
const loading = ref(false)
const error = ref('')
const categoriesLoading = ref(false)
const submitting = ref(false)
const submitError = ref('')

// 分类数据
const apiCategories = ref([])
const allCategories = ref(['全部']) // 包含"全部"选项的完整分类列表

// 分页状态
const productPagination = ref({
  currentPage: 1,
  pageSize: 8,
  total: 0
})

// 白品数据
const whiteProducts = ref([])

// 过滤后的白品列表
const filteredWhiteProducts = computed(() => {
  if (!searchWhiteProduct.value) return whiteProducts.value
  return whiteProducts.value.filter(product => 
    product.name.toLowerCase().includes(searchWhiteProduct.value.toLowerCase()) || 
    product.category.toLowerCase().includes(searchWhiteProduct.value.toLowerCase())
  )
})

// 已选择的产品列表
const selectedProducts = computed(() => {
  return whiteProducts.value.filter(product => product.selected)
})

// 已选择的上传图案列表
const selectedUploadedPatterns = computed(() => {
  return uploadedPatterns.value.filter(pattern => pattern.selected)
})

// 所有已选择的图案（图库 + 上传）
const allSelectedPatterns = computed(() => {
  return [...selectedPatternsFromGallery.value, ...selectedUploadedPatterns.value]
})

// selectedPatterns别名，用于向后兼容
const selectedPatterns = computed(() => {
  return allSelectedPatterns.value
})

// 分页计算
const productTotalPages = computed(() => {
  return Math.ceil(whiteProducts.value.length / productPagination.value.pageSize)
})

// 分类筛选防抖
let categoryTimeout = null
const filterCategory = (category) => {
  selectedCategory.value = category
  showCategoryDropdown.value = false
  
  // 清除之前的定时器
  if (categoryTimeout) {
    clearTimeout(categoryTimeout)
  }
  
  // 防抖处理
  categoryTimeout = setTimeout(() => {
    productPagination.value.currentPage = 1
    fetchWhiteProducts()
  }, 300)
}

// 根据分类名称查找分类ID
const findCategoryId = (categoryList, targetName) => {
  for (const category of categoryList) {
    if (category.categoryName === targetName) {
      return category.categoryId
    }
    if (category.categoryList && category.categoryList.length > 0) {
      const found = findCategoryId(category.categoryList, targetName)
      if (found) return found
    }
  }
  return null
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

// Gallery组件选择变化处理
const handleGallerySelectionChange = (selectedImages) => {
  selectedPatternsFromGallery.value = selectedImages
}

// 移除上传的图案
const removeUploadedPattern = (index) => {
  uploadedPatterns.value.splice(index, 1)
}

// 请求状态管理
const isRequestPending = ref(false)
const requestAbortController = ref(null)

// 搜索防抖
let searchTimeout = null
const handleSearchInput = () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }
  searchTimeout = setTimeout(() => {
    productPagination.value.currentPage = 1
    fetchWhiteProducts()
  }, 500)
}

// 获取白品数据
const fetchWhiteProducts = async (force = false) => {
  // 如果有请求正在进行且不是强制刷新，则跳过
  if (isRequestPending.value && !force) {
    console.log('请求正在进行中，跳过重复请求')
    return
  }
  
  // 取消之前的请求
  if (requestAbortController.value) {
    requestAbortController.value.abort()
  }
  
  try {
    isRequestPending.value = true
    loading.value = true
    error.value = ''
    
    // 创建新的AbortController
    requestAbortController.value = new AbortController()
    
    const params = {
      page: productPagination.value.currentPage,
      limit: productPagination.value.pageSize,
      title: searchWhiteProduct.value || undefined
    }
    
    // 添加分类筛选
    if (selectedCategory.value !== '选择分类') {
      const categoryId = findCategoryId(apiCategories.value, selectedCategory.value)
      if (categoryId) {
        params.categoryId = categoryId
      }
    }
    
    const response = await getWhiteProductList(params, {
      signal: requestAbortController.value.signal
    })
    
    // 添加调试信息
    console.log('API响应数据:', response)
    console.log('白品列表数据:', response.data?.whiteProductList)
    
    if (response.success && response.data) {
      // 处理API响应数据，适配现有的数据结构
      const products = response.data.whiteProductList || []
      
      // 调试每个产品的imageUrl字段
      products.forEach((product, index) => {
        console.log(`产品${index + 1} imageUrl:`, product.imageUrl)
        console.log(`产品${index + 1} 完整数据:`, product)
      })
      
      whiteProducts.value = products.map(product => ({
        id: product.whiteProductId,
        name: product.title || '未知商品',
        category: '未分类', // API响应中没有category字段，设为默认值
        image: product.imageUrl || 'https://via.placeholder.com/300/F5F5F5?text=No+Image',
        imageUrl: product.imageUrl, // 保留原始imageUrl字段
        selected: false,
        price: product.price || '$0',
        // 保留原始数据
        ...product
      }))
      
      // 更新分页信息
      if (response.data.total !== undefined) {
        productPagination.value.total = parseInt(response.data.total)
      }
    } else {
      error.value = response.message || '获取白品数据失败'
    }
  } catch (err) {
    // 如果是取消请求，不显示错误
    if (err.name === 'AbortError') {
      console.log('请求已取消')
      return
    }
    console.error('获取白品数据失败:', err)
    error.value = '获取白品数据失败，请重试'
  } finally {
    isRequestPending.value = false
    loading.value = false
    requestAbortController.value = null
  }
}

// 获取分类数据
const loadCategories = async () => {
  try {
    categoriesLoading.value = true
    const response = await getGalleryCategories({ galleryType: GalleryType.PRODUCTS })
    
    console.log('🔍 [Modal Debug] 分类API响应:', response)
    
    if (response.success && response.data) {
      apiCategories.value = response.data.categoryList || []
      
      // 递归提取所有分类名称
      const extractCategoryNames = (categoryList) => {
        const names = []
        categoryList.forEach(category => {
          names.push(category.categoryName)
          if (category.categoryList && category.categoryList.length > 0) {
            names.push(...extractCategoryNames(category.categoryList))
          }
        })
        return names
      }
      
      const categoryNames = extractCategoryNames(apiCategories.value)
      allCategories.value = ['全部', ...categoryNames]
      
      console.log('🔍 [Modal Debug] 提取的分类名称:', allCategories.value)
    } else {
      console.log('🔍 [Modal Debug] 分类API响应失败:', response)
    }
  } catch (err) {
    console.error('🔍 [Modal Debug] 获取分类失败:', err)
  } finally {
    categoriesLoading.value = false
  }
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
        uploadedPatterns.value.push({
          id: uploadedPatterns.value.length + 1,
          image: e.target.result,
          title: file.name,
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

// 分页防抖
let paginationTimeout = null
const debouncedFetchProducts = () => {
  if (paginationTimeout) {
    clearTimeout(paginationTimeout)
  }
  paginationTimeout = setTimeout(() => {
    fetchWhiteProducts()
  }, 200)
}

// 产品分页方法
const goToProductPage = (page) => {
  if (page >= 1 && page <= productTotalPages.value) {
    productPagination.value.currentPage = page
    debouncedFetchProducts()
  }
}

const handleProductPageSizeChange = () => {
  productPagination.value.currentPage = 1
  debouncedFetchProducts()
}

// 图案分页方法
// 图案分页功能已移至Gallery组件中

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

const submit = async () => {
  if (selectedProducts.value.length === 0 || selectedPatterns.value.length === 0) {
    alert('请至少选择一个白品和一个图案')
    return
  }

  try {
    submitting.value = true
    submitError.value = ''

    // 判断uploadType：如果有上传的图案则为1，如果只有图库图案则为2
    const hasUploadedPatterns = selectedUploadedPatterns.value.length > 0
    const uploadType = hasUploadedPatterns ? 1 : 2

    // 构建whiteProductIdList
    const whiteProductIdList = selectedProducts.value.map(product => product.id || product.whiteProductId)

    // 构建imageList
    const imageList = selectedPatterns.value.map(pattern => {
      return {
        imageName: pattern.title || pattern.name || '未命名图案',
        imageUrl: pattern.imageUrl || pattern.image || pattern.url,
        thumbnailImageUrl: pattern.thumbnailUrl || '',
        fileSize: pattern.fileSize ? String(pattern.fileSize) : '0',
        width: pattern.width || 1024,
        height: pattern.height || 1024,
        format: pattern.format || 'jpg'
      }
    })

    // 构建请求参数
    const requestData = {
      uploadType,
      whiteProductIdList,
      imageList
    }

    console.log('提交任务参数:', requestData)

    // 调用API
    const response = await addPodComposerTask(requestData)

    if (response.success) {
      // 提交成功，关闭弹窗并触发submit事件
      const formData = {
        products: selectedProducts.value,
        patterns: selectedPatterns.value,
        skuRule: skuRule.value
      }
      emits('submit', formData)
      close()
    } else {
      submitError.value = response.message || '提交任务失败'
    }
  } catch (err) {
    console.error('提交任务失败:', err)
    submitError.value = '提交任务失败，请重试'
  } finally {
    submitting.value = false
  }
}

// 初始化数据函数，确保只请求一次
const initializeModalData = async () => {
  try {
    // 并行加载分类数据和白品数据，但确保只请求一次
    await Promise.all([
      loadCategories(),
      fetchWhiteProducts(true)
    ])
    console.log('Modal数据初始化完成')
  } catch (err) {
    console.error('初始化数据失败:', err)
  }
}

// 监听弹窗打开状态，只在弹窗打开时获取数据
watch(() => props.isOpen, async (newValue) => {
  if (newValue) {
    // 一次性初始化所有数据
    await initializeModalData()
  }
})

const close = () => {
  // 取消正在进行的请求
  if (requestAbortController.value) {
    requestAbortController.value.abort()
  }
  
  // 清除所有防抖定时器
  if (searchTimeout) {
    clearTimeout(searchTimeout)
    searchTimeout = null
  }
  if (categoryTimeout) {
    clearTimeout(categoryTimeout)
    categoryTimeout = null
  }
  if (paginationTimeout) {
    clearTimeout(paginationTimeout)
    paginationTimeout = null
  }
  
  // 重置所有状态
  currentStep.value = 1
  searchWhiteProduct.value = ''
  skuRule.value = ''
  selectedCategory.value = '选择分类'
  showCategoryDropdown.value = false
  showFromLibrary.value = false
  loading.value = false
  error.value = ''
  categoriesLoading.value = false
  submitting.value = false
  submitError.value = ''
  isRequestPending.value = false
  requestAbortController.value = null
  
  // 重置分类数据
  apiCategories.value = []
  allCategories.value = ['全部']
  
  // 重置分页状态
  productPagination.value = {
    currentPage: 1,
    pageSize: 24,
    total: 0
  }
  
  // 重置选择状态
  whiteProducts.value.forEach(product => product.selected = false)
  selectedPatternsFromGallery.value = []
  uploadedPatterns.value = []
  
  emits('close')
}
</script>