import { Api } from '@/constants/app'
import request from '@/services/request'
import { Pagination, SuccessResponseI } from '@/types/types'

const staff_services = {

    // all: (params?: any): Promise<Pagination<CouponI>> => request.get(Api.staff.all, { params }),
    create: (data: any): Promise<SuccessResponseI> => request.post(Api.staff.create, data),

    update: (id: number, data: any): Promise<SuccessResponseI> => request.put(`${Api.staff.edit}/${id}`, data),
    // update: (data: any): Promise<SuccessResponseI> => request.put(Api.users.users.update, data),
    // delete: (data: any): Promise<SuccessResponseI> => request.delete(Api.users.users.delete, { data }),
}

export default staff_services
