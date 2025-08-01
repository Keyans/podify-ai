<template>
  <div>
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
          查看您的交易历史记录
        </p>
      </div>
      
      <!-- 筛选区域 -->
      <div 
        class="p-6 border-b"
        :style="{
          borderColor: 'var(--border-color)'
        }"
      >
        <div class="flex flex-wrap gap-4">
          <select 
            class="px-3 py-2 border rounded-md"
            :style="{
              backgroundColor: 'var(--bg-input)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)'
            }"
          >
            <option>全部类型</option>
            <option>充值</option>
            <option>消费</option>
            <option>退款</option>
          </select>
          
          <select 
            class="px-3 py-2 border rounded-md"
            :style="{
              backgroundColor: 'var(--bg-input)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)'
            }"
          >
            <option>最近一周</option>
            <option>最近一月</option>
            <option>最近三月</option>
            <option>自定义时间</option>
          </select>
          
          <button 
            class="px-4 py-2 rounded-md text-white"
            :style="{
              backgroundColor: 'var(--accent-color)'
            }"
          >
            查询
          </button>
        </div>
      </div>
      
      <!-- 交易记录列表 -->
      <div class="p-6">
        <div class="space-y-4">
          <!-- 交易记录项 -->
          <div 
            class="flex justify-between items-center p-4 border rounded-lg"
            :style="{
              backgroundColor: 'var(--bg-tertiary)',
              borderColor: 'var(--border-color)'
            }"
          >
            <div class="flex items-center">
              <div 
                class="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                :style="{
                  backgroundColor: 'var(--accent-color)'
                }"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="text-white">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <div>
                <p 
                  class="font-medium"
                  :style="{ color: 'var(--text-primary)' }"
                >
                  充值
                </p>
                <p 
                  class="text-sm"
                  :style="{ color: 'var(--text-secondary)' }"
                >
                  2024-01-15 10:30:00
                </p>
              </div>
            </div>
            <div class="text-right">
              <p 
                class="font-bold text-green-500"
              >
                +¥100.00
              </p>
              <p 
                class="text-sm"
                :style="{ color: 'var(--text-secondary)' }"
              >
                已完成
              </p>
            </div>
          </div>
          
          <div 
            class="flex justify-between items-center p-4 border rounded-lg"
            :style="{
              backgroundColor: 'var(--bg-tertiary)',
              borderColor: 'var(--border-color)'
            }"
          >
            <div class="flex items-center">
              <div 
                class="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                :style="{
                  backgroundColor: '#ef4444'
                }"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="text-white">
                  <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </div>
              <div>
                <p 
                  class="font-medium"
                  :style="{ color: 'var(--text-primary)' }"
                >
                  API调用费用
                </p>
                <p 
                  class="text-sm"
                  :style="{ color: 'var(--text-secondary)' }"
                >
                  2024-01-14 15:20:00
                </p>
              </div>
            </div>
            <div class="text-right">
              <p 
                class="font-bold text-red-500"
              >
                -¥25.50
              </p>
              <p 
                class="text-sm"
                :style="{ color: 'var(--text-secondary)' }"
              >
                已完成
              </p>
            </div>
          </div>
          
          <div 
            class="flex justify-between items-center p-4 border rounded-lg"
            :style="{
              backgroundColor: 'var(--bg-tertiary)',
              borderColor: 'var(--border-color)'
            }"
          >
            <div class="flex items-center">
              <div 
                class="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                :style="{
                  backgroundColor: 'var(--accent-color)'
                }"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="text-white">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <div>
                <p 
                  class="font-medium"
                  :style="{ color: 'var(--text-primary)' }"
                >
                  充值
                </p>
                <p 
                  class="text-sm"
                  :style="{ color: 'var(--text-secondary)' }"
                >
                  2024-01-13 09:15:00
                </p>
              </div>
            </div>
            <div class="text-right">
              <p 
                class="font-bold text-green-500"
              >
                +¥50.00
              </p>
              <p 
                class="text-sm"
                :style="{ color: 'var(--text-secondary)' }"
              >
                已完成
              </p>
            </div>
          </div>
        </div>
        
        <!-- 分页 -->
        <div class="flex justify-center mt-6">
          <div class="flex space-x-2">
            <button 
              class="px-3 py-1 border rounded"
              :style="{
                borderColor: 'var(--border-color)',
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--text-primary)'
              }"
            >
              上一页
            </button>
            <button 
              class="px-3 py-1 border rounded text-white"
              :style="{
                borderColor: 'var(--accent-color)',
                backgroundColor: 'var(--accent-color)'
              }"
            >
              1
            </button>
            <button 
              class="px-3 py-1 border rounded"
              :style="{
                borderColor: 'var(--border-color)',
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--text-primary)'
              }"
            >
              2
            </button>
            <button 
              class="px-3 py-1 border rounded"
              :style="{
                borderColor: 'var(--border-color)',
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--text-primary)'
              }"
            >
              下一页
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 交易记录设置组件
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