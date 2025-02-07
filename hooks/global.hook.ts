import { set_home_mode } from '@/redux/features/global-slice'
import { AppDispatch } from '@/redux/store'
import { useDispatch } from 'react-redux'

export const useGlobal = () => {
    const dispatch = useDispatch<AppDispatch>()

    // change home mode

    const change_home_mode = (mode: string) => {
        dispatch(set_home_mode(mode))
    }

    return { change_home_mode }
}
