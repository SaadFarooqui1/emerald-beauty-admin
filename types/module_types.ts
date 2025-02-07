

export interface ModuleI {
    id: number
    name: string
    created_at: string
    updated_at: string
    meta: {
        pivot_create: number
        pivot_update: number
        pivot_delete: number
        pivot_read: number
    }
}
