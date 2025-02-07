import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '@/store/themeConfigSlice';
import * as SolarIcon from 'solar-icon-set';
import Dropdown from '@/components/Dropdown';
import { IRootState } from '@/store';
import { useModelGetBookings } from '@/models/booking.model';
import { useTranslation } from 'react-i18next';


const Custom = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Bookings Management'));
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

    // const handleStatusChange = (id: number, newStatus: string) => {
    //     // setRecordsData((prevRecords) =>
    //     //     prevRecords.map((item) =>
    //     //         item.id === id ? { ...item, status: newStatus } : item
    //     //     )
    //     // );
    //     console.log(`Status changed for record ${id} to ${newStatus}`);
    // };


    const { data, isLoading, isError, refetch } = useModelGetBookings({
        page,
        "per-page": pageSize,
        search,
        relations: ['provider', 'client', 'service']
    });


    const bookings = data?.data || [];
    const totalRecords = data?.meta?.total || 0;

    useEffect(() => {
        refetch();
    }, [page, pageSize, search, sortStatus]);


    return (
        <div>
            <div className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:justify-between md:gap-0">
                <div>
                    <h4 className="font-['Hermann'] rtl:font-['Tajawal'] rtl:font-medium text-2xl font-bold uppercase text-[#012d22] dark:text-white-light">{t("Bookings Management")}</h4>
                </div>
                <div className="w-full sm:w-auto">
                    <div className="flex items-center justify-between rounded-full border border-[#B8C3C0] bg-white px-4 dark:border-[#17263c] dark:bg-[#121e32]">
                        <input
                            type="text"
                            className="form-input w-full border-none bg-transparent px-0 py-3 font-['Raleway'] font-normal rtl:font-['Tajawal'] dark:bg-transparent sm:w-72"
                            placeholder={t("Search Here")?.toString()}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <SolarIcon.Magnifer className="text-[#012d22]" />
                    </div>
                </div>
            </div>
            <div className="panel mt-6">
                <div className="mb-5 flex items-center">
                    <h5 className="font-['Hermann'] rtl:font-['Tajawal'] rtl:font-medium text-xl font-bold uppercase text-[#012d22] dark:text-white-light">{t("Booking List")}</h5>
                </div>
                <div className="datatables">
                    <DataTable
                        className="table-hover whitespace-nowrap"
                        records={bookings}
                        columns={[
                            { accessor: 'id', title: t('ID')},
                            {
                                accessor: 'name',
                                title: t('Employee Name'),
                                render: (record) => `${record?.provider?.first_name} ${record?.provider?.last_name}`,
                            },
                            {
                                accessor: 'client',
                                title: t('Client Name'),
                                render: (record) => `${record.client.first_name} ${record.client.last_name}`,
                            },
                            { accessor: 'service.name', title: t('Service')},
                            // { accessor: 'addons', title: 'Add-ons', sortable: true },
                            { accessor: 'date', title: t('Date')},
                            {
                                accessor: 'time',
                                title: t('Time'),
                                render: (record) => `${record.start_time}-${record.end_time}`,
                            },
                            { accessor: 'amount', title: t('Total Amount'), render: ({ amount, id }) => <div key={id}>{`${amount} AED`}</div> },
                            {
                                accessor: 'status_text',
                                title: t('Status'),
                                render: (record) => {
                                    const statusClasses: any = {
                                        InProgress: 'bg-[#d2e4f5] text-[#004b91] dark:bg-[#0F2942] dark:text-[#0058AB]',
                                        OnRoute: 'bg-[#FFECCA] text-[#FFA500] dark:bg-[#4E3200] dark:text-[#FFAF1A]',
                                        Pending: 'bg-[#fff7ce] text-[#dbb900] dark:bg-[#4A3E00] dark:text-[#F5D100]',
                                        Completed: 'bg-[#D2F5F1] text-[#012d22] dark:bg-[#0F423C] dark:text-white',
                                        Cancelled: 'bg-[#F5D2D2] text-[#B90000] dark:bg-[#420F0F] dark:text-[#D20000]',
                                        Confirmed: 'bg-[#D2F5F1] text-[#012d22] dark:bg-[#0F423C] dark:text-white',
                                    };

                                    return (
                                        <>
                                            <div className={`badge font-raleway inline-flex h-8 items-center justify-center rounded-full px-2.5 py-3 rtl:font-['Tajawal'] rtl:font-medium ${statusClasses[record.status_text]}`}>
                                                {t(record.status_text)}
                                            </div>
                                            {/* <div className="dropdown">
                                                <Dropdown
                                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                                    btnClassName="dropdown-toggle"
                                                    button={
                                                        <>
                                                            <div className={`badge font-raleway inline-flex h-8 items-center justify-center rounded-full px-2.5 py-3 ${statusClasses[record.status_text]}`}>
                                                                {record.status_text}
                                                            </div>
                                                        </>
                                                    }
                                                >
                                                    <ul className="!min-w-[170px]">
                                                        <li>
                                                            <button type="button" onClick={() => handleStatusChange(record.id, 'InProgress')}>
                                                                In Progress
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button type="button" onClick={() => handleStatusChange(record.id, 'OnRoute')}>
                                                                On Route
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button type="button" onClick={() => handleStatusChange(record.id, 'Pending')}>
                                                                Pending
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button type="button" onClick={() => handleStatusChange(record.id, 'Completed')}>
                                                                Completed
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button type="button" onClick={() => handleStatusChange(record.id, 'Cancelled')}>
                                                                Cancelled
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </Dropdown>
                                            </div> */}
                                        </>
                                    );
                                },
                            },
                        ]}
                        highlightOnHover
                        verticalAlignment="center"
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
