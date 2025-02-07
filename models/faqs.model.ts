import faqs_services from "@/services/faqs.service";
import { useQuery } from "react-query"
import { useMutation } from "react-query"


export const useModelGetFaqs = (data: any) => useQuery(['faqs', data], () => faqs_services.all(data), {
    keepPreviousData: true
})

export const useModelGetFaqById = (id?: number) =>
    useQuery(['category_by_id', id], () => faqs_services.get_by_id(id!), {
        keepPreviousData: true,
        enabled: !!id, // Run query only if `id` is truthy
    });

export const useCreateFaqAction = () => useMutation(faqs_services.create, {})

export const useUpdateFaqAction = () => useMutation( ({ id, data }: { id: number, data: any }) => faqs_services.update(id, data),{});

export const useDeleteFaqAction = () => useMutation( ({ id }: { id: number }) => faqs_services.delete(id),{}); 