import { SuccessResponseI, UserResponseI } from './types'

//  user type
export interface signInReponseI extends SuccessResponseI {
    user: UserResponseI
    access_token: accessTokenI
}

interface accessTokenI {
    token: string
}
// verfy response

export interface verifyReponseI extends SuccessResponseI {
    user: UserResponseI
    profile: UserResponseI
}

// reset_password
export interface resetPasswordResponseI extends SuccessResponseI {
    email: string
}

// update Password Type
export type updatePasswordPayloadType = {
    email: string
    otp: string
    password: string
    fcm_token?: string
}

// AuthState Slice Type

export type AuthSliceType = {
    user: UserResponseI | null
    guest_id: string | null | undefined
    currentItem: any
    searchItems: any
}

// OtpComponentProps
export interface OtpComponentPropsI {
    email: string
    setactivity: React.Dispatch<React.SetStateAction<string>>
    otp: string
    setOtp: React.Dispatch<React.SetStateAction<string>>
}
