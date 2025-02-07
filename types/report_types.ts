
export interface ISalesByCategory {
    category_name: string
    total_sales: number
}

export interface IBookingStats {
    day: string
    completed_count: number
    cancelled_count: number
    total_revenue: number
    admin_cut: number
}