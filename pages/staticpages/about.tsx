import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { useDispatch, useSelector } from 'react-redux';
import * as SolarIcon from 'solar-icon-set';
import { setPageTitle } from '@/store/themeConfigSlice';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { IRootState } from '@/store';
import { useModelGetSections } from '@/models/sections.model';

// Static Page Names and Languages
const rowData = [
    {
        id: 1,
        sectionname: 'About',
        editLink: '/staticpages/about/about',
    },
    {
        id: 2,
        sectionname: 'Our Story',
        editLink: '/staticpages/about/ourstory',
    },
    {
        id: 3,
        sectionname: 'Meet Our Specialists',
        editLink: '/staticpages/about/meetspecialists',
    },
];

const About = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    useEffect(() => {
        dispatch(setPageTitle('About'));
    });
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const { t } = useTranslation();
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
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
                    item.sectionname.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
    }, [search]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
    }, [sortStatus]);

    const { data, isLoading, isError, refetch } = useModelGetSections({
        type: 20
    });


    const secData = data?.data || [];
    const totalRecords = data?.meta?.total || 0;


    return (
        <div>
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2 md:gap-0">
                <div>
                    <h4 className="text-[#012d22] text-2xl font-bold font-['Hermann'] rtl:font-medium rtl:font-['Tajawal'] uppercase dark:text-white-light">{t("About")}</h4>
                </div>
            </div>
            <div className="panel mt-6">
                <div className="mb-5 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                    <h5 className="text-xl font-bold text-[#012d22] font-['Hermann'] rtl:font-medium rtl:font-['Tajawal'] uppercase dark:text-white-light">{t("About Sections")}</h5>
                </div>
                <div className="datatables">
                    <DataTable
                        className="table-hover whitespace-nowrap"
                        records={secData}
                        columns={[
                            { accessor: 'id', title: t('ID') },
                            {
                                accessor: 'name', title: t('Section Name'),
                                render: (record) => {
                                    return (
                                        <p className="text-[#727272] font-normal rtl:font-['Tajawal'] dark:text-white-light">{t(record.name)}</p>
                                    )
                                }
                            },
                            {
                                accessor: 'actions',
                                title: t('Actions'),
                                render: (record) => {
                                    let path : string;
                                    switch (record.name) {
                                        case "About":
                                            path = "/staticpages/about/about";
                                            break;
                                        case "Our Story":
                                            path = "/staticpages/about/ourstory";
                                            break;
                                        case "Meet Our Specialists":
                                            path = "/staticpages/about/meetspecialists";
                                            break;
                                        default:
                                            path = "Unknown";
                                            break;
                                    }
                                    return (
                                        <div className="flex items-center gap-3">
                                            <button
                                                type="button"
                                                className="btn shadow-none bg-[#012d22] text-white rounded-full font-normal font-['Raleway'] rtl:font-['Tajawal'] px-3"
                                                onClick={() => { router.push(`${path}?id=${record.id}`) }}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <SolarIcon.Pen2 color='white' iconStyle='Bold' size={18} />
                                                    {t("Edit")}
                                                </div>
                                            </button>
                                        </div>
                                    )
                                },
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
                        paginationText={({ from, to, totalRecords }) => `${t("Showing")}  ${from} ${t("to.1")} ${to} ${t("of.1")} ${totalRecords} ${t("entries")}`}
                    />
                </div>
            </div>
        </div>
    );
};

export default About;