<template>
  <div>
    <!-- 基本信息板块 -->
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
          基本信息
        </h3>
        <p 
          class="text-sm mt-1"
          :style="{ color: 'var(--text-secondary)' }"
        >
          管理您的账号基本信息
        </p>
      </div>
      
      <!-- 头像设置 -->
      <div 
        class="p-6 border-b"
        :style="{
          borderColor: 'var(--border-color)'
        }"
      >
        <h3 
          class="font-medium mb-4"
          :style="{ color: 'var(--text-primary)' }"
        >
          头像设置
        </h3>
        <div class="flex items-center">
          <div class="mr-4">
            <div 
              class="w-20 h-20 rounded-full flex items-center justify-center overflow-hidden"
              :style="{
                backgroundColor: 'var(--bg-tertiary)'
              }"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="var(--accent-color)">
                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-4.987-3.744A7.966 7.966 0 0 0 12 20c1.97 0 3.773-.712 5.167-1.892A6.979 6.979 0 0 0 12.16 16a6.981 6.981 0 0 0-5.147 2.256zM5.616 16.82A8.975 8.975 0 0 1 12.16 14a8.972 8.972 0 0 1 6.362 2.634 8 8 0 1 0-12.906.187zM12 13a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
              </svg>
            </div>
          </div>
          <div>
            <p 
              class="text-sm mb-2"
              :style="{ color: 'var(--text-secondary)' }"
            >
              支持 JPG、PNG 格式，文件大小不能超过 2MB
            </p>
            <button 
              class="px-4 py-2 text-sm rounded hover:opacity-80 transition-colors text-white"
              :style="{
                backgroundColor: 'var(--accent-color)'
              }"
            >
              更换头像
            </button>
          </div>
        </div>
      </div>
      
      <!-- 基本信息表单 -->
      <div class="p-6">
        <h3 
          class="font-medium mb-6"
          :style="{ color: 'var(--text-primary)' }"
        >
          基本信息
        </h3>
        <div class="space-y-6">
          <!-- 昵称 -->
          <div class="flex items-center">
            <label 
              class="w-20 text-right mr-4"
              :style="{ color: 'var(--text-secondary)' }"
            >
              * 昵称
            </label>
            <div class="flex-1 max-w-md">
              <input 
                type="text" 
                placeholder="张三" 
                class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                :style="{
                  backgroundColor: 'var(--bg-input)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)'
                }"
              >
            </div>
          </div>
          
          <!-- 手机号 -->
          <div class="flex items-center">
            <label 
              class="w-20 text-right mr-4"
              :style="{ color: 'var(--text-secondary)' }"
            >
              * 手机号
            </label>
            <div class="flex-1 max-w-md flex items-center">
              <input 
                type="text" 
                placeholder="13800138000" 
                class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                :style="{
                  backgroundColor: 'var(--bg-input)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)'
                }"
              >
              <button 
                class="ml-2 px-4 py-2 text-sm border rounded hover:opacity-80 transition-colors"
                :style="{
                  backgroundColor: 'transparent',
                  color: 'var(--accent-color)',
                  borderColor: 'var(--accent-color)'
                }"
              >
                修改
              </button>
            </div>
          </div>
          
          <!-- 邮箱 -->
          <div class="flex items-center">
            <label 
              class="w-20 text-right mr-4"
              :style="{ color: 'var(--text-secondary)' }"
            >
              * 邮箱
            </label>
            <div class="flex-1 max-w-md flex items-center">
              <input 
                type="email" 
                placeholder="zhangsan@example.com" 
                class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                :style="{
                  backgroundColor: 'var(--bg-input)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)'
                }"
              >
              <button 
                class="ml-2 px-4 py-2 text-sm border rounded hover:opacity-80 transition-colors"
                :style="{
                  backgroundColor: 'transparent',
                  color: 'var(--accent-color)',
                  borderColor: 'var(--accent-color)'
                }"
              >
                修改
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 密码修改板块 -->
    <div 
      class="rounded-lg border"
      :style="{
        backgroundColor: 'var(--bg-secondary)',
        borderColor: 'var(--border-color)'
      }"
    >
      <div class="p-6">
        <h3 
          class="font-medium mb-6"
          :style="{ color: 'var(--text-primary)' }"
        >
          密码修改
        </h3>
        <div class="space-y-6">
          <!-- 当前密码 -->
          <div class="flex items-center">
            <label 
              class="w-20 text-right mr-4"
              :style="{ color: 'var(--text-secondary)' }"
            >
              当前密码
            </label>
            <div class="flex-1 max-w-md">
              <input 
                type="password" 
                placeholder="请输入当前密码" 
                class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                :style="{
                  backgroundColor: 'var(--bg-input)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)'
                }"
              >
            </div>
          </div>
          
          <!-- 新密码 -->
          <div class="flex items-center">
            <label 
              class="w-20 text-right mr-4"
              :style="{ color: 'var(--text-secondary)' }"
            >
              新密码
            </label>
            <div class="flex-1 max-w-md">
              <input 
                type="password" 
                placeholder="请输入新密码" 
                class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                :style="{
                  backgroundColor: 'var(--bg-input)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)'
                }"
              >
            </div>
          </div>
          
          <!-- 确认密码 -->
          <div class="flex items-center">
            <label 
              class="w-20 text-right mr-4"
              :style="{ color: 'var(--text-secondary)' }"
            >
              确认密码
            </label>
            <div class="flex-1 max-w-md">
              <input 
                type="password" 
                placeholder="请再次输入新密码" 
                class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                :style="{
                  backgroundColor: 'var(--bg-input)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)'
                }"
              >
            </div>
          </div>
          
          <!-- 按钮 -->
          <div class="flex items-center">
            <div class="w-20"></div>
            <div class="flex items-center space-x-4">
              <button 
                class="px-6 py-2 text-sm rounded hover:opacity-80 transition-colors"
                :style="{
                  backgroundColor: 'var(--bg-tertiary)',
                  color: 'var(--text-secondary)'
                }"
              >
                重置
              </button>
              <button 
                class="px-6 py-2 text-sm rounded hover:opacity-80 transition-colors text-white"
                :style="{
                  backgroundColor: 'var(--accent-color)'
                }"
              >
                保存修改
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 基本信息设置组件
</script>

<style scoped>
/* 深色主题下的输入框样式 */
input:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}

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