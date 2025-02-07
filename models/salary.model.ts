import salary_services from "@/services/salary.service";
import { useMutation, useQuery } from "react-query"

export const useModelGetSalaries = (data: any) => useQuery(['salaries', data], () => salary_services.all(data), {
    keepPreviousData: true
})

export const useModelGetSalaryById = (id: any, data: any) => useQuery(['coupon_by_id', id], () => salary_services.get_by_id(id, data), {
    keepPreviousData: true,
    enabled: !!id, // Run query only if `id` is truthy
}); 

export const useUpdateSalaryStatusAction = () => useMutation( ({ id, data }: { id: number, data: any }) => salary_services.update(id, data),{});