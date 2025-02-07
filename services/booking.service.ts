import { Api } from '@/constants/app'
import request from '@/services/request'
import { BookingI } from '@/types/booking_types'
import { Pagination, SuccessResponseI } from '@/types/types'

const booking_services = {

    all: (params?: any): Promise<Pagination<BookingI>> => request.get(Api.booking.all, { params }),

    get_by_id: (id: number, params: any): Promise<BookingI> =>  request.get(`${Api.booking.get_by_id}/${id}`,{ params }),
    
    update: (id: number, data: any): Promise<SuccessResponseI> => request.put(`${Api.booking.edit}/${id}`, data),

    updateStatus: (id: number, data: any): Promise<SuccessResponseI> => request.patch(`${Api.booking.editStatus}/${id}`, data),

    // create: (data: any): Promise<SuccessResponseI> => request.post(Api.users.users.create, data),
    // update: (data: any): Promise<SuccessResponseI> => request.put(Api.users.users.update, data),
    // delete: (data: any): Promise<SuccessResponseI> => request.delete(Api.users.users.delete, { data }),
}

export default booking_services
