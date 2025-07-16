<template>
  <el-dialog
    v-model="dialogVisible"
    title="创建效果图"
    width="1200px"
    align-center
    @close="resetForm"
  >
    <div class="space-y-6">
      <!-- 图片上传区域 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- 底图 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
            底图 <span class="text-red-500">*</span>
          </label>
          <div
            class="border-2 border-dashed border-gray-300 dark:border-dark-border rounded-lg p-4 text-center cursor-pointer hover:border-amber-500 dark:hover:border-amber-500 transition-colors"
            @click="openImageUpload('base')"
          >
            <div v-if="form.baseImage" class="relative">
              <img
                :src="form.baseImage"
                alt="底图"
                class="w-full h-40 object-cover rounded-lg"
              />
              <button
                @click.stop="removeImage('base')"
                class="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div v-else class="h-40 flex flex-col items-center justify-center">
              <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <p class="mt-2 text-sm text-gray-500 dark:text-dark-text-secondary">点击上传底图</p>
            </div>
          </div>
        </div>

        <!-- 印刷图 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
            印刷图 <span class="text-red-500">*</span>
          </label>
          <div
            class="border-2 border-dashed border-gray-300 dark:border-dark-border rounded-lg p-4 text-center cursor-pointer hover:border-amber-500 dark:hover:border-amber-500 transition-colors"
            @click="openImageUpload('print')"
          >
            <div v-if="form.printImage" class="relative">
              <img
                :src="form.printImage"
                alt="印刷图"
                class="w-full h-40 object-cover rounded-lg"
              />
              <button
                @click.stop="removeImage('print')"
                class="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div v-else class="h-40 flex flex-col items-center justify-center">
              <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <p class="mt-2 text-sm text-gray-500 dark:text-dark-text-secondary">点击上传印刷图</p>
            </div>
          </div>
        </div>

        <!-- 遮罩图 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
            遮罩图
          </label>
          <div
            class="border-2 border-dashed border-gray-300 dark:border-dark-border rounded-lg p-4 text-center cursor-pointer hover:border-amber-500 dark:hover:border-amber-500 transition-colors"
            @click="openImageUpload('mask')"
          >
            <div v-if="form.maskImage" class="relative">
              <img
                :src="form.maskImage"
                alt="遮罩图"
                class="w-full h-40 object-cover rounded-lg"
              />
              <button
                @click.stop="removeImage('mask')"
                class="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div v-else class="h-40 flex flex-col items-center justify-center">
              <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <p class="mt-2 text-sm text-gray-500 dark:text-dark-text-secondary">点击上传遮罩图</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 印刷区域设置 -->
      <div v-if="form.baseImage && form.printImage" class="bg-gray-50 dark:bg-dark-card rounded-lg p-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-dark-text mb-4">设置印刷区域</h3>
        
        <!-- 预览区域 -->
        <div class="relative bg-white dark:bg-dark-surface rounded-lg border border-gray-200 dark:border-dark-border overflow-hidden flex items-center justify-center" style="height: 400px;">
          <!-- 图片显示区域 - 固定尺寸以确保所有图层对齐 -->
          <div class="relative" style="width: 350px; height: 350px;">
            <!-- 底图 -->
            <img
              :src="form.baseImage"
              alt="底图"
              class="absolute inset-0 w-full h-full object-contain"
            />

            <!-- 印刷区域 -->
            <div
              v-if="printArea.visible"
              ref="printAreaRef"
              class="absolute border-2 border-amber-500 bg-amber-500 bg-opacity-20 cursor-move flex items-center justify-center"
              :style="{
                left: printArea.x + 'px',
                top: printArea.y + 'px',
                width: printArea.width + 'px',
                height: printArea.height + 'px',
                transform: `rotate(${printArea.rotation}deg)`
              }"
              @mousedown="startDrag"
            >
              <!-- 印刷图 -->
              <img
                :src="form.printImage"
                alt="印刷图"
                class="max-w-full max-h-full object-contain opacity-80"
                style="object-position: center;"
              />

              <!-- 控制点 -->
              <div class="absolute -top-2 -left-2 w-4 h-4 bg-amber-500 rounded-full cursor-nw-resize" @mousedown.stop="startResize('nw', $event)"></div>
              <div class="absolute -top-2 -right-2 w-4 h-4 bg-amber-500 rounded-full cursor-ne-resize" @mousedown.stop="startResize('ne', $event)"></div>
              <div class="absolute -bottom-2 -left-2 w-4 h-4 bg-amber-500 rounded-full cursor-sw-resize" @mousedown.stop="startResize('sw', $event)"></div>
              <div class="absolute -bottom-2 -right-2 w-4 h-4 bg-amber-500 rounded-full cursor-se-resize" @mousedown.stop="startResize('se', $event)"></div>

              <!-- 旋转控制点 -->
              <div class="absolute -top-8 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full cursor-pointer" @mousedown.stop="startRotate($event)"></div>
            </div>

            <!-- 遮罩图 -->
            <img
              v-if="form.maskImage"
              :src="form.maskImage"
              alt="遮罩图"
              class="absolute inset-0 w-full h-full object-contain pointer-events-none"
            />
          </div>
        </div>

        <!-- 控制面板 -->
        <div class="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1">X位置</label>
            <el-input-number v-model="printArea.x" :min="0" :max="350" size="small" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1">Y位置</label>
            <el-input-number v-model="printArea.y" :min="0" :max="350" size="small" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1">宽度</label>
            <el-input-number v-model="printArea.width" :min="10" :max="350" size="small" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1">高度</label>
            <el-input-number v-model="printArea.height" :min="10" :max="350" size="small" />
          </div>
        </div>

        <div class="mt-4 flex items-center space-x-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1">旋转角度</label>
            <el-slider v-model="printArea.rotation" :min="-180" :max="180" :step="1" style="width: 200px" />
          </div>
          <div class="flex space-x-2">
            <el-button @click="resetPrintArea" size="small">重置</el-button>
            <el-button @click="centerPrintArea" size="small">居中</el-button>
          </div>
        </div>
      </div>

      <!-- 说明 -->
      <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h4 class="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">图层说明：</h4>
        <ul class="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• <strong>底图</strong>：作为最底层的背景图片</li>
          <li>• <strong>印刷区域</strong>：可调整位置、大小和旋转角度的印刷图案</li>
          <li>• <strong>遮罩图</strong>：覆盖在最上层的遮罩效果</li>
        </ul>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-end space-x-3">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="generateEffect"
          :loading="generating"
          :disabled="!form.baseImage || !form.printImage"
        >
          生成效果图
        </el-button>
      </div>
    </template>
  </el-dialog>

  <!-- 隐藏的文件输入 -->
  <input
    ref="fileInputRef"
    type="file"
    accept="image/*"
    style="display: none"
    @change="handleFileSelect"
  />
</template>

<script setup lang="ts">
import { ref, reactive, computed, onUnmounted } from 'vue';
import { ElMessage } from 'element-plus';

// Props
const props = defineProps<{
  modelValue: boolean;
}>();

// Emits
const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  'created': [imageUrl: string];
}>();

// 响应式数据
const dialogVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const generating = ref(false);
const fileInputRef = ref<HTMLInputElement>();
const printAreaRef = ref<HTMLElement>();
const currentUploadType = ref<'base' | 'print' | 'mask'>('base');

const form = reactive({
  baseImage: '',
  printImage: '',
  maskImage: ''
});

const printArea = reactive({
  visible: false,
  x: 50,
  y: 50,
  width: 100,
  height: 100,
  rotation: 0
});

// 拖拽相关状态
const dragState = reactive({
  isDragging: false,
  isResizing: false,
  isRotating: false,
  startX: 0,
  startY: 0,
  startWidth: 0,
  startHeight: 0,
  startRotation: 0,
  resizeDirection: '',
  containerRect: null as DOMRect | null
});

// 方法
const getContainer = (): HTMLElement | null => {
  return document.querySelector('.relative[style*="width: 350px; height: 350px"]') as HTMLElement;
};

const openImageUpload = (type: 'base' | 'print' | 'mask') => {
  currentUploadType.value = type;
  fileInputRef.value?.click();
};

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      
      if (currentUploadType.value === 'base') {
        form.baseImage = imageUrl;
      } else if (currentUploadType.value === 'print') {
        form.printImage = imageUrl;
        // 显示印刷区域
        printArea.visible = true;
      } else if (currentUploadType.value === 'mask') {
        form.maskImage = imageUrl;
      }
    };
    reader.readAsDataURL(file);
  }
  
  // 清空input值，允许重复选择同一文件
  target.value = '';
};

const removeImage = (type: 'base' | 'print' | 'mask') => {
  if (type === 'base') {
    form.baseImage = '';
  } else if (type === 'print') {
    form.printImage = '';
    printArea.visible = false;
  } else if (type === 'mask') {
    form.maskImage = '';
  }
};

// 拖拽相关方法
const startDrag = (event: MouseEvent) => {
  event.preventDefault();

  const container = getContainer();
  if (!container) return;

  dragState.isDragging = true;
  dragState.containerRect = container.getBoundingClientRect();

  // 计算鼠标相对于印刷区域左上角的偏移
  dragState.startX = event.clientX - dragState.containerRect.left - printArea.x;
  dragState.startY = event.clientY - dragState.containerRect.top - printArea.y;

  document.addEventListener('mousemove', handleDrag);
  document.addEventListener('mouseup', stopDrag);
};

const handleDrag = (event: MouseEvent) => {
  if (!dragState.isDragging || !dragState.containerRect) return;

  const container = getContainer();
  if (!container) return;

  // 计算新的位置
  const newX = event.clientX - dragState.containerRect.left - dragState.startX;
  const newY = event.clientY - dragState.containerRect.top - dragState.startY;

  // 边界检查，确保印刷区域不会超出容器
  const maxX = container.clientWidth - printArea.width;
  const maxY = container.clientHeight - printArea.height;

  printArea.x = Math.max(0, Math.min(maxX, newX));
  printArea.y = Math.max(0, Math.min(maxY, newY));
};

const stopDrag = () => {
  dragState.isDragging = false;
  dragState.containerRect = null;
  document.removeEventListener('mousemove', handleDrag);
  document.removeEventListener('mouseup', stopDrag);
};

const startResize = (direction: string, event: MouseEvent) => {
  event.preventDefault();
  event.stopPropagation();

  dragState.isResizing = true;
  dragState.resizeDirection = direction;
  dragState.startWidth = printArea.width;
  dragState.startHeight = printArea.height;
  dragState.startX = event.clientX;
  dragState.startY = event.clientY;

  document.addEventListener('mousemove', handleResize);
  document.addEventListener('mouseup', stopResize);
};

const handleResize = (event: MouseEvent) => {
  if (!dragState.isResizing) return;

  const deltaX = event.clientX - dragState.startX;
  const deltaY = event.clientY - dragState.startY;

  const container = getContainer();
  if (!container) return;

  const maxWidth = container.clientWidth - printArea.x;
  const maxHeight = container.clientHeight - printArea.y;

  // 根据拖拽方向调整尺寸
  if (dragState.resizeDirection.includes('e')) {
    printArea.width = Math.max(10, Math.min(maxWidth, dragState.startWidth + deltaX));
  }
  if (dragState.resizeDirection.includes('w')) {
    const newWidth = Math.max(10, dragState.startWidth - deltaX);
    const deltaWidth = printArea.width - newWidth;
    if (printArea.x + deltaWidth >= 0) {
      printArea.width = newWidth;
      printArea.x += deltaWidth;
    }
  }
  if (dragState.resizeDirection.includes('s')) {
    printArea.height = Math.max(10, Math.min(maxHeight, dragState.startHeight + deltaY));
  }
  if (dragState.resizeDirection.includes('n')) {
    const newHeight = Math.max(10, dragState.startHeight - deltaY);
    const deltaHeight = printArea.height - newHeight;
    if (printArea.y + deltaHeight >= 0) {
      printArea.height = newHeight;
      printArea.y += deltaHeight;
    }
  }
};

const stopResize = () => {
  dragState.isResizing = false;
  document.removeEventListener('mousemove', handleResize);
  document.removeEventListener('mouseup', stopResize);
};

const startRotate = (event: MouseEvent) => {
  event.preventDefault();
  event.stopPropagation();

  dragState.isRotating = true;
  dragState.startRotation = printArea.rotation;
  dragState.startX = event.clientX;
  dragState.startY = event.clientY;

  document.addEventListener('mousemove', handleRotate);
  document.addEventListener('mouseup', stopRotate);
};

const handleRotate = (event: MouseEvent) => {
  if (!dragState.isRotating) return;

  const container = getContainer();
  if (!container) return;

  const containerRect = container.getBoundingClientRect();
  const centerX = containerRect.left + printArea.x + printArea.width / 2;
  const centerY = containerRect.top + printArea.y + printArea.height / 2;

  // 计算起始角度和当前角度
  const startAngle = Math.atan2(dragState.startY - centerY, dragState.startX - centerX);
  const currentAngle = Math.atan2(event.clientY - centerY, event.clientX - centerX);

  // 计算角度差并转换为度数
  const angleDiff = (currentAngle - startAngle) * (180 / Math.PI);

  // 更新旋转角度，限制在-180到180度之间
  printArea.rotation = Math.max(-180, Math.min(180, dragState.startRotation + angleDiff));
};

const stopRotate = () => {
  dragState.isRotating = false;
  document.removeEventListener('mousemove', handleRotate);
  document.removeEventListener('mouseup', stopRotate);
};

const resetPrintArea = () => {
  printArea.x = 50;
  printArea.y = 50;
  printArea.width = 100;
  printArea.height = 100;
  printArea.rotation = 0;
};

const centerPrintArea = () => {
  printArea.x = (350 - printArea.width) / 2;
  printArea.y = (350 - printArea.height) / 2;
};

const generateEffect = () => {
  generating.value = true;
  
  // 模拟生成效果图
  setTimeout(() => {
    generating.value = false;
    
    // 这里应该调用实际的图片合成API
    // 现在使用模拟的结果图片
    const effectImageUrl = 'https://picsum.photos/400/400?random=' + Date.now();
    
    emit('created', effectImageUrl);
    ElMessage.success('效果图生成成功！');
    resetForm();
  }, 2000);
};

const resetForm = () => {
  form.baseImage = '';
  form.printImage = '';
  form.maskImage = '';
  printArea.visible = false;
  resetPrintArea();
};

// 清理事件监听器
onUnmounted(() => {
  document.removeEventListener('mousemove', handleDrag);
  document.removeEventListener('mouseup', stopDrag);
  document.removeEventListener('mousemove', handleResize);
  document.removeEventListener('mouseup', stopResize);
  document.removeEventListener('mousemove', handleRotate);
  document.removeEventListener('mouseup', stopRotate);
});
</script>

<style scoped>
.cursor-nw-resize { cursor: nw-resize; }
.cursor-ne-resize { cursor: ne-resize; }
.cursor-sw-resize { cursor: sw-resize; }
.cursor-se-resize { cursor: se-resize; }

/* 防止拖拽时选中文本 */
.relative[style*="width: 350px; height: 350px"] {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

/* 拖拽时的视觉反馈 */
.relative[style*="width: 350px; height: 350px"] .absolute.border-2.border-amber-500:hover {
  border-color: #f59e0b;
  box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.2);
}

/* 控制点的悬停效果 */
.absolute.w-4.h-4.rounded-full:hover {
  transform: scale(1.2);
  transition: transform 0.2s ease;
}

/* 旋转控制点的特殊样式 */
.absolute.-top-8.bg-blue-500:hover {
  background-color: #3b82f6;
  transform: translateX(-50%) scale(1.2);
}

/* 印刷图居中样式 */
.absolute.border-2.border-amber-500 img {
  pointer-events: none; /* 防止图片干扰拖拽事件 */
}
</style>
