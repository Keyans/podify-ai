<template>
  <div>
    <!-- 退出登录板块 -->
    <div 
      class="rounded-lg border mb-6"
      :style="{
        backgroundColor: 'var(--bg-secondary)',
        borderColor: 'var(--border-color)'
      }"
    >
      <div 
        class="p-5 border-b"
        :style="{
          borderColor: 'var(--border-color)'
        }"
      >
        <h3 
          class="font-medium"
          :style="{ color: 'var(--text-primary)' }"
        >
          安全退出登录
        </h3>
        <p 
          class="text-sm mt-1"
          :style="{ color: 'var(--text-secondary)' }"
        >
          安全退出您的账号会话，保护您的数据安全
        </p>
      </div>
      
      <!-- 当前登录信息 -->
      <div class="p-6">
        <!-- 用户信息卡片 -->
        <div 
          class="rounded-lg p-4 mb-6 relative overflow-hidden"
          :style="{
            backgroundColor: 'var(--bg-tertiary)',
            borderColor: 'var(--border-color)'
          }"
        >
          <!-- 科技感装饰 -->
          <div class="absolute top-0 right-0 w-24 h-1" :style="{ background: 'linear-gradient(90deg, transparent, var(--accent-color))' }"></div>
          
          <div class="flex items-center">
            <!-- 头像 -->
            <div class="mr-4">
              <div 
                class="w-10 h-10 rounded-full flex items-center justify-center border"
                :style="{
                  backgroundColor: 'var(--bg-secondary)',
                  borderColor: 'var(--accent-color)'
                }"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" :style="{ color: 'var(--accent-color)' }">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
            </div>
            
            <!-- 用户信息 -->
            <div class="flex-1">
              <h5 
                class="font-medium"
                :style="{ color: 'var(--text-primary)' }"
              >
                {{ userInfo?.nickname || '用户' }}
              </h5>
              <p 
                class="text-sm"
                :style="{ color: 'var(--text-secondary)' }"
              >
                {{ userInfo?.email || userInfo?.phone || '未知' }}
              </p>
            </div>
            
            <!-- 当前状态 -->
            <span 
              class="text-xs px-2 py-1 rounded-full"
              :style="{
                backgroundColor: 'var(--accent-color)',
                color: 'white'
              }"
            >
              在线
            </span>
          </div>
        </div>
        
        <!-- 退出选项 -->
        <div class="space-y-4 mb-6">
          <div class="space-y-3">
            <label 
              class="flex items-start p-3 border rounded-md cursor-pointer hover:opacity-80 transition-all"
              :style="{
                backgroundColor: 'var(--bg-tertiary)',
                borderColor: logoutType === 'current' ? 'var(--accent-color)' : 'var(--border-color)'
              }"
            >
              <input 
                type="radio" 
                v-model="logoutType"
                value="current"
                class="mt-1 mr-3 w-4 h-4" 
                :style="{ accentColor: 'var(--accent-color)' }"
              >
              <div>
                <p 
                  class="font-medium"
                  :style="{ color: 'var(--text-primary)' }"
                >
                  仅退出当前设备
                </p>
                <p 
                  class="text-sm mt-1"
                  :style="{ color: 'var(--text-secondary)' }"
                >
                  只有当前设备会退出登录
                </p>
              </div>
            </label>
            
            <label 
              class="flex items-start p-3 border rounded-md cursor-pointer hover:opacity-80 transition-all"
              :style="{
                backgroundColor: 'var(--bg-tertiary)',
                borderColor: logoutType === 'all' ? 'var(--accent-color)' : 'var(--border-color)'
              }"
            >
              <input 
                type="radio" 
                v-model="logoutType"
                value="all"
                class="mt-1 mr-3 w-4 h-4"
                :style="{ accentColor: 'var(--accent-color)' }"
              >
              <div>
                <p 
                  class="font-medium"
                  :style="{ color: 'var(--text-primary)' }"
                >
                  退出所有设备
                </p>
                <p 
                  class="text-sm mt-1"
                  :style="{ color: 'var(--text-secondary)' }"
                >
                  所有已登录的设备都将被强制退出
                </p>
              </div>
            </label>
          </div>
        </div>
        
        <!-- 操作按钮 -->
        <div class="flex gap-3">
          <button 
            @click="handleLogout"
            :disabled="isLoggingOut"
            class="flex-1 px-6 py-3 rounded-md text-sm text-white font-medium hover:opacity-80 disabled:opacity-50 transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 disabled:transform-none"
            style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%)"
          >
            <span v-if="isLoggingOut" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              正在退出...
            </span>
            <span v-else>安全退出登录</span>
          </button>
        </div>
        
        <!-- 警告信息 -->
        <div 
          class="mt-4 p-3 rounded-lg border"
          :style="{
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            borderColor: '#ef4444'
          }"
        >
          <div class="flex items-center text-red-400 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="mr-2 flex-shrink-0">
              <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z"/>
            </svg>
            <span>退出登录后，您需要重新登录才能继续使用</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { post } from '~/apis/index'
import { logout as clearAuthData } from '~/apis/auth/index'

// 响应式数据
const logoutType = ref('current')
const isLoggingOut = ref(false)
const userInfo = ref(null)

// 获取用户信息
const getUserInfo = () => {
  if (process.client) {
    const userInfoStr = localStorage.getItem('user_info')
    if (userInfoStr) {
      try {
        userInfo.value = JSON.parse(userInfoStr)
      } catch (error) {
        console.error('解析用户信息失败:', error)
      }
    }
  }
}

// 调用退出登录API
const callLogoutApi = async () => {
  try {
    // 构建退出登录的API路径（不包含cuzcuz-ai前缀）
    const logoutPath = '/tenant/api/v1/auth/logout'
    
    // 获取认证头
    const getAuthHeaders = () => {
      if (process.client) {
        const userId = localStorage.getItem('user_id')
        const tenantId = localStorage.getItem('tenant_id')
        const authToken = localStorage.getItem('auth_token')
        
        return {
          'X-Tenant-Id': tenantId || '',
          'X-Auth-User-Id': userId || '', 
          'X-Auth-Platform-Type': 'web',
          'X-Client-Type': 'cuzcuz-ai-web',
          'Authorization': authToken || ''
        }
      }
      return {}
    }
    
    // 调用退出登录接口（传递空对象）
    await post(logoutPath, {}, {
      headers: getAuthHeaders()
    })
    
    console.log('退出登录API调用成功')
  } catch (error) {
    console.error('退出登录API调用失败:', error)
    // 即使API调用失败，也继续执行本地退出登录
  }
}

// 处理退出登录
const handleLogout = async () => {
  if (isLoggingOut.value) return
  
  isLoggingOut.value = true
  
  try {
    // 1. 先调用退出登录API
    await callLogoutApi()
    
    // 2. 清除本地认证数据
    clearAuthData()
    
    // 3. 显示成功消息
    if (process.client && window.$toast) {
      window.$toast.success('退出登录成功')
    }
    
    // 4. 延迟一下再跳转，让用户看到成功消息
    setTimeout(() => {
      // 5. 跳转到登录页面
      if (process.client) {
        window.location.href = '/login'
      }
    }, 1000)
    
  } catch (error) {
    console.error('退出登录失败:', error)
    
    // 即使出错也要清除本地数据并跳转
    clearAuthData()
    
    if (process.client && window.$toast) {
      window.$toast.warning('退出登录完成')
    }
    
    setTimeout(() => {
      if (process.client) {
        window.location.href = '/login'
      }
    }, 1000)
  } finally {
    isLoggingOut.value = false
  }
}

// 组件挂载时获取用户信息
onMounted(() => {
  getUserInfo()
})
</script>

<style scoped>
/* 按钮悬停效果 */
button:hover {
  transform: translateY(-1px);
  transition: transform 0.2s ease;
}

/* 平滑过渡 */
* {
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}
</style> 