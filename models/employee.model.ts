import { useMutation, useQuery } from "react-query"
import employee_services from "@/services/employee.service"


export const useCreateEmployeeAction = () => useMutation(employee_services.create, {})


export const useUpdateEmployeeAction = () => useMutation( ({ id, data }: { id: number, data: any }) => employee_services.update(id, data),{});