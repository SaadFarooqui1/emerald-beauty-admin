import { documentsI } from "./document_types"

export interface CategoryI {
    id: number
    name: string
    arabic_name: string
    created_at: string
    updated_at: string
    category_id: number
    documents: documentsI[]
}