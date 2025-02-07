import service_services from "@/services/service.service"
import user_services from "@/services/user.service"
import { useMutation, useQuery } from "react-query"

export const useModelGetServices = (data: any) => useQuery(['services', data], () => service_services.all(data), {
    keepPreviousData: true
})


// export const useModelGetServiceById = (id?: number) =>
//     useQuery(['service_by_id', id], () => service_services.get_by_id(id!), {
//         keepPreviousData: true,
//         enabled: !!id, // Run query only if `id` is truthy
//     });

    export const useModelGetServiceById = (id: any, data: any) => useQuery(['service_by_id', id], () => service_services.get_by_id(id, data), {
        keepPreviousData: true,
        enabled: !!id, // Run query only if `id` is truthy
    });



export const useCreateServiceAction = () => useMutation(service_services.create, {})

export const useUpdateServiceAction = () => useMutation( ({ id, data }: { id: number, data: any }) => service_services.update(id, data),{});


export const useDeleteServiceAction = () => useMutation( ({ id }: { id: number }) => service_services.delete(id));
