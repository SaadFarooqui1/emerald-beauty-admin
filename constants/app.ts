// export const EndPoint = 'http://192.168.100.37:5000/api/v1'
export const EndPoint = 'https://staging-api.emeraldbeauty.info/api/v1/';
// export const EndPoint = 'http://localhost:4020/api/v1/'
export const ServerAssets = 'http://192.168.100.37:5000';
export const MulterEndPoint = 'https://multer.asle.store';
// allow Extensionsv
export const Extensions = ['image/gif', 'image/jpeg', 'image/png', 'image/jpg', 'application/x-zip-compressed'];

export const Asset = (path: string) => ServerAssets + path;

export const Api = {
    reports: {
        get_sales_by_category: 'get-sales-by-category',
        get_booking_stats: 'get-booking-stats',
    },
    role: {
        all: 'roles',
        get_by_id: 'roles',
        create: 'roles',
        edit: 'roles',
        delete: 'roles',
    },
    coupon: {
        all: 'coupons',
        get_by_id: 'coupons',
        create: 'coupons',
        edit: 'coupons',
        delete: 'coupons',
        editStatus: 'change-coupon-status',
    },
    sections: {
        all: 'sections',
        get_by_id: 'sections',
        edit: 'sections',
    },
    booking: {
        all: 'bookings',
        get_by_id: 'bookings',
        edit: 'update-booking-payment-status',
        editStatus: 'update-booking-status',
    },
    salary: {
        all: 'salaries',
        get_by_id: 'salaries',
        edit: 'update-salary-payment-status',
    },
    category: {
        all: 'categories',
        get_by_id: 'categories',
        create: 'categories',
        edit: 'categories',
        delete: 'categories',
    },
    faq: {
        all: 'faqs',
        get_by_id: 'faqs',
        create: 'faqs',
        edit: 'faqs',
        delete: 'faqs',
    },
    testimonials: {
        all: 'testimonials',
        get_by_id: 'testimonials',
        create: 'testimonials',
        edit: 'testimonials',
        delete: 'testimonials',
    },
    notification: {
        all: 'notification-logs',
        allNotifications: 'notifications',
        unreadCount: 'get-unread-count',
        get_by_id: 'notification-logs',
        create: 'notification-logs',
        markRead: 'mark-read',
        markAllRead: 'mark-all-read',
    },
    service: {
        all: 'services',
        get_by_id: 'services',
        create: 'services',
        edit: 'services',
        delete: 'services',
    },
    leave: {
        all: 'leaves',
        get_by_id: 'leaves',
        edit: 'update-leave-status',
    },
    review: {
        all: 'reviews',
    },
    social_media: {
        all: 'socials',
        get_by_id: 'socials',
        create: 'socials',
        edit: 'socials',
        delete: 'socials',
    },

    staff: {
        create: 'add-user',
        edit: 'update-user',
    },

    employee: {
        create: 'add-user',
        edit: 'update-user',
    },
    freelancer: {
        edit: 'approve-freelancer',
    },
    add_page: {
        get_by_slug: 'page-by-slug',
        create: 'add-page',
    },
    auth: {
        reset_password: {
            reset: '/users/email/reset/password',
            verify: '/users/email/verify',
            update_password: '/users/email/reset/password/update',
        },
        sign_in: '/login',
        sign_up: '/users/signup',
        sign_out: '/users/signout',
        verify: 'me',
    },
    user_module: {
        auth: {
            reset_password: {
                reset: '/users/email/reset/password',
                verify: '/users/email/verify',
                update_password: '/users/email/reset/password/update',
            },
            sign_in: '/users/signin',
            sign_up: '/users/signup',
            sign_out: '/users/signout',
            verify: '/users/verify',
        },
    },
    users: {
        users: {
            all: 'get-users-for-admin',
            get_by_id: 'users',
            create: '/users/create',
            update: '/users/update',
            delete: '/users',
            editStatus: '/change-user-status',
        },
        organization: {
            all: '/superadmin/organization/all',
            create: '/superadmin/organization/create',
            update: '/superadmin/organization/update',
            requests: '/organization/premium/requests',
            send_request: '/organization/premium/send-request',
            approved: '/superadmin/organization/approve-request',
            reject: '/superadmin/organization/reject-request',
            all_requests: '/superadmin/organization/all-requests',
        },
        departments: {
            all: '/users/departments/all',
            create: '/users/departments/create',
            update: '/users/departments/update',
            delete: '/users/departments/delete',
        },
        license: {
            get_all_request_license: '/superadmin/license/get-all-request-license',
            get_assigner_license: '/organization/license/get-assigner-license',
            get_request_license: '/organization/license/get-request-license',
            request_license: '/organization/license/request-license',
            create_assigner_license: '/organization/license/create-license',
            approve_license: '/superadmin/license/approve-license',
            reject_license: '/superadmin/license/reject-license',
        },

        modules: {
            get_all_modules: '/superadmin/content/modules/get',
            create: '/superadmin/content/modules/add',
            update: '/superadmin/content/modules/update',
            delete: '/superadmin/content/modules/delete',
        },

        steps: {
            get_all_module_steps: '/superadmin/content/steps/get',
            create: '/superadmin/content/steps/add',
            update: '/superadmin/content/steps/update',
            delete: '/superadmin/content/steps/delete',
        },
        sub_modules: {
            get_all_sub_modules: '/superadmin/content/sub-modules/get',
            create: '/superadmin/content/sub-modules/add',
            update: '/superadmin/content/sub-modules/update',
            delete: '/superadmin/content/sub-modules/delete',
        },
        sub_bases: {
            get_all_sub_bases_modules: '/superadmin/content/sub-bases/get',
            create: '/superadmin/content/sub-bases/add',
            update: '/superadmin/content/sub-bases/update',
            delete: '/superadmin/content/sub-bases/delete',
        },
        configs: {
            get_all_configs: '/superadmin/content/config',
        },
    },
    multer: {
        upload: '/upload',
        remove: '/remove',
    },
};
export const ON_PAGE_ROCORDS = {
    DEPARTMENTS: 10,
    USERS: 10,
    LICENSE: 10,
    ASSIGNER_LICENSE: 50,
};

export const ROLES = {
    ADMIN: 1,
    FREELANCER: 2,
    EMPLOYEE: 3,
    USER: 4,
    CUSTOM: 4.1,
};
