export type stripeElement = {
    clientSecret: string
    order_detail?: {
        order_id: number
        trak_id: number
        order_id_prefix: string
    }
    redirect_url?: string
}
