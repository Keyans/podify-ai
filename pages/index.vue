<template>
  <div class="min-h-screen overflow-hidden">
    <!-- 英雄区块 -->
    <section class="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <!-- 背景装饰图片 -->
      <div class="absolute inset-0 overflow-hidden">
        <!-- 右侧漂浮的图片组合 -->
        <div class="absolute right-8 top-1/2 transform -translate-y-1/2">
          <!-- 主要装饰图片容器 -->
          <div class="relative">
            <!-- 女性时尚图片 -->
            <div class="w-72 h-96 rounded-2xl overflow-hidden shadow-2xl transform rotate-12 hover:rotate-6 transition-transform duration-700">
              <div class="w-full h-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                <div class="text-6xl">👩‍💼</div>
              </div>
            </div>
            
            <!-- 精灵角色图片 -->
            <div class="absolute -top-16 -right-8 w-48 h-64 rounded-2xl overflow-hidden shadow-xl transform -rotate-12 hover:-rotate-6 transition-transform duration-700">
              <div class="w-full h-full bg-gradient-to-br from-green-100 to-emerald-200 flex items-center justify-center">
                <div class="text-4xl">🧝‍♀️</div>
              </div>
            </div>
            
            <!-- 香水瓶图片 -->
            <div class="absolute -bottom-20 -left-16 w-32 h-48 rounded-2xl overflow-hidden shadow-xl transform rotate-45 hover:rotate-30 transition-transform duration-700">
              <div class="w-full h-full bg-gradient-to-br from-yellow-100 to-amber-200 flex items-center justify-center">
                <div class="text-3xl">🍾</div>
              </div>
            </div>
            
            <!-- 建筑图片 -->
            <div class="absolute -bottom-8 right-20 w-56 h-40 rounded-2xl overflow-hidden shadow-xl transform -rotate-6 hover:-rotate-3 transition-transform duration-700">
              <div class="w-full h-full bg-gradient-to-br from-orange-100 to-red-200 flex items-center justify-center">
                <div class="text-4xl">🏗️</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 中心圆形装饰和车辆图标 -->
        <div class="absolute top-1/2 right-1/3 transform -translate-y-1/2">
          <!-- 大圆形边框 -->
          <div class="w-48 h-48 rounded-full border-4 border-yellow-400 bg-white flex items-center justify-center shadow-2xl">
            <!-- 车辆图标 -->
            <div class="w-24 h-24 bg-black rounded-full flex items-center justify-center">
              <div class="text-3xl text-white">🚗</div>
            </div>
          </div>
        </div>

        <!-- 右上角小狗头像 -->
        <div class="absolute top-20 right-20">
          <div class="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-200 to-orange-300 flex items-center justify-center shadow-xl transform hover:scale-110 transition-transform duration-500">
            <div class="text-4xl">🐕</div>
          </div>
        </div>
      </div>

      <!-- 主要内容 -->
      <div class="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
        <h1 class="text-6xl md:text-8xl font-bold mb-6">
          用灵图<span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">AI</span>，
        </h1>
        <h2 class="text-4xl md:text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          畅享创作乐趣
        </h2>
        <p class="text-xl md:text-2xl mb-12 text-gray-300 font-light">
          Less Design, More Creation.
        </p>
        
        <!-- CTA按钮 -->
        <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <NuxtLink to="/login" class="group relative inline-flex items-center px-12 py-4 overflow-hidden text-lg font-medium text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-full hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            <span class="absolute left-0 block w-full h-0 transition-all bg-gradient-to-r from-yellow-400 to-orange-400 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
            <span class="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
              <ArrowRightIcon class="w-5 h-5" />
            </span>
            <span class="relative">开始创作</span>
          </NuxtLink>
          
          <button @click="scrollToFeatures" class="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300">
            了解更多
            <ChevronDownIcon class="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>

      <!-- 滚动指示器 -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div class="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div class="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>

    <!-- 特性介绍区块 -->
    <section id="features" class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold gradient-text mb-4">
            灵图AI，更懂创意的AI
          </h2>
          <p class="text-xl text-gray-600">
            少点重复设计，多点创作时间
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- 特性卡片1 -->
          <div class="card text-center group hover:scale-105 transition-all duration-300">
            <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <SparklesIcon class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-semibold mb-4">AI图像生成</h3>
            <p class="text-gray-600">
              基于先进的AI技术，快速生成高质量的创意图像，让设计灵感瞬间变为现实。
            </p>
          </div>

          <!-- 特性卡片2 -->
          <div class="card text-center group hover:scale-105 transition-all duration-300">
            <div class="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CpuChipIcon class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-semibold mb-4">智能设计工具</h3>
            <p class="text-gray-600">
              集成多种AI设计工具，从背景移除到图像增强，一站式解决设计需求。
            </p>
          </div>

          <!-- 特性卡片3 -->
          <div class="card text-center group hover:scale-105 transition-all duration-300">
            <div class="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <BoltIcon class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-semibold mb-4">极速创作</h3>
            <p class="text-gray-600">
              秒级响应，快速迭代，让创作过程变得更加高效和愉悦。
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 产品展示区块 -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold gradient-text mb-4">
            丰富的创作工具
          </h2>
          <p class="text-xl text-gray-600">
            满足不同场景的创作需求
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- 工具卡片 -->
          <div v-for="tool in tools" :key="tool.name" class="card group cursor-pointer" @click="navigateTo(tool.link)">
            <div class="w-12 h-12 rounded-lg flex items-center justify-center mb-4" :class="tool.bgColor">
              <component :is="tool.icon" class="w-6 h-6 text-white" />
            </div>
            <h3 class="font-semibold mb-2 group-hover:text-blue-600 transition-colors">{{ tool.name }}</h3>
            <p class="text-sm text-gray-600">{{ tool.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA区块 -->
    <section class="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
      <div class="max-w-4xl mx-auto text-center px-6">
        <h2 class="text-4xl font-bold text-white mb-6">
          准备开始您的AI创作之旅了吗？
        </h2>
        <p class="text-xl text-blue-100 mb-8">
          加入数万名创作者，体验AI带来的创作乐趣
        </p>
        <NuxtLink to="/login" class="btn-primary inline-block">
          立即开始创作
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { 
  ArrowRightIcon, 
  ChevronDownIcon, 
  SparklesIcon, 
  CpuChipIcon, 
  BoltIcon,
  PhotoIcon,
  ScissorsIcon,
  Squares2X2Icon,
  CubeIcon,
  ViewfinderCircleIcon,
  ShieldCheckIcon,
  DocumentTextIcon
} from '@heroicons/vue/24/outline'

// SEO优化
useSeoMeta({
  title: '灵图AI - 畅享创作乐趣 | AI设计工具平台',
  ogTitle: '灵图AI - 畅享创作乐趣',
  description: '用灵图AI，畅享创作乐趣。Less Design, More Creation. 专业的AI设计工具平台，提供图像生成、智能设计等多种创作工具。',
  ogDescription: '用灵图AI，畅享创作乐趣。Less Design, More Creation.',
  keywords: '灵图AI,AI设计,图像生成,创作工具,智能设计,AI工具',
  ogImage: '/og-image.jpg',
  twitterCard: 'summary_large_image'
})

// 设置布局
definePageMeta({
  layout: 'default'
})

// 工具列表
const tools = [
  {
    name: 'AI图像生成',
    description: '文本生成图像，创意无限',
    icon: PhotoIcon,
    bgColor: 'bg-gradient-to-r from-purple-500 to-pink-500',
    link: '/my-apps'
  },
  {
    name: '智能抠图',
    description: '一键移除背景，精准快捷',
    icon: ScissorsIcon,
    bgColor: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    link: '/my-apps/one-click-cutout'
  },
  {
    name: '图像增强',
    description: '提升图像质量，细节丰富',
    icon: SparklesIcon,
    bgColor: 'bg-gradient-to-r from-green-500 to-emerald-500',
    link: '/my-apps'
  },
  {
    name: '批量处理',
    description: '高效批量操作，节省时间',
    icon: Squares2X2Icon,
    bgColor: 'bg-gradient-to-r from-orange-500 to-red-500',
    link: '/my-apps/batch-listing'
  },
  {
    name: '产品合成',
    description: 'POD产品快速合成',
    icon: CubeIcon,
    bgColor: 'bg-gradient-to-r from-indigo-500 to-purple-500',
    link: '/my-apps/pod-compose'
  },
  {
    name: '智能裁剪',
    description: '自动识别主体裁剪',
    icon: ViewfinderCircleIcon,
    bgColor: 'bg-gradient-to-r from-teal-500 to-cyan-500',
    link: '/my-apps/smart-crop'
  },
  {
    name: '版权检测',
    description: '保护原创，避免侵权',
    icon: ShieldCheckIcon,
    bgColor: 'bg-gradient-to-r from-red-500 to-pink-500',
    link: '/my-apps/copyright-detection'
  },
  {
    name: '标题生成',
    description: '智能生成吸引人标题',
    icon: DocumentTextIcon,
    bgColor: 'bg-gradient-to-r from-amber-500 to-yellow-500',
    link: '/my-apps/title-generator'
  }
]

// 方法
const scrollToFeatures = () => {
  const element = document.getElementById('features')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
/* 动画效果 */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.floating {
  animation: float 3s ease-in-out infinite;
}

/* 渐变背景动画 */
@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.bg-gradient-animated {
  background: linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #f5576c);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
}

/* 悬停效果 */
.hover-lift:hover {
  transform: translateY(-5px);
}
</style> 