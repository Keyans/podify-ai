import { get, post, del } from '../index'
import { buildApiPath } from '../apiConfig'
import type { ApiResponse } from '../apiConfig'

// 产品模块API路径配置（相对路径，不包含前缀）
const productApiPaths = {
  list: '/product/list',
  detail: '/product/detail',
  successList: '/product/collector/getSuccessList'
}

// 构建完整路径的辅助方法
const getPath = (path: keyof typeof productApiPaths) => buildApiPath(productApiPaths[path])

// 商品列表查询参数
export interface ProductListParams {
  page?: number
  limit?: number
  minPrice?: number
  maxPrice?: number
  platform?: number
  categoryId?: string
  userId?: string
  title?: string
}

// 商品信息
export interface ProductInfo {
  id: string
  image: string
  title: string
  platform: number
  categoryId: number
  price: string
  status: number
  url: string
}

// 商品列表响应数据
export interface ProductListData {
  current: string
  size: string
  pages: string
  total: string
  productList: ProductInfo[]
}

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

// 获取商品采集成功列表
export const getProductSuccessList = async (params: ProductListParams): Promise<ApiResponse<ProductListData>> => {
  try {
    const data = await get(getPath('successList'), params)
    return data
  } catch (error) {
    console.error('获取商品采集成功列表失败:', error)
    throw error
  }
}

export default {
  getProductList,
  getProductDetail,
  getProductSuccessList
} 