import { GlobalSliceType } from '@/types/types'
import { createSlice } from '@reduxjs/toolkit'

const initialState: GlobalSliceType = {
    home_mode: 'events', // events and products
    carts_qty: 0,
    search: '',
}

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        set_home_mode: (state: GlobalSliceType, { payload }) => {
            state.home_mode = payload
        },
        set_carts_qty: (state: GlobalSliceType, { payload }) => {
            state.carts_qty = payload
        },
        set_search: (state: GlobalSliceType, { payload }) => {
            state.search = payload
        },
    },
})

export const { set_home_mode, set_carts_qty, set_search } = globalSlice.actions

export default globalSlice.reducer
