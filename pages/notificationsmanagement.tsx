import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '@/store/themeConfigSlice';
import * as SolarIcon from 'solar-icon-set'
import { useRouter } from 'next/router';
import { useModelGetNotifications } from '@/models/notification.model';
import { useTranslation } from 'react-i18next';

const rowData = [
    {
        id: 1,
        title: 'System Maintenance',
        datecreated: '20 Oct, 2024',
    },
    {
        id: 2,
        title: 'Special Promotion',
        datecreated: '10 Oct, 2024',
    },
    {
        id: 3,
        title: 'New Feature Release',
        datecreated: '25 Sep, 2024',
    },
    {
        id: 4,
        title: 'Account Alert',
        datecreated: '12 Sep, 2024',
    }
];


const Custom = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Notifications Management'));
    });
    const router = useRouter();
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(rowData, 'id'));
    const [recordsData, setRecordsData] = useState(initialRecords);
    const { t } = useTranslation();
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
                    item.title.toLowerCase().includes(search.toLowerCase()) ||
                    item.datecreated.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
    }, [search]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
    }, [sortStatus]);


    const { data, isLoading, isError, refetch } = useModelGetNotifications({
        page,
        "per-page": pageSize,
        search,
    });


    const notifictaions = data?.data || [];
    const totalRecords = data?.meta?.total || 0;

    useEffect(() => {
        refetch();
    }, [page, pageSize, search, sortStatus]);


    return (
        <div>
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2 md:gap-0">
                <div>
                    <h4 className="text-[#012d22] text-2xl font-bold font-['Hermann'] rtl:font-medium rtl:font-['Tajawal'] uppercase dark:text-white-light">{t("Notifications Management")}</h4>
                </div>
                <div className="w-full sm:w-auto">
                    <div className='rounded-full border border-[#B8C3C0] dark:border-[#17263c] flex items-center justify-between px-4 bg-white dark:bg-[#121e32]'>
                        <input type="text" className="form-input w-full sm:w-72 px-0 py-3 bg-transparent dark:bg-transparent border-none font-normal font-['Raleway'] rtl:font-['Tajawal']" placeholder={t("Search Here")?.toString()} value={search} onChange={(e) => setSearch(e.target.value)} />
                        <SolarIcon.Magnifer className="text-[#012d22]" />
                    </div>
                </div>
            </div>
            <div className="panel mt-6">
                <div className="mb-5 flex flex-col gap-3 sm:flex-row items-center justify-center sm:justify-between">
                    <h5 className="text-xl font-bold text-[#012d22] font-['Hermann'] rtl:font-medium rtl:font-['Tajawal'] uppercase dark:text-white-light">{t("Notifications List")}</h5>
                    <div>
                        <button type="button" className="btn shadow-none bg-[#012d22] text-white rounded-full font-semibold font-['Raleway] rtl:font-medium rtl:font-['Tajawal'] text-lg px-3" onClick={() => router.push('/notificationsmanagement/notification/create')}>
                            {t("Create New Notification")}
                        </button>
                    </div>
                </div>
                <div className="datatables">
                    <DataTable
                        className="table-hover whitespace-nowrap"
                        records={notifictaions}
                        columns={[
                            { accessor: 'id', title: t('ID'), },
                            { accessor: 'title', title: t('Title'), },
                            {
                                accessor: 'created_at', title: t('Date Created'), 
                                render: (record) => (
                                    <div className="">
                                        {record.created_at.substring(0, 10)}
                                    </div>
                                ),
                            },
                            {
                                accessor: 'actions',
                                title: t('Actions'),
                                sortable: false,
                                render: (record) => (
                                    <div className="flex items-center gap-3">
                                        <button type="button" className="btn shadow-none bg-[#012d22] text-white rounded-full font-normal font-['Raleway] rtl:font-['Tajawal'] px-3"
                                            onClick={() => {
                                                router.push({
                                                    pathname: `/notificationsmanagement/notification/notificationdetail`,
                                                    query: { id: record.id },
                                                });
                                            }}
                                        >
                                            <div className="flex items-center gap-2">
                                                <SolarIcon.Eye color='white' iconStyle='Bold' size={18} />
                                                {t("View")}
                                            </div>
                                        </button>
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
                        paginationText={({ from, to, totalRecords }) => `${t("Showing")} ${from} ${t("to.1")} ${to} ${t("of.1")} ${totalRecords} ${t("entries")}`}
                    />
                </div>
            </div>
        </div>
    );
};
Custom.authenticate = true;
export default Custom;
