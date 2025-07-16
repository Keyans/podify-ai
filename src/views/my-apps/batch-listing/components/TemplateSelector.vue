<template>
  <el-dialog
    v-model="dialogVisible"
    width="800px"
    align-center
    :show-close="false"
    class="modern-dialog">
    <!-- 自定义标题 -->
    <template #header>
      <div class="flex items-center justify-between p-6 border-b border-gray-100 dark:border-dark-border">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-dark-text">选择模板文件</h3>
            <p class="text-sm text-gray-600 dark:text-dark-text-secondary">从模板库中选择适合的刊登模板</p>
          </div>
        </div>
        <button @click="handleClose" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </template>

    <div class="p-6 space-y-4">
      <!-- 操作区域 -->
      <div class="flex justify-between items-center">
        <div class="flex space-x-3">
          <!-- 上传模板按钮 -->
          <el-upload
            ref="uploadRef"
            :file-list="fileList"
            :on-change="handleFileUpload"
            :on-remove="handleFileRemove"
            :auto-upload="false"
            accept=".csv,.xls,.xlsx,.xlsm"
            :show-file-list="false">
            <button class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
              上传模板
            </button>
          </el-upload>

          <!-- 搜索框 -->
          <el-input
            v-model="searchKeyword"
            placeholder="搜索模板文件..."
            style="width: 250px"
            clearable
          >
            <template #prefix>
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </template>
          </el-input>

          <!-- 平台筛选 -->
          <el-select v-model="platformFilter" placeholder="选择平台" style="width: 120px" clearable>
            <el-option label="全部" value="" />
            <el-option label="亚马逊" value="亚马逊" />
            <el-option label="Temu" value="Temu" />
            <el-option label="Shein" value="Shein" />
            <el-option label="通用" value="通用" />
          </el-select>
        </div>

        <div class="text-sm text-gray-600 dark:text-dark-text-secondary">
          已选择 {{ selectedTemplates.length }} 个文件
        </div>
      </div>

      <!-- 模板文件列表 -->
      <div class="border border-gray-200 dark:border-dark-border rounded-lg overflow-hidden">
        <el-table
          :data="filteredTemplates"
          @selection-change="handleSelectionChange"
          max-height="400"
        >
          <el-table-column type="selection" width="55" />
          
          <el-table-column label="文件名" min-width="200">
            <template #default="scope">
              <div class="flex items-center space-x-3">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <div>
                  <div class="font-medium text-gray-900 dark:text-dark-text">{{ scope.row.name }}</div>
                  <div class="text-sm text-gray-500 dark:text-dark-text-secondary">{{ scope.row.description }}</div>
                </div>
              </div>
            </template>
          </el-table-column>
          
          <el-table-column prop="platform" label="适用平台" width="120">
            <template #default="scope">
              <el-tag size="small">{{ scope.row.platform }}</el-tag>
            </template>
          </el-table-column>
          
          <el-table-column prop="size" label="文件大小" width="100">
            <template #default="scope">
              <span class="text-sm text-gray-600 dark:text-dark-text-secondary">
                {{ formatFileSize(scope.row.size) }}
              </span>
            </template>
          </el-table-column>
          
          <el-table-column prop="updateTime" label="更新时间" width="150">
            <template #default="scope">
              <span class="text-sm text-gray-600 dark:text-dark-text-secondary">
                {{ scope.row.updateTime }}
              </span>
            </template>
          </el-table-column>
          
          <el-table-column label="操作" width="100">
            <template #default="scope">
              <el-button
                type="primary"
                link
                @click="previewTemplate(scope.row)"
              >
                预览
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 分页 -->
      <div class="flex justify-center">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50]"
          :total="filteredTemplates.length"
          layout="sizes, prev, pager, next"
          small
        />
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
          @click="handleConfirm"
          :disabled="selectedTemplates.length === 0"
          class="px-6 py-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          确认选择 ({{ selectedTemplates.length }})
        </button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus';

// Props
interface Props {
  modelValue: boolean;
}

// Emits
interface Emits {
  (e: 'update:modelValue', value: boolean): void;
  (e: 'select', files: TemplateFile[]): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// 类型定义
interface TemplateFile {
  id: string;
  name: string;
  description: string;
  platform: string;
  size: number;
  updateTime: string;
  url: string;
}

// 响应式数据
const dialogVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const searchKeyword = ref('');
const platformFilter = ref('');
const currentPage = ref(1);
const pageSize = ref(10);
const selectedTemplates = ref<TemplateFile[]>([]);
const uploadRef = ref();
const fileList = ref<any[]>([]);

// 模拟模板文件数据
const templates = ref<TemplateFile[]>([
  {
    id: 'TPL001',
    name: 'Amazon商品刊登模板.xlsx',
    description: '亚马逊标准商品刊登模板，包含所有必填字段',
    platform: '亚马逊',
    size: 45678,
    updateTime: '2024-01-15',
    url: '/templates/amazon-listing.xlsx'
  },
  {
    id: 'TPL002',
    name: 'Temu批量上传模板.csv',
    description: 'Temu平台批量商品上传模板',
    platform: 'Temu',
    size: 23456,
    updateTime: '2024-01-14',
    url: '/templates/temu-bulk-upload.csv'
  },
  {
    id: 'TPL003',
    name: 'Shein服装类目模板.xlsm',
    description: 'Shein服装类目专用刊登模板，支持多SKU',
    platform: 'Shein',
    size: 67890,
    updateTime: '2024-01-13',
    url: '/templates/shein-clothing.xlsm'
  },
  {
    id: 'TPL004',
    name: '通用商品信息模板.xlsx',
    description: '适用于多平台的通用商品信息模板',
    platform: '通用',
    size: 34567,
    updateTime: '2024-01-12',
    url: '/templates/universal-product.xlsx'
  },
  {
    id: 'TPL005',
    name: 'Amazon变体商品模板.csv',
    description: '亚马逊变体商品专用模板，支持颜色尺寸变体',
    platform: '亚马逊',
    size: 56789,
    updateTime: '2024-01-11',
    url: '/templates/amazon-variants.csv'
  }
]);

// 计算属性
const filteredTemplates = computed(() => {
  let filtered = templates.value;

  // 搜索过滤
  if (searchKeyword.value) {
    filtered = filtered.filter(template =>
      template.name.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
      template.description.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
      template.platform.toLowerCase().includes(searchKeyword.value.toLowerCase())
    );
  }

  // 平台过滤
  if (platformFilter.value) {
    filtered = filtered.filter(template => template.platform === platformFilter.value);
  }

  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filtered.slice(start, end);
});

// 方法
const handleSelectionChange = (selection: TemplateFile[]) => {
  selectedTemplates.value = selection;
};

const handleFileUpload = (file: any) => {
  if (file.raw) {
    const newTemplate: TemplateFile = {
      id: 'UPLOAD_' + Date.now(),
      name: file.name,
      description: '用户上传的模板文件',
      platform: '通用',
      size: file.size || 0,
      updateTime: new Date().toLocaleDateString(),
      url: URL.createObjectURL(file.raw)
    };

    // 添加到模板列表
    templates.value.unshift(newTemplate);

    // 自动选中上传的文件
    selectedTemplates.value.push(newTemplate);

    ElMessage.success(`模板文件 ${file.name} 上传成功`);
  }
};

const handleFileRemove = (file: any) => {
  const templateIndex = templates.value.findIndex(t => t.name === file.name);
  if (templateIndex > -1) {
    templates.value.splice(templateIndex, 1);
  }

  const selectedIndex = selectedTemplates.value.findIndex(t => t.name === file.name);
  if (selectedIndex > -1) {
    selectedTemplates.value.splice(selectedIndex, 1);
  }
};

const previewTemplate = (template: TemplateFile) => {
  ElMessage.info(`预览模板：${template.name}`);
  // 这里可以实现模板预览功能
};

const formatFileSize = (size: number) => {
  if (size < 1024) return size + ' B';
  if (size < 1024 * 1024) return (size / 1024).toFixed(1) + ' KB';
  return (size / (1024 * 1024)).toFixed(1) + ' MB';
};

const handleConfirm = () => {
  if (selectedTemplates.value.length === 0) {
    ElMessage.warning('请选择至少一个模板文件');
    return;
  }
  
  emit('select', selectedTemplates.value);
  
  handleClose();
};

const handleClose = () => {
  selectedTemplates.value = [];
  searchKeyword.value = '';
  platformFilter.value = '';
  currentPage.value = 1;
  fileList.value = [];
  if (uploadRef.value) {
    uploadRef.value.clearFiles();
  }
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
