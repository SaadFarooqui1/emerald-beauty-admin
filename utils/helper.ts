import cogoToast from 'cogo-toast'
import { getCookie } from 'cookies-next'

export const ErrorToast = (Message: any, type = 'error', heading = '') => {
    if (type == 'error') {
        cogoToast.error(Message, { position: 'top-right', heading })
        return false
    }

    if (type == 'success') {
        cogoToast.success(Message, { position: 'top-right', heading })
        return false
    }
}

export const expirationDate = new Date()
expirationDate.setDate(expirationDate.getDate() + 3)

export const getToken = () => getCookie('_ca')
