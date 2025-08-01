<template>
  <div 
    class="min-h-screen"
    :style="{
      backgroundColor: 'var(--bg-primary)',
      color: 'var(--text-primary)'
    }"
  >
    <div class="flex">
      <!-- 主标题 -->
      <div class="flex-1">
        <div 
          class="border-b pb-4"
          :style="{
            borderColor: 'var(--border-color)'
          }"
        >
          <h2 
            class="text-xl font-medium"
            :style="{ color: 'var(--text-primary)' }"
          >
            账号设置
          </h2>
        </div>
      </div>
    </div>
    
    <div class="flex mt-6 gap-6">
      <!-- 左侧导航 -->
      <div class="w-64 shrink-0">
        <div 
          class="rounded-lg border"
          :style="{
            backgroundColor: 'var(--bg-secondary)',
            borderColor: 'var(--border-color)'
          }"
        >
          <div class="p-4">
            <NuxtLink 
              to="/dashboard/settings" 
              class="flex items-center p-3 rounded-md hover:bg-dark-hover mb-2"
              :style="{ color: 'var(--text-primary)' }"
            >
              <span class="w-5 h-5 flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zM6.023 15.416C7.491 17.606 9.695 19 12.16 19c2.464 0 4.669-1.393 6.136-3.584A8.968 8.968 0 0 0 12.16 13a8.968 8.968 0 0 0-6.137 2.416zM12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                </svg>
              </span>
              <span class="text-sm">基本信息</span>
            </NuxtLink>
            <NuxtLink 
              to="/dashboard/settings/charge" 
              class="flex items-center p-3 rounded-md hover:bg-dark-hover mb-2"
              :style="{ color: 'var(--text-primary)' }"
            >
              <span class="w-5 h-5 flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M22 6h-7a6 6 0 1 0 0 12h7v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v2zm-7 2h8v8h-8a4 4 0 1 1 0-8zm0 3a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                </svg>
              </span>
              <span class="text-sm">账号充值</span>
            </NuxtLink>
            <NuxtLink 
              to="/dashboard/settings/transactions" 
              class="flex items-center p-3 rounded-md hover:bg-dark-hover mb-2"
              :style="{ color: 'var(--text-primary)' }"
            >
              <span class="w-5 h-5 flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h16V5H4zm8 10h6v2h-6v-2zm-3-3h9v2h-9v-2zm0-3h9v2h-9V9zm-1 9H5v-2h3v2zm0-3H5v-2h3v2zm0-3H5V9h3v2z"/>
                </svg>
              </span>
              <span class="text-sm">交易记录</span>
            </NuxtLink>
            <NuxtLink 
              to="/dashboard/settings/subaccounts" 
              class="flex items-center p-3 rounded-md mb-2"
              :style="{
                backgroundColor: 'var(--accent-color)',
                color: 'white'
              }"
            >
              <span class="w-5 h-5 flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M9 14.9V21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-6.1a5 5 0 1 1 6 0zM6 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm13 6.1V21a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-6.1a5 5 0 1 1 6 0zM16 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                </svg>
              </span>
              <span class="text-sm">子账号管理</span>
            </NuxtLink>
            <NuxtLink 
              to="/dashboard/settings/permissions" 
              class="flex items-center p-3 rounded-md hover:bg-dark-hover mb-2"
              :style="{ color: 'var(--text-primary)' }"
            >
              <span class="w-5 h-5 flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-2.29-2.333A17.9 17.9 0 0 1 8.027 13H4.062a8.008 8.008 0 0 0 5.648 6.667zM10.03 13c.151 2.439.848 4.73 1.97 6.752A15.905 15.905 0 0 0 13.97 13h-3.94zm9.908 0h-3.965a17.9 17.9 0 0 1-1.683 6.667A8.008 8.008 0 0 0 19.938 13zM4.062 11h3.965A17.9 17.9 0 0 1 9.71 4.333 8.008 8.008 0 0 0 4.062 11zm5.969 0h3.938A15.905 15.905 0 0 0 12 4.248 15.905 15.905 0 0 0 10.03 11zm4.259-6.667A17.9 17.9 0 0 1 15.973 11h3.965a8.008 8.008 0 0 0-5.648-6.667z"/>
                </svg>
              </span>
              <span class="text-sm">权限设置</span>
            </NuxtLink>
            <NuxtLink 
              to="/dashboard/settings/team-resources" 
              class="flex items-center p-3 rounded-md hover:bg-dark-hover mb-2"
              :style="{ color: 'var(--text-primary)' }"
            >
              <span class="w-5 h-5 flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M12 14v2a6 6 0 0 0-6 6H4a8 8 0 0 1 8-8zm0-1c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm9 6h1v5h-8v-5h1v-1a3 3 0 0 1 6 0v1zm-2 0v-1a1 1 0 0 0-2 0v1h2z"/>
                </svg>
              </span>
              <span class="text-sm">团队资源权限</span>
            </NuxtLink>
            <NuxtLink 
              to="/dashboard/settings/logout" 
              class="flex items-center p-3 rounded-md hover:bg-dark-hover"
              :style="{ color: 'var(--text-primary)' }"
            >
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
        <!-- 子账号管理板块 -->
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
              子账号管理
            </h3>
            <p 
              class="text-sm mt-1"
              :style="{ color: 'var(--text-secondary)' }"
            >
              管理您的子账号，分配不同的权限
            </p>
          </div>
          
          <!-- 数据统计 -->
          <div class="grid grid-cols-3 gap-4 p-6">
            <div 
              class="rounded-lg p-4 relative overflow-hidden"
              :style="{
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
              }"
            >
              <div class="absolute top-0 right-0 w-16 h-16 bg-white bg-opacity-10 rounded-full transform translate-x-8 -translate-y-8"></div>
              
              <div class="relative z-10 text-white">
                <div class="flex items-center mb-2">
                  <div class="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M5 20h14v-1a7 7 0 00-7-7 7 7 0 00-7 7v1zm7-18a5 5 0 110 10 5 5 0 010-10z"/>
                    </svg>
                  </div>
                  <span class="text-sm opacity-90">总子账号</span>
                </div>
                <div class="text-lg font-semibold">8</div>
              </div>
            </div>
            
            <div 
              class="rounded-lg p-4 relative overflow-hidden"
              :style="{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
              }"
            >
              <div class="absolute top-0 right-0 w-16 h-16 bg-white bg-opacity-10 rounded-full transform translate-x-8 -translate-y-8"></div>
              
              <div class="relative z-10 text-white">
                <div class="flex items-center mb-2">
                  <div class="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 12l2 2 4-4"></path>
                      <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9-9-1.8-9-9 1.8-9 9-9z"></path>
                    </svg>
                  </div>
                  <span class="text-sm opacity-90">活跃账号</span>
                </div>
                <div class="text-lg font-semibold">6</div>
              </div>
            </div>
            
            <div 
              class="rounded-lg p-4 relative overflow-hidden"
              :style="{
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
              }"
            >
              <div class="absolute top-0 right-0 w-16 h-16 bg-white bg-opacity-10 rounded-full transform translate-x-8 -translate-y-8"></div>
              
              <div class="relative z-10 text-white">
                <div class="flex items-center mb-2">
                  <div class="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 9v4"></path>
                      <path d="M12 17h.01"></path>
                      <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9-9-1.8-9-9 1.8-9 9-9z"></path>
                    </svg>
                  </div>
                  <span class="text-sm opacity-90">待定账号</span>
                </div>
                <div class="text-lg font-semibold">3</div>
              </div>
            </div>
          </div>
          
          <!-- 搜索筛选区域 -->
          <div class="px-6 pb-4">
            <div class="flex justify-between items-center mb-4">
              <div class="flex space-x-4">
                <div>
                  <input 
                    type="text" 
                    placeholder="搜索名称" 
                    class="border rounded-md px-3 py-2 text-sm w-60 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    :style="{
                      backgroundColor: 'var(--bg-input)',
                      borderColor: 'var(--border-color)',
                      color: 'var(--text-primary)'
                    }"
                  >
                </div>
                <div>
                  <select 
                    class="border rounded-md px-3 py-2 text-sm w-40 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    :style="{
                      backgroundColor: 'var(--bg-input)',
                      borderColor: 'var(--border-color)',
                      color: 'var(--text-primary)'
                    }"
                  >
                    <option>账号状态</option>
                  </select>
                </div>
                <div>
                  <button 
                    class="px-4 py-2 rounded-md text-sm text-white hover:opacity-80 transition-colors"
                    :style="{
                      backgroundColor: 'var(--accent-color)'
                    }"
                  >
                    搜索
                  </button>
                </div>
              </div>
              <div>
                <button 
                  @click="openCreateModal" 
                  class="px-4 py-2 rounded-md text-sm flex items-center text-white hover:opacity-80 transition-colors"
                  :style="{
                    backgroundColor: 'var(--accent-color)'
                  }"
                >
                  <span class="mr-1">+</span>
                  <span>创建子账号</span>
                </button>
              </div>
            </div>
          </div>
          
          <!-- 子账号表格 -->
          <div class="px-6 pb-6 overflow-x-auto">
            <table class="w-full border-collapse">
              <thead>
                <tr 
                  class="text-left text-sm border-t border-b"
                  :style="{
                    color: 'var(--text-secondary)',
                    borderColor: 'var(--border-color)'
                  }"
                >
                  <th class="py-3 font-normal w-10">
                    <input type="checkbox" class="w-4 h-4 rounded">
                  </th>
                  <th class="py-3 font-normal">头像</th>
                  <th class="py-3 font-normal">账号信息</th>
                  <th class="py-3 font-normal">联系方式</th>
                  <th class="py-3 font-normal">创建时间</th>
                  <th class="py-3 font-normal">最后登录</th>
                  <th class="py-3 font-normal text-center">操作</th>
                </tr>
              </thead>
              <tbody class="text-sm">
                <tr 
                  class="border-b hover:bg-hover transition-colors"
                  :style="{
                    borderColor: 'var(--border-color)'
                  }"
                >
                  <td class="py-4">
                    <input type="checkbox" class="w-4 h-4 rounded">
                  </td>
                  <td class="py-4">
                    <div 
                      class="w-8 h-8 rounded-full flex items-center justify-center"
                      :style="{
                        backgroundColor: 'var(--bg-tertiary)'
                      }"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" :style="{ color: 'var(--text-secondary)' }">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                  </td>
                  <td class="py-4">
                    <div 
                      class="font-medium"
                      :style="{ color: 'var(--text-primary)' }"
                    >
                      张三
                    </div>
                    <div 
                      class="text-xs"
                      :style="{ color: 'var(--text-secondary)' }"
                    >
                      zhangsan@company.com
                    </div>
                    <div 
                      class="text-xs"
                      :style="{ color: 'var(--text-secondary)' }"
                    >
                      高级用户
                    </div>
                  </td>
                  <td class="py-4">
                    <div 
                      :style="{ color: 'var(--text-primary)' }"
                    >
                      13800138001
                    </div>
                    <div 
                      class="text-xs"
                      :style="{ color: 'var(--text-secondary)' }"
                    >
                      zhangsan@company.com
                    </div>
                  </td>
                  <td class="py-4">
                    <div 
                      :style="{ color: 'var(--text-primary)' }"
                    >
                      2024-01-15
                    </div>
                    <div 
                      class="text-xs"
                      :style="{ color: 'var(--text-secondary)' }"
                    >
                      14:30:00
                    </div>
                  </td>
                  <td class="py-4">
                    <div 
                      :style="{ color: 'var(--text-primary)' }"
                    >
                      2024-01-01
                    </div>
                    <div 
                      class="text-xs"
                      :style="{ color: 'var(--text-secondary)' }"
                    >
                      10:00:00
                    </div>
                  </td>
                  <td class="py-4 text-center">
                    <div class="space-x-2">
                      <button 
                        @click="openEditModal(accounts[0])" 
                        class="px-2 hover:opacity-80 transition-colors"
                        :style="{ color: 'var(--accent-color)' }"
                      >
                        编辑
                      </button>
                      <button class="text-green-500 px-2 hover:opacity-80 transition-colors">启用</button>
                      <button class="text-red-500 px-2 hover:opacity-80 transition-colors">删除</button>
                      <button 
                        class="px-2 hover:opacity-80 transition-colors"
                        :style="{ color: 'var(--accent-color)' }"
                      >
                        重置密码
                      </button>
                    </div>
                  </td>
                </tr>
                
                <tr 
                  class="border-b hover:bg-hover transition-colors"
                  :style="{
                    borderColor: 'var(--border-color)'
                  }"
                >
                  <td class="py-4">
                    <input type="checkbox" class="w-4 h-4 rounded">
                  </td>
                  <td class="py-4">
                    <div 
                      class="w-8 h-8 rounded-full flex items-center justify-center"
                      :style="{
                        backgroundColor: 'var(--bg-tertiary)'
                      }"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" :style="{ color: 'var(--text-secondary)' }">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                  </td>
                  <td class="py-4">
                    <div 
                      class="font-medium"
                      :style="{ color: 'var(--text-primary)' }"
                    >
                      李四
                    </div>
                    <div 
                      class="text-xs"
                      :style="{ color: 'var(--text-secondary)' }"
                    >
                      lisi@company.com
                    </div>
                    <div 
                      class="text-xs"
                      :style="{ color: 'var(--text-secondary)' }"
                    >
                      高级用户
                    </div>
                  </td>
                  <td class="py-4">
                    <div 
                      :style="{ color: 'var(--text-primary)' }"
                    >
                      13800138002
                    </div>
                    <div 
                      class="text-xs"
                      :style="{ color: 'var(--text-secondary)' }"
                    >
                      lisi@company.com
                    </div>
                  </td>
                  <td class="py-4">
                    <div 
                      :style="{ color: 'var(--text-primary)' }"
                    >
                      2024-01-15
                    </div>
                    <div 
                      class="text-xs"
                      :style="{ color: 'var(--text-secondary)' }"
                    >
                      09:15:00
                    </div>
                  </td>
                  <td class="py-4">
                    <div 
                      :style="{ color: 'var(--text-primary)' }"
                    >
                      2024-01-02
                    </div>
                    <div 
                      class="text-xs"
                      :style="{ color: 'var(--text-secondary)' }"
                    >
                      11:00:00
                    </div>
                  </td>
                  <td class="py-4 text-center">
                    <div class="space-x-2">
                      <button 
                        @click="openEditModal(accounts[1])" 
                        class="px-2 hover:opacity-80 transition-colors"
                        :style="{ color: 'var(--accent-color)' }"
                      >
                        编辑
                      </button>
                      <button class="text-green-500 px-2 hover:opacity-80 transition-colors">启用</button>
                      <button class="text-red-500 px-2 hover:opacity-80 transition-colors">删除</button>
                      <button 
                        class="px-2 hover:opacity-80 transition-colors"
                        :style="{ color: 'var(--accent-color)' }"
                      >
                        重置密码
                      </button>
                    </div>
                  </td>
                </tr>
                
                <tr 
                  class="border-b hover:bg-hover transition-colors"
                  :style="{
                    borderColor: 'var(--border-color)'
                  }"
                >
                  <td class="py-4">
                    <input type="checkbox" class="w-4 h-4 rounded">
                  </td>
                  <td class="py-4">
                    <div 
                      class="w-8 h-8 rounded-full flex items-center justify-center"
                      :style="{
                        backgroundColor: 'var(--bg-tertiary)'
                      }"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" :style="{ color: 'var(--text-secondary)' }">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                  </td>
                  <td class="py-4">
                    <div 
                      class="font-medium"
                      :style="{ color: 'var(--text-primary)' }"
                    >
                      王五
                    </div>
                    <div 
                      class="text-xs"
                      :style="{ color: 'var(--text-secondary)' }"
                    >
                      wangwu@company.com
                    </div>
                    <div 
                      class="text-xs"
                      :style="{ color: 'var(--text-secondary)' }"
                    >
                      普通用户
                    </div>
                  </td>
                  <td class="py-4">
                    <div 
                      :style="{ color: 'var(--text-primary)' }"
                    >
                      13800138003
                    </div>
                    <div 
                      class="text-xs"
                      :style="{ color: 'var(--text-secondary)' }"
                    >
                      wangwu@company.com
                    </div>
                  </td>
                  <td class="py-4">
                    <div 
                      :style="{ color: 'var(--text-primary)' }"
                    >
                      2024-01-15
                    </div>
                    <div 
                      class="text-xs"
                      :style="{ color: 'var(--text-secondary)' }"
                    >
                      16:45:00
                    </div>
                  </td>
                  <td class="py-4">
                    <div 
                      :style="{ color: 'var(--text-primary)' }"
                    >
                      2024-01-03
                    </div>
                    <div 
                      class="text-xs"
                      :style="{ color: 'var(--text-secondary)' }"
                    >
                      12:00:00
                    </div>
                  </td>
                  <td class="py-4 text-center">
                    <div class="space-x-2">
                      <button 
                        @click="openEditModal(accounts[2])" 
                        class="px-2 hover:opacity-80 transition-colors"
                        :style="{ color: 'var(--accent-color)' }"
                      >
                        编辑
                      </button>
                      <button class="text-red-500 px-2 hover:opacity-80 transition-colors">禁用</button>
                      <button class="text-red-500 px-2 hover:opacity-80 transition-colors">删除</button>
                      <button 
                        class="px-2 hover:opacity-80 transition-colors"
                        :style="{ color: 'var(--accent-color)' }"
                      >
                        重置密码
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            
            <!-- 分页 -->
            <div class="flex justify-between items-center mt-4">
              <div 
                class="text-sm"
                :style="{ color: 'var(--text-secondary)' }"
              >
                共计 3 条数据
              </div>
              <div class="flex items-center space-x-2">
                <span 
                  class="border px-3 py-1 rounded text-sm"
                  :style="{
                    borderColor: 'var(--accent-color)',
                    backgroundColor: 'var(--accent-color)',
                    color: 'white'
                  }"
                >
                  1
                </span>
                <button 
                  class="px-3 py-1 border rounded text-sm hover:opacity-80 transition-colors"
                  :style="{
                    borderColor: 'var(--border-color)',
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)'
                  }"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="inline">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 引入子账号编辑模态框 -->
    <SubaccountEditModal 
      :is-open="isModalOpen" 
      :account-data="currentAccount" 
      @close="closeModal" 
      @save="saveAccount"
    />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import SubaccountEditModal from '~/components/SubaccountEditModal.vue'

// 使用 dashboard 布局
definePageMeta({
  layout: 'dashboard'
})

useHead({
  title: '子账号管理 - CUZCUZAI',
  meta: [
    { name: 'description', content: '管理您的子账号' }
  ]
})

// 模态框状态
const isModalOpen = ref(false)
const currentAccount = ref(null)

// 模拟账号数据
const accounts = reactive([
  {
    id: 1,
    name: '张三',
    email: 'zhangsan@company.com',
    phone: '13800138001',
    role: 'admin',
    note: '主管理员账号'
  },
  {
    id: 2,
    name: '李四',
    email: 'lisi@company.com',
    phone: '13800138002',
    role: 'operator',
    note: '运营人员'
  },
  {
    id: 3,
    name: '王五',
    email: 'wangwu@company.com',
    phone: '13800138003',
    role: 'viewer',
    note: '普通成员'
  }
])

// 打开编辑模态框
const openEditModal = (account) => {
  currentAccount.value = { ...account }
  isModalOpen.value = true
}

// 打开创建模态框
const openCreateModal = () => {
  currentAccount.value = {
    name: '',
    email: '',
    phone: '',
    role: 'operator',
    note: ''
  }
  isModalOpen.value = true
}

// 关闭模态框
const closeModal = () => {
  isModalOpen.value = false
  currentAccount.value = null
}

// 保存账号
const saveAccount = (accountData) => {
  console.log('保存账号数据:', accountData)
  // 这里可以添加保存到后端的逻辑
  
  // 模拟更新本地数据
  if (accountData.id) {
    const index = accounts.findIndex(a => a.id === accountData.id)
    if (index !== -1) {
      accounts[index] = { ...accountData }
    }
  } else {
    // 新增账号
    accountData.id = accounts.length + 1
    accounts.push(accountData)
  }
  
  // 关闭模态框
  closeModal()
}
</script>

<style scoped>
.hover\:bg-dark-hover:hover {
  background-color: rgba(55, 65, 81, 0.1);
}

.hover\:bg-hover:hover {
  background-color: rgba(55, 65, 81, 0.05);
}

button:hover {
  transform: translateY(-1px);
  transition: transform 0.2s ease;
}

* {
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}
</style> 