import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '@/store/themeConfigSlice';
import * as SolarIcon from 'solar-icon-set'
import { useRouter } from 'next/router';
import DeleteModal from '@/components/DeleteModal';
import { useDeleteRoleAction, useModelGetRoles } from '@/models/role.model';
import { ErrorToast } from '@/utils/helper';
import { useTranslation } from 'react-i18next';


const RolesManagement = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Permissions Management'));
    });
    const router = useRouter();
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [deleteModal, setDeleteModal] = useState(false);
    const [selectedRecords, setSelectedRecords] = useState<any>([]);
    const [deleteRecordId, setDeleteRecordId] = useState<null | number>(null);
    const { t } = useTranslation();
    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: '_id',
        direction: 'asc',
    });



    const { data, isLoading, isError, refetch } = useModelGetRoles({
        page,
        "per-page": pageSize,
        search,
    });


    const roles = data?.data || [];
    const totalRecords = data?.meta?.total || 0;

    useEffect(() => {
        refetch();
    }, [page, pageSize, search, sortStatus]);

    const { mutate: deleteCategory, isLoading: isDeleting } = useDeleteRoleAction();

    const deleteRecord = () => {
        if (deleteRecordId) {
            deleteCategory(
                { id: deleteRecordId },
                {
                    onSuccess: () => {
                        setDeleteModal(false);
                        setDeleteRecordId(null);
                        ErrorToast(t('Role deleted successfully'), 'success', t('Success')?.toString());
                        refetch(); // Refresh the list
                    },
                    onError: (error) => {
                        ErrorToast(t('Failed to delete role. Please try again.'), 'error', t('Error')?.toString());
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
                    <h4 className="text-[#012d22] text-2xl font-bold font-['Hermann'] rtl:font-['Tajawal'] rtl:font-medium uppercase dark:text-white-light">{t("Roles Management")}</h4>
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
                    <h5 className="text-xl font-bold text-[#012d22] font-['Hermann'] rtl:font-['Tajawal'] rtl:font-medium uppercase dark:text-white-light">{t("Roles List")}</h5>
                    <div className='flex items-center justify-between gap-3'>
                        <button type="button" className="btn shadow-none bg-[#012d22] text-white rounded-full font-semibold font-['Raleway] rtl:font-['Tajawal'] rtl:font-medium text-lg px-3" onClick={() => router.push('/permissions/createrole')}>
                            {t("Create New Role")}
                        </button>
                        {/* <button type="button" className="btn shadow-none bg-[#1bd9bf] text-[#012d22] rounded-full font-semibold font-['Raleway] text-lg px-3" onClick={() => router.push('/permissions/create')}>
                            Create Permission
                        </button> */}
                    </div>
                </div>
                <div className="datatables">
                    <DataTable
                        className="table-hover whitespace-nowrap"
                        records={roles}
                        columns={[
                            { accessor: 'id', title: t('ID'), },
                            { accessor: 'name', title: t('Role'), },
                            {
                                accessor: 'permissions',
                                title: t('Permissions'),
                                
                                render: (record) =>
                                    record.permissions
                                        .map((permission) => permission.name)
                                        .join(', '),
                            },
                            {
                                accessor: 'actions',
                                title: t('Actions'),
                                sortable: false,
                                render: (record) => (
                                    <div className="flex items-center justify-end gap-3">
                                        <button type="button" className="btn shadow-none bg-[#012d22] text-white rounded-full font-normal font-['Raleway] rtl:font-['Tajawal'] px-3" onClick={() => {
                                            router.push({
                                                pathname: `/permissions/edit`,
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
                        deleteRecord={deleteRecord}
                        setIsOpen={setDeleteModal}
                        serviceName='Delete Role'
                        description='Are you sure you want to delete the role?'
                    />
                </div>
            </div>
        </div>
    );
};
RolesManagement.authenticate = true;
export default RolesManagement;
