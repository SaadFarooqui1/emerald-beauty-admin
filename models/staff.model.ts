import staff_services from "@/services/staff.service"
import { useMutation, useQuery } from "react-query"



export const useCreateStaffAction = () => useMutation(staff_services.create, {})


export const useUpdateStaffAction = () => useMutation( ({ id, data }: { id: number, data: any }) => staff_services.update(id, data),{});