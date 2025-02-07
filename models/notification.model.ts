import notification_services from "@/services/notification.service";
import { useQuery } from "react-query"
import { useMutation } from "react-query"


export const useModelGetNotifications = (data: any) => useQuery(['notifications', data], () => notification_services.all(data), {
    keepPreviousData: true
})
export const useModelGetAllNotifications = (data: any) => useQuery(['all_notifications', data], () => notification_services.allNotifications(data), {
    keepPreviousData: true
})
export const useModelGetUnreadCount = (data: any) => useQuery(['unread_count', data], () => notification_services.unreadCount(data), {
    keepPreviousData: true
})

export const useModelGetNotificationById = (id?: number) =>
    useQuery(['notification_by_id', id], () => notification_services.get_by_id(id!), {
        keepPreviousData: true,
        enabled: !!id, // Run query only if `id` is truthy
    });

export const useCreateNotificationAction = () => useMutation(notification_services.create, {})



export const useUpdateMarkReadAction = () => useMutation( ({ id }: { id: number }) => notification_services.markRead(id),{});

export const useUpdateMarkAllReadAction = () => useMutation(notification_services.markAllRead,{});
