import { get, post } from '../index'
import { buildApiPath, ServicePrefix } from '../apiConfig'
import { getAuthHeaders } from '../auth'

// 团队成员相关 API

export interface AddTeamMemberRequest {
  userId: number
  operatorUserId: number
  roleType: number // 10-所有者，20-管理员，30-普通成员
}

// 添加团队成员
export const addTeamMember = async (teamId: string | number, payload: AddTeamMemberRequest) => {
  const path = buildApiPath(`/api/v1/teams/${teamId}/members`, ServicePrefix.TENANT)
  return post(path, payload, { headers: getAuthHeaders() })
}

// 获取团队详情（包含成员列表）
export const getTeamDetail = async (teamId: string | number) => {
  const path = buildApiPath(`/api/v1/teams/${teamId}`, ServicePrefix.TENANT)
  return get(path, {}, { headers: getAuthHeaders() })
}

export default {
  addTeamMember,
  getTeamDetail
}

