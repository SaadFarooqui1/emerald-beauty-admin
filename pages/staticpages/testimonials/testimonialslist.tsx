import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { useDispatch, useSelector } from 'react-redux';
import * as SolarIcon from 'solar-icon-set';
import { setPageTitle } from '@/store/themeConfigSlice';
import { useRouter } from 'next/router';
import DeleteModal from '@/components/DeleteModal';
import { useDeleteTestimonialAction, useModelGetTestimonials } from '@/models/testimonial.model';
import { ErrorToast } from '@/utils/helper';
import { useTranslation } from 'react-i18next';

// Static Page Names and Languages
const rowData = [
    {
        id: 1,
        review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lobortis erat posuere, tincidunt sem at, sagittis dolor.',
        customername: 'Nikky Kimso',
    },
    {
        id: 2,
        review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lobortis erat posuere, tincidunt sem at, sagittis dolor.',
        customername: 'Mike Kim',
    },
    {
        id: 3,
        review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lobortis erat posuere, tincidunt sem at, sagittis dolor.',
        customername: 'Di Caprio',
    },
    {
        id: 4,
        review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lobortis erat posuere, tincidunt sem at, sagittis dolor.',
        customername: 'John Doe',
    },
];

const Testimonials = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    useEffect(() => {
        dispatch(setPageTitle('Testimonials List'));
    });
    const { t } = useTranslation();
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [deleteModal, setDeleteModal] = useState(false);
    const [initialRecords, setInitialRecords] = useState(sortBy(rowData, 'id'));
    const [recordsData, setRecordsData] = useState(initialRecords);
    const [selectedRecords, setSelectedRecords] = useState<any>([]);
    const [deleteRecordId, setDeleteRecordId] = useState<null | number>(null);
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
                    item.review.toLowerCase().includes(search.toLowerCase()) ||
                    item.customername.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
    }, [search]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
    }, [sortStatus]);


    const { data, isLoading, isError, refetch } = useModelGetTestimonials({
        page,
        "per-page": pageSize,
        search,
    });

    const testimonials = data?.data || [];
    const totalRecords = data?.meta?.total || 0;

    useEffect(() => {
        refetch();
    }, [page, pageSize, search, sortStatus]);


    const { mutate: deleteTestimonial, isLoading: isDeleting } = useDeleteTestimonialAction();

    const deleteRecord = () => {
        if (deleteRecordId) {
            deleteTestimonial(
                { id: deleteRecordId },
                {
                    onSuccess: () => {
                        setDeleteModal(false);
                        setDeleteRecordId(null);
                        ErrorToast(t('Testimonial deleted successfully'), 'success', t('Success')?.toString());
                        refetch(); // Refresh the list
                    },
                    onError: (error) => {
                        // console.error("Error deleting Testimonial:", error);
                        setDeleteModal(false);
                        ErrorToast(t('Failed to delete Testimonial. Please try again.'), 'error', t('Error')?.toString());
                    },
                }
            );
        }
    }



    const user = useSelector((state: any) => state?.auth.user);
    const filteredPermissions = user?.roles?.[0]?.permissions?.filter(
        (permission: any) => permission.meta.pivot_module_id === 90
    );


    return (
        <div>
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2 md:gap-0">
                <div>
                    <h4 className="text-[#012d22] text-2xl font-bold font-['Hermann'] rtl:font-medium rtl:font-['Tajawal'] uppercase dark:text-white-light">{t("Testimonials")}</h4>
                </div>
            </div>
            <div className="panel mt-6">
                <div className="mb-5 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                    <h5 className="text-xl font-bold text-[#012d22] font-['Hermann'] rtl:font-medium rtl:font-['Tajawal'] uppercase dark:text-white-light">{t("Testimonials List")}</h5>
                    {filteredPermissions?.[0].meta.pivot_create === 1 && (
                        <div>
                            <button type="button" className="btn shadow-none bg-[#012d22] text-white rounded-full font-semibold font-['Raleway] rtl:font-medium rtl:font-['Tajawal'] text-lg px-3" onClick={() => router.push("/staticpages/testimonials/addtestimonial")}>
                                {t("Add Testimonial")}
                            </button>
                        </div>
                    )}
                </div>
                <div className="datatables">
                    <DataTable
                        className="table-hover whitespace-nowrap"
                        records={testimonials}
                        columns={[
                            { accessor: 'id', title: t('ID') },
                            { accessor: 'review', title: t('Review') },
                            { accessor: 'name', title: t('Customer Name') },
                            {
                                accessor: 'actions',
                                title: t('Actions'),
                                render: (record) => (
                                    <div className="flex items-center gap-3">
                                        {filteredPermissions?.[0].meta.pivot_update === 1 && (
                                            <button
                                                type="button"
                                                className="btn shadow-none bg-[#012d22] text-white rounded-full font-normal font-['Raleway'] rtl:font-['Tajawal'] px-3"
                                                onClick={() => {
                                                    router.push({
                                                        pathname: `/staticpages/testimonials/edittestimonial`,
                                                        query: { id: record.id },
                                                    });
                                                }}
                                            >
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
                                        {filteredPermissions?.[0].meta.pivot_delete === 0 && filteredPermissions?.[0].meta.pivot_update === 0 && (
                                            <p>-</p>
                                        )}
                                    </div>
                                ),
                            },
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
                        deleteRecord={deleteRecord}
                        serviceName='Delete Testimonial'
                        description='Are you sure you want to delete this testimonial?'
                    />
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
