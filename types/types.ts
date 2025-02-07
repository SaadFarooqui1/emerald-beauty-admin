import { DepartmentsT } from '@/types'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import { AddressT } from './account_types'
import { CategoryI } from './category_types'
import { RoleI } from './role_types'
import { documentsI } from './document_types'
import { ServiceI } from './service_types'
import { potfolioI } from './potfolio_types'
import { cretificatesI } from './certificates_types'

// extended app props
export type ExtendAppProps = AppProps & {
    Component: NextPage
}
// submenu type
export type SubMenuItem = {
    link: string
    title: string
}
// menu item type
export type MenuItem = {
    id: number
    mega_menu: boolean
    has_dropdown: boolean
    title: string
    link: string
    active: string
    sub_menus?: SubMenuItem[]
}

// utils in use

export type ErrorMsgProps = {
    error?: string
}

// spinner props

export type SpinnerProps = {
    class?: string
}

// buttopn types

export interface ButtonProps {
    class: string
    type: 'button' | 'submit' | 'reset' | undefined
    Loader?: boolean
    disabled?: boolean
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    Text: React.ReactNode
    spinnerClass?: string
}

// HeadBannerprops

export type HeadBannerProps = {
    title: string
}

export type EventSpaceHeadBannerProps = {
    title: string
    video: string
}

// InputBoxProps
export interface InputBoxProps {
    col?: string
    required?: boolean
    label?: string
    type?: string
    placeholder?: string
    value?: string
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    disabled?: boolean
    name?: string
    id?: string
    label_btn?: React.ReactNode
    label_class?: string
    addicon?: boolean
    btnonClick?: React.MouseEventHandler<HTMLButtonElement>
}

// Pagination type
type Link = {
    url: string | null
    label: string
    active: boolean
}
export interface Pagination<T> {
    meta: PaginationMetaI
    data: T[]
}

interface PaginationMetaI {
    per_page: number
    total: number
    last_page: number
    current_page: number
}

export interface SuccessResponseI {
    flag: number
    message?: string
}

// export user Interface

export type RolesT = {
    id: number;
    name: string;
    all: string[]
}



export interface ModuleResponseI {
    id: number
    name: string
    created_at: string
    updated_at: string
}


export interface UserResponseI {
    id: number
    first_name: string
    last_name: string
    email?: string
    phone?: string
    is_approved: boolean
    address: string
    shift_start_time: string
    shift_end_time: string
    is_active: boolean
    user_categories?: IUserCategories[]
    user_services?: ServiceI[]
    roles: RoleI[]
    created_at: string
    updated_at: string
    user_name: string
    payment_status_text: string
    meta?: {
        bookings_count?: number
    }
    salary: string
    user_image: {
        mediaUrl: string
    }
    password: string
    service_id: number
    category_id: number
    avatar: string
    documents: documentsI[]
    payment_information: {
        name: string
        bank_name: string
        account_number: number
    }
}

interface IUserCategories {
    category: Partial<CategoryI>
    documents: documentsI[]
    potfolio: potfolioI[]
    certificates: cretificatesI[]
}

export interface OrganizationUpdateI {
    id: number
    first_name: string
    last_name: string
    email: string
}



export interface ModuleUpdateI {
    id: number
    name: string
}


export interface SubModuleUpdateI {
    id: number
    main_module_id: number
    module_steps_id: number
    name: string
    type: string
}



export interface ModuleStepUpdateI {
    main_module_id: number
    id: number
    name: string
}


export interface UserUpdateI extends OrganizationUpdateI {
    department: DepartmentsT;
    user_type: string
}






export interface ModuleType {
    id: number
    name: string
    created_at: string
    updated_at: string
}


export interface ModuleSetpType {
    id: number
    main_module_id: number
    name: string
    short_description: string
    status: number
    other: string | null
    created_at: string
    updated_at: string
}


export interface SubModuleType {
    id: number
    main_module_id: number
    module_steps_id: number
    name: string
    type: string
    short_description: string
    status: number
    other: string | null
    created_at: string
    updated_at: string
}


export interface ConfigType extends SuccessResponseI {
    module_types: string[]
}

export type variationT = {
    id: number
    product_id: number
    sku: string
    code: string
    price: number
}

export interface Product {
    id: number
    name: string
    artist_name: string | null
    slug: string
    short_description: string
    description: string
    min_price: number
    max_price: number
    discount_value: number
    discount_type: string | null
    discount_start_date: number | null
    discount_end_date: number | null
    stock_qty: number
    has_variation: number
    priority: number
    feature_image: string
    brand_name: string
    product_images: string[]
    is_wishlist: boolean
    variation: variationT
}

export interface GetDataResponseI<T> extends SuccessResponseI {
    data: T
}

// product view paramsprops

export type ItemDetailsViewPageProps = {
    id: number | string
    slug: string
}


export type ItemDetailsViewModulePageProps = {
    id: string
    slug: string
}



export type ItemDetailsViewSubModulePageProps = {
    id: string
    sub_id: string
    slug: string
}

export type VariationValueType = {
    id: number
    name: string
    code: string | null
}

export type VariationType = {
    id: number
    name: string
    values: VariationValueType[]
}

export interface ProductViewI {
    item: Product
    variations: VariationType[]
}

// Eror Response

export interface GenSuccessResponseI<T> extends SuccessResponseI {
    data: T
}

// user viery repsonse

export interface UserVerifyResponseI extends SuccessResponseI {
    user: UserResponseI
}

// Cart PayloadT

export type CartPayloadT = {
    product_variation_id: string | number | null
    quantity: number
    guest_id?: string | number
}

export type ProductVariationInfoT = {
    id: number
    price: number
    discounted_price: number
    stock: number
} | null

export interface ProductVariation {
    id: number
    value_id: number
}

export type VariationSchemaT =
    | {
        product_id: number | null
        variations: ProductVariation[]
    }
    | []

export interface CartProductI {
    id: number
    qty: number
    product: Product
    variations: VariationType[]
    selected_variation: variationT
}

export interface CartI {
    cartCount: number
    qty: number
    subTotal: string
    couponCode: string
    couponDiscount: string
    vat: string
    delivery_charges: string
    Total: string
    carts: CartProductI[]
}

// CartQty

export type CartQtyProps = {
    id: number
    qty: number
    cart_refresh: () => void
}

// cart payload

export type CartIncDecPayload = {
    cart_id: number
    qty: number
    guest_id?: string | number
}

// cart Remove Payload Params

export type CartRemovePayload = {
    cart_id: number
    guest_id?: string | number
}

export type CartItemRemoveType = {
    id: number
    cart_refetch: () => void
}

export type CheckoutItem = {
    cart_item: CartProductI
}

export interface ProfileResponseI extends SuccessResponseI {
    avatar: string
}

// Wishlist
export interface WishListI {
    id: number
    item: Product
}

/// Order History Type
interface ConnectedVariation {
    id: number
    name: string
    values: { id: number; name: string; code: string | null }[]
}

interface ProductOrder {
    id: number
    name: string
    slug: string
    short_description: string | null
    description: string
    min_price: number
    max_price: number
    discount_value: number
    discount_type: string | null
    discount_start_date: number
    discount_end_date: number
    stock_qty: number
    has_variation: number
    priority: number
    feature_image: string
    product_images: string[]
    is_wishlist: boolean
    variation: {
        id: number
        product_id: number
        sku: string
        code: string
        price: number
    }
}

interface OrderProduct {
    id: number
    order_id: number
    product_variation_id: number
    qty: number
    unit_price: number
    total_tax: number
    total_price: number
    connected_variations: ConnectedVariation[]
    created_at: string
    updated_at: string
    product: ProductOrder
}

export interface OrderDataResponseI {
    id: number
    delivery_status: string
    payment_status: string
    payment_method: string
    payment_type: string
    applied_coupon_code: string | null
    coupon_discount_amount: string
    shipping_cost: number
    address: AddressT | null
    created_at: string
    updated_at: string
    orderId: string
    products: OrderProduct[]
    subTotal: string
    vat: string
    delivery_charges: string
    Total: string
}

// order Reviews Response

export interface OrderReviewDataResponseI extends OrderDataResponseI {
    review: {
        order_id: number
        rating: number
        reviews: string
    } | null
}

// RatingForm

export type RatingFormT = {
    order_id: number
    refetch: () => void
}

export type OrderTrackPageProps = {
    id: string | number
}

export interface CheckoutResponseI extends SuccessResponseI {
    type: string
    order_id: number
    order_id_prefix: string
    trak_id: number
    client_secret?: string
}

// SliderItemProps
export interface SliderItemProps {
    data: {
        id: number
        name: string
        slug: string
        feature_image: string
    }
    path: string
}

// global

export type GlobalSliceType = {
    home_mode: string
    carts_qty: number
    search: string
}
export type EventFilterSliceT = {
    min: number
    max: number
    query: string
    date: string
    time: string
    interest: number[]
    category: number
    from_date: string
    to_date: string
}

export type ShopFilterSliceT = {
    brand: number
    query: string
    category: number
    min: number
    max: number
    artist: string
}

export type SpacesFilterSliceT = {
    query: string
    guests: number
    min: number
    max: number
    venue: string
    type: number
}

export type FilterSliceType = {
    events: EventFilterSliceT
    events_loading: boolean
    shop: ShopFilterSliceT
    shop_loading: boolean
    spaces: SpacesFilterSliceT
    space_loading: boolean
}

export type ShopsSliceType = {
    home_mode: string
    carts_qty: number
}

export type SpacesSliceType = {
    home_mode: string
    carts_qty: number
}

// event types

export interface EventType {
    id: number
    name: string
    price: number
}

export interface Event {
    id: number
    event_category_id: number | null
    name: string
    organizer_name: string
    slug: string
    start_date: string
    end_date: string
    start_time: string
    end_time: string
    location: string
    lat: number
    long: number
    description: string
    created_at: string
    updated_at: string
    feature_image: string
    feature_banner: string
    start_time_renew: string
    end_time_renew: string
    types?: EventType[]
    is_wishlist: boolean
    is_featured: number
}

// Event wishlist

export interface EventWishlist {
    id: number
    event_id: number
    event: Event
}

// event and Space
export type EventAndSpaceCategory = {
    id: number
    name: string
}

// event ticket history
export interface Ticket {
    id: number
    name: string
    price: number
    token: string
    qty: number
    is_verified: number
}

export interface EventBooking {
    id: number
    payment_method: string
    payment_type: string
    applied_coupon_code: string | null
    coupon_discount_amount: number
    sub_total_amount: number
    grand_total_amount: number
    booking_mode: number
    payment_status: string
    created_at: string
    updated_at: string
    event: Event
    tickets: Ticket[]
    all_tickets: Ticket[]
}

export interface CouponResponse {
    duration: number
    sub_total: number
    discount: number
    total: number
    service_charges: number
}

export interface WorkSpaceCouponResponse {
    sub_total: number
    discount: number
    total: number
}

export interface WorkspaceCouponResponse extends CouponResponse {
    service_charges: number
}

// export BookingCheckoutResponse

export interface BookingCheckoutResponse {
    client_secret: string
}

// events coupon and checkout

export interface EventCouponPayloadI {
    from: string
    code: string
    payment_method: string
    event_id: number
    discount: number
    subtotal: number
    total: number
    [key: string]: string | number
}

// workspace Coupon and checkout

export interface WorkSpaceCouponPayloadI {
    from: string
    code: string
    date: string
    payment_method: string
    workspace_id: number
    duration: number
    discount: number
    subtotal: number
    total: number
    service_charges: number
    start_time: string
    end_time: string
}

export type IdNameT = {
    id: number
    name: string
}

export type EventSidebarT = {
    max: number
    interest: IdNameT[]
    categories: IdNameT[]
}

export type ProductSidebarT = {
    max: number
    brands: IdNameT[]
    categories: IdNameT[]
    artists: string[]
}
export type SpaceSidebarT = {
    max: number
    max_guest: number
    types: IdNameT[]
}

// ALl Serch Type

export type allItemsT = {
    query?: string
    page?: number
    category?: number
    take?: number
    type?: number
}

export type FaqType = {
    id?: number
    faq_category?: string
    question: string
    answer: string
    category?: string
    created_at?: string
    updated_at?: string
}

export type allItemsCouponsT = {
    query?: string
    page?: number
    category?: number
    take?: number
    type?: number
    from?: string
}

// SoloEventItemI
export interface SoloEventItemI {
    event: Event
    loading: boolean
    eventsRefetch: () => void
}

// CouponsType
export interface CouponsType {
    code: string
    discount_type?: string
    discount_value: number
    start_date?: string
    end_date?: string
    min_spend?: number
    max_discount_amount?: number
    query?: string
    page: number
}

// workspace

export interface WorkSpace {
    id: number
    workspace_type_id: number
    name: string
    slug: string
    venue_type: string
    price: number
    number_of_guests_allowed: number
    opening_time: string | null
    closing_time: string | null
    location: string
    lat: number
    long: number
    short_description: string
    description: string
    is_featured: number
    service_charges: number
    created_at: string
    updated_at: string
    feature_image: string
    is_wishlist: boolean
    medias: Media[]
}

export interface Media {
    path: string
    type: string
}

export interface WorkSpaceBooking {
    id: number
    duration: number
    booking_date: string
    start_time: string
    end_time: string
    payment_status: string
    payment_method: string
    payment_type: string
    applied_coupon_code: string
    coupon_discount_amount: number
    sub_total_amount: number
    grand_total_amount: number
    price: number
    service_charges: number
    created_at: string
    updated_at: string
    start_time_renew: string
    end_time_renew: string
    clone_workspace: WorkSpace
}

export interface WorkSpaceWishList {
    id: number
    workspace_id: number
    workspace: WorkSpace
}

export interface PageType {
    title: string
    content: string
}

export interface ContactUsType {
    contact_us_heading: string
    contact_us_short_description: string
    contact_us_phone_number: string
    contact_us_email: string
    contact_us_address: string
}

export interface WorkSpaceTypes extends EventAndSpaceCategory { }

export type WorkSpaceItemProps = {
    workspace: WorkSpace
    isWorkspaceFetching: boolean
    workspaceRefetch: () => void
}

export interface TicketDataProp {
    ticket: Ticket
    name: Event['name']
    start_date: Event['start_date']
    end_date: Event['end_date']
    location: Event['location']
    description: Event['description']
    feature_image: Event['feature_image']
    start_time_renew: Event['start_time_renew']
    end_time_renew: Event['end_time_renew']
}

// share model propTypes
export interface ShareComponentProps {
    ShowModelVisible: boolean
    setModalVisibility: (isVisible: boolean) => void
    facebookShare: string
    linkedInShare: string
    twitterShare: string
    whatsappShare: string
    title?: string
    description?: string
    image?: string
    url?: string
}

// s

export type MetaPropsT<T> = {
    id: number
    slug: string
    item: T
}

export type NotificationsT = {
    title: string
    from: string
    body: string
    time: string
}


// export interface Pagination<T> {
//     current_page: number
//     data: T[]
//     first_page_url: string
//     from: number
//     last_page: number
//     last_page_url: string
//     links: Link[]
//     next_page_url: string | null
//     path: string
//     per_page: number
//     prev_page_url: string | null
//     to: number
//     total: number
// }


// export interface Categories {
//     name: string
//     id: number
// }

// export interface CategoriesResponse {
//     data: {
//         data: Categories[]; // Nested array of categories
//     };
// }