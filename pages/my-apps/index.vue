<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 头部 -->
    <div class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="py-6">
          <h1 class="text-3xl font-bold text-gray-900">我的AI工具</h1>
          <p class="mt-2 text-gray-600">管理和使用您的AI工具集合</p>
        </div>
      </div>
    </div>

    <!-- 工具网格 -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- 工具卡片 -->
        <div v-for="tool in tools" :key="tool.id" class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
          <div class="p-6">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 rounded-lg flex items-center justify-center" :class="tool.bgColor">
                <component :is="tool.icon" class="w-6 h-6 text-white" />
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-semibold text-gray-900">{{ tool.name }}</h3>
                <p class="text-sm text-gray-500">{{ tool.category }}</p>
              </div>
            </div>
            <p class="text-gray-600 mb-4">{{ tool.description }}</p>
            <div class="flex items-center justify-between">
              <div class="flex items-center text-sm text-gray-500">
                <span>使用次数: {{ tool.usageCount }}</span>
              </div>
              <NuxtLink 
                :to="tool.link" 
                class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                使用工具
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  PhotoIcon,
  ScissorsIcon,
  Squares2X2Icon,
  CubeIcon,
  ViewfinderCircleIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  RectangleStackIcon
} from '@heroicons/vue/24/outline'

// SEO优化
useSeoMeta({
  title: '我的AI工具 - 灵图AI',
  description: '管理和使用您的AI工具集合，提升工作效率'
})

// 工具列表
const tools = ref([
  {
    id: 'batch-listing',
    name: '批量上架',
    category: '商品管理',
    description: '批量管理和上架商品信息，提高运营效率',
    icon: Squares2X2Icon,
    bgColor: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    link: '/my-apps/batch-listing',
    usageCount: 23
  },
  {
    id: 'copyright-detection',
    name: '版权检测',
    category: '内容安全',
    description: '智能检测图像版权，保护您的创作权益',
    icon: ShieldCheckIcon,
    bgColor: 'bg-gradient-to-r from-red-500 to-pink-500',
    link: '/my-apps/copyright-detection',
    usageCount: 15
  },
  {
    id: 'one-click-cutout',
    name: '一键抠图',
    category: '图像处理',
    description: 'AI智能抠图，快速移除背景',
    icon: ScissorsIcon,
    bgColor: 'bg-gradient-to-r from-green-500 to-teal-500',
    link: '/my-apps/one-click-cutout',
    usageCount: 89
  },
  {
    id: 'pod-compose',
    name: 'POD合成',
    category: '商品设计',
    description: '快速合成POD商品展示图',
    icon: CubeIcon,
    bgColor: 'bg-gradient-to-r from-purple-500 to-indigo-500',
    link: '/my-apps/pod-compose',
    usageCount: 42
  },
  {
    id: 'product-collection',
    name: '产品收集',
    category: '数据采集',
    description: '智能收集和整理产品信息',
    icon: RectangleStackIcon,
    bgColor: 'bg-gradient-to-r from-yellow-500 to-orange-500',
    link: '/my-apps/product-collection',
    usageCount: 67
  },
  {
    id: 'smart-crop',
    name: '智能裁剪',
    category: '图像处理',
    description: 'AI智能裁剪，自动识别主体',
    icon: ViewfinderCircleIcon,
    bgColor: 'bg-gradient-to-r from-teal-500 to-cyan-500',
    link: '/my-apps/smart-crop',
    usageCount: 34
  },
  {
    id: 'super-split',
    name: '超级分割',
    category: '图像处理',
    description: '智能分割图像，精确提取元素',
    icon: PhotoIcon,
    bgColor: 'bg-gradient-to-r from-pink-500 to-rose-500',
    link: '/my-apps/super-split',
    usageCount: 28
  },
  {
    id: 'title-generator',
    name: '标题生成',
    category: '文本处理',
    description: 'AI智能生成吸引人的标题',
    icon: DocumentTextIcon,
    bgColor: 'bg-gradient-to-r from-indigo-500 to-purple-500',
    link: '/my-apps/title-generator',
    usageCount: 56
  }
])
</script>

<style scoped>
.card-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
</style> 