import booking_services from "@/services/booking.service"
import { useMutation, useQuery } from "react-query"

export const useModelGetBookings = (data: any) => useQuery(['bookings', data], () => booking_services.all(data), {
    keepPreviousData: true
})



export const useModelGetBookingById = (id: any, data: any) => useQuery(['booking_by_id', id], () => booking_services.get_by_id(id, data), {
    keepPreviousData: true,
    enabled: !!id, // Run query only if `id` is truthy
});

export const useUpdateBookingPaymentStatusAction = () => useMutation(({ id, data }: { id: number, data: any }) => booking_services.update(id, data), {});
export const useUpdateBookingStatusAction = () => useMutation(({ id, data }: { id: number, data: any }) => booking_services.updateStatus(id, data), {});

// export const useUpdateLeaveApproveAction = () => useMutation(({ data, id }: { data: any, id: number }) => leave_services.updateApprove(id, data), {}); 