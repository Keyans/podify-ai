import { get } from '../index'
import { buildApiPath } from '../apiConfig'

export interface ProductListQuery {
  page: number
  limit: number
  categoryId?: string | number
  title?: string
  minPrice?: string | number
  maxPrice?: string | number
  userId?: string | number
}

// 获取POD商品列表（官方/自有均复用该接口，是否带 userId 决定查询范围）
export const getPodProductList = async (query: ProductListQuery) => {
  const url = buildApiPath('/pod/product/getList')
  return get(url, query)
}

// 获取POD商品详情
export const getPodProductDetail= async (id: string | number) => {
  const url = buildApiPath(`/pod/product/getPodProduct${id}`)
  return get(url)
}


// 获取POD商品统计
export const getPodProductTotal = async (query: ProductListQuery) => {
  const url = buildApiPath('/pod/product/total')
  return get(url, query)
}


export default {
  getPodProductList,
  getPodProductDetail,
  getPodProductTotal
}

