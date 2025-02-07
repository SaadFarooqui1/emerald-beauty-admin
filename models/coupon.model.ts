import coupon_services from "@/services/coupon.service"
import { useMutation, useQuery } from "react-query"

export const useModelGetCoupons = (data: any) => useQuery(['coupons', data], () => coupon_services.all(data), {
    keepPreviousData: true
})


export const useModelGetCouponById = (id: any, data: any) => useQuery(['coupon_by_id', id], () => coupon_services.get_by_id(id, data), {
    keepPreviousData: true,
    enabled: !!id, // Run query only if `id` is truthy
});



export const useCreateCouponAction = () => useMutation(coupon_services.create, {})

export const useUpdateCouponAction = () => useMutation(({ id, data }: { id: number, data: any }) => coupon_services.update(id, data), {});


export const useDeleteCouponAction = () => useMutation( ({ id }: { id: number }) => coupon_services.delete(id),{}); 


export const useUpdateCouponStatusAction = () => useMutation( ({ id }: { id: number }) => coupon_services.updateStatus(id),{});