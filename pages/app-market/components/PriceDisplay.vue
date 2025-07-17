<template>
  <div class="price-display" :class="sizeClasses">
    <!-- 免费应用 -->
    <div v-if="price.type === 'free'" class="space-y-1 flex flex-col items-center">
      <div class="flex items-baseline space-x-2">
      <span class="price-text text-green-600 dark:text-green-400 font-bold">
        免费
      </span>
      <el-tag type="success" size="small" effect="plain" v-if="size !== 'small'">
        FREE
      </el-tag>
      </div>
    </div>

    <!-- 一口价 -->
    <div v-else-if="price.type === BillingMode.ONE_TIME" class="space-y-1 flex flex-col items-center">
      <div class="flex items-baseline space-x-2">
        <span class="price-text text-primary-600 dark:text-primary-400 font-bold">
          ¥{{ price.amount }}
        </span>
        <span v-if="price.originalAmount && price.originalAmount > price.amount" 
              class="original-price text-gray-400 dark:text-gray-500 line-through text-sm">
          ¥{{ price.originalAmount }}
        </span>
      </div>
      <div class="price-desc text-gray-500 dark:text-dark-text-secondary">
        一次购买，终身使用
      </div>
      <!-- 折扣标识 -->
      <el-tag 
        v-if="price.originalAmount && price.originalAmount > price.amount && size !== 'small'"
        type="danger" 
        size="small" 
        effect="plain"
        class="discount-tag"
      >
        {{ Math.round((1 - price.amount / price.originalAmount) * 100) }}% OFF
      </el-tag>
    </div>

    <!-- 包月订阅 -->
    <div v-else-if="price.type === 'monthly'" class="space-y-1 flex flex-col items-center">
      <div class="flex items-baseline space-x-2">
        <span class="price-text text-purple-600 dark:text-purple-400 font-bold">
          ¥{{ price.amount }}
        </span>
        <span class="price-unit text-gray-500 dark:text-dark-text-secondary">
          {{ price.unit || '/月' }}
        </span>
        <span v-if="price.originalAmount && price.originalAmount > price.amount" 
              class="original-price text-gray-400 dark:text-gray-500 line-through text-sm">
          ¥{{ price.originalAmount }}
        </span>
      </div>
      <div class="price-desc text-gray-500 dark:text-dark-text-secondary">
        {{ price.description || '按月订阅，随时取消' }}
      </div>
      <!-- 折扣标识 -->
      <el-tag 
        v-if="price.originalAmount && price.originalAmount > price.amount && size !== 'small'"
        type="warning" 
        size="small" 
        effect="plain"
        class="discount-tag"
      >
        限时优惠
      </el-tag>
    </div>

    <!-- 按次计费 -->
    <div v-else-if="price.type === 'per_use'" class="space-y-1 flex flex-col items-center">
      <div class="flex items-baseline space-x-2">
        <span class="price-text text-orange-600 dark:text-orange-400 font-bold">
          ¥{{ price.amount }}
        </span>
        <span class="price-unit text-gray-500 dark:text-dark-text-secondary">
          {{ price.unit || '/次' }}
        </span>
      </div>
      <div class="price-desc text-gray-500 dark:text-dark-text-secondary">
        {{ price.description || '按使用次数计费' }}
      </div>
      <el-tag 
        v-if="size !== 'small'"
        type="info" 
        size="small" 
        effect="plain"
      >
        按需付费
      </el-tag>
    </div>

    <!-- 未知价格类型 -->
    <div v-else class="space-y-1">
      <span class="price-text text-gray-600 dark:text-gray-400">
        价格待定
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { PriceInfo } from '~/stores/app-market';
import { BillingMode } from '~/types/billing';

// Props
const props = defineProps<{
  price: PriceInfo;
  size?: 'small' | 'medium' | 'large';
  showDescription?: boolean;
}>();

// 计算尺寸相关的CSS类
const sizeClasses = computed(() => {
  const size = props.size || 'medium';
  
  switch (size) {
    case 'small':
      return 'price-small';
    case 'large':
      return 'price-large';
    default:
      return 'price-medium';
  }
});
</script>

<style scoped>
.price-display {
  @apply flex flex-col;
}

/* 小尺寸样式 */
.price-small {
  @apply space-y-0;
}

.price-small .price-text {
  @apply text-sm;
}

.price-small .price-unit {
  @apply text-xs;
}

.price-small .price-desc {
  @apply text-xs hidden;
}

.price-small .original-price {
  @apply text-xs;
}

/* 中等尺寸样式 */
.price-medium {
  @apply space-y-1;
}

.price-medium .price-text {
  @apply text-base;
}

.price-medium .price-unit {
  @apply text-sm;
}

.price-medium .price-desc {
  @apply text-xs;
}

.price-medium .original-price {
  @apply text-sm;
}

/* 大尺寸样式 */
.price-large {
  @apply space-y-2;
}

.price-large .price-text {
  @apply text-xl;
}

.price-large .price-unit {
  @apply text-base;
}

.price-large .price-desc {
  @apply text-sm;
}

.price-large .original-price {
  @apply text-base;
}

/* 折扣标签动画 */
.discount-tag {
  @apply animate-pulse;
  animation-duration: 2s;
}

/* 价格文本渐变效果 */
.price-text {
  background: linear-gradient(135deg, currentColor 0%, currentColor 100%);
  background-clip: text;
  -webkit-background-clip: text;
}

/* 悬停效果 */
.price-display:hover .price-text {
  @apply transform scale-105 transition-transform duration-200;
}

/* 原价删除线样式 */
.original-price {
  position: relative;
}

.original-price::after {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  height: 1px;
  background: currentColor;
  transform: translateY(-50%);
}

/* 响应式调整 */
@media (max-width: 640px) {
  .price-medium {
    @apply space-y-0;
  }
  
  .price-medium .price-desc {
    @apply hidden;
  }
  
  .price-large {
    @apply space-y-1;
  }
  
  .price-large .price-desc {
    @apply text-xs;
  }
}
</style>
