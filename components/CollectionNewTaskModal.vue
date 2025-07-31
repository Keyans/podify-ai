<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    <div class="bg-dark-card rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto text-dark-text">
      <div class="p-5 border-b border-dark-border flex justify-between items-center">
        <h3 class="font-medium">新建采集任务</h3>
        <button @click="close" class="text-gray-400 hover:text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <div class="p-6">
        <!-- 采集类型 -->
        <div class="mb-6">
          <h4 class="font-medium mb-4">采集类型</h4>
          <div class="grid grid-cols-2 gap-4">
            <div class="flex items-start space-x-3">
              <input type="radio" id="product-link" name="collection-type" v-model="form.type" value="product" class="mt-1">
              <label for="product-link">
                <div class="font-medium">商品链接</div>
              </label>
            </div>
            <div class="flex items-start space-x-3">
              <input type="radio" id="store-link" name="collection-type" v-model="form.type" value="store" class="mt-1">
              <label for="store-link">
                <div class="font-medium">店铺链接</div>
              </label>
            </div>
            <div class="flex items-start space-x-3">
              <input type="radio" id="search-collection" name="collection-type" v-model="form.type" value="search" class="mt-1">
              <label for="search-collection">
                <div class="font-medium">搜索采集</div>
              </label>
            </div>
            <div class="flex items-start space-x-3">
              <input type="radio" id="plugin-collection" name="collection-type" v-model="form.type" value="plugin" class="mt-1">
              <label for="plugin-collection">
                <div class="font-medium">采集插件</div>
              </label>
            </div>
          </div>
        </div>
        
        <!-- 商品链接 -->
        <div v-if="form.type === 'product'" class="mb-6">
          <h4 class="font-medium mb-4">商品链接</h4>
          <div class="w-full">
            <textarea 
              v-model="form.links" 
              rows="4" 
              class="w-full px-3 py-2 bg-dark-input border border-dark-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-dark-text"
              placeholder="请填入商品链接地址，一行一条"
            ></textarea>
          </div>
          <div class="mt-2 flex items-center text-sm text-gray-500">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>支持平台：亚马逊、TEMU、Shein</span>
          </div>
        </div>
        
        <!-- 店铺链接 -->
        <div v-if="form.type === 'store'" class="mb-6">
          <h4 class="font-medium mb-4">店铺链接</h4>
          <div class="w-full">
            <input 
              type="text" 
              v-model="form.storeLink" 
              class="w-full px-3 py-2 bg-dark-input border border-dark-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-dark-text"
              placeholder="请填入店铺链接地址"
            >
          </div>
          <div class="mt-2 flex items-center text-sm text-gray-500">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>支持平台：亚马逊、TEMU、Shein</span>
          </div>
          <div class="mt-4">
            <label class="block text-sm text-gray-400 mb-1">页数</label>
            <div class="flex items-center">
              <select v-model="form.pageCount" class="w-32 px-3 py-2 bg-dark-input border border-dark-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-dark-text">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="10">10</option>
              </select>
              <span class="ml-2 text-sm text-gray-500">建议设置1~10页，页数过多将影响采集效率</span>
            </div>
          </div>
        </div>
        
        <!-- 搜索采集 -->
        <div v-if="form.type === 'search'" class="mb-6">
          <h4 class="font-medium mb-4">搜索关键词</h4>
          <div class="w-full">
            <input 
              type="text" 
              v-model="form.searchKeyword" 
              class="w-full px-3 py-2 bg-dark-input border border-dark-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-dark-text"
              placeholder="请输入搜索关键词"
            >
          </div>
          
          <h4 class="font-medium mt-6 mb-4">选择平台</h4>
          <div class="flex items-center space-x-6 mb-4">
            <div class="flex items-center">
              <input type="radio" id="platform-amazon" name="platform" v-model="form.platform" value="amazon" class="mr-2">
              <label for="platform-amazon">亚马逊</label>
            </div>
            <div class="flex items-center">
              <input type="radio" id="platform-temu" name="platform" v-model="form.platform" value="temu" class="mr-2">
              <label for="platform-temu">TEMU</label>
            </div>
            <div class="flex items-center">
              <input type="radio" id="platform-shein" name="platform" v-model="form.platform" value="shein" class="mr-2">
              <label for="platform-shein">Shein</label>
            </div>
          </div>
          
          <h4 class="font-medium mt-6 mb-4">价格区间</h4>
          <div class="flex items-center space-x-4">
            <input 
              type="text" 
              v-model="form.minPrice" 
              class="w-32 px-3 py-2 bg-dark-input border border-dark-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-dark-text"
              placeholder="最低价"
            >
            <input 
              type="text" 
              v-model="form.maxPrice" 
              class="w-32 px-3 py-2 bg-dark-input border border-dark-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-dark-text"
              placeholder="最高价"
            >
          </div>
          
          <h4 class="font-medium mt-6 mb-4">翻页数量</h4>
          <div class="flex items-center">
            <select v-model="form.pageCount" class="w-32 px-3 py-2 bg-dark-input border border-dark-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-dark-text">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="10">10</option>
            </select>
            <span class="ml-2 text-sm text-gray-500">建议设置1~10页，页数过多将影响采集效率</span>
          </div>
          
          <h4 class="font-medium mt-6 mb-4">商品类型</h4>
          <div class="w-full">
            <select v-model="form.productType" class="w-full px-3 py-2 bg-dark-input border border-dark-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-dark-text">
              <option value="">请选择商品类型</option>
              <option value="clothing">服装</option>
              <option value="electronics">电子产品</option>
              <option value="home">家居用品</option>
              <option value="beauty">美妆护肤</option>
              <option value="toys">玩具</option>
            </select>
          </div>
        </div>
        
        <!-- 采集插件 -->
        <div v-if="form.type === 'plugin'" class="mb-6">
          <div class="text-center mb-4">
            <button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center mx-auto">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              下载 CUZCUZ 采集插件
            </button>
          </div>
          
          <div class="text-sm text-gray-400 space-y-2">
            <p>1. 下载后端加载插件；</p>
            <p>2. 将文件夹拖入到浏览器（设置 → 扩展程序 → 管理扩展程序，右上角开启开发者模式）；</p>
            <p>3. 即可使用插件面板；</p>
            <p>4. 支持：谷歌浏览器、Edge浏览器、360急速浏览器、QQ浏览器</p>
            <p>5. 具体可以<a href="#" class="text-blue-500 hover:underline">查看操作说明</a></p>
          </div>
        </div>
      </div>
      
      <div class="p-5 border-t border-dark-border flex justify-end space-x-3">
        <button @click="close" class="px-4 py-2 border border-dark-border rounded-md text-gray-400 hover:bg-dark-hover">取消</button>
        <button @click="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">开始采集<span v-if="form.type === 'product' || form.type === 'search' || form.type === 'store'"> (5秒内)</span></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, defineProps, defineEmits, watch } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['close', 'submit'])

// 表单数据
const form = reactive({
  type: 'product',
  links: '',
  storeLink: '',
  platform: 'amazon',
  searchKeyword: '',
  minPrice: '',
  maxPrice: '',
  pageCount: '1',
  productType: ''
})

// 关闭弹窗
const close = () => {
  emits('close')
}

// 提交表单
const submit = () => {
  const formData = {
    ...form
  }
  emits('submit', formData)
}

// 重置表单
const resetForm = () => {
  Object.assign(form, {
    type: 'product',
    links: '',
    storeLink: '',
    platform: 'amazon',
    searchKeyword: '',
    minPrice: '',
    maxPrice: '',
    pageCount: '1',
    productType: ''
  })
}

// 监听弹窗关闭事件，重置表单
watch(() => props.isOpen, (newVal) => {
  if (!newVal) {
    resetForm()
  }
})
</script> 