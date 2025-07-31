<template>
  <div class="min-h-screen">
    <div class="flex">
      <!-- 主标题 -->
      <div class="flex-1">
        <div class="border-b pb-4">
          <h2 class="text-xl font-medium">账号设置</h2>
        </div>
      </div>
    </div>
    
    <div class="flex mt-6 gap-6">
      <!-- 左侧导航 -->
      <div class="w-64 shrink-0">
        <div class="bg-white rounded-lg border">
          <div class="p-4">
            <NuxtLink to="/dashboard/settings" class="flex items-center p-3 rounded-md hover:bg-gray-50 mb-2">
              <span class="w-5 h-5 flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zM6.023 15.416C7.491 17.606 9.695 19 12.16 19c2.464 0 4.669-1.393 6.136-3.584A8.968 8.968 0 0 0 12.16 13a8.968 8.968 0 0 0-6.137 2.416zM12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                </svg>
              </span>
              <span class="text-sm">基本信息</span>
            </NuxtLink>
            <NuxtLink to="/dashboard/settings/charge" class="flex items-center p-3 rounded-md hover:bg-gray-50 mb-2">
              <span class="w-5 h-5 flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M22 6h-7a6 6 0 1 0 0 12h7v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v2zm-7 2h8v8h-8a4 4 0 1 1 0-8zm0 3a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                </svg>
              </span>
              <span class="text-sm">账号充值</span>
            </NuxtLink>
            <NuxtLink to="/dashboard/settings/transactions" class="flex items-center p-3 rounded-md hover:bg-gray-50 mb-2">
              <span class="w-5 h-5 flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h16V5H4zm8 10h6v2h-6v-2zm-3-3h9v2h-9v-2zm0-3h9v2h-9V9zm-1 9H5v-2h3v2zm0-3H5v-2h3v2zm0-3H5V9h3v2z"/>
                </svg>
              </span>
              <span class="text-sm">交易记录</span>
            </NuxtLink>
            <NuxtLink to="/dashboard/settings/subaccounts" class="flex items-center p-3 rounded-md hover:bg-gray-50 mb-2">
              <span class="w-5 h-5 flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M9 14.9V21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-6.1a5 5 0 1 1 6 0zM6 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm13 6.1V21a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-6.1a5 5 0 1 1 6 0zM16 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                </svg>
              </span>
              <span class="text-sm">子账号管理</span>
            </NuxtLink>
            <NuxtLink to="/dashboard/settings/permissions" class="flex items-center p-3 rounded-md hover:bg-gray-50 mb-2">
              <span class="w-5 h-5 flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-2.29-2.333A17.9 17.9 0 0 1 8.027 13H4.062a8.008 8.008 0 0 0 5.648 6.667zM10.03 13c.151 2.439.848 4.73 1.97 6.752A15.905 15.905 0 0 0 13.97 13h-3.94zm9.908 0h-3.965a17.9 17.9 0 0 1-1.683 6.667A8.008 8.008 0 0 0 19.938 13zM4.062 11h3.965A17.9 17.9 0 0 1 9.71 4.333 8.008 8.008 0 0 0 4.062 11zm5.969 0h3.938A15.905 15.905 0 0 0 12 4.248 15.905 15.905 0 0 0 10.03 11zm4.259-6.667A17.9 17.9 0 0 1 15.973 11h3.965a8.008 8.008 0 0 0-5.648-6.667z"/>
                </svg>
              </span>
              <span class="text-sm">权限设置</span>
            </NuxtLink>
            <NuxtLink to="/dashboard/settings/logout" class="flex items-center p-3 rounded-md bg-yellow-50">
              <span class="w-5 h-5 flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M5 22a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5zm10-6l5-4-5-4v3H9v2h6v3z"/>
                </svg>
              </span>
              <span class="text-sm">退出登录</span>
            </NuxtLink>
          </div>
        </div>
      </div>
      
      <!-- 右侧内容区域 -->
      <div class="flex-1">
        <!-- 退出登录板块 -->
        <div class="bg-white rounded-lg border mb-6">
          <div class="p-5 border-b">
            <h3 class="font-medium">退出登录</h3>
            <p class="text-gray-500 text-sm mt-1">安全退出您的账号会话</p>
          </div>
          
          <!-- 当前登录信息 -->
          <div class="p-6">
            <h4 class="font-medium mb-4">当前登录信息</h4>
            
            <!-- 用户信息卡片 -->
            <div class="bg-gray-50 rounded-lg p-6 mb-6">
              <div class="flex items-start">
                <!-- 头像 -->
                <div class="mr-4">
                  <div class="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="text-gray-500">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                </div>
                
                <!-- 用户详细信息 -->
                <div class="flex-1">
                  <div class="flex items-center">
                    <h5 class="font-medium text-gray-800">张三</h5>
                    <span class="ml-2 text-xs text-gray-500">账号ID: ACC20240001</span>
                  </div>
                  <p class="text-gray-500 text-sm mt-1">zhangsan@example.com</p>
                  
                  <!-- 登录信息 -->
                  <div class="mt-4 space-y-2 text-sm text-gray-600">
                    <div class="flex">
                      <span class="w-20 text-gray-500">登录时间</span>
                      <span>2024-01-15 09:30:00</span>
                      <span class="ml-3 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">当前</span>
                    </div>
                    <div class="flex">
                      <span class="w-20 text-gray-500">登录设备</span>
                      <span>Chrome 120.0 on Windows 10</span>
                    </div>
                    <div class="flex">
                      <span class="w-20 text-gray-500">登录IP</span>
                      <span>192.168.1.100</span>
                    </div>
                    <div class="flex">
                      <span class="w-20 text-gray-500">登录位置</span>
                      <span>广州市</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 退出选项 -->
            <div class="space-y-4">
              <h4 class="font-medium">退出选项</h4>
              
              <div>
                <label class="flex items-start mb-2">
                  <input type="radio" name="logout_option" class="mt-1 mr-2" checked>
                  <div>
                    <p class="font-medium">仅退出当前设备</p>
                    <p class="text-sm text-gray-500 mt-1">只有当前设备会退出登录，其他已登录设备将继续保持登录状态</p>
                  </div>
                </label>
                
                <label class="flex items-start">
                  <input type="radio" name="logout_option" class="mt-1 mr-2">
                  <div>
                    <p class="font-medium">退出所有设备</p>
                    <p class="text-sm text-gray-500 mt-1">所有已登录的设备都将被强制退出，需要重新登录才能继续使用</p>
                  </div>
                </label>
              </div>
            </div>
            
            <!-- 活跃会话 -->
            <div class="mt-6">
              <h4 class="font-medium mb-4">活跃会话</h4>
              
              <div class="space-y-4">
                <!-- 当前设备 -->
                <div class="flex items-center p-4 border rounded-lg bg-blue-50">
                  <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3 border">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="text-blue-600">
                      <path d="M4 5v11h16V5H4zm-2-.5C2 3.57 2.57 3 3.5 3h17c.93 0 1.5.57 1.5 1.5v12c0 .93-.57 1.5-1.5 1.5H3.5c-.93 0-1.5-.57-1.5-1.5v-12zM2 20h20v1H2v-1z"/>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <div class="flex justify-between">
                      <p class="font-medium">Chrome 120.0 on Windows 10</p>
                      <span class="text-blue-600 text-sm">当前设备</span>
                    </div>
                    <p class="text-sm text-gray-600">上次活跃：刚刚</p>
                  </div>
                </div>
                
                <!-- 其他设备 1 -->
                <div class="flex items-center p-4 border rounded-lg">
                  <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3 border">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="text-gray-500">
                      <path d="M7 4v16h10V4H7zM6 2h12a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm6 15a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <div class="flex justify-between">
                      <p class="font-medium">Safari on iPhone 15</p>
                      <button class="text-red-500 text-sm">禁止</button>
                    </div>
                    <p class="text-sm text-gray-600">上次活跃：22分钟前</p>
                  </div>
                </div>
                
                <!-- 其他设备 2 -->
                <div class="flex items-center p-4 border rounded-lg">
                  <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3 border">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="text-gray-500">
                      <path d="M4 5h16v9h2V4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v10h2V5zm3 16h10v-7H7v7zm-2 0h14v-8a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v8zM12 17.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <div class="flex justify-between">
                      <p class="font-medium">Chrome on iPad</p>
                      <button class="text-red-500 text-sm">禁止</button>
                    </div>
                    <p class="text-sm text-gray-600">上次活跃：3小时前</p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 警告信息 -->
            <div class="mt-8 bg-red-50 p-4 rounded-lg border border-red-100">
              <div class="flex items-center text-red-600 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="mr-2">
                  <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z"/>
                </svg>
                <h5 class="font-medium">注意警告</h5>
              </div>
              <p class="text-sm text-red-600">注销账号会导致本次登录的会话结束，包括账单、商品、交易记录等，但不会丢失您的数据。</p>
              
              <button class="mt-4 px-4 py-2 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 transition-colors">
                安全退出登录
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 使用 dashboard 布局
definePageMeta({
  layout: 'dashboard'
})

useHead({
  title: '退出登录 - PodifyAi',
  meta: [
    { name: 'description', content: '安全退出您的账号' }
  ]
})
</script> 