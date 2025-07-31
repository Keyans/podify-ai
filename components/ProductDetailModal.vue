<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="$emit('close')">
    <div 
      class="bg-dark-card rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto border border-dark-border"
      @click.stop
    >
      <!-- 弹窗头部 -->
      <div class="flex items-center justify-between p-6 border-b border-dark-border">
        <h2 class="text-xl font-semibold text-dark-text">查看详情</h2>
        <button 
          @click="$emit('close')"
          class="text-dark-text-secondary hover:text-dark-text transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <div class="p-6">
        <div class="grid grid-cols-2 gap-8">
          <!-- 左侧图片区域 -->
          <div class="space-y-4">
            <!-- 主图 -->
            <div class="aspect-square bg-dark-input rounded-lg overflow-hidden">
              <img 
                :src="mainImage" 
                :alt="product?.name"
                class="w-full h-full object-cover"
              />
            </div>

            <!-- 图片缩略图 -->
            <div class="flex space-x-2">
              <button
                v-for="(image, index) in productImages"
                :key="index"
                @click="selectImage(image)"
                class="w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors"
                :class="mainImage === image ? 'border-blue-500' : 'border-dark-border hover:border-dark-text-secondary'"
              >
                <img :src="image" :alt="`商品图 ${index + 1}`" class="w-full h-full object-cover" />
              </button>
              
              <!-- 左右切换按钮 -->
              <button 
                @click="prevImage"
                class="flex items-center justify-center w-16 h-16 bg-dark-input rounded-lg border border-dark-border hover:bg-dark-hover transition-colors"
              >
                <svg class="w-4 h-4 text-dark-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              
              <button 
                @click="nextImage"
                class="flex items-center justify-center w-16 h-16 bg-dark-input rounded-lg border border-dark-border hover:bg-dark-hover transition-colors"
              >
                <svg class="w-4 h-4 text-dark-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>

            <!-- 将商品加效果图 -->
            <button class="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors">
              将商品加效果图
            </button>
          </div>

          <!-- 右侧信息区域 -->
          <div class="space-y-6">
            <!-- 商品标题 -->
            <div>
              <div class="flex items-center space-x-2 mb-2">
                <span class="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">蓝标</span>
                <span class="text-dark-text-secondary text-sm">{{ product?.id || 'YSM004' }}</span>
              </div>
              <h3 class="text-lg font-semibold text-dark-text mb-1">
                {{ product?.name || '鸭舌帽' }}
              </h3>
            </div>

            <!-- 颜色选择 -->
            <div>
              <h4 class="text-dark-text font-medium mb-3">颜色</h4>
              <div class="flex space-x-3">
                <button 
                  v-for="color in colors"
                  :key="color.name"
                  @click="selectColor(color)"
                  class="w-8 h-8 rounded-full border-2 transition-all duration-200"
                  :class="selectedColor.name === color.name ? 'border-white ring-2 ring-blue-500' : 'border-dark-border'"
                  :style="{ backgroundColor: color.value }"
                  :title="color.name"
                ></button>
              </div>
            </div>

            <!-- 尺码选择 -->
            <div>
              <h4 class="text-dark-text font-medium mb-3">尺码</h4>
              <div class="flex space-x-2 mb-2">
                <button 
                  v-for="size in sizes"
                  :key="size"
                  @click="selectSize(size)"
                  class="px-4 py-2 border rounded-lg transition-colors"
                  :class="selectedSize === size 
                    ? 'border-blue-500 bg-blue-500 bg-opacity-20 text-blue-400' 
                    : 'border-dark-border text-dark-text-secondary hover:border-dark-text-secondary hover:text-dark-text'"
                >
                  {{ size }}
                </button>
              </div>
              <button class="text-blue-400 text-sm hover:underline">尺码表</button>
            </div>

            <!-- 支持POD面 -->
            <div>
              <h4 class="text-dark-text font-medium mb-3">支持POD面</h4>
              <div class="flex space-x-3">
                <button 
                  v-for="surface in podSurfaces"
                  :key="surface.name"
                  @click="selectPodSurface(surface)"
                  class="flex items-center space-x-2 px-4 py-2 border rounded-lg transition-colors"
                  :class="selectedPodSurface.name === surface.name 
                    ? 'border-blue-500 bg-blue-500 bg-opacity-20 text-blue-400' 
                    : 'border-dark-border text-dark-text-secondary hover:border-dark-text-secondary hover:text-dark-text'"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span>{{ surface.name }}</span>
                </button>
              </div>
            </div>

            <!-- 支持工艺 -->
            <div>
              <h4 class="text-dark-text font-medium mb-3">支持工艺</h4>
              <div class="flex space-x-3">
                <button 
                  v-for="process in processes"
                  :key="process"
                  class="px-4 py-2 border border-dark-border text-dark-text-secondary rounded-lg hover:border-dark-text-secondary hover:text-dark-text transition-colors"
                >
                  {{ process }}
                </button>
              </div>
            </div>

            <!-- 所属分类 -->
            <div>
              <h4 class="text-dark-text font-medium mb-3">所属分类</h4>
              <div class="flex items-center justify-between">
                <span class="text-dark-text-secondary">服装/男装</span>
                <button class="text-green-400 text-sm hover:underline">编辑</button>
              </div>
            </div>

            <!-- 创建人和采集时间 -->
            <div class="space-y-3">
              <div>
                <h4 class="text-dark-text font-medium mb-1">创建人</h4>
                <span class="text-dark-text-secondary">admin</span>
              </div>
              <div>
                <h4 class="text-dark-text font-medium mb-1">采集时间</h4>
                <span class="text-dark-text-secondary">{{ product?.createTime || '2025-07-28 22:26:28' }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 底部操作按钮 -->
        <div class="flex items-center justify-between mt-8 pt-6 border-t border-dark-border">
          <div class="flex items-center space-x-2 text-dark-text-secondary">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span class="text-sm">点击设计就可以制作的</span>
            <button class="text-blue-400 hover:underline text-sm">侵权效果图</button>
            <span class="text-sm">弹窗</span>
          </div>

          <div class="flex space-x-3">
            <button 
              @click="$emit('close')"
              class="px-6 py-2 border border-dark-border text-dark-text-secondary rounded-lg hover:bg-dark-hover transition-colors"
            >
              取消
            </button>
            <button 
              @click="handleConfirm"
              class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              确定
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Props
const props = defineProps({
  product: {
    type: Object,
    default: () => ({})
  }
})

// Emits
const emit = defineEmits(['close', 'confirm'])

// 响应式数据
const currentImageIndex = ref(0)
const selectedColor = ref({ name: '红色', value: '#ef4444' })
const selectedSize = ref('M')
const selectedPodSurface = ref({ name: '外侧面', value: 'outside' })

// 商品图片
const productImages = ref([
  '/api/placeholder/400/400',
  '/api/placeholder/400/400',
  '/api/placeholder/400/400',
  '/api/placeholder/400/400',
  '/api/placeholder/400/400'
])

// 当前主图
const mainImage = computed(() => productImages.value[currentImageIndex.value])

// 颜色选项
const colors = ref([
  { name: '红色', value: '#ef4444' },
  { name: '白色', value: '#ffffff' },
  { name: '灰色', value: '#6b7280' },
  { name: '黑色', value: '#000000' }
])

// 尺码选项
const sizes = ref(['S', 'M', 'L'])

// POD面选项
const podSurfaces = ref([
  { name: '外侧面', value: 'outside' },
  { name: '内里', value: 'inside' },
  { name: '内侧面', value: 'inner' }
])

// 工艺选项
const processes = ref(['DTF (彩画)', 'DTG (直喷)', 'EMB (刺绣)'])

// 方法
const selectImage = (image) => {
  const index = productImages.value.indexOf(image)
  if (index !== -1) {
    currentImageIndex.value = index
  }
}

const prevImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--
  } else {
    currentImageIndex.value = productImages.value.length - 1
  }
}

const nextImage = () => {
  if (currentImageIndex.value < productImages.value.length - 1) {
    currentImageIndex.value++
  } else {
    currentImageIndex.value = 0
  }
}

const selectColor = (color) => {
  selectedColor.value = color
}

const selectSize = (size) => {
  selectedSize.value = size
}

const selectPodSurface = (surface) => {
  selectedPodSurface.value = surface
}

const handleConfirm = () => {
  const productData = {
    ...props.product,
    selectedColor: selectedColor.value,
    selectedSize: selectedSize.value,
    selectedPodSurface: selectedPodSurface.value,
    currentImage: mainImage.value
  }
  
  emit('confirm', productData)
}
</script> 