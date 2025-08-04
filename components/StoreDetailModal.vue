<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    <div class="bg-dark-card rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto text-dark-text">
      <div class="p-5 border-b border-dark-border flex justify-between items-center">
        <h3 class="font-medium">查看详情</h3>
        <button @click="close" class="text-gray-400 hover:text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <div class="p-6" v-if="storeDetail">
        <!-- 基本信息 -->
        <div class="mb-6">
          <h4 class="font-medium text-dark-text mb-4">基本信息</h4>
          <div class="space-y-3">
            <div class="flex items-center">
              <span class="text-dark-text-secondary min-w-[80px]">平台：</span>
              <div class="flex items-center">
                <span 
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  :class="getPlatformBadgeClass(storeDetail.platform)"
                >
                  {{ getPlatformLabel(storeDetail.platform) }}
                </span>
                <span class="ml-2 text-dark-text">{{ storeDetail.storeName || '未知店铺名称' }}</span>
              </div>
              <button 
                class="ml-2 text-blue-500 hover:text-blue-400" 
                @click="editStoreName"
                title="编辑店铺名称"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- 授权秘钥 -->
        <div class="mb-6">
          <h4 class="font-medium text-dark-text mb-4">授权秘钥</h4>
          <div class="flex items-center space-x-2">
            <input 
              type="text" 
              v-model="editForm.authKey" 
              class="flex-1 px-3 py-2 bg-dark-input border border-dark-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-dark-text"
              placeholder="请输入Temu店铺秘钥"
            >
            <button 
              @click="updateAuthKey"
              :disabled="isUpdating || editForm.authKey === storeDetail.authKey"
              class="px-3 py-2 rounded-md transition-colors text-sm"
              :class="isUpdating || editForm.authKey === storeDetail.authKey
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'"
            >
              {{ isUpdating ? '更新中...' : '更新' }}
            </button>
          </div>
        </div>

        <!-- 时间信息 -->
        <div class="mb-6">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <h4 class="font-medium text-dark-text mb-2">授权时间</h4>
              <p class="text-dark-text-secondary text-sm">
                {{ formatTime(storeDetail.authTime) }}
              </p>
            </div>
            <div>
              <h4 class="font-medium text-dark-text mb-2">到期时间</h4>
              <p class="text-dark-text-secondary text-sm">
                {{ formatTime(storeDetail.expireTime) }}
              </p>
            </div>
          </div>
        </div>

        <!-- 创建信息 -->
        <div class="mb-6">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <h4 class="font-medium text-dark-text mb-2">创建人</h4>
              <p class="text-dark-text-secondary text-sm">
                {{ storeDetail.creator || 'admin' }}
              </p>
            </div>
            <div>
              <h4 class="font-medium text-dark-text mb-2">创建时间</h4>
              <p class="text-dark-text-secondary text-sm">
                {{ formatTime(storeDetail.createTime) }}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="p-5 border-t border-dark-border flex justify-end space-x-3">
        <button 
          @click="close" 
          class="px-4 py-2 border border-dark-border rounded-md text-dark-text-secondary hover:bg-dark-input hover:text-dark-text transition-colors"
        >
          取消
        </button>
        <button 
          @click="close" 
          class="px-4 py-2 bg-cyan-400 text-dark-bg rounded-md hover:bg-cyan-500 transition-colors font-medium"
        >
          确定
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, defineProps, defineEmits, watch, onMounted } from 'vue'
import { getStoreDetail, updateStore } from '~/apis/business/store'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  storeId: {
    type: String,
    default: ''
  }
})

const emits = defineEmits(['close', 'updated'])

// 店铺详情数据
const storeDetail = ref(null)
const isUpdating = ref(false)

// 编辑表单
const editForm = reactive({
  authKey: ''
})

// 加载店铺详情
const loadStoreDetail = async () => {
  if (!props.storeId) return
  
  try {
    const response = await getStoreDetail(props.storeId)
    if (response.success) {
      storeDetail.value = response.data
      editForm.authKey = response.data.authKey || ''
    }
  } catch (error) {
    console.error('获取店铺详情失败:', error)
    // 使用模拟数据
    storeDetail.value = {
      id: props.storeId,
      storeId: 'LST007',
      storeName: '杭萨大同贸易有限公司',
      platform: 'temu',
      storeType: 'semi-managed',
      authStatus: 'authorized',
      authKey: 'temu_auth_key_sample_12345',
      authTime: '2025-07-28 22:26:28',
      expireTime: '2025-07-28 22:26:28',
      creator: 'admin',
      createTime: '2025-07-28 22:26:28'
    }
    editForm.authKey = storeDetail.value.authKey
  }
}

// 更新授权秘钥
const updateAuthKey = async () => {
  if (!storeDetail.value || editForm.authKey === storeDetail.value.authKey) {
    return
  }
  
  isUpdating.value = true
  
  try {
    const response = await updateStore({
      id: storeDetail.value.id,
      authKey: editForm.authKey,
      authTime: new Date().toISOString(),
      expireTime: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() // 1年后过期
    })
    
    if (response.success) {
      // 更新本地数据
      storeDetail.value.authKey = editForm.authKey
      storeDetail.value.authTime = new Date().toLocaleString('zh-CN')
      storeDetail.value.expireTime = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleString('zh-CN')
      
      // 通知父组件更新
      emits('updated')
      
      // 显示成功提示
      console.log('授权秘钥更新成功')
    }
  } catch (error) {
    console.error('更新授权秘钥失败:', error)
  } finally {
    isUpdating.value = false
  }
}

// 编辑店铺名称
const editStoreName = () => {
  // 这里可以实现编辑店铺名称的功能
  console.log('编辑店铺名称')
}

// 获取平台标签
const getPlatformLabel = (platform) => {
  const platformMap = {
    'temu': 'Temu',
    'amazon': '亚马逊',
    'shein': 'Shein'
  }
  return platformMap[platform] || platform
}

// 获取平台徽章样式
const getPlatformBadgeClass = (platform) => {
  const classMap = {
    'temu': 'bg-blue-500 text-white',
    'amazon': 'bg-orange-500 text-white',
    'shein': 'bg-purple-500 text-white',
    'tiktok': 'bg-gray-800 text-white',
    'shopify': 'bg-green-500 text-white',
    'aliexpress': 'bg-red-500 text-white'
  }
  return classMap[platform] || 'bg-gray-500 text-white'
}

// 格式化时间
const formatTime = (time) => {
  if (!time) return '-'
  
  try {
    const date = new Date(time)
    return date.toLocaleString('zh-CN')
  } catch (error) {
    return time
  }
}

// 关闭弹窗
const close = () => {
  emits('close')
}

// 重置数据
const resetData = () => {
  storeDetail.value = null
  editForm.authKey = ''
}

// 监听弹窗打开事件
watch(() => props.isOpen, (newVal) => {
  if (newVal && props.storeId) {
    loadStoreDetail()
  } else if (!newVal) {
    resetData()
  }
})

// 监听店铺ID变化
watch(() => props.storeId, (newVal) => {
  if (newVal && props.isOpen) {
    loadStoreDetail()
  }
})
</script> 