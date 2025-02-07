import cogoToast from 'cogo-toast'
import { useState } from 'react'

export const notification_function = () => {
    navigator?.serviceWorker?.addEventListener('message', (event) => {
        if (
            event.data.firebaseMessaging.type &&
            event.data.firebaseMessaging.type === 'push-received'
        ) {
            const pushData = event.data.firebaseMessaging.payload
            // setbody(pushData?.notification?.body)
            // if (pushData?.notification?.body != body) {
            const notification = new Notification(pushData.notification.title, {
                body: pushData?.notification?.body,
                icon: pushData?.notification?.icon,
            })

            notification?.addEventListener('click', (event) => {
                event.preventDefault()
                // Router.push(pushData?.notification?.click_action)
            })
            // }
        }
    })
}

export const check_notification_permission_toast = () => {
    if (Notification.permission !== 'granted') {
        cogoToast.error('Allow notifications to get notifications', {
            position: 'top-right',
            heading: 'Error',
        })
    }
}
