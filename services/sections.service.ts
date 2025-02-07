import { Api } from '@/constants/app'
import request from '@/services/request'
import { SectionI } from '@/types/section_types'
import { Pagination, SuccessResponseI } from '@/types/types'

const section_services = {

    all: (params?: any): Promise<Pagination<SectionI>> => request.get(Api.sections.all, { params }),


    get_by_id: (id: number, params: any): Promise<SectionI> =>  request.get(`${Api.sections.get_by_id}/${id}`,{ params }),


    update: (id: number, data: any): Promise<SuccessResponseI> => request.put(`${Api.sections.edit}/${id}`, data),
    
}

export default section_services
