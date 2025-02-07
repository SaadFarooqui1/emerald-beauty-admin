import { Api } from '@/constants/app'
import request from '@/services/request'
import { ServiceI } from '@/types/service_types'
import { Pagination, SuccessResponseI } from '@/types/types'

const service_services = {

    all: (params?: any): Promise<Pagination<ServiceI>> => request.get(Api.service.all, { params }),

    // get_by_id: (id: number): Promise<ServiceI> => request.get(`${Api.service.get_by_id}/${id}`),
    get_by_id: (id: number, params: any): Promise<ServiceI> =>  request.get(`${Api.service.get_by_id}/${id}`,{ params }),

    create: (data: any): Promise<SuccessResponseI> => request.post(Api.service.create, data),

    update: (id: number, data: any): Promise<SuccessResponseI> => request.put(`${Api.service.edit}/${id}`, data),


    // update: (data: any): Promise<SuccessResponseI> => request.put(Api.users.users.update, data),
    delete: (id: number): Promise<SuccessResponseI> => request.delete(`${Api.service.delete}/${id}`),
}

export default service_services
 