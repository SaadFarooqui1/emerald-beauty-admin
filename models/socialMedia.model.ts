import social_media_services from "@/services/socialMedia.service"
import { useMutation, useQuery } from "react-query"

export const useModelGetSocialMedia = (data: any) => useQuery(['social_media', data], () => social_media_services.all(data), {
    keepPreviousData: true
})

export const useModelGetSocialMediaById = (id: any, data: any) => useQuery(['social_media_by_id', id], () => social_media_services.get_by_id(id, data), {
    keepPreviousData: true,
    enabled: !!id, // Run query only if `id` is truthy
});



export const useCreateSocialMediaAction = () => useMutation(social_media_services.create, {})



export const useUpdateSocialMediaAction = () => useMutation(({ id, data }: { id: number, data: any }) => social_media_services.update(id, data), {});


export const useDeleteSocialMediaAction = () => useMutation( ({ id }: { id: number }) => social_media_services.delete(id),{}); 