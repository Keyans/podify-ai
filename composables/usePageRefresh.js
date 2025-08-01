import { onMounted, onBeforeUnmount } from 'vue'

// 页面强制刷新组合式函数
export function usePageRefresh(refreshCallback, pagePath = null) {
  // 页面强制刷新监听器
  const handleForceRefresh = (event) => {
    const targetPath = pagePath || (typeof window !== 'undefined' ? window.location.pathname : null)
    
    if (event.detail?.path === targetPath) {
      console.log('页面强制刷新:', targetPath)
      // 执行刷新回调
      if (typeof refreshCallback === 'function') {
        refreshCallback()
      }
    }
  }

  onMounted(() => {
    // 监听页面强制刷新事件
    if (typeof window !== 'undefined') {
      window.addEventListener('page-force-refresh', handleForceRefresh)
    }
  })

  onBeforeUnmount(() => {
    // 清理事件监听
    if (typeof window !== 'undefined') {
      window.removeEventListener('page-force-refresh', handleForceRefresh)
    }
  })

  return {
    handleForceRefresh
  }
}

// 创建页面刷新处理器的工厂函数
export function createPageRefreshHandler(fetchFunctions = []) {
  return () => {
    Promise.all(fetchFunctions.map(fn => typeof fn === 'function' ? fn() : Promise.resolve()))
      .catch(error => {
        console.error('强制刷新数据加载失败:', error)
      })
  }
}

/**
 * 防抖函数
 * @param {Function} func - 要防抖的函数
 * @param {number} wait - 等待时间（毫秒）
 */
export function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
} 