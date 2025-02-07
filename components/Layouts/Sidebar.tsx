import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { toggleSidebar } from '../../store/themeConfigSlice';
import AnimateHeight from 'react-animate-height';
import { IRootState } from '../../store';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import IconCaretsDown from '@/components/Icon/IconCaretsDown';
import IconMenuDashboard from '@/components/Icon/Menu/IconMenuDashboard';
import IconCaretDown from '@/components/Icon/IconCaretDown';
import IconMinus from '@/components/Icon/IconMinus';
import IconMenuChat from '@/components/Icon/Menu/IconMenuChat';
import IconMenuMailbox from '@/components/Icon/Menu/IconMenuMailbox';
import IconMenuTodo from '@/components/Icon/Menu/IconMenuTodo';
import IconMenuNotes from '@/components/Icon/Menu/IconMenuNotes';
import IconMenuScrumboard from '@/components/Icon/Menu/IconMenuScrumboard';
import IconMenuContacts from '@/components/Icon/Menu/IconMenuContacts';
import IconMenuInvoice from '@/components/Icon/Menu/IconMenuInvoice';
import IconMenuCalendar from '@/components/Icon/Menu/IconMenuCalendar';
import IconMenuComponents from '@/components/Icon/Menu/IconMenuComponents';
import IconMenuElements from '@/components/Icon/Menu/IconMenuElements';
import IconMenuCharts from '@/components/Icon/Menu/IconMenuCharts';
import IconMenuWidgets from '@/components/Icon/Menu/IconMenuWidgets';
import IconMenuFontIcons from '@/components/Icon/Menu/IconMenuFontIcons';
import IconMenuDragAndDrop from '@/components/Icon/Menu/IconMenuDragAndDrop';
import IconMenuTables from '@/components/Icon/Menu/IconMenuTables';
import IconMenuDatatables from '@/components/Icon/Menu/IconMenuDatatables';
import IconMenuForms from '@/components/Icon/Menu/IconMenuForms';
import IconMenuUsers from '@/components/Icon/Menu/IconMenuUsers';
import IconMenuPages from '@/components/Icon/Menu/IconMenuPages';
import IconMenuAuthentication from '@/components/Icon/Menu/IconMenuAuthentication';
import IconMenuDocumentation from '@/components/Icon/Menu/IconMenuDocumentation';
import Image from 'next/image';
import logo from '../../public/assets/images/logo.svg';
import logoDark from '../../public/assets/images/logodarkmode.svg';
import IconUsers from '../Icon/IconUsers';
import IconCreditCard from '../Icon/IconCreditCard';
import IconCalendar from '../Icon/IconCalendar';
import { RiDiscountPercentFill } from 'react-icons/ri';
import { MdNotificationImportant } from 'react-icons/md';
import { RiScissorsFill } from 'react-icons/ri';
import { RxDashboard } from 'react-icons/rx';
import { LuFileSpreadsheet } from 'react-icons/lu';
import { RiShieldUserFill } from 'react-icons/ri';
import { TbFileLike } from 'react-icons/tb';
import { GrLike } from 'react-icons/gr';
import { TbCalendarCheck } from 'react-icons/tb';
import { LuCalendarRange } from 'react-icons/lu';

const Sidebar = () => {
    const router = useRouter();
    const [currentMenu, setCurrentMenu] = useState<string>('');
    const [errorSubMenu, setErrorSubMenu] = useState(false);
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);
    const toggleMenu = (value: string) => {
        setCurrentMenu((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };

    useEffect(() => {
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }, []);

    useEffect(() => {
        setActiveRoute();
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
    }, [router.pathname]);

    useEffect(() => {
        // Update the current menu based on the URL
        if (router.pathname.includes('/dynamic-pages')) {
            setCurrentMenu('dynamic-pages');
        } else if (router.pathname.includes('/staticpages')) {
            setCurrentMenu('staticpages');
        }
    }, [router.pathname]);

    const setActiveRoute = () => {
        let allLinks = document.querySelectorAll('.sidebar ul a.active');
        for (let i = 0; i < allLinks.length; i++) {
            const element = allLinks[i];
            element?.classList.remove('active');
        }
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        selector?.classList.add('active');
    };

    const dispatch = useDispatch();
    const { t } = useTranslation();



    const user = useSelector((state: any) => state?.auth.user);
    const permissions = user?.roles?.[0].permissions;

    const hasPermission = (permissions: any[], permissionToCheck: number) => {
        return permissions?.some((perm: any) => perm?.id === permissionToCheck);
    };

    const filteredPermissions = user?.roles?.[0]?.permissions?.filter(
        (permission: any) => permission.meta.pivot_module_id === 80
    );


    return (
        <div className={semidark ? 'dark' : ''}>
            <nav
                className={`sidebar fixed bottom-0 top-0 z-50 h-full min-h-screen w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}
            >
                <div className="h-full bg-white dark:bg-black">
                    <div className="flex items-center justify-between px-4 py-3">
                        <Link href="/" className="main-logo flex shrink-0 items-center">
                            <Image className="ml-[5px] flex-none dark:hidden" src={logo} alt="logo" />
                            <Image className="ml-[5px] hidden dark:inline" src={logoDark} alt="logo" />
                            {/* <span className="align-middle text-2xl font-semibold ltr:ml-1.5 rtl:mr-1.5 dark:text-white-light lg:inline">{t('Emerald Beauty')}</span> */}
                        </Link>

                        <button
                            type="button"
                            className="collapse-icon flex h-8 w-8 items-center rounded-full transition duration-300 hover:bg-gray-500/10 dark:text-white-light dark:hover:bg-dark-light/10 rtl:rotate-180"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <IconCaretsDown className="m-auto rotate-90" />
                        </button>
                    </div>
                    <PerfectScrollbar className="relative h-[calc(100vh-80px)]">
                        <ul className="relative space-y-0.5 p-4 py-0 font-semibold">
                            {/* <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'dashboard' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('dashboard')}>
                                    <div className="flex items-center">
                                        <IconMenuDashboard className="shrink-0 group-hover:!text-primary" />
                                        <span className={`${currentMenu === 'dashboard' ? 'text-white' : 'text-black'} ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark`}>{t('dashboard')}</span>
                                    </div>

                                    <div className={currentMenu !== 'dashboard' ? '-rotate-90 rtl:rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'dashboard' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <Link href="/">{t('sales')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/analytics">{t('analytics')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/finance">{t('finance')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/crypto">{t('crypto')}</Link>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li> */}

                            {/* <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 px-7 py-3 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                                <IconMinus className="hidden h-5 w-4 flex-none" />
                                <span>{t('apps')}</span>
                            </h2> */}

                            <li className="nav-item mt-2">
                                <ul>

                                    <li className="nav-item">
                                        <Link href="/" className={`group hover:!bg-[#012d22] ${router.pathname === '/' ? 'bg-[#012d22]' : ''}`}>
                                            <div className="flex items-center">
                                                <IconMenuDashboard className={`shrink-0 ${router.pathname === '/' ? '!text-white' : 'text-black'} group-hover:!text-white`} />
                                                <span
                                                    className={`${router.pathname === '/' ? 'text-white' : 'text-black'
                                                        } group-hover:!text-white dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3 rtl:font-['Tajawal'] font-medium`}
                                                >
                                                    {t('dashboard')}
                                                </span>
                                            </div>
                                        </Link>
                                    </li>
                                    {hasPermission(permissions, 40) && (
                                        <li className="nav-item">
                                            <Link href="/usermanagement" className={`group hover:!bg-[#012d22] ${router.pathname === '/usermanagement/user/profile' || router.pathname === '/usermanagement' ? 'bg-[#012d22]' : ''}`}>
                                                <div className="flex items-center">
                                                    <IconMenuUsers
                                                        className={`shrink-0 ${router.pathname === '/usermanagement' || router.pathname === '/usermanagement/user/profile' ? '!text-white' : 'text-black'
                                                            } group-hover:!text-white`}
                                                    />
                                                    <span
                                                        className={`${router.pathname === '/usermanagement' || router.pathname === '/usermanagement/user/profile' ? 'text-white' : 'text-black'
                                                            } group-hover:!text-white dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3 rtl:font-['Tajawal'] font-medium`}
                                                    >
                                                        {t("User Management")}
                                                    </span>
                                                </div>
                                            </Link>
                                        </li>
                                    )}
                                    {hasPermission(permissions, 80) && (
                                        <li className="menu nav-item">
                                            <button type="button" className={`${currentMenu === 'freelancer' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('freelancer')}>
                                                <div className="flex items-center">
                                                    <IconMenuUsers className="shrink-0 group-hover:!text-primary" />
                                                    <span
                                                        className={`${currentMenu === 'freelancer' ? 'text-white' : 'text-black'} dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3 rtl:font-['Tajawal'] font-medium`}
                                                    >
                                                        {t("Freelancer Management")}
                                                    </span>
                                                </div>

                                                <div className={currentMenu !== 'freelancer' ? '-rotate-90 rtl:rotate-90' : ''}>
                                                    <IconCaretDown />
                                                </div>
                                            </button>

                                            <AnimateHeight duration={300} height={currentMenu === 'freelancer' ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-500 rtl:font-['Tajawal'] font-medium">
                                                    {filteredPermissions?.[0].meta.pivot_update === 1 && (
                                                        <li>
                                                            <Link href="/freelancermanagement/freelancerapproval">{t('Freelancers Approval')}</Link>
                                                        </li>
                                                    )}
                                                    <li>
                                                        <Link href="/freelancermanagement/freelancerlist">{t('Freelancers List')}</Link>
                                                    </li>
                                                </ul>
                                            </AnimateHeight>
                                        </li>
                                    )}
                                    {hasPermission(permissions, 70) && (
                                        <li className="nav-item">
                                            <Link href="/employeesmanagement" className={`group hover:!bg-[#012d22] ${router.pathname === '/employeesmanagement/employee/edit' || router.pathname === '/employeesmanagement' ? 'bg-[#012d22]' : ''}`}>
                                                <div className="flex items-center">
                                                    <IconMenuUsers
                                                        className={`shrink-0 ${router.pathname === '/employeesmanagement' || router.pathname === '/employeesmanagement/employee/edit' ? '!text-white' : 'text-black'
                                                            } group-hover:!text-white`}
                                                    />
                                                    <span
                                                        className={`${router.pathname === '/employeesmanagement' || router.pathname === '/employeesmanagement/employee/edit' ? 'text-white' : 'text-black'
                                                            } group-hover:!text-white dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3 rtl:font-['Tajawal'] font-medium`}
                                                    >
                                                        {t("Employees Management")}
                                                    </span>
                                                </div>
                                            </Link>
                                        </li>
                                    )}
                                    {hasPermission(permissions, 30) && (
                                        <li className="menu nav-item">
                                            <button type="button" className={`${currentMenu === 'categories' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('categories')}>
                                                <div className="flex items-center">
                                                    <RxDashboard className="shrink-0 group-hover:!text-primary" />
                                                    <span
                                                        className={`${currentMenu === 'categories' ? 'text-white' : 'text-black'} dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3 rtl:font-['Tajawal'] font-medium`}
                                                    >
                                                        {t('Categories')}
                                                    </span>
                                                </div>

                                                <div className={currentMenu !== 'categories' ? '-rotate-90 rtl:rotate-90' : ''}>
                                                    <IconCaretDown />
                                                </div>
                                            </button>

                                            <AnimateHeight duration={300} height={currentMenu === 'categories' ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-500 rtl:font-['Tajawal'] font-medium">
                                                    <li>
                                                        <Link href="/categories/categories">{t('Categories')}</Link>
                                                    </li>
                                                    {/* <li>
                                                    <Link href="/categories/subcategories">{t('Sub Categories')}</Link>
                                                </li> */}
                                                </ul>
                                            </AnimateHeight>
                                        </li>
                                    )}
                                    {hasPermission(permissions, 60) && (
                                        <li className="nav-item">
                                            <Link href="/servicesmanagement" className={`group hover:!bg-[#012d22] ${router.pathname.includes("/servicesmanagement") ? 'bg-[#012d22]' : ''}`}>
                                                <div className="flex items-center">
                                                    <RiScissorsFill
                                                        className={`shrink-0 ${router.pathname === '/servicesmanagement' || router.pathname === '/servicesmanagement/service/edit' ? '!text-white' : 'text-black'
                                                            } group-hover:!text-white`}
                                                    />
                                                    <span
                                                        className={`${router.pathname === '/servicesmanagement' || router.pathname === '/servicesmanagement/service/edit' ? 'text-white' : 'text-black'
                                                            } group-hover:!text-white dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3 rtl:font-['Tajawal'] font-medium`}
                                                    >
                                                        {t("Services Management")}
                                                    </span>
                                                </div>
                                            </Link>
                                        </li>
                                    )}
                                    {hasPermission(permissions, 20) && (
                                        <li className="menu nav-item">
                                            <button type="button" className={`${currentMenu === 'billing' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('billing')}>
                                                <div className="flex items-center">
                                                    <IconCreditCard className="shrink-0 group-hover:!text-primary" />
                                                    <span className={`${currentMenu === 'billing' ? 'text-white' : 'text-black'} dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3 rtl:font-['Tajawal'] font-medium`}>
                                                        {t('Billing & Payments')}
                                                    </span>
                                                </div>

                                                <div className={currentMenu !== 'billing' ? '-rotate-90 rtl:rotate-90' : ''}>
                                                    <IconCaretDown />
                                                </div>
                                            </button>

                                            <AnimateHeight duration={300} height={currentMenu === 'billing' ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-500 rtl:font-['Tajawal'] font-medium">
                                                    <li>
                                                        <Link href="/billing/freelancersbillinglist">{t('Freelancers List')}</Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/billing/employeebillinglist">{t('Employee List')}</Link>
                                                    </li>
                                                </ul>
                                            </AnimateHeight>
                                        </li>
                                    )}
                                    {hasPermission(permissions, 120) && (
                                        <li className="nav-item">
                                            <Link href="/leaves/leavemanagement" className={`group hover:!bg-[#012d22] ${router.pathname === '/leaves/leavemanagement' ? 'bg-[#012d22]' : ''}`}>
                                                <div className="flex items-center">
                                                    <TbCalendarCheck
                                                        className={`shrink-0 ${router.pathname === '/leaves/leavemanagement' || router.pathname === '/leaves/leavemanagement' ? '!text-white' : 'text-black'
                                                            } group-hover:!text-white`}
                                                    />
                                                    <span
                                                        className={`${router.pathname === '/leaves/leavemanagement' || router.pathname === '/leaves/leavemanagement' ? 'text-white' : 'text-black'
                                                            } group-hover:!text-white dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3 rtl:font-['Tajawal'] font-medium`}
                                                    >
                                                        {t("Leave Management")}
                                                    </span>
                                                </div>
                                            </Link>
                                        </li>
                                    )}
                                    {hasPermission(permissions, 10) && (
                                        <li className="nav-item">
                                            <Link href="/bookingsmanagement" className={`group hover:!bg-[#012d22] ${router.pathname === '/bookingsmanagement' ? 'bg-[#012d22]' : ''}`}>
                                                <div className="flex items-center">
                                                    <LuCalendarRange className={`shrink-0 ${router.pathname === '/bookingsmanagement' ? '!text-white' : 'text-black'} group-hover:!text-white`} />
                                                    <span
                                                        className={`${router.pathname === '/bookingsmanagement' ? 'text-white' : 'text-black'
                                                            } group-hover:!text-white dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3 rtl:font-['Tajawal'] font-medium`}
                                                    >
                                                        {t("Bookings Management")}
                                                    </span>
                                                </div>
                                            </Link>
                                        </li>
                                    )}
                                    {hasPermission(permissions, 110) && (
                                        <li className="nav-item">
                                            <Link
                                                href="/coupons"
                                                className={`group hover:!bg-[#012d22] ${router?.pathname?.includes('/coupons') ? 'bg-[#012d22]' : ''}`}
                                            >
                                                <div className="flex items-center">
                                                    <RiDiscountPercentFill
                                                        className={`shrink-0 ${router.pathname === '/coupons' || router.pathname === '/coupons/edit' || router.pathname === '/coupons/create' ? '!text-white' : 'text-black'
                                                            } group-hover:!text-white`}
                                                    />
                                                    <span
                                                        className={`${router.pathname === '/coupons' || router.pathname === '/coupons/edit' || router.pathname === '/coupons/create' ? 'text-white' : 'text-black'
                                                            } group-hover:!text-white dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3 rtl:font-['Tajawal'] font-medium`}
                                                    >
                                                        {t("Coupons & Discounts")}
                                                    </span>
                                                </div>
                                            </Link>
                                        </li>
                                    )}
                                    {user?.roles?.[0].name === "admin" && (
                                        <li className="nav-item">
                                            <Link
                                                href="/notificationsmanagement"
                                                className={`group hover:!bg-[#012d22] ${router.pathname === '/notificationsmanagement/notification/create' ? 'bg-[#012d22]' : ''}`}
                                            >
                                                <div className="flex items-center">
                                                    <MdNotificationImportant
                                                        className={`shrink-0 ${router.pathname === '/notificationsmanagement' || router.pathname === '/notificationsmanagement/notification/create'
                                                            ? '!text-white'
                                                            : 'text-black'
                                                            } group-hover:!text-white`}
                                                    />
                                                    <span
                                                        className={`${router.pathname === '/notificationsmanagement' || router.pathname === '/notificationsmanagement/notification/create'
                                                            ? 'text-white'
                                                            : 'text-black'
                                                            } group-hover:!text-white dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3 rtl:font-['Tajawal'] font-medium`}
                                                    >
                                                        {t("Notifications Management")}
                                                    </span>
                                                </div>
                                            </Link>
                                        </li>
                                    )}
                                    {hasPermission(permissions, 90) && (
                                        <li className="menu nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'staticpages' || currentMenu === 'dynamic-pages' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => toggleMenu('staticpages')}
                                            >
                                                <div className="flex items-center">
                                                    <LuFileSpreadsheet
                                                        className={`shrink-0 ${router.pathname === '/staticpages/staticpagemanagement' || router.pathname === '/staticpages/staticpagemanagement'
                                                            ? '!text-white'
                                                            : 'text-black'
                                                            } group-hover:!text-white`}
                                                    />
                                                    <span
                                                        className={`${currentMenu === 'staticpages' || currentMenu === 'dynamic-pages' ? 'text-white' : 'text-black'
                                                            } dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3 rtl:font-['Tajawal'] font-medium`}
                                                    >
                                                        {t('Static Pages')}
                                                    </span>
                                                </div>

                                                <div className={currentMenu !== 'staticpages' && currentMenu !== 'dynamic-pages' ? '-rotate-90 rtl:rotate-90' : ''}>
                                                    <IconCaretDown />
                                                </div>
                                            </button>

                                            <AnimateHeight duration={300} height={currentMenu === 'staticpages' || currentMenu === 'dynamic-pages' ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-500 rtl:font-['Tajawal'] font-medium">
                                                    <li>
                                                        <Link href="/staticpages/home">{t('Home')}</Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/staticpages/about">{t('About')}</Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/staticpages/services">{t('Our Services')}</Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/staticpages/contactus">{t('Contact Us')}</Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/staticpages/faqs/faqs">{t('FAQs')}</Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/staticpages/testimonials/testimonialslist">{t('Testimonials')}</Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/dynamic-pages/privacy-policy">{t('Privacy Policy')}</Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/dynamic-pages/refunding-policy">{t('Refunding Policy')}</Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/dynamic-pages/terms-and-conditions">{t('Terms and Conditions')}</Link>
                                                    </li>
                                                </ul>
                                            </AnimateHeight>
                                        </li>
                                    )}
                                    {hasPermission(permissions, 50) && (
                                        <li className="menu nav-item">
                                            <button type="button" className={`${currentMenu === 'permission' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('permission')}>
                                                <div className="flex items-center">
                                                    <RiShieldUserFill className="shrink-0 group-hover:!text-primary" />
                                                    <span
                                                        className={`${currentMenu === 'permission' ? 'text-white' : 'text-black'} dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3 rtl:font-['Tajawal'] font-medium`}
                                                    >
                                                        {t('Permissions')}
                                                    </span>
                                                </div>

                                                <div className={currentMenu !== 'permission' ? '-rotate-90 rtl:rotate-90' : ''}>
                                                    <IconCaretDown />
                                                </div>
                                            </button>

                                            <AnimateHeight duration={300} height={currentMenu === 'permission' ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-500 rtl:font-['Tajawal'] font-medium">
                                                    <li>
                                                        <Link href="/permissions/rolesmanagement">{t('Roles Management')}</Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/permissions/staffmanagement">{t('Staff Management')}</Link>
                                                    </li>
                                                </ul>
                                            </AnimateHeight>
                                        </li>
                                    )}
                                    {hasPermission(permissions, 100) && (
                                        <li className="nav-item">
                                            <Link
                                                href="/socialmedia"
                                                className={`group hover:!bg-[#012d22] ${router?.pathname?.includes("/socialmedia") ? 'bg-[#012d22]' : ''}`}
                                            >
                                                <div className="flex items-center">
                                                    <TbFileLike
                                                        className={`shrink-0 ${router.pathname === '/socialmedia' ||
                                                            router.pathname === '/socialmedia/create' ||
                                                            router.pathname === '/socialmedia/edit' ||
                                                            router.pathname === '/permissions/createrole'
                                                            ? '!text-white'
                                                            : 'text-black'
                                                            } group-hover:!text-white`}
                                                    />
                                                    <span
                                                        className={`${router.pathname === '/socialmedia' || router.pathname === '/socialmedia/create' || router.pathname === '/socialmedia/edit'
                                                            ? 'text-white'
                                                            : 'text-black'
                                                            } group-hover:!text-white dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3 rtl:font-['Tajawal'] font-medium`}
                                                    >
                                                        {t("Social Media Links")}
                                                    </span>
                                                </div>
                                            </Link>
                                        </li>
                                    )}
                                    {/* <li className="nav-item">
                                        <Link href="/apps/chat" className="group">
                                            <div className="flex items-center">
                                                <IconMenuChat className="shrink-0 group-hover:!text-primary" />
                                                <span className={`${router.pathname === '/apps/chat' ? 'text-white' : 'text-black'} ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark`}>{t('chat')}</span>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="/apps/mailbox" className="group">
                                            <div className="flex items-center">
                                                <IconMenuMailbox className="shrink-0 group-hover:!text-primary" />
                                                <span className={`${router.pathname === '/apps/mailbox' ? 'text-white' : 'text-black'} ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark`}>{t('mailbox')}</span>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="/apps/todolist" className="group">
                                            <div className="flex items-center">
                                                <IconMenuTodo className="shrink-0 group-hover:!text-primary" />
                                                <span className={`${router.pathname === '/apps/todolist' ? 'text-white' : 'text-black'} ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark`}>{t('todo_list')}</span>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="/apps/notes" className="group">
                                            <div className="flex items-center">
                                                <IconMenuNotes className={`shrink-0 group-hover:!text-primary`} />
                                                <span className={`${router.pathname === '/apps/notes' ? 'text-white' : 'text-black'} ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark`}>{t('notes')}</span>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="/apps/scrumboard" className="group">
                                            <div className="flex items-center">
                                                <IconMenuScrumboard className="shrink-0 group-hover:!text-primary" />
                                                <span className={`${router.pathname === '/apps/scrumboard' ? 'text-white' : 'text-black'} ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark`}>{t('scrumboard')}</span>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="/apps/contacts" className="group">
                                            <div className="flex items-center">
                                                <IconMenuContacts className="shrink-0 group-hover:!text-primary" />
                                                <span className={`${router.pathname === '/apps/contacts' ? 'text-white' : 'text-black'} ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark`}>{t('contacts')}</span>
                                            </div>
                                        </Link>
                                    </li>

                                    <li className="menu nav-item">
                                        <button type="button" className={`${currentMenu === 'invoice' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('invoice')}>
                                            <div className="flex items-center">
                                                <IconMenuInvoice className="shrink-0 group-hover:!text-primary" />
                                                <span className={`${currentMenu === 'invoice' ? 'text-white' : 'text-black'} ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark`}>{t('invoice')}</span>
                                            </div>

                                            <div className={currentMenu !== 'invoice' ? '-rotate-90 rtl:rotate-90' : ''}>
                                                <IconCaretDown />
                                            </div>
                                        </button>

                                        <AnimateHeight duration={300} height={currentMenu === 'invoice' ? 'auto' : 0}>
                                            <ul className="sub-menu text-gray-500">
                                                <li>
                                                    <Link href="/apps/invoice/list">{t('list')}</Link>
                                                </li>
                                                <li>
                                                    <Link href="/apps/invoice/preview">{t('preview')}</Link>
                                                </li>
                                                <li>
                                                    <Link href="/apps/invoice/add">{t('add')}</Link>
                                                </li>
                                                <li>
                                                    <Link href="/apps/invoice/edit">{t('edit')}</Link>
                                                </li>
                                            </ul>
                                        </AnimateHeight>
                                    </li>

                                    <li className="nav-item">
                                        <Link href="/apps/calendar" className="group">
                                            <div className="flex items-center">
                                                <IconMenuCalendar className="shrink-0 group-hover:!text-primary" />
                                                <span className={`${router.pathname === '/apps/calendar' ? 'text-white' : 'text-black'} ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark`}>{t('calendar')}</span>
                                            </div>
                                        </Link>
                                    </li> */}
                                </ul>
                            </li>

                            {/* <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 px-7 py-3 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                                <IconMinus className="hidden h-5 w-4 flex-none" />
                                <span>{t('user_interface')}</span>
                            </h2>

                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'component' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('component')}>
                                    <div className="flex items-center">
                                        <IconMenuComponents className="shrink-0 group-hover:!text-primary" />
                                        <span className={`${currentMenu === 'component' ? 'text-white' : 'text-black'} ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark`}>{t('components')}</span>
                                    </div>

                                    <div className={currentMenu !== 'component' ? '-rotate-90 rtl:rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'component' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <Link href="/components/tabs">{t('tabs')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/components/accordions">{t('accordions')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/components/modals">{t('modals')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/components/cards">{t('cards')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/components/carousel">{t('carousel')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/components/countdown">{t('countdown')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/components/counter">{t('counter')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/components/sweetalert">{t('sweet_alerts')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/components/timeline">{t('timeline')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/components/notifications">{t('notifications')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/components/media-object">{t('media_object')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/components/list-group">{t('list_group')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/components/pricing-table">{t('pricing_tables')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/components/lightbox">{t('lightbox')}</Link>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'element' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('element')}>
                                    <div className="flex items-center">
                                        <IconMenuElements className="shrink-0 group-hover:!text-primary" />
                                        <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t('elements')}</span>
                                    </div>

                                    <div className={currentMenu !== 'element' ? '-rotate-90 rtl:rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'element' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <Link href="/elements/alerts">{t('alerts')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/elements/avatar">{t('avatar')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/elements/badges">{t('badges')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/elements/breadcrumbs">{t('breadcrumbs')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/elements/buttons">{t('buttons')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/elements/buttons-group">{t('button_groups')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/elements/color-library">{t('color_library')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/elements/dropdown">{t('dropdown')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/elements/infobox">{t('infobox')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/elements/jumbotron">{t('jumbotron')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/elements/loader">{t('loader')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/elements/pagination">{t('pagination')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/elements/popovers">{t('popovers')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/elements/progress-bar">{t('progress_bar')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/elements/search">{t('search')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/elements/tooltips">{t('tooltips')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/elements/treeview">{t('treeview')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/elements/typography">{t('typography')}</Link>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            <li className="menu nav-item">
                                <Link href="/charts" className="group">
                                    <div className="flex items-center">
                                        <IconMenuCharts className="shrink-0 group-hover:!text-primary" />
                                        <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t('charts')}</span>
                                    </div>
                                </Link>
                            </li>

                            <li className="menu nav-item">
                                <Link href="/widgets" className="group">
                                    <div className="flex items-center">
                                        <IconMenuWidgets className="shrink-0 group-hover:!text-primary" />
                                        <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t('widgets')}</span>
                                    </div>
                                </Link>
                            </li>

                            <li className="menu nav-item">
                                <Link href="/font-icons" className="group">
                                    <div className="flex items-center">
                                        <IconMenuFontIcons className="shrink-0 group-hover:!text-primary" />
                                        <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t('font_icons')}</span>
                                    </div>
                                </Link>
                            </li>

                            <li className="menu nav-item">
                                <Link href="/dragndrop" className="group">
                                    <div className="flex items-center">
                                        <IconMenuDragAndDrop className="shrink-0 group-hover:!text-primary" />
                                        <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t('drag_and_drop')}</span>
                                    </div>
                                </Link>
                            </li>

                            <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 px-7 py-3 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                                <IconMinus className="hidden h-5 w-4 flex-none" />
                                <span>{t('tables_and_forms')}</span>
                            </h2>

                            <li className="menu nav-item">
                                <Link href="/tables" className="group">
                                    <div className="flex items-center">
                                        <IconMenuTables className="shrink-0 group-hover:!text-primary" />
                                        <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t('tables')}</span>
                                    </div>
                                </Link>
                            </li>

                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'datalabel' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('datalabel')}>
                                    <div className="flex items-center">
                                        <IconMenuDatatables className="shrink-0 group-hover:!text-primary" />
                                        <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t('datatables')}</span>
                                    </div>

                                    <div className={currentMenu !== 'datalabel' ? '-rotate-90 rtl:rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'datalabel' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <Link href="/datatables/basic">{t('basic')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/datatables/advanced">{t('advanced')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/datatables/skin">{t('skin')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/datatables/order-sorting">{t('order_sorting')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/datatables/multi-column">{t('multi_column')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/datatables/multiple-tables">{t('multiple_tables')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/datatables/alt-pagination">{t('alt_pagination')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/datatables/checkbox">{t('checkbox')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/datatables/range-search">{t('range_search')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/datatables/export">{t('export')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/datatables/column-chooser">{t('column_chooser')}</Link>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'forms' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('forms')}>
                                    <div className="flex items-center">
                                        <IconMenuForms className="shrink-0 group-hover:!text-primary" />
                                        <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t('forms')}</span>
                                    </div>

                                    <div className={currentMenu !== 'forms' ? '-rotate-90 rtl:rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'forms' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <Link href="/forms/basic">{t('basic')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/forms/input-group">{t('input_group')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/forms/layouts">{t('layouts')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/forms/validation">{t('validation')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/forms/input-mask">{t('input_mask')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/forms/select2">{t('select2')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/forms/touchspin">{t('touchspin')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/forms/checkbox-radio">{t('checkbox_and_radio')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/forms/switches">{t('switches')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/forms/wizards">{t('wizards')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/forms/file-upload">{t('file_upload')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/forms/quill-editor">{t('quill_editor')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/forms/markdown-editor">{t('markdown_editor')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/forms/date-picker">{t('date_and_range_picker')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/forms/clipboard">{t('clipboard')}</Link>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 px-7 py-3 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                                <IconMinus className="hidden h-5 w-4 flex-none" />
                                <span>{t('user_and_pages')}</span>
                            </h2>

                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'users' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('users')}>
                                    <div className="flex items-center">
                                        <IconMenuUsers className="shrink-0 group-hover:!text-primary" />
                                        <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t('users')}</span>
                                    </div>

                                    <div className={currentMenu !== 'users' ? '-rotate-90 rtl:rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'users' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <Link href="/users/profile">{t('profile')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/users/user-account-settings">{t('account_settings')}</Link>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'page' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('page')}>
                                    <div className="flex items-center">
                                        <IconMenuPages className="shrink-0 group-hover:!text-primary" />
                                        <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t('pages')}</span>
                                    </div>

                                    <div className={currentMenu !== 'page' ? '-rotate-90 rtl:rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'page' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <Link href="/pages/knowledge-base">{t('knowledge_base')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/pages/contact-us-boxed" target="_blank">
                                                {t('contact_us_boxed')}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/pages/contact-us-cover" target="_blank">
                                                {t('contact_us_cover')}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/pages/faq">{t('faq')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/pages/coming-soon-boxed" target="_blank">
                                                {t('coming_soon_boxed')}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/pages/coming-soon-cover" target="_blank">
                                                {t('coming_soon_cover')}
                                            </Link>
                                        </li>
                                        <li className="menu nav-item">
                                            <button
                                                type="button"
                                                className={`${errorSubMenu ? 'open' : ''
                                                    } w-full before:h-[5px] before:w-[5px] before:rounded before:bg-gray-300 hover:bg-gray-100 ltr:before:mr-2 rtl:before:ml-2 dark:text-[#888ea8] dark:hover:bg-gray-900`}
                                                onClick={() => setErrorSubMenu(!errorSubMenu)}
                                            >
                                                {t('error')}
                                                <div className={`${errorSubMenu ? '-rotate-90 rtl:rotate-90' : ''} ltr:ml-auto rtl:mr-auto`}>
                                                    <IconCaretsDown fill={true} className="h-4 w-4" />
                                                </div>
                                            </button>
                                            <AnimateHeight duration={300} height={errorSubMenu ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-500">
                                                    <li>
                                                        <a href="/pages/error404" target="_blank">
                                                            {t('404')}
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="/pages/error500" target="_blank">
                                                            {t('500')}
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="/pages/error503" target="_blank">
                                                            {t('503')}
                                                        </a>
                                                    </li>
                                                </ul>
                                            </AnimateHeight>
                                        </li>

                                        <li>
                                            <Link href="/pages/maintenence" target="_blank">
                                                {t('maintenence')}
                                            </Link>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'auth' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('auth')}>
                                    <div className="flex items-center">
                                        <IconMenuAuthentication className="shrink-0 group-hover:!text-primary" />
                                        <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t('authentication')}</span>
                                    </div>

                                    <div className={currentMenu !== 'auth' ? '-rotate-90 rtl:rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'auth' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <Link href="/auth/boxed-signin" target="_blank">
                                                {t('login_boxed')}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/auth/boxed-signup" target="_blank">
                                                {t('register_boxed')}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/auth/boxed-lockscreen" target="_blank">
                                                {t('unlock_boxed')}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/auth/boxed-password-reset" target="_blank">
                                                {t('recover_id_boxed')}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/auth/cover-login" target="_blank">
                                                {t('login_cover')}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/auth/cover-register" target="_blank">
                                                {t('register_cover')}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/auth/cover-lockscreen" target="_blank">
                                                {t('unlock_cover')}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/auth/cover-password-reset" target="_blank">
                                                {t('recover_id_cover')}
                                            </Link>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li> */}
                            {/* 
                            <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 px-7 py-3 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                                <IconMinus className="hidden h-5 w-4 flex-none" />
                                <span>{t('supports')}</span>
                            </h2> */}
                        </ul>
                    </PerfectScrollbar>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
