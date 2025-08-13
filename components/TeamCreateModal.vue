<template>
  <div 
    v-if="isOpen" 
    class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    @click="$emit('close')"
  >
    <div 
      class="bg-dark-card border border-dark-border rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden transform transition-all"
      @click.stop
    >
      <!-- 弹窗头部 -->
      <div class="relative bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-6 border-b border-dark-border">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-dark-text">创建新团队</h3>
              <p class="text-sm text-dark-text-secondary">创建新的团队工作空间</p>
            </div>
          </div>
          <button 
            @click="$emit('close')"
            class="p-2 hover:bg-dark-input rounded-lg transition-colors text-dark-text-secondary hover:text-dark-text"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- 弹窗内容 -->
      <div class="p-6 space-y-6">
        <form @submit.prevent="handleSubmit">
          <!-- 团队名称 -->
          <div class="space-y-2">
            <label for="teamName" class="block text-sm font-medium text-dark-text">
              团队名称 <span class="text-red-400">*</span>
            </label>
            <input
              id="teamName"
              v-model="formData.teamName"
              type="text"
              placeholder="请输入团队名称"
              class="w-full px-4 py-3 bg-dark-input border border-dark-border rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 text-dark-text placeholder-dark-text-tertiary transition-all"
              :class="{ 'border-red-400 focus:ring-red-400 focus:border-red-400': errors.teamName }"
              required
            />
            <p v-if="errors.teamName" class="text-sm text-red-400">{{ errors.teamName }}</p>
          </div>

          <!-- 团队描述 -->
          <div class="space-y-2">
            <label for="teamDescription" class="block text-sm font-medium text-dark-text">
              团队描述（选填）
            </label>
            <textarea
              id="teamDescription"
              v-model="formData.teamDescription"
              placeholder="请输入团队描述"
              rows="3"
              class="w-full px-4 py-3 bg-dark-input border border-dark-border rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 text-dark-text placeholder-dark-text-tertiary transition-all resize-none"
            />
          </div>

          <!-- 团队头像上传 -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-dark-text">
              团队头像（选填）
            </label>
            <div class="flex space-x-4">
              <button
                type="button"
                @click="uploadMethod = 'upload'"
                class="flex-1 py-2 px-3 text-sm border rounded-lg transition-all"
                :class="uploadMethod === 'upload' 
                  ? 'border-cyan-400 bg-cyan-500/10 text-cyan-400' 
                  : 'border-dark-border text-dark-text-secondary hover:border-cyan-400'"
              >
                上传图片
              </button>
              <button
                type="button"
                @click="uploadMethod = 'url'"
                class="flex-1 py-2 px-3 text-sm border rounded-lg transition-all"
                :class="uploadMethod === 'url' 
                  ? 'border-cyan-400 bg-cyan-500/10 text-cyan-400' 
                  : 'border-dark-border text-dark-text-secondary hover:border-cyan-400'"
              >
                输入链接
              </button>
            </div>

            <!-- COS上传方式 -->
            <div v-if="uploadMethod === 'upload'" class="mt-4 flex justify-center">
              <AvatarUpload
                ref="avatarUploadRef"
                :max-file-size="5 * 1024 * 1024"
                :auto-upload="false"
                gallery-type="application"
                upload-text=""
                upload-sub-text="JPG、PNG、GIF 格式，不超过 5MB"
                @upload-success="handleUploadSuccess"
                @upload-error="handleUploadError"
              />
            </div>

            <!-- URL输入方式 -->
            <div v-if="uploadMethod === 'url'" class="mt-4">
              <input
                v-model="formData.teamImgUrl"
                type="url"
                placeholder="请输入团队头像图片链接"
                class="w-full px-4 py-3 bg-dark-input border border-dark-border rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 text-dark-text placeholder-dark-text-tertiary transition-all"
              />
              <p class="text-xs text-dark-text-secondary mt-1">支持 HTTP/HTTPS 图片链接</p>
            </div>


          </div>

          <!-- 错误信息显示 -->
          <div v-if="submitError" class="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <svg class="w-4 h-4 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                </svg>
                <p class="text-sm text-red-400">{{ submitError }}</p>
              </div>
              <button 
                @click="submitError = ''"
                class="text-red-300 hover:text-red-200 text-sm underline"
              >
                清除
              </button>
            </div>
          </div>

          <!-- 按钮区域 -->
          <div class="flex space-x-3 pt-4">
            <!-- 如果有错误，显示重置按钮 -->
            <button
              v-if="submitError"
              type="button"
              @click="resetForm"
              class="px-4 py-3 text-dark-text-secondary hover:text-dark-text hover:bg-dark-input border border-dark-border rounded-lg transition-all font-medium"
              :disabled="isSubmitting"
            >
              重置
            </button>
            <button
              type="button"
              @click="$emit('close')"
              class="flex-1 px-4 py-3 text-dark-text-secondary hover:text-dark-text hover:bg-dark-input border border-dark-border rounded-lg transition-all font-medium"
              :disabled="isSubmitting"
            >
              取消
            </button>
            <button
              type="submit"
              class="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="isSubmitting || !formData.teamName.trim()"
            >
              <div v-if="isSubmitting" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                创建中...
              </div>
              <span v-else>创建团队</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, computed } from 'vue'
import AvatarUpload from '~/components/AvatarUpload.vue'

// 定义 props  
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  externalError: {
    type: String,
    default: ''
  }
})

// 定义 emits
const emit = defineEmits(['close', 'submit'])

// 表单数据
const formData = reactive({
  teamName: '',
  teamDescription: '',
  teamImgUrl: '',
  ownerUserId: ''
})

// 表单验证错误
const errors = reactive({
  teamName: ''
})

// 提交状态
const isSubmitting = ref(false)
const submitError = ref('')
const isWaitingForResponse = ref(false) // 等待父组件处理结果

// 上传相关状态
const uploadMethod = ref('upload') // 'upload' | 'url'
const avatarUploadRef = ref(null)
const uploadedAvatarUrl = ref('')

// 初始化表单数据
const initFormData = () => {
  // 从 localStorage 获取 user_id
  if (process.client) {
    const userId = localStorage.getItem('user_id')
    if (userId) {
      formData.ownerUserId = userId
      console.log('✅ 从 localStorage 获取到 user_id:', userId)
    } else {
      console.warn('⚠️ localStorage 中未找到 user_id')
    }
  }
}

// 组件挂载时初始化
if (process.client) {
  initFormData()
}



// 表单验证
const validateForm = () => {
  errors.teamName = ''
  
  if (!formData.teamName.trim()) {
    errors.teamName = '团队名称不能为空'
    return false
  }
  
  if (formData.teamName.trim().length < 2) {
    errors.teamName = '团队名称至少需要2个字符'
    return false
  }
  
  if (formData.teamName.trim().length > 50) {
    errors.teamName = '团队名称不能超过50个字符'
    return false
  }
  
  return true
}

// COS上传成功处理
const handleUploadSuccess = (result) => {
  console.log('头像上传成功:', result)
  uploadedAvatarUrl.value = result.url
}

// COS上传失败处理
const handleUploadError = (error) => {
  console.error('头像上传失败:', error)
}

// 移除头像
const removeAvatar = () => {
  uploadedAvatarUrl.value = ''
  formData.teamImgUrl = ''
  if (avatarUploadRef.value) {
    avatarUploadRef.value.clearFiles()
  }
}

// 处理表单提交
const handleSubmit = async () => {
  console.log('🚀 开始提交表单，当前数据:', {
    teamName: formData.teamName,
    teamDescription: formData.teamDescription
  })
  
  if (!validateForm()) {
    return
  }
  
  isSubmitting.value = true
  submitError.value = '' // 清空之前的错误
  
  try {
    // 如果使用上传方式且有选择的图片，需要先上传
    let finalAvatarUrl = ''
    
    if (uploadMethod.value === 'upload') {
      if (avatarUploadRef.value) {
        const imageInfo = avatarUploadRef.value.getImageInfo()
        console.log('📸 图片信息检查:', imageInfo)
        
        if (imageInfo && imageInfo.file && !imageInfo.uploaded) {
          // 有图片但未上传，先上传
          console.log('🔄 开始上传头像到COS...')
          try {
            await avatarUploadRef.value.uploadFile()
            console.log('✅ 头像上传完成，URL:', uploadedAvatarUrl.value)
          } catch (uploadError) {
            console.error('❌ 头像上传失败:', uploadError)
            
            // 清除AvatarUpload组件的错误显示，统一使用submitError
            if (avatarUploadRef.value && avatarUploadRef.value.clearError) {
              avatarUploadRef.value.clearError()
            }
            
            // 统一在表单级别显示错误
            if (uploadError?.message?.includes('401') || uploadError?.message?.includes('Unauthorized')) {
              submitError.value = '头像上传失败（登录已过期），请重新选择头像或稍后重试'
            } else {
              submitError.value = '头像上传失败，请检查网络连接或重新选择头像'
            }
            
            // 抛出错误，停止后续流程
            throw new Error(submitError.value)
          }
        } else if (imageInfo && imageInfo.uploaded) {
          console.log('✅ 图片已经上传过了，URL:', uploadedAvatarUrl.value)
        } else {
          console.log('📝 没有选择图片，继续不带头像创建团队')
        }
      }
      finalAvatarUrl = uploadedAvatarUrl.value || '' // 上传失败时为空
    } else {
      finalAvatarUrl = formData.teamImgUrl.trim()
    }
    
    // 提交数据给父组件
    console.log('提交团队数据:', {
      teamName: formData.teamName.trim(),
      teamDescription: formData.teamDescription.trim() || '',
      teamImgUrl: finalAvatarUrl || '',
      ownerUserId: formData.ownerUserId
    })
    
    console.log('📤 发送创建团队请求给父组件...')
    isWaitingForResponse.value = true
    
    emit('submit', {
      teamName: formData.teamName.trim(),
      teamDescription: formData.teamDescription.trim() || '',
      teamImgUrl: finalAvatarUrl || '',
      ownerUserId: formData.ownerUserId
    })
    
    // 注意：emit不会等待父组件处理完成，所以不能在这里重置表单
    // 表单重置应该由父组件在成功后通过关闭弹窗触发
    console.log('⏳ 等待父组件处理结果...')
  } catch (error) {
    console.error('❌ 创建团队失败:', error)
    console.log('😱 错误发生后，表单数据:', {
      teamName: formData.teamName,
      teamDescription: formData.teamDescription
    })
    // 失败时不清空表单，保留用户输入的数据
    submitError.value = error?.message || '创建团队失败，请重试'
    // 设置错误标记，确保弹窗关闭时也不会重置表单
  } finally {
    isSubmitting.value = false
    // 注意：不在这里重置 isWaitingForResponse，让弹窗关闭监听来处理
  }
}

// 重置表单 - 添加强制检查
const resetForm = () => {
  console.log('🧹 resetForm被调用，检查是否有错误:', submitError.value)
  
  // 强制检查：如果有任何错误，拒绝重置
  if (submitError.value) {
    console.log('❌ 发现错误，拒绝重置表单:', submitError.value)
    return
  }
  
  console.log('✅ 无错误，执行表单重置')
  formData.teamName = ''
  formData.teamDescription = ''
  formData.teamImgUrl = ''
  formData.ownerUserId = ''
  errors.teamName = ''
  submitError.value = '' // 清空错误信息
  uploadedAvatarUrl.value = ''
  uploadMethod.value = 'upload'
  if (avatarUploadRef.value) {
    avatarUploadRef.value.clearFiles()
  }
  // 重新初始化表单数据
  initFormData()
}

// 监听外部错误（来自父组件）
watch(() => props.externalError, (newError) => {
  if (newError) {
    console.log('📨 收到父组件错误:', newError)
    submitError.value = newError
    isWaitingForResponse.value = false
  }
})

// 监听表单数据变化（调试用）
watch(() => formData.teamName, (newVal, oldVal) => {
  if (oldVal && !newVal) {
    console.log('⚠️ 团队名称被清空了！', { oldVal, newVal, hasError: !!submitError.value })
    console.trace('清空调用栈')
  }
})

// 监听弹窗关闭，有错误时永不重置表单
watch(() => props.isOpen, (newVal, oldVal) => {
  console.log('👁️ 弹窗状态变化:', { 
    newVal, 
    oldVal, 
    hasError: !!submitError.value,
    isWaiting: isWaitingForResponse.value 
  })
  
  if (!newVal && oldVal) {
    // 重置等待状态
    isWaitingForResponse.value = false
    
    // 有任何错误时都不重置表单，保留用户数据
    if (submitError.value) {
      console.log('🚫 有错误存在，绝不重置表单，保留用户数据')
      return
    }
    
    // 只有在完全没有错误的情况下才重置表单
    console.log('✅ 弹窗关闭且无错误，这是成功情况，重置表单')
    resetForm()
  }
})
</script>

<style scoped>
/* 自定义滚动条样式 */
textarea::-webkit-scrollbar {
  width: 4px;
}

textarea::-webkit-scrollbar-track {
  background: transparent;
}

textarea::-webkit-scrollbar-thumb {
  background: rgba(156, 163, 175, 0.3);
  border-radius: 2px;
}

textarea::-webkit-scrollbar-thumb:hover {
  background: rgba(156, 163, 175, 0.5);
}
</style>