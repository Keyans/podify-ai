/**
 * ZIP文件处理工具类
 * 用于解压ZIP文件并提取图片
 */
import JSZip from 'jszip'

/**
 * 解压ZIP文件并获取图片文件
 * @param {File} zipFile ZIP文件对象
 * @param {Object} options 选项
 * @returns {Promise<Array>} 返回图片文件数组
 */
export const extractImagesFromZip = async (zipFile, options = {}) => {
  const {
    maxFiles = 100,
    allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
    maxFileSize = 10 * 1024 * 1024, // 10MB
    onProgress = null
  } = options

  try {
    console.log('📦 开始解压ZIP文件:', zipFile.name)
    
    // 读取ZIP文件
    const zip = new JSZip()
    const zipData = await zip.loadAsync(zipFile)
    
    const imageFiles = []
    const entries = Object.keys(zipData.files)
    let processedCount = 0
    
    console.log(`📂 ZIP文件包含 ${entries.length} 个条目`)
    
    for (const filename of entries) {
      const file = zipData.files[filename]
      
      // 跳过文件夹
      if (file.dir) {
        processedCount++
        if (onProgress) {
          onProgress({
            current: processedCount,
            total: entries.length,
            percent: Math.round((processedCount / entries.length) * 100)
          })
        }
        continue
      }
      
      // 检查是否为图片文件（根据扩展名）
      const ext = filename.split('.').pop()?.toLowerCase()
      const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)
      
      if (!isImage) {
        console.log(`⏭️ 跳过非图片文件: ${filename}`)
        processedCount++
        if (onProgress) {
          onProgress({
            current: processedCount,
            total: entries.length,
            percent: Math.round((processedCount / entries.length) * 100)
          })
        }
        continue
      }
      
      // 检查文件数量限制
      if (imageFiles.length >= maxFiles) {
        console.warn(`⚠️ 已达到最大文件数量限制 (${maxFiles})`)
        break
      }
      
      try {
        // 提取文件内容
        const fileContent = await file.async('blob')
        
        // 检查文件大小
        if (fileContent.size > maxFileSize) {
          console.warn(`⚠️ 文件过大，跳过: ${filename} (${formatFileSize(fileContent.size)})`)
          continue
        }
        
        // 根据扩展名确定MIME类型
        const mimeType = getMimeTypeFromExtension(ext)
        
        // 创建File对象
        const imageFile = new File([fileContent], filename, {
          type: mimeType,
          lastModified: Date.now()
        })
        
        console.log(`✅ 提取图片: ${filename} (${formatFileSize(imageFile.size)})`)
        imageFiles.push(imageFile)
        
      } catch (error) {
        console.error(`❌ 提取文件失败 ${filename}:`, error)
      }
      
      processedCount++
      if (onProgress) {
        onProgress({
          current: processedCount,
          total: entries.length,
          percent: Math.round((processedCount / entries.length) * 100)
        })
      }
    }
    
    console.log(`📦 ZIP解压完成，提取到 ${imageFiles.length} 个图片文件`)
    
    return {
      success: true,
      files: imageFiles,
      total: imageFiles.length,
      message: `成功提取 ${imageFiles.length} 个图片文件`
    }
    
  } catch (error) {
    console.error('❌ ZIP解压失败:', error)
    return {
      success: false,
      files: [],
      total: 0,
      error: error.message || 'ZIP文件解压失败'
    }
  }
}

/**
 * 根据文件扩展名获取MIME类型
 * @param {string} extension 文件扩展名
 * @returns {string} MIME类型
 */
const getMimeTypeFromExtension = (extension) => {
  const mimeMap = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'webp': 'image/webp'
  }
  
  return mimeMap[extension.toLowerCase()] || 'image/jpeg'
}

/**
 * 格式化文件大小
 * @param {number} bytes 字节数
 * @returns {string} 格式化后的大小
 */
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

/**
 * 验证ZIP文件
 * @param {File} file 文件对象
 * @returns {string|null} 错误信息或null
 */
export const validateZipFile = (file) => {
  // 检查文件类型
  if (!file.type.includes('zip') && !file.name.toLowerCase().endsWith('.zip')) {
    return '请选择ZIP格式的文件'
  }
  
  // 检查文件大小 (最大100MB)
  const maxZipSize = 100 * 1024 * 1024
  if (file.size > maxZipSize) {
    return `ZIP文件大小不能超过 ${formatFileSize(maxZipSize)}`
  }
  
  return null
}

export default {
  extractImagesFromZip,
  validateZipFile,
  formatFileSize
} 