export interface ResponseBody<T>{
  code: number,
  msg: string,
  data: T
}

export interface LoginRes {
  accessToken: string
  expiresTime: number
  refreshToken: string
  userId: number
}

export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface SearchOption {
  state?: string
  workshopId?: string
  createTime?: string
}

export interface ToolInfo {
  id?: string
  icon?: string
  master?: string
  name?: string
  online?: number
  toolsSerialNumber?: string
  workshop?: string
  createTime?: number
  deviceFunctions?: DeviceFunction[]
}

export interface DeviceFunction {
  category?: string
  commands?: Command[]
  dataRangeMax?: string
  dataRangeMin?: string
  displayModel?: number
  flag?: string
  flagValue?: string | number
  functionType: number
  icon?: string
  id: string
  instructions: any
  name: string
  params?: any[]
  sort: number
  unit?: string
}

export interface Command {
  name: string
  value: string
  sort: number
  icon: string
}
export interface OrderInfo {
  id: string
  name: string
  code: string
  workshopId: string
  workshop: string
  positionId: string
  position: string
  toolsSerialNumber: string
  maxRetry: number
  checkTotal: number
  orderStatus: number
  status: number
  startTime: number
  finishTime: number
  description: string
  createTime: number
}


export interface WorkShopInfo {
  id: string
  name: string
  code: string
  position: string
  type: string
  state: number
  description: string
  createTime: number
}