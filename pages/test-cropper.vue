<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-6">裁图功能测试</h1>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- 上传测试 -->
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-lg font-semibold mb-4">文件上传测试</h2>
        <TencentCosUpload
          ref="uploadRef"
          :multiple="true"
          :max-files="10"
          upload-text="选择图片测试上传"
          @upload-success="handleUploadSuccess"
          @upload-error="handleUploadError"
          @files-change="handleFilesChange"
        />
      </div>

      <!-- 上传信息显示 -->
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-lg font-semibold mb-4">上传信息</h2>
        <div class="space-y-4">
          <div>
            <h3 class="font-medium text-sm text-gray-600">选择的文件数量</h3>
            <p class="text-lg">{{ fileCount }}</p>
          </div>
          
          <div>
            <h3 class="font-medium text-sm text-gray-600">上传成功数量</h3>
            <p class="text-lg text-green-600">{{ uploadedCount }}</p>
          </div>

          <button 
            @click="testCreateTask"
            :disabled="uploadedCount === 0 || creating"
            class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ creating ? '创建中...' : '创建裁图任务' }}
          </button>
        </div>
      </div>

      <!-- 图片信息详情 -->
      <div v-if="imageInfos.length > 0" class="lg:col-span-2 bg-white p-6 rounded-lg shadow">
        <h2 class="text-lg font-semibold mb-4">图片详细信息</h2>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b">
                <th class="text-left p-2">图片名称</th>
                <th class="text-left p-2">尺寸</th>
                <th class="text-left p-2">格式</th>
                <th class="text-left p-2">大小</th>
                <th class="text-left p-2">URL</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(info, index) in imageInfos" :key="index" class="border-b">
                <td class="p-2">{{ info.imageName }}</td>
                <td class="p-2">{{ info.width }} × {{ info.height }}</td>
                <td class="p-2">{{ info.format }}</td>
                <td class="p-2">{{ formatFileSize(info.fileSize) }}</td>
                <td class="p-2">
                  <a :href="info.imageUrl" target="_blank" class="text-blue-500 hover:underline text-xs">
                    查看图片
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 任务创建结果 -->
      <div v-if="taskResult" class="lg:col-span-2 p-4 rounded" :class="taskResult.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
        <h3 class="font-semibold">{{ taskResult.success ? '✅ 任务创建成功' : '❌ 任务创建失败' }}</h3>
        <p class="text-sm mt-1">{{ taskResult.message }}</p>
        <pre v-if="taskResult.data" class="text-xs mt-2 bg-gray-100 p-2 rounded overflow-x-auto">{{ JSON.stringify(taskResult.data, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import TencentCosUpload from '~/components/TencentCosUpload.vue'
import { createCropperTask } from '~/apis/business/cropper'

// 组件引用
const uploadRef = ref(null)

// 状态
const fileCount = ref(0)
const uploadedCount = ref(0)
const imageInfos = ref([])
const creating = ref(false)
const taskResult = ref(null)

// 处理文件变化
const handleFilesChange = (files) => {
  fileCount.value = files.length
  uploadedCount.value = files.filter(f => f.uploaded).length
}

// 处理上传成功
const handleUploadSuccess = (result) => {
  console.log('文件上传成功:', result)
  updateImageInfos()
}

// 处理上传失败
const handleUploadError = (error) => {
  console.error('文件上传失败:', error)
}

// 更新图片信息
const updateImageInfos = () => {
  if (uploadRef.value) {
    imageInfos.value = uploadRef.value.getImageInfoList()
  }
}

// 格式化文件大小
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// 测试创建任务
const testCreateTask = async () => {
  if (!uploadRef.value || imageInfos.value.length === 0) {
    taskResult.value = {
      success: false,
      message: '请先上传图片'
    }
    return
  }

  creating.value = true
  taskResult.value = null

  try {
    const taskParams = {
      uploadType: 1, // 本地上传
      imageList: imageInfos.value
    }

    console.log('创建任务参数:', taskParams)

    const response = await createCropperTask(taskParams)

    taskResult.value = {
      success: response.success,
      message: response.success ? '任务创建成功' : (response.message || '任务创建失败'),
      data: response.data
    }

  } catch (error) {
    taskResult.value = {
      success: false,
      message: `创建任务失败: ${error.message}`,
      data: null
    }
  } finally {
    creating.value = false
  }
}

// 设置页面标题
definePageMeta({
  title: '裁图功能测试'
})
</script> 