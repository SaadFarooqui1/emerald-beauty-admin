import React from 'react'
import { SuccessResponseI, UserResponseI } from './types'

// ChangePasswordProps
export type ChangePasswordProps = {
    setcurrentState: React.Dispatch<React.SetStateAction<string>>
}

// account sidebar props

export type AccountsideBarProps = {
    name: string
}

export interface UserProfileResponseI extends SuccessResponseI {
    user: UserResponseI
}

// address type
export type AddressT = {
    id: number
    name: string
    city: string
    address_1: string
    lat: number
    long: number
    is_default: number
}

//  EditAddressProps

export interface AddressProps {
    address_refetch: () => void
    setcurrentState: React.Dispatch<React.SetStateAction<string>>
}

export interface EditAddressProps extends AddressProps {
    editAddress: AddressT
    seteditAddress: (data: AddressT) => void
}

export interface MapAreaProps {
    lat: number
    long: number
    setFieldValue: (field: string, value: any) => void
    set_get_location: React.Dispatch<React.SetStateAction<boolean>>
}

// DeteAddressProps

export interface DeleteAddressPropsI {
    id: number
    address_refetch: () => void
}

// OrderHistoryAreaProps
export interface pageRef {
    pageRef: React.RefObject<HTMLDivElement | null>
}

export type ErrorResponse = {
    flag: number
    errors: string[]
    message: string
}
