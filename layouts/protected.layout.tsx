import React, { ReactNode, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { getToken } from '@/utils/helper'
import { useRouter } from 'next/router'
import { LoadingOverlay } from '@mantine/core'
import usePermissions from '@/hooks/permissions.hook'
import useRole from '@/hooks/role.hook'
import { PrivateRouteProps } from '@/types'
import { useModelGetVeirfy } from '@/models/auth.model'
import { getCookie } from 'cookies-next'

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, authenticate, permissions, roles }) => {

    const { user } = useSelector((state: RootState) => state.auth )

    const router = useRouter()

    // const { hasPermissions } = usePermissions(permissions)

    // const { hasRole } = useRole(roles)
    const token = getCookie("_ca");

   const verify = useModelGetVeirfy({ relations: ['user_image'],token }, !!token);


    // axios setup
    useEffect(() => {
        if (getToken() == null || getToken() == undefined)
            router.replace('/auth/sign-in')
    }, [])

    // if (user?.hasOwnProperty('id') && (!hasPermissions() || !hasRole())) {
    //     if(user.assigner_expiry == true)
    //         router.push('/license-expire')
    //     if (user?.roles.find(item => item.all.includes('organization')))
    //         router.push('/organization')
    //     else
    //         router.push('/forbidden')
    // }

    // if (user?.hasOwnProperty('id'))
    return <>{children}</>

    // return <LoadingOverlay visible={true} />
}

export default PrivateRoute
