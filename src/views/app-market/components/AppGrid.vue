<template>
  <div class="app-grid-container">
    <!-- 加载状态 -->
    <div v-if="loading" class="loading-container">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          v-for="i in 8"
          :key="i"
          class="app-card-skeleton bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-dark-border overflow-hidden"
        >
          <div class="p-6 space-y-4">
            <!-- 图标和标题骨架 -->
            <div class="flex items-start space-x-4">
              <div class="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
              <div class="flex-1 space-y-2">
                <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
              </div>
            </div>
            
            <!-- 描述骨架 -->
            <div class="space-y-2">
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse"></div>
            </div>
            
            <!-- 标签骨架 -->
            <div class="flex space-x-2">
              <div class="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div class="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
          </div>
          
          <!-- 底部操作区骨架 -->
          <div class="px-6 py-4 bg-gray-50 dark:bg-dark-card/50 border-t border-gray-100 dark:border-dark-border">
            <div class="flex items-center justify-between">
              <div class="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div class="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 应用列表 -->
    <div v-else-if="apps.length > 0" class="apps-container">
      <!-- 应用网格 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <AppCard
          v-for="app in currentPageApps"
          :key="app.id"
          :app="app"
          @click="$emit('app-click', app)"
          @favorite-toggle="$emit('favorite-toggle', $event)"
          @install-toggle="$emit('install-toggle', $event)"
          @purchase="$emit('purchase', $event)"
        />
      </div>

      <!-- 分页 -->
      <div v-if="totalPages > 1" class="pagination-container mt-8">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[12, 24, 36, 48]"
          :total="apps.length"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          class="modern-pagination"
        />
      </div>
    </div>

    <!-- 空状态 -->
    <div v-else class="empty-state">
      <div class="text-center py-16">
        <div class="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
          <svg class="w-12 h-12 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8V4a1 1 0 00-1-1H7a1 1 0 00-1 1v1m8 0V4.5"></path>
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 dark:text-dark-text mb-2">
          {{ emptyTitle }}
        </h3>
        <p class="text-gray-500 dark:text-dark-text-secondary max-w-md mx-auto">
          {{ emptyDescription }}
        </p>
        <div class="mt-6">
          <el-button @click="$emit('clear-filters')" type="primary" plain>
            清除筛选条件
          </el-button>
        </div>
      </div>
    </div>

    <!-- 快速返回顶部 -->
    <el-backtop
      :right="40"
      :bottom="40"
      :visibility-height="300"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import AppCard from './AppCard.vue';
import type { AppInfo } from '../../../store/app-market';

// Props
const props = defineProps<{
  apps: AppInfo[];
  loading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
}>();

// Emits
defineEmits<{
  'app-click': [app: AppInfo];
  'favorite-toggle': [appId: string];
  'install-toggle': [appId: string];
  'purchase': [app: AppInfo];
  'clear-filters': [];
}>();

// 分页相关
const currentPage = ref(1);
const pageSize = ref(12);

// 计算属性
const totalPages = computed(() => Math.ceil(props.apps.length / pageSize.value));

const currentPageApps = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return props.apps.slice(start, end);
});

const emptyTitle = computed(() => {
  return props.emptyTitle || '暂无应用';
});

const emptyDescription = computed(() => {
  return props.emptyDescription || '当前筛选条件下没有找到相关应用，请尝试调整筛选条件或搜索关键词。';
});

// 方法
const handleSizeChange = (newSize: number) => {
  pageSize.value = newSize;
  currentPage.value = 1; // 重置到第一页
};

const handleCurrentChange = (newPage: number) => {
  currentPage.value = newPage;
  // 滚动到顶部
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// 监听应用列表变化，重置分页
watch(
  () => props.apps.length,
  () => {
    currentPage.value = 1;
  }
);
</script>

<style scoped>
.app-grid-container {
  @apply min-h-[400px];
}

/* 骨架屏动画 */
.app-card-skeleton {
  animation: skeleton-loading 1.5s ease-in-out infinite alternate;
}

@keyframes skeleton-loading {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0.7;
  }
}

/* 现代化分页样式 - 与其他页面保持一致 */
.modern-pagination :deep(.el-pagination) {
  justify-content: flex-end;
}

.modern-pagination :deep(.el-pagination__sizes) {
  margin-right: 16px;
}

.modern-pagination :deep(.el-pagination__total) {
  margin-right: auto;
}

/* 空状态动画 */
.empty-state {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 网格响应式调整 */
@media (max-width: 640px) {
  .grid {
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 1rem;
  }
}

@media (min-width: 641px) and (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.5rem;
  }
}

@media (min-width: 1025px) and (max-width: 1280px) {
  .grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (min-width: 1281px) {
  .grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

/* 卡片进入动画 */
.apps-container .grid > * {
  animation: slideInUp 0.6s ease-out;
  animation-fill-mode: both;
}

.apps-container .grid > *:nth-child(1) { animation-delay: 0.1s; }
.apps-container .grid > *:nth-child(2) { animation-delay: 0.2s; }
.apps-container .grid > *:nth-child(3) { animation-delay: 0.3s; }
.apps-container .grid > *:nth-child(4) { animation-delay: 0.4s; }
.apps-container .grid > *:nth-child(5) { animation-delay: 0.5s; }
.apps-container .grid > *:nth-child(6) { animation-delay: 0.6s; }
.apps-container .grid > *:nth-child(7) { animation-delay: 0.7s; }
.apps-container .grid > *:nth-child(8) { animation-delay: 0.8s; }

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
