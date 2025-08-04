<template>
  <div class="p-6 space-y-6 bg-gray-50 min-h-screen">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-2xl font-bold mb-6">文件上传UI测试</h1>
      
      <!-- 上传组件测试 -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-lg font-semibold mb-4">缩略图上传组件</h2>
        
        <TencentCosUpload
          :maxFiles="100"
          :maxFileSize="10 * 1024 * 1024"
          galleryType="application"
          @upload-success="handleUploadSuccess"
          @upload-error="handleUploadError"
          @files-change="handleFilesChange"
        />
        
        <!-- 结果展示 -->
        <div v-if="uploadResults.length > 0" class="mt-6">
          <h3 class="text-md font-medium mb-3">上传结果：</h3>
          <div class="space-y-2">
            <div 
              v-for="result in uploadResults" 
              :key="result.id"
              class="p-3 rounded-lg border"
              :class="result.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'"
            >
              <div class="flex justify-between items-start">
                <div>
                  <p class="font-medium" :class="result.success ? 'text-green-800' : 'text-red-800'">
                    {{ result.success ? '✅ 上传成功' : '❌ 上传失败' }}
                  </p>
                  <p class="text-sm text-gray-600 mt-1">
                    文件：{{ result.fileName || result.error }}
                  </p>
                  <p v-if="result.url" class="text-xs text-gray-500 mt-1 break-all">
                    URL：{{ result.url }}
                  </p>
                </div>
                <span class="text-xs text-gray-500">
                  {{ new Date(result.timestamp).toLocaleTimeString() }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TencentCosUpload from '~/components/TencentCosUpload.vue'

// 响应式数据
const uploadResults = ref([])

// 处理上传成功
const handleUploadSuccess = (data) => {
  console.log('上传成功:', data)
  
  if (data.uploadedFiles) {
    data.uploadedFiles.forEach(file => {
      uploadResults.value.unshift({
        id: Date.now() + Math.random(),
        success: true,
        fileName: file.originalName,
        url: file.url,
        timestamp: Date.now()
      })
    })
  }
}

// 处理上传失败
const handleUploadError = (data) => {
  console.error('上传失败:', data)
  
  if (data.errorFiles) {
    data.errorFiles.forEach(file => {
      uploadResults.value.unshift({
        id: Date.now() + Math.random(),
        success: false,
        fileName: file.fileName || file.originalName,
        error: file.error,
        timestamp: Date.now()
      })
    })
  } else if (data.error) {
    uploadResults.value.unshift({
      id: Date.now(),
      success: false,
      error: data.error,
      timestamp: Date.now()
    })
  }
}

// 处理文件变化
const handleFilesChange = (files) => {
  console.log('文件列表变化:', files.length, '个文件')
}
</script> 