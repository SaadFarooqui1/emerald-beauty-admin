import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import auth_service from '@/services/auth.service'
import { AppDispatch } from '@/redux/store'
import { add_user } from '@/redux/features/auth-slice'
import { GenSuccessResponseI, UserVerifyResponseI } from '@/types/types'
import { useRouter } from 'next/router'

const Verification = () => {
    const [isUser, setisUser] = useState(0)
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()

    const Verify = async () => {
        const data: UserVerifyResponseI = await auth_service.verify({})
        if (data == null) {
            router.push('/')
            return false
        }
        if (data?.flag == 1) {
            setisUser(1)
            dispatch(add_user(data.user))
        }
    }
    return { Verify, isUser, setisUser }
}
export default Verification
