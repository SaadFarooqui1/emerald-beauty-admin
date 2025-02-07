import { Api } from '@/constants/app'
import request from '@/services/request'
import { Pagination, SuccessResponseI } from '@/types/types'

const salary_services = {

    
    all: (params?: any): Promise<Pagination<any>> => request.get(Api.salary.all, { params }),

    get_by_id: (id: number, params: any): Promise<any> =>  request.get(`${Api.salary.get_by_id}/${id}`,{ params }),

    update: (id: number, data: any): Promise<SuccessResponseI> => request.put(`${Api.salary.edit}/${id}`, data),

 
}

export default salary_services
