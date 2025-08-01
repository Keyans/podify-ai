<template>
  <div>
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
</template>

<script setup>
// 团队资源权限设置组件
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