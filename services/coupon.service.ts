import { Api } from '@/constants/app'
import request from '@/services/request'
import { CouponI } from '@/types/coupon_types'
import { Pagination, SuccessResponseI } from '@/types/types'

const coupon_services = {

    all: (params?: any): Promise<Pagination<CouponI>> => request.get(Api.coupon.all, { params }),


    get_by_id: (id: number, params: any): Promise<CouponI> =>  request.get(`${Api.coupon.get_by_id}/${id}`,{ params }),


    create: (data: any): Promise<SuccessResponseI> => request.post(Api.coupon.create, data),

    update: (id: number, data: any): Promise<SuccessResponseI> => request.put(`${Api.coupon.edit}/${id}`, data),
    
    delete: (id: number): Promise<SuccessResponseI> => request.delete(`${Api.coupon.delete}/${id}`),

    updateStatus: (id: number): Promise<SuccessResponseI> => request.put(`${Api.coupon.editStatus}/${id}`),
}

export default coupon_services
