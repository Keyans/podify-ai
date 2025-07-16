<template>
  <el-dialog
    v-model="dialogVisible"
    title="相似图片详情"
    width="1000px"
    align-center
    @close="handleClose">
    
    <div v-if="detectionResult" class="space-y-6">
      <!-- 原图信息 -->
      <div class="bg-gray-50 dark:bg-dark-card rounded-lg p-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-dark-text mb-4">原图信息</h3>
        <div class="flex items-start space-x-4">
          <div class="flex-shrink-0">
            <el-image
              :src="detectionResult.originalImage"
              :preview-src-list="[detectionResult.originalImage]"
              fit="cover"
              class="w-32 h-32 rounded-lg border border-gray-200 dark:border-dark-border"
            />
          </div>
          <div class="flex-1 space-y-2">
            <div>
              <span class="text-sm text-gray-500 dark:text-dark-text-secondary">文件名：</span>
              <span class="text-sm font-medium text-gray-900 dark:text-dark-text">{{ detectionResult.fileName }}</span>
            </div>
            <div>
              <span class="text-sm text-gray-500 dark:text-dark-text-secondary">风险等级：</span>
              <el-tag :type="getRiskTagType(detectionResult.riskLevel)" size="small">
                {{ getRiskLevelText(detectionResult.riskLevel) }}
              </el-tag>
            </div>
            <div>
              <span class="text-sm text-gray-500 dark:text-dark-text-secondary">置信度：</span>
              <span class="text-sm font-medium text-gray-900 dark:text-dark-text">{{ detectionResult.confidence }}%</span>
            </div>
            <div>
              <span class="text-sm text-gray-500 dark:text-dark-text-secondary">检测时间：</span>
              <span class="text-sm font-medium text-gray-900 dark:text-dark-text">{{ detectionResult.detectionTime }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 相似图片列表 -->
      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-dark-text mb-4">
          相似图片 ({{ detectionResult.similarImages?.length || 0 }} 张)
        </h3>
        
        <div v-if="detectionResult.similarImages && detectionResult.similarImages.length > 0" 
             class="space-y-4">
          <div v-for="similarImage in detectionResult.similarImages"
               :key="similarImage.id"
               class="bg-white dark:bg-dark-surface rounded-lg border border-gray-200 dark:border-dark-border p-4">
            <div class="flex items-start space-x-4">
              <!-- 相似图片 -->
              <div class="flex-shrink-0">
                <el-image
                  :src="similarImage.url"
                  :preview-src-list="[similarImage.url]"
                  fit="cover"
                  class="w-24 h-24 rounded-lg border border-gray-200 dark:border-dark-border"
                />
              </div>
              
              <!-- 图片信息 -->
              <div class="flex-1">
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <span class="text-sm text-gray-500 dark:text-dark-text-secondary">来源：</span>
                    <span class="text-sm font-medium text-gray-900 dark:text-dark-text">{{ similarImage.source }}</span>
                  </div>
                  <div>
                    <span class="text-sm text-gray-500 dark:text-dark-text-secondary">相似度：</span>
                    <span class="text-sm font-medium text-gray-900 dark:text-dark-text">{{ similarImage.similarity }}%</span>
                  </div>
                  <div v-if="similarImage.copyright" class="col-span-2">
                    <span class="text-sm text-gray-500 dark:text-dark-text-secondary">版权信息：</span>
                    <span class="text-sm font-medium text-gray-900 dark:text-dark-text">{{ similarImage.copyright }}</span>
                  </div>
                </div>
                
                <!-- 相似度进度条 -->
                <div class="mt-3">
                  <div class="flex items-center justify-between mb-1">
                    <span class="text-xs text-gray-500 dark:text-dark-text-secondary">相似度</span>
                    <span class="text-xs font-medium text-gray-900 dark:text-dark-text">{{ similarImage.similarity }}%</span>
                  </div>
                  <el-progress 
                    :percentage="similarImage.similarity" 
                    :stroke-width="6"
                    :show-text="false"
                    :color="getSimilarityColor(similarImage.similarity)"
                  />
                </div>
              </div>
              
              <!-- 操作按钮 -->
              <div class="flex-shrink-0 flex flex-col space-y-2">
                <el-button size="small" @click="openSource(similarImage.url)">
                  查看原图
                </el-button>
                <el-button size="small" type="primary" @click="reportCopyright(similarImage)">
                  举报侵权
                </el-button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 无相似图片状态 -->
        <div v-else class="text-center py-8">
          <svg class="mx-auto h-12 w-12 text-gray-400 dark:text-dark-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-dark-text">未发现相似图片</h3>
          <p class="mt-1 text-sm text-gray-500 dark:text-dark-text-secondary">该图片未检测到潜在的侵权风险</p>
        </div>
      </div>

      <!-- 风险评估建议 -->
      <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
        <h3 class="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-2">风险评估建议</h3>
        <div class="text-sm text-blue-800 dark:text-blue-200">
          <p v-if="detectionResult.riskLevel === 'high_risk'">
            <strong>高风险：</strong>检测到高度相似的图片，建议立即停止使用该图片，或联系版权方获得授权。
          </p>
          <p v-else-if="detectionResult.riskLevel === 'medium_risk'">
            <strong>中风险：</strong>检测到中度相似的图片，建议谨慎使用，可考虑进行图片修改或寻找替代图片。
          </p>
          <p v-else-if="detectionResult.riskLevel === 'low_risk'">
            <strong>低风险：</strong>检测到轻微相似的图片，风险较低，但建议保持关注。
          </p>
          <p v-else>
            <strong>无风险：</strong>未检测到明显的侵权风险，可以安全使用。
          </p>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-between items-center">
        <div class="text-sm text-gray-500 dark:text-dark-text-secondary">
          {{ detectionResult?.similarImages?.length || 0 }} 张相似图片
        </div>
        <div class="flex space-x-3">
          <el-button @click="handleClose">关闭</el-button>
          <el-button type="primary" @click="exportSimilarImages">导出报告</el-button>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { ElMessage } from 'element-plus';
import { 
  getRiskLevelText,
  type DetectionResult,
  type SimilarImage,
  RiskLevel
} from '@/store/copyright-detection';

// Props
const props = defineProps<{
  modelValue: boolean;
  detectionResult: DetectionResult | null;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

// 响应式数据
const dialogVisible = ref(false);

// 监听 modelValue 变化
watch(() => props.modelValue, (val) => {
  dialogVisible.value = val;
});

watch(dialogVisible, (val) => {
  emit('update:modelValue', val);
});

// 方法
const getRiskTagType = (riskLevel: RiskLevel): string => {
  const tagTypes = {
    [RiskLevel.NO_RISK]: 'success',
    [RiskLevel.LOW_RISK]: 'warning',
    [RiskLevel.MEDIUM_RISK]: 'danger',
    [RiskLevel.HIGH_RISK]: 'danger'
  };
  return tagTypes[riskLevel];
};

const getSimilarityColor = (similarity: number): string => {
  if (similarity >= 90) return '#f56565'; // 红色
  if (similarity >= 80) return '#ed8936'; // 橙色
  if (similarity >= 70) return '#ecc94b'; // 黄色
  return '#48bb78'; // 绿色
};

const openSource = (url: string) => {
  window.open(url, '_blank');
};

const reportCopyright = (similarImage: SimilarImage) => {
  ElMessage.success(`正在举报来自 ${similarImage.source} 的侵权图片...`);
  // 这里应该实现实际的举报逻辑
};

const exportSimilarImages = () => {
  ElMessage.success('正在导出相似图片报告...');
  // 这里应该实现实际的导出逻辑
};

const handleClose = () => {
  dialogVisible.value = false;
};
</script>

<style scoped>
/* 自定义样式 */
</style>
