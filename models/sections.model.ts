import section_services from "@/services/sections.service";
import { useMutation, useQuery } from "react-query"



export const useModelGetSections = (data: any) => useQuery(['sections', data], () => section_services.all(data), {
    keepPreviousData: true
})

export const useModelGetSectionById = (id: any, data: any) => useQuery(['section_by_id', id], () => section_services.get_by_id(id, data), {
    keepPreviousData: true,
    enabled: !!id, // Run query only if `id` is truthy
});



export const useUpdateSectionAction = () => useMutation(({ id, data }: { id: number, data: any }) => section_services.update(id, data), {});