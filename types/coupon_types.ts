import { ServiceI } from "./service_types"

export interface CouponI {
    id: number
    code: string
    discount: number
    start_date: string
    end_date: string
    services: ServiceI[]
    is_active: boolean
    created_at: string
    updated_at: string
}