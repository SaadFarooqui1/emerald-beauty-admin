import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { useDispatch } from 'react-redux';
import * as SolarIcon from 'solar-icon-set';
import { setPageTitle } from '@/store/themeConfigSlice';
import { useRouter } from 'next/navigation';
import DeleteModal from '@/components/DeleteModal';

// Static Page Names and Languages
const rowData = [
    {
        id: 1,
        pageName: 'Home',
        language: 'English',
    },
    {
        id: 2,
        pageName: 'About Us',
        language: 'English',
    },
    {
        id: 3,
        pageName: 'Contact Us',
        language: 'English',
    },
    {
        id: 4,
        pageName: 'Privacy Policy',
        language: 'English',
    },
    {
        id: 5,
        pageName: 'Terms and Conditions',
        language: 'English',
    },
    // You can also add Arabic languages or any other languages as needed.
    {
        id: 6,
        pageName: 'Home',
        language: 'Arabic',
    },
    {
        id: 7,
        pageName: 'About Us',
        language: 'Arabic',
    },
    {
        id: 8,
        pageName: 'Contact Us',
        language: 'Arabic',
    },
];

const StaticPageManagement = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    useEffect(() => {
        dispatch(setPageTitle('Static Pages Management'));
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
                    item.pageName.toLowerCase().includes(search.toLowerCase()) ||
                    item.language.toLowerCase().includes(search.toLowerCase())
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
                    <h4 className="text-[#012d22] text-2xl font-bold font-['Hermann'] uppercase dark:text-white-light">Static Pages Management</h4>
                </div>
                {/* <div className="w-full sm:w-auto">
          <div className='rounded-full border border-[#B8C3C0] dark:border-[#17263c] flex items-center justify-between px-4 bg-white dark:bg-[#121e32]'>
            <input type="text" className="form-input w-full sm:w-72 px-0 py-3 bg-transparent dark:bg-transparent border-none font-normal font-['Raleway']" placeholder="Search here..." value={search} onChange={(e) => setSearch(e.target.value)} />
            <SolarIcon.Magnifer className="text-[#012d22]" />
          </div>
        </div> */}
            </div>
            <div className="panel mt-6">
                <div className="mb-5 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                    <h5 className="text-xl font-bold text-[#012d22] font-['Hermann'] uppercase dark:text-white-light">Static Pages List</h5>
                </div>
                <div className="datatables">
                    <DataTable
                        className="table-hover whitespace-nowrap"
                        records={recordsData}
                        columns={[
                            { accessor: 'id', title: 'ID', sortable: true },
                            { accessor: 'pageName', title: 'Page Name', sortable: true },
                            { accessor: 'language', title: 'Language', sortable: true },
                            {
                                accessor: 'actions',
                                title: 'Actions',
                                sortable: false,
                                render: () => (
                                    <div className="flex items-center gap-3">
                                        <button
                                            type="button"
                                            className="btn shadow-none bg-[#012d22] text-white rounded-full font-normal font-['Raleway'] px-3"
                                            onClick={() => { router.push("/staticpages/editpagecontent") }}
                                        >
                                            <div className="flex items-center gap-2">
                                                <SolarIcon.Pen2 color='white' iconStyle='Bold' size={18} />
                                                Edit
                                            </div>
                                        </button>
                                    </div>
                                ),
                            },
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
                        paginationText={({ from, to, totalRecords }) => `Showing ${from} to ${to} of ${totalRecords} entries`}
                    />
                    <DeleteModal
                        isOpen={deleteModal}
                        setIsOpen={setDeleteModal}
                        serviceName='Delete Page'
                        description='Are you sure you want to delete the page?'
                    />
                </div>
            </div>
        </div>
    );
};

export default StaticPageManagement;
