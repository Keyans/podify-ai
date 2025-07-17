<template>
  <div class="space-y-4">
    <!-- 商品采集特定设置 -->
    <div v-if="appType === 'product-collection'" class="space-y-3">
      <div class="text-sm font-medium text-gray-700 dark:text-dark-text border-b border-gray-200 dark:border-dark-border pb-2">
        商品采集设置
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">采集平台</label>
        <el-select
          v-model="settings.platform"
          size="small"
          class="w-full"
          placeholder="选择平台"
        >
          <el-option label="Amazon" value="amazon" />
          <el-option label="Temu" value="temu" />
          <el-option label="Shein" value="shein" />
        </el-select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">采集数量</label>
        <el-input-number
          v-model="settings.collectCount"
          :min="1"
          :max="1000"
          size="small"
          class="w-full"
        />
      </div>
    </div>

    <!-- 智能裁图特定设置 -->
    <div v-else-if="appType === 'smart-crop'" class="space-y-3">
      <div class="text-sm font-medium text-gray-700 dark:text-dark-text border-b border-gray-200 dark:border-dark-border pb-2">
        智能裁图设置
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">裁图尺寸</label>
        <el-select
          v-model="settings.cropSize"
          size="small"
          class="w-full"
          placeholder="选择尺寸"
        >
          <el-option label="800x800" value="800x800" />
          <el-option label="1024x1024" value="1024x1024" />
          <el-option label="自定义" value="custom" />
        </el-select>
      </div>

      <div v-if="settings.cropSize === 'custom'" class="grid grid-cols-2 gap-2">
        <div>
          <label class="block text-xs text-gray-600 dark:text-dark-text-secondary mb-1">宽度</label>
          <el-input-number
            v-model="settings.customWidth"
            :min="100"
            :max="2000"
            size="small"
            class="w-full"
          />
        </div>
        <div>
          <label class="block text-xs text-gray-600 dark:text-dark-text-secondary mb-1">高度</label>
          <el-input-number
            v-model="settings.customHeight"
            :min="100"
            :max="2000"
            size="small"
            class="w-full"
          />
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">裁图质量</label>
        <el-select
          v-model="settings.quality"
          size="small"
          class="w-full"
        >
          <el-option label="高质量" value="high" />
          <el-option label="标准" value="standard" />
          <el-option label="快速" value="fast" />
        </el-select>
      </div>
    </div>

    <!-- 一键抠图特定设置 -->
    <div v-else-if="appType === 'one-click-cutout'" class="space-y-3">
      <div class="text-sm font-medium text-gray-700 dark:text-dark-text border-b border-gray-200 dark:border-dark-border pb-2">
        一键抠图设置
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">抠图模式</label>
        <el-select
          v-model="settings.cutoutMode"
          size="small"
          class="w-full"
        >
          <el-option label="精确模式" value="precise" />
          <el-option label="快速模式" value="fast" />
          <el-option label="批量模式" value="batch" />
        </el-select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">背景处理</label>
        <el-select
          v-model="settings.backgroundMode"
          size="small"
          class="w-full"
        >
          <el-option label="透明背景" value="transparent" />
          <el-option label="白色背景" value="white" />
          <el-option label="自定义颜色" value="custom" />
        </el-select>
      </div>

      <div v-if="settings.backgroundMode === 'custom'">
        <label class="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">背景颜色</label>
        <el-color-picker
          v-model="settings.backgroundColor"
          size="small"
        />
      </div>
    </div>

    <!-- 超级裂变特定设置 -->
    <div v-else-if="appType === 'super-split'" class="space-y-3">
      <div class="text-sm font-medium text-gray-700 dark:text-dark-text border-b border-gray-200 dark:border-dark-border pb-2">
        超级裂变设置
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">裂变数量</label>
        <el-input-number
          v-model="settings.splitCount"
          :min="1"
          :max="5"
          size="small"
          class="w-full"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">裂变模式</label>
        <el-select
          v-model="settings.splitMode"
          size="small"
          class="w-full"
        >
          <el-option label="颜色变换" value="color" />
          <el-option label="风格变换" value="style" />
          <el-option label="混合模式" value="mixed" />
        </el-select>
      </div>
    </div>

    <!-- 标题生成特定设置 -->
    <div v-else-if="appType === 'title-generator'" class="space-y-3">
      <div class="text-sm font-medium text-gray-700 dark:text-dark-text border-b border-gray-200 dark:border-dark-border pb-2">
        标题生成设置
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">生成模板</label>
        <el-select
          v-model="settings.titleTemplate"
          size="small"
          class="w-full"
        >
          <el-option label="Amazon模板" value="amazon" />
          <el-option label="Temu模板" value="temu" />
          <el-option label="通用模板" value="general" />
        </el-select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">标题长度</label>
        <el-select
          v-model="settings.titleLength"
          size="small"
          class="w-full"
        >
          <el-option label="短标题 (50字符)" value="short" />
          <el-option label="中等标题 (100字符)" value="medium" />
          <el-option label="长标题 (200字符)" value="long" />
        </el-select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">关键词密度</label>
        <el-slider
          v-model="settings.keywordDensity"
          :min="1"
          :max="10"
          :step="1"
          show-stops
          size="small"
        />
      </div>
    </div>

    <!-- 批量刊登特定设置 -->
    <div v-else-if="appType === 'batch-listing'" class="space-y-3">
      <div class="text-sm font-medium text-gray-700 dark:text-dark-text border-b border-gray-200 dark:border-dark-border pb-2">
        批量刊登设置
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">目标平台</label>
        <el-select
          v-model="settings.targetPlatform"
          size="small"
          class="w-full"
          multiple
        >
          <el-option label="Amazon" value="amazon" />
          <el-option label="eBay" value="ebay" />
          <el-option label="Shopify" value="shopify" />
        </el-select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">刊登模式</label>
        <el-select
          v-model="settings.listingMode"
          size="small"
          class="w-full"
        >
          <el-option label="立即刊登" value="immediate" />
          <el-option label="定时刊登" value="scheduled" />
          <el-option label="草稿模式" value="draft" />
        </el-select>
      </div>

      <div v-if="settings.listingMode === 'scheduled'">
        <label class="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">刊登时间</label>
        <el-date-picker
          v-model="settings.scheduledTime"
          type="datetime"
          size="small"
          class="w-full"
          placeholder="选择刊登时间"
        />
      </div>
    </div>

    <!-- POD合成特定设置 -->
    <div v-else-if="appType === 'pod-compose'" class="space-y-3">
      <div class="text-sm font-medium text-gray-700 dark:text-dark-text border-b border-gray-200 dark:border-dark-border pb-2">
        POD合成设置
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">合成模式</label>
        <el-select
          v-model="settings.composeMode"
          size="small"
          class="w-full"
        >
          <el-option label="自动合成" value="auto" />
          <el-option label="手动调整" value="manual" />
          <el-option label="批量合成" value="batch" />
        </el-select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">输出格式</label>
        <el-select
          v-model="settings.outputFormat"
          size="small"
          class="w-full"
        >
          <el-option label="PNG" value="png" />
          <el-option label="JPG" value="jpg" />
          <el-option label="PDF" value="pdf" />
        </el-select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">分辨率</label>
        <el-select
          v-model="settings.resolution"
          size="small"
          class="w-full"
        >
          <el-option label="300 DPI (高质量)" value="300" />
          <el-option label="150 DPI (标准)" value="150" />
          <el-option label="72 DPI (网络)" value="72" />
        </el-select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';

// Props
interface Props {
  appType: string;
  modelValue: Record<string, any>;
}

// Emits
interface Emits {
  (e: 'update:modelValue', value: Record<string, any>): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// 计算属性
const settings = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

// 监听应用类型变化，初始化默认设置
watch(() => props.appType, (newType) => {
  const defaultSettings = getDefaultSettings(newType);
  // 合并现有设置和默认设置
  const mergedSettings = { ...defaultSettings, ...props.modelValue };
  emit('update:modelValue', mergedSettings);
}, { immediate: true });

// 获取默认设置
function getDefaultSettings(appType: string): Record<string, any> {
  const defaults: Record<string, Record<string, any>> = {
    'product-collection': {
      platform: 'amazon',
      collectCount: 50
    },
    'smart-crop': {
      cropSize: '800x800',
      customWidth: 800,
      customHeight: 800,
      quality: 'standard'
    },
    'one-click-cutout': {
      cutoutMode: 'precise',
      backgroundMode: 'transparent',
      backgroundColor: '#ffffff'
    },
    'super-split': {
      splitCount: 3,
      splitMode: 'color'
    },
    'title-generator': {
      titleTemplate: 'general',
      titleLength: 'medium',
      keywordDensity: 5
    },
    'batch-listing': {
      targetPlatform: ['amazon'],
      listingMode: 'immediate',
      scheduledTime: null
    },
    'pod-compose': {
      composeMode: 'auto',
      outputFormat: 'png',
      resolution: '300'
    }
  };

  return defaults[appType] || {};
}
</script>
