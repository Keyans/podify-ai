import { get, post } from '../index'
import { buildApiPath } from '../apiConfig'

// POD合成统计数据类型
export interface PodComposerStatsData {
  totalCount: number      // 总合成数
  successRate: number     // 成功率
  inProgressCount: number // 进行中
  todayCount: number      // 今日合成
}

// POD合成任务列表参数
export interface PodComposerTaskListParams {
  page?: number
  limit?: number
  taskId?: string
  status?: number
  startTime?: string
  endTime?: string
  userId?: string
}

// POD合成任务详情参数
export interface PodComposerTaskDetailParams {
  taskId: string
  page?: number
  limit?: number
}

// API响应类型
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  code?: number
}

// 获取POD合成统计数据
export const getPodComposerStats = async (): Promise<ApiResponse<PodComposerStatsData>> => {
  const url = buildApiPath('/pod/composer/total')
  return get(url)
}

// 获取POD合成任务列表
export const getPodComposerTaskList = async (params?: PodComposerTaskListParams): Promise<ApiResponse<any>> => {
  const url = buildApiPath('/pod/composer/getTaskList')
  return get(url, params)
}

// 获取POD合成任务详情列表
export const getPodComposerTaskDetail = async (params: PodComposerTaskDetailParams): Promise<ApiResponse<any>> => {
  const url = buildApiPath('/pod/composer/getTaskDetail')
  return get(url, params)
}

// 创建POD合成任务
export const createPodComposerTask = async (data: any): Promise<ApiResponse<any>> => {
  const url = buildApiPath('/pod/composer/create')
  return post(url, data)
}