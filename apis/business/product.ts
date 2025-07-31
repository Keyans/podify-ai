import { get, post, del } from '../index'
import { buildApiPath } from '../apiConfig'

// 产品模块API路径配置（相对路径，不包含前缀）
const productApiPaths = {
  list: '/product/list',
  detail: '/product/detail'
}

// 构建完整路径的辅助方法
const getPath = (path: keyof typeof productApiPaths) => buildApiPath(productApiPaths[path])

// 获取产品列表
export const getProductList = async (params?: any) => {
  try {
    const data = await get(getPath('list'), params)
    return data
  } catch (error) {
    console.error('获取产品列表失败:', error)
    throw error
  }
}

// 获取产品详情
export const getProductDetail = async (id: string) => {
  try {
    const data = await get(`${getPath('detail')}/${id}`)
    return data
  } catch (error) {
    console.error('获取产品详情失败:', error)
    throw error
  }
}

export default {
  getProductList,
  getProductDetail
} 