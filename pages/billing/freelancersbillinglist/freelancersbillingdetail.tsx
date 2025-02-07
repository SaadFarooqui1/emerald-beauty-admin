import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { useDispatch, useSelector } from 'react-redux';
import * as SolarIcon from 'solar-icon-set'
import { setPageTitle } from '@/store/themeConfigSlice';
import { useRouter } from 'next/navigation'
import Dropdown from '@/components/Dropdown';
import Link from 'next/link';
import { IRootState } from '@/store';


const rowData = [
    {
        id: 1,
        name: 'Caroline',
        email: 'carolinejensen@zidant.com',
        phone: '+1 (821) 447-3782',
        addons: 'Shampoo',
        expertise: 'Hair Stylist',
        status: 'Succeed',
        bookings: 39,
        dateandtime: '15 Nov, 3:00 PM',
        commission: '220 AED',

    },
    {
        id: 2,
        name: 'Celeste',
        email: 'celestegrant@polarax.com',
        phone: '+1 (838) 515-3408',
        addons: 'Nail Polish',
        expertise: 'Makeup Artist',
        status: 'Pending',
        bookings: 32,
        dateandtime: '15 Nov, 3:00 PM',
        commission: '230 AED',

    },
    {
        id: 3,
        name: 'Tillman',
        email: 'tillmanforbes@manglo.com',
        phone: '+1 (969) 496-2892',
        addons: 'Lashes',
        expertise: 'Nail Stylist',
        status: 'Dispute',
        bookings: 26,
        dateandtime: '15 Nov, 3:00 PM',
        commission: '260 AED',

    },
    {
        id: 4,
        name: 'Daisy',
        email: 'daisywhitley@applideck.com',
        phone: '+1 (861) 564-2877',
        addons: 'Shampoo',
        expertise: 'Massage Therapist',
        status: 'Pending',
        bookings: 21,
        dateandtime: '15 Nov, 3:00 PM',
        commission: '270 AED',

    },
    {
        id: 5,
        name: 'Weber',
        email: 'weberbowman@volax.com',
        phone: '+1 (962) 466-3483',
        addons: 'Lashes',
        expertise: 'Bridal Stylist',
        status: 'Succeed',
        bookings: 26,
        dateandtime: '15 Nov, 3:00 PM',
        commission: '280 AED',

    },
    {
        id: 6,
        name: 'Buckley',
        email: 'buckleytownsend@orbaxter.com',
        phone: '+1 (884) 595-2643',
        addons: '--',
        expertise: 'Barber',
        status: 'Pending',
        bookings: 40,
        dateandtime: '15 Nov, 3:00 PM',
        commission: '290 AED',

    },
    {
        id: 7,
        name: 'Latoya',
        email: 'latoyabradshaw@opportech.com',
        phone: '+1 (906) 474-3155',
        addons: 'Lashes',
        expertise: 'Hair Color Specialist',
        status: 'Succeed',
        bookings: 24,
        dateandtime: '15 Nov, 3:00 PM',
        commission: '300 AED',

    }
];

const FreelancerBillingDetail = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    useEffect(() => {
        dispatch(setPageTitle('Freelancers Billing Detail'));
    });
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(rowData, 'id'));
    const [recordsData, setRecordsData] = useState(initialRecords);

    const [selectedRecords, setSelectedRecords] = useState<any>([]);

    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: '_id',
        direction: 'asc',
    });

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        setInitialRecords(() => {
            return rowData.filter((item) => {
                return (
                    item.id.toString().includes(search.toLowerCase()) ||
                    item.name.toLowerCase().includes(search.toLowerCase()) ||
                    item.email.toLowerCase().includes(search.toLowerCase()) ||
                    item.phone.toLowerCase().includes(search.toLowerCase()) ||
                    item.expertise.toLowerCase().includes(search.toLowerCase()) ||
                    item.bookings.toString().includes(search.toLowerCase())
                    // (item.isActive ? 'active' : 'inactive').includes(search.toLowerCase())
                );
            });
        });
    }, [search]);

    const handleStatusChange = (id: number, newStatus: string) => {
        setRecordsData((prevRecords) =>
            prevRecords.map((item) =>
              item.id === id ? { ...item, status: newStatus } : item
            )
          );
        console.log(`Status changed for record ${id} to ${newStatus}`);
    };

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
    }, [sortStatus]);

    return (
        <div>
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2 md:gap-0">
                <ul className="flex space-x-2 rtl:space-x-reverse">
                    <li>
                        <Link href="/billing/freelancersbillinglist" className="font-['Raleway'] text-lg font-semibold text-[#1bd9bf] hover:underline dark:text-white-light">
                            Freelancers List
                        </Link>
                    </li>
                    <li className="font-['Raleway'] text-lg font-normal text-[#727272] before:content-['/'] dark:text-white-light ltr:before:mr-2 rtl:before:ml-2">
                        <span>Lisa Green</span>
                    </li>
                </ul>
                <div className="w-full sm:w-auto">
                    <div className='rounded-full border border-[#B8C3C0] dark:border-[#17263c] flex items-center justify-between px-4 bg-white dark:bg-[#121e32]'>
                        <input type="text" className="form-input w-full sm:w-72 px-0 py-3 bg-transparent dark:bg-transparent border-none font-normal font-['Raleway']" placeholder="Search here..." value={search} onChange={(e) => setSearch(e.target.value)} />
                        <SolarIcon.Magnifer className="text-[#012d22]" />
                    </div>
                </div>
            </div>
            <div className="panel mt-6">
                <div className="mb-5 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                    <h5 className="text-xl font-bold text-[#012d22] font-['Hermann'] uppercase dark:text-white-light">Detail</h5>
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
                        records={recordsData}
                        columns={[
                            { accessor: 'id', title: 'ID', sortable: true },
                            { accessor: 'name', title: 'User Name', sortable: true },
                            { accessor: 'expertise', title: 'Service', sortable: true },
                            { accessor: 'addons', title: 'Add-ons', sortable: true },
                            { accessor: 'dateandtime', title: 'Date & Time', sortable: true },
                            { accessor: 'commission', title: 'Commission', sortable: true },
                            {
                                accessor: 'status',
                                title: 'Payment Status',
                                sortable: true,
                                render: (record) => {
                                    const statusClasses : any = {
                                        'Pending': 'bg-[#fff7ce] text-[#dbb900] dark:bg-[#4A3E00] dark:text-[#F5D100]',
                                        'Succeed': 'bg-[#D2F5F1] text-[#012d22] dark:bg-[#0F423C] dark:text-white',
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
                                                            <div className={`badge rounded-full px-2.5 py-3 inline-flex items-center justify-center h-8 font-raleway ${statusClasses[record.status]}`}>
                                                                {record.status}
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
                                title: 'Actions',
                                sortable: false,
                                render: () => (
                                    <div className="flex items-center gap-3">
                                        <button type="button" className="btn shadow-none bg-[#012d22] text-white rounded-full font-normal font-['Raleway] px-3" onClick={() => router.push('/billing/freelancersbillinglist/freelancersbillingdetail/paymentinfo')}>
                                            <div className="flex items-center gap-2">
                                                <SolarIcon.Eye color='white' iconStyle='Bold' size={18} />
                                                View
                                            </div>
                                        </button>
                                        <button type="button" className="btn shadow-none bg-[#1bd9bf] text-[#012d22] rounded-full font-normal font-['Raleway] px-3" onClick={() => router.push('/billing/freelancersbillinglist/freelancersbillingdetail/paynow')}>
                                            Pay Now
                                        </button>
                                    </div>
                                ),
                            }
                        ]}
                        highlightOnHover
                        verticalAlignment='center'
                        withBorder={false}
                        totalRecords={initialRecords.length}
                        recordsPerPage={pageSize}
                        page={page}
                        onPageChange={(p) => setPage(p)}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={setPageSize}
                        sortStatus={sortStatus}
                        onSortStatusChange={setSortStatus}
                        selectedRecords={selectedRecords}
                        onSelectedRecordsChange={setSelectedRecords}
                        minHeight={200}
                        paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                    />
                </div>
            </div>
        </div>
    );
};

export default FreelancerBillingDetail;
