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
        <h4 
          class="font-medium mb-4 flex items-center"
          :style="{ color: 'var(--text-primary)' }"
        >
          <div class="w-2 h-2 rounded-full mr-2" :style="{ backgroundColor: 'var(--accent-color)' }"></div>
          当前登录信息
        </h4>
        
        <!-- 用户信息卡片 -->
        <div 
          class="rounded-lg p-6 mb-6 relative overflow-hidden"
          :style="{
            backgroundColor: 'var(--bg-tertiary)',
            borderColor: 'var(--border-color)'
          }"
        >
          <!-- 科技感装饰 -->
          <div class="absolute top-0 right-0 w-24 h-1" :style="{ background: 'linear-gradient(90deg, transparent, var(--accent-color))' }"></div>
          
          <div class="flex items-start">
            <!-- 头像 -->
            <div class="mr-4">
              <div 
                class="w-12 h-12 rounded-full flex items-center justify-center border"
                :style="{
                  backgroundColor: 'var(--bg-secondary)',
                  borderColor: 'var(--accent-color)'
                }"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" :style="{ color: 'var(--accent-color)' }">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
            </div>
            
            <!-- 用户详细信息 -->
            <div class="flex-1">
              <div class="flex items-center">
                <h5 
                  class="font-medium"
                  :style="{ color: 'var(--text-primary)' }"
                >
                  张三
                </h5>
                <span 
                  class="ml-2 text-xs px-2 py-1 rounded-md"
                  :style="{ 
                    color: 'var(--text-secondary)',
                    backgroundColor: 'var(--bg-secondary)'
                  }"
                >
                  账号ID: ACC20240001
                </span>
              </div>
              <p 
                class="text-sm mt-1"
                :style="{ color: 'var(--text-secondary)' }"
              >
                zhangsan@example.com
              </p>
              
              <!-- 登录信息 -->
              <div class="mt-4 space-y-2 text-sm">
                <div class="flex">
                  <span 
                    class="w-20"
                    :style="{ color: 'var(--text-secondary)' }"
                  >
                    登录时间
                  </span>
                  <span :style="{ color: 'var(--text-primary)' }">2024-01-15 09:30:00</span>
                  <span 
                    class="ml-3 px-2 py-0.5 text-xs rounded-full"
                    :style="{
                      backgroundColor: 'var(--accent-color)',
                      color: 'white'
                    }"
                  >
                    当前
                  </span>
                </div>
                <div class="flex">
                  <span 
                    class="w-20"
                    :style="{ color: 'var(--text-secondary)' }"
                  >
                    登录设备
                  </span>
                  <span :style="{ color: 'var(--text-primary)' }">Chrome 120.0 on Windows 10</span>
                </div>
                <div class="flex">
                  <span 
                    class="w-20"
                    :style="{ color: 'var(--text-secondary)' }"
                  >
                    登录IP
                  </span>
                  <span :style="{ color: 'var(--text-primary)' }">192.168.1.100</span>
                </div>
                <div class="flex">
                  <span 
                    class="w-20"
                    :style="{ color: 'var(--text-secondary)' }"
                  >
                    登录位置
                  </span>
                  <span :style="{ color: 'var(--text-primary)' }">广州市</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 退出选项 -->
        <div class="space-y-4">
          <h4 
            class="font-medium flex items-center"
            :style="{ color: 'var(--text-primary)' }"
          >
            <div class="w-2 h-2 rounded-full mr-2" :style="{ backgroundColor: 'var(--accent-color)' }"></div>
            退出选项
          </h4>
          
          <div class="space-y-3">
            <label 
              class="flex items-start p-3 border rounded-md cursor-pointer hover:opacity-80 transition-all"
              :style="{
                backgroundColor: 'var(--bg-tertiary)',
                borderColor: 'var(--border-color)'
              }"
            >
              <input 
                type="radio" 
                name="logout_option" 
                class="mt-1 mr-3 w-4 h-4" 
                checked
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
                  只有当前设备会退出登录，其他已登录设备将继续保持登录状态
                </p>
              </div>
            </label>
            
            <label 
              class="flex items-start p-3 border rounded-md cursor-pointer hover:opacity-80 transition-all"
              :style="{
                backgroundColor: 'var(--bg-tertiary)',
                borderColor: 'var(--border-color)'
              }"
            >
              <input 
                type="radio" 
                name="logout_option" 
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
                  所有已登录的设备都将被强制退出，需要重新登录才能继续使用
                </p>
              </div>
            </label>
          </div>
        </div>
        
        <!-- 活跃会话 -->
        <div class="mt-6">
          <h4 
            class="font-medium mb-4 flex items-center"
            :style="{ color: 'var(--text-primary)' }"
          >
            <div class="w-2 h-2 rounded-full mr-2" :style="{ backgroundColor: 'var(--accent-color)' }"></div>
            活跃会话
          </h4>
          
          <div class="space-y-3">
            <!-- 当前设备 -->
            <div 
              class="flex items-center p-4 border rounded-lg relative overflow-hidden"
              :style="{
                backgroundColor: 'var(--bg-tertiary)',
                borderColor: 'var(--accent-color)'
              }"
            >
              <!-- 科技感装饰 -->
              <div class="absolute top-0 right-0 w-16 h-1" :style="{ backgroundColor: 'var(--accent-color)' }"></div>
              
              <div 
                class="w-10 h-10 rounded-full flex items-center justify-center mr-3 border"
                :style="{
                  backgroundColor: 'var(--bg-secondary)',
                  borderColor: 'var(--accent-color)'
                }"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" :style="{ color: 'var(--accent-color)' }">
                  <path d="M4 5v11h16V5H4zm-2-.5C2 3.57 2.57 3 3.5 3h17c.93 0 1.5.57 1.5 1.5v12c0 .93-.57 1.5-1.5 1.5H3.5c-.93 0-1.5-.57-1.5-1.5v-12zM2 20h20v1H2v-1z"/>
                </svg>
              </div>
              <div class="flex-1">
                <div class="flex justify-between">
                  <p 
                    class="font-medium"
                    :style="{ color: 'var(--text-primary)' }"
                  >
                    Chrome 120.0 on Windows 10
                  </p>
                  <span 
                    class="text-sm px-2 py-1 rounded-md"
                    :style="{
                      color: 'white',
                      backgroundColor: 'var(--accent-color)'
                    }"
                  >
                    当前设备
                  </span>
                </div>
                <p 
                  class="text-sm"
                  :style="{ color: 'var(--text-secondary)' }"
                >
                  上次活跃：刚刚
                </p>
              </div>
            </div>
            
            <!-- 其他设备 1 -->
            <div 
              class="flex items-center p-4 border rounded-lg"
              :style="{
                backgroundColor: 'var(--bg-tertiary)',
                borderColor: 'var(--border-color)'
              }"
            >
              <div 
                class="w-10 h-10 rounded-full flex items-center justify-center mr-3 border"
                :style="{
                  backgroundColor: 'var(--bg-secondary)',
                  borderColor: 'var(--border-color)'
                }"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" :style="{ color: 'var(--text-secondary)' }">
                  <path d="M7 4v16h10V4H7zM6 2h12a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm6 15a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </svg>
              </div>
              <div class="flex-1">
                <div class="flex justify-between">
                  <p 
                    class="font-medium"
                    :style="{ color: 'var(--text-primary)' }"
                  >
                    Safari on iPhone 15
                  </p>
                  <button 
                    class="text-sm px-2 py-1 rounded-md hover:opacity-80 transition-colors"
                    :style="{
                      color: '#ef4444',
                      backgroundColor: 'rgba(239, 68, 68, 0.1)'
                    }"
                  >
                    禁止
                  </button>
                </div>
                <p 
                  class="text-sm"
                  :style="{ color: 'var(--text-secondary)' }"
                >
                  上次活跃：22分钟前
                </p>
              </div>
            </div>
            
            <!-- 其他设备 2 -->
            <div 
              class="flex items-center p-4 border rounded-lg"
              :style="{
                backgroundColor: 'var(--bg-tertiary)',
                borderColor: 'var(--border-color)'
              }"
            >
              <div 
                class="w-10 h-10 rounded-full flex items-center justify-center mr-3 border"
                :style="{
                  backgroundColor: 'var(--bg-secondary)',
                  borderColor: 'var(--border-color)'
                }"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" :style="{ color: 'var(--text-secondary)' }">
                  <path d="M4 5h16v9h2V4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v10h2V5zm3 16h10v-7H7v7zm-2 0h14v-8a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v8zM12 17.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </svg>
              </div>
              <div class="flex-1">
                <div class="flex justify-between">
                  <p 
                    class="font-medium"
                    :style="{ color: 'var(--text-primary)' }"
                  >
                    Chrome on iPad
                  </p>
                  <button 
                    class="text-sm px-2 py-1 rounded-md hover:opacity-80 transition-colors"
                    :style="{
                      color: '#ef4444',
                      backgroundColor: 'rgba(239, 68, 68, 0.1)'
                    }"
                  >
                    禁止
                  </button>
                </div>
                <p 
                  class="text-sm"
                  :style="{ color: 'var(--text-secondary)' }"
                >
                  上次活跃：3小时前
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 警告信息 -->
        <div 
          class="mt-8 p-4 rounded-lg border relative overflow-hidden"
          :style="{
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            borderColor: '#ef4444'
          }"
        >
          <!-- 科技感装饰 -->
          <div class="absolute top-0 right-0 w-2 h-2 rounded-full" style="background-color: #ef4444;"></div>
          
          <div class="flex items-center text-red-400 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="mr-2">
              <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z"/>
            </svg>
            <h5 class="font-medium">安全提醒</h5>
          </div>
          <p class="text-sm text-red-300 mb-4">
            注销账号会导致本次登录的会话结束，包括账单、商品、交易记录等，但不会丢失您的数据。
          </p>
          
          <button 
            class="px-6 py-2 rounded-md text-sm text-white hover:opacity-80 transition-all duration-200 hover:shadow-lg transform hover:-translate-y-1"
            style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%)"
          >
            安全退出登录
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 退出登录设置组件
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