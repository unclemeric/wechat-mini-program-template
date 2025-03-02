import { LoginRes, WorkShopInfo } from "../utils/types"
import request from "../utils/request"

export const login = function(params: { username: string, password: string, rememberMe?: boolean, tenantName?: string }) {
  params.rememberMe = true
  params.tenantName = params.tenantName || '芋道源码'
  return request<LoginRes>('POST', '/admin-api/system/auth/login', params)
}
export const refreshToken = function(params: { refreshToken: string }) {
  return request<LoginRes>('POST', '/admin-api/system/auth/refresh-token', params, { contentType: 'application/x-www-form-urlencoded'})
}
export const getWorkshops = function(params: { name?: string }) {
  return request<{list: WorkShopInfo[], total: number}>('GET', '/admin-api/work/shop/page', params)
}

export const getWorkshop = function(params: { id: number }) {
  return request<WorkShopInfo>('GET', '/admin-api/work/shop/get', params)
}