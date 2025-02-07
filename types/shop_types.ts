import { pageRef } from './account_types'

// sjop slider
export interface ShopItemsProps extends pageRef {
    mode: string
    setMode?: React.Dispatch<React.SetStateAction<string>>
}
