import { Api } from '@/constants/app'
import request from '@/services/request'
import { LeaveI } from '@/types/leave_types'
import { Pagination, SuccessResponseI } from '@/types/types'

const leave_services = {

    all: (params?: any): Promise<Pagination<LeaveI>> => request.get(Api.leave.all, { params }),
    get_by_id: (id: number,params?: any): Promise<LeaveI> => request.get(`${Api.leave.get_by_id}/${id}`,{ params }),

    updateApprove: (id: number, data: any): Promise<SuccessResponseI> => request.put(`${Api.leave.edit}/${id}`, data),

    // create: (data: any): Promise<SuccessResponseI> => request.post(Api.users.users.create, data),
    // update: (data: any): Promise<SuccessResponseI> => request.put(Api.users.users.update, data),
    // delete: (data: any): Promise<SuccessResponseI> => request.delete(Api.users.users.delete, { data }),
}

export default leave_services
