import { useMutation } from 'react-query'
import useAuth from '@/hooks/hook.auth'
import auth_service from '@/services/auth.service'

// useResetPasswordAction
export const useResetPasswordAction = () =>
    useMutation(auth_service.reset_password.reset, {})

// useResetPasswordVerifyAction
export const useResetPasswordVerifyAction = () =>
    useMutation(auth_service.reset_password.verify, {})

// useUpdatePasswordAction
export const useUpdatePasswordAction = () => {
    const { after_signin } = useAuth()
    return useMutation(auth_service.reset_password.update_password, {
        onSuccess: after_signin,
    })
}

// useSignInAction
export const useSignInAction = () => {
    const { after_signin } = useAuth()
    return useMutation(auth_service.sign_in, {
        onSuccess: after_signin,
    })
}


// useSignUpAction
export const useSignUpAction = () => {
    const { after_signin } = useAuth()
    return useMutation(auth_service.sign_up, {
        onSuccess: after_signin,
    })
}

// useSignUpAction
export const useSignOutAction = () => useMutation(auth_service.sign_out, {

})