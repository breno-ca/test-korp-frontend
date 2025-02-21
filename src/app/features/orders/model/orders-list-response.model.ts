import { Order } from "./order.model"

export interface OrdersListResponse {
  data: Order[]
  meta: {
    limit: number
    page: number
    total: number
  }
}
