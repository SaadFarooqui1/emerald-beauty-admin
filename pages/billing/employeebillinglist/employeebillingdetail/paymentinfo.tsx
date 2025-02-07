import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';
import { setPageTitle } from '@/store/themeConfigSlice';
import { useEffect } from 'react';
import InputField from '@/pages/components/InputField';
import Image from 'next/image';
import reciept from '@/public/assets/images/reciept.png';
import { useRouter } from 'next/router';
import { useModelGetSalaryById } from '@/models/salary.model';
import { useTranslation } from 'react-i18next';

const EmployeePaymentInfo = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;
    useEffect(() => {
        dispatch(setPageTitle('Employee Payment Info'));
    });
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';

    const { data: salaryResponse, isLoading, isError, refetch } = useModelGetSalaryById(id, {
        relations: ["payment_reciept"]
    });
    const { t } = useTranslation();
    const salary = salaryResponse;

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link href="/billing/employeebillinglist/employeebillingdetail" className="font-['Raleway'] text-lg font-semibold text-[#1bd9bf] hover:underline dark:text-white-light">
                        {router?.query?.name}
                    </Link>
                </li>
                <li className="font-['Raleway'] rtl:font-['Tajawal'] text-lg font-normal text-[#727272] before:content-['/'] dark:text-white-light ltr:before:mr-2 rtl:before:ml-2">
                    <span>{t("Payment Detail")}</span>
                </li>
            </ul>
            <div className="pt-5">
                <div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
                    <div className="flex flex-col gap-6 lg:col-span-3">
                        <div className="panel">
                            <div className="mb-5">
                                <h5 className="font-['Hermann'] rtl:font-['Tajawal'] rtl:font-medium text-2xl font-bold uppercase text-[#012d22] dark:text-white-light">{t("Payment Detail")}</h5>
                            </div>
                            <div className="mb-5">
                                <form className="space-y-5">
                                    <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
                                        <div>
                                            <InputField
                                                label={t("Name")?.toString()}
                                                placeholder={t("Enter Name")?.toString()}
                                                name="name"
                                                id="name"
                                                readOnly
                                                value={router?.query?.name?.toString()}
                                            />
                                        </div>
                                        <div>
                                            <div className="relative">
                                                <InputField
                                                    name="salary"
                                                    label={t("Salary")?.toString()}
                                                    placeholder={t("Enter Salary")?.toString()}
                                                    type="text"
                                                    className={isRtl ? "pl-14" : "pr-14"}
                                                    readOnly
                                                    value={salary?.salary || 0}
                                                />
                                                <span className={`aed-class absolute inset-y-0 flex items-center px-3 bg-[#b8c3c0] text-[#012d22] ${isRtl ? "left-0 rounded-l-md" : "right-0 rounded-r-md"}`}>
                                                    <b>AED</b>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
                                        {/* <div>
                                            <InputField
                                                label={t("Service")?.toString()}
                                                placeholder="Enter Category"
                                                defaultValue="HairCare"
                                                name="category"
                                                id="category"
                                                readOnly={true}
                                                value={isRtl ? salary?.service?.arabic_name : salary?.service?.name}
                                            />
                                        </div> */}

                                    </div>
                                    <div className="grid grid-cols-1 gap-3">
                                        <label htmlFor="receipt" className="font-['Raleway'] rtl:font-['Tajawal'] text-lg font-semibold text-[#012d22] dark:text-white-light">
                                            {t("Receipt Image")}
                                        </label>
                                        <div className='bg-[#f6f6f6] rounded-[10px] shadowcontainer h-96 p-2'>
                                            <img src={salary?.payment_reciept?.mediaUrl || reciept.src} alt="receipt" className='w-60 h-[23rem]' />
                                        </div>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeePaymentInfo;