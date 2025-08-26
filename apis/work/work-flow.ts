import { get, post } from '../index'
import { buildApiPath } from '../apiConfig'
import type { ApiResponse } from '../apiConfig'

// 标题生成统计数据类型
export interface TitleGenerationStatsData {
  count: string                // 总生成数
  successCount: string         // 成功数量
  failedCount: string          // 失败数量
  successRate: number          // 成功率
  inProgressCount: string      // 进行中数量
  todayCount: string           // 今日生成数
}

// 任务列表查询参数
export interface TaskListParams {
  taskId?: string              // 任务Id
  status?: number              // 状态
  startTime?: string           // 开始时间
  endTime?: string             // 结束时间
  userId?: string              // 用户Id
  page?: number                // 页码
  limit?: number               // 分页数
  taskNo?: string              // 任务编号
  operator?: string            // 操作员
}

// 商品信息类型
export interface ProductInfo {
  id: string                   // 商品ID
  name: string                 // 商品名称
  image: string                // 商品图片
  category: string             // 商品分类
  description?: string         // 商品描述
}

// 创建标题生成任务参数
export interface CreateTitleTaskParams {
  generatorRule: string               // 生成规律设置（用户输入的要求）
  podProductIdList: string[]      // 选择的商品列表
}

// 获取工作流生成统计数据
export const getWorkFlowTotalTasl = async (): Promise<ApiResponse<TitleGenerationStatsData>> => {
  const url = buildApiPath('/workflow/totalTask')
  return get(url)
}

// 获取工作流任务列表
export const getWorkFlowTaskList = async (params: TaskListParams): Promise<ApiResponse<any>> => {
  const url = buildApiPath('/workflow/getTaskList')
  return get(url, params)
}

// 获取工作流模版列表
export const getWorkFlowTemplateList = async (params: TaskListParams): Promise<ApiResponse<any>> => {
  const url = buildApiPath('/workflow/getTemplateList')
  return get(url, params)
}

// 获取工作流任务信息
export const getWorkFlowTemplateDetail= async (taskId: string): Promise<ApiResponse<any>> => {
  const url = buildApiPath(`/workflow/getTemplate/${taskId}`)
  return get(url)
}

// 获取工作流任务信息
export const getWorkFlowTaskDetail = async (taskId: string): Promise<ApiResponse<any>> => {
  const url = buildApiPath(`/workflow/getTask/${taskId}`)
  return get(url)
}

// 创建工作流模版任务
export const createWorkFlowTemplate= async (params: CreateTitleTaskParams): Promise<ApiResponse<any>> => {
  const url = buildApiPath('/workflow/addTemplate')
  return post(url, params)
}

// 修改工作流模版任务
export const updateWorkFlowTemplate= async (params: CreateTitleTaskParams): Promise<ApiResponse<any>> => {
  const url = buildApiPath('/workflow/updateTemplate')
  return post(url, params)
}

// 创建工作流模版任务
export const createWorkFlowTask= async (params: CreateTitleTaskParams): Promise<ApiResponse<any>> => {
  const url = buildApiPath('/workflow/addTask')
  return post(url, params)
}

// 修改工作流状态
export const updateWorkTaskStatus= async (params: CreateTitleTaskParams): Promise<ApiResponse<any>> => {
  const url = buildApiPath('/workflow/updateTaskStatus')
  return post(url, params)
}

// 删除工作流状态
export const deleteWorkFlowTask= async (params: CreateTitleTaskParams): Promise<ApiResponse<any>> => {
  const url = buildApiPath('/workflow/deleteTask')
  return post(url, params)
}

export default {
  getWorkFlowTotalTasl,
  getWorkFlowTaskList,
  getWorkFlowTemplateList,
  getWorkFlowTemplateDetail,
  getWorkFlowTaskDetail,
  createWorkFlowTemplate,
  updateWorkFlowTemplate,
  createWorkFlowTask,
  updateWorkTaskStatus,
  deleteWorkFlowTask
} 