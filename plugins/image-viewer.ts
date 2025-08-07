export default defineNuxtPlugin(() => {
  // 图片查看器状态
  const imageViewer = reactive({
    isVisible: false,
    currentImage: '',
    currentAlt: '',
    images: [] as string[],
    currentIndex: 0
  })

  // 显示图片
  const showImage = (src: string, alt: string = '', images: string[] = []) => {
    imageViewer.currentImage = src
    imageViewer.currentAlt = alt
    imageViewer.images = images.length ? images : [src]
    imageViewer.currentIndex = images.findIndex(img => img === src) || 0
    imageViewer.isVisible = true
    
    // 防止背景滚动
    document.body.style.overflow = 'hidden'
  }

  // 隐藏图片
  const hideImage = () => {
    imageViewer.isVisible = false
    document.body.style.overflow = ''
  }

  // 上一张图片
  const previousImage = () => {
    if (imageViewer.images.length > 1) {
      imageViewer.currentIndex = (imageViewer.currentIndex - 1 + imageViewer.images.length) % imageViewer.images.length
      imageViewer.currentImage = imageViewer.images[imageViewer.currentIndex]
    }
  }

  // 下一张图片
  const nextImage = () => {
    if (imageViewer.images.length > 1) {
      imageViewer.currentIndex = (imageViewer.currentIndex + 1) % imageViewer.images.length
      imageViewer.currentImage = imageViewer.images[imageViewer.currentIndex]
    }
  }

  // 键盘事件处理
  const handleKeydown = (event: KeyboardEvent) => {
    if (!imageViewer.isVisible) return
    
    switch (event.key) {
      case 'Escape':
        hideImage()
        break
      case 'ArrowLeft':
        previousImage()
        break
      case 'ArrowRight':
        nextImage()
        break
    }
  }

  // 自动检测页面中的图片并添加点击事件
  const initImageViewer = () => {
    // 等待DOM更新后执行
    nextTick(() => {
      const images = document.querySelectorAll('img[data-zoomable], .zoom-image, [data-image-viewer]')
      
      images.forEach((img: HTMLImageElement) => {
        // 避免重复绑定
        if (img.classList.contains('image-viewer-bound')) return
        
        img.classList.add('image-viewer-bound')
        img.style.cursor = 'zoom-in'
        
        img.addEventListener('click', (e) => {
          e.preventDefault()
          e.stopPropagation()
          
          // 收集同组图片
          const container = img.closest('[data-image-group]') || document
          const groupImages = Array.from(container.querySelectorAll('img[data-zoomable], .zoom-image, [data-image-viewer]'))
            .map((groupImg: HTMLImageElement) => groupImg.src)
          
          showImage(img.src, img.alt, groupImages)
        })
      })
    })
  }

  // 监听路由变化，重新初始化
  if (process.client) {
    // 键盘事件监听
    document.addEventListener('keydown', handleKeydown)
    
    // 页面加载完成后初始化
    window.addEventListener('load', initImageViewer)
    
    // 监听DOM变化（适用于动态加载的图片）
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) { // Element node
              const element = node as Element
              // 检查新添加的元素是否包含可放大的图片
              if (element.matches('img[data-zoomable], .zoom-image, [data-image-viewer]') ||
                  element.querySelector('img[data-zoomable], .zoom-image, [data-image-viewer]')) {
                setTimeout(initImageViewer, 100)
              }
            }
          })
        }
      })
    })
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    })
  }

  // 提供全局访问
  return {
    provide: {
      imageViewer: {
        state: readonly(imageViewer),
        showImage,
        hideImage,
        previousImage,
        nextImage,
        initImageViewer
      }
    }
  }
})