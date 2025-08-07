// 图片预加载和缓存工具类
class ImagePreloader {
  constructor() {
    this.cache = new Map() // 图片缓存
    this.loading = new Set() // 正在加载的图片
    this.preloadQueue = [] // 预加载队列
    this.maxCacheSize = 100 // 最大缓存数量
    this.maxConcurrent = 6 // 最大并发加载数
    this.currentLoading = 0
  }

  // 预加载图片
  async preloadImage(url, priority = 'normal') {
    if (!url) {
      console.log(`⚠️ [ImagePreloader] URL为空，跳过预加载`)
      return Promise.resolve(url)
    }

    if (this.cache.has(url)) {
      console.log(`✅ [ImagePreloader] 图片已缓存，直接返回: ${url}`)
      return Promise.resolve(url)
    }

    if (this.loading.has(url)) {
      console.log(`🔄 [ImagePreloader] 图片正在加载中，等待完成: ${url}`)
      // 如果已在加载中，返回现有的Promise
      return new Promise((resolve) => {
        const checkLoaded = () => {
          if (this.cache.has(url)) {
            console.log(`✅ [ImagePreloader] 等待中的图片加载完成: ${url}`)
            resolve(url)
          } else {
            setTimeout(checkLoaded, 50)
          }
        }
        checkLoaded()
      })
    }

    console.log(`📥 [ImagePreloader] 开始预加载图片 (${priority}): ${url}`)

    return new Promise((resolve, reject) => {
      const task = { url, priority, resolve, reject }
      
      if (priority === 'high') {
        this.preloadQueue.unshift(task)
      } else {
        this.preloadQueue.push(task)
      }
      
      this.processQueue()
    })
  }

  // 处理预加载队列
  async processQueue() {
    if (this.currentLoading >= this.maxConcurrent || this.preloadQueue.length === 0) {
      return
    }

    const task = this.preloadQueue.shift()
    this.currentLoading++
    this.loading.add(task.url)

    try {
      const img = new Image()
      
      img.onload = () => {
        console.log(`✅ [ImagePreloader] 图片下载成功，已缓存: ${task.url}`)
        this.cacheImage(task.url, img)
        this.loading.delete(task.url)
        this.currentLoading--
        task.resolve(task.url)
        this.processQueue() // 处理下一个任务
      }

      img.onerror = () => {
        console.error(`❌ [ImagePreloader] 图片下载失败: ${task.url}`)
        this.loading.delete(task.url)
        this.currentLoading--
        task.reject(new Error(`Failed to load image: ${task.url}`))
        this.processQueue() // 处理下一个任务
      }

      // 添加缓存头优化
      img.crossOrigin = 'anonymous'
      img.src = task.url
      
    } catch (error) {
      this.loading.delete(task.url)
      this.currentLoading--
      task.reject(error)
      this.processQueue()
    }
  }

  // 缓存图片
  cacheImage(url, img) {
    // 如果缓存已满，删除最旧的条目
    if (this.cache.size >= this.maxCacheSize) {
      const firstKey = this.cache.keys().next().value
      console.log(`🗑️ [ImagePreloader] 缓存已满，删除最旧图片: ${firstKey}`)
      this.cache.delete(firstKey)
    }
    
    this.cache.set(url, {
      img,
      timestamp: Date.now(),
      url
    })
    
    console.log(`💾 [ImagePreloader] 图片已缓存 (${this.cache.size}/${this.maxCacheSize}): ${url}`)
  }

  // 获取缓存的图片
  getCachedImage(url) {
    return this.cache.get(url)
  }

  // 检查图片是否已缓存
  isCached(url) {
    return this.cache.has(url)
  }

  // 批量预加载图片
  async preloadBatch(urls, priority = 'normal') {
    console.log(`📦 [ImagePreloader] 开始批量预加载 ${urls.length} 张图片 (${priority})`)
    const promises = urls.map(url => this.preloadImage(url, priority))
    const results = await Promise.allSettled(promises)
    
    const successful = results.filter(r => r.status === 'fulfilled').length
    const failed = results.filter(r => r.status === 'rejected').length
    
    console.log(`📦 [ImagePreloader] 批量预加载完成: 成功 ${successful}/${urls.length}, 失败 ${failed}`)
    
    return results
  }

  // 清理过期缓存
  cleanExpiredCache(maxAge = 30 * 60 * 1000) { // 30分钟过期
    const now = Date.now()
    for (const [url, data] of this.cache.entries()) {
      if (now - data.timestamp > maxAge) {
        this.cache.delete(url)
      }
    }
  }

  // 获取缓存统计
  getStats() {
    return {
      cacheSize: this.cache.size,
      loadingCount: this.loading.size,
      queueLength: this.preloadQueue.length,
      currentLoading: this.currentLoading
    }
  }
}

// 创建全局实例
const imagePreloader = new ImagePreloader()

// 定期清理过期缓存
setInterval(() => {
  imagePreloader.cleanExpiredCache()
}, 5 * 60 * 1000) // 每5分钟清理一次

export default imagePreloader