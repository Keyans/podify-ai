import { get } from '../index'
import { buildApiPath } from '../apiConfig'

export interface WhiteListQuery {
  page: number
  limit: number
  categoryId?: string | number
  title?: string
  minPrice?: string | number
  maxPrice?: string | number
  userId?: string | number
}

// 获取白品列表（官方/自有均复用该接口，是否带 userId 决定查询范围）
export const getWhiteProductList = async (query: WhiteListQuery) => {
  const url = buildApiPath('/white/product/getOfficialList')
  return get(url, query)
}

// 获取官方白品详情
export const getWhiteProductDetail = async (id: string | number) => {
  const url = buildApiPath(`/white/product/getWhiteProduct/${id}`)
  return get(url)
}

export const getOfficialCategoryAll = async (query: WhiteListQuery) => {
  const url = buildApiPath('/white/product/getOfficialCategoryAll')
  return get(url, query)
}

// 获取白品列表（官方/自有均复用该接口，是否带 userId 决定查询范围）
export const getProductList = async (query: WhiteListQuery) => {
  const url = buildApiPath('/white/product/getList')
  return get(url, query)
}


export default {
  getWhiteProductList,
  getWhiteProductDetail,
  getOfficialCategoryAll,
  getProductList
}

