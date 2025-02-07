import user_services from "@/services/user.service"
import { useQuery } from "react-query"

export const useModelGetUsers = (data: any) => useQuery(['users', data], () => user_services.users.all(data), {
    keepPreviousData: true
})

export const useModelGetUserById = (id: any,data: any) => useQuery(['category_by_id', id], () => user_services.users.get_by_id(id,data), {
        keepPreviousData: true,
        enabled: !!id, // Run query only if `id` is truthy
    });

export const useModelGetDepartments = (data: any) => useQuery(['departments', data], () => user_services.departments.all(data), {
    keepPreviousData: true
})

// get organizations
export const useModelGetOrganization = (data: any) => useQuery(['organization', data], () => user_services.organization.all(data), {
    keepPreviousData: true
})

// requests
export const useModelGetRquests = (data: any) => useQuery(['organization_requests', data], () => user_services.organization.requests(data), {
    keepPreviousData: true
})


export const useModelGetAllRquests = (data: any) => useQuery(['all_organization_requests', data], () => user_services.organization.all_requests(data), {
    keepPreviousData: true
})


// license

export const useModelGetAllRquestLicense = (data: any) => useQuery(['get_all_request_license', data], () => user_services.license.get_all_request_license(data), {
    keepPreviousData: true
})


export const useModelGetAssignerLicense = (data: any) => useQuery(['get_assigner_license', data], () => user_services.license.get_assigner_license(data), {
    keepPreviousData: true
})


export const useModelGetRquestLicense = (data: any) => useQuery(['get_request_license', data], () => user_services.license.get_request_license(data), {
    keepPreviousData: true
})

// export const useModelGetCategories = (data: any) => useQuery(['get_categories', data], () => user_services.categories.get_all(data), {
//     keepPreviousData: true
// })

