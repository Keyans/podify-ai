<template>
  <el-dialog
    v-model="dialogVisible"
    :title="app?.name || '应用详情'"
    width="900px"
    align-center
    :close-on-click-modal="false"
    class="app-details-dialog"
  >
    <div v-if="app" class="app-details-content">
      <!-- 应用基本信息 -->
      <div class="app-header flex items-start space-x-6 mb-6">
        <!-- 应用图标 -->
        <div class="flex-shrink-0">
          <div class="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 rounded-2xl flex items-center justify-center text-3xl font-bold border border-primary-200 dark:border-primary-700">
            {{ app.icon }}
          </div>
        </div>

        <!-- 应用信息 -->
        <div class="flex-1 min-w-0">
          <div class="flex items-center space-x-3 mb-2">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-dark-text">
              {{ app.name }}
            </h2>
            <!-- 状态标识 -->
            <el-tag
              v-if="app.status === 'maintenance'"
              type="warning"
              effect="plain"
            >
              维护中
            </el-tag>
            <el-tag
              v-else-if="app.status === 'deprecated'"
              type="danger"
              effect="plain"
            >
              已废弃
            </el-tag>
          </div>
          
          <p class="text-gray-600 dark:text-dark-text-secondary mb-3">
            {{ app.developer }} • v{{ app.version }}
          </p>
          
          <!-- 评分和统计 -->
          <div class="flex items-center space-x-6 text-sm mb-4">
            <div class="flex items-center space-x-2">
              <div class="flex items-center">
                <StarIcon
                  v-for="i in 5"
                  :key="i"
                  class="w-5 h-5"
                  :class="i <= Math.floor(app.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'"
                />
              </div>
              <span class="font-medium text-gray-900 dark:text-dark-text">
                {{ app.rating }}
              </span>
              <span class="text-gray-500 dark:text-dark-text-secondary">
                ({{ app.reviewCount }} 评价)
              </span>
            </div>
            <div class="text-gray-500 dark:text-dark-text-secondary">
              {{ formatDownloadCount(app.downloadCount) }} 次使用
            </div>
            <div class="text-gray-500 dark:text-dark-text-secondary">
              更新于 {{ formatDate(app.lastUpdated) }}
            </div>
          </div>

          <!-- 标签 -->
          <div class="flex flex-wrap gap-2">
            <el-tag
              v-for="tag in app.tags"
              :key="tag"
              size="small"
              effect="plain"
            >
              {{ tag }}
            </el-tag>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="flex-shrink-0 space-y-3">
          <div class="text-right">
            <PriceDisplay :price="app.price" size="large" />
          </div>
          <div class="flex flex-col space-y-2">
            <!-- 购买/安装按钮 -->
            <el-button
              v-if="!app.isInstalled"
              @click="showPurchaseDialog = true"
              type="primary"
              size="large"
              class="w-full"
            >
              {{ getPrimaryButtonText() }}
            </el-button>
            <el-button
              v-else
              @click="$emit('install-toggle', app.id)"
              type="success"
              plain
              size="large"
              class="w-full"
            >
              已安装
            </el-button>

            <!-- 收藏按钮 -->
            <el-button
              @click="$emit('favorite-toggle', app.id)"
              :type="app.isFavorited ? 'danger' : 'default'"
              :plain="!app.isFavorited"
              size="large"
              class="w-full !ml-0"
            >
              <HeartIcon class="w-4 h-4 mr-2" :class="app.isFavorited ? 'fill-current' : ''" />
              {{ app.isFavorited ? '已收藏' : '收藏' }}
            </el-button>
          </div>
        </div>
      </div>

      <!-- 详细内容标签页 -->
      <el-tabs v-model="activeTab" class="app-details-tabs">
        <!-- 应用介绍 -->
        <el-tab-pane label="应用介绍" name="overview">
          <div class="space-y-6">
            <!-- 应用描述 -->
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-dark-text mb-3">
                应用简介
              </h3>
              <p class="text-gray-600 dark:text-dark-text-secondary leading-relaxed">
                {{ app.longDescription || app.description }}
              </p>
            </div>

            <!-- 功能特性 -->
            <div v-if="app.features && app.features.length > 0">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-dark-text mb-3">
                主要功能
              </h3>
              <ul class="space-y-2">
                <li
                  v-for="feature in app.features"
                  :key="feature"
                  class="flex items-center space-x-3"
                >
                  <CheckIcon class="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span class="text-gray-600 dark:text-dark-text-secondary">{{ feature }}</span>
                </li>
              </ul>
            </div>

            <!-- 使用要求 -->
            <div v-if="app.requirements && app.requirements.length > 0">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-dark-text mb-3">
                使用要求
              </h3>
              <ul class="space-y-2">
                <li
                  v-for="requirement in app.requirements"
                  :key="requirement"
                  class="flex items-center space-x-3"
                >
                  <InformationCircleIcon class="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <span class="text-gray-600 dark:text-dark-text-secondary">{{ requirement }}</span>
                </li>
              </ul>
            </div>
          </div>
        </el-tab-pane>

        <!-- 应用截图 -->
        <el-tab-pane label="应用截图" name="screenshots">
          <div v-if="app.screenshots && app.screenshots.length > 0" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                v-for="(screenshot, index) in app.screenshots"
                :key="index"
                class="relative group cursor-pointer"
                @click="previewImage(screenshot, index)"
              >
                <img
                  :src="screenshot"
                  :alt="`应用截图 ${index + 1}`"
                  class="w-full h-48 object-cover rounded-lg border border-gray-200 dark:border-dark-border group-hover:border-primary-300 dark:group-hover:border-primary-600 transition-colors duration-200"
                />
                <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 rounded-lg flex items-center justify-center">
                  <EyeIcon class="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </div>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-12">
            <PhotoIcon class="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p class="text-gray-500 dark:text-dark-text-secondary">暂无应用截图</p>
          </div>
        </el-tab-pane>

        <!-- 用户评价 -->
        <el-tab-pane label="用户评价" name="reviews">
          <div class="space-y-6">
            <!-- 评分统计 -->
            <div class="bg-gray-50 dark:bg-dark-card rounded-lg p-6">
              <div class="flex items-center space-x-8">
                <div class="text-center">
                  <div class="text-3xl font-bold text-gray-900 dark:text-dark-text">
                    {{ app.rating }}
                  </div>
                  <div class="flex items-center justify-center mt-1">
                    <StarIcon
                      v-for="i in 5"
                      :key="i"
                      class="w-4 h-4"
                      :class="i <= Math.floor(app.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'"
                    />
                  </div>
                  <div class="text-sm text-gray-500 dark:text-dark-text-secondary mt-1">
                    {{ app.reviewCount }} 条评价
                  </div>
                </div>
                
                <!-- 评分分布 -->
                <div class="flex-1 space-y-2">
                  <div v-for="star in [5, 4, 3, 2, 1]" :key="star" class="flex items-center space-x-3">
                    <span class="text-sm text-gray-600 dark:text-dark-text-secondary w-8">
                      {{ star }}星
                    </span>
                    <div class="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        class="bg-yellow-400 h-2 rounded-full"
                        :style="{ width: `${getStarPercentage(star)}%` }"
                      ></div>
                    </div>
                    <span class="text-sm text-gray-500 dark:text-dark-text-secondary w-8">
                      {{ getStarPercentage(star) }}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 评价列表 -->
            <div class="space-y-4">
              <div
                v-for="review in mockReviews"
                :key="review.id"
                class="border border-gray-200 dark:border-dark-border rounded-lg p-4"
              >
                <div class="flex items-start space-x-4">
                  <div class="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                    {{ review.user.charAt(0) }}
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center space-x-3 mb-2">
                      <span class="font-medium text-gray-900 dark:text-dark-text">
                        {{ review.user }}
                      </span>
                      <div class="flex items-center">
                        <StarIcon
                          v-for="i in 5"
                          :key="i"
                          class="w-4 h-4"
                          :class="i <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'"
                        />
                      </div>
                      <span class="text-sm text-gray-500 dark:text-dark-text-secondary">
                        {{ review.date }}
                      </span>
                    </div>
                    <p class="text-gray-600 dark:text-dark-text-secondary leading-relaxed">
                      {{ review.content }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 图片预览 -->
    <el-image-viewer
      v-if="showImageViewer"
      :url-list="app?.screenshots || []"
      :initial-index="currentImageIndex"
      @close="showImageViewer = false"
    />

    <!-- 购买弹窗 -->
    <PurchaseDialog
      v-model="showPurchaseDialog"
      :app="app"
      @purchase-success="handlePurchaseSuccess"
    />
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import {
  StarIcon,
  HeartIcon,
  CheckIcon,
  InformationCircleIcon,
  EyeIcon,
  PhotoIcon
} from '@heroicons/vue/24/outline';
import PriceDisplay from './PriceDisplay.vue';
import PurchaseDialog from './PurchaseDialog.vue';
import type { AppInfo } from '../../../store/app-market';
import { BillingMode } from '../../../types/billing';

// Props
const props = defineProps<{
  modelValue: boolean;
  app: AppInfo | null;
}>();

// Emits
const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  'favorite-toggle': [appId: string];
  'install-toggle': [appId: string];
}>();

// 响应式数据
const activeTab = ref('overview');
const showImageViewer = ref(false);
const currentImageIndex = ref(0);
const showPurchaseDialog = ref(false);

// 计算属性
const dialogVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

// 模拟评价数据
const mockReviews = ref([
  {
    id: 1,
    user: '张三',
    rating: 5,
    date: '2024-01-15',
    content: '非常好用的工具，界面简洁，功能强大，大大提高了工作效率！'
  },
  {
    id: 2,
    user: '李四',
    rating: 4,
    date: '2024-01-12',
    content: '整体不错，就是有些功能还需要完善，期待后续更新。'
  },
  {
    id: 3,
    user: '王五',
    rating: 5,
    date: '2024-01-10',
    content: '强烈推荐！客服响应也很及时，解决问题很专业。'
  }
]);

// 方法
const formatDownloadCount = (count: number): string => {
  if (count >= 10000) {
    return `${(count / 10000).toFixed(1)}万`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
};

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('zh-CN');
};

const getStarPercentage = (star: number): number => {
  // 模拟评分分布
  const distribution: Record<number, number> = {
    5: 65,
    4: 20,
    3: 10,
    2: 3,
    1: 2
  };
  return distribution[star] || 0;
};

const getPrimaryButtonText = () => {
  if (!props.app) return '立即安装';

  switch (props.app.price.type) {
    case 'free':
      return '立即安装';
    case BillingMode.ONE_TIME:
      return `立即购买 ¥${props.app.price.amount}`;
    case 'monthly':
      return `立即订阅 ¥${props.app.price.amount}/月`;
    case 'per_use':
      return '立即充值';
    default:
      return '立即安装';
  }
};

const previewImage = (_url: string, index: number) => {
  currentImageIndex.value = index;
  showImageViewer.value = true;
};

const handlePurchaseSuccess = (appId: string) => {
  // 购买成功后自动安装应用
  emit('install-toggle', appId);
  showPurchaseDialog.value = false;
};
</script>

<style scoped>
/* 应用详情弹窗样式 */
:deep(.app-details-dialog) {
  .el-dialog__header {
    padding: 24px 24px 0;
    border-bottom: 1px solid var(--el-border-color-light);
  }

  .el-dialog__body {
    padding: 24px;
    max-height: 70vh;
    overflow-y: auto;
  }

  .el-dialog__title {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--el-text-color-primary);
  }
}

/* 标签页样式 */
:deep(.app-details-tabs) {
  .el-tabs__header {
    margin: 0 0 24px 0;
    border-bottom: 1px solid var(--el-border-color-light);
  }

  .el-tabs__item {
    height: 44px;
    line-height: 44px;
    font-weight: 500;
    color: var(--el-text-color-regular);
    border-bottom: 2px solid transparent;
    transition: all 0.3s ease;
  }

  .el-tabs__item:hover {
    color: var(--el-color-primary);
  }

  .el-tabs__item.is-active {
    color: var(--el-color-primary);
    border-bottom-color: var(--el-color-primary);
  }

  .el-tabs__content {
    padding: 0;
  }
}

/* 暗黑模式适配 */
.dark :deep(.app-details-dialog) {
  .el-dialog__header {
    border-bottom-color: var(--el-border-color-dark);
  }
}

.dark :deep(.app-details-tabs) {
  .el-tabs__header {
    border-bottom-color: var(--el-border-color-dark);
  }

  .el-tabs__item {
    color: var(--el-text-color-regular);
  }

  .el-tabs__item:hover,
  .el-tabs__item.is-active {
    color: var(--el-color-primary);
  }
}

/* 应用头部样式 */
.app-header {
  border-bottom: 1px solid var(--el-border-color-light);
  padding-bottom: 24px;
}

.dark .app-header {
  border-bottom-color: var(--el-border-color-dark);
}

/* 功能列表样式 */
.feature-list {
  @apply space-y-3;
}

.feature-item {
  @apply flex items-start space-x-3 p-3 rounded-lg;
  @apply bg-gray-50;
}

.dark .feature-item {
  @apply bg-gray-800;
}

/* 评分分布条样式 */
.rating-bar {
  transition: width 0.6s ease-in-out;
}

/* 评价卡片样式 */
.review-card {
  @apply border rounded-lg p-4 transition-shadow duration-200;
  @apply border-gray-200 hover:shadow-md;
}

.dark .review-card {
  @apply border-gray-700;
}

/* 截图网格样式 */
.screenshot-grid {
  @apply grid grid-cols-1 md:grid-cols-2 gap-4;
}

.screenshot-item {
  @apply relative cursor-pointer overflow-hidden rounded-lg;
}

.screenshot-item:hover .screenshot-overlay {
  @apply bg-black bg-opacity-20;
}

.screenshot-overlay {
  @apply absolute inset-0 bg-black bg-opacity-0 transition-all duration-300 flex items-center justify-center;
}

/* 滚动条样式 */
.app-details-content {
  scrollbar-width: thin;
  scrollbar-color: var(--el-color-primary-light-5) transparent;
}

.app-details-content::-webkit-scrollbar {
  width: 6px;
}

.app-details-content::-webkit-scrollbar-track {
  background: transparent;
}

.app-details-content::-webkit-scrollbar-thumb {
  background: var(--el-color-primary-light-5);
  border-radius: 3px;
}

.app-details-content::-webkit-scrollbar-thumb:hover {
  background: var(--el-color-primary-light-3);
}

/* 动画效果 */
.app-details-content {
  animation: fadeInUp 0.4s ease-out;
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

/* 响应式调整 */
@media (max-width: 768px) {
  .app-header {
    @apply flex-col space-x-0 space-y-4;
  }

  .screenshot-grid {
    @apply grid-cols-1;
  }

  :deep(.app-details-dialog) {
    .el-dialog {
      width: 95% !important;
      margin: 5vh auto !important;
    }

    .el-dialog__body {
      padding: 16px;
      max-height: 80vh;
    }
  }
}
</style>
