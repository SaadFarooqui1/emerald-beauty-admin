import role_services from "@/services/role.service"
import { useMutation, useQuery } from "react-query"

export const useModelGetRoles = (data: any) => useQuery(['roles', data], () => role_services.all(data), {
    keepPreviousData: true
})

export const useCreateRoleAction = () => useMutation(role_services.create, {})

export const useModelGetRoleById = (id?: number) =>
    useQuery(['role_by_id', id], () => role_services.get_by_id(id!), {
        keepPreviousData: true,
        enabled: !!id, // Run query only if `id` is truthy
    });


export const useUpdateRoleAction = () => useMutation(({ id, data }: { id: number, data: any }) => role_services.update(id, data), {});


export const useDeleteRoleAction = () => useMutation( ({ id }: { id: number }) => role_services.delete(id),{}); 