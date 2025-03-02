import { SearchOption, ToolInfo } from "../utils/types"
import request from "../utils/request"

export const ToolList = (obj: SearchOption, name?: string) => {
  const params = JSON.parse(JSON.stringify(obj))
  if(!params.state) {
    delete params.state
  } else {
    params.state = Number(params.state)
  }
  if(!params.workshopId) {
    delete params.workshopId
  } else {
    params.workshopId = Number(params.workshopId)
  }
  if(name) {
    params.name = name
  }
  return request<{list: ToolInfo[], total: number}>('GET', '/app-api/work/tools/page', params) 
}

export const getToolDetail = (id: string) => {
  return request<ToolInfo>('GET', '/app-api/work/tools/get', {id})
}
