import testimonial_services from "@/services/testimonial.service";
import { useQuery } from "react-query"
import { useMutation } from "react-query"


export const useModelGetTestimonials = (data: any) => useQuery(['Testimonials', data], () => testimonial_services.all(data), {
    keepPreviousData: true
})

export const useModelGetTestimonialById = (id?: number) =>
    useQuery(['testimonial', id], () => testimonial_services.get_by_id(id!), {
        keepPreviousData: true,
        enabled: !!id, // Run query only if `id` is truthy
    });

export const useCreateTestimonialAction = () => useMutation(testimonial_services.create, {})

export const useUpdateTestimonialAction = () => useMutation( ({ id, data }: { id: number, data: any }) => testimonial_services.update(id, data),{});

export const useDeleteTestimonialAction = () => useMutation( ({ id }: { id: number }) => testimonial_services.delete(id),{}); 