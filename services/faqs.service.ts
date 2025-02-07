import { Api } from '@/constants/app'
import request from '@/services/request'
import { FaqI } from '@/types/faqs_types'
import { Pagination, SuccessResponseI } from '@/types/types'

const faqs_services = {
    all: (params?: any): Promise<Pagination<FaqI>> => request.get(Api.faq.all, { params }),

    get_by_id: (id: number): Promise<FaqI> => request.get(`${Api.faq.get_by_id}/${id}`),

    create: (data: any): Promise<SuccessResponseI> => request.post(Api.faq.create, data),

    update: (id: number, data: any): Promise<SuccessResponseI> => request.put(`${Api.faq.edit}/${id}`, data),

    delete: (id: number): Promise<SuccessResponseI> => request.delete(`${Api.faq.delete}/${id}`),
}

export default faqs_services
