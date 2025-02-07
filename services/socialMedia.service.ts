import { Api } from '@/constants/app'
import request from '@/services/request'
import { SocialI } from '@/types/socialmedia_types'
import { Pagination, SuccessResponseI } from '@/types/types'

const social_media_services = {

    all: (params?: any): Promise<Pagination<SocialI>> => request.get(Api.social_media.all, { params }),
    get_by_id: (id: number, params: any): Promise<SocialI> =>  request.get(`${Api.social_media.get_by_id}/${id}`,{ params }),


    create: (data: any): Promise<SuccessResponseI> => request.post(Api.social_media.create, data),

    update: (id: number, data: any): Promise<SuccessResponseI> => request.put(`${Api.social_media.edit}/${id}`, data),
   
    delete: (id: number): Promise<SuccessResponseI> => request.delete(`${Api.social_media.delete}/${id}`),

}

export default social_media_services
 