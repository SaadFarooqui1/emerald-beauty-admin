import { Api } from '@/constants/app'
import request from '@/services/request'
import { NotificationI } from '@/types/notification_types'
import { Pagination, SuccessResponseI } from '@/types/types'

const notification_services = {
    all: (params?: any): Promise<Pagination<NotificationI>> => request.get(Api.notification.all, { params }),

    allNotifications: (params?: any): Promise<Pagination<NotificationI>> => request.get(Api.notification.allNotifications, { params }),

    unreadCount: (params?: any): Promise<NotificationI> => request.get(Api.notification.unreadCount, { params }),

    get_by_id: (id: number): Promise<NotificationI> => request.get(`${Api.notification.get_by_id}/${id}`),

    create: (data: any): Promise<SuccessResponseI> => request.post(Api.notification.create, data),
    
    markRead: (id: number): Promise<SuccessResponseI> => request.post(`${Api.notification.markRead}/${id}`),
    markAllRead: (): Promise<SuccessResponseI> => request.post(`${Api.notification.markAllRead}`),

}

export default notification_services
