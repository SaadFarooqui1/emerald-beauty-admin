import { Api } from '@/constants/app'
import request from '@/services/request'
import { Pagination, SuccessResponseI } from '@/types/types'

const employee_services = {

    // all: (params?: any): Promise<Pagination<CouponI>> => request.get(Api.employee.all, { params }),
    create: (data: any): Promise<SuccessResponseI> => request.post(Api.employee.create, data),


    update: (id: number, data: any): Promise<SuccessResponseI> => request.put(`${Api.employee.edit}/${id}`, data),

    // delete: (data: any): Promise<SuccessResponseI> => request.delete(Api.users.users.delete, { data }),
}

export default employee_services
