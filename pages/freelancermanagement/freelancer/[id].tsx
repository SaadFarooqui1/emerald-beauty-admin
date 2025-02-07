import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';
import { setPageTitle } from '@/store/themeConfigSlice';
import { useEffect, useState } from 'react';
import { IoIosMail } from "react-icons/io";
import { FaPhone } from "react-icons/fa6";
import { FaFileAlt } from "react-icons/fa";
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useRouter } from 'next/router';
import { useModelGetUserById } from '@/models/user.model';
import { useModelGetBookings } from '@/models/booking.model';
import { useTranslation } from 'react-i18next';


const Profile = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;
    useEffect(() => {
        dispatch(setPageTitle('Freelancer Profile'));
    });
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const { t } = useTranslation();
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [selectedRecords, setSelectedRecords] = useState<any>([]);


    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });




    const { data, isLoading, isError, refetch } = useModelGetUserById(id,{
        relations: ['user_categories', 'user_services']
    });

    const user = data;

    const { data: bookingData, isLoading: isBookingsLoading, isError: isBookingsError, refetch: refetchBookings } = useModelGetBookings({
        page,
        "per-page": pageSize,
        provider_id: id,
        relations: ['service']
    });


    const bookings = bookingData?.data || [];
    const totalRecords = bookingData?.meta?.total || 0;

    useEffect(() => {
        refetchBookings();
    }, [page, pageSize, sortStatus]);
    
    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link href="/freelancermanagement/freelancerapproval" className="text-[#1bd9bf] text-lg font-semibold font-['Raleway'] rtl:font-['Tajawal'] rtl:font-medium hover:underline dark:text-white-light">
                        {t("Freelancers List")}
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2 text-[#727272] text-lg font-normal font-['Raleway'] rtl:font-['Tajawal'] dark:text-white-light">
                    <span>{t("Profile")}</span>
                </li>
            </ul>
            <div className="pt-5">
                <div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-3 xl:grid-cols-4">
                    <div className="panel self-start">
                        <div className="mb-5 flex items-center justify-between">
                            <h5 className="text-2xl font-bold text-[#012d22] font-['Hermann'] rtl:font-['Tajawal'] rtl:font-medium uppercase dark:text-white-light">{t("Profile")}</h5>
                        </div>
                        <div className="mb-5">
                            <div className="flex flex-col items-center justify-center">
                                <img src="/assets/images/profile-34.jpeg" alt="img" className="mb-5 h-24 w-24 rounded-full object-cover" />
                                <p className="text-2xl font-semibold text-[#1bd9bf] font-['Raleway'] rtl:font-['Tajawal'] rtl:font-medium">{`${user?.first_name} ${user?.last_name}`}</p>
                            </div>
                            <ul className="m-auto mt-5 flex max-w-[160px] flex-col space-y-4 font-semibold text-white-dark">
                                <li className="flex items-start justify-start gap-2">
                                    <IoIosMail className='shrink-0 text-[#012d22] dark:text-white-light size-5' />
                                    <div className='flex flex-col gap-1'>
                                        <p className="text-[#012d22] text-base font-medium font-['Raleway'] rtl:font-['Tajawal'] dark:text-white-light">{t("Email Address")}</p>
                                        <p className="text-[#727272] text-sm font-normal font-['Raleway']">{user?.email || "-"}</p>
                                    </div>
                                </li>
                                <li className="flex items-start justify-start gap-2">
                                    <FaPhone className='shrink-0 text-[#012d22] dark:text-white-light size-5' />
                                    <div className='flex flex-col gap-1'>
                                        <p className="text-[#012d22] text-base font-medium font-['Raleway'] rtl:font-['Tajawal'] dark:text-white-light">{t("Phone Number")}</p>
                                        <p className="text-[#727272] text-sm font-normal font-['Raleway']" dir='ltr'>{user?.phone || "-"}</p>
                                    </div>
                                </li>
                                {/* <li className="flex items-start justify-start gap-2">
                                    <IoLocationSharp className='shrink-0 text-[#012d22] dark:text-white-light size-5' />
                                    <div className='flex flex-col gap-1'>
                                        <p className="text-[#012d22] text-base font-medium font-['Raleway'] dark:text-white-light">Address</p>
                                        <p className="text-[#727272] text-sm font-normal font-['Raleway']">123 Palm Avenue, Downtown Dubai, Dubai, UAE</p>
                                    </div>
                                </li> */}
                            </ul>
                        </div>
                    </div>
                    <div className='flex flex-col gap-6 lg:col-span-2 xl:col-span-3'>
                        <div className="panel">
                            <div className="mb-5">
                                <h5 className="text-[#012d22] text-2xl font-bold font-['Hermann'] rtl:font-['Tajawal'] rtl:font-medium uppercase dark:text-white-light">
                                    {t("Submitted Documents")}
                                </h5>
                            </div>
                            <div className='mb-5'>
                                <div className='mb-4'>
                                    <h3 className="text-[#1bd9bf] text-2xl font-bold font-['Raleway'] rtl:font-['Tajawal'] rtl:font-medium uppercase dark:text-white-light">{isRtl ? user?.user_categories?.[0]?.category?.arabic_name : user?.user_categories?.[0]?.category?.name || "Unkwown"}</h3>
                                </div>
                                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'>
                                    <a href={user?.user_categories?.[0]?.certificates?.[0]?.mediaUrl} target='_blank' className='panel' rel="noreferrer">
                                        <div className='gap-2 text-center'>
                                            <div className='bg-[#d2f5f1] p-5 rounded-md inline-block'>
                                                <FaFileAlt className='text-[#012d22] dark:text-white-light size-7' />
                                            </div>
                                            <div>
                                                <p className="text-[#012d22] text-base font-medium font-['Raleway'] rtl:font-['Tajawal']"><b>{t("Certification of Expertise")}</b></p>
                                            </div>
                                            {/* <div className="flex flex-col sm:flex-row w-full items-center justify-center mt-3 gap-3">
                                                <button type="button" className="btn shadow-none bg-[#012d22] text-white rounded-full font-semibold font-['Raleway] text-lg px-3">
                                                    Approved
                                                </button>
                                                <button type="button" className="btn shadow-none bg-[#1bd9bf] text-[#012d22] rounded-full font-semibold font-['Raleway] text-lg px-3">
                                                    Unapproved
                                                </button>
                                            </div> */}
                                        </div>
                                    </a>
                                    <a href={user?.user_categories?.[0]?.potfolio?.[0]?.mediaUrl} target='_blank' className='panel' rel="noreferrer">
                                        <div className='gap-2 text-center'>
                                            <div className='bg-[#d2f5f1] p-5 rounded-md inline-block'>
                                                <FaFileAlt className='text-[#012d22] dark:text-white-light size-7' />
                                            </div>
                                            <div>
                                                <p className="text-[#012d22] text-base font-medium font-['Raleway'] rtl:font-['Tajawal']"><b>{t("Work Portfolio")}</b></p>
                                            </div>
                                            {/* <div className="flex flex-col sm:flex-row w-full items-center justify-center mt-3 gap-3">
                                                <button type="button" className="btn shadow-none bg-[#012d22] text-white rounded-full font-semibold font-['Raleway] text-lg px-3">
                                                    Approved
                                                </button>
                                                <button type="button" className="btn shadow-none bg-[#1bd9bf] text-[#012d22] rounded-full font-semibold font-['Raleway] text-lg px-3">
                                                    Unapproved
                                                </button>
                                            </div> */}
                                        </div>
                                    </a>
                                    <a href={user?.user_categories?.[0]?.documents?.[0]?.mediaUrl} target='_blank' className='panel' rel="noreferrer">
                                        <div className='gap-2 text-center'>
                                            <div className='bg-[#d2f5f1] p-5 rounded-md inline-block'>
                                                <FaFileAlt className='text-[#012d22] dark:text-white-light size-7' />
                                            </div>
                                            <div>
                                                <p className="text-[#012d22] text-base font-medium font-['Raleway'] rtl:font-['Tajawal']"><b>{t("Professional License")}</b></p>
                                            </div>
                                            {/* <div className="flex flex-col sm:flex-row w-full items-center justify-center mt-3 gap-3">
                                                <button type="button" className="btn shadow-none bg-[#012d22] text-white rounded-full font-semibold font-['Raleway] text-lg px-3">
                                                    Approved
                                                </button>
                                                <button type="button" className="btn shadow-none bg-[#1bd9bf] text-[#012d22] rounded-full font-semibold font-['Raleway] text-lg px-3">
                                                    Unapproved
                                                </button>
                                            </div> */}
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="panel">
                            <div className="mb-5">
                                <h5 className="text-[#012d22] text-2xl font-bold font-['Hermann'] rtl:font-medium rtl:font-['Tajawal'] uppercase dark:text-white-light">
                                    {t("Bookings")}
                                </h5>
                            </div>
                            <div className="mb-5">
                                <div className="datatables">
                                    <DataTable
                                        className="table-hover whitespace-nowrap"
                                        records={bookings}
                                        columns={[
                                            // { accessor: 'id', title: 'ID', sortable: true },
                                            { accessor: 'service.name', title: t('Service Name') },
                                            // { accessor: 'addons', title: 'Add-ons', sortable: true },
                                            { accessor: 'date', title: t('Date')},
                                            {
                                                accessor: 'time',
                                                title: t('Time'),
                                                render: (record) => `${record.start_time}-${record.end_time}`,
                                            },
                                            { accessor: 'totalamount', title: t('Total Amount'), 
                                                render: ({ amount, id }) => <div key={id}>{`${amount} AED`}</div>
                                            },
                                            { accessor: 'status', title: t('Status'),
                                                render: (record) => {
                                                    return (
                                                        {   
                                                            'In Progress': (
                                                                <div className="badge rounded-full px-2.5 py-3 inline-flex items-center justify-center h-8 font-['Raleway'] rtl:font-['Tajawal'] rtl:font-medium bg-[#d2e4f5] text-[#004b91] dark:bg-[#0F2942] dark:text-[#0058AB]">
                                                                    {record.status_text}
                                                                </div>
                                                            ),
                                                            'On Route': (
                                                                <div className="badge rounded-full px-2.5 py-3 inline-flex items-center justify-center h-8 font-['Raleway'] rtl:font-['Tajawal'] rtl:font-medium bg-[#FFECCA] text-[#FFA500] dark:bg-[#4E3200] dark:text-[#FFAF1A]">
                                                                    {record.status_text}
                                                                </div>
                                                            ),
                                                            'Pending': (
                                                                <div className="badge rounded-full px-2.5 py-3 inline-flex items-center justify-center h-8 font-['Raleway'] rtl:font-['Tajawal'] rtl:font-medium bg-[#fff7ce] text-[#dbb900] dark:bg-[#4A3E00] dark:text-[#F5D100]">
                                                                    {record.status_text}
                                                                </div>
                                                            ),
                                                            'Completed': (
                                                                <div className="badge rounded-full px-2.5 py-3 inline-flex items-center justify-center h-8 font-['Raleway'] rtl:font-['Tajawal'] rtl:font-medium bg-[#D2F5F1] text-[#012d22] dark:bg-[#0F423C] dark:text-white">
                                                                    {record.status_text}
                                                                </div>
                                                            ),
                                                            'Cancelled': (
                                                                <div className="badge rounded-full px-2.5 py-3 inline-flex items-center justify-center h-8 font-['Raleway'] rtl:font-['Tajawal'] rtl:font-medium bg-[#F5D2D2] text-[#B90000] dark:bg-[#420F0F] dark:text-[#D20000]">
                                                                    {record.status_text}
                                                                </div>
                                                            ),
                                                        }[record.status_text]
                                                    );
                                                },
                                            },
                                        ]}
                                        highlightOnHover
                                        verticalAlignment='center'
                                        withBorder={false}
                                        totalRecords={totalRecords}
                                        recordsPerPage={pageSize}
                                        page={page}
                                        onPageChange={(p) => setPage(p)}
                                        recordsPerPageOptions={PAGE_SIZES}
                                        onRecordsPerPageChange={setPageSize}
                                        sortStatus={sortStatus}
                                        onSortStatusChange={setSortStatus}
                                        // selectedRecords={selectedRecords}
                                        // onSelectedRecordsChange={setSelectedRecords}
                                        minHeight={200}
                                        paginationText={({ from, to, totalRecords }) => `${t("Showing")}  ${from} ${t("to.1")} ${to} ${t("of.1")} ${totalRecords} ${t("entries")}`}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
Profile.authenticate = true;
export default Profile;
