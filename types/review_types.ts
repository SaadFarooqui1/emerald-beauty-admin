import { UserResponseI } from "./types"

export interface ReviewI {
    id: number
    review: string
    rating: number
    user: Partial<UserResponseI>
    created_at: string
    updated_at: string
}