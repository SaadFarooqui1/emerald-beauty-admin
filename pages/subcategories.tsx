import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '@/store/themeConfigSlice';
import * as SolarIcon from 'solar-icon-set'
import { useRouter } from 'next/navigation';


const rowData = [
    {
        id: 1,
        category: 'Haircare',
        subcategoryname: 'Haircut',
        linked_services: 'Basic Trim, Layered Cut, Bob Cut'
    },
    {
        id: 2,
        category: 'Skincare',
        subcategoryname: 'Facial',
        linked_services: 'Deep Cleansing, Hydration, Anti-Aging'
    },
    {
        id: 3,
        category: 'Makeup',
        subcategoryname: 'Nails',
        linked_services: 'Deep Tissue, Swedish, Hot Stone'
    },
    {
        id: 4,
        category: 'Nail Care',
        subcategoryname: 'Wedding',
        linked_services: 'Root Touch-Up, Full Color, Highlights, Ombre'
    },
    {
        id: 5,
        category: 'Wellness',
        subcategoryname: 'Massage Therapy',
        linked_services: 'Blow Dry, Curling, Straightening, Updo Styling'
    },
    {
        id: 6,
        category: 'Massage',
        subcategoryname: 'Color Treatment',
        linked_services: 'Microdermabrasion, Chemical Peel, Skin Tightening'
    },
    {
        id: 7,
        category: 'Pedicure',
        subcategoryname: 'Nails',
        linked_services: 'Aromatherapy, Reflexology, Thai Massage'
    },
    {
        id: 8,
        category: 'Body Treatments',
        subcategoryname: 'Massage Therapy',
        linked_services: 'Classic Manicure, Gel Manicure, French Manicure'
    },
    {
        id: 9,
        category: 'Hair Removal',
        subcategoryname: 'Facial',
        linked_services: 'Classic Pedicure, Spa Pedicure, Gel Pedicure'
    },
    {
        id: 10,
        category: 'Facial Enhancements',
        subcategoryname: 'Massage Therapy',
        linked_services: 'Sea Salt Scrub, Coffee Scrub, Sugar Scrub'
    },
    {
        id: 11,
        category: 'Foot Care',
        subcategoryname: 'Wedding',
        linked_services: 'Detox Wrap, Hydrating Wrap, Slimming Wrap'
    },
    {
        id: 12,
        category: 'Makeup',
        subcategoryname: 'Event',
        linked_services: 'Traditional, Airbrush, HD Makeup'
    }
];

const Custom = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Subcategories'));
    });
    const router = useRouter();
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
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
                    item.category.toLowerCase().includes(search.toLowerCase()) ||
                    item.subcategoryname.toLowerCase().includes(search.toLowerCase()) ||
                    item.linked_services.toLowerCase().includes(search.toLowerCase())
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
                    <h4 className="text-[#012d22] text-2xl font-bold font-['Hermann'] uppercase dark:text-white-light">Categories & Subcategory Management</h4>
                </div>
                <div className="w-full sm:w-auto">
                    <div className='rounded-full border border-[#B8C3C0] dark:border-[#17263c] flex items-center justify-between px-4 bg-white dark:bg-[#121e32]'>
                        <input type="text" className="form-input w-full sm:w-72 px-0 py-3 bg-transparent dark:bg-transparent border-none font-normal font-['Raleway']" placeholder="Search here..." value={search} onChange={(e) => setSearch(e.target.value)} />
                        <SolarIcon.Magnifer className="text-[#012d22]" />
                    </div>
                </div>
            </div>
            <div className="panel mt-6">
                <div className="mb-5 flex flex-col gap-3 sm:flex-row items-center justify-center sm:justify-between">
                    <h5 className="text-xl font-bold text-[#012d22] font-['Hermann'] uppercase dark:text-white-light">SubCategories List</h5>
                    <div>
                        <button type="button" className="btn shadow-none bg-[#012d22] text-white rounded-full font-semibold font-['Raleway] text-lg px-3" onClick={() => router.push('/subcategories/subcategory/create')}>
                            Add New Subcategory
                        </button>
                    </div>
                </div>
                <div className="datatables">
                    <DataTable
                        className="table-hover whitespace-nowrap"
                        records={recordsData}
                        columns={[
                            // { accessor: 'id', title: 'ID', sortable: true },
                            { accessor: 'subcategoryname', title: 'Subcategory Name', sortable: true },
                            { accessor: 'category', title: 'Category', sortable: true },
                            { accessor: 'linked_services', title: 'Linked Services', sortable: true },
                            {
                                accessor: 'actions',
                                title: 'Actions',
                                sortable: false,
                                render: () => (
                                    <div className="flex items-center gap-3">
                                        <button type="button" className="btn shadow-none bg-[#012d22] text-white rounded-full font-normal font-['Raleway] px-3" onClick={() => router.push('/subcategories/subcategory/edit')}>
                                            <div className="flex items-center gap-2">
                                                <SolarIcon.Pen2 color='white' iconStyle='Bold' size={18} />
                                                Edit
                                            </div>
                                        </button>
                                        <button type="button" className="btn shadow-none bg-[#1bd9bf] text-[#012d22] rounded-full font-normal font-['Raleway] px-3">
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
                </div>
            </div>
        </div>
    );
};

export default Custom;
