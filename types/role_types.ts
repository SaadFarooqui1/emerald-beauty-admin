import { ModuleI } from "./module_types"


export interface RoleI {
    id: number
    name: string
    permissions: ModuleI[]
    created_at: string
    updated_at: string
}