<template>
  <div class="space-y-6">
    <!-- 页面标题 -->
    <div class="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-purple-100 dark:border-purple-800">
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
        </div>
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-dark-text">图库概览</h1>
          <p class="mt-1 text-sm text-gray-600 dark:text-dark-text-secondary">管理您的所有图片资源</p>
        </div>
      </div>
    </div>

    <!-- 统计卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">图片总数</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-dark-text">{{ totalImages }}</p>
          </div>
          <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">存储空间</p>
            <p class="text-2xl font-bold text-green-600 dark:text-green-400">{{ storageUsed }}</p>
          </div>
          <div class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">今日上传</p>
            <p class="text-2xl font-bold text-purple-600 dark:text-purple-400">{{ todayUploads }}</p>
          </div>
          <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">处理任务</p>
            <p class="text-2xl font-bold text-orange-600 dark:text-orange-400">{{ processingTasks }}</p>
          </div>
          <div class="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- 快捷入口 -->
    <div class="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-dark-text mb-4">图库分类</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <router-link
          v-for="category in galleryCategories"
          :key="category.path"
          :to="category.path"
          class="group p-4 border-2 border-gray-200 dark:border-dark-border rounded-xl hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-md transition-all duration-200"
        >
          <div class="flex items-center space-x-3">
            <div :class="category.iconBg" class="w-10 h-10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <component :is="category.icon" class="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 class="font-medium text-gray-900 dark:text-dark-text group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                {{ category.name }}
              </h4>
              <p class="text-sm text-gray-500 dark:text-dark-text-secondary">{{ category.count }} 张图片</p>
            </div>
          </div>
        </router-link>
      </div>
    </div>

    <!-- 最近上传 -->
    <div class="bg-white dark:bg-dark-surface rounded-xl shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-100 dark:border-dark-border">
        <div class="flex justify-between items-center">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-dark-text">最近上传</h3>
            <p class="text-sm text-gray-600 dark:text-dark-text-secondary mt-1">查看最新上传的图片</p>
          </div>
          <router-link to="/gallery/products" class="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 text-sm font-medium">
            查看全部 →
          </router-link>
        </div>
      </div>

      <div class="p-6">
        <div class="grid grid-cols-6 gap-4">
          <div
            v-for="image in recentImages"
            :key="image.id"
            class="group relative cursor-pointer"
          >
            <img
              :src="image.thumbnail"
              :alt="image.name"
              class="w-full h-20 object-cover rounded-lg border border-gray-200 dark:border-dark-border group-hover:shadow-md transition-all duration-200"
            />
            <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-lg transition-all duration-200 flex items-center justify-center">
              <svg class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, h } from 'vue';

// 统计数据
const totalImages = ref(1248);
const storageUsed = ref('2.3GB');
const todayUploads = ref(24);
const processingTasks = ref(5);

// 图库分类
const galleryCategories = ref([
  {
    name: '商品图库',
    path: '/gallery/products',
    count: 456,
    icon: h('svg', {
      class: 'w-6 h-6',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
      })
    ]),
    iconBg: 'bg-gradient-to-br from-blue-500 to-blue-600'
  },
  {
    name: '素材图库',
    path: '/gallery/materials',
    count: 324,
    icon: h('svg', {
      class: 'w-6 h-6',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
      })
    ]),
    iconBg: 'bg-gradient-to-br from-green-500 to-green-600'
  },
  {
    name: '背景图库',
    path: '/gallery/backgrounds',
    count: 289,
    icon: h('svg', {
      class: 'w-6 h-6',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z'
      })
    ]),
    iconBg: 'bg-gradient-to-br from-purple-500 to-purple-600'
  },
  {
    name: '处理结果',
    path: '/gallery/results',
    count: 179,
    icon: h('svg', {
      class: 'w-6 h-6',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
      })
    ]),
    iconBg: 'bg-gradient-to-br from-orange-500 to-orange-600'
  }
]);

// 最近上传的图片
const recentImages = ref([
  {
    id: 1,
    name: '商品图片_001.jpg',
    thumbnail: 'https://picsum.photos/200/200?random=1',
    category: 'product'
  },
  {
    id: 2,
    name: '背景图片_001.jpg',
    thumbnail: 'https://picsum.photos/200/200?random=2',
    category: 'background'
  },
  {
    id: 3,
    name: '素材图片_001.png',
    thumbnail: 'https://picsum.photos/200/200?random=3',
    category: 'material'
  },
  {
    id: 4,
    name: '抠图结果_001.png',
    thumbnail: 'https://picsum.photos/200/200?random=4',
    category: 'result'
  },
  {
    id: 5,
    name: '商品图片_002.jpg',
    thumbnail: 'https://picsum.photos/200/200?random=5',
    category: 'product'
  },
  {
    id: 6,
    name: '裂变结果_001.jpg',
    thumbnail: 'https://picsum.photos/200/200?random=6',
    category: 'result'
  }
]);
</script>

<style scoped>
.shadow-elegant {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.shadow-elegant-dark {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
}
</style>
