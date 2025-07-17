<template>
  <div class="space-y-8">
    <!-- 页面标题 -->
    <div class="bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 rounded-2xl p-6 border border-primary-100 dark:border-primary-800">
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
          </svg>
        </div>
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-dark-text">应用市场</h1>
          <p class="mt-1 text-sm text-gray-600 dark:text-dark-text-secondary">发现、安装和管理您的应用工具</p>
        </div>
      </div>
    </div>

    <!-- 分类导航 -->
    <div class="bg-white dark:bg-dark-card rounded-2xl shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border p-6">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-bold text-gray-900 dark:text-dark-text flex items-center">
          <svg class="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
          </svg>
          应用分类
        </h2>
        <div class="text-sm text-gray-500 dark:text-dark-text-secondary">
          {{ filteredApps.length }} / {{ totalApps }} 个应用
        </div>
      </div>

      <!-- 分类标签 -->
      <div class="flex flex-wrap gap-3">
        <button
          @click="selectedCategory = ''; handleCategoryChange()"
          :class="[
            'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105',
            selectedCategory === ''
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
              : 'bg-gray-100 dark:bg-dark-surface text-gray-700 dark:text-dark-text hover:bg-gray-200 dark:hover:bg-dark-border'
          ]"
        >
          <svg class="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
          </svg>
          全部应用
          <span class="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">{{ totalApps }}</span>
        </button>

        <button
          v-for="category in categoryOptions"
          :key="category.value"
          @click="selectedCategory = category.value; handleCategoryChange()"
          :class="[
            'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105 flex items-center',
            selectedCategory === category.value
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
              : 'bg-gray-100 dark:bg-dark-surface text-gray-700 dark:text-dark-text hover:bg-gray-200 dark:hover:bg-dark-border'
          ]"
        >
          <component :is="category.icon" class="w-4 h-4 mr-2" />
          {{ category.label }}
          <span class="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">{{ getCategoryCount(category.value) }}</span>
        </button>
      </div>
    </div>

    <!-- 搜索和筛选区域 -->
    <div class="bg-white dark:bg-dark-card rounded-2xl shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border p-6">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <!-- 搜索框 -->
        <div class="flex-1 max-w-2xl">
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <MagnifyingGlassIcon class="w-5 h-5 text-gray-400" />
            </div>
            <input
              v-model="searchKeyword"
              @input="handleSearch"
              type="text"
              placeholder="搜索应用名称、描述或标签..."
              class="w-full pl-12 pr-12 py-4 bg-gray-50 dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-dark-text hover:border-gray-300 dark:hover:border-dark-text-secondary"
            />
            <button
              v-if="searchKeyword"
              @click="searchKeyword = ''; handleSearch()"
              class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- 筛选器 -->
        <div class="flex flex-wrap items-end gap-4 sm:gap-6">
          <!-- 价格类型筛选 -->
          <div class="flex flex-col">
            <el-select
              v-model="selectedPriceType"
              @change="handlePriceTypeChange"
              placeholder="全部价格"
              clearable
              class="app-market-select"
              style="width: 140px; min-width: 120px"
            >
              <el-option
                v-for="priceType in priceTypeOptions"
                :key="priceType.value"
                :label="priceType.label"
                :value="priceType.value"
              />
            </el-select>
          </div>

          <!-- 评分筛选 -->
          <div class="flex flex-col">
            <el-select
              v-model="selectedRating"
              @change="handleRatingChange"
              placeholder="全部评分"
              clearable
              class="app-market-select"
              style="width: 140px; min-width: 120px"
            >
              <el-option label="4星以上" :value="4" />
              <el-option label="3星以上" :value="3" />
              <el-option label="2星以上" :value="2" />
            </el-select>
          </div>

          <!-- 排序 -->
          <div class="flex items-center space-x-2">
            <div class="flex flex-col">
              <el-select
                v-model="sortBy"
                @change="handleSortChange"
                class="app-market-select"
                style="width: 140px; min-width: 120px"
              >
                <el-option label="按名称" value="name" />
                <el-option label="按评分" value="rating" />
                <el-option label="按下载量" value="downloadCount" />
                <el-option label="按更新时间" value="lastUpdated" />
                <el-option label="按价格" value="price" />
              </el-select>
            </div>
            <button
              @click="toggleSortOrder"
              class="p-3 rounded-xl bg-gray-50 dark:bg-dark-surface hover:bg-gray-100 dark:hover:bg-dark-border transition-all duration-200 border border-gray-200 dark:border-dark-border transform hover:scale-105"
              :title="sortOrder === 'asc' ? '升序' : '降序'"
            >
              <component :is="sortOrder === 'asc' ? ArrowUpIcon : ArrowDownIcon" class="w-4 h-4 text-gray-600 dark:text-dark-text-secondary" />
            </button>
          </div>

          <!-- 清除筛选 -->
          <button
            @click="clearAllFilters"
            class="px-4 py-3 text-sm font-medium text-gray-600 dark:text-dark-text-secondary hover:text-purple-600 dark:hover:text-purple-400 bg-gray-50 dark:bg-dark-surface hover:bg-gray-100 dark:hover:bg-dark-border rounded-xl transition-all duration-200 border border-gray-200 dark:border-dark-border transform hover:scale-105"
          >
            <svg class="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
            清除筛选
          </button>
        </div>
      </div>
    </div>

    <!-- 标签页 -->
    <div class="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-100 dark:border-dark-border overflow-hidden">
      <el-tabs v-model="activeTab" class="app-market-tabs">
        <el-tab-pane label="全部应用" name="all">
          <AppGrid
            :apps="filteredApps"
            :loading="loading"
            @app-click="handleAppClick"
            @favorite-toggle="handleFavoriteToggle"
            @install-toggle="handleInstallToggle"
            @purchase="handlePurchase"
          />
        </el-tab-pane>
        <el-tab-pane name="favorites">
          <template #label>
            <span class="flex items-center">
              我的收藏
              <el-badge :value="favoriteCount" :hidden="favoriteCount === 0" class="ml-2" />
            </span>
          </template>
          <AppGrid
            :apps="favoriteApps"
            :loading="loading"
            @app-click="handleAppClick"
            @favorite-toggle="handleFavoriteToggle"
            @install-toggle="handleInstallToggle"
            @purchase="handlePurchase"
          />
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 应用详情弹窗 -->
    <AppDetailsDialog
      v-model="showDetailsDialog"
      :app="selectedApp"
      @favorite-toggle="handleFavoriteToggle"
      @install-toggle="handleInstallToggle"
    />

    <!-- 购买弹窗 -->
    <PurchaseDialog
      v-model="showPurchaseDialog"
      :app="selectedPurchaseApp"
      @purchase-success="handlePurchaseSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import {
  MagnifyingGlassIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  PhotoIcon,
  ChartBarIcon,
  MagnifyingGlassCircleIcon,
  PresentationChartLineIcon,
  Cog6ToothIcon,
  BoltIcon,
  PencilIcon
} from '@heroicons/vue/24/outline';
import AppGrid from './components/AppGrid.vue';
import AppDetailsDialog from './components/AppDetailsDialog.vue';
import PurchaseDialog from './components/PurchaseDialog.vue';
import {
  initAppMarket,
  getAllApps,
  getFavoriteApps,
  getFilteredApps,
  setFilter,
  clearFilter,
  toggleFavorite,
  toggleInstall,
  getAppById,
  appMarketStore,
  AppCategory,
  PriceType,
  type AppInfo,
  type FilterOptions
} from '~/stores/app-market';

// 响应式数据
const activeTab = ref('all');
const searchKeyword = ref('');
const selectedCategory = ref('');
const selectedPriceType = ref('');
const selectedRating = ref<number | ''>('');
const sortBy = ref('name');
const sortOrder = ref<'asc' | 'desc'>('asc');
const showDetailsDialog = ref(false);
const selectedApp = ref<AppInfo | null>(null);
const showPurchaseDialog = ref(false);
const selectedPurchaseApp = ref<AppInfo | null>(null);

// 计算属性
const loading = computed(() => appMarketStore.loading.value);
const totalApps = computed(() => getAllApps().length);
const favoriteCount = computed(() => getFavoriteApps.value.length);

const filteredApps = computed(() => getFilteredApps.value);
const favoriteApps = computed(() => getFavoriteApps.value);

// 分类选项
const categoryOptions = computed(() => [
  { label: '图像处理', value: AppCategory.IMAGE_PROCESSING, icon: PhotoIcon },
  { label: '数据分析', value: AppCategory.DATA_ANALYSIS, icon: ChartBarIcon },
  { label: 'SEO工具', value: AppCategory.SEO_TOOLS, icon: MagnifyingGlassCircleIcon },
  { label: '市场分析', value: AppCategory.MARKET_ANALYSIS, icon: PresentationChartLineIcon },
  { label: '管理工具', value: AppCategory.MANAGEMENT_TOOLS, icon: Cog6ToothIcon },
  { label: '自动化工具', value: AppCategory.AUTOMATION, icon: BoltIcon },
  { label: '内容创作', value: AppCategory.CONTENT_CREATION, icon: PencilIcon }
]);

// 价格类型选项
const priceTypeOptions = computed(() => [
  { label: '免费', value: PriceType.FREE },
  { label: '一口价', value: PriceType.ONE_TIME },
  { label: '包月', value: PriceType.MONTHLY },
  { label: '按次计费', value: PriceType.PER_USE }
]);

// 方法
const handleSearch = () => {
  updateFilter();
};

const handleCategoryChange = () => {
  updateFilter();
};

const handlePriceTypeChange = (value: string | undefined) => {
  // Element UI 清空时会传入 undefined，需要转换为空字符串
  if (value === undefined) {
    selectedPriceType.value = '';
  }
  updateFilter();
};

const handleRatingChange = (value: number | undefined) => {
  // Element UI 清空时会传入 undefined，需要转换为空字符串
  if (value === undefined) {
    selectedRating.value = '';
  }
  updateFilter();
};

const handleSortChange = () => {
  updateFilter();
};

const toggleSortOrder = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  updateFilter();
};

const updateFilter = () => {
  const filter: FilterOptions = {
    searchKeyword: searchKeyword.value || undefined,
    category: selectedCategory.value as AppCategory || undefined,
    priceType: selectedPriceType.value as PriceType || undefined,
    rating: selectedRating.value as number || undefined,
    sortBy: sortBy.value as any,
    sortOrder: sortOrder.value
  };
  setFilter(filter);
};

const clearAllFilters = () => {
  searchKeyword.value = '';
  selectedCategory.value = '';
  selectedPriceType.value = '';
  selectedRating.value = '';
  sortBy.value = 'name';
  sortOrder.value = 'asc';
  clearFilter();
};

const handleAppClick = (app: AppInfo) => {
  selectedApp.value = app;
  showDetailsDialog.value = true;
};

const handleFavoriteToggle = (appId: string) => {
  const isFavorited = toggleFavorite(appId);
  const app = getAppById(appId);
  if (app) {
    ElMessage.success(
      isFavorited ? `已收藏 ${app.name}` : `已取消收藏 ${app.name}`
    );
  }
};

const handleInstallToggle = (appId: string) => {
  const isInstalled = toggleInstall(appId);
  const app = getAppById(appId);
  if (app) {
    ElMessage.success(
      isInstalled ? `已安装 ${app.name}` : `已卸载 ${app.name}`
    );
  }
};

const handlePurchase = (app: AppInfo) => {
  selectedPurchaseApp.value = app;
  showPurchaseDialog.value = true;
};

const handlePurchaseSuccess = (appId: string) => {
  // 购买成功后自动安装应用
  handleInstallToggle(appId);
  showPurchaseDialog.value = false;
};

// 获取分类应用数量
const getCategoryCount = (category: string) => {
  if (!category) return totalApps.value;
  return getAllApps().filter(app => app.category === category).length;
};



// 生命周期
onMounted(() => {
  initAppMarket();
});
</script>

<style scoped>
/* 应用市场标签页样式 */
:deep(.app-market-tabs) {
  .el-tabs__header {
    margin: 0;
    border-bottom: 1px solid var(--el-border-color-light);
    background: transparent;
  }

  .el-tabs__nav-wrap {
    padding: 0 24px;
  }

  .el-tabs__item {
    height: 48px;
    line-height: 48px;
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
    padding: 24px;
  }
}

/* 暗黑模式适配 */
.dark :deep(.app-market-tabs) {
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

/* 筛选器样式 */
.filter-group {
  @apply flex flex-col space-y-2;
}

.filter-label {
  @apply text-sm font-medium text-gray-700 dark:text-dark-text-secondary;
}

/* Element UI Select 样式定制 */
.app-market-select :deep(.el-select__wrapper) {
  @apply bg-gray-50 dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl;
  @apply hover:border-gray-300 dark:hover:border-dark-text-secondary;
  @apply focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20;
  @apply transition-all duration-200;
  @apply shadow-sm hover:shadow-md;
  height: 44px;
  padding: 0 12px;
}

.app-market-select :deep(.el-select__wrapper.is-focused) {
  @apply border-purple-500 ring-2 ring-purple-500/20;
  @apply shadow-lg;
  @apply bg-white dark:bg-dark-card;
}

.app-market-select :deep(.el-select__wrapper.is-hovering) {
  @apply bg-gray-100 dark:bg-dark-border;
}

.app-market-select :deep(.el-select__placeholder) {
  @apply text-gray-500 dark:text-dark-text-secondary text-sm;
}

.app-market-select :deep(.el-select__selected-item) {
  @apply text-gray-900 dark:text-dark-text text-sm font-medium;
}

.app-market-select :deep(.el-select__caret) {
  @apply text-gray-400 dark:text-dark-text-secondary;
  @apply transition-transform duration-200;
}

.app-market-select :deep(.el-select__wrapper.is-focused .el-select__caret) {
  @apply text-purple-500;
}

.app-market-select :deep(.el-select__clear) {
  @apply text-gray-400 dark:text-dark-text-secondary hover:text-gray-600 dark:hover:text-dark-text;
  @apply transition-colors duration-200;
}

/* Element UI Select 下拉菜单样式 */
:deep(.el-select-dropdown) {
  @apply bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl shadow-xl;
  @apply mt-2;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

:deep(.el-select-dropdown__item) {
  @apply text-gray-900 dark:text-dark-text text-sm;
  @apply hover:bg-gray-50 dark:hover:bg-dark-border;
  @apply px-4 py-3;
  @apply transition-all duration-200;
  @apply cursor-pointer;
  border-radius: 8px;
  margin: 2px 4px;
}

:deep(.el-select-dropdown__item.is-selected) {
  @apply bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20;
  @apply text-purple-600 dark:text-purple-400;
  @apply font-medium;
  @apply shadow-sm;
}

:deep(.el-select-dropdown__item.is-hovering) {
  @apply bg-gray-50 dark:bg-dark-border;
  @apply transform scale-[1.02];
}

:deep(.el-select-dropdown__item.is-selected.is-hovering) {
  @apply bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-800/30 dark:to-pink-800/30;
}

/* 移动端响应式样式 */
@media (max-width: 640px) {
  .app-market-select {
    width: 100% !important;
    min-width: unset !important;
  }

  .app-market-select :deep(.el-select__wrapper) {
    width: 100%;
  }
}

/* 优雅阴影效果 */
.shadow-elegant {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.shadow-elegant-dark {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2);
}

/* 分类按钮动画效果 */
.category-button {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.category-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.category-button.active {
  transform: translateY(-1px);
  box-shadow: 0 10px 30px rgba(147, 51, 234, 0.3);
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .grid-cols-1.md\\:grid-cols-3 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .grid-cols-1.md\\:grid-cols-3 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
</style>
