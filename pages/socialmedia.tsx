import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '@/store/themeConfigSlice';
import * as SolarIcon from 'solar-icon-set'
import { useRouter } from 'next/router';
import DeleteModal from '@/components/DeleteModal';
import { useModelGetSocialMedia, useDeleteSocialMediaAction } from '@/models/socialMedia.model';
import { ErrorToast } from '@/utils/helper';
import { useTranslation } from 'react-i18next';

const rowData = [
    {
        id: 2,
        socialplatform: 'Facebook',
        link: 'https://facebook.com/demoname',
    },
    {
        id: 3,
        socialplatform: 'Instagram',
        link: 'https://instagram.com/demoname',
    },
    {
        id: 1,
        socialplatform: 'LinkedIn',
        link: 'https://linkedin.com/company/demoname',
    }
];


const Custom = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Social Media'));
    });
    const router = useRouter();
    const { t } = useTranslation();
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [deleteModal, setDeleteModal] = useState(false);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
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
                    item.id.toString().includes(search.toLowerCase()) ||
                    item.socialplatform.toLowerCase().includes(search.toLowerCase()) ||
                    item.link.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
    }, [search]);


    const { mutate: deleteSocialMedia, isLoading: isDeleting } = useDeleteSocialMediaAction();



    const deleteRecord = () => {
        if (deleteRecordId) {
            deleteSocialMedia(
                { id: deleteRecordId },
                {
                    onSuccess: () => {
                        setDeleteModal(false);
                        setDeleteRecordId(null);
                        ErrorToast(t('Social Media deleted successfully'), 'success', t('Success')?.toString());
                        refetch(); // Refresh the list
                    },
                    onError: (error) => {
                        ErrorToast(t('Failed to delete social media. Please try again.'), 'error', t('Error')?.toString());
                        setDeleteModal(false);
                    },
                }
            );
        }
    }


    const { data, isLoading, isError, refetch } = useModelGetSocialMedia({
        page,
        "per-page": pageSize,
        search,
    });


    const social_media = data?.data || [];
    const totalRecords = data?.meta?.total || 0;


    useEffect(() => {
        refetch();
    }, [page, pageSize, search]);



    const user = useSelector((state: any) => state?.auth.user);
    const filteredPermissions = user?.roles?.[0]?.permissions?.filter(
        (permission: any) => permission.meta.pivot_module_id === 100
    );

    return (
        <div>
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2 md:gap-0">
                <div>
                    <h4 className="text-[#012d22] text-2xl font-bold font-['Hermann'] rtl:font-['Tajawal'] rtl:font-medium uppercase dark:text-white-light">{t("Social Media Links")}</h4>
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
                    <h5 className="text-xl font-bold text-[#012d22] font-['Hermann'] rtl:font-['Tajawal'] rtl:font-medium uppercase dark:text-white-light">{t("Social Media List")}</h5>
                    {filteredPermissions?.[0].meta.pivot_create === 1 && (
                        <div className='flex items-center justify-between gap-3'>
                            <button type="button" className="btn shadow-none bg-[#012d22] text-white rounded-full font-semibold font-['Raleway] rtl:font-['Tajawal'] rtl:font-medium text-lg px-3" onClick={() => router.push('/socialmedia/create')}>
                                {t("Add New")}
                            </button>
                        </div>
                    )}
                </div>
                <div className="datatables">
                    <DataTable
                        className="table-hover whitespace-nowrap"
                        records={social_media}
                        columns={[
                            { accessor: 'id', title: t('ID'), },
                            {
                                accessor: 'type',
                                title: t('Social Media Platform'),

                                render: (row) => {
                                    switch (row.type) {
                                        case 10:
                                            return 'Facebook';
                                        case 20:
                                            return 'Instagram';
                                        case 30:
                                            return 'LinkedIn';
                                        case 40:
                                            return 'Twitter';
                                        case 50:
                                            return 'Threads';
                                        default:
                                            return 'Unknown';
                                    }
                                }
                            },
                            { accessor: 'url', title: t('Link'), },
                            {
                                accessor: 'actions',
                                title: t('Actions'),

                                render: (record) => (
                                    <div className="flex items-center gap-3">
                                        {filteredPermissions?.[0].meta.pivot_update === 1 && (
                                            <button type="button" className="btn shadow-none bg-[#012d22] text-white rounded-full font-normal font-['Raleway] rtl:font-['Tajawal'] px-3"
                                                onClick={() => {
                                                    router.push({
                                                        pathname: `/socialmedia/edit`,
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
                        // selectedRecords={selectedRecords}
                        // onSelectedRecordsChange={setSelectedRecords}
                        minHeight={200}
                        paginationText={({ from, to, totalRecords }) => `${t("Showing")}  ${from} ${t("to")} ${to} ${t("of")} ${totalRecords} ${t("entries")}`}
                    />
                    <DeleteModal
                        isOpen={deleteModal}
                        setIsOpen={setDeleteModal}
                        deleteRecord={deleteRecord}
                        serviceName='Delete Link'
                        description='Are you sure you want to delete the social media link?'
                    />
                </div>
            </div>
        </div >
    );
};
Custom.authenticate = true;
export default Custom;
