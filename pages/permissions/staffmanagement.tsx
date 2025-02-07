import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '@/store/themeConfigSlice';
import * as SolarIcon from 'solar-icon-set';
import { useRouter } from 'next/router';
import DeleteModal from '@/components/DeleteModal';
import { ROLES } from '@/constants/app';
import { useModelGetUsers } from '@/models/user.model';
import { useDeleteUserAction } from '@/actions/users.acton';
import { ErrorToast } from '@/utils/helper';
import { useTranslation } from 'react-i18next';

const rowData = [
    {
        id: 1,
        name: 'Mike Anderson',
        email: 'mike.anderson@example.com',
        phone: '+971501234567',
        address: 'Dubai, UAE',
        role: 'Moderator',
        createdAt: '2024-11-01',
    },
    {
        id: 2,
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+971502345678',
        address: 'Abu Dhabi, UAE',
        role: 'Content Writer',
        createdAt: '2024-11-02',
    },
    {
        id: 3,
        name: 'Sarah Lee',
        email: 'sarah.lee@example.com',
        phone: '+971503456789',
        address: 'Sharjah, UAE',
        role: 'Account Manager',
        createdAt: '2024-11-03',
    },
    {
        id: 4,
        name: 'Emma Clark',
        email: 'emma.clark@example.com',
        phone: '+971504567890',
        address: 'Ajman, UAE',
        role: 'Social Media Lead',
        createdAt: '2024-11-04',
    },
    {
        id: 5,
        name: 'Alice Brown',
        email: 'alice.brown@example.com',
        phone: '+971505678901',
        address: 'Fujairah, UAE',
        role: 'Marketing Manager',
        createdAt: '2024-11-05',
    },
    {
        id: 6,
        name: 'David Johnson',
        email: 'david.johnson@example.com',
        phone: '+971506789012',
        address: 'Ras Al Khaimah, UAE',
        role: 'Customer Support',
        createdAt: '2024-11-06',
    }
];

const StaffManagement = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Permissions Management'));
    }, [dispatch]);
    const { t } = useTranslation();
    const router = useRouter();
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteRecordId, setDeleteRecordId] = useState<null | number>(null);
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
                    item.address.toLowerCase().includes(search.toLowerCase()) ||
                    item.role.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
    }, [search]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
    }, [sortStatus]);


    const { data, isLoading, isError, refetch } = useModelGetUsers({
        page,
        "per-page": pageSize,
        search,
        roles: [ROLES.CUSTOM],
    });


    const users = data?.data || [];
    const totalRecords = data?.meta?.total || 0;

    useEffect(() => {
        refetch();
    }, [page, pageSize, search, sortStatus]);



    const { mutate: deleteUser, isLoading: isDeleting } = useDeleteUserAction();



    const deleteRecord = () => {
        if (deleteRecordId) {
            deleteUser(
                { id: deleteRecordId },
                {
                    onSuccess: () => {
                        setDeleteModal(false);
                        setDeleteRecordId(null);
                        ErrorToast(t('Staff deleted successfully'), 'success', t('Success')?.toString());
                        refetch(); // Refresh the list
                    },
                    onError: (error) => {
                        ErrorToast(t('Failed to delete staff. Please try again.'), 'error', t('Error')?.toString());
                        setDeleteModal(false);
                    },
                }
            );
        }
    }



    return (
        <div>
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2 md:gap-0">
                <div>
                    <h4 className="text-[#012d22] text-2xl font-bold font-['Hermann'] rtl:font-['Tajawal'] rtl:font-medium uppercase dark:text-white-light">{t("Staff Management")}</h4>
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
                    <h5 className="text-xl font-bold text-[#012d22] font-['Hermann'] rtl:font-['Tajawal'] rtl:font-medium uppercase dark:text-white-light">{t("Staff List")}</h5>
                    <div className='flex items-center justify-between gap-3'>
                        <button type="button" className="btn shadow-none bg-[#012d22] text-white rounded-full font-semibold font-['Raleway] rtl:font-['Tajawal'] rtl:font-medium text-lg px-3" onClick={() => router.push('/permissions/createstaff')}>
                            {t("Create New Staff")}
                        </button>
                    </div>
                </div>
                <div className="datatables">
                    <DataTable
                        className="table-hover whitespace-nowrap"
                        records={users}
                        columns={[
                            { accessor: 'id', title: t('ID') },
                            {
                                accessor: 'name',
                                title: t('Name'),
                                
                                render: (record) => `${record.first_name} ${record.last_name}`,
                            },
                            { accessor: 'email', title: t('Email'), },
                            { accessor: 'phone', title: t('Phone Number'), },
                            // { accessor: 'address', title: 'Address', },
                            { accessor: 'roles[0].name', title: t('Role'), },
                            // { accessor: 'createdAt', title: 'Created At', },
                            {
                                accessor: 'actions',
                                title: t('Actions'),
                                sortable: false,
                                render: (record) => (
                                    <div className="flex items-center gap-3">
                                        <button type="button" className="btn shadow-none bg-[#012d22] text-white rounded-full font-normal font-['Raleway] rtl:font-['Tajawal'] px-3" onClick={() => {
                                            router.push({
                                                pathname: `/permissions/editstaff`,
                                                query: { id: record.id },
                                            });
                                        }}>
                                            <div className="flex items-center gap-2">
                                                <SolarIcon.Pen2 color='white' iconStyle='Bold' size={18} />
                                                {t("Edit")}
                                            </div>
                                        </button>
                                        <button type="button" className="btn shadow-none bg-[#1bd9bf] text-[#012d22] rounded-full font-normal font-['Raleway] rtl:font-['Tajawal'] px-3" onClick={() => {
                                            setDeleteModal(true)
                                            setDeleteRecordId(record.id)
                                        }}>
                                            <div className="flex items-center gap-2">
                                                <SolarIcon.TrashBinTrash color='#012d22' iconStyle='Bold' size={18} />
                                                {t("Delete")}
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
                    <DeleteModal
                        isOpen={deleteModal}
                        setIsOpen={setDeleteModal}
                        deleteRecord= {deleteRecord}
                        serviceName='Delete Permission'
                        description='Are you sure you want to delete the permission?'
                    />
                </div>
            </div>
        </div>
    );
};
StaffManagement.authenticate = true;
export default StaffManagement;
