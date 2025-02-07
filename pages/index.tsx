import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../store';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { setPageTitle } from '../store/themeConfigSlice';
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});
import Link from 'next/link';
import IconHorizontalDots from '@/components/Icon/IconHorizontalDots';
import IconDollarSign from '@/components/Icon/IconDollarSign';
import IconInbox from '@/components/Icon/IconInbox';
import IconTag from '@/components/Icon/IconTag';
import IconCreditCard from '@/components/Icon/IconCreditCard';
import IconShoppingCart from '@/components/Icon/IconShoppingCart';
import IconArrowLeft from '@/components/Icon/IconArrowLeft';
import IconCashBanknotes from '@/components/Icon/IconCashBanknotes';
import IconUser from '@/components/Icon/IconUser';
import IconNetflix from '@/components/Icon/IconNetflix';
import IconBolt from '@/components/Icon/IconBolt';
import IconPlus from '@/components/Icon/IconPlus';
import IconCaretDown from '@/components/Icon/IconCaretDown';
import IconMultipleForwardRight from '@/components/Icon/IconMultipleForwardRight';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import ReactStars from '@stack-pulse/react-star-rating';
import { useModelGetUsers } from '@/models/user.model';
import { ROLES } from '@/constants/app';
import { UserResponseI } from '@/types/types';
import { useModelGetServices } from '@/models/service.model';
import { useModelGetReviews } from '@/models/review.model';
import { useModelGetBookingStats, useModelGetSalesByCategory } from '@/models/reports.model';
import { useTranslation } from 'react-i18next';

const Index = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Dashboard'));
    });
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const { t } = useTranslation();
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    });

    const { data: salesByCategoryData, isLoading: isSalesReportLoading, isError: isSalesReportError, refetch: refetchSalesByCategory } = useModelGetSalesByCategory({
    });

    const { data: bookingStats, isLoading: isBookingStatsLoading, isError: isBookingStatsError, refetch: refetchBookingStats } = useModelGetBookingStats({
    });


    const totalAdminCut = bookingStats?.reduce((total, state) => {
        return total + (state?.admin_cut || 0); // Add admin_cut or default to 0 if undefined
    }, 0);

    //Revenue Chart
    const revenueChart: any = {
        series: [
            {
                name: t('Revenue'),
                data: bookingStats?.map((state) => state?.total_revenue || 0),
            },
            {
                name: t('Profit'),
                data: bookingStats?.map((state) => state?.admin_cut || 0),
            },
        ],
        options: {
            chart: {
                height: 325,
                type: 'area',
                fontFamily: 'Raleway, sans-serif',
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
            },

            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                curve: 'smooth',
                width: 2,
                lineCap: 'square',
            },
            dropShadow: {
                enabled: true,
                opacity: 0.2,
                blur: 10,
                left: -7,
                top: 22,
            },
            colors: isDark ? ['#006149', '#1BD9BF'] : ['#012D22', '#1BD9BF'],
            markers: {
                discrete: [
                    {
                        seriesIndex: 0,
                        dataPointIndex: 6,
                        fillColor: isDark ? '#006149' : '#012D22',
                        strokeColor: 'transparent',
                        size: 7,
                    },
                    {
                        seriesIndex: 1,
                        dataPointIndex: 5,
                        fillColor: '#1BD9BF',
                        strokeColor: 'transparent',
                        size: 7,
                    },
                ],
            },
            labels: [t('Mon'), t('Tue'), t('Wed'), t('Thu'), t('Fri'), t('Sat'), t('Sun')],
            xaxis: {
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
                crosshairs: {
                    show: true,
                },
                labels: {
                    offsetX: isRtl ? 2 : 0,
                    offsetY: 5,
                    style: {
                        fontSize: '12px',
                        fontFamily: isRtl ? 'Tajawal' : 'Raleway, sans-serif',
                        cssClass: 'apexcharts-xaxis-title',
                    },
                },
            },
            yaxis: {
                tickAmount: 7,
                labels: {
                    formatter: (value: number) => {
                        return value / 1000 + 'K';
                    },
                    offsetX: isRtl ? -30 : -10,
                    offsetY: 0,
                    style: {
                        fontSize: '12px',
                        cssClass: 'apexcharts-yaxis-title',
                    },
                },
                opposite: isRtl ? true : false,
            },
            grid: {
                borderColor: isDark ? '#191E3A' : '#E0E6ED',
                strokeDashArray: 5,
                xaxis: {
                    lines: {
                        show: true,
                    },
                },
                yaxis: {
                    lines: {
                        show: false,
                    },
                },
                padding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right',
                fontSize: '16px',
                fontFamily: isRtl ? 'Tajawal' : 'Raleway, sans-serif',
                markers: {
                    width: 10,
                    height: 10,
                    offsetX: -2
                },
                itemMargin: {
                    horizontal: 10,
                    vertical: 5,
                },
            },
            tooltip: {
                marker: {
                    show: true,
                },
                x: {
                    show: false,
                },
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    inverseColors: !1,
                    opacityFrom: isDark ? 0.19 : 0.28,
                    opacityTo: 0.05,
                    stops: isDark ? [100, 100] : [45, 100],
                },
            },
        },
    };

    //Sales By Category
    const salesByCategory: any = {
        series: (salesByCategoryData || []).map((item) => item.total_sales),
        options: {
            chart: {
                type: 'donut',
                height: 460,
                fontFamily: 'Raleway, sans-serif',
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 25,
                colors: [isDark ? '#0e1726' : '#fff'],
            },
            colors: isDark ? ['#d9c91b', '#5c1ac3', '#1BD9BF'] : ['#d9c91b', '#5c1ac3', '#1BD9BF'],
            legend: {
                show: false,
                position: 'bottom',
                horizontalAlign: 'center',
                fontSize: '14px',
                markers: {
                    width: 10,
                    height: 10,
                    offsetX: -2,
                },
                height: 50,
                offsetY: -20,
            },
            plotOptions: {
                pie: {
                    donut: {
                        size: '65%',
                        background: 'transparent',
                        labels: {
                            show: true,
                            name: {
                                show: true,
                                fontSize: '26px',
                                offsetY: -10,
                            },
                            value: {
                                show: true,
                                fontSize: '26px',
                                color: isDark ? '#bfc9d4' : '#0e1726',
                                fontWeight: 600,
                                offsetY: 16,
                                formatter: (val: any) => {
                                    return val;
                                },
                            },
                            total: {
                                show: true,
                                label: t('Total'),
                                fontFamily: isRtl ? 'Tajawal' : 'Raleway, sans-serif',
                                color: '#888ea8',
                                fontSize: '26px',
                                formatter: (w: any) => {
                                    return w.globals.seriesTotals.reduce(function (a: any, b: any) {
                                        return a + b;
                                    }, 0);
                                },
                            },
                        },
                    },
                },
            },
            labels: (salesByCategoryData || []).map((item) => item.category_name),
            states: {
                hover: {
                    filter: {
                        type: 'none',
                        value: 0.15,
                    },
                },
                active: {
                    filter: {
                        type: 'none',
                        value: 0.15,
                    },
                },
            },
        },
    };

    //Service Booking
    const serviceBooking: any = {
        series: [
            {
                name: t('Completed'),
                data: (bookingStats || []).map((item) => item.completed_count),
            },
            {
                name: t('Cancelled'),
                data: (bookingStats || []).map((item) => item.cancelled_count),
            },
        ],
        options: {
            chart: {
                height: 300,
                type: 'bar',
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
            },
            colors: ['#012d22', '#1bd9bf'],
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent'],
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '60%',
                    borderRadius: 6,
                    borderRadiusApplication: 'end'
                },
            },
            grid: {
                borderColor: isDark ? '#191e3a' : '#e0e6ed',
                strokeDashArray: 5,
                xaxis: {
                    lines: {
                        show: false,
                    },
                },
                yaxis: {
                    lines: {
                        show: true
                    },
                },
            },
            legend: {
                show: true,
                position: 'top',
                horizontalAlign: 'right',
                fontSize: '14px',
                fontFamily: isRtl ? 'Tajawal' : 'Raleway, sans-serif',
                markers: {
                    width: 10,
                    height: 10,
                    offsetX: -2,
                    shape: 'circle'

                },
                itemMargin: {
                    horizontal: 10,
                    vertical: 5,
                },
            },
            xaxis: {
                // categories: (bookingStats || []).map((item) => item.day),
                categories: [t('Monday'), t('Tuesday'), t('Wednesday'), t('Thursday'), t('Friday'), t('Saturday'), t('Sunday')],
                axisBorder: {
                    color: isDark ? '#191e3a' : '#e0e6ed',
                },
                labels: {
                    style: {
                        colors: isDark ? '#bfc9d4' : '#74788d',
                        fontFamily: isRtl ? 'Tajawal' : 'Raleway, sans-serif',
                    },
                },
            },
            yaxis: {
                opposite: isRtl ? true : false,
                labels: {
                    offsetX: isRtl ? -10 : 0,
                },
            },
            tooltip: {
                theme: isDark ? 'dark' : 'light',
                y: {
                    formatter: function (val: any) {
                        return val;
                    },
                },
            },
        },
    };


    // rated services
    // const ratedservices = [
    //     {
    //         id: 1,
    //         servicename: 'Haircut',
    //         progress: 90,
    //         star: 4,
    //         rating: "4.8 (150 reviews)"
    //     },
    //     {
    //         id: 2,
    //         servicename: 'Makeup',
    //         progress: 80,
    //         star: 4,
    //         rating: "4.7 (120 reviews)"
    //     },
    //     {
    //         id: 3,
    //         servicename: 'Pedicure',
    //         progress: 70,
    //         star: 4,
    //         rating: "4.6 (100 reviews)"
    //     },
    //     {
    //         id: 4,
    //         servicename: 'Facial',
    //         progress: 70,
    //         star: 4,
    //         rating: "4.6 (100 reviews)"
    //     },
    // ]

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(4);

    const { data, isLoading, isError, refetch } = useModelGetUsers({
        page,
        "per-page": pageSize,
        roles: [ROLES.USER]
    });


    const users: UserResponseI[] = data?.data || [];

    const { data: employeeData, isLoading: isEmployeesLoading, isError: isEmployeesError, refetch: refetchEmployees } = useModelGetUsers({
        page,
        "per-page": pageSize,
        roles: [ROLES.EMPLOYEE],
        relations: ['user_categories'],
    });


    const employees: UserResponseI[] = employeeData?.data || [];

    const { data: freelancerData, isLoading: isFrelancersLoading, isError: isFrelancersError, refetch: refetchFreelancers } = useModelGetUsers({
        page,
        "per-page": pageSize,
        roles: [ROLES.FREELANCER],
        relations: ['user_categories'],
    });


    const freelancers: UserResponseI[] = freelancerData?.data || [];

    const { data: serviceData, isLoading: isServicesLoading, isError: isServicesError, refetch: refetchServices } = useModelGetServices({
        page: 1,
        "per-page": 6,
        relations: ['category'],
        with_booking_count: true,
        "order-column": "bookings_count"
    });


    const services = serviceData?.data || [];


    const { data: reviewData, isLoading: isReviewsLoading, isError: isReviewsError, refetch: refetchReviews } = useModelGetReviews({
        page: 1,
        "per-page": 5,
        relations: ['user'],
    });


    const reviews = reviewData?.data || [];


    const user = useSelector((state: any) => state?.auth.user);

    const role = user?.roles?.[0].name

    const permissions = user?.roles?.[0].permissions;

    const hasPermission = (permissions: any[], permissionToCheck: number) => {
        return permissions?.some((perm: any) => perm?.id === permissionToCheck);
    };

    return (
        <>
            <div>
                <div className="pt-5">

                    {role === 'admin' && (
                        <div className="mb-6 grid gap-6 grid-cols-1 xl:grid-cols-3">
                            <div className="panel h-full xl:col-span-2">
                                <div className="mb-5 flex items-center justify-between dark:text-white-light">
                                    <h5 className="text-2xl font-bold font-[Hermann] rtl:font-['Tajawal'] rtl:font-medium text-[#012d22] dark:text-white-light/90">{t("Profit")}</h5>
                                    <div>
                                        {/* <select className="form-select w-[6.5rem] sm:w-40 rounded-full border-[#b8c3c0] text-[#b8c3c0] font-normal font-['Raleway'] focus:border-[#012d22]" name="duration" id="duration">
                                        <option value={'weekly'} className='text-black'>Weekly</option>
                                        <option value={'monthly'} className='text-black'>Monthly</option>
                                        <option value={'yearly'} className='text-black'>Yearly</option>
                                    </select> */}
                                    </div>
                                </div>
                                <p className="text-lg dark:text-white-light/90 font-normal font-[Raleway] rtl:font-['Tajawal']">
                                    {t("Total Profit")} <span className="ml-2 text-[#717171] dark:text-white-light/65">{totalAdminCut}</span>
                                </p>
                                <div className="relative">
                                    <div className="rounded-lg bg-white dark:bg-black">
                                        {isMounted ? (
                                            <ReactApexChart series={revenueChart.series} options={revenueChart.options} type="area" height={325} width={'100%'} />
                                        ) : (
                                            <div className="grid min-h-[325px] place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] ">
                                                <span className="inline-flex h-5 w-5 animate-spin rounded-full  border-2 border-black !border-l-transparent dark:border-white"></span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="panel h-full">
                                <div className="flex items-center">
                                    <h5 className="text-2xl font-bold font-[Hermann] rtl:font-['Tajawal'] rtl:font-medium text-[#012d22] dark:text-white-light/90 uppercase">{t("Sales By Category")}</h5>
                                </div>
                                <div>
                                    <div className="rounded-lg bg-white dark:bg-black">
                                        {isMounted ? (
                                            <ReactApexChart series={salesByCategory.series} options={salesByCategory.options} type="donut" height={460} width={'100%'} />
                                        ) : (
                                            <div className="grid min-h-[325px] place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] ">
                                                <span className="inline-flex h-5 w-5 animate-spin rounded-full  border-2 border-black !border-l-transparent dark:border-white"></span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {hasPermission(permissions, 60) && (
                        <div className="mb-6 grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">

                            <div className="panel h-full sm:col-span-2 xl:col-span-1">
                                <div className="mb-5 flex items-center">
                                    <h5 className="text-2xl font-bold font-[Hermann] rtl:font-['Tajawal'] rtl:font-medium text-[#012d22] dark:text-white-light/90 uppercase">
                                        {t("Service Booking")}
                                    </h5>
                                    {/* <div className="relative ltr:ml-auto rtl:mr-auto">
                                <select className="form-select w-28 rounded-full border-[#b8c3c0] text-[#b8c3c0] font-normal font-['Raleway'] focus:border-[#012d22]" name="duration" id="duration">
                                    <option value={'weekly'} className='text-black'>Weekly</option>
                                    <option value={'monthly'} className='text-black'>Monthly</option>
                                    <option value={'yearly'} className='text-black'>Yearly</option>
                                </select>
                            </div> */}
                                </div>
                                <div>
                                    <div className="rounded-lg bg-white dark:bg-black">
                                        {isMounted ? (
                                            <ReactApexChart series={serviceBooking.series} options={serviceBooking.options} type="bar" height={300} width={'100%'} />
                                        ) : (
                                            <div className="grid min-h-[325px] place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] ">
                                                <span className="inline-flex h-5 w-5 animate-spin rounded-full  border-2 border-black !border-l-transparent dark:border-white"></span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="panel h-full w-full">
                                <div className="mb-5 flex items-center justify-between">
                                    <h5 className="text-2xl font-bold font-[Hermann] rtl:font-['Tajawal'] rtl:font-medium text-[#012d22] dark:text-white-light/90 uppercase">
                                        {t("Top Services Booked")}
                                    </h5>
                                </div>
                                <div className="table-responsive">
                                    <table>
                                        <thead className='bg-[#e8e8e8]'>
                                            <tr className="border-b-0 whitespace-nowrap">
                                                <th className="text-[#012d22] text-base font-semibold font-['Hermann'] rtl:font-['Tajawal'] rtl:font-medium dark:text-white-light/90">{t("Service Name")}</th>
                                                <th className="text-[#012d22] text-base font-semibold font-['Hermann'] rtl:font-['Tajawal'] rtl:font-medium dark:text-white-light/90">{t("No. of Bookings")}</th>
                                                <th className="text-[#012d22] text-base font-semibold font-['Hermann'] rtl:font-['Tajawal'] rtl:font-medium dark:text-white-light/90">{t("Category")}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {services.map(({ id, name, meta, category }) => (
                                                <tr className="text-[#717171] text-xs font-normal font-['Raleway'] hover:text-black dark:hover:text-white-light/90 border-none whitespace-nowrap" key={id}>
                                                    <td>{name}</td>
                                                    <td>{meta?.bookings_count}</td>
                                                    <td>{category?.name}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="h-full p-0 flex flex-col justify-between gap-6">
                                <div className="panel h-full">
                                    <h5 className="text-2xl font-bold font-[Hermann] rtl:font-medium rtl:font-['Tajawal'] text-[#012d22] dark:text-white-light/90 uppercase">
                                        {t("Recent User Reviews")}
                                    </h5>
                                    <div className='mt-5 flex flex-col h-full gap-5'>
                                        {/* <Swiper
                                        dir={isRtl ? 'rtl' : 'ltr'}
                                        id='userreviewslider'
                                        pagination={{
                                            dynamicBullets: true,
                                            clickable: true,
                                        }}
                                        grabCursor={true}
                                        modules={[Autoplay, Pagination]}
                                        loop={true}
                                        autoplay={{
                                            delay: 2000,
                                            disableOnInteraction: false,
                                        }}
                                    > */}
                                        {reviews.slice(0, 2).map(({ review, rating, user }, index) => (
                                            // <SwiperSlide key={index}>
                                            <div key={index} className='panel shadow-md border h-[9.5rem]'>
                                                <div className="flex flex-col gap-1">
                                                    <div className="inline-flex items-center justify-between">
                                                        <p className="text-[#012d22] text-base font-semibold font-['Raleway']">{`${user?.first_name} ${user?.last_name}`}</p>
                                                        {/* <p className="text-right text-[#b8c3c0] text-[10px] font-normal font-['Raleway']">3/9/2024</p> */}
                                                    </div>
                                                    <ReactStars
                                                        count={5}
                                                        size={24}
                                                        activeColor="#ffd700"
                                                        value={rating}
                                                        edit={false}
                                                    />
                                                    <p className="text-[#717171] text-sm font-normal font-['Raleway']">
                                                        &quot;{review}&quot;
                                                    </p>
                                                </div>
                                            </div>
                                            // {/* </SwiperSlide> */}
                                        ))}
                                        {/* </Swiper> */}
                                    </div>
                                </div>
                                {/* <div className="panel h-full">
                                <h5 className="text-2xl font-bold font-[Hermann] text-[#012d22] dark:text-white-light/90 uppercase">
                                    Top Rated Services
                                </h5>
                                <div className='mt-5'>
                                    <div className='flex flex-col gap-2'>
                                        {ratedservices.map(({ id, servicename, progress, star, rating}) => (
                                            <div className='grid grid-cols-12 items-center space-x-2' key={id}>
                                                <p className="text-[#717171] text-xs font-normal font-['Raleway'] text-left col-span-2">{servicename}</p>
                                                <div className="h-2 w-full rounded-full bg-[#e8e8e8] shadow dark:bg-[#1b2e4b] col-span-4">
                                                    <div className="h-full rounded-full bg-[#012D22]" style={{ width: `${progress}%` }}/>
                                                </div>
                                                <div className='col-span-3 flex justify-center'>
                                                    <ReactStars
                                                        count={5}
                                                        size={18}
                                                        activeColor="#ffd700"
                                                        value={star}
                                                    />    
                                                </div> 
                                                <p className="text-[#717171] text-xs font-normal font-['Raleway'] col-span-3">{rating}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div> */}
                            </div>
                        </div>
                    )}


                    <div className={`grid gap-6 grid-cols-${[ hasPermission(permissions, 40), hasPermission(permissions, 70), hasPermission(permissions, 80),].filter(Boolean).length || 1}`}>
                        {hasPermission(permissions, 40) || role === 'admin' ? (
                            <div className="panel h-full w-full">
                                <div className="mb-5 flex items-center justify-between">
                                    <h5 className="text-2xl font-bold font-[Hermann] rtl:font-medium rtl:font-['Tajawal'] text-[#012d22] dark:text-white-light/90 uppercase">
                                        {t("Recent Users")}
                                    </h5>
                                </div>
                                <div className="table-responsive">
                                    <table>
                                        <thead className='bg-[#e8e8e8]'>
                                            <tr className="border-b-0 whitespace-nowrap">
                                                <th className="text-[#012d22] text-base font-semibold font-['Hermann'] rtl:font-medium rtl:font-['Tajawal'] dark:text-white-light/90">{t("Name")}</th>
                                                <th className="text-[#012d22] text-base font-semibold font-['Hermann'] rtl:font-medium rtl:font-['Tajawal'] dark:text-white-light/90">{t("Email Address")}</th>
                                                <th className="text-[#012d22] text-base font-semibold font-['Hermann'] rtl:font-medium rtl:font-['Tajawal'] dark:text-white-light/90">{t("Phone Number")}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map(({ id, first_name, last_name, email, phone }) => (
                                                <tr className="text-[#717171] text-xs font-normal font-['Raleway'] hover:text-black dark:hover:text-white-light/90 border-none whitespace-nowrap" key={id}>
                                                    <td>{`${first_name} ${last_name}`}</td>
                                                    <td>{email || '-'}</td>
                                                    <td>{phone || "-"}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : null}

                        {hasPermission(permissions, 70) && (
                            <div className="panel h-full w-full">
                                <div className="mb-5 flex items-center justify-between">
                                    <h5 className="text-2xl font-bold font-[Hermann] rtl:font-medium rtl:font-['Tajawal'] text-[#012d22] dark:text-white-light/90 uppercase">
                                        {t("Recent Employees")}
                                    </h5>
                                </div>
                                <div className="table-responsive">
                                    <table>
                                        <thead className='bg-[#e8e8e8]'>
                                            <tr className="border-b-0 whitespace-nowrap">
                                                <th className="text-[#012d22] text-base font-semibold font-['Hermann'] rtl:font-medium rtl:font-['Tajawal'] dark:text-white-light/90">{t("Name")}</th>
                                                <th className="text-[#012d22] text-base font-semibold font-['Hermann'] rtl:font-medium rtl:font-['Tajawal'] dark:text-white-light/90">{t("Email Address")}</th>
                                                <th className="text-[#012d22] text-base font-semibold font-['Hermann'] rtl:font-medium rtl:font-['Tajawal'] dark:text-white-light/90">{t("Phone Number")}</th>
                                                <th className="text-[#012d22] text-base font-semibold font-['Hermann'] rtl:font-medium rtl:font-['Tajawal'] dark:text-white-light/90">{t("Category")}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {employees.map(({ id, first_name, last_name, email, phone, user_categories }) => (
                                                <tr className="text-[#717171] text-xs font-normal font-['Raleway'] hover:text-black dark:hover:text-white-light/90 border-none whitespace-nowrap" key={id}>
                                                    <td>{`${first_name} ${last_name}`}</td>
                                                    <td>{email || '-'}</td>
                                                    <td>{phone || "-"}</td>
                                                    <td>{user_categories?.[0].category?.name || "-"}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                        {hasPermission(permissions, 80) && (
                            <div className="panel h-full w-full">
                                <div className="mb-5 flex items-center justify-between">
                                    <h5 className="text-2xl font-bold font-[Hermann] rtl:font-medium rtl:font-['Tajawal'] text-[#012d22] dark:text-white-light/90 uppercase">
                                        {t("Recent Freelancers")}
                                    </h5>
                                </div>
                                <div className="table-responsive">
                                    <table>
                                        <thead className='bg-[#e8e8e8]'>
                                            <tr className="border-b-0 whitespace-nowrap">
                                                <th className="text-[#012d22] text-base font-semibold font-['Hermann'] rtl:font-medium rtl:font-['Tajawal'] dark:text-white-light/90">{t("Name")}</th>
                                                <th className="text-[#012d22] text-base font-semibold font-['Hermann'] rtl:font-medium rtl:font-['Tajawal'] dark:text-white-light/90">{t("Email Address")}</th>
                                                <th className="text-[#012d22] text-base font-semibold font-['Hermann'] rtl:font-medium rtl:font-['Tajawal'] dark:text-white-light/90">{t("Category")}</th>
                                                <th className="text-[#012d22] text-base font-semibold font-['Hermann'] rtl:font-medium rtl:font-['Tajawal'] dark:text-white-light/90">{t("Status")}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {freelancers.map(({ id, first_name, last_name, email, user_categories, is_active }) => (
                                                <tr className="text-[#717171] text-xs font-normal font-['Raleway'] hover:text-black dark:hover:text-white-light/90 border-none whitespace-nowrap" key={id}>
                                                    <td>{`${first_name} ${last_name}`}</td>
                                                    <td>{email || '-'}</td>
                                                    <td>{user_categories?.[0].category?.name || "-"}</td>
                                                    <td>{is_active ? "Active" : "Inactive"}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </>
    );
};

Index.authenticate = true;

export default Index;
