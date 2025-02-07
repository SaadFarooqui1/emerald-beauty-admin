import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '@/store/themeConfigSlice';
import * as SolarIcon from 'solar-icon-set'
import { useRouter } from 'next/router';
import DeleteModal from '@/components/DeleteModal';
import { useDeleteCouponAction, useModelGetCoupons, useUpdateCouponStatusAction } from '@/models/coupon.model';
import { CouponI } from '@/types/coupon_types';
import { ErrorToast } from '@/utils/helper';
import { useTranslation } from 'react-i18next';


const Custom = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Coupons and Discounts'));
    });
    const router = useRouter();
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [deleteModal, setDeleteModal] = useState(false);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [selectedRecords, setSelectedRecords] = useState<any>([]);
    const [deleteRecordId, setDeleteRecordId] = useState<null | number>(null);
    const { t } = useTranslation();
    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: '_id',
        direction: 'asc',
    });


    const { mutate: deleteCoupon, isLoading: isDeleting } = useDeleteCouponAction();



    const deleteRecord = () => {
        if (deleteRecordId) {
            deleteCoupon(
                { id: deleteRecordId },
                {
                    onSuccess: () => {
                        setDeleteModal(false);
                        setDeleteRecordId(null);
                        ErrorToast(t('Coupon deleted successfully'), 'success', t('Success')?.toString());
                        refetch(); // Refresh the list
                    },
                    onError: (error) => {
                        setDeleteModal(false);
                        ErrorToast(t('Failed to delete coupon. Please try again.'), 'error', t('Error')?.toString());
                    },
                }
            );
        }
    }


    const { data, isLoading, isError, refetch } = useModelGetCoupons({
        page,
        "per-page": pageSize,
        search,
        relations: ['services']
    });


    const coupons = data?.data || [];
    const totalRecords = data?.meta?.total || 0;

    useEffect(() => {
        refetch();
    }, [page, pageSize, search, sortStatus]);


    const { mutate: updateCouponStatus, isLoading: isUpdatingCouponStatus } = useUpdateCouponStatusAction();


    const [updateRecordId, setUpdateRecordId] = useState<null | number>(null);


    const user = useSelector((state: any) => state?.auth.user);
    const filteredPermissions = user?.roles?.[0]?.permissions?.filter(
        (permission: any) => permission.meta.pivot_module_id === 110
    );



    return (
        <div>
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2 md:gap-0">
                <div>
                    <h4 className="text-[#012d22] text-2xl font-bold font-['Hermann'] rtl:font-['Tajawal'] rtl:font-medium uppercase dark:text-white-light">{t("Coupons and Discounts")}</h4>
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
                    <h5 className="text-xl font-bold text-[#012d22] font-['Hermann'] rtl:font-['Tajawal'] rtl:font-medium uppercase dark:text-white-light">{t("Coupons List")}</h5>
                    {filteredPermissions?.[0].meta.pivot_create === 1 && (
                        <div>
                            <button type="button" className="btn shadow-none bg-[#012d22] text-white rounded-full font-semibold font-['Raleway] rtl:font-['Tajawal'] rtl:font-medium text-lg px-3" onClick={() => router.push('/coupons/create')}>
                                {t("Create Coupon")}
                            </button>
                        </div>
                    )}
                </div>
                <div className="datatables">
                    <DataTable
                        className="table-hover whitespace-nowrap"
                        records={coupons}
                        columns={[
                            // { accessor: 'id', title: 'ID', },
                            {
                                accessor: 'index',
                                title: t("ID"),
                                sortable: false,
                                render: (_: any, index: number) => {
                                    return (page - 1) * pageSize + index + 1;
                                },
                            },
                            { accessor: 'code', title: t('Coupon Code') },
                            {
                                accessor: 'discount', title: t('Discount'),
                                render: (record) => <div>{record.discount}%</div>
                            },
                            { accessor: 'start_date', title: t('Valid From') },
                            { accessor: 'end_date', title: t('Valid Until') },
                            {
                                accessor: 'services',
                                title: t('Applicable Services'),
                                render: (record) =>
                                    record.services
                                        .map((service) => service.name)
                                        .join(', '),
                            },
                            {
                                accessor: 'is_active', title: 'Status',
                                render: (record) => {

                                    const handleToggle = () => {
                                        // Set the record ID first
                                        setUpdateRecordId(record.id);

                                        // Update status
                                        updateCouponStatus(
                                            { id: record.id }, // Toggle the current state
                                            {
                                                onSuccess: () => {
                                                    setUpdateRecordId(null); // Clear the state
                                                    ErrorToast(t(`Coupon ${record.is_active ? 'Deactivate' : 'Activate'} successfully`), 'success', t('Success')?.toString());
                                                    refetch(); // Refresh the list
                                                },
                                                onError: (error) => {
                                                    ErrorToast(t(`Failed to ${record.is_active ? 'Deactivate' : 'Activate'} coupon. Please try again.`), 'error', t('Error')?.toString());
                                                },
                                            }
                                        );
                                    };

                                    return (
                                        <div className="flex items-center gap-2">
                                            {filteredPermissions?.[0].meta.pivot_update === 1 && (
                                                <label className="w-12 h-6 relative">
                                                    <input
                                                        type="checkbox"
                                                        className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"
                                                        id="custom_switch_checkbox1"
                                                        defaultChecked={record.is_active}
                                                        onChange={handleToggle}
                                                    />

                                                    <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-[#012d22] before:transition-all before:duration-300"></span>
                                                </label>
                                            )}

                                            <span className="text-[#727272] text-sm font-normal font-['Raleway'] rtl:font-['Tajawal'] hover:text-black dark:hover:text-white-light/90 border-none">
                                                {record.is_active ? t('Activate') : t('Deactivate')}
                                            </span>
                                        </div>
                                    );
                                },
                            },
                            {
                                accessor: 'actions',
                                title: t('Actions'),
                                sortable: false,
                                render: (record: CouponI) => (
                                    <div className="flex items-center gap-3">
                                        {filteredPermissions?.[0].meta.pivot_update === 1 && (
                                            <button type="button" className="btn shadow-none bg-[#012d22] text-white rounded-full font-normal font-['Raleway] rtl:font-['Tajawal'] px-3" onClick={() => {
                                                router.push({
                                                    pathname: `/coupons/edit`,
                                                    query: { id: record.id },
                                                });
                                            }}>
                                                <div className="flex items-center gap-2">
                                                    <SolarIcon.Pen2 color='white' iconStyle='Bold' size={18} />
                                                    {t("Edit")}
                                                </div>
                                            </button>
                                        )}
                                        {filteredPermissions?.[0].meta.pivot_delete === 1 && (
                                            <button type="button" className="btn shadow-none bg-[#1bd9bf] text-[#012d22] rounded-full font-normal font-['Raleway] rtl:font-['Tajawal'] px-3" onClick={() => {
                                                setDeleteModal(true)
                                                setDeleteRecordId(record.id)
                                            }}>
                                                <div className="flex items-center gap-2">
                                                    <SolarIcon.TrashBinTrash color='#012d22' iconStyle='Bold' size={18} />
                                                    {t("Delete")}
                                                </div>
                                            </button>
                                        )}
                                        {filteredPermissions?.[0].meta.pivot_update === 0 && filteredPermissions?.[0].meta.pivot_delete === 0 && <p>-</p>}
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
                        deleteRecord={deleteRecord}
                        serviceName='Delete Coupon'
                        description='Are you sure you want to delete the coupon?'
                    />
                </div>
            </div>
        </div>
    );
};
Custom.authenticate = true;
export default Custom;
