<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-6">裁图任务列表测试</h1>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- 统计数据测试 -->
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-lg font-semibold mb-4">统计数据</h2>
        <button 
          @click="testStats" 
          :disabled="loading"
          class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50 mb-4"
        >
          {{ loading ? '加载中...' : '获取统计数据' }}
        </button>
        
        <div v-if="statsData" class="space-y-2">
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div>总数: {{ statsData.count }}</div>
            <div>成功: {{ statsData.successCount }}</div>
            <div>失败: {{ statsData.failedCount }}</div>
            <div>成功率: {{ statsData.successRate }}%</div>
            <div>进行中: {{ statsData.inProgressCount }}</div>
            <div>今日: {{ statsData.todayCount }}</div>
          </div>
        </div>
      </div>

      <!-- 任务列表测试 -->
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-lg font-semibold mb-4">任务列表</h2>
        <button 
          @click="testTaskList" 
          :disabled="loading"
          class="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 disabled:opacity-50 mb-4"
        >
          {{ loading ? '加载中...' : '获取任务列表' }}
        </button>
        
        <div v-if="taskList.length > 0" class="space-y-2">
          <p class="text-sm text-gray-600">共 {{ taskList.length }} 条任务</p>
          <div v-for="(task, index) in taskList" :key="index" class="border rounded p-3 text-sm">
            <div class="grid grid-cols-2 gap-2">
              <div>ID: {{ task.裁图ID }}</div>
              <div>目标: {{ task.目标 }}</div>
              <div>成功: {{ task.成功 }}</div>
              <div>状态: {{ task.任务状态 }}</div>
              <div class="col-span-2">创建: {{ task.创建时间 }}</div>
            </div>
            <button 
              @click="testTaskDetail(task)"
              class="mt-2 text-blue-500 hover:underline text-xs"
            >
              查看详情
            </button>
          </div>
        </div>
      </div>

      <!-- 原始数据显示 -->
      <div v-if="rawResponse" class="lg:col-span-2 bg-gray-50 p-6 rounded-lg">
        <h2 class="text-lg font-semibold mb-4">原始响应数据</h2>
        <pre class="text-xs bg-white p-4 rounded overflow-x-auto">{{ JSON.stringify(rawResponse, null, 2) }}</pre>
      </div>

      <!-- 任务详情 -->
      <div v-if="taskDetail.length > 0" class="lg:col-span-2 bg-white p-6 rounded-lg shadow">
        <h2 class="text-lg font-semibold mb-4">任务详情</h2>
        <div class="space-y-2">
          <p class="text-sm text-gray-600">共 {{ taskDetail.length }} 条详情</p>
          <div v-for="(detail, index) in taskDetail" :key="index" class="border rounded p-3 text-sm">
            {{ JSON.stringify(detail, null, 2) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getCropperStats, getCropperTaskList, getCropperTaskDetail } from '~/apis/business/cropper'

// 状态
const loading = ref(false)
const statsData = ref(null)
const taskList = ref([])
const taskDetail = ref([])
const rawResponse = ref(null)

// 状态文本转换
const getStatusText = (status) => {
  const statusMap = {
    0: '进行中',
    1: '已完成', 
    2: '失败',
    3: '暂停'
  }
  return statusMap[status] || '未知'
}

// 测试统计数据
const testStats = async () => {
  loading.value = true
  try {
    const response = await getCropperStats()
    console.log('统计数据响应:', response)
    rawResponse.value = response
    
    if (response.success) {
      statsData.value = response.data
    }
  } catch (error) {
    console.error('获取统计数据失败:', error)
  } finally {
    loading.value = false
  }
}

// 测试任务列表
const testTaskList = async () => {
  loading.value = true
  try {
    const params = {
      page: 1,
      limit: 10
    }
    const response = await getCropperTaskList(params)
    console.log('任务列表响应:', response)
    rawResponse.value = response
    
    if (response.success) {
      // 映射数据字段
      const rawList = response.data?.cropperTaskList || []
      taskList.value = rawList.map(item => ({
        id: item.cropperId,
        裁图ID: item.cropperId,
        目标: item.cropperNum,
        成功: item.cropperSuccessNum,
        失败: item.cropperFailNum,
        任务状态: getStatusText(item.cropperStatus),
        创建人: item.createBy,
        创建时间: item.createTime,
        _raw: item
      }))
    }
  } catch (error) {
    console.error('获取任务列表失败:', error)
  } finally {
    loading.value = false
  }
}

// 测试任务详情
const testTaskDetail = async (task) => {
  loading.value = true
  try {
    const params = {
      cropperId: task.id,
      page: 1,
      limit: 100
    }
    const response = await getCropperTaskDetail(params)
    console.log('任务详情响应:', response)
    rawResponse.value = response
    
    if (response.success) {
      taskDetail.value = response.data?.list || response.data?.cropperTaskList || []
    }
  } catch (error) {
    console.error('获取任务详情失败:', error)
  } finally {
    loading.value = false
  }
}

// 设置页面标题
definePageMeta({
  title: '任务列表测试'
})
</script> 