import { AuthSliceType } from '@/types/auth_types'
import { UserResponseI } from '@/types/types'
import { createSlice } from '@reduxjs/toolkit'

const initialState: AuthSliceType = {
    user: null,
    guest_id: null,
    // carts
    currentItem: null,
    searchItems: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        add_user: (state, { payload }) => {
            state.user = {
                ...state.user,
                ...payload,
            };
        },
        update_guest: (state: AuthSliceType, { payload }) => {
            state.guest_id = payload
            // setLocalStorage('user', state.user);
        },
        update_profile_photo: (state: AuthSliceType, { payload }) => {
            const user = state.user as UserResponseI
            user.avatar = payload
            state.user = user
        },
        user_info: (state: AuthSliceType, { payload }) => {
            state.user = payload
            // setLocalStorage('user', state.user);
        },

        setCurrentItem: (state: AuthSliceType, { payload }) => {
            state.currentItem = payload
        },
        setsearchItems: (state: AuthSliceType, { payload }) => {
            state.searchItems = payload
        },
    },
})

export const {
    add_user,
    update_guest,
    update_profile_photo,
    user_info,
    setCurrentItem,
    setsearchItems,
} = authSlice.actions

export default authSlice.reducer
