<template>
  <div>
    <!-- 账号充值板块 -->
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
          账号充值
        </h3>
        <p 
          class="text-sm mt-1"
          :style="{ color: 'var(--text-secondary)' }"
        >
          为您的账号充值，享受更多服务
        </p>
      </div>
      
      <!-- 当前余额 -->
      <div 
        class="p-6 mx-6 mt-6 rounded-lg text-white relative overflow-hidden"
        :style="{
          background: 'linear-gradient(135deg, var(--accent-color) 0%, #667eea 100%)'
        }"
      >
        <!-- 科技感背景装饰 -->
        <div class="absolute inset-0 opacity-10">
          <div class="absolute top-4 right-4 w-16 h-16 border border-white rounded-full"></div>
          <div class="absolute bottom-4 left-4 w-8 h-8 border border-white rounded-full"></div>
          <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-1 bg-white opacity-20"></div>
        </div>
        
        <div class="relative z-10 flex justify-between items-center">
          <div>
            <p class="text-sm mb-2 opacity-90">当前余额</p>
            <div class="text-3xl font-bold">¥1234.56</div>
          </div>
          <div class="text-right">
            <p class="text-xs opacity-80">账户ID</p>
            <p class="text-sm">ACC20240001</p>
          </div>
        </div>
      </div>
      
      <!-- 选择充值金额 -->
      <div class="p-6">
        <h3 
          class="font-medium mb-4"
          :style="{ color: 'var(--text-primary)' }"
        >
          选择充值金额
        </h3>
        
        <!-- 金额选择网格 -->
        <div class="grid grid-cols-3 gap-4 mb-6">
          <button 
            class="h-14 border rounded-md hover:border-accent transition-all duration-200 hover:shadow-lg transform hover:-translate-y-1"
            :style="{
              borderColor: 'var(--border-color)',
              backgroundColor: 'var(--bg-tertiary)',
              color: 'var(--text-primary)'
            }"
          >
            ¥50
          </button>
          <button 
            class="h-14 border rounded-md hover:border-accent transition-all duration-200 hover:shadow-lg transform hover:-translate-y-1"
            :style="{
              borderColor: 'var(--border-color)',
              backgroundColor: 'var(--bg-tertiary)',
              color: 'var(--text-primary)'
            }"
          >
            ¥100
          </button>
          <button 
            class="h-14 border rounded-md hover:border-accent transition-all duration-200 hover:shadow-lg transform hover:-translate-y-1"
            :style="{
              borderColor: 'var(--border-color)',
              backgroundColor: 'var(--bg-tertiary)',
              color: 'var(--text-primary)'
            }"
          >
            ¥200
          </button>
          <button 
            class="h-14 border rounded-md hover:border-accent transition-all duration-200 hover:shadow-lg transform hover:-translate-y-1"
            :style="{
              borderColor: 'var(--border-color)',
              backgroundColor: 'var(--bg-tertiary)',
              color: 'var(--text-primary)'
            }"
          >
            ¥500
          </button>
          <button 
            class="h-14 border rounded-md hover:border-accent transition-all duration-200 hover:shadow-lg transform hover:-translate-y-1"
            :style="{
              borderColor: 'var(--border-color)',
              backgroundColor: 'var(--bg-tertiary)',
              color: 'var(--text-primary)'
            }"
          >
            ¥1000
          </button>
          <button 
            class="h-14 border rounded-md hover:border-accent transition-all duration-200 hover:shadow-lg transform hover:-translate-y-1"
            :style="{
              borderColor: 'var(--border-color)',
              backgroundColor: 'var(--bg-tertiary)',
              color: 'var(--text-primary)'
            }"
          >
            ¥2000
          </button>
        </div>
        
        <!-- 自定义金额 -->
        <div class="mb-6">
          <p 
            class="text-sm mb-2"
            :style="{ color: 'var(--text-secondary)' }"
          >
            自定义金额
          </p>
          <input 
            type="text" 
            placeholder="请输入充值金额" 
            class="w-full px-3 py-2 h-14 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            :style="{
              backgroundColor: 'var(--bg-input)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)'
            }"
          >
        </div>
        
        <!-- 支付方式 -->
        <div class="mb-6">
          <p 
            class="text-sm mb-4"
            :style="{ color: 'var(--text-secondary)' }"
          >
            选择支付方式
          </p>
          <div class="space-y-3">
            <div 
              class="border rounded-md p-3 relative cursor-pointer hover:shadow-md transition-all duration-200"
              :style="{
                backgroundColor: 'var(--accent-color)',
                borderColor: 'var(--accent-color)',
                color: 'white'
              }"
            >
              <div class="flex items-center">
                <div class="mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9.5 17.5m-1.5 0a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0"></path>
                    <path d="M15 12l-3 -5l3 -4"></path>
                    <path d="M12 7h4a2 2 0 0 1 2 2v9"></path>
                  </svg>
                </div>
                <div>
                  <p class="font-medium mb-1">支付宝</p>
                  <p class="text-xs opacity-80">推荐使用，到账快速</p>
                </div>
              </div>
              <div class="absolute right-3 top-1/2 -translate-y-1/2">
                <div class="w-5 h-5 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
              </div>
            </div>
            
            <div 
              class="border rounded-md p-3 relative cursor-pointer hover:shadow-md transition-all duration-200"
              :style="{
                backgroundColor: 'var(--bg-tertiary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)'
              }"
            >
              <div class="flex items-center">
                <div class="mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 12h12M18 9l3 3-3 3M6 15l-3-3 3-3"></path>
                  </svg>
                </div>
                <div>
                  <p class="font-medium mb-1">微信支付</p>
                  <p class="text-xs opacity-60">安全便捷，支持绑定银行卡</p>
                </div>
              </div>
            </div>
            
            <div 
              class="border rounded-md p-3 relative cursor-pointer hover:shadow-md transition-all duration-200"
              :style="{
                backgroundColor: 'var(--bg-tertiary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)'
              }"
            >
              <div class="flex items-center">
                <div class="mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2 5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5zm0 10a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2z"></path>
                  </svg>
                </div>
                <div>
                  <p class="font-medium mb-1">银行卡支付</p>
                  <p class="text-xs opacity-60">支持主流银行，大额充值优选</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 确认充值按钮 -->
        <button 
          class="w-full py-3 text-white rounded-md hover:opacity-80 transition-all duration-200 hover:shadow-lg transform hover:-translate-y-1"
          :style="{
            background: 'linear-gradient(135deg, var(--accent-color) 0%, #667eea 100%)'
          }"
        >
          确认充值
        </button>
      </div>
    </div>
    
    <!-- 充值记录 -->
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
          充值记录
        </h3>
      </div>
      
      <div class="p-6">
        <div class="space-y-4">
          <!-- 记录项 -->
          <div 
            class="flex justify-between items-center p-3 border rounded-md"
            :style="{
              backgroundColor: 'var(--bg-tertiary)',
              borderColor: 'var(--border-color)'
            }"
          >
            <div>
              <p 
                class="font-medium"
                :style="{ color: 'var(--text-primary)' }"
              >
                ¥100.00
              </p>
              <p 
                class="text-sm"
                :style="{ color: 'var(--text-secondary)' }"
              >
                2024-01-15 10:30
              </p>
            </div>
            <div class="text-right">
              <span 
                class="px-2 py-1 text-xs rounded-md"
                :style="{
                  backgroundColor: 'var(--accent-color)',
                  color: 'white'
                }"
              >
                已完成
              </span>
            </div>
          </div>
          
          <div 
            class="flex justify-between items-center p-3 border rounded-md"
            :style="{
              backgroundColor: 'var(--bg-tertiary)',
              borderColor: 'var(--border-color)'
            }"
          >
            <div>
              <p 
                class="font-medium"
                :style="{ color: 'var(--text-primary)' }"
              >
                ¥50.00
              </p>
              <p 
                class="text-sm"
                :style="{ color: 'var(--text-secondary)' }"
              >
                2024-01-14 15:20
              </p>
            </div>
            <div class="text-right">
              <span 
                class="px-2 py-1 text-xs rounded-md"
                :style="{
                  backgroundColor: 'var(--accent-color)',
                  color: 'white'
                }"
              >
                已完成
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 账号充值设置组件
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