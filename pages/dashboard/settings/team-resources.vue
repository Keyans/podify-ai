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
              to="/dashboard/settings/team-resources" 
              class="flex items-center p-3 rounded-md mb-2"
              :style="{
                backgroundColor: 'var(--accent-color)',
                color: 'white'
              }"
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
        <!-- 团队资源权限板块 -->
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
              团队资源权限设置
            </h3>
            <p 
              class="text-sm mt-1"
              :style="{ color: 'var(--text-secondary)' }"
            >
              管理团队成员对团队资源的访问权限
            </p>
          </div>
          
          <!-- 权限说明 -->
          <div 
            class="p-6 flex items-center mx-6 mt-6 rounded-md"
            :style="{
              backgroundColor: 'var(--bg-tertiary)'
            }"
          >
            <div class="w-12 h-12 mr-3 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor" :style="{ color: 'var(--accent-color)' }">
                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-5h2v2h-2v-2zm0-8h2v6h-2V7z"/>
              </svg>
            </div>
            <p 
              class="text-sm"
              :style="{ color: 'var(--text-secondary)' }"
            >
              团队资源权限控制成员对工作流模板、产品模板和资产库的访问权限。
              <br>
              请谨慎分配权限以保护团队资源的安全性。
            </p>
          </div>
          
          <!-- 工作流模板权限 -->
          <div 
            class="p-6 border-b"
            :style="{
              borderColor: 'var(--border-color)'
            }"
          >
            <h4 
              class="font-medium mb-4"
              :style="{ color: 'var(--text-primary)' }"
            >
              工作流模板权限
            </h4>
            <div class="space-y-3">
              <div 
                class="flex items-center justify-between p-3 border rounded-md"
                :style="{
                  backgroundColor: 'var(--bg-tertiary)',
                  borderColor: 'var(--border-color)'
                }"
              >
                <div class="flex items-center">
                  <input type="checkbox" id="workflow-view" class="w-4 h-4 rounded mr-3" checked>
                  <label 
                    for="workflow-view" 
                    class="text-sm"
                    :style="{ color: 'var(--text-primary)' }"
                  >
                    查看工作流模板
                  </label>
                </div>
                <select 
                  class="border rounded-md px-3 py-1 text-sm w-40"
                  :style="{
                    backgroundColor: 'var(--bg-input)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)'
                  }"
                >
                  <option>全部角色</option>
                  <option>管理员</option>
                  <option>操作员</option>
                  <option>查看员</option>
                </select>
              </div>
              <div 
                class="flex items-center justify-between p-3 border rounded-md"
                :style="{
                  backgroundColor: 'var(--bg-tertiary)',
                  borderColor: 'var(--border-color)'
                }"
              >
                <div class="flex items-center">
                  <input type="checkbox" id="workflow-edit" class="w-4 h-4 rounded mr-3" checked>
                  <label 
                    for="workflow-edit" 
                    class="text-sm"
                    :style="{ color: 'var(--text-primary)' }"
                  >
                    编辑工作流模板
                  </label>
                </div>
                <select 
                  class="border rounded-md px-3 py-1 text-sm w-40"
                  :style="{
                    backgroundColor: 'var(--bg-input)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)'
                  }"
                >
                  <option>管理员</option>
                  <option>操作员</option>
                </select>
              </div>
              <div 
                class="flex items-center justify-between p-3 border rounded-md"
                :style="{
                  backgroundColor: 'var(--bg-tertiary)',
                  borderColor: 'var(--border-color)'
                }"
              >
                <div class="flex items-center">
                  <input type="checkbox" id="workflow-delete" class="w-4 h-4 rounded mr-3" checked>
                  <label 
                    for="workflow-delete" 
                    class="text-sm"
                    :style="{ color: 'var(--text-primary)' }"
                  >
                    删除工作流模板
                  </label>
                </div>
                <select 
                  class="border rounded-md px-3 py-1 text-sm w-40"
                  :style="{
                    backgroundColor: 'var(--bg-input)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)'
                  }"
                >
                  <option>管理员</option>
                </select>
              </div>
              <div 
                class="flex items-center justify-between p-3 border rounded-md"
                :style="{
                  backgroundColor: 'var(--bg-tertiary)',
                  borderColor: 'var(--border-color)'
                }"
              >
                <div class="flex items-center">
                  <input type="checkbox" id="workflow-create" class="w-4 h-4 rounded mr-3" checked>
                  <label 
                    for="workflow-create" 
                    class="text-sm"
                    :style="{ color: 'var(--text-primary)' }"
                  >
                    创建工作流模板
                  </label>
                </div>
                <select 
                  class="border rounded-md px-3 py-1 text-sm w-40"
                  :style="{
                    backgroundColor: 'var(--bg-input)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)'
                  }"
                >
                  <option>管理员</option>
                  <option>操作员</option>
                </select>
              </div>
            </div>
          </div>
          
          <!-- 产品模板权限 -->
          <div 
            class="p-6 border-b"
            :style="{
              borderColor: 'var(--border-color)'
            }"
          >
            <h4 
              class="font-medium mb-4"
              :style="{ color: 'var(--text-primary)' }"
            >
              产品模板权限
            </h4>
            <div class="space-y-3">
              <div 
                class="flex items-center justify-between p-3 border rounded-md"
                :style="{
                  backgroundColor: 'var(--bg-tertiary)',
                  borderColor: 'var(--border-color)'
                }"
              >
                <div class="flex items-center">
                  <input type="checkbox" id="product-view" class="w-4 h-4 rounded mr-3" checked>
                  <label 
                    for="product-view" 
                    class="text-sm"
                    :style="{ color: 'var(--text-primary)' }"
                  >
                    查看产品模板
                  </label>
                </div>
                <select 
                  class="border rounded-md px-3 py-1 text-sm w-40"
                  :style="{
                    backgroundColor: 'var(--bg-input)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)'
                  }"
                >
                  <option>全部角色</option>
                  <option>管理员</option>
                  <option>操作员</option>
                  <option>查看员</option>
                </select>
              </div>
              <div 
                class="flex items-center justify-between p-3 border rounded-md"
                :style="{
                  backgroundColor: 'var(--bg-tertiary)',
                  borderColor: 'var(--border-color)'
                }"
              >
                <div class="flex items-center">
                  <input type="checkbox" id="product-edit" class="w-4 h-4 rounded mr-3" checked>
                  <label 
                    for="product-edit" 
                    class="text-sm"
                    :style="{ color: 'var(--text-primary)' }"
                  >
                    编辑产品模板
                  </label>
                </div>
                <select 
                  class="border rounded-md px-3 py-1 text-sm w-40"
                  :style="{
                    backgroundColor: 'var(--bg-input)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)'
                  }"
                >
                  <option>管理员</option>
                  <option>操作员</option>
                </select>
              </div>
              <div 
                class="flex items-center justify-between p-3 border rounded-md"
                :style="{
                  backgroundColor: 'var(--bg-tertiary)',
                  borderColor: 'var(--border-color)'
                }"
              >
                <div class="flex items-center">
                  <input type="checkbox" id="product-delete" class="w-4 h-4 rounded mr-3" checked>
                  <label 
                    for="product-delete" 
                    class="text-sm"
                    :style="{ color: 'var(--text-primary)' }"
                  >
                    删除产品模板
                  </label>
                </div>
                <select 
                  class="border rounded-md px-3 py-1 text-sm w-40"
                  :style="{
                    backgroundColor: 'var(--bg-input)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)'
                  }"
                >
                  <option>管理员</option>
                </select>
              </div>
              <div 
                class="flex items-center justify-between p-3 border rounded-md"
                :style="{
                  backgroundColor: 'var(--bg-tertiary)',
                  borderColor: 'var(--border-color)'
                }"
              >
                <div class="flex items-center">
                  <input type="checkbox" id="product-create" class="w-4 h-4 rounded mr-3" checked>
                  <label 
                    for="product-create" 
                    class="text-sm"
                    :style="{ color: 'var(--text-primary)' }"
                  >
                    创建产品模板
                  </label>
                </div>
                <select 
                  class="border rounded-md px-3 py-1 text-sm w-40"
                  :style="{
                    backgroundColor: 'var(--bg-input)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)'
                  }"
                >
                  <option>管理员</option>
                  <option>操作员</option>
                </select>
              </div>
            </div>
          </div>
          
          <!-- 资产库权限 -->
          <div 
            class="p-6 border-b"
            :style="{
              borderColor: 'var(--border-color)'
            }"
          >
            <h4 
              class="font-medium mb-4"
              :style="{ color: 'var(--text-primary)' }"
            >
              团队资产库权限
            </h4>
            <div class="space-y-3">
              <div 
                class="flex items-center justify-between p-3 border rounded-md"
                :style="{
                  backgroundColor: 'var(--bg-tertiary)',
                  borderColor: 'var(--border-color)'
                }"
              >
                <div class="flex items-center">
                  <input type="checkbox" id="asset-view" class="w-4 h-4 rounded mr-3" checked>
                  <label 
                    for="asset-view" 
                    class="text-sm"
                    :style="{ color: 'var(--text-primary)' }"
                  >
                    查看资产库
                  </label>
                </div>
                <select 
                  class="border rounded-md px-3 py-1 text-sm w-40"
                  :style="{
                    backgroundColor: 'var(--bg-input)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)'
                  }"
                >
                  <option>全部角色</option>
                  <option>管理员</option>
                  <option>操作员</option>
                  <option>查看员</option>
                </select>
              </div>
              <div 
                class="flex items-center justify-between p-3 border rounded-md"
                :style="{
                  backgroundColor: 'var(--bg-tertiary)',
                  borderColor: 'var(--border-color)'
                }"
              >
                <div class="flex items-center">
                  <input type="checkbox" id="asset-upload" class="w-4 h-4 rounded mr-3" checked>
                  <label 
                    for="asset-upload" 
                    class="text-sm"
                    :style="{ color: 'var(--text-primary)' }"
                  >
                    上传资产
                  </label>
                </div>
                <select 
                  class="border rounded-md px-3 py-1 text-sm w-40"
                  :style="{
                    backgroundColor: 'var(--bg-input)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)'
                  }"
                >
                  <option>管理员</option>
                  <option>操作员</option>
                </select>
              </div>
              <div 
                class="flex items-center justify-between p-3 border rounded-md"
                :style="{
                  backgroundColor: 'var(--bg-tertiary)',
                  borderColor: 'var(--border-color)'
                }"
              >
                <div class="flex items-center">
                  <input type="checkbox" id="asset-delete" class="w-4 h-4 rounded mr-3" checked>
                  <label 
                    for="asset-delete" 
                    class="text-sm"
                    :style="{ color: 'var(--text-primary)' }"
                  >
                    删除资产
                  </label>
                </div>
                <select 
                  class="border rounded-md px-3 py-1 text-sm w-40"
                  :style="{
                    backgroundColor: 'var(--bg-input)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)'
                  }"
                >
                  <option>管理员</option>
                </select>
              </div>
              <div 
                class="flex items-center justify-between p-3 border rounded-md"
                :style="{
                  backgroundColor: 'var(--bg-tertiary)',
                  borderColor: 'var(--border-color)'
                }"
              >
                <div class="flex items-center">
                  <input type="checkbox" id="asset-categorize" class="w-4 h-4 rounded mr-3" checked>
                  <label 
                    for="asset-categorize" 
                    class="text-sm"
                    :style="{ color: 'var(--text-primary)' }"
                  >
                    资产分类管理
                  </label>
                </div>
                <select 
                  class="border rounded-md px-3 py-1 text-sm w-40"
                  :style="{
                    backgroundColor: 'var(--bg-input)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)'
                  }"
                >
                  <option>管理员</option>
                  <option>操作员</option>
                </select>
              </div>
            </div>
          </div>
          
          <!-- 团队协作权限 -->
          <div class="p-6">
            <h4 
              class="font-medium mb-4"
              :style="{ color: 'var(--text-primary)' }"
            >
              团队协作权限
            </h4>
            <div class="space-y-3">
              <div 
                class="flex items-center justify-between p-3 border rounded-md"
                :style="{
                  backgroundColor: 'var(--bg-tertiary)',
                  borderColor: 'var(--border-color)'
                }"
              >
                <div class="flex items-center">
                  <input type="checkbox" id="team-invite" class="w-4 h-4 rounded mr-3" checked>
                  <label 
                    for="team-invite" 
                    class="text-sm"
                    :style="{ color: 'var(--text-primary)' }"
                  >
                    邀请团队成员
                  </label>
                </div>
                <select 
                  class="border rounded-md px-3 py-1 text-sm w-40"
                  :style="{
                    backgroundColor: 'var(--bg-input)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)'
                  }"
                >
                  <option>管理员</option>
                </select>
              </div>
              <div 
                class="flex items-center justify-between p-3 border rounded-md"
                :style="{
                  backgroundColor: 'var(--bg-tertiary)',
                  borderColor: 'var(--border-color)'
                }"
              >
                <div class="flex items-center">
                  <input type="checkbox" id="team-remove" class="w-4 h-4 rounded mr-3" checked>
                  <label 
                    for="team-remove" 
                    class="text-sm"
                    :style="{ color: 'var(--text-primary)' }"
                  >
                    移除团队成员
                  </label>
                </div>
                <select 
                  class="border rounded-md px-3 py-1 text-sm w-40"
                  :style="{
                    backgroundColor: 'var(--bg-input)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)'
                  }"
                >
                  <option>管理员</option>
                </select>
              </div>
              <div 
                class="flex items-center justify-between p-3 border rounded-md"
                :style="{
                  backgroundColor: 'var(--bg-tertiary)',
                  borderColor: 'var(--border-color)'
                }"
              >
                <div class="flex items-center">
                  <input type="checkbox" id="team-assign" class="w-4 h-4 rounded mr-3" checked>
                  <label 
                    for="team-assign" 
                    class="text-sm"
                    :style="{ color: 'var(--text-primary)' }"
                  >
                    分配任务
                  </label>
                </div>
                <select 
                  class="border rounded-md px-3 py-1 text-sm w-40"
                  :style="{
                    backgroundColor: 'var(--bg-input)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)'
                  }"
                >
                  <option>管理员</option>
                  <option>操作员</option>
                </select>
              </div>
              <div 
                class="flex items-center justify-between p-3 border rounded-md"
                :style="{
                  backgroundColor: 'var(--bg-tertiary)',
                  borderColor: 'var(--border-color)'
                }"
              >
                <div class="flex items-center">
                  <input type="checkbox" id="team-comment" class="w-4 h-4 rounded mr-3" checked>
                  <label 
                    for="team-comment" 
                    class="text-sm"
                    :style="{ color: 'var(--text-primary)' }"
                  >
                    评论与反馈
                  </label>
                </div>
                <select 
                  class="border rounded-md px-3 py-1 text-sm w-40"
                  :style="{
                    backgroundColor: 'var(--bg-input)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)'
                  }"
                >
                  <option>全部角色</option>
                  <option>管理员</option>
                  <option>操作员</option>
                  <option>查看员</option>
                </select>
              </div>
            </div>
          </div>
          
          <!-- 保存按钮 -->
          <div class="px-6 pb-6 flex justify-end">
            <button 
              class="px-6 py-2 rounded-md text-sm text-white hover:opacity-80 transition-all duration-200 hover:shadow-lg transform hover:-translate-y-1"
              :style="{
                background: 'linear-gradient(135deg, var(--accent-color) 0%, #667eea 100%)'
              }"
            >
              保存设置
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 使用 dashboard 布局
definePageMeta({
  layout: 'dashboard'
})

useHead({
  title: '团队资源权限 - CUZCUZAI',
  meta: [
    { name: 'description', content: '管理团队资源权限设置' }
  ]
})
</script>

<style scoped>
.hover\:bg-dark-hover:hover {
  background-color: rgba(55, 65, 81, 0.1);
}

button:hover {
  transform: translateY(-1px);
  transition: transform 0.2s ease;
}

* {
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}
</style> 