<template>
  <el-dialog
    v-model="dialogVisible"
    title="新建预设"
    width="600px"
    align-center
    @close="resetForm">
    <div class="space-y-6">
      <!-- 预设名称 -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-900 dark:text-dark-text">
          预设名称 <span class="text-red-500">*</span>
        </label>
        <el-input
          v-model="form.name"
          placeholder="请输入预设名称，如：亚马逊标题"
          class="modern-input"
        />
      </div>

      <!-- 预设描述 -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-900 dark:text-dark-text">
          预设描述
        </label>
        <el-input
          v-model="form.description"
          placeholder="请输入预设描述，简要说明此预设的用途和特点"
          class="modern-input"
        />
      </div>

      <!-- 生成规则 -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-900 dark:text-dark-text">
          生成规则 <span class="text-red-500">*</span>
        </label>
        <el-input
          v-model="form.rules"
          type="textarea"
          :rows="8"
          placeholder="请输入详细的生成规则..."
          class="modern-textarea"
        />
        
        <!-- 预设示例 -->
        <div class="mt-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 class="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">预设示例：</h4>
          <div class="text-sm text-blue-800 dark:text-blue-200 space-y-2">
            <p><strong>【亚马逊标题】</strong></p>
            <p>任务：根据图片内容拟定标题；</p>
            <p>要求：商品款式+商品颜色+印花图案+使用场景，遵循&lt;亚马逊&gt;平台要求，输出&lt;英文&gt;，总字符量不超过120个字符</p>
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-end space-x-3">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitPreset" :disabled="!form.name.trim() || !form.rules.trim()">
          创建预设
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus';

// Props
const props = defineProps<{
  modelValue: boolean;
}>();

// Emits
const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  'success': [preset: any];
}>();

// 类型定义
interface PresetForm {
  name: string;
  description: string;
  rules: string;
}

// 响应式数据
const dialogVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const form = ref<PresetForm>({
  name: '',
  description: '',
  rules: ''
});

// 方法
const submitPreset = () => {
  if (!form.value.name.trim()) {
    ElMessage.warning('请输入预设名称');
    return;
  }

  if (!form.value.rules.trim()) {
    ElMessage.warning('请输入生成规则');
    return;
  }

  const newPreset = {
    id: Date.now().toString(),
    name: form.value.name.trim(),
    description: form.value.description.trim(),
    rules: form.value.rules.trim()
  };

  emit('success', newPreset);
  emit('update:modelValue', false);
  resetForm();
};

const resetForm = () => {
  form.value = {
    name: '',
    description: '',
    rules: ''
  };
};
</script>

<style scoped>
.modern-input :deep(.el-input__wrapper) {
  border-radius: 8px;
  border: 1px solid theme('colors.gray.300');
  transition: all 0.2s ease;
}

.modern-input :deep(.el-input__wrapper:hover) {
  border-color: theme('colors.gray.400');
}

.modern-input :deep(.el-input__wrapper.is-focus) {
  border-color: theme('colors.blue.500');
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.modern-textarea :deep(.el-textarea__inner) {
  border-radius: 8px;
  border: 1px solid theme('colors.gray.300');
  transition: all 0.2s ease;
}

.modern-textarea :deep(.el-textarea__inner:focus) {
  border-color: theme('colors.blue.500');
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
</style>
