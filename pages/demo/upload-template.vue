<template>
  <div class="upload-template-demo">
    <h1 class="text-2xl font-bold mb-6">上传模板组件演示</h1>
    
    <div class="demo-section">
      <h2 class="text-lg font-semibold mb-4">功能说明</h2>
      <ul class="list-disc list-inside mb-6 space-y-2">
        <li>支持多平台模板下载：TEMU、亚马逊、TikTok、Shein、eBay</li>
        <li>支持 Excel 文件上传（.xlsx, .xls格式）</li>
        <li>自动使用文件名作为模板名称</li>
        <li>完整的文件验证（格式、大小限制）</li>
        <li>支持主题色适配（明暗主题）</li>
      </ul>
      
      <a-button type="primary" @click="showUploadModal = true">
        打开上传模板弹窗
      </a-button>
    </div>

    <!-- 上传模板组件 -->
    <UploadTemplateModal
      v-model:open="showUploadModal"
      :platform-options="platformOptions"
      :platform-loading="platformLoading"
      @success="handleUploadSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import UploadTemplateModal from '~/components/batch/upload/uploadTemplateModal.vue'

// 页面标题
useHead({
  title: '上传模板组件演示 - Podify AI'
})

// 弹窗显示状态
const showUploadModal = ref(false)

// 模拟平台选项数据
const platformOptions = ref([
  { label: 'TEMU', value: 'temu', id: '1' },
  { label: '亚马逊', value: 'amazon', id: '2' },
  { label: 'TikTok', value: 'tiktok', id: '3' },
  { label: 'Shein', value: 'shein', id: '4' },
  { label: 'eBay', value: 'ebay', id: '5' }
])

// 模拟加载状态
const platformLoading = ref(false)

// 上传成功处理
const handleUploadSuccess = () => {
  message.success('模板上传成功，列表已刷新！')
  console.log('上传成功，父组件接收到通知')
}
</script>

<style scoped>
.upload-template-demo {
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
}

.demo-section {
  background: var(--bg-secondary);
  padding: 24px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

h1, h2 {
  color: var(--text-primary);
}

ul li {
  color: var(--text-secondary);
}
</style>