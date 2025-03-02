import { OrderInfo } from "../utils/types"
import request from "../utils/request"

export const getOrderList = () => {
  return request<{list: OrderInfo[], total: number}>("GET", "/app-api/work/order/page", {})
}