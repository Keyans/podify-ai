<template>
  <div class="flex flex-col h-screen bg-dark-bg">
    <!-- 页面标题 -->
    <div class="p-6 border-b border-dark-border">
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
          </svg>
        </div>
        <div>
          <h1 class="text-2xl font-bold text-dark-text">帮助中心</h1>
          <p class="text-dark-text-secondary">了解如何使用 CuzCuz AI 的各项功能</p>
        </div>
      </div>
    </div>

    <!-- 主要内容区域 -->
    <div class="flex-1 overflow-auto p-6">
      <div class="max-w-4xl mx-auto space-y-8">
        
        <!-- 快速开始 -->
        <section class="bg-dark-card rounded-lg border border-dark-border p-6">
          <div class="flex items-center space-x-3 mb-4">
            <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <h2 class="text-xl font-semibold text-dark-text">🚀 快速开始</h2>
          </div>
          <div class="grid md:grid-cols-2 gap-4">
            <div class="p-4 bg-dark-input rounded-lg">
              <h3 class="font-medium text-dark-text mb-2">1. 账户设置</h3>
              <p class="text-dark-text-secondary text-sm">完善您的个人信息，设置账户偏好和安全选项。</p>
            </div>
            <div class="p-4 bg-dark-input rounded-lg">
              <h3 class="font-medium text-dark-text mb-2">2. 团队管理</h3>
              <p class="text-dark-text-secondary text-sm">创建或加入团队，与成员协作完成项目。</p>
            </div>
            <div class="p-4 bg-dark-input rounded-lg">
              <h3 class="font-medium text-dark-text mb-2">3. 选择应用</h3>
              <p class="text-dark-text-secondary text-sm">从我的应用中选择适合的AI工具开始您的创作。</p>
            </div>
            <div class="p-4 bg-dark-input rounded-lg">
              <h3 class="font-medium text-dark-text mb-2">4. 查看结果</h3>
              <p class="text-dark-text-secondary text-sm">在图库管理中查看和管理您的处理结果。</p>
            </div>
          </div>
        </section>

        <!-- AI应用功能 -->
        <section class="bg-dark-card rounded-lg border border-dark-border p-6">
          <div class="flex items-center space-x-3 mb-4">
            <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"/>
              </svg>
            </div>
            <h2 class="text-xl font-semibold text-dark-text">🎯 AI应用功能</h2>
          </div>
          <div class="space-y-4">
            
            <!-- 商品采集 -->
            <div class="border border-dark-border rounded-lg p-4">
              <div class="flex items-center space-x-3 mb-3">
                <div class="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
                  <span class="text-white text-xs">采</span>
                </div>
                <h3 class="text-lg font-medium text-dark-text">商品采集</h3>
              </div>
              <p class="text-dark-text-secondary mb-3">自动化采集电商平台商品信息，包括图片、标题、价格等数据。</p>
              <div class="bg-dark-input rounded-lg p-3">
                <h4 class="font-medium text-dark-text text-sm mb-2">使用步骤：</h4>
                <ol class="text-dark-text-secondary text-sm space-y-1">
                  <li>1. 输入商品链接或关键词</li>
                  <li>2. 选择采集规则和字段</li>
                  <li>3. 启动采集任务</li>
                  <li>4. 查看采集结果并导出</li>
                </ol>
              </div>
            </div>

            <!-- 智能裁图 -->
            <div class="border border-dark-border rounded-lg p-4">
              <div class="flex items-center space-x-3 mb-3">
                <div class="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
                  <span class="text-white text-xs">裁</span>
                </div>
                <h3 class="text-lg font-medium text-dark-text">智能裁图</h3>
              </div>
              <p class="text-dark-text-secondary mb-3">AI智能识别图片内容，自动进行最佳构图裁剪，生成多种比例的图片。</p>
              <div class="bg-dark-input rounded-lg p-3">
                <h4 class="font-medium text-dark-text text-sm mb-2">支持功能：</h4>
                <ul class="text-dark-text-secondary text-sm space-y-1">
                  <li>• 自动识别主体内容</li>
                  <li>• 多种裁剪比例（1:1、16:9、4:3等）</li>
                  <li>• 批量处理功能</li>
                  <li>• 质量优化</li>
                </ul>
              </div>
            </div>

            <!-- 一键抠图 -->
            <div class="border border-dark-border rounded-lg p-4">
              <div class="flex items-center space-x-3 mb-3">
                <div class="w-6 h-6 bg-yellow-500 rounded flex items-center justify-center">
                  <span class="text-white text-xs">抠</span>
                </div>
                <h3 class="text-lg font-medium text-dark-text">一键抠图</h3>
              </div>
              <p class="text-dark-text-secondary mb-3">精准识别图片主体，自动去除背景，支持透明背景和自定义背景替换。</p>
              <div class="bg-dark-input rounded-lg p-3">
                <h4 class="font-medium text-dark-text text-sm mb-2">适用场景：</h4>
                <ul class="text-dark-text-secondary text-sm space-y-1">
                  <li>• 商品图片背景处理</li>
                  <li>• 人像背景替换</li>
                  <li>• 透明背景制作</li>
                  <li>• 电商产品图优化</li>
                </ul>
              </div>
            </div>

            <!-- 文生图 -->
            <div class="border border-dark-border rounded-lg p-4">
              <div class="flex items-center space-x-3 mb-3">
                <div class="w-6 h-6 bg-pink-500 rounded flex items-center justify-center">
                  <span class="text-white text-xs">文</span>
                </div>
                <h3 class="text-lg font-medium text-dark-text">文生图</h3>
              </div>
              <p class="text-dark-text-secondary mb-3">根据文字描述生成高质量图片，支持多种风格和自定义参数。</p>
              <div class="bg-dark-input rounded-lg p-3">
                <h4 class="font-medium text-dark-text text-sm mb-2">创作技巧：</h4>
                <ul class="text-dark-text-secondary text-sm space-y-1">
                  <li>• 详细描述场景和元素</li>
                  <li>• 指定艺术风格（写实、卡通、油画等）</li>
                  <li>• 添加参考图片提升效果</li>
                  <li>• 调整尺寸和质量参数</li>
                </ul>
              </div>
            </div>

            <!-- 超级裂变 -->
            <div class="border border-dark-border rounded-lg p-4">
              <div class="flex items-center space-x-3 mb-3">
                <div class="w-6 h-6 bg-purple-500 rounded flex items-center justify-center">
                  <span class="text-white text-xs">裂</span>
                </div>
                <h3 class="text-lg font-medium text-dark-text">超级裂变</h3>
              </div>
              <p class="text-dark-text-secondary mb-3">基于原图生成多种变体，保持主要特征的同时创造新的视觉效果。</p>
              <div class="bg-dark-input rounded-lg p-3">
                <h4 class="font-medium text-dark-text text-sm mb-2">变体类型：</h4>
                <ul class="text-dark-text-secondary text-sm space-y-1">
                  <li>• 风格变换（水彩、素描、油画等）</li>
                  <li>• 色彩调整</li>
                  <li>• 细节优化</li>
                  <li>• 构图变化</li>
                </ul>
              </div>
            </div>

            <!-- 其他应用 -->
            <div class="grid md:grid-cols-2 gap-4">
              <div class="border border-dark-border rounded-lg p-4">
                <div class="flex items-center space-x-3 mb-3">
                  <div class="w-6 h-6 bg-red-500 rounded flex items-center justify-center">
                    <span class="text-white text-xs">检</span>
                  </div>
                  <h3 class="font-medium text-dark-text">侵权检测</h3>
                </div>
                <p class="text-dark-text-secondary text-sm">检测图片是否存在版权问题，保护您的创作权益。</p>
              </div>
              
              <div class="border border-dark-border rounded-lg p-4">
                <div class="flex items-center space-x-3 mb-3">
                  <div class="w-6 h-6 bg-cyan-500 rounded flex items-center justify-center">
                    <span class="text-white text-xs">POD</span>
                  </div>
                  <h3 class="font-medium text-dark-text">POD合成</h3>
                </div>
                <p class="text-dark-text-secondary text-sm">将设计图案合成到各种商品上，预览效果。</p>
              </div>
              
              <div class="border border-dark-border rounded-lg p-4">
                <div class="flex items-center space-x-3 mb-3">
                  <div class="w-6 h-6 bg-orange-500 rounded flex items-center justify-center">
                    <span class="text-white text-xs">标</span>
                  </div>
                  <h3 class="font-medium text-dark-text">标题生成</h3>
                </div>
                <p class="text-dark-text-secondary text-sm">AI生成吸引人的商品标题，提升转化率。</p>
              </div>
              
              <div class="border border-dark-border rounded-lg p-4">
                <div class="flex items-center space-x-3 mb-3">
                  <div class="w-6 h-6 bg-indigo-500 rounded flex items-center justify-center">
                    <span class="text-white text-xs">刊</span>
                  </div>
                  <h3 class="font-medium text-dark-text">批量刊登</h3>
                </div>
                <p class="text-dark-text-secondary text-sm">批量发布商品到各个电商平台。</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 工作流管理 -->
        <section class="bg-dark-card rounded-lg border border-dark-border p-6">
          <div class="flex items-center space-x-3 mb-4">
            <div class="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-cyan-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"/>
              </svg>
            </div>
            <h2 class="text-xl font-semibold text-dark-text">⚡ 工作流管理</h2>
          </div>
          <div class="space-y-4">
            <p class="text-dark-text-secondary">工作流功能允许您将多个AI应用组合成自动化流程，提高工作效率。</p>
            
            <div class="bg-dark-input rounded-lg p-4">
              <h3 class="font-medium text-dark-text mb-3">常用工作流模板：</h3>
              <div class="space-y-3">
                <div class="flex items-center space-x-3">
                  <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span class="text-dark-text-secondary text-sm">商品采集 → 智能裁图 → 一键抠图 → 批量刊登</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span class="text-dark-text-secondary text-sm">文生图 → 超级裂变 → 侵权检测 → POD合成</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span class="text-dark-text-secondary text-sm">商品采集 → 标题生成 → 批量刊登</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 图库管理 -->
        <section class="bg-dark-card rounded-lg border border-dark-border p-6">
          <div class="flex items-center space-x-3 mb-4">
            <div class="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
              </svg>
            </div>
            <h2 class="text-xl font-semibold text-dark-text">📁 图库管理</h2>
          </div>
          <div class="grid md:grid-cols-3 gap-4">
            <div class="p-4 bg-dark-input rounded-lg">
              <h3 class="font-medium text-dark-text mb-2">商品图库</h3>
              <p class="text-dark-text-secondary text-sm">存储和管理商品相关图片，支持分类和标签。</p>
            </div>
            <div class="p-4 bg-dark-input rounded-lg">
              <h3 class="font-medium text-dark-text mb-2">素材图库</h3>
              <p class="text-dark-text-secondary text-sm">设计素材和模板存储，方便复用和分享。</p>
            </div>
            <div class="p-4 bg-dark-input rounded-lg">
              <h3 class="font-medium text-dark-text mb-2">结果图库</h3>
              <p class="text-dark-text-secondary text-sm">AI处理结果存储，支持历史版本管理。</p>
            </div>
          </div>
        </section>

        <!-- 常见问题 -->
        <section class="bg-dark-card rounded-lg border border-dark-border p-6">
          <div class="flex items-center space-x-3 mb-4">
            <div class="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
              </svg>
            </div>
            <h2 class="text-xl font-semibold text-dark-text">❓ 常见问题</h2>
          </div>
          <div class="space-y-4">
            
            <div class="border-l-4 border-blue-500 pl-4">
              <h3 class="font-medium text-dark-text mb-2">Q: 如何切换团队？</h3>
              <p class="text-dark-text-secondary text-sm">点击左侧栏底部的用户信息区域，在弹出的窗口中选择要切换的团队。</p>
            </div>
            
            <div class="border-l-4 border-green-500 pl-4">
              <h3 class="font-medium text-dark-text mb-2">Q: 处理任务失败怎么办？</h3>
              <p class="text-dark-text-secondary text-sm">可以在工作流页面查看失败原因，然后点击"重新执行"按钮重试。</p>
            </div>
            
            <div class="border-l-4 border-purple-500 pl-4">
              <h3 class="font-medium text-dark-text mb-2">Q: 如何管理图片分类？</h3>
              <p class="text-dark-text-secondary text-sm">在图库页面的左侧分类面板中，可以添加、编辑和删除自定义分类。</p>
            </div>
            
            <div class="border-l-4 border-orange-500 pl-4">
              <h3 class="font-medium text-dark-text mb-2">Q: 如何查看账户余额？</h3>
              <p class="text-dark-text-secondary text-sm">余额信息显示在团队切换弹窗中，也可以在账户设置页面查看详细信息。</p>
            </div>
            
            <div class="border-l-4 border-red-500 pl-4">
              <h3 class="font-medium text-dark-text mb-2">Q: 如何联系客服？</h3>
              <p class="text-dark-text-secondary text-sm">可以通过邮箱 support@cuzcuz.ai 联系我们，或在工作时间使用在线客服。</p>
            </div>
          </div>
        </section>

        <!-- 联系我们 -->
        <section class="bg-dark-card rounded-lg border border-dark-border p-6">
          <div class="flex items-center space-x-3 mb-4">
            <div class="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>
            <h2 class="text-xl font-semibold text-dark-text">📧 联系我们</h2>
          </div>
          <div class="grid md:grid-cols-2 gap-4">
            <div class="p-4 bg-dark-input rounded-lg">
              <h3 class="font-medium text-dark-text mb-2">技术支持</h3>
              <p class="text-dark-text-secondary text-sm mb-2">遇到技术问题？我们随时为您提供帮助。</p>
              <p class="text-blue-400 text-sm">support@cuzcuz.ai</p>
            </div>
            <div class="p-4 bg-dark-input rounded-lg">
              <h3 class="font-medium text-dark-text mb-2">商务合作</h3>
              <p class="text-dark-text-secondary text-sm mb-2">业务合作与定制化需求咨询。</p>
              <p class="text-blue-400 text-sm">business@cuzcuz.ai</p>
            </div>
          </div>
        </section>

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
  title: '帮助中心 - CuzCuz AI',
  meta: [
    { name: 'description', content: 'CuzCuz AI 帮助中心，了解如何使用各项AI功能' }
  ]
})
</script> 