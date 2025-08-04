<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
    <!-- 背景遮罩 -->
    <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" @click="close"></div>
    
    <!-- 弹窗内容 -->
    <div class="flex min-h-full items-center justify-center p-4">
      <div class="relative bg-dark-card rounded-lg shadow-xl max-w-4xl w-full border border-dark-border">
        <!-- 弹窗头部 -->
        <div class="flex items-center justify-between p-6 border-b border-dark-border">
          <h3 class="text-lg font-medium text-dark-text">刊登任务详情</h3>
          <button @click="close" class="text-dark-text-secondary hover:text-dark-text">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- 弹窗内容 -->
        <div class="p-6" v-if="taskData">
          <!-- 任务基本信息 -->
          <div class="grid grid-cols-2 gap-6 mb-6">
            <div>
              <h4 class="text-md font-medium text-dark-text mb-4">基本信息</h4>
              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-dark-text-secondary">任务ID：</span>
                  <span class="text-dark-text">{{ taskData.任务ID || taskData.id }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-dark-text-secondary">任务名称：</span>
                  <span class="text-dark-text">{{ taskData.任务名称 }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-dark-text-secondary">目标平台：</span>
                  <span class="text-dark-text">{{ taskData.目标平台 }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-dark-text-secondary">操作人：</span>
                  <span class="text-dark-text">{{ taskData.操作人 }}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 class="text-md font-medium text-dark-text mb-4">执行状态</h4>
              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-dark-text-secondary">刊登数量：</span>
                  <span class="text-dark-text">{{ taskData.刊登数量 }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-dark-text-secondary">成功率：</span>
                  <span class="text-dark-text">{{ taskData.成功率 }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-dark-text-secondary">当前状态：</span>
                  <span 
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    :class="getStatusBadgeClass(taskData.刊登状态)"
                  >
                    {{ taskData.刊登状态 }}
                  </span>
                </div>
                <div class="flex justify-between">
                  <span class="text-dark-text-secondary">创建时间：</span>
                  <span class="text-dark-text">{{ taskData.创建时间 }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 进度条 -->
          <div class="mb-6">
            <div class="flex justify-between items-center mb-2">
              <span class="text-sm font-medium text-dark-text">执行进度</span>
              <span class="text-sm text-dark-text-secondary">{{ getProgressPercentage() }}%</span>
            </div>
            <div class="w-full bg-dark-input rounded-full h-2">
              <div 
                class="bg-cyan-400 h-2 rounded-full transition-all duration-300"
                :style="{ width: getProgressPercentage() + '%' }"
              ></div>
            </div>
          </div>

          <!-- 刊登结果列表 -->
          <div class="mb-6">
            <h4 class="text-md font-medium text-dark-text mb-4">刊登结果</h4>
            <div class="border border-dark-border rounded-lg overflow-hidden">
              <table class="w-full">
                <thead class="bg-dark-input">
                  <tr>
                    <th class="px-4 py-3 text-left text-xs font-medium text-dark-text-secondary uppercase tracking-wider">商品名称</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-dark-text-secondary uppercase tracking-wider">平台</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-dark-text-secondary uppercase tracking-wider">状态</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-dark-text-secondary uppercase tracking-wider">刊登时间</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-dark-border">
                  <tr v-for="(item, index) in getListingResults()" :key="index">
                    <td class="px-4 py-3 text-sm text-dark-text">{{ item.productName }}</td>
                    <td class="px-4 py-3 text-sm text-dark-text">{{ item.platform }}</td>
                    <td class="px-4 py-3">
                      <span 
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                        :class="getItemStatusClass(item.status)"
                      >
                        {{ item.statusText }}
                      </span>
                    </td>
                    <td class="px-4 py-3 text-sm text-dark-text-secondary">{{ item.time }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- 操作按钮 -->
          <div class="flex justify-end space-x-3">
            <button 
              @click="handleDownload"
              class="px-4 py-2 border border-dark-border rounded-md text-dark-text-secondary hover:bg-dark-input transition-colors"
            >
              下载结果
            </button>
            <button 
              @click="close"
              class="px-4 py-2 bg-cyan-400 text-dark-bg rounded-md hover:bg-cyan-500 transition-colors"
            >
              关闭
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  taskData: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'download', 'page-change'])

// 关闭弹窗
const close = () => {
  emit('close')
}

// 下载结果
const handleDownload = () => {
  emit('download', props.taskData)
}

// 获取状态徽章样式
const getStatusBadgeClass = (status) => {
  const statusMap = {
    '已完成': 'bg-green-100 text-green-800',
    '刊登中': 'bg-yellow-100 text-yellow-800',
    '失败': 'bg-red-100 text-red-800',
    '等待中': 'bg-gray-100 text-gray-800',
    '暂停': 'bg-orange-100 text-orange-800'
  }
  return statusMap[status] || 'bg-gray-100 text-gray-800'
}

// 获取进度百分比
const getProgressPercentage = () => {
  if (!props.taskData) return 0
  
  const successRate = props.taskData.成功率
  if (typeof successRate === 'string') {
    return parseFloat(successRate.replace('%', '')) || 0
  }
  return successRate || 0
}

// 获取刊登结果列表（模拟数据）
const getListingResults = () => {
  return [
    { productName: '春季新款连衣裙', platform: '淘宝', status: 'success', statusText: '成功', time: '2024-01-15 14:30' },
    { productName: '运动休闲鞋', platform: '京东', status: 'success', statusText: '成功', time: '2024-01-15 14:25' },
    { productName: '无线蓝牙耳机', platform: '拼多多', status: 'failed', statusText: '失败', time: '2024-01-15 14:20' },
    { productName: '智能手表', platform: '抖音', status: 'pending', statusText: '处理中', time: '2024-01-15 14:15' },
    { productName: '护肤面膜套装', platform: '天猫', status: 'success', statusText: '成功', time: '2024-01-15 14:10' }
  ]
}

// 获取项目状态样式
const getItemStatusClass = (status) => {
  const statusMap = {
    'success': 'bg-green-100 text-green-800',
    'failed': 'bg-red-100 text-red-800',
    'pending': 'bg-yellow-100 text-yellow-800'
  }
  return statusMap[status] || 'bg-gray-100 text-gray-800'
}
</script> 