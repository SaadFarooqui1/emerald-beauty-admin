import { useModelGetVeirfy } from '@/models/auth.model'
import { add_user, update_guest } from '@/redux/features/auth-slice'
import { AppDispatch, RootState } from '@/redux/store'
// import { create_guest_id } from '@/utils/helper'
import { getCookie } from 'cookies-next'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function BaseLayout({ children, authProps }: any) {
    const _ca = getCookie('_ca')
    const dispatch = useDispatch();


    // const { user } = useSelector((state: RootState) => state.auth)

    // const { data } = useModelGetVeirfy({}, (_ca == undefined || _ca == '' || _ca == null) ? false: true)
    const { data } = useModelGetVeirfy({
        relations: ['user_image']
    }, (_ca == undefined || _ca == '' || _ca == null) ? false : true)
    useEffect(() => {
        if (_ca) {
            dispatch(add_user(data?.profile)); // user کو Redux میں سیٹ کریں
        }
    }, [data, _ca, dispatch]);
    // console.log(data)

    // useEffect(() => {
    //     if (user?.hasOwnProperty('id'))
    //         window.sessionStorage.removeItem('guestId')
    //     else dispatch(update_guest(create_guest_id()))
    // }, [user])

    // if (lang == SECONDARY_LANGUAGE) return <SecondaryLayout> {children}</SecondaryLayout>

    return <>{children}</>
}

export default BaseLayout
