import { Api } from '@/constants/app'
import request from '@/services/request'
import { IBookingStats, ISalesByCategory } from '@/types/report_types'

const reports_services = {

    get_sales_by_category: (params?: any): Promise<ISalesByCategory[]> => request.get(Api.reports.get_sales_by_category, { params }),
    get_booking_stats: (params?: any): Promise<IBookingStats[]> => request.get(Api.reports.get_booking_stats, { params }),

}

export default reports_services
