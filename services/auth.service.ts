import { Api } from '@/constants/app'
import {
    resetPasswordResponseI,
    signInReponseI,
    verifyReponseI,
} from '@/types/auth_types'
import { SuccessResponseI } from '@/types/types'
import request from './request'

const auth_service = {
    reset_password: {
        // reset password
        reset: (data: any): Promise<resetPasswordResponseI> =>
            request.post(Api.user_module.auth.reset_password.reset, data),
        verify: (data: any): Promise<SuccessResponseI> =>
            request.post(Api.user_module.auth.reset_password.verify, data),
        update_password: (data: any): Promise<signInReponseI> =>
            request.post(
                Api.user_module.auth.reset_password.update_password,
                data
            ),
    },
    sign_in: (data: any): Promise<signInReponseI> => 
        request.post(Api.auth.sign_in, data),
    sign_up: (data: any): Promise<signInReponseI> =>
        request.post(Api.user_module.auth.sign_up, data),
    sign_out: (data: any): Promise<SuccessResponseI> => request.post(Api.user_module.auth.sign_out, data),
    verify: (params?: any): Promise<verifyReponseI> =>
        request.get(Api.auth.verify, { params }),
}

export default auth_service
