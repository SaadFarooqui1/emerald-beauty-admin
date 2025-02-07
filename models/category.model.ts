import category_services from "@/services/category.service"
import { useQuery } from "react-query"
import { useMutation } from "react-query"


export const useModelGetCategories = (data: any) => useQuery(['categories', data], () => category_services.all(data), {
    keepPreviousData: true
})

export const useModelGetCategoryById = (id?: number) =>
    useQuery(['category_by_id', id], () => category_services.get_by_id(id!), {
        keepPreviousData: true,
        enabled: !!id, // Run query only if `id` is truthy
    });

export const useCreateCategoryAction = () => useMutation(category_services.create, {})

export const useUpdateCategoryAction = () => useMutation(({ id, data }: { id: number, data: any }) => category_services.update(id, data), {});

export const useDeleteCategoryAction = () => useMutation(({ id }: { id: number }) => category_services.delete(id), {}); 