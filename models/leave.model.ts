import leave_services from "@/services/leave.service"
import { useMutation, useQuery } from "react-query"

export const useModelGetLeaves = (data: any) => useQuery(['leaves', data], () => leave_services.all(data), {
    keepPreviousData: true
})


export const useModelGetLeaveById = (id: any, data: any) =>
    useQuery(['leave_by_id', id], () => leave_services.get_by_id(id, data), {
        keepPreviousData: true,
        enabled: !!id, // Run query only if `id` is truthy
    });


export const useUpdateLeaveApproveAction = () => useMutation(({ data, id }: { data: any, id: number }) => leave_services.updateApprove(id, data), {}); 