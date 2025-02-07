import reports_services from "@/services/reports.service"
import { useQuery } from "react-query"

export const useModelGetSalesByCategory = (data: any) => useQuery(['sales-by-category', data], () => reports_services.get_sales_by_category(data), {
    keepPreviousData: true
})

export const useModelGetBookingStats = (data: any) => useQuery(['booking-stats', data], () => reports_services.get_booking_stats(data), {
    keepPreviousData: true
})