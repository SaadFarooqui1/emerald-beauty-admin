import user_services from "@/services/user.service"

import { useMutation } from "react-query"

export const useCreateUserAction = () => useMutation(user_services.users.create, {})

export const useUpdateUserAction = () => useMutation(user_services.users.update, {})

// export const useDeleteUserAction = () => useMutation(user_services.users.delete, {})
export const useDeleteUserAction = () => useMutation( ({ id }: { id: number }) => user_services.users.delete(id),{}); 

export const useUpdateUserStatusAction = () => useMutation( ({ id }: { id: number }) => user_services.users.updateStatus(id),{});



export const useCreateDepartmentsAction = () => useMutation(user_services.departments.create, {})

export const useUpdateDepartmentsAction = () => useMutation(user_services.departments.update, {})

export const useDeleteDepartmentsAction = () => useMutation(user_services.departments.delete, {})



// organziation
export const useCreateOrganizationAction = () => useMutation(user_services.organization.create, {})

export const useUpdateOrganizationAction = () => useMutation(user_services.organization.update, {})

export const usPremiumSendRequestAction = () => useMutation(user_services.organization.send_request, {})

export const usePremiumApprovedRequestAction = () => useMutation(user_services.organization.approved, {})

export const usePremiumRejectRequestAction = () => useMutation(user_services.organization.reject, {})


// license
export const useRequestLicenseAction = () => useMutation(user_services.license.request_license, {})

export const useCreateAssignerLicenseAction = () => useMutation(user_services.license.create_assigner_license, {})

export const useApproveLicenseAction = () => useMutation(user_services.license.approve_license, {})

export const useRejectLicenseAction = () => useMutation(user_services.license.reject_license, {})





