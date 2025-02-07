import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { useDispatch, useSelector } from 'react-redux';
import * as SolarIcon from 'solar-icon-set'
import { setPageTitle } from '@/store/themeConfigSlice';
import { useRouter } from 'next/navigation'
import DeleteModal from '@/components/DeleteModal';
import { useModelGetLeaves, useUpdateLeaveApproveAction } from '@/models/leave.model';
import { ErrorToast } from '@/utils/helper';
import { useTranslation } from 'react-i18next';


const rowData = [
    {
        id: 1,
        name: 'Caroline',
        leaveType: 'Sick Leave',
        dateRange: '12 Jan 2024 - 15 Jan 2024',
        reason: 'Going to hospital',
        status: 'Pending',
    },
    {
        id: 2,
        name: 'Celeste',
        leaveType: 'Emergency Leave',
        dateRange: '23 Feb 2024 - 24 Feb 2024',
        reason: 'Personal',
        status: 'Approved',
    },
    {
        id: 3,
        name: 'Tillman',
        leaveType: 'Casual Leave',
        dateRange: '05 Mar 2024 - 07 Mar 2024',
        reason: 'Raining',
        status: 'Rejected',
    },
    {
        id: 4,
        name: 'Daisy',
        leaveType: 'Sick Leave',
        dateRange: '15 Jan 2024 - 17 Jan 2024',
        reason: 'Going to hospital',
        status: 'Pending',
    },
    {
        id: 5,
        name: 'Weber',
        leaveType: 'Casual Leave',
        dateRange: '22 Jan 2024 - 25 Jan 2024',
        reason: 'Personal',
        status: 'Approved',
    },
    {
        id: 6,
        name: 'Buckley',
        leaveType: 'Emergency Leave',
        dateRange: '10 Feb 2024 - 11 Feb 2024',
        reason: 'Raining',
        status: 'Rejected',
    },
    {
        id: 7,
        name: 'Latoya',
        leaveType: 'Sick Leave',
        dateRange: '30 Jan 2024 - 02 Feb 2024',
        reason: 'Going to hospital',
        status: 'Pending',
    },
    {
        id: 8,
        name: 'Kate',
        leaveType: 'Casual Leave',
        dateRange: '18 Feb 2024 - 21 Feb 2024',
        reason: 'Personal',
        status: 'Approved',
    },
    {
        id: 9,
        name: 'Marva',
        leaveType: 'Emergency Leave',
        dateRange: '08 Mar 2024 - 09 Mar 2024',
        reason: 'Raining',
        status: 'Rejected',
    },
    {
        id: 10,
        name: 'Decker',
        leaveType: 'Sick Leave',
        dateRange: '11 Jan 2024 - 13 Jan 2024',
        reason: 'Going to hospital',
        status: 'Pending',
    },
    {
        id: 11,
        name: 'Odom',
        leaveType: 'Casual Leave',
        dateRange: '02 Feb 2024 - 05 Feb 2024',
        reason: 'Personal',
        status: 'Approved',
    },
    {
        id: 12,
        name: 'Sellers',
        leaveType: 'Emergency Leave',
        dateRange: '14 Feb 2024 - 15 Feb 2024',
        reason: 'Raining',
        status: 'Rejected',
    },
    {
        id: 13,
        name: 'Wendi',
        leaveType: 'Sick Leave',
        dateRange: '19 Jan 2024 - 21 Jan 2024',
        reason: 'Going to hospital',
        status: 'Pending',
    },
    {
        id: 14,
        name: 'Sophie',
        leaveType: 'Casual Leave',
        dateRange: '25 Feb 2024 - 27 Feb 2024',
        reason: 'Personal',
        status: 'Approved',
    },
    {
        id: 15,
        name: 'Levine',
        leaveType: 'Emergency Leave',
        dateRange: '06 Mar 2024 - 07 Mar 2024',
        reason: 'Raining',
        status: 'Rejected',
    },
];



const LeaveManagement = () => {
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
                    item.name.toLowerCase().includes(search.toLowerCase()) ||
                    item.leaveType.toLowerCase().includes(search.toLowerCase()) ||
                    item.dateRange.toLowerCase().includes(search.toLowerCase()) ||
                    item.reason.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
    }, [search]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
    }, [sortStatus]);

    const { data, isLoading, isError, refetch } = useModelGetLeaves({
        page,
        "per-page": pageSize,
        search,
        relations: ['user']
    });


    const leaves = data?.data || [];
    const totalRecords = data?.meta?.total || 0;

    useEffect(() => {
        refetch();
    }, [page, pageSize, search, sortStatus]);



    const { mutate: updateApprove, isLoading: isUpdatingApprove } = useUpdateLeaveApproveAction();


    const user = useSelector((state: any) => state?.auth.user);
    const filteredPermissions = user?.roles?.[0]?.permissions?.filter(
        (permission: any) => permission.meta.pivot_module_id === 120
    );

    return (
        <div>
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2 md:gap-0">
                <div>
                    <h4 className="text-[#012d22] text-2xl font-bold font-['Hermann'] rtl:font-['Tajawal'] rtl:font-medium uppercase dark:text-white-light">{t("Leave Management")}</h4>
                </div>
                <div className="w-full sm:w-auto">
                    <div className='rounded-full border border-[#B8C3C0] dark:border-[#17263c] flex items-center justify-between px-4 bg-white dark:bg-[#121e32]'>
                        <input type="text" className="form-input w-full sm:w-72 px-0 py-3 bg-transparent dark:bg-transparent border-none font-normal font-['Raleway'] rtl:font-['Tajawal']" placeholder={t("Search Here")?.toString()} value={search} onChange={(e) => setSearch(e.target.value)} />
                        <SolarIcon.Magnifer className="text-[#012d22]" />
                    </div>
                </div>
            </div>
            <div className="panel mt-6">
                <div className="mb-5 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                    <h5 className="text-xl font-bold text-[#012d22] font-['Hermann'] rtl:font-['Tajawal'] rtl:font-medium uppercase dark:text-white-light">{t("Leave List")}</h5>
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
                        records={leaves}
                        columns={[
                            { accessor: 'id', title: t('ID') },
                            {
                                accessor: 'name',
                                title: t('Employee Name'),
                                render: (record) => `${record.user.first_name} ${record.user.last_name}`,
                            },
                            { accessor: 'leave_type_text', title: t('Leave Type') },
                            {
                                accessor: 'dateRange',
                                title: t('Date Range'),
                                render: (record) => `${record.start_date}-${record.end_date}`,
                            },
                            { accessor: 'reason', title: t('Reason') },
                            {
                                accessor: 'status',
                                title: t('Status'),
                                render: (record) => {
                                    const statusClasses: any = {
                                        'Approved': 'bg-[#D2F5F1] text-[#012d22] dark:bg-[#0F423C] dark:text-white',
                                        'Pending': 'bg-[#fff7ce] text-[#dbb900] dark:bg-[#4A3E00] dark:text-[#F5D100]',
                                        'Rejected': 'bg-[#F5D2D2] text-[#B90000] dark:bg-[#420F0F] dark:text-[#D20000]',
                                    };

                                    return (
                                        <div className={`badge rounded-full px-2.5 py-3 inline-flex items-center justify-center h-8 font-raleway rtl:font-['Tajawal'] rtl:font-medium ${statusClasses[record.leave_status_text]}`}>
                                            {t(record.leave_status_text)}
                                        </div>
                                    );
                                },
                            },
                            {
                                accessor: 'actions',
                                title: t('Actions'),
                                render: (record) => {
                                    const handleStatusUpdate = (status: number) => {
                                        updateApprove(
                                            {
                                                id: record.id,
                                                data: {
                                                    status: status, // Status dynamically set based on the button clicked
                                                },
                                            },
                                            {
                                                onSuccess: () => {
                                                    ErrorToast(`Leave ${status === 20 ? "approved" : "rejected"} successfully!`, 'success', 'Success');
                                                    refetch(); // Refresh the table data
                                                },
                                                onError: (error) => {
                                                    ErrorToast(`Failed to ${status === 20 ? "approved" : "rejected"} leave. Please try again.`, 'error', 'Error');
                                                },
                                            }
                                        );
                                    };
                                    return (
                                        <div className="flex items-center gap-3">
                                            {/* View button */}
                                            <button
                                                type="button"
                                                className="btn shadow-none bg-[#012d22] text-white rounded-full font-normal font-['Raleway] rtl:font-['Tajawal'] px-3"
                                                onClick={() => router.push(`/leaves/leave/${record.id}`)}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <SolarIcon.Eye color="white" iconStyle="Bold" size={18} />
                                                    {t("View")}
                                                </div>
                                            </button>
                                            {filteredPermissions?.[0].meta.pivot_update === 1 && (
                                                <>
                                                    {/* Approved button */}
                                                    {record.leave_status_text === 'Pending' && (
                                                        <button
                                                            type="button"
                                                            className="btn shadow-none bg-success text-white rounded-full font-normal font-['Raleway] rtl:font-['Tajawal'] px-3"
                                                            onClick={() => handleStatusUpdate(20)} // Pass status 20 for Approved
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <SolarIcon.CheckCircle color="white" iconStyle="Bold" size={18} />
                                                                {t("Approved")}
                                                            </div>
                                                        </button>
                                                    )}

                                                    {/* Rejected button */}
                                                    {record.leave_status_text === 'Pending' && (
                                                        <button
                                                            type="button"
                                                            className="btn shadow-none bg-danger text-white rounded-full font-normal font-['Raleway] rtl:font-['Tajawal'] px-3"
                                                            onClick={() => handleStatusUpdate(30)} // Pass status 30 for Rejected
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <SolarIcon.BillCross color="white" iconStyle="Bold" size={18} />
                                                                {t("Rejected")}
                                                            </div>
                                                        </button>
                                                    )}
                                                </>
                                            )}

                                        </div>
                                    )
                                },
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

LeaveManagement.authenticate = true;

export default LeaveManagement;
