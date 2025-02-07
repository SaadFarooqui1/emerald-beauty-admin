import { Api } from '@/constants/app'
import request from '@/services/request'
import { CategoryI } from '@/types/category_types'
import { Pagination, SuccessResponseI } from '@/types/types'

const category_services = {
    all: (params?: any): Promise<Pagination<CategoryI>> => request.get(Api.category.all, { params }),

    get_by_id: (id: number): Promise<CategoryI> => request.get(`${Api.category.get_by_id}/${id}`),

    create: (data: any): Promise<SuccessResponseI> => request.post(Api.category.create, data),

    delete: (id: number): Promise<SuccessResponseI> => request.delete(`${Api.category.delete}/${id}`),
    
    update: (id: number, data: any): Promise<SuccessResponseI> =>
        request.put(`${Api.category.edit}/${id}`, data),
}

export default category_services
