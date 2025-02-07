import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as SolarIcon from 'solar-icon-set'
import { setPageTitle } from '@/store/themeConfigSlice';
import { useRouter } from 'next/navigation'
import DeleteModal from '@/components/DeleteModal';
import { useModelGetUsers } from '@/models/user.model';
import { ROLES } from '@/constants/app';
import { useUpdateUserStatusAction } from '@/actions/users.acton';
import { ErrorToast } from '@/utils/helper';
import { useTranslation } from 'react-i18next';


const Custom = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('User Management'));
    });
    const router = useRouter()
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [deleteModal, setDeleteModal] = useState(false);
    const [selectedRecords, setSelectedRecords] = useState<any>([]);

    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: '_id',
        direction: 'asc',
    });

    const { data, isLoading, isError, refetch } = useModelGetUsers({
        page,
        "per-page": pageSize,
        search,
        roles: [ROLES.USER]
    });


    const users = data?.data || [];
    const totalRecords = data?.meta?.total || 0;

    useEffect(() => {
        refetch();
    }, [page, pageSize, search, sortStatus]);

    const { mutate: updateUserStatus, isLoading: isUpdatingUserStatus } = useUpdateUserStatusAction();


    const [updateRecordId, setUpdateRecordId] = useState<null | number>(null);

    const user = useSelector((state: any) => state?.auth.user);
    const filteredPermissions = user?.roles?.[0]?.permissions?.filter(
        (permission: any) => permission.meta.pivot_module_id === 40
    );


    return (
        <div>
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2 md:gap-0">
                <div>
                    <h4 className="text-[#012d22] text-2xl font-bold font-['Hermann'] rtl:font-['Tajawal'] uppercase dark:text-white-light">{t("Users Management")}</h4>
                </div>
                <div className="w-full sm:w-auto">
                    <div className='rounded-full border border-[#B8C3C0] dark:border-[#17263c] flex items-center justify-between px-4 bg-white dark:bg-[#121e32]'>
                        <input type="text" className="form-input w-full sm:w-72 px-0 py-3 bg-transparent dark:bg-transparent border-none font-normal font-['Raleway'] rtl:font-['Tajawal']" placeholder={t("Search Here")?.toString()} value={search} onChange={(e) => setSearch(e.target.value)} />
                        <SolarIcon.Magnifer className="text-[#012d22]" />
                    </div>
                </div>
            </div>
            <div className="panel mt-6">

                <div className="mb-5 flex flex-col gap-5 md:flex-row md:items-center">
                    <h5 className="text-xl font-bold text-[#012d22] font-['Hermann'] rtl:font-['Tajawal'] uppercase dark:text-white-light">{t("Users List")}</h5>
                </div>
                <div className="datatables">
                    <DataTable
                        className="table-hover whitespace-nowrap"
                        records={users}
                        columns={[
                            { accessor: 'id', title: t("ID"), },
                            {
                                accessor: 'name',
                                title: t("Name"),
                                render: (record) => `${record.first_name} ${record.last_name}`,
                            },
                            { accessor: 'email', title: t('Email Address'), },
                            { accessor: 'phone', title: t('Phone Number'), },
                            // { accessor: 'bookings', title: 'Bookings', },
                            {
                                accessor: 'isActive',
                                title: t('Status'),
                                render: (record) => {
                                    const handleToggle = () => {
                                        // Set the record ID first
                                        setUpdateRecordId(record.id);

                                        // Update status
                                        updateUserStatus(
                                            { id: record.id }, // Toggle the current state
                                            {
                                                onSuccess: () => {
                                                    setUpdateRecordId(null); // Clear the state
                                                    ErrorToast(t(`User ${record.is_active ? 'Deactivate' : 'Activate'} successfully`), 'success', t('Success')?.toString());
                                                    refetch(); // Refresh the list
                                                },
                                                onError: (error) => {
                                                    ErrorToast(t(`Failed to ${record.is_active ? 'Deactivate' : 'Activate'} user. Please try again.`), 'error', t('Error')?.toString());
                                                },
                                            }
                                        );
                                    };

                                    return (
                                        <>
                                            {filteredPermissions?.[0].meta.pivot_update === 1 ? (
                                                <div className="flex items-center gap-2">
                                                    <label className="w-9 h-5 relative rtl:rotate-y-180">
                                                        <input
                                                            type="checkbox"
                                                            className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"
                                                            id="custom_switch_checkbox1"
                                                            defaultChecked={record.is_active}
                                                            onChange={handleToggle}
                                                        />
                                                        <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-3 before:h-3 before:rounded-full peer-checked:before:left-5 peer-checked:bg-[#012d22] before:transition-all before:duration-300"></span> {/* Adjusted size */}
                                                    </label>
                                                    <span className="text-[#727272] text-sm font-normal font-['Raleway'] rtl:font-['Tajawal'] hover:text-black dark:hover:text-white-light/90 border-none">
                                                        {record.is_active ? t('Activate') : t('Deactivate')}
                                                    </span>
                                                </div>
                                            ) : <p>-</p> }

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
                                        <button type="button" className="btn shadow-none bg-[#012d22] text-white rounded-full font-normal font-['Raleway] rtl:font-['Tajawal'] px-3" onClick={() => router.push(`/usermanagement/user/${record.id}`)}>
                                            <div className="flex items-center gap-2">
                                                <SolarIcon.Eye color='white' iconStyle='Bold' size={18} />
                                                {t("View")}
                                            </div>
                                        </button>
                                        {/* <button type="button" className="btn shadow-none bg-[#1bd9bf] text-[#012d22] rounded-full font-normal font-['Raleway] px-3" onClick={() => setDeleteModal(true)}>
                                            <div className="flex items-center gap-2">
                                                <SolarIcon.TrashBinTrash color='#012d22' iconStyle='Bold' size={18} />
                                                Delete
                                            </div>
                                        </button> */}
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
                        paginationText={({ from, to, totalRecords }) => `${t("Showing")}  ${from} ${t("to.1")} ${to} ${t("of.1")} ${totalRecords} ${t("entries")}`}
                    />
                    <DeleteModal
                        isOpen={deleteModal}
                        setIsOpen={setDeleteModal}
                        serviceName='Delete User'
                        description='Are you sure you want to delete the user?'
                    />
                </div>
            </div>
        </div>
    );
};
Custom.authenticate = true;
export default Custom;
