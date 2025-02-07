import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as SolarIcon from 'solar-icon-set'
import { setPageTitle } from '@/store/themeConfigSlice';
import { useRouter } from 'next/router';
import Dropdown from '@/components/Dropdown';
import Link from 'next/link';
import { IRootState } from '@/store';
import { useModelGetBookings } from '@/models/booking.model';
import { useTranslation } from 'react-i18next';


const FreelancerBillingDetail = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;
    useEffect(() => {
        dispatch(setPageTitle('Freelancers Billing Detail'));
    });
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [selectedRecords, setSelectedRecords] = useState<any>([]);
    const { t } = useTranslation();
    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: '_id',
        direction: 'asc',
    });

    const handleStatusChange = (id: number, newStatus: string) => {

        console.log(`Status changed for record ${id} to ${newStatus}`);
    };


    const { data, isLoading, isError, refetch } = useModelGetBookings({
        page,
        "per-page": pageSize,
        provider_id: id,
        status: [40],
        relations: ['service', 'client']
    });


    const bookings = data?.data || [];
    const totalRecords = data?.meta?.total || 0;

    useEffect(() => {
        refetch();
    }, [page, pageSize, sortStatus]);

    return (
        <div>
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2 md:gap-0">
                <ul className="flex space-x-2 rtl:space-x-reverse">
                    <li>
                        <Link href="/billing/freelancersbillinglist" className="font-['Raleway'] rtl:font-medium rtl:font-['Tajawal'] text-lg font-semibold text-[#1bd9bf] hover:underline dark:text-white-light">
                            {t("Freelancers List")}
                        </Link>
                    </li>
                    <li className="font-['Raleway'] capitalize text-lg font-normal text-[#727272] before:content-['/'] dark:text-white-light ltr:before:mr-2 rtl:before:ml-2">
                        <span>{router?.query?.name}</span>
                    </li>
                </ul>
                <div className="w-full sm:w-auto">
                    <div className='rounded-full border border-[#B8C3C0] dark:border-[#17263c] flex items-center justify-between px-4 bg-white dark:bg-[#121e32]'>
                        <input type="text" className="form-input w-full sm:w-72 px-0 py-3 bg-transparent dark:bg-transparent border-none font-normal font-['Raleway'] rtl:font-['Tajawal']" placeholder={t("Search Here")?.toString()} value={search} onChange={(e) => setSearch(e.target.value)} />
                        <SolarIcon.Magnifer className="text-[#012d22]" />
                    </div>
                </div>
            </div>
            <div className="panel mt-6">
                <div className="mb-5 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                    <h5 className="text-xl font-bold text-[#012d22] font-['Hermann'] rtl:font-['Tajawal'] rtl:font-medium uppercase dark:text-white-light">{t("Detail")}</h5>
                    {/* <div className="flex items-center gap-3">
                        <button type="button" className="btn shadow-none bg-[#012d22] text-white rounded-full font-semibold font-['Raleway] text-lg px-3">
                            Activate
                        </button>
                        <button type="button" className="btn shadow-none bg-[#1bd9bf] text-[#012d22] rounded-full font-semibold font-['Raleway] text-lg px-3">
                            Deactivate
                        </button>
                    </div> */}
                </div>
                <div className="datatables">
                    <DataTable
                        className="table-hover whitespace-nowrap"
                        records={bookings}
                        columns={[
                            { accessor: 'id', title: t('ID') },
                            {
                                accessor: 'name',
                                title: t('User Name'), 
                                render: (record) => `${record.client.first_name} ${record.client.last_name}`,
                            },
                            { accessor: 'service.name', title: t('Service'), },
                            // { accessor: 'addons', title: 'Add-ons', },
                            { accessor: 'date', title: t('Date'), },
                            {
                                accessor: 'time',
                                title: t('Time'),
                                render: (record) => `${record.start_time}-${record.end_time}`,
                            },
                            { accessor: 'amount', title: t('Commission'), },
                            {
                                accessor: 'payment_status_text',
                                title: t('Payment Status'),
                                render: (record) => {
                                    const statusClasses: any = {
                                        'Pending': 'bg-[#fff7ce] text-[#dbb900] dark:bg-[#4A3E00] dark:text-[#F5D100]',
                                        'Paid': 'bg-[#D2F5F1] text-[#012d22] dark:bg-[#0F423C] dark:text-white',
                                        'Dispute': 'bg-[#F5D2D2] text-[#B90000] dark:bg-[#420F0F] dark:text-[#D20000]',
                                    };

                                    return (
                                        <>

                                            <div className='dropdown'>
                                                <Dropdown
                                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                                    btnClassName="dropdown-toggle"
                                                    button={
                                                        <>
                                                            <div className={`badge rounded-full px-2.5 py-3 inline-flex items-center justify-center h-8 font-raleway ${statusClasses[record.payment_status_text]}`}>
                                                                {record.payment_status_text}
                                                            </div>
                                                        </>
                                                    }
                                                >
                                                    <ul className="!min-w-[170px]">
                                                        <li>
                                                            <button type="button" onClick={() => handleStatusChange(record.id, 'Succeed')}>
                                                                Succeed
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button type="button" onClick={() => handleStatusChange(record.id, 'Pending')}>
                                                                Pending
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button type="button" onClick={() => handleStatusChange(record.id, 'Dispute')}>
                                                                Dispute
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </Dropdown>
                                            </div>
                                        </>
                                    );
                                },
                            },
                            {
                                accessor: 'actions',
                                title: t('Actions'),
                                sortable: false,
                                render: (record) => (
                                    <div className="flex items-center gap-3">
                                        <button type="button" className="btn shadow-none bg-[#012d22] text-white rounded-full font-normal font-['Raleway] rtl:font-['Tajawal'] px-3" onClick={() => router.push({
                                            pathname: '/billing/freelancersbillinglist/freelancersbillingdetail/paymentinfo',
                                            query: { id: record.id, name: router?.query?.name },
                                        })}>
                                            <div className="flex items-center gap-2">
                                                <SolarIcon.Eye color='white' iconStyle='Bold' size={18} />
                                                {t("View")}
                                            </div>
                                        </button>
                                        {record.payment_status_text === 'Pending' && (
                                            <button type="button" className="btn shadow-none bg-[#1bd9bf] text-[#012d22] rounded-full font-normal font-['Raleway] rtl:font-['Tajawal'] px-3" onClick={() => {

                                                router.push({
                                                    pathname: `/billing/freelancersbillinglist/freelancersbillingdetail/paynow`,
                                                    query: { id: record.id, name: `${record.client.first_name} ${record.client.last_name}`, comission: record.amount },
                                                });
                                            }}>
                                                {t("Pay Now")}
                                            </button>
                                        )}
                                    </div>
                                ),
                            }
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
                        paginationText={({ from, to, totalRecords }) => `${t("Showing")}  ${from} ${t("to.1")} ${to} ${t("to.1")} ${totalRecords} ${t("entries")}`}
                    />
                </div>
            </div>
        </div>
    );
};
FreelancerBillingDetail.authenticate = true;
export default FreelancerBillingDetail;
