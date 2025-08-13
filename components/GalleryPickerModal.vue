<template>
  <!-- Overlay 模式 -->
  <div v-if="!inline && isOpen" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" @click.self="$emit('close')">
    <div class="bg-dark-card rounded-lg w-full max-w-5xl max-h-[85vh] overflow-hidden text-dark-text">
      <!-- Header -->
      <div class="p-4 border-b border-dark-border flex items-center justify-between">
        <h4 class="font-medium">从图库选择</h4>
        <button @click="$emit('close')" class="text-dark-text-secondary hover:text-dark-text">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>

      <!-- Tabs + Search -->
      <div class="p-4 border-b border-dark-border">
        <div class="flex items-center justify-between">
          <div class="space-x-2">
            <button @click="switchTab(1)" :class="tabClass(1)" class="px-3 py-1 rounded-md text-sm">商品图库</button>
            <button @click="switchTab(2)" :class="tabClass(2)" class="px-3 py-1 rounded-md text-sm">素材图库</button>
            <button @click="switchTab(3)" :class="tabClass(3)" class="px-3 py-1 rounded-md text-sm">结果图库</button>
          </div>
          <div class="flex items-center space-x-2">
            <div class="relative">
              <input v-model="search" @keyup.enter="reload" type="text" placeholder="搜索图片名称" class="pl-9 pr-3 py-2 bg-dark-input border border-dark-border rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              <svg class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-dark-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
            <!-- 分类下拉（商品/素材图库显示） -->
            <select v-if="activeType===1 || activeType===2" v-model="selectedCategoryId" @change="reload" class="px-3 py-2 bg-dark-input border border-dark-border rounded-md text-sm">
              <option value="">全部分类</option>
              <option v-for="c in categoryOptions" :key="c.value" :value="c.value">{{ c.label }}</option>
            </select>
          </div>
        </div>
      </div>

      <!-- List -->
      <div class="p-4 overflow-y-auto" style="max-height: 60vh;">
        <div v-if="loading" class="text-sm text-dark-text-secondary">加载中...</div>
        <div v-else>
          <div class="grid grid-cols-5 gap-4">
            <div v-for="img in images" :key="img._key" class="relative group cursor-pointer" @click="toggle(img)">
              <img :src="img.imageUrl" :alt="img.imageName" class="w-full h-28 object-cover rounded-md border" :class="isSelected(img) ? 'border-blue-500 ring-2 ring-blue-500' : 'border-dark-border group-hover:border-blue-400'" />
              <div class="absolute bottom-1 left-1 right-1 text-[11px] truncate text-dark-text bg-black/30 px-1 rounded">{{ img.imageName }}</div>
              <div v-if="isSelected(img)" class="absolute top-1 right-1 bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              </div>
            </div>
          </div>
          <div v-if="images.length===0" class="text-center text-sm text-dark-text-secondary py-12">暂无图片</div>
        </div>
      </div>

      <!-- Footer -->
      <div class="p-4 border-t border-dark-border flex items-center justify-between">
        <div class="text-sm text-dark-text-secondary">已选 {{ selected.length }} / {{ maxSelect }}</div>
        <div class="flex items-center space-x-2">
          <button @click="toggleSelectAllCurrent" class="px-3 py-1 text-sm rounded border border-dark-border text-dark-text">
            {{ isAllCurrentSelected ? '取消全选' : '全选本页' }}
          </button>
          <button @click="prev" :disabled="page===1" class="px-3 py-1 text-sm rounded border border-dark-border text-dark-text disabled:opacity-50">&lt;</button>
          <span class="text-sm">{{ page }}</span>
          <button @click="next" :disabled="page>=totalPages" class="px-3 py-1 text-sm rounded border border-dark-border text-dark-text disabled:opacity-50">&gt;</button>
          <button @click="$emit('close')" class="px-4 py-2 border border-dark-border rounded-md text-dark-text-secondary hover:bg-dark-hover">取消</button>
          <button @click="confirm" :disabled="selected.length===0" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50">确定选择</button>
        </div>
      </div>
    </div>
  </div>

  <!-- 内嵌模式：直接渲染选择面板（用于父级弹窗 tabs 切换） -->
  <div v-else-if="inline" class="bg-dark-card border border-dark-border rounded-lg text-dark-text">
    <div class="p-3 border-b border-dark-border flex items-center justify-between">
      <div class="space-x-2">
        <button @click="switchTab(1)" :class="tabClass(1)" class="px-3 py-1 rounded-md text-sm">商品图库</button>
        <button @click="switchTab(2)" :class="tabClass(2)" class="px-3 py-1 rounded-md text-sm">素材图库</button>
        <button @click="switchTab(3)" :class="tabClass(3)" class="px-3 py-1 rounded-md text-sm">结果图库</button>
      </div>
      <div class="flex items-center space-x-2">
        <div class="relative">
          <input v-model="search" @keyup.enter="reload" type="text" placeholder="搜索图片名称" class="pl-9 pr-3 py-2 bg-dark-input border border-dark-border rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          <svg class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-dark-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        </div>
        <select v-if="activeType===1 || activeType===2" v-model="selectedCategoryId" @change="reload" class="px-3 py-2 bg-dark-input border border-dark-border rounded-md text-sm">
          <option value="">全部分类</option>
          <option v-for="c in categoryOptions" :key="c.value" :value="c.value">{{ c.label }}</option>
        </select>
      </div>
    </div>
    <div class="p-3 max-h-[50vh] overflow-y-auto">
      <div v-if="loading" class="text-sm text-dark-text-secondary">加载中...</div>
      <div v-else>
        <div class="grid grid-cols-5 gap-3">
          <div v-for="img in images" :key="img._key" class="relative group cursor-pointer" @click="toggle(img)">
            <img :src="img.imageUrl" :alt="img.imageName" class="w-full h-24 object-cover rounded-md border" :class="isSelected(img) ? 'border-blue-500 ring-2 ring-blue-500' : 'border-dark-border group-hover:border-blue-400'" />
            <div class="absolute bottom-1 left-1 right-1 text-[10px] truncate text-dark-text bg-black/30 px-1 rounded">{{ img.imageName }}</div>
            <div v-if="isSelected(img)" class="absolute top-1 right-1 bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
            </div>
          </div>
        </div>
        <div v-if="images.length===0" class="text-center text-sm text-dark-text-secondary py-10">暂无图片</div>
      </div>
    </div>
    <div class="p-3 border-t border-dark-border flex items-center justify-between">
      <div class="text-xs text-dark-text-secondary">已选 {{ selected.length }} / {{ maxSelect }}</div>
      <div class="flex items-center space-x-2">
        <button @click="toggleSelectAllCurrent" class="px-3 py-1 text-xs rounded border border-dark-border text-dark-text">{{ isAllCurrentSelected ? '取消全选' : '全选本页' }}</button>
        <button @click="prev" :disabled="page===1" class="px-3 py-1 text-xs rounded border border-dark-border text-dark-text disabled:opacity-50">&lt;</button>
        <span class="text-xs">{{ page }}/{{ totalPages }}</span>
        <button @click="next" :disabled="page>=totalPages" class="px-3 py-1 text-xs rounded border border-dark-border text-dark-text disabled:opacity-50">&gt;</button>
      </div>
    </div>
  </div>
  </template>

<script setup>
import { ref, watch, computed } from 'vue'
import { getGalleryImageList, getGalleryCategories, GalleryType } from '~/apis/business/gallery'

const props = defineProps({
  isOpen: { type: Boolean, default: false },
  maxSelect: { type: Number, default: 1000 },
  inline: { type: Boolean, default: false }
})
const emits = defineEmits(['close', 'confirm', 'change'])

const activeType = ref(GalleryType.PRODUCTS)
const search = ref('')
const page = ref(1)
const size = ref(20)
const total = ref(0)
const images = ref([])
const loading = ref(false)
const selected = ref([]) // array of items
const selectedCategoryId = ref('')
const categoryOptions = ref([])

const totalPages = computed(() => Math.max(1, Math.ceil((total.value || 0) / size.value)))

const reload = async () => {
  try {
    loading.value = true
    const res = await getGalleryImageList({ galleryType: activeType.value, page: page.value, limit: size.value, imageName: search.value, categoryId: selectedCategoryId.value || undefined })
    const list = res?.data?.imageList || res?.data?.list || []
    total.value = parseInt(res?.data?.total || list.length)
    images.value = list.map((it, idx) => ({
      _key: it.id || it.imageUrl || `${page.value}-${idx}`,
      imageName: it.imageName || it.name || '图片',
      imageUrl: it.imageUrl || it.url,
      createBy: it.createBy,
      createTime: it.createTime
    })).filter(it => it.imageUrl)
  } finally {
    loading.value = false
  }
}

const tabClass = (t) => activeType.value === t ? 'bg-blue-600 text-white' : 'bg-dark-input text-dark-text-secondary'
const loadCategories = async () => {
  try {
    if (activeType.value === GalleryType.PRODUCTS || activeType.value === GalleryType.MATERIALS) {
      const res = await getGalleryCategories({ galleryType: activeType.value })
      const tree = res?.data?.categoryList || []
      const flat = []
      const dfs = (arr, prefix='') => {
        arr.forEach(n => {
          flat.push({ value: n.categoryId, label: prefix ? `${prefix}/${n.categoryName}` : n.categoryName })
          if (n.categoryList && n.categoryList.length) dfs(n.categoryList, prefix ? `${prefix}/${n.categoryName}` : n.categoryName)
        })
      }
      dfs(tree)
      categoryOptions.value = flat
    } else {
      categoryOptions.value = []
      selectedCategoryId.value = ''
    }
  } catch (e) {
    categoryOptions.value = []
  }
}
const switchTab = async (t) => { if (activeType.value !== t) { activeType.value = t; page.value = 1; selectedCategoryId.value=''; await loadCategories(); await reload() } }

const isSelected = (img) => selected.value.some(s => s.imageUrl === img.imageUrl)
const toggle = (img) => {
  const idx = selected.value.findIndex(s => s.imageUrl === img.imageUrl)
  if (idx > -1) selected.value.splice(idx, 1)
  else if (selected.value.length < props.maxSelect) selected.value.push(img)
}

const isAllCurrentSelected = computed(() => images.value.length > 0 && images.value.every(it => isSelected(it)))
const toggleSelectAllCurrent = () => {
  if (isAllCurrentSelected.value) {
    // 取消当前页全选
    images.value.forEach(it => {
      const idx = selected.value.findIndex(s => s.imageUrl === it.imageUrl)
      if (idx > -1) selected.value.splice(idx, 1)
    })
  } else {
    // 全选当前页
    images.value.forEach(it => {
      if (!isSelected(it) && selected.value.length < props.maxSelect) {
        selected.value.push(it)
      }
    })
  }
}

const prev = async () => { if (page.value > 1) { page.value--; await reload() } }
const next = async () => { if (page.value < totalPages.value) { page.value++; await reload() } }

const confirm = () => { emits('confirm', [...selected.value]) }

watch(() => props.isOpen, async (v) => { if (v) { selected.value = []; page.value = 1; await loadCategories(); await reload() } })
watch(() => activeType.value, async () => { await loadCategories() })
watch(selected, (val) => { emits('change', [...val]) }, { deep: true })
</script>

<style scoped>
</style>

