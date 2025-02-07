import { Api } from '@/constants/app'
import request from '@/services/request'
import { RoleI } from '@/types/role_types'
import { Pagination, SuccessResponseI } from '@/types/types'

const role_services = {

    all: (params?: any): Promise<Pagination<RoleI>> => request.get(Api.role.all, { params }),
    get_by_id: (id: number): Promise<RoleI> => request.get(`${Api.role.get_by_id}/${id}`),
    create: (data: any): Promise<SuccessResponseI> => request.post(Api.role.create, data),
    update: (id: number, data: any): Promise<SuccessResponseI> => request.put(`${Api.role.edit}/${id}`, data),
    delete: (id: number): Promise<SuccessResponseI> => request.delete(`${Api.role.delete}/${id}`),
    // update: (data: any): Promise<SuccessResponseI> => request.put(Api.users.users.update, data),
    // delete: (data: any): Promise<SuccessResponseI> => request.delete(Api.users.users.delete, { data }),
}

export default role_services
