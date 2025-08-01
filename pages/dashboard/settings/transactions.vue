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
              class="flex items-center p-3 rounded-md mb-2"
              :style="{
                backgroundColor: 'var(--accent-color)',
                color: 'white'
              }"
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
              class="flex items-center p-3 rounded-md hover:bg-dark-hover mb-2"
              :style="{ color: 'var(--text-primary)' }"
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
        <!-- 交易记录板块 -->
        <div 
          class="rounded-lg border"
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
              交易记录
            </h3>
            <p 
              class="text-sm mt-1"
              :style="{ color: 'var(--text-secondary)' }"
            >
              查看您的交易记录和明细账单
            </p>
          </div>
          
          <!-- 交易数据统计 -->
          <div class="grid grid-cols-4 gap-4 p-6">
            <div 
              class="rounded-lg p-4 relative overflow-hidden"
              :style="{
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
              }"
            >
              <!-- 科技感装饰 -->
              <div class="absolute top-0 right-0 w-16 h-16 bg-white bg-opacity-10 rounded-full transform translate-x-8 -translate-y-8"></div>
              
              <div class="relative z-10 text-white">
                <div class="flex items-center mb-2">
                  <div class="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"></path>
                      <path d="M3 7l18 0"></path>
                      <path d="M8 14l0 -4"></path>
                      <path d="M12 14l0 -4"></path>
                      <path d="M16 14l0 -4"></path>
                    </svg>
                  </div>
                  <span class="text-sm opacity-90">出入账金额</span>
                </div>
                <div class="text-lg font-semibold">¥2456.78</div>
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
                      <path d="M3 17l6 -6l4 4l8 -8"></path>
                      <path d="M14 7l7 0l0 7"></path>
                    </svg>
                  </div>
                  <span class="text-sm opacity-90">本月收入</span>
                </div>
                <div class="text-lg font-semibold">¥456.78</div>
              </div>
            </div>
            
            <div 
              class="rounded-lg p-4 relative overflow-hidden"
              :style="{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
              }"
            >
              <div class="absolute top-0 right-0 w-16 h-16 bg-white bg-opacity-10 rounded-full transform translate-x-8 -translate-y-8"></div>
              
              <div class="relative z-10 text-white">
                <div class="flex items-center mb-2">
                  <div class="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                      <path d="M12 12l-3 -2"></path>
                      <path d="M12 7v5"></path>
                    </svg>
                  </div>
                  <span class="text-sm opacity-90">消费次数</span>
                </div>
                <div class="text-lg font-semibold">1234</div>
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
                      <path d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12"></path>
                      <path d="M20 12v4h-4a2 2 0 0 1 0 -4h4"></path>
                    </svg>
                  </div>
                  <span class="text-sm opacity-90">总积分</span>
                </div>
                <div class="text-lg font-semibold">156</div>
              </div>
            </div>
          </div>
          
          <!-- 交易筛选区域 -->
          <div class="px-6 pb-4">
            <div class="flex space-x-6 mb-4">
              <div class="flex items-center">
                <span 
                  class="text-sm mr-2"
                  :style="{ color: 'var(--text-secondary)' }"
                >
                  交易类型
                </span>
                <select 
                  class="border rounded px-2 py-1 text-sm"
                  :style="{
                    backgroundColor: 'var(--bg-input)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)'
                  }"
                >
                  <option>全部类型</option>
                </select>
              </div>
              
              <div class="flex items-center">
                <span 
                  class="text-sm mr-2"
                  :style="{ color: 'var(--text-secondary)' }"
                >
                  收支类型
                </span>
                <select 
                  class="border rounded px-2 py-1 text-sm"
                  :style="{
                    backgroundColor: 'var(--bg-input)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)'
                  }"
                >
                  <option>全部收支</option>
                </select>
              </div>
              
              <div class="flex items-center">
                <span 
                  class="text-sm mr-2"
                  :style="{ color: 'var(--text-secondary)' }"
                >
                  时间范围
                </span>
                <select 
                  class="border rounded px-2 py-1 text-sm"
                  :style="{
                    backgroundColor: 'var(--bg-input)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)'
                  }"
                >
                  <option>本月</option>
                </select>
              </div>
              
              <div class="flex items-center">
                <span 
                  class="text-sm mr-2"
                  :style="{ color: 'var(--text-secondary)' }"
                >
                  状态
                </span>
                <select 
                  class="border rounded px-2 py-1 text-sm"
                  :style="{
                    backgroundColor: 'var(--bg-input)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)'
                  }"
                >
                  <option>全部状态</option>
                </select>
              </div>
              
              <div class="flex items-center ml-auto">
                <button 
                  class="px-4 py-1 rounded text-sm mr-2 hover:opacity-80 transition-colors"
                  :style="{
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-secondary)'
                  }"
                >
                  重置
                </button>
                <button 
                  class="px-4 py-1 text-white rounded text-sm hover:opacity-80 transition-colors"
                  :style="{
                    backgroundColor: 'var(--accent-color)'
                  }"
                >
                  筛选
                </button>
              </div>
            </div>
          </div>
          
          <!-- 交易记录表格 -->
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
                  <th class="py-3 font-normal">交易ID</th>
                  <th class="py-3 font-normal">类型</th>
                  <th class="py-3 font-normal">金额</th>
                  <th class="py-3 font-normal">余额</th>
                  <th class="py-3 font-normal">备注</th>
                  <th class="py-3 font-normal">时间</th>
                  <th class="py-3 font-normal">状态</th>
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
                    <div 
                      :style="{ color: 'var(--text-primary)' }"
                    >
                      73243811580
                    </div>
                    <span 
                      class="text-xs"
                      :style="{ color: 'var(--text-secondary)' }"
                    >
                      1
                    </span>
                  </td>
                  <td class="py-4">
                    <span class="px-2 py-1 bg-red-50 text-red-500 rounded text-xs">消费</span>
                  </td>
                  <td class="py-4 text-red-500">-¥5.00</td>
                  <td 
                    class="py-4"
                    :style="{ color: 'var(--text-primary)' }"
                  >
                    ¥729.56
                  </td>
                  <td 
                    class="py-4 max-w-xs truncate"
                    :style="{ color: 'var(--text-primary)' }"
                  >
                    商品合成 - Amazon平台切图合成产品
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
                      18:30:00
                    </div>
                  </td>
                  <td class="py-4">
                    <span class="text-green-500">已完成</span>
                  </td>
                  <td class="py-4 text-center">
                    <button 
                      class="hover:opacity-80 transition-colors"
                      :style="{ color: 'var(--accent-color)' }"
                    >
                      详情
                    </button>
                  </td>
                </tr>
                
                <tr 
                  class="border-b hover:bg-hover transition-colors"
                  :style="{
                    borderColor: 'var(--border-color)'
                  }"
                >
                  <td class="py-4">
                    <div 
                      :style="{ color: 'var(--text-primary)' }"
                    >
                      73243811540
                    </div>
                    <span 
                      class="text-xs"
                      :style="{ color: 'var(--text-secondary)' }"
                    >
                      2
                    </span>
                  </td>
                  <td class="py-4">
                    <span class="px-2 py-1 bg-green-50 text-green-500 rounded text-xs">充值</span>
                  </td>
                  <td class="py-4 text-green-500">+¥500.00</td>
                  <td 
                    class="py-4"
                    :style="{ color: 'var(--text-primary)' }"
                  >
                    ¥734.56
                  </td>
                  <td 
                    class="py-4 max-w-xs truncate"
                    :style="{ color: 'var(--text-primary)' }"
                  >
                    账户充值 - 微信支付
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
                    <span class="text-green-500">已完成</span>
                  </td>
                  <td class="py-4 text-center">
                    <button 
                      class="hover:opacity-80 transition-colors"
                      :style="{ color: 'var(--accent-color)' }"
                    >
                      详情
                    </button>
                  </td>
                </tr>
                
                <tr 
                  class="border-b hover:bg-hover transition-colors"
                  :style="{
                    borderColor: 'var(--border-color)'
                  }"
                >
                  <td class="py-4">
                    <div 
                      :style="{ color: 'var(--text-primary)' }"
                    >
                      73243811440
                    </div>
                    <span 
                      class="text-xs"
                      :style="{ color: 'var(--text-secondary)' }"
                    >
                      3
                    </span>
                  </td>
                  <td class="py-4">
                    <span class="px-2 py-1 bg-red-50 text-red-500 rounded text-xs">消费</span>
                  </td>
                  <td class="py-4 text-red-500">-¥3.00</td>
                  <td 
                    class="py-4"
                    :style="{ color: 'var(--text-primary)' }"
                  >
                    ¥234.56
                  </td>
                  <td 
                    class="py-4 max-w-xs truncate"
                    :style="{ color: 'var(--text-primary)' }"
                  >
                    智能裁图 - 优化对应的图
                  </td>
                  <td class="py-4">
                    <div 
                      :style="{ color: 'var(--text-primary)' }"
                    >
                      2024-01-14
                    </div>
                    <div 
                      class="text-xs"
                      :style="{ color: 'var(--text-secondary)' }"
                    >
                      16:45:00
                    </div>
                  </td>
                  <td class="py-4">
                    <span class="text-green-500">已完成</span>
                  </td>
                  <td class="py-4 text-center">
                    <button 
                      class="hover:opacity-80 transition-colors"
                      :style="{ color: 'var(--accent-color)' }"
                    >
                      详情
                    </button>
                  </td>
                </tr>
                
                <tr 
                  class="border-b hover:bg-hover transition-colors"
                  :style="{
                    borderColor: 'var(--border-color)'
                  }"
                >
                  <td class="py-4">
                    <div 
                      :style="{ color: 'var(--text-primary)' }"
                    >
                      73243811440
                    </div>
                    <span 
                      class="text-xs"
                      :style="{ color: 'var(--text-secondary)' }"
                    >
                      4
                    </span>
                  </td>
                  <td class="py-4">
                    <span class="px-2 py-1 bg-red-50 text-red-500 rounded text-xs">消费</span>
                  </td>
                  <td class="py-4 text-red-500">-¥2.50</td>
                  <td 
                    class="py-4"
                    :style="{ color: 'var(--text-primary)' }"
                  >
                    ¥237.56
                  </td>
                  <td 
                    class="py-4 max-w-xs truncate"
                    :style="{ color: 'var(--text-primary)' }"
                  >
                    一键抠图 - 处理对应的图
                  </td>
                  <td class="py-4">
                    <div 
                      :style="{ color: 'var(--text-primary)' }"
                    >
                      2024-01-14
                    </div>
                    <div 
                      class="text-xs"
                      :style="{ color: 'var(--text-secondary)' }"
                    >
                      15:20:00
                    </div>
                  </td>
                  <td class="py-4">
                    <span class="text-green-500">已完成</span>
                  </td>
                  <td class="py-4 text-center">
                    <button 
                      class="hover:opacity-80 transition-colors"
                      :style="{ color: 'var(--accent-color)' }"
                    >
                      详情
                    </button>
                  </td>
                </tr>
                
                <tr 
                  class="border-b hover:bg-hover transition-colors"
                  :style="{
                    borderColor: 'var(--border-color)'
                  }"
                >
                  <td class="py-4">
                    <div 
                      :style="{ color: 'var(--text-primary)' }"
                    >
                      73243911180
                    </div>
                    <span 
                      class="text-xs"
                      :style="{ color: 'var(--text-secondary)' }"
                    >
                      5
                    </span>
                  </td>
                  <td class="py-4">
                    <span class="px-2 py-1 bg-red-50 text-red-500 rounded text-xs">消费</span>
                  </td>
                  <td class="py-4 text-red-500">-¥1.50</td>
                  <td 
                    class="py-4"
                    :style="{ color: 'var(--text-primary)' }"
                  >
                    ¥240.06
                  </td>
                  <td 
                    class="py-4 max-w-xs truncate"
                    :style="{ color: 'var(--text-primary)' }"
                  >
                    标题生成 - 生成5个英文商品标题
                  </td>
                  <td class="py-4">
                    <div 
                      :style="{ color: 'var(--text-primary)' }"
                    >
                      2024-01-13
                    </div>
                    <div 
                      class="text-xs"
                      :style="{ color: 'var(--text-secondary)' }"
                    >
                      10:00:00
                    </div>
                  </td>
                  <td class="py-4">
                    <span class="text-green-500">已完成</span>
                  </td>
                  <td class="py-4 text-center">
                    <button 
                      class="hover:opacity-80 transition-colors"
                      :style="{ color: 'var(--accent-color)' }"
                    >
                      详情
                    </button>
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
                共计 5 条数据
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
                  2
                </button>
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
  </div>
</template>

<script setup>
// 使用 dashboard 布局
definePageMeta({
  layout: 'dashboard'
})

useHead({
  title: '交易记录 - CUZCUZAI',
  meta: [
    { name: 'description', content: '查看您的交易记录' }
  ]
})
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