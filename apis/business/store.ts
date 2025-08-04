import { get, post, put, del } from '../index'
import { buildApiPath } from '../apiConfig'
import type { ApiResponse } from '../apiConfig'

// 店铺模块API路径配置（相对路径，不包含前缀）
const storeApiPaths = {
  list: '/store/list',
  add: '/store/add',
  detail: '/store/detail',
  update: '/store/update',
  delete: '/store/delete',
  stats: '/store/stats',
  platforms: '/store/platforms',
  types: '/store/types'
}

// 构建完整路径的辅助方法
const getPath = (path: keyof typeof storeApiPaths) => buildApiPath(storeApiPaths[path])

// 店铺信息接口
export interface StoreInfo {
  id: string
  storeId: string // 店铺ID
  storeName: string // 店铺名称
  storeType: string // 店铺类型
  platform: string // 所属平台
  platformType: number // 平台类型编号
  authStatus: 'authorized' | 'unauthorized' | 'expired' | 'pending' // 授权状态
  authKey: string // 授权秘钥
  authTime?: string // 授权时间
  expireTime?: string // 到期时间
  creator: string // 创建人
  createTime: string // 创建时间
  updateTime?: string // 更新时间
  status: 'active' | 'inactive' // 状态
}

// 店铺列表查询参数
export interface StoreListParams {
  page?: number
  limit?: number
  platform?: string
  storeType?: string
  authStatus?: string
  keyword?: string
}

// 店铺列表响应数据
export interface StoreListData {
  current: number
  size: number
  pages: number
  total: number
  storeList: StoreInfo[]
}

// 店铺统计数据
export interface StoreStatsData {
  totalStores: number // 总店铺数
  activeStores: number // 活跃店铺
  temuStores: number // Temu店铺
  authorizedStores: number // 已授权
  unauthorizedStores: number // 未授权
}

// 添加店铺参数
export interface AddStoreParams {
  platform: string // 所属平台
  storeType: string // 店铺类型
  authKey: string // 授权秘钥
}

// 更新店铺参数
export interface UpdateStoreParams {
  id: string
  authKey?: string // 授权秘钥
  authTime?: string // 授权时间
  expireTime?: string // 到期时间
}

// 平台选项
export interface PlatformOption {
  value: string
  label: string
}

// 店铺类型选项
export interface StoreTypeOption {
  value: string
  label: string
}

// 获取店铺列表
export const getStoreList = async (params?: StoreListParams): Promise<ApiResponse<StoreListData>> => {
  try {
    const data = await get(getPath('list'), params)
    return data
  } catch (error) {
    console.error('获取店铺列表失败:', error)
    throw error
  }
}

// 获取店铺统计数据
export const getStoreStats = async (): Promise<ApiResponse<StoreStatsData>> => {
  try {
    const data = await get(getPath('stats'))
    return data
  } catch (error) {
    console.error('获取店铺统计数据失败:', error)
    throw error
  }
}

// 添加店铺
export const addStore = async (params: AddStoreParams): Promise<ApiResponse<any>> => {
  try {
    const data = await post(getPath('add'), params)
    return data
  } catch (error) {
    console.error('添加店铺失败:', error)
    throw error
  }
}

// 获取店铺详情
export const getStoreDetail = async (id: string): Promise<ApiResponse<StoreInfo>> => {
  try {
    const data = await get(`${getPath('detail')}/${id}`)
    return data
  } catch (error) {
    console.error('获取店铺详情失败:', error)
    throw error
  }
}

// 更新店铺
export const updateStore = async (params: UpdateStoreParams): Promise<ApiResponse<any>> => {
  try {
    const data = await put(getPath('update'), params)
    return data
  } catch (error) {
    console.error('更新店铺失败:', error)
    throw error
  }
}

// 删除店铺
export const deleteStore = async (id: string): Promise<ApiResponse<any>> => {
  try {
    const data = await del(`${getPath('delete')}/${id}`)
    return data
  } catch (error) {
    console.error('删除店铺失败:', error)
    throw error
  }
}

// 获取平台选项
export const getPlatformOptions = async (): Promise<ApiResponse<PlatformOption[]>> => {
  try {
    const data = await get(getPath('platforms'))
    return data
  } catch (error) {
    console.error('获取平台选项失败:', error)
    throw error
  }
}

// 获取店铺类型选项
export const getStoreTypeOptions = async (): Promise<ApiResponse<StoreTypeOption[]>> => {
  try {
    const data = await get(getPath('types'))
    return data
  } catch (error) {
    console.error('获取店铺类型选项失败:', error)
    throw error
  }
}

export default {
  getStoreList,
  getStoreStats,
  addStore,
  getStoreDetail,
  updateStore,
  deleteStore,
  getPlatformOptions,
  getStoreTypeOptions
} 