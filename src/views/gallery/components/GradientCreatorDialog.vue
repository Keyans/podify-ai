<template>
  <el-dialog
    v-model="dialogVisible"
    width="600px"
    align-center
    :show-close="false"
    class="modern-dialog">
    <!-- 自定义标题 -->
    <template #header>
      <div class="flex items-center justify-between p-6 border-b border-gray-100 dark:border-dark-border">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"></path>
            </svg>
          </div>
          <div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-dark-text">创建渐变背景</h3>
            <p class="text-sm text-gray-600 dark:text-dark-text-secondary">自定义渐变色彩和方向</p>
          </div>
        </div>
        <button @click="handleClose" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </template>

    <div class="p-6 space-y-6">
      <!-- 渐变预览 -->
      <div class="space-y-3">
        <label class="text-sm font-medium text-gray-900 dark:text-dark-text">预览效果</label>
        <div 
          class="w-full h-32 rounded-lg border border-gray-200 dark:border-dark-border"
          :style="{ background: gradientStyle }"
        ></div>
      </div>

      <!-- 渐变名称 -->
      <div class="space-y-3">
        <label class="text-sm font-medium text-gray-900 dark:text-dark-text">渐变名称</label>
        <el-input
          v-model="gradientName"
          placeholder="输入渐变名称..."
          clearable
        />
      </div>

      <!-- 渐变方向 -->
      <div class="space-y-3">
        <label class="text-sm font-medium text-gray-900 dark:text-dark-text">渐变方向</label>
        <div class="grid grid-cols-4 gap-3">
          <button
            v-for="direction in directions"
            :key="direction.value"
            @click="selectedDirection = direction.value"
            class="p-3 border-2 rounded-lg transition-all duration-200 hover:shadow-md"
            :class="selectedDirection === direction.value ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-gray-200 dark:border-dark-border'"
          >
            <div class="text-center">
              <div class="w-8 h-8 mx-auto mb-2 rounded" :style="{ background: direction.preview }"></div>
              <span class="text-xs text-gray-600 dark:text-dark-text-secondary">{{ direction.label }}</span>
            </div>
          </button>
        </div>
      </div>

      <!-- 颜色选择 -->
      <div class="space-y-3">
        <label class="text-sm font-medium text-gray-900 dark:text-dark-text">渐变颜色</label>
        <div class="space-y-4">
          <div
            v-for="(_, index) in colors"
            :key="index"
            class="flex items-center space-x-3"
          >
            <span class="text-sm text-gray-600 dark:text-dark-text-secondary w-12">颜色{{ index + 1 }}</span>
            <el-color-picker v-model="colors[index]" />
            <el-input
              v-model="colors[index]"
              placeholder="#000000"
              style="width: 120px"
            />
            <button
              v-if="colors.length > 2"
              @click="removeColor(index)"
              class="p-1 text-red-500 hover:text-red-700 transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <button
            v-if="colors.length < 5"
            @click="addColor"
            class="inline-flex items-center px-3 py-2 text-sm font-medium text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-all duration-200"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            添加颜色
          </button>
        </div>
      </div>

      <!-- 预设渐变 -->
      <div class="space-y-3">
        <label class="text-sm font-medium text-gray-900 dark:text-dark-text">预设渐变</label>
        <div class="grid grid-cols-4 gap-3">
          <button
            v-for="preset in presets"
            :key="preset.name"
            @click="applyPreset(preset)"
            class="group relative p-2 border border-gray-200 dark:border-dark-border rounded-lg hover:shadow-md transition-all duration-200"
          >
            <div class="w-full h-12 rounded" :style="{ background: preset.style }"></div>
            <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-lg transition-all duration-200 flex items-center justify-center">
              <span class="text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 font-medium">
                {{ preset.name }}
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- 对话框底部 -->
    <template #footer>
      <div class="flex items-center justify-end p-6 border-t border-gray-100 dark:border-dark-border bg-gray-50 dark:bg-dark-card/50 space-x-3">
        <button @click="handleClose"
          class="px-6 py-2.5 text-gray-700 dark:text-dark-text font-medium rounded-lg border border-gray-300 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-border transition-all duration-200">
          取消
        </button>
        <button
          @click="handleCreate"
          :disabled="!gradientName.trim()"
          class="px-6 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          创建渐变
        </button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// Props
interface Props {
  modelValue: boolean;
}

// Emits
interface Emits {
  (e: 'update:modelValue', value: boolean): void;
  (e: 'create', data: { name: string; style: string }): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// 响应式数据
const dialogVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const gradientName = ref('');
const selectedDirection = ref('135deg');
const colors = ref(['#667eea', '#764ba2']);

// 渐变方向选项
const directions = ref([
  { value: '0deg', label: '向上', preview: 'linear-gradient(0deg, #667eea, #764ba2)' },
  { value: '90deg', label: '向右', preview: 'linear-gradient(90deg, #667eea, #764ba2)' },
  { value: '180deg', label: '向下', preview: 'linear-gradient(180deg, #667eea, #764ba2)' },
  { value: '270deg', label: '向左', preview: 'linear-gradient(270deg, #667eea, #764ba2)' },
  { value: '45deg', label: '右上', preview: 'linear-gradient(45deg, #667eea, #764ba2)' },
  { value: '135deg', label: '右下', preview: 'linear-gradient(135deg, #667eea, #764ba2)' },
  { value: '225deg', label: '左下', preview: 'linear-gradient(225deg, #667eea, #764ba2)' },
  { value: '315deg', label: '左上', preview: 'linear-gradient(315deg, #667eea, #764ba2)' }
]);

// 预设渐变
const presets = ref([
  { name: '蓝紫', style: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { name: '橙红', style: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { name: '绿蓝', style: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { name: '粉紫', style: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
  { name: '黄橙', style: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' },
  { name: '蓝绿', style: 'linear-gradient(135deg, #a8e6cf 0%, #dcedc1 100%)' },
  { name: '紫粉', style: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)' },
  { name: '日落', style: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }
]);

// 计算属性
const gradientStyle = computed(() => {
  const colorStops = colors.value.map((color, index) => {
    const percentage = (index / (colors.value.length - 1)) * 100;
    return `${color} ${percentage}%`;
  }).join(', ');
  
  return `linear-gradient(${selectedDirection.value}, ${colorStops})`;
});

// 方法
const addColor = () => {
  colors.value.push('#ffffff');
};

const removeColor = (index: number) => {
  if (colors.value.length > 2) {
    colors.value.splice(index, 1);
  }
};

const applyPreset = (preset: any) => {
  // 解析预设渐变的颜色
  const match = preset.style.match(/linear-gradient\(([^,]+),\s*([^)]+)\)/);
  if (match) {
    const direction = match[1].trim();
    const colorPart = match[2];
    
    // 提取颜色
    const colorMatches = colorPart.match(/#[0-9a-fA-F]{6}/g);
    if (colorMatches && colorMatches.length >= 2) {
      selectedDirection.value = direction;
      colors.value = colorMatches.slice(0, 5); // 最多5个颜色
      gradientName.value = `${preset.name}渐变`;
    }
  }
};

const handleCreate = () => {
  if (!gradientName.value.trim()) return;
  
  emit('create', {
    name: gradientName.value,
    style: gradientStyle.value
  });
  
  handleClose();
};

const handleClose = () => {
  gradientName.value = '';
  selectedDirection.value = '135deg';
  colors.value = ['#667eea', '#764ba2'];
  emit('update:modelValue', false);
};
</script>

<style scoped>
.modern-dialog :deep(.el-dialog__header) {
  padding: 0;
  margin: 0;
}

.modern-dialog :deep(.el-dialog__body) {
  padding: 0;
}

.modern-dialog :deep(.el-dialog__footer) {
  padding: 0;
}

.modern-dialog :deep(.el-dialog) {
  border-radius: 16px;
  overflow: hidden;
  background: white;
}

.dark .modern-dialog :deep(.el-dialog) {
  background: rgb(30, 41, 59);
  border: 1px solid rgb(71, 85, 105);
}
</style>
