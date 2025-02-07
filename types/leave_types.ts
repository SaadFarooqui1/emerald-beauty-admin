import { documentsI } from "./document_types"
import { UserResponseI } from "./types"

export interface LeaveI {
    id: number
    start_date: string
    end_date: string
    subject: string
    reason: string
    type: number
    status: number
    leave_status_text: string
    leave_type_text: string
    documents: documentsI[]
    user: Partial<UserResponseI>
    created_at: string
    updated_at: string
}