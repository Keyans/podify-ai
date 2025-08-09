import { defineStore } from 'pinia'
import { getPlatformList } from '~/apis/business/store'

export const usePlatformStore = defineStore('platform', {
  state: () => ({
    // 平台列表数据（完整的API数据）
    platforms: [],
    // 平台选项（用于下拉框）
    platformOptions: [],
    // 加载状态
    loading: false,
    // 是否已加载
    loaded: false,
    // 错误信息
    error: null
  }),

  getters: {
    // 启用的平台列表
    enabledPlatforms: (state) => state.platforms.filter(p => p.enabled),
    
    // 获取平台选项（code -> name映射）
    getPlatformOptions: (state) => {
      return state.platformOptions
    },
    
    // 用于左侧概览的平台列表
    getPlatformList: (state) => {
      const platforms = [
        { key: 'all', code: 'all', name: '全部平台', count: 0, color: 'bg-gray-500' }
      ]
      
      // 确保platforms是数组
      const platformList = Array.isArray(state.platforms) ? state.platforms : []
      
      platformList.forEach(platform => {
        if (platform && platform.enabled) {
          platforms.push({
            key: platform.code.toLowerCase(),
            code: platform.code,
            name: platform.name,
            count: 0, // 这个会在组件中动态更新
            color: getPlatformColor(platform.code)
          })
        }
      })
      
      return platforms
    },
    
    // 根据code获取平台信息
    getPlatformByCode: (state) => (code) => {
      return state.platforms.find(p => p.code === code)
    }
  },

  actions: {
    // 加载平台列表
    async loadPlatforms() {
      // 如果已经加载过且成功，直接返回
      if (this.loaded && this.platforms.length > 0) {
        return
      }
      
      this.loading = true
      this.error = null
      
      try {
        console.log('Store: 开始加载平台列表...')
        const response = await getPlatformList()
        console.log('Store: 平台列表API响应:', response)
        
        if (response && response.success && response.data && Array.isArray(response.data)) {
          this.platforms = response.data
          
          // 生成平台选项
          this.platformOptions = response.data
            .filter(platform => platform.enabled)
            .map(platform => ({
              value: platform.code,
              label: platform.name
            }))
          
          this.loaded = true
          console.log('Store: 平台数据加载成功:', this.platforms)
          console.log('Store: 平台选项生成:', this.platformOptions)
        } else {
          throw new Error('平台数据格式无效')
        }
      } catch (error) {
        console.error('Store: 加载平台列表失败:', error)
        this.error = error.message
        
        // 设置默认数据
        this.platforms = [
          {
            id: '1',
            code: 'TEMU',
            name: 'TEMU',
            description: 'TEMU电商平台',
            logo: null,
            enabled: true,
            createTime: '2025-08-07 16:02:57',
            updateTime: '2025-08-07 16:02:57',
            categories: null
          }
        ]
        
        this.platformOptions = [
          { value: 'TEMU', label: 'TEMU' }
        ]
        
        this.loaded = true
      } finally {
        this.loading = false
      }
    },
    
    // 强制重新加载
    async reloadPlatforms() {
      this.loaded = false
      this.platforms = []
      this.platformOptions = []
      await this.loadPlatforms()
    }
  }
})

// 平台颜色映射
function getPlatformColor(code) {
  const colors = {
    'TEMU': 'bg-blue-500',
    'AMAZON': 'bg-orange-500',
    'TIKTOK': 'bg-gray-800',
    'SHOPIFY': 'bg-green-500',
    'ALIEXPRESS': 'bg-red-500',
    'SHEIN': 'bg-purple-500'
  }
  return colors[code] || 'bg-gray-400'
}