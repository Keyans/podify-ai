<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    <div class="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
      <div class="p-5 border-b flex justify-between items-center">
        <h3 class="font-medium">{{ getModalTitle }}</h3>
        <button @click="close" class="text-gray-400 hover:text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <div class="p-6">
        <!-- 基本信息 -->
        <div class="mb-6">
          <h4 class="font-medium mb-4">基本信息</h4>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm text-gray-600 mb-1">{{ getTaskNameLabel }}</label>
              <input type="text" v-model="form.name" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" :placeholder="getTaskNamePlaceholder">
            </div>
            
            <!-- 采集任务特有字段 -->
            <template v-if="taskType === 'collection'">
              <div>
                <label class="block text-sm text-gray-600 mb-1">采集类型</label>
                <select v-model="form.collectionType" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="product">商品链接</option>
                  <option value="store">店铺链接</option>
                  <option value="search">搜索采集</option>
                  <option value="plugin">采集插件</option>
                </select>
              </div>
              <div>
                <label class="block text-sm text-gray-600 mb-1">平台</label>
                <select v-model="form.platform" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="amazon">亚马逊</option>
                  <option value="temu">TEMU</option>
                  <option value="shein">Shein</option>
                </select>
              </div>
            </template>
            
            <!-- 裁图任务特有字段 -->
            <template v-if="taskType === 'cropping'">
              <div>
                <label class="block text-sm text-gray-600 mb-1">裁剪类型</label>
                <select v-model="form.croppingType" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="product">产品主图</option>
                  <option value="banner">Banner图</option>
                  <option value="detail">详情图</option>
                  <option value="custom">自定义尺寸</option>
                </select>
              </div>
              <div v-if="form.croppingType === 'custom'">
                <label class="block text-sm text-gray-600 mb-1">自定义宽度</label>
                <input type="number" v-model="form.width" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="宽度(px)">
              </div>
              <div v-if="form.croppingType === 'custom'">
                <label class="block text-sm text-gray-600 mb-1">自定义高度</label>
                <input type="number" v-model="form.height" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="高度(px)">
              </div>
            </template>
            
            <!-- 抠图任务特有字段 -->
            <template v-if="taskType === 'cutout'">
              <div>
                <label class="block text-sm text-gray-600 mb-1">抠图模式</label>
                <select v-model="form.cutoutMode" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="auto">自动抠图</option>
                  <option value="precise">精细抠图</option>
                  <option value="fast">快速抠图</option>
                </select>
              </div>
            </template>
            
            <!-- 裂变任务特有字段 -->
            <template v-if="taskType === 'transform'">
              <div>
                <label class="block text-sm text-gray-600 mb-1">裂变类型</label>
                <select v-model="form.transformType" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="title">标题变体</option>
                  <option value="description">描述变体</option>
                  <option value="keyword">关键词变体</option>
                </select>
              </div>
              <div>
                <label class="block text-sm text-gray-600 mb-1">变体数量</label>
                <input type="number" v-model="form.variants" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="生成数量">
              </div>
            </template>
            
            <!-- 文生图任务特有字段 -->
            <template v-if="taskType === 'text-to-image'">
              <div>
                <label class="block text-sm text-gray-600 mb-1">生成风格</label>
                <select v-model="form.imageStyle" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="realistic">写实风格</option>
                  <option value="cartoon">卡通风格</option>
                  <option value="abstract">抽象风格</option>
                  <option value="3d">3D渲染</option>
                </select>
              </div>
              <div>
                <label class="block text-sm text-gray-600 mb-1">图像尺寸</label>
                <select v-model="form.imageSize" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="1024x1024">1024x1024</option>
                  <option value="512x512">512x512</option>
                  <option value="768x768">768x768</option>
                </select>
              </div>
            </template>
            
            <!-- 标题生成任务特有字段 -->
            <template v-if="taskType === 'title-generation'">
              <div>
                <label class="block text-sm text-gray-600 mb-1">标题类型</label>
                <select v-model="form.titleType" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="product">商品标题</option>
                  <option value="seo">SEO标题</option>
                  <option value="ad">广告标题</option>
                  <option value="social">社交媒体标题</option>
                </select>
              </div>
              <div>
                <label class="block text-sm text-gray-600 mb-1">生成数量</label>
                <input type="number" v-model="form.titleCount" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="生成数量">
              </div>
            </template>
            
            <!-- 侵权检测任务特有字段 -->
            <template v-if="taskType === 'detection'">
              <div>
                <label class="block text-sm text-gray-600 mb-1">检测类型</label>
                <select v-model="form.detectionType" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="trademark">商标侵权</option>
                  <option value="patent">专利侵权</option>
                  <option value="copyright">版权侵权</option>
                </select>
              </div>
            </template>
            
            <!-- POD合成任务特有字段 -->
            <template v-if="taskType === 'pod-synthesis'">
              <div>
                <label class="block text-sm text-gray-600 mb-1">白色产品</label>
                <select v-model="form.productType" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="tshirt">纯棉圆领T恤</option>
                  <option value="mug">陶瓷马克杯</option>
                  <option value="bag">帆布手提袋</option>
                  <option value="phone">iPhone手机壳</option>
                  <option value="cap">棒球帽</option>
                </select>
              </div>
            </template>
            
            <!-- 通用字段 -->
            <div>
              <label class="block text-sm text-gray-600 mb-1">图片来源</label>
              <select v-model="form.source" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="upload">本地上传</option>
                <option value="library">素材库</option>
                <option value="url">网络图片</option>
              </select>
            </div>
          </div>
        </div>
        
        <!-- 高级参数 -->
        <div v-if="hasAdvancedParams" class="mb-6">
          <h4 class="font-medium mb-4">{{ getAdvancedParamsTitle }}</h4>
          
          <div class="grid grid-cols-2 gap-4">
            <!-- 裁图任务高级参数 -->
            <template v-if="taskType === 'cropping'">
              <div>
                <label class="block text-sm text-gray-600 mb-1">智能识别</label>
                <div class="flex items-center mt-2">
                  <label class="inline-flex items-center mr-4">
                    <input type="radio" v-model="form.smartDetect" :value="true" class="form-radio text-blue-500">
                    <span class="ml-2">开启</span>
                  </label>
                  <label class="inline-flex items-center">
                    <input type="radio" v-model="form.smartDetect" :value="false" class="form-radio text-blue-500">
                    <span class="ml-2">关闭</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label class="block text-sm text-gray-600 mb-1">优化方式</label>
                <select v-model="form.optimizeType" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="quality">保持质量</option>
                  <option value="speed">优先速度</option>
                  <option value="balance">平衡处理</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm text-gray-600 mb-1">主体保留</label>
                <select v-model="form.subjectRetention" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="full">完整保留</option>
                  <option value="partial">部分保留</option>
                  <option value="auto">智能判断</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm text-gray-600 mb-1">输出格式</label>
                <select v-model="form.outputFormat" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="jpg">JPG</option>
                  <option value="png">PNG</option>
                  <option value="webp">WEBP</option>
                  <option value="original">保持原格式</option>
                </select>
              </div>
            </template>
            
            <!-- 其他任务类型的高级参数可以在这里添加 -->
          </div>
        </div>
        
        <!-- 上传图片区域 -->
        <div v-if="form.source === 'upload'" class="mb-6">
          <h4 class="font-medium mb-4">上传图片</h4>
          <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <div class="space-y-2">
              <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <div class="text-sm text-gray-600">
                <label for="file-upload" class="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                  <span>上传图片</span>
                  <input id="file-upload" name="file-upload" type="file" class="sr-only" multiple @change="handleFileUpload">
                </label>
                <p class="pl-1">或拖放图片至此处</p>
              </div>
              <p class="text-xs text-gray-500">支持 PNG, JPG, GIF，最大不超过10MB</p>
            </div>
          </div>
            
          <!-- 已选图片预览 -->
          <div v-if="selectedFiles.length > 0" class="mt-4">
            <h5 class="text-sm font-medium text-gray-700 mb-2">已选择 {{ selectedFiles.length }} 张图片</h5>
            <div class="grid grid-cols-5 gap-2">
              <div v-for="(file, index) in selectedFiles" :key="index" class="relative">
                <div class="relative h-20 w-full rounded-md overflow-hidden">
                  <img :src="file.preview" alt="预览图" class="h-full w-full object-cover">
                  <button @click="removeFile(index)" class="absolute top-0 right-0 p-1 bg-white rounded-full shadow">
                    <svg class="h-4 w-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 素材库选择 -->
        <div v-if="form.source === 'library'" class="mb-6">
          <h4 class="font-medium mb-4">选择素材</h4>
          <div class="grid grid-cols-4 gap-3">
            <div v-for="i in 8" :key="i" class="border rounded-md p-2 cursor-pointer hover:border-blue-500">
              <div class="h-24 bg-gray-100 rounded-md mb-2"></div>
              <p class="text-xs truncate">素材示例{{ i }}.jpg</p>
            </div>
          </div>
          <div class="text-center mt-4">
            <button class="text-blue-600 text-sm">加载更多</button>
          </div>
        </div>

        <!-- 网络图片 -->
        <div v-if="form.source === 'url'" class="mb-6">
          <h4 class="font-medium mb-4">网络图片</h4>
          <div class="space-y-3">
            <div v-for="(url, index) in form.urls" :key="index" class="flex items-center space-x-2">
              <input type="text" v-model="form.urls[index]" class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="输入图片URL">
              <button @click="removeUrl(index)" class="p-2 text-red-500 hover:text-red-700">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
            <button @click="addUrl" class="px-3 py-2 border border-dashed border-gray-300 rounded-md text-sm text-gray-600 hover:text-gray-900 w-full">
              + 添加URL
            </button>
          </div>
        </div>
        
        <!-- 文生图特有的提示词输入 -->
        <div v-if="taskType === 'text-to-image'" class="mb-6">
          <h4 class="font-medium mb-4">提示词</h4>
          <textarea 
            v-model="form.prompt" 
            rows="4" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="请输入详细的图像描述，例如：一只可爱的橙色猫咪，在阳光明媚的花园里玩耍"
          ></textarea>
          <div class="mt-2 text-xs text-gray-500">
            提示词越详细，生成的图像质量越高
          </div>
        </div>
        
        <!-- 标题生成特有的产品信息输入 -->
        <div v-if="taskType === 'title-generation'" class="mb-6">
          <h4 class="font-medium mb-4">产品信息</h4>
          <div class="space-y-4">
            <div>
              <label class="block text-sm text-gray-600 mb-1">产品名称</label>
              <input 
                type="text" 
                v-model="form.productName" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="请输入产品名称"
              />
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-1">产品描述</label>
              <textarea 
                v-model="form.productDescription" 
                rows="3" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="请输入产品描述，包括功能、特点、材质等信息"
              ></textarea>
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-1">关键词（用逗号分隔）</label>
              <input 
                type="text" 
                v-model="form.keywords" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="例如：时尚,舒适,耐用,高品质"
              />
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-1">目标平台</label>
              <select v-model="form.platform" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="amazon">亚马逊</option>
                <option value="shopify">Shopify</option>
                <option value="ebay">eBay</option>
                <option value="walmart">沃尔玛</option>
                <option value="tiktok">TikTok</option>
                <option value="other">其他</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      <div class="p-5 border-t flex justify-end space-x-3">
        <button @click="close" class="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50">取消</button>
        <button @click="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">{{ getSubmitButtonText }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, defineProps, defineEmits, watch } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  taskType: {
    type: String,
    default: 'cropping', // cropping, cutout, transform, text-to-image, detection, pod-synthesis, collection, title-generation
    validator: (value) => ['cropping', 'cutout', 'transform', 'text-to-image', 'detection', 'pod-synthesis', 'collection', 'title-generation'].includes(value)
  }
})

const emits = defineEmits(['close', 'submit'])

// 计算属性：模态窗口标题
const getModalTitle = computed(() => {
  const titles = {
    'cropping': '新建裁图任务',
    'cutout': '新建抠图任务',
    'transform': '新建裂变任务',
    'text-to-image': '新建生图任务',
    'detection': '新建检测任务',
    'pod-synthesis': '新建合成任务',
    'collection': '新建采集任务',
    'title-generation': '新建标题生成任务'
  }
  return titles[props.taskType] || '新建任务'
})

// 计算属性：任务名称标签
const getTaskNameLabel = computed(() => {
  const labels = {
    'cropping': '裁图名称',
    'cutout': '抠图名称',
    'transform': '裂变名称',
    'text-to-image': '生图名称',
    'detection': '检测名称',
    'pod-synthesis': '合成名称',
    'collection': '采集名称',
    'title-generation': '标题生成名称'
  }
  return labels[props.taskType] || '任务名称'
})

// 计算属性：任务名称占位符
const getTaskNamePlaceholder = computed(() => {
  const placeholders = {
    'cropping': '例如：产品主图裁剪',
    'cutout': '例如：产品背景抠图',
    'transform': '例如：标题裂变生成',
    'text-to-image': '例如：产品场景生成',
    'detection': '例如：商标侵权检测',
    'pod-synthesis': '例如：T恤图案合成',
    'collection': '例如：亚马逊商品采集',
    'title-generation': '例如：商品标题生成'
  }
  return placeholders[props.taskType] || '请输入任务名称'
})

// 计算属性：是否显示高级参数
const hasAdvancedParams = computed(() => {
  return ['cropping', 'cutout', 'transform', 'text-to-image', 'title-generation'].includes(props.taskType)
})

// 计算属性：高级参数标题
const getAdvancedParamsTitle = computed(() => {
  const titles = {
    'cropping': '裁剪参数',
    'cutout': '抠图参数',
    'transform': '裂变参数',
    'text-to-image': '生成参数',
    'title-generation': '标题参数'
  }
  return titles[props.taskType] || '高级参数'
})

// 计算属性：提交按钮文本
const getSubmitButtonText = computed(() => {
  const buttonTexts = {
    'cropping': '创建裁图任务',
    'cutout': '创建抠图任务',
    'transform': '创建裂变任务',
    'text-to-image': '创建生图任务',
    'detection': '创建检测任务',
    'pod-synthesis': '创建合成任务',
    'collection': '创建采集任务',
    'title-generation': '创建标题生成任务'
  }
  return buttonTexts[props.taskType] || '创建任务'
})

// 表单数据
const form = reactive({
  name: '',
  source: 'upload',
  urls: [''],
  // 裁图特有
  croppingType: 'product',
  width: 800,
  height: 800,
  smartDetect: true,
  optimizeType: 'balance',
  subjectRetention: 'auto',
  outputFormat: 'jpg',
  // 抠图特有
  cutoutMode: 'auto',
  // 裂变特有
  transformType: 'title',
  variants: 5,
  // 文生图特有
  imageStyle: 'realistic',
  imageSize: '1024x1024',
  prompt: '',
  // 检测特有
  detectionType: 'trademark',
  // POD合成特有
  productType: 'tshirt',
  // 采集特有
  collectionType: 'product',
  platform: 'amazon',
  // 标题生成特有
  titleType: 'product',
  titleCount: 5,
  // 标题生成特有的产品信息
  productName: '',
  productDescription: '',
  keywords: '',
})

// 已选文件
const selectedFiles = ref([])

// 添加URL输入框
const addUrl = () => {
  form.urls.push('')
}

// 移除URL输入框
const removeUrl = (index) => {
  form.urls.splice(index, 1)
  if (form.urls.length === 0) {
    form.urls.push('')
  }
}

// 处理文件上传
const handleFileUpload = (event) => {
  const files = Array.from(event.target.files)
  
  // 为每个文件创建预览
  files.forEach(file => {
    const reader = new FileReader()
    reader.onload = (e) => {
      selectedFiles.value.push({
        file,
        preview: e.target.result,
        name: file.name
      })
    }
    reader.readAsDataURL(file)
  })
}

// 移除已选文件
const removeFile = (index) => {
  selectedFiles.value.splice(index, 1)
}

// 关闭弹窗
const close = () => {
  emits('close')
}

// 提交表单
const submit = () => {
  const formData = {
    ...form,
    files: selectedFiles.value.map(item => item.file),
    taskType: props.taskType
  }
  emits('submit', formData)
}

// 重置表单
const resetForm = () => {
  Object.assign(form, {
    name: '',
    source: 'upload',
    urls: [''],
    // 重置所有特有字段
    croppingType: 'product',
    width: 800,
    height: 800,
    smartDetect: true,
    optimizeType: 'balance',
    subjectRetention: 'auto',
    outputFormat: 'jpg',
    cutoutMode: 'auto',
    transformType: 'title',
    variants: 5,
    imageStyle: 'realistic',
    imageSize: '1024x1024',
    prompt: '',
    detectionType: 'trademark',
    productType: 'tshirt',
    collectionType: 'product',
    platform: 'amazon',
    // 重置标题生成特有字段
    titleType: 'product',
    titleCount: 5,
    // 重置标题生成特有的产品信息
    productName: '',
    productDescription: '',
    keywords: '',
  })
  selectedFiles.value = []
}

// 监听弹窗关闭事件，重置表单
watch(() => props.isOpen, (newVal) => {
  if (!newVal) {
    resetForm()
  }
})
</script> 