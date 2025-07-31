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
            <NuxtLink to="/dashboard/settings/charge" class="flex items-center p-3 rounded-md bg-yellow-50 mb-2">
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
        <!-- 账号充值板块 -->
        <div class="bg-white rounded-lg border mb-6">
          <div class="p-5 border-b">
            <h3 class="font-medium">账号充值</h3>
            <p class="text-gray-500 text-sm mt-1">为您的账号充值，享受更多服务</p>
          </div>
          
          <!-- 当前余额 -->
          <div class="p-6 bg-orange-500 mx-6 mt-6 rounded-lg text-white">
            <div class="flex justify-between items-center">
              <div>
                <p class="text-sm mb-2">当前余额</p>
                <div class="text-3xl font-bold">¥1234.56</div>
              </div>
              <div>
                <p class="text-xs text-right">账户ID</p>
                <p class="text-sm">ACC20240001</p>
              </div>
            </div>
          </div>
          
          <!-- 选择充值金额 -->
          <div class="p-6">
            <h3 class="font-medium mb-4">选择充值金额</h3>
            
            <!-- 金额选择网格 -->
            <div class="grid grid-cols-3 gap-4 mb-6">
              <button class="h-14 border rounded-md hover:border-blue-500 hover:text-blue-500 transition-colors">
                ¥50
              </button>
              <button class="h-14 border rounded-md hover:border-blue-500 hover:text-blue-500 transition-colors">
                ¥100
              </button>
              <button class="h-14 border rounded-md hover:border-blue-500 hover:text-blue-500 transition-colors">
                ¥200
              </button>
              <button class="h-14 border rounded-md hover:border-blue-500 hover:text-blue-500 transition-colors">
                ¥500
              </button>
              <button class="h-14 border rounded-md hover:border-blue-500 hover:text-blue-500 transition-colors">
                ¥1000
              </button>
              <button class="h-14 border rounded-md hover:border-blue-500 hover:text-blue-500 transition-colors">
                ¥2000
              </button>
            </div>
            
            <!-- 自定义金额 -->
            <div class="mb-6">
              <p class="text-sm mb-2">自定义金额</p>
              <input type="text" placeholder="请输入充值金额" class="w-full px-3 py-2 h-14 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            </div>
            
            <!-- 支付方式 -->
            <div class="mb-6">
              <p class="text-sm mb-4">选择支付方式</p>
              <div class="space-y-3">
                <div class="border rounded-md p-3 bg-yellow-50 relative">
                  <div class="flex items-center">
                    <div class="mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="text-yellow-600">
                        <path d="M9.5 17.5m-1.5 0a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0"></path>
                        <path d="M15 12l-3 -5l3 -4"></path>
                        <path d="M12 7h4a2 2 0 0 1 2 2v9"></path>
                      </svg>
                    </div>
                    <div>
                      <p class="font-medium mb-1">支付宝</p>
                      <p class="text-xs text-gray-500">推荐使用，到账快速</p>
                    </div>
                  </div>
                  <div class="absolute right-3 top-1/2 -translate-y-1/2">
                    <div class="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div class="border rounded-md p-3">
                  <div class="flex items-center">
                    <div class="mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="text-green-600">
                        <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"></path>
                        <path d="M7 15v-6"></path>
                        <path d="M10 15v-6"></path>
                        <path d="M13 15v-3"></path>
                        <path d="M17 15v-6"></path>
                        <path d="M3 9h18"></path>
                      </svg>
                    </div>
                    <div>
                      <p class="font-medium mb-1">微信支付</p>
                      <p class="text-xs text-gray-500">便捷支付，安全可靠</p>
                    </div>
                  </div>
                </div>
                
                <div class="border rounded-md p-3">
                  <div class="flex items-center">
                    <div class="mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="text-gray-600">
                        <path d="M3 5m0 3a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3z"></path>
                        <path d="M3 10h18"></path>
                        <path d="M7 15h.01"></path>
                        <path d="M11 15h2"></path>
                      </svg>
                    </div>
                    <div>
                      <p class="font-medium mb-1">银行卡</p>
                      <p class="text-xs text-gray-500">支持各大银行卡</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 立即充值按钮 -->
            <div>
              <button class="w-full py-3 bg-gray-200 hover:bg-gray-300 rounded-md text-sm transition-colors">
                立即充值 ¥0.00
              </button>
            </div>
          </div>
        </div>
        
        <!-- 充值记录 -->
        <div class="bg-white rounded-lg border mb-6">
          <div class="p-5 border-b flex justify-between items-center">
            <h3 class="font-medium">充值记录</h3>
            <button class="text-orange-500 text-sm">刷新</button>
          </div>
          
          <div class="p-6">
            <!-- 充值记录列表 -->
            <div class="space-y-4">
              <div class="flex items-center">
                <div class="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="text-green-500">
                    <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"></path>
                    <path d="M7 15v-6"></path>
                    <path d="M10 15v-6"></path>
                    <path d="M13 15v-3"></path>
                    <path d="M17 15v-6"></path>
                    <path d="M3 9h18"></path>
                  </svg>
                </div>
                <div class="flex-1">
                  <div class="flex justify-between">
                    <p class="font-medium">¥500.00</p>
                    <span class="text-green-500 text-sm">成功</span>
                  </div>
                  <p class="text-sm text-gray-500">支付宝 • 2024-01-15 14:30:00</p>
                </div>
              </div>
              
              <div class="flex items-center">
                <div class="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="text-green-500">
                    <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"></path>
                    <path d="M7 15v-6"></path>
                    <path d="M10 15v-6"></path>
                    <path d="M13 15v-3"></path>
                    <path d="M17 15v-6"></path>
                    <path d="M3 9h18"></path>
                  </svg>
                </div>
                <div class="flex-1">
                  <div class="flex justify-between">
                    <p class="font-medium">¥200.00</p>
                    <span class="text-green-500 text-sm">成功</span>
                  </div>
                  <p class="text-sm text-gray-500">微信支付 • 2024-01-10 09:15:00</p>
                </div>
              </div>
              
              <div class="flex items-center">
                <div class="w-10 h-10 bg-yellow-50 rounded-full flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="text-yellow-500">
                    <path d="M3 5m0 3a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3z"></path>
                    <path d="M3 10h18"></path>
                    <path d="M7 15h.01"></path>
                    <path d="M11 15h2"></path>
                  </svg>
                </div>
                <div class="flex-1">
                  <div class="flex justify-between">
                    <p class="font-medium">¥100.00</p>
                    <span class="text-yellow-500 text-sm">处理中</span>
                  </div>
                  <p class="text-sm text-gray-500">银行卡 • 2024-01-08 16:45:00</p>
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
  title: '账号充值 - PodifyAi',
  meta: [
    { name: 'description', content: '为您的账号充值' }
  ]
})
</script> 