import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { useDispatch } from 'react-redux';
import * as SolarIcon from 'solar-icon-set'
import { setPageTitle } from '@/store/themeConfigSlice';
import { useRouter } from 'next/navigation'
import DeleteModal from '@/components/DeleteModal';


const rowData = [
    {
        id: 1,
        name: 'Caroline',
        email: 'carolinejensen@zidant.com',
        phone: '+1 (821) 447-3782',
        role: 'Hair Stylist',
        isActive: true,
        bookings: 39,
    },
    {
        id: 2,
        name: 'Celeste',
        email: 'celestegrant@polarax.com',
        phone: '+1 (838) 515-3408',
        role: 'Makeup Artist',
        isActive: false,
        bookings: 32,
    },
    {
        id: 3,
        name: 'Tillman',
        email: 'tillmanforbes@manglo.com',
        phone: '+1 (969) 496-2892',
        role: 'Nail Stylist',
        isActive: false,
        bookings: 26,
    },
    {
        id: 4,
        name: 'Daisy',
        email: 'daisywhitley@applideck.com',
        phone: '+1 (861) 564-2877',
        role: 'Massage Therapist',
        isActive: true,
        bookings: 21,
    },
    {
        id: 5,
        name: 'Weber',
        email: 'weberbowman@volax.com',
        phone: '+1 (962) 466-3483',
        role: 'Bridal Stylist',
        isActive: false,
        bookings: 26,
    },
    {
        id: 6,
        name: 'Buckley',
        email: 'buckleytownsend@orbaxter.com',
        phone: '+1 (884) 595-2643',
        role: 'Barber',
        isActive: true,
        bookings: 40,
    },
    {
        id: 7,
        name: 'Latoya',
        email: 'latoyabradshaw@opportech.com',
        phone: '+1 (906) 474-3155',
        role: 'Hair Color Specialist',
        isActive: true,
        bookings: 24,
    },
    {
        id: 8,
        name: 'Kate',
        email: 'katelindsay@gorganic.com',
        phone: '+1 (930) 546-2952',
        role: 'Spa Therapist',
        isActive: true,
        bookings: 24,
    },
    {
        id: 9,
        name: 'Marva',
        email: 'marvasandoval@avit.com',
        phone: '+1 (927) 566-3600',
        role: 'Hairstylist',
        isActive: false,
        bookings: 28,
    },
    {
        id: 10,
        name: 'Decker',
        email: 'deckerrussell@quilch.com',
        phone: '+1 (846) 535-3283',
        role: 'Bridal Stylist',
        isActive: false,
        bookings: 27,
    },
    {
        id: 11,
        name: 'Odom',
        email: 'odommills@memora.com',
        phone: '+1 (995) 525-3402',
        role: 'Massage Therapist',
        isActive: true,
        bookings: 34,
    },
    {
        id: 12,
        name: 'Sellers',
        email: 'sellerswalters@zorromop.com',
        phone: '+1 (830) 430-3157',
        role: 'Makeup Artist',
        isActive: true,
        bookings: 28,
    },
    {
        id: 13,
        name: 'Wendi',
        email: 'wendipowers@orboid.com',
        phone: '+1 (863) 457-2088',
        role: 'Barber',
        isActive: true,
        bookings: 31,
    },
    {
        id: 14,
        name: 'Sophie',
        email: 'sophiehorn@snorus.com',
        phone: '+1 (885) 418-3948',
        role: 'Nail Stylist',
        isActive: true,
        bookings: 22,
    },
    {
        id: 15,
        name: 'Levine',
        email: 'levinerodriquez@xth.com',
        phone: '+1 (999) 565-3239',
        role: 'Hair Color Specialist',
        isActive: true,
        bookings: 27,
    },
];

const Custom = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    useEffect(() => {
        dispatch(setPageTitle('Freelancers Management'));
    });
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [deleteModal, setDeleteModal] = useState(false);
    const [initialRecords, setInitialRecords] = useState(sortBy(rowData, 'id'));
    const [recordsData, setRecordsData] = useState(initialRecords);

    const [selectedRecords, setSelectedRecords] = useState<any>([]);

    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
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
                    item.role.toLowerCase().includes(search.toLowerCase()) ||
                    item.bookings.toString().includes(search.toLowerCase())
                    // (item.isActive ? 'active' : 'inactive').includes(search.toLowerCase())
                );
            });
        });
    }, [search]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
    }, [sortStatus]);



    
    return (
        <div>
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2 md:gap-0">
                <div>
                    <h4 className="text-[#012d22] text-2xl font-bold font-['Hermann'] uppercase dark:text-white-light">Freelancers Management</h4>
                </div>
                <div className="w-full sm:w-auto">
                    <div className='rounded-full border border-[#B8C3C0] dark:border-[#17263c] flex items-center justify-between px-4 bg-white dark:bg-[#121e32]'>
                        <input type="text" className="form-input w-full sm:w-72 px-0 py-3 bg-transparent dark:bg-transparent border-none font-normal font-['Raleway']" placeholder="Search here..." value={search} onChange={(e) => setSearch(e.target.value)} />
                        <SolarIcon.Magnifer className="text-[#012d22]" />
                    </div>
                </div>
            </div>
            <div className="panel mt-6">
                <div className="mb-5 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                    <h5 className="text-xl font-bold text-[#012d22] font-['Hermann'] uppercase dark:text-white-light">Freelancers List</h5>
                    <div className="flex items-center gap-3">
                        <button type="button" className="btn shadow-none bg-[#012d22] text-white rounded-full font-semibold font-['Raleway] text-lg px-3">
                            Activate
                        </button>
                        <button type="button" className="btn shadow-none bg-[#1bd9bf] text-[#012d22] rounded-full font-semibold font-['Raleway] text-lg px-3">
                            Deactivate
                        </button>
                    </div>
                </div>
                <div className="datatables">
                    <DataTable
                        className="table-hover whitespace-nowrap"
                        records={recordsData}
                        columns={[
                            { accessor: 'id', title: 'ID', sortable: true },
                            { accessor: 'name', title: 'Name', sortable: true },
                            { accessor: 'email', title: 'Email Address', sortable: true },
                            { accessor: 'phone', title: 'Phone Number', sortable: true },
                            { accessor: 'role', title: 'Role', sortable: true },
                            { accessor: 'bookings', title: 'Total Bookings', sortable: true },
                            {
                                accessor: 'isActive',
                                title: 'Status',
                                sortable: true,
                                render: (record) => {
                                    const handleToggle = () => {
                                        setRecordsData((prevRecords) =>
                                            prevRecords.map((item) =>
                                                item.id === record.id ? { ...item, isActive: !item.isActive } : item
                                            )
                                        );
                                    }

                                    return (
                                        <div>
                                            <p className="text-[#727272] text-sm font-normal font-['Raleway'] hover:text-black dark:hover:text-white-light/90 border-none">
                                                {record.isActive ? 'Activate' : 'Deactivate'}
                                            </p>
                                        </div>
                                    );
                                },
                            },
                            {
                                accessor: 'actions',
                                title: 'Actions',
                                sortable: false,
                                render: () => (
                                    <div className="flex items-center gap-3">
                                        <button type="button" className="btn shadow-none bg-[#012d22] text-white rounded-full font-normal font-['Raleway] px-3" onClick={() => router.push('/freelancermanagement/freelancer/profile')}>
                                            <div className="flex items-center gap-2">
                                                <SolarIcon.Eye color='white' iconStyle='Bold' size={18} />
                                                View
                                            </div>
                                        </button>
                                        <button type="button" className="btn shadow-none bg-[#1bd9bf] text-[#012d22] rounded-full font-normal font-['Raleway] px-3" onClick={() => setDeleteModal(true)}>
                                            <div className="flex items-center gap-2">
                                                <SolarIcon.TrashBinTrash color='#012d22' iconStyle='Bold' size={18} />
                                                Delete
                                            </div>
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
                    <DeleteModal
                        isOpen={deleteModal}
                        setIsOpen={setDeleteModal}
                        serviceName='Delete Freelancer'
                        description='Are you sure you want to delete the freelancer?'
                    />
                </div>
            </div>
        </div>
    );
};

export default Custom;
