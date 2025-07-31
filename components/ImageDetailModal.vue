<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
    <div class="bg-dark-card rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden text-dark-text">
      <!-- Header -->
      <div class="p-4 border-b border-dark-border flex justify-between items-center">
        <h3 class="font-medium text-dark-text">图片详情</h3>
        <button @click="close" class="text-gray-400 hover:text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="flex">
        <!-- 图片预览区域 -->
        <div class="flex-1 p-6 bg-gray-50 flex items-center justify-center">
          <div class="max-w-full max-h-[500px] overflow-hidden rounded-lg shadow-md">
            <img 
              :src="image?.url" 
              :alt="image?.name"
              class="max-w-full max-h-full object-contain"
            />
          </div>
        </div>

        <!-- 信息面板 -->
        <div class="w-80 p-6 border-l border-dark-border overflow-y-auto">
          <!-- 基本信息 -->
          <div class="mb-6">
            <h4 class="text-lg font-semibold text-dark-text mb-4">基本信息</h4>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-dark-text-secondary">文件名</span>
                <span class="text-dark-text font-medium">{{ image?.name }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-dark-text-secondary">尺寸</span>
                <span class="text-dark-text">{{ image?.dimensions }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-dark-text-secondary">文件大小</span>
                <span class="text-dark-text">{{ image?.fileSize }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-dark-text-secondary">格式</span>
                <span class="text-dark-text">{{ getFileFormat(image?.name) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-dark-text-secondary">状态</span>
                <span 
                  class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                  :class="getStatusClass(image?.status)"
                >
                  {{ getStatusText(image?.status) }}
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-dark-text-secondary">创建时间</span>
                <span class="text-dark-text">{{ image?.createdAt }}</span>
              </div>
            </div>
          </div>

          <!-- 处理信息 -->
          <div class="mb-6">
            <h4 class="text-lg font-semibold text-dark-text mb-4">处理信息</h4>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-dark-text-secondary">处理类型</span>
                <span class="text-dark-text">{{ getCategoryName(image?.category) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-dark-text-secondary">任务ID</span>
                <span class="text-dark-text font-mono text-sm">{{ image?.taskId || 'TK-' + image?.id }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-dark-text-secondary">处理时长</span>
                <span class="text-dark-text">{{ image?.processingTime || '2.5秒' }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-dark-text-secondary">模型版本</span>
                <span class="text-dark-text">{{ image?.modelVersion || 'v2.1' }}</span>
              </div>
            </div>
          </div>

          <!-- 描述 -->
          <div class="mb-6">
            <h4 class="text-lg font-semibold text-dark-text mb-4">描述</h4>
            <p class="text-dark-text-secondary text-sm leading-relaxed">
              {{ image?.description || '暂无描述' }}
            </p>
          </div>

          <!-- 标签 -->
          <div class="mb-6">
            <h4 class="text-lg font-semibold text-dark-text mb-4">标签</h4>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="tag in getTags(image)" 
                :key="tag"
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {{ tag }}
              </span>
            </div>
          </div>

          <!-- 元数据 -->
          <div class="mb-6">
            <h4 class="text-lg font-semibold text-dark-text mb-4">元数据</h4>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-dark-text-secondary">色彩空间</span>
                <span class="text-dark-text">sRGB</span>
              </div>
              <div class="flex justify-between">
                <span class="text-dark-text-secondary">位深度</span>
                <span class="text-dark-text">8-bit</span>
              </div>
              <div class="flex justify-between">
                <span class="text-dark-text-secondary">压缩</span>
                <span class="text-dark-text">高质量</span>
              </div>
              <div class="flex justify-between">
                <span class="text-dark-text-secondary">DPI</span>
                <span class="text-dark-text">300</span>
              </div>
            </div>
          </div>

          <!-- 操作按钮 -->
          <div class="space-y-3">
            <button 
              @click="handleDownload"
              class="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-4-4m4 4l4-4m-6 4V4"/>
              </svg>
              下载原图
            </button>
            
            <button 
              @click="handleCopyUrl"
              class="w-full px-4 py-2 border border-dark-border rounded-md text-dark-text hover:bg-dark-hover flex items-center justify-center"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
              </svg>
              复制链接
            </button>
            
            <button 
              @click="handleShare"
              class="w-full px-4 py-2 border border-dark-border rounded-md text-dark-text hover:bg-dark-hover flex items-center justify-center"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
              </svg>
              分享
            </button>
            
            <button 
              @click="handleDelete"
              class="w-full px-4 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50 flex items-center justify-center"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
              删除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  image: {
    type: Object,
    default: () => null
  }
})

const emits = defineEmits(['close', 'download', 'delete'])

// 获取文件格式
const getFileFormat = (filename) => {
  if (!filename) return 'Unknown'
  const ext = filename.split('.').pop()?.toUpperCase()
  return ext || 'Unknown'
}

// 获取分类名称
const getCategoryName = (category) => {
  const categoryMap = {
    'text-to-image': '文生图',
    'background-removal': '背景移除',
    'image-enhancement': '图片增强',
    'style-transfer': '风格转换'
  }
  return categoryMap[category] || '未知类型'
}

// 获取状态文本
const getStatusText = (status) => {
  const statusMap = {
    completed: '已完成',
    processing: '处理中',
    failed: '失败'
  }
  return statusMap[status] || '未知'
}

// 获取状态样式
const getStatusClass = (status) => {
  const statusClasses = {
    completed: 'bg-green-100 text-green-800',
    processing: 'bg-yellow-100 text-yellow-800',
    failed: 'bg-red-100 text-red-800'
  }
  return statusClasses[status] || 'bg-gray-100 text-gray-800'
}

// 获取标签
const getTags = (image) => {
  if (!image) return []
  
  const tags = []
  
  // 根据分类添加标签
  if (image.category === 'text-to-image') {
    tags.push('AI生成', '文本转图像')
  } else if (image.category === 'background-removal') {
    tags.push('背景移除', '抠图')
  } else if (image.category === 'image-enhancement') {
    tags.push('图片增强', '画质提升')
  } else if (image.category === 'style-transfer') {
    tags.push('风格转换', '艺术化')
  }
  
  // 根据状态添加标签
  if (image.status === 'completed') {
    tags.push('已完成')
  }
  
  // 根据尺寸添加标签
  if (image.dimensions && image.dimensions.includes('1024')) {
    tags.push('高清')
  }
  
  return tags.slice(0, 5) // 最多显示5个标签
}

// 处理下载
const handleDownload = () => {
  emits('download', props.image)
}

// 处理复制链接
const handleCopyUrl = async () => {
  if (props.image?.url) {
    try {
      await navigator.clipboard.writeText(props.image.url)
      console.log('链接已复制到剪贴板')
      // 实际应用中可以显示提示消息
    } catch (err) {
      console.error('复制链接失败:', err)
    }
  }
}

// 处理分享
const handleShare = () => {
  if (navigator.share && props.image) {
    navigator.share({
      title: props.image.name,
      text: props.image.description || '查看这张图片',
      url: props.image.url
    }).catch(err => console.log('分享失败:', err))
  } else {
    // 备用分享方案
    handleCopyUrl()
  }
}

// 处理删除
const handleDelete = () => {
  if (confirm('确定要删除这张图片吗？此操作不可恢复。')) {
    emits('delete', props.image)
    close()
  }
}

// 关闭弹窗
const close = () => {
  emits('close')
}
</script> 