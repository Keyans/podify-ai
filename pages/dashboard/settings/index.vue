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
            <NuxtLink to="/dashboard/settings" class="flex items-center p-3 rounded-md bg-yellow-50 mb-2">
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
            <NuxtLink to="/dashboard/settings/team-resources" class="flex items-center p-3 rounded-md hover:bg-gray-50 mb-2">
              <span class="w-5 h-5 flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M12 14v2a6 6 0 0 0-6 6H4a8 8 0 0 1 8-8zm0-1c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm9 6h1v5h-8v-5h1v-1a3 3 0 0 1 6 0v1zm-2 0v-1a1 1 0 0 0-2 0v1h2z"/>
                </svg>
              </span>
              <span class="text-sm">团队资源权限</span>
            </NuxtLink>
            <NuxtLink to="/dashboard/settings/logout" class="flex items-center p-3 rounded-md hover:bg-gray-50">
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
        <!-- 基本信息板块 -->
        <div class="bg-white rounded-lg border mb-6">
          <div class="p-5 border-b">
            <h3 class="font-medium">基本信息</h3>
            <p class="text-gray-500 text-sm mt-1">管理您的账号基本信息</p>
          </div>
          
          <!-- 头像设置 -->
          <div class="p-6 border-b">
            <h3 class="font-medium mb-4">头像设置</h3>
            <div class="flex items-center">
              <div class="mr-4">
                <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="#f97316">
                    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-4.987-3.744A7.966 7.966 0 0 0 12 20c1.97 0 3.773-.712 5.167-1.892A6.979 6.979 0 0 0 12.16 16a6.981 6.981 0 0 0-5.147 2.256zM5.616 16.82A8.975 8.975 0 0 1 12.16 14a8.972 8.972 0 0 1 6.362 2.634 8 8 0 1 0-12.906.187zM12 13a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
                  </svg>
                </div>
              </div>
              <div>
                <p class="text-sm text-gray-500 mb-2">支持 JPG、PNG 格式，文件大小不能超过 2MB</p>
                <button class="px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors">更换头像</button>
              </div>
            </div>
          </div>
          
          <!-- 基本信息表单 -->
          <div class="p-6">
            <h3 class="font-medium mb-6">基本信息</h3>
            <div class="space-y-6">
              <!-- 昵称 -->
              <div class="flex items-center">
                <label class="w-20 text-right text-gray-500 mr-4">* 昵称</label>
                <div class="flex-1 max-w-md">
                  <input type="text" placeholder="张三" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                </div>
              </div>
              
              <!-- 手机号 -->
              <div class="flex items-center">
                <label class="w-20 text-right text-gray-500 mr-4">* 手机号</label>
                <div class="flex-1 max-w-md flex items-center">
                  <input type="text" placeholder="13800138000" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <button class="ml-2 px-4 py-2 text-sm bg-white text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition-colors">
                    修改
                  </button>
            </div>
          </div>
          
              <!-- 邮箱 -->
              <div class="flex items-center">
                <label class="w-20 text-right text-gray-500 mr-4">* 邮箱</label>
                <div class="flex-1 max-w-md flex items-center">
                  <input type="email" placeholder="zhangsan@example.com" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <button class="ml-2 px-4 py-2 text-sm bg-white text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition-colors">
                    修改
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 密码修改板块 -->
        <div class="bg-white rounded-lg border">
          <div class="p-6">
            <h3 class="font-medium mb-6">密码修改</h3>
            <div class="space-y-6">
              <!-- 当前密码 -->
              <div class="flex items-center">
                <label class="w-20 text-right text-gray-500 mr-4">当前密码</label>
                <div class="flex-1 max-w-md">
                  <input type="password" placeholder="请输入当前密码" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                </div>
              </div>
              
              <!-- 新密码 -->
              <div class="flex items-center">
                <label class="w-20 text-right text-gray-500 mr-4">新密码</label>
                <div class="flex-1 max-w-md">
                  <input type="password" placeholder="请输入新密码" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                </div>
              </div>
              
              <!-- 确认密码 -->
              <div class="flex items-center">
                <label class="w-20 text-right text-gray-500 mr-4">确认密码</label>
                <div class="flex-1 max-w-md">
                  <input type="password" placeholder="请再次输入新密码" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                </div>
              </div>
              
              <!-- 按钮 -->
              <div class="flex items-center">
                <div class="w-20"></div>
                <div class="flex items-center space-x-4">
                  <button class="px-6 py-2 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors">
            重置
          </button>
                  <button class="px-6 py-2 text-sm bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors">
                    保存修改
                  </button>
                </div>
              </div>
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
  title: '账号设置 - PodifyAi',
  meta: [
    { name: 'description', content: '管理您的账号设置' }
  ]
})
</script>