import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { useDispatch } from 'react-redux';
import * as SolarIcon from 'solar-icon-set'
import { setPageTitle } from '@/store/themeConfigSlice';
import { useRouter } from 'next/navigation'
import DeleteModal from '@/components/DeleteModal';
import { ROLES } from '@/constants/app';
import { useModelGetUsers } from '@/models/user.model';
import { useTranslation } from 'react-i18next';



const FreelancerList = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    useEffect(() => {
        dispatch(setPageTitle('Freelancers Management'));
    });
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [deleteModal, setDeleteModal] = useState(false);
    const [selectedRecords, setSelectedRecords] = useState<any>([]);
    const { t } = useTranslation();
    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: '_id',
        direction: 'asc',
    });

    const { data, isLoading, isError, refetch } = useModelGetUsers({
        page,
        "per-page": pageSize,
        search,
        roles: [ROLES.FREELANCER],
        relations: ["user_categories"]
    });


    const users = data?.data || [];
    const totalRecords = data?.meta?.total || 0;

    useEffect(() => {
        refetch();
    }, [page, pageSize, search, sortStatus]);

    return (
        <div>
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2 md:gap-0">
                <div>
                    <h4 className="text-[#012d22] text-2xl font-bold font-['Hermann'] rtl:font-['Tajawal'] rtl:font-medium uppercase dark:text-white-light">{t("Freelancers Management")}</h4>
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
                    <h5 className="text-xl font-bold text-[#012d22] font-['Hermann'] rtl:font-['Tajawal'] rtl:font-medium uppercase dark:text-white-light">{t("Freelancers List")}</h5>
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
                        records={users}
                        columns={[
                            { accessor: 'id', title: t('ID'), },
                            {
                                accessor: 'name',
                                title: t('Name'),
                                
                                render: (record) => `${record.first_name} ${record.last_name}`,
                            },
                            { accessor: 'email', title: t('Email Address'), },
                            { accessor: 'phone', title: t('Phone Number'), },
                            {
                                accessor: 'expertise',
                                title: t('Expertise'),
                                
                                render: (record) => 
                                  record?.user_categories ? record?.user_categories 
                                    .map((userCategory) => userCategory?.category?.name)
                                    .join(', ') : "-", 
                            },
                            // { accessor: 'bookings', title: 'Total Bookings', },
                            // { accessor: 'commission', title: 'Commission', },
                            {
                                accessor: 'isActive',
                                title: t('Status'),
                                
                                render: (record) => {
                                    const handleToggle = () => {
                                        // setRecordsData((prevRecords) =>
                                        //     prevRecords.map((item) =>
                                        //         item.id === record.id ? { ...item, isActive: !item.isActive } : item
                                        //     )
                                        // );
                                    }

                                    return (
                                        <div>
                                            <p className="text-[#727272] text-sm font-normal font-['Raleway'] rtl:font-['Tajawal'] hover:text-black dark:hover:text-white-light/90 border-none">
                                                {record.is_active ? t('Activate') : t('Deactivate')}
                                            </p>
                                        </div>
                                    );
                                },
                            },
                            {
                                accessor: 'isApproved',
                                title: t('Approval'),
                                
                                render: (record) => {
                                    const handleToggle = () => {
                                        // setRecordsData((prevRecords) =>
                                        //     prevRecords.map((item) =>
                                        //         item.id === record.id ? { ...item, isActive: !item.isActive } : item
                                        //     )
                                        // );
                                    }

                                    return (
                                        <div>
                                            <p className="text-[#727272] text-sm font-normal font-['Raleway'] rtl:font-['Tajawal'] hover:text-black dark:hover:text-white-light/90 border-none">
                                                {record.is_approved ? t('Approved') : t('Unapproved')}
                                            </p>
                                        </div>
                                    );
                                },
                            },
                            {
                                accessor: 'actions',
                                title: t('Actions'),
                                sortable: false,
                                render: (record) => (
                                    <div className="flex items-center gap-3">
                                        <button type="button" className="btn shadow-none bg-[#012d22] text-white rounded-full font-normal font-['Raleway] px-3" onClick={() => router.push(`/freelancermanagement/freelancer/${record.id}`)}>
                                            <div className="flex items-center gap-2">
                                                <SolarIcon.Eye color='white' iconStyle='Bold' size={18} />
                                                View
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
                        serviceName='Delete Freelancer'
                        description='Are you sure you want to delete the freelancer?'
                    />
                </div>
            </div>
        </div>
    );
};
FreelancerList.authenticate = true;
export default FreelancerList;
