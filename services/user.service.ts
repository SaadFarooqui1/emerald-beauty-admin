import { Api } from '@/constants/app'
import request from '@/services/request'
import { AllLicenseI, AllPremiumRequestsI, AssignerLicenseI, DepartmentsT, LicenseI, PremiumRequestsI} from '@/types'
import { Pagination, SuccessResponseI, UserResponseI } from '@/types/types'

const user_services = {

    users: {
        all: (params?: any): Promise<Pagination<UserResponseI>> => request.get(Api.users.users.all, { params }),
        create: (data: any): Promise<SuccessResponseI> => request.post(Api.users.users.create, data),
        update: (data: any): Promise<SuccessResponseI> => request.put(Api.users.users.update, data),
        // delete: (data: any): Promise<SuccessResponseI> => request.delete(Api.users.users.delete, { data }),
        delete: (id: number): Promise<SuccessResponseI> => request.delete(`${Api.users.users.delete}/${id}`),
        updateStatus: (id: number): Promise<SuccessResponseI> => request.post(`${Api.users.users.editStatus}/${id}`),

        get_by_id: (id: number,params?: any): Promise<UserResponseI> => request.get(`${Api.users.users.get_by_id}/${id}`,{ params }),
    },
    departments: {
        all: (params?: any): Promise<Pagination<DepartmentsT>> => request.get(Api.users.departments.all, { params }),
        create: (data: any): Promise<SuccessResponseI> => request.post(Api.users.departments.create, data),
        update: (data: any): Promise<SuccessResponseI> => request.put(Api.users.departments.update, data),
        delete: (data: any): Promise<SuccessResponseI> => request.delete(Api.users.departments.delete, { data }),
    },
    organization: {
        all: (params?: any): Promise<Pagination<UserResponseI>> => request.get(Api.users.organization.all, { params }),
        create: (data: any): Promise<SuccessResponseI> => request.post(Api.users.organization.create, data),
        update: (data: any): Promise<SuccessResponseI> => request.put(Api.users.organization.update, data),
        requests: (params?: any): Promise<Pagination<PremiumRequestsI>> => request.get(Api.users.organization.requests, { params }),
        send_request: (data: any): Promise<SuccessResponseI> => request.post(Api.users.organization.send_request, data),
        approved: (data: any): Promise<SuccessResponseI> => request.post(Api.users.organization.approved, data),
        reject: (data: any): Promise<SuccessResponseI> => request.post(Api.users.organization.reject, data),
        all_requests: (params?: any): Promise<Pagination<AllPremiumRequestsI>> => request.get(Api.users.organization.all_requests, { params }),
    },
    license: {
        get_all_request_license: (params?: any): Promise<Pagination<AllLicenseI>> => request.get(Api.users.license.get_all_request_license, { params }),
        get_assigner_license: (params?: any): Promise<Pagination<AssignerLicenseI>> => request.get(Api.users.license.get_assigner_license, { params }),
        get_request_license: (params?: any): Promise<Pagination<LicenseI>> => request.get(Api.users.license.get_request_license, { params }),
        request_license: (data: any): Promise<SuccessResponseI> => request.post(Api.users.license.request_license, data),
        create_assigner_license: (data: any): Promise<SuccessResponseI> => request.post(Api.users.license.create_assigner_license, data),
        approve_license: (data: any): Promise<SuccessResponseI> => request.post(Api.users.license.approve_license, data),
        reject_license: (data: any): Promise<SuccessResponseI> => request.post(Api.users.license.reject_license, data),
    },

}

export default user_services
