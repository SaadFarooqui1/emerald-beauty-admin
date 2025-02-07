import { CategoryI } from "./category_types"

export interface ServiceI {
    id: number
    name: string
    arabic_name: string
    price: number
    description: string
    arabic_description: string
    duration: number
    service_id: number
    category: CategoryI
    category_id: number
    cover_photo: {
        mediaUrl: string
    }
    meta: {
        bookings_count: number
    }
    created_at: string
    updated_at: string
}