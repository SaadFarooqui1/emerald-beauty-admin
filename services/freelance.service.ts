import { Api } from '@/constants/app'
import request from '@/services/request'
import { Pagination, SuccessResponseI } from '@/types/types'

const freelance_services = {


    update: (data: any): Promise<SuccessResponseI> => request.post(`${Api.freelancer.edit}`, data),

    // delete: (data: any): Promise<SuccessResponseI> => request.delete(Api.users.users.delete, { data }),
}

export default freelance_services
