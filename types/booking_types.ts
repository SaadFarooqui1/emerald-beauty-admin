import { ServiceI } from "./service_types"
import { UserResponseI } from "./types"

export interface BookingI {
    id: number
    date: string
    start_time: string
    end_time: string
    amount: number
    status_text: string
    provider: Partial<UserResponseI>
    client: Partial<UserResponseI>
    service: Partial<ServiceI>
    payment_reciept: {
        mediaUrl: string
    }
    payment_status_text: string
    created_at: string
    updated_at: string
}