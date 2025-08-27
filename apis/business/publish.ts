import { get, post } from '../index'
import { buildApiPath,ServicePrefix } from '../apiConfig'
import type { ApiResponse } from '../apiConfig'

// 模板管理相关接口
export interface TemplatePageListParams {
  pageNum: number
  pageSize: number
  orderBy?: string
  orderDirection?: string
  tenantId?: string
  name?: string
  platformId?: number
  storeId?: number
  categoryId?: number
}

export interface TemplateItem {
  id: string
  templateName: string
  platformName: string
  usageCount: number
  status: number
  creator: string
  createTime: string
}

export interface TemplatePageListResponse {
  records: TemplateItem[]
  total: number
  size: number
  current: number
  pages: number
}

// 模版DTO对象
export interface TemplateDTO {
  id: number
  name: string
  platformId: number
  storeId: number
  categoryId: number
  baseTemplateId: number
  platformFields: {
    key: Record<string, any>
  }
  categoryFields: {
    key: Record<string, any>
  }
}

// 获取模板分页列表
export const getTemplatePageList = async (params: TemplatePageListParams): Promise<ApiResponse<TemplatePageListResponse>> => {
  const url = buildApiPath('/template/getTemplatePageList',ServicePrefix.PUBLISH_GOODS)
  return get(url, params)
}

// 创建模板
export const createTemplate = async (data: TemplateDTO): Promise<ApiResponse<any>> => {
  const url = buildApiPath('/template/create', ServicePrefix.PUBLISH_GOODS)
  return post(url, data)
}
// 获取刊登任务统计信息
export const getTaskStatistics = async (): Promise<ApiResponse<any>> => {
  const url = buildApiPath('/bulk/publisher/getTaskStatistics')
  return get(url)
}
// 获取刊登任务列表
export const getTaskPageList = async (params: any): Promise<ApiResponse<any>> => {
  const url = buildApiPath('/bulk/publisher/getTaskPageList')
  return get(url, params)
}
// 获取刊登任务详情
export const getpublisherPageDetail = async (taskId:string): Promise<ApiResponse<any>> => {
  const url = buildApiPath(`/bulk/publisher/getTask/${taskId}`)
  return get(url)
}

// 获取刊登任务详情
export const createTask = async (params: any): Promise<ApiResponse<any>> => {
  const url = buildApiPath('/bulk/publisher/createTask')
  return post(url, params)
}

// 获取启用的平台列表
export const getEnabledPlatforms = async (): Promise<ApiResponse<any>> => {
  const url = buildApiPath('/api/platforms/enabled',ServicePrefix.PUBLISH_GOODS)
  return get(url)
}

// 获取平台店铺列表
export const getStorePageList = async (params: any): Promise<ApiResponse<any>> => {
  const url = buildApiPath('/store/authorization/getStorePageList', ServicePrefix.PUBLISH_GOODS)
  return get(url, params)
}

// 根据平台和店铺获取模版列表
export const getTemplatesByPlatformAndStore = async (params: any): Promise<ApiResponse<any>> => {
  const url = buildApiPath('/template/getTemplatesByPlatformAndStore', ServicePrefix.PUBLISH_GOODS)
  return get(url, params)
}
