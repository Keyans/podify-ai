<template>
  <div class="app-card group relative bg-white dark:bg-dark-surface rounded-2xl shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-1 flex flex-col h-full"
       @click="$emit('click', app)">

    <!-- 顶部渐变背景 -->
    <div class="absolute top-0 left-0 right-0 h-24 bg-gradient-to-br from-primary-500/10 to-blue-500/10 dark:from-primary-400/20 dark:to-blue-400/20"></div>

    <!-- 收藏按钮 -->
    <button
      @click.stop="$emit('favorite-toggle', app.id)"
      class="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 dark:bg-dark-surface/90 backdrop-blur-md shadow-lg border border-white/20 dark:border-dark-border/50 hover:bg-white dark:hover:bg-dark-surface transition-all duration-200 group/fav"
      :class="app.isFavorited ? 'text-red-500 hover:text-red-600' : 'text-gray-400 hover:text-red-500'"
    >
      <HeartIcon
        class="w-4 h-4 transition-transform duration-200 group-hover/fav:scale-110"
        :class="app.isFavorited ? 'fill-current' : ''"
      />
    </button>

    <!-- 主要内容区域 -->
    <div class="relative p-6 flex-1 flex flex-col">
      <!-- 应用图标 -->
      <div class="flex justify-center mb-4">
        <div class="w-20 h-20 bg-gradient-to-br from-primary-500 to-blue-500 rounded-2xl flex items-center justify-center text-3xl font-bold text-white shadow-lg transform group-hover:scale-105 transition-transform duration-300">
          {{ app.icon }}
        </div>
      </div>

      <!-- 应用信息 -->
      <div class="text-center mb-4">
        <div class="flex items-center justify-center space-x-2 mb-2">
          <h3 class="text-xl font-bold text-gray-900 dark:text-dark-text">
            {{ app.name }}
          </h3>
          <!-- 状态标识 -->
          <el-tag
            v-if="app.status === 'maintenance'"
            type="warning"
            size="small"
            effect="light"
            round
          >
            维护中
          </el-tag>
          <el-tag
            v-else-if="app.status === 'deprecated'"
            type="danger"
            size="small"
            effect="light"
            round
          >
            已废弃
          </el-tag>
        </div>

        <!-- 开发者 -->
        <p class="text-sm text-gray-500 dark:text-dark-text-secondary mb-3">
          {{ app.developer }}
        </p>

        <!-- 评分 -->
        <div class="flex items-center justify-center space-x-2 mb-3">
          <div class="flex items-center">
            <StarIcon
              v-for="i in 5"
              :key="i"
              class="w-4 h-4"
              :class="i <= Math.floor(app.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'"
            />
          </div>
          <span class="text-sm font-medium text-gray-700 dark:text-dark-text">
            {{ app.rating }}
          </span>
          <span class="text-xs text-gray-500 dark:text-dark-text-secondary">
            ({{ formatDownloadCount(app.downloadCount) }})
          </span>
        </div>
      </div>

      <!-- 应用描述 -->
      <div class="mb-4">
        <p class="text-sm text-gray-600 dark:text-dark-text-secondary line-clamp-2 leading-relaxed text-center">
          {{ app.description }}
        </p>
      </div>

      <!-- 标签 -->
      <div class="flex-1 flex items-end">
        <div class="w-full">
          <div class="flex flex-wrap justify-center gap-2">
            <el-tag
              v-for="tag in app.tags.slice(0, 3)"
              :key="tag"
              size="small"
              effect="light"
              round
              class="text-xs"
            >
              {{ tag }}
            </el-tag>
            <el-tag
              v-if="app.tags.length > 3"
              size="small"
              effect="plain"
              round
              class="text-xs"
            >
              +{{ app.tags.length - 3 }}
            </el-tag>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部操作区域 -->
    <div class="px-6 pb-6 mt-auto">
      <!-- 价格信息 -->
      <div class="text-center mb-4">
        <PriceDisplay :price="app.price" size="medium" />
      </div>

      <!-- 操作按钮 -->
      <div class="flex flex-col space-y-2">
        <!-- 主要操作按钮 -->
        <button
          v-if="!app.isInstalled"
          @click.stop="$emit('purchase', app)"
          class="w-full py-3 px-4 bg-gradient-to-r from-primary-500 to-blue-500 hover:from-primary-600 hover:to-blue-600 text-white font-medium rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          {{ getButtonText() }}
        </button>
        <button
          v-else
          @click.stop="$emit('install-toggle', app.id)"
          class="w-full py-3 px-4 bg-green-500 hover:bg-green-600 text-white font-medium rounded-xl transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <span>已安装</span>
        </button>

        <!-- 次要操作 -->
        <div class="flex space-x-2 hidden">
          <button
            @click.stop="$emit('click', app)"
            class="flex-1 py-2 px-3 text-sm font-medium text-gray-600 dark:text-dark-text-secondary hover:text-primary-600 dark:hover:text-primary-400 bg-gray-100 dark:bg-dark-card hover:bg-gray-200 dark:hover:bg-dark-border rounded-lg transition-all duration-200"
          >
            详情
          </button>
        </div>
      </div>
    </div>

    <!-- 悬停效果遮罩 -->
    <div class="absolute inset-0 bg-gradient-to-t from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"></div>
  </div>
</template>

<script setup lang="ts">
import { HeartIcon, StarIcon } from '@heroicons/vue/24/outline';
import PriceDisplay from './PriceDisplay.vue';
import type { AppInfo } from '~/stores/app-market';
import { BillingMode } from '~/types/billing';

// Props
const props = defineProps<{
  app: AppInfo;
}>();

// Emits
defineEmits<{
  'click': [app: AppInfo];
  'favorite-toggle': [appId: string];
  'install-toggle': [appId: string];
  'purchase': [app: AppInfo];
}>();

// 获取按钮文本
const getButtonText = () => {
  switch (props.app.price.type) {
    case 'free':
      return '安装';
    case BillingMode.ONE_TIME:
      return '购买';
    case 'monthly':
      return '订阅';
    case 'per_use':
      return '充值';
    default:
      return '安装';
  }
};

// 格式化下载量
const formatDownloadCount = (count: number): string => {
  if (count >= 10000) {
    return `${(count / 10000).toFixed(1)}万`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
};
</script>

<style scoped>
.app-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.app-card:hover {
  transform: translateY(-2px);
}

/* 文本截断样式 */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 星级评分动画 */
.star-rating {
  transition: all 0.2s ease;
}

/* 悬停时的微妙动画 */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

/* 价格区域样式优化 */
.price-section {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(147, 51, 234, 0.05) 100%);
}

.dark .price-section {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%);
}
</style>
