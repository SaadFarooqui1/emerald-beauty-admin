import review_services from "@/services/review.service"
import { useQuery } from "react-query"


export const useModelGetReviews = (data: any) => useQuery(['reviews', data], () => review_services.all(data), {
    keepPreviousData: true
})