import { Api } from '@/constants/app'
import request from '@/services/request'
import { ReviewI } from '@/types/review_types'
import { Pagination, SuccessResponseI } from '@/types/types'

const review_services = {

    all: (params?: any): Promise<Pagination<ReviewI>> => request.get(Api.review.all, { params }),
    // create: (data: any): Promise<SuccessResponseI> => request.post(Api.users.users.create, data),
    // update: (data: any): Promise<SuccessResponseI> => request.put(Api.users.users.update, data),
    // delete: (data: any): Promise<SuccessResponseI> => request.delete(Api.users.users.delete, { data }),
}

export default review_services
