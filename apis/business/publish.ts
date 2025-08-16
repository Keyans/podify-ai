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