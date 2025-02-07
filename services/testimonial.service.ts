import { Api } from '@/constants/app'
import request from '@/services/request'
import { FaqI } from '@/types/faqs_types'
import { TestimonialI } from '@/types/testimonial_types'
import { Pagination, SuccessResponseI } from '@/types/types'

const testimonial_services = {
    all: (params?: any): Promise<Pagination<TestimonialI>> => request.get(Api.testimonials.all, { params }),

    get_by_id: (id: number): Promise<TestimonialI> => request.get(`${Api.testimonials.get_by_id}/${id}`),

    create: (data: any): Promise<SuccessResponseI> => request.post(Api.testimonials.create, data),

    update: (id: number, data: any): Promise<SuccessResponseI> => request.put(`${Api.testimonials.edit}/${id}`, data),

    delete: (id: number): Promise<SuccessResponseI> => request.delete(`${Api.testimonials.delete}/${id}`),
}

export default testimonial_services
