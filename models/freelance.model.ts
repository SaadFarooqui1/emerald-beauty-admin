import { useMutation, useQuery } from "react-query"
import freelance_services from "@/services/freelance.service";


export const useUpdateFreelancerAction = () => useMutation( ({ data }: { data: any }) => freelance_services.update(data),{}); 



