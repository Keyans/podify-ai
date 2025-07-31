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
            <NuxtLink to="/dashboard/settings/permissions" class="flex items-center p-3 rounded-md bg-yellow-50 mb-2">
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
        <!-- 权限设置板块 -->
        <div class="bg-white rounded-lg border mb-6">
          <div class="p-5 border-b">
            <h3 class="font-medium">权限设置</h3>
            <p class="text-gray-500 text-sm mt-1">管理不同角色的访问权限</p>
          </div>
          
          <!-- 权限说明 -->
          <div class="p-6 flex items-center bg-gray-50 mx-6 mt-6 rounded-md">
            <div class="w-12 h-12 mr-3 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor" class="text-gray-400">
                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-5h2v2h-2v-2zm0-8h2v6h-2V7z"/>
              </svg>
            </div>
            <p class="text-sm text-gray-600">
              请注意权限的设置会影响用户的正常使用，请谨慎操作。
              <br>
              请在添加子账号时，为其设置一个合理的权限范围。
              <br>
              <span class="text-orange-600">注意：团队资源权限可以在"团队资源权限"页面中进行详细设置。</span>
            </p>
          </div>
          
          <!-- 团队资源权限导航提示 -->
          <div class="mx-6 mt-4 p-4 bg-yellow-50 rounded-md border border-yellow-200">
            <div class="flex">
              <div class="w-10 h-10 mr-4 flex-shrink-0 text-yellow-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M12 14v2a6 6 0 0 0-6 6H4a8 8 0 0 1 8-8zm0-1c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm9 6h1v5h-8v-5h1v-1a3 3 0 0 1 6 0v1zm-2 0v-1a1 1 0 0 0-2 0v1h2z"/>
                </svg>
              </div>
              <div>
                <h4 class="font-medium mb-2">团队资源权限管理</h4>
                <p class="text-sm text-gray-600 mb-3">
                  为了更好地管理团队资源权限，我们单独提供了一个团队资源权限管理页面，您可以在那里设置工作流模板、产品模板和资产库的详细权限。
                </p>
                <NuxtLink to="/dashboard/settings/team-resources" class="inline-flex items-center text-sm text-orange-600 hover:text-orange-700">
                  前往团队资源权限页面
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="ml-1">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </NuxtLink>
              </div>
            </div>
          </div>
          
          <!-- 权限组 -->
          <div class="p-6">
            <h4 class="font-medium mb-4">权限组</h4>
            
            <!-- 超级管理员 -->
            <div class="border border-gray-200 rounded-md mb-4">
              <div class="flex justify-between items-center p-4 border-b">
                <div class="flex items-center">
                  <span class="text-yellow-500 px-2 py-1 bg-yellow-50 rounded-md text-xs mr-3">特权</span>
                  <h5 class="font-medium">超级管理员</h5>
                  <p class="text-gray-500 text-sm ml-3">拥有所有权限</p>
                </div>
                <div class="flex items-center space-x-3">
                  <button class="text-orange-500 px-3 py-1 border border-orange-500 rounded-md text-sm">删除</button>
                  <button class="text-orange-500 px-3 py-1 border border-orange-500 rounded-md text-sm">修改</button>
                </div>
              </div>
              <div class="p-4 text-sm text-gray-600">
                <p>1-3 人数</p>
                <p class="mt-1 text-orange-600">拥有所有团队资源权限</p>
              </div>
            </div>
            
            <!-- 管理员 -->
            <div class="border border-gray-200 rounded-md mb-4">
              <div class="flex justify-between items-center p-4 border-b">
                <div class="flex items-center">
                  <span class="text-red-500 px-2 py-1 bg-red-50 rounded-md text-xs mr-3">管控</span>
                  <h5 class="font-medium">管理员</h5>
                  <p class="text-gray-500 text-sm ml-3">管理系统</p>
                </div>
                <div class="flex items-center space-x-3">
                  <button class="text-orange-500 px-3 py-1 border border-orange-500 rounded-md text-sm">删除</button>
                  <button class="text-orange-500 px-3 py-1 border border-orange-500 rounded-md text-sm">修改</button>
                </div>
              </div>
              <div class="p-4 text-sm text-gray-600">
                <p>3-5 人数</p>
                <p class="mt-1 text-orange-600">可编辑和使用团队资源</p>
              </div>
            </div>
            
            <!-- 操作员 -->
            <div class="border border-gray-200 rounded-md mb-4">
              <div class="flex justify-between items-center p-4 border-b">
                <div class="flex items-center">
                  <span class="text-blue-500 px-2 py-1 bg-blue-50 rounded-md text-xs mr-3">操作</span>
                  <h5 class="font-medium">操作员</h5>
                  <p class="text-gray-500 text-sm ml-3">日常运营管理</p>
                </div>
                <div class="flex items-center space-x-3">
                  <button class="text-orange-500 px-3 py-1 border border-orange-500 rounded-md text-sm">删除</button>
                  <button class="text-orange-500 px-3 py-1 border border-orange-500 rounded-md text-sm">修改</button>
                </div>
              </div>
              <div class="p-4 text-sm text-gray-600">
                <p>5-10 人数</p>
                <p class="mt-1 text-orange-600">可使用团队资源，有限的编辑权限</p>
              </div>
            </div>
            
            <!-- 查看员 -->
            <div class="border border-gray-200 rounded-md">
              <div class="flex justify-between items-center p-4 border-b">
                <div class="flex items-center">
                  <span class="text-gray-500 px-2 py-1 bg-gray-50 rounded-md text-xs mr-3">只读</span>
                  <h5 class="font-medium">查看员</h5>
                  <p class="text-gray-500 text-sm ml-3">只能查看内容</p>
                </div>
                <div class="flex items-center space-x-3">
                  <button class="text-orange-500 px-3 py-1 border border-orange-500 rounded-md text-sm">删除</button>
                  <button class="text-orange-500 px-3 py-1 border border-orange-500 rounded-md text-sm">修改</button>
                </div>
              </div>
              <div class="p-4 text-sm text-gray-600">
                <p>10-20 人数</p>
                <p class="mt-1 text-orange-600">只能查看团队资源，无编辑权限</p>
              </div>
            </div>
          </div>
          
          <!-- 添加权限组 -->
          <div class="px-6 pb-6 flex justify-end">
            <button class="px-4 py-2 bg-orange-500 text-white rounded-md text-sm flex items-center">
              <span class="mr-1">+</span>
              <span>添加权限组</span>
            </button>
          </div>
        </div>
        
        <!-- 连续访问权限 -->
        <div class="bg-white rounded-lg border">
          <div class="p-5 border-b">
            <h3 class="font-medium">连续访问权限</h3>
            <p class="text-gray-500 text-sm mt-1">通过以下设置，限制用户的访问次数和频率</p>
          </div>
          
          <div class="p-6">
            <label class="flex items-center space-x-2 mb-4">
              <input type="checkbox" class="w-4 h-4 rounded" checked>
              <span class="text-gray-700">启用权限限制</span>
              <span class="text-sm text-gray-500 ml-2">法定节假日，可休息一下</span>
            </label>
            
            <div class="bg-gray-50 p-4 rounded-md text-sm text-center text-gray-600 mb-4">
              通过权限设置，有效控制用户的操作范围，提高系统安全性
            </div>
            
            <button class="w-full py-2 text-sm bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors">
              保存设置
            </button>
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
  title: '权限设置 - PodifyAi',
  meta: [
    { name: 'description', content: '管理用户权限设置' }
  ]
})
</script> 