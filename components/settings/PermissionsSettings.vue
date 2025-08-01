<template>
  <div>
    <!-- 权限设置板块 -->
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
          权限设置
        </h3>
        <p 
          class="text-sm mt-1"
          :style="{ color: 'var(--text-secondary)' }"
        >
          管理不同角色的访问权限
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
        <div>
          <p 
            class="text-sm"
            :style="{ color: 'var(--text-secondary)' }"
          >
            请注意权限的设置会影响用户的正常使用，请谨慎操作。
            <br>
            请在添加子账号时，为其设置一个合理的权限范围。
            <br>
            <span 
              :style="{ color: 'var(--accent-color)' }"
            >
              注意：团队资源权限可以在"团队资源权限"页面中进行详细设置。
            </span>
          </p>
        </div>
      </div>
      
      <!-- 权限组 -->
      <div class="p-6">
        <h4 
          class="font-medium mb-4"
          :style="{ color: 'var(--text-primary)' }"
        >
          权限组
        </h4>
        
        <!-- 超级管理员 -->
        <div 
          class="border rounded-md mb-4 relative overflow-hidden"
          :style="{
            backgroundColor: 'var(--bg-tertiary)',
            borderColor: 'var(--border-color)'
          }"
        >
          <!-- 科技感装饰 -->
          <div class="absolute top-0 right-0 w-16 h-1" :style="{ background: 'linear-gradient(90deg, transparent, #f59e0b)' }"></div>
          
          <div 
            class="flex justify-between items-center p-4 border-b"
            :style="{
              borderColor: 'var(--border-color)'
            }"
          >
            <div class="flex items-center">
              <span class="text-yellow-500 px-2 py-1 bg-yellow-500 bg-opacity-20 rounded-md text-xs mr-3">特权</span>
              <h5 
                class="font-medium"
                :style="{ color: 'var(--text-primary)' }"
              >
                超级管理员
              </h5>
              <p 
                class="text-sm ml-3"
                :style="{ color: 'var(--text-secondary)' }"
              >
                拥有所有权限
              </p>
            </div>
            <div class="flex items-center space-x-3">
              <button 
                class="px-3 py-1 border rounded-md text-sm hover:opacity-80 transition-colors"
                :style="{
                  color: 'var(--accent-color)',
                  borderColor: 'var(--accent-color)'
                }"
              >
                删除
              </button>
              <button 
                class="px-3 py-1 border rounded-md text-sm hover:opacity-80 transition-colors"
                :style="{
                  color: 'var(--accent-color)',
                  borderColor: 'var(--accent-color)'
                }"
              >
                修改
              </button>
            </div>
          </div>
          <div class="p-4 text-sm">
            <p 
              :style="{ color: 'var(--text-secondary)' }"
            >
              1-3 人数
            </p>
            <p 
              class="mt-1"
              :style="{ color: 'var(--accent-color)' }"
            >
              拥有所有团队资源权限
            </p>
          </div>
        </div>
        
        <!-- 管理员 -->
        <div 
          class="border rounded-md mb-4 relative overflow-hidden"
          :style="{
            backgroundColor: 'var(--bg-tertiary)',
            borderColor: 'var(--border-color)'
          }"
        >
          <div class="absolute top-0 right-0 w-16 h-1" :style="{ background: 'linear-gradient(90deg, transparent, #ef4444)' }"></div>
          
          <div 
            class="flex justify-between items-center p-4 border-b"
            :style="{
              borderColor: 'var(--border-color)'
            }"
          >
            <div class="flex items-center">
              <span class="text-red-500 px-2 py-1 bg-red-500 bg-opacity-20 rounded-md text-xs mr-3">管控</span>
              <h5 
                class="font-medium"
                :style="{ color: 'var(--text-primary)' }"
              >
                管理员
              </h5>
              <p 
                class="text-sm ml-3"
                :style="{ color: 'var(--text-secondary)' }"
              >
                管理系统
              </p>
            </div>
            <div class="flex items-center space-x-3">
              <button 
                class="px-3 py-1 border rounded-md text-sm hover:opacity-80 transition-colors"
                :style="{
                  color: 'var(--accent-color)',
                  borderColor: 'var(--accent-color)'
                }"
              >
                删除
              </button>
              <button 
                class="px-3 py-1 border rounded-md text-sm hover:opacity-80 transition-colors"
                :style="{
                  color: 'var(--accent-color)',
                  borderColor: 'var(--accent-color)'
                }"
              >
                修改
              </button>
            </div>
          </div>
          <div class="p-4 text-sm">
            <p 
              :style="{ color: 'var(--text-secondary)' }"
            >
              3-5 人数
            </p>
            <p 
              class="mt-1"
              :style="{ color: 'var(--accent-color)' }"
            >
              可编辑和使用团队资源
            </p>
          </div>
        </div>
        
        <!-- 操作员 -->
        <div 
          class="border rounded-md mb-4 relative overflow-hidden"
          :style="{
            backgroundColor: 'var(--bg-tertiary)',
            borderColor: 'var(--border-color)'
          }"
        >
          <div class="absolute top-0 right-0 w-16 h-1" :style="{ background: 'linear-gradient(90deg, transparent, #3b82f6)' }"></div>
          
          <div 
            class="flex justify-between items-center p-4 border-b"
            :style="{
              borderColor: 'var(--border-color)'
            }"
          >
            <div class="flex items-center">
              <span class="text-blue-500 px-2 py-1 bg-blue-500 bg-opacity-20 rounded-md text-xs mr-3">操作</span>
              <h5 
                class="font-medium"
                :style="{ color: 'var(--text-primary)' }"
              >
                操作员
              </h5>
              <p 
                class="text-sm ml-3"
                :style="{ color: 'var(--text-secondary)' }"
              >
                日常运营管理
              </p>
            </div>
            <div class="flex items-center space-x-3">
              <button 
                class="px-3 py-1 border rounded-md text-sm hover:opacity-80 transition-colors"
                :style="{
                  color: 'var(--accent-color)',
                  borderColor: 'var(--accent-color)'
                }"
              >
                删除
              </button>
              <button 
                class="px-3 py-1 border rounded-md text-sm hover:opacity-80 transition-colors"
                :style="{
                  color: 'var(--accent-color)',
                  borderColor: 'var(--accent-color)'
                }"
              >
                修改
              </button>
            </div>
          </div>
          <div class="p-4 text-sm">
            <p 
              :style="{ color: 'var(--text-secondary)' }"
            >
              5-10 人数
            </p>
            <p 
              class="mt-1"
              :style="{ color: 'var(--accent-color)' }"
            >
              可使用团队资源，有限的编辑权限
            </p>
          </div>
        </div>
        
        <!-- 查看员 -->
        <div 
          class="border rounded-md relative overflow-hidden"
          :style="{
            backgroundColor: 'var(--bg-tertiary)',
            borderColor: 'var(--border-color)'
          }"
        >
          <div class="absolute top-0 right-0 w-16 h-1" :style="{ background: 'linear-gradient(90deg, transparent, #6b7280)' }"></div>
          
          <div 
            class="flex justify-between items-center p-4 border-b"
            :style="{
              borderColor: 'var(--border-color)'
            }"
          >
            <div class="flex items-center">
              <span 
                class="px-2 py-1 rounded-md text-xs mr-3"
                :style="{
                  color: 'var(--text-secondary)',
                  backgroundColor: 'var(--bg-input)'
                }"
              >
                只读
              </span>
              <h5 
                class="font-medium"
                :style="{ color: 'var(--text-primary)' }"
              >
                查看员
              </h5>
              <p 
                class="text-sm ml-3"
                :style="{ color: 'var(--text-secondary)' }"
              >
                只能查看内容
              </p>
            </div>
            <div class="flex items-center space-x-3">
              <button 
                class="px-3 py-1 border rounded-md text-sm hover:opacity-80 transition-colors"
                :style="{
                  color: 'var(--accent-color)',
                  borderColor: 'var(--accent-color)'
                }"
              >
                删除
              </button>
              <button 
                class="px-3 py-1 border rounded-md text-sm hover:opacity-80 transition-colors"
                :style="{
                  color: 'var(--accent-color)',
                  borderColor: 'var(--accent-color)'
                }"
              >
                修改
              </button>
            </div>
          </div>
          <div class="p-4 text-sm">
            <p 
              :style="{ color: 'var(--text-secondary)' }"
            >
              10-20 人数
            </p>
            <p 
              class="mt-1"
              :style="{ color: 'var(--accent-color)' }"
            >
              只能查看团队资源，无编辑权限
            </p>
          </div>
        </div>
      </div>
      
      <!-- 添加权限组 -->
      <div class="px-6 pb-6 flex justify-end">
        <button 
          class="px-4 py-2 rounded-md text-sm flex items-center text-white hover:opacity-80 transition-all duration-200 hover:shadow-lg transform hover:-translate-y-1"
          :style="{
            background: 'linear-gradient(135deg, var(--accent-color) 0%, #667eea 100%)'
          }"
        >
          <span class="mr-1">+</span>
          <span>添加权限组</span>
        </button>
      </div>
    </div>
    
    <!-- 连续访问权限 -->
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
          连续访问权限
        </h3>
        <p 
          class="text-sm mt-1"
          :style="{ color: 'var(--text-secondary)' }"
        >
          通过以下设置，限制用户的访问次数和频率
        </p>
      </div>
      
      <div class="p-6">
        <label class="flex items-center space-x-2 mb-4">
          <input type="checkbox" class="w-4 h-4 rounded" checked>
          <span 
            :style="{ color: 'var(--text-primary)' }"
          >
            启用权限限制
          </span>
          <span 
            class="text-sm ml-2"
            :style="{ color: 'var(--text-secondary)' }"
          >
            法定节假日，可休息一下
          </span>
        </label>
        
        <div 
          class="p-4 rounded-md text-sm text-center mb-4"
          :style="{
            backgroundColor: 'var(--bg-tertiary)',
            color: 'var(--text-secondary)'
          }"
        >
          通过权限设置，有效控制用户的操作范围，提高系统安全性
        </div>
        
        <button 
          class="w-full py-2 text-sm rounded text-white hover:opacity-80 transition-all duration-200 hover:shadow-lg transform hover:-translate-y-1"
          :style="{
            background: 'linear-gradient(135deg, var(--accent-color) 0%, #667eea 100%)'
          }"
        >
          保存设置
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// 权限设置组件
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