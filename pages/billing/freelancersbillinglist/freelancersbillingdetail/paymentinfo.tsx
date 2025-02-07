import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';
import { setPageTitle } from '@/store/themeConfigSlice';
import { useEffect } from 'react';
import InputField from '@/pages/components/InputField';
import Image from 'next/image';
import reciept from '@/public/assets/images/reciept.png';
import { useRouter } from 'next/router';
import { useModelGetBookingById } from '@/models/booking.model';
import { useTranslation } from 'react-i18next';

const FreelancersPaymentInfo = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;
    useEffect(() => {
        dispatch(setPageTitle('Freelancers Payment Info'));
    });
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';

    const { t } = useTranslation();

    const { data: bookingResponse, isLoading, isError, refetch } = useModelGetBookingById(id, {
        relations: ["service", "client", "payment_reciept"],
    });

    const booking = bookingResponse;


    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <button onClick={()=> router.back()} className="font-['Raleway'] capitalize text-lg font-semibold text-[#1bd9bf] hover:underline dark:text-white-light">
                        {router?.query?.name}
                    </button>
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
                                                className='capitalize'
                                            />
                                        </div>
                                        <div>
                                            <div className="relative">
                                                <InputField
                                                    name="comission"
                                                    label={t("Comission")?.toString()}
                                                    placeholder={t("Enter Comission")?.toString()}
                                                    type="text"
                                                    className={isRtl ? "pl-14" : "pr-14"}
                                                    readOnly={true}
                                                    value={booking?.amount}
                                                />
                                                <span className={`aed-class absolute inset-y-0 flex items-center px-3 bg-[#b8c3c0] text-[#012d22] ${isRtl ? "left-0 rounded-l-md" : "right-0 rounded-r-md"}`}>
                                                    <b>AED</b>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
                                        <div>
                                            <InputField
                                                label={t("Service")?.toString()}
                                                placeholder="Enter Category"
                                                name="category"
                                                id="category"
                                                readOnly={true}
                                                value={isRtl ? booking?.service?.arabic_name : booking?.service?.name}
                                            />
                                        </div>
                                        {/* <div>
                                            <InputField
                                                label="Sub Category"
                                                placeholder="Enter Sub Category"
                                                defaultValue="HairCut"
                                                name="subcategory"
                                                id="subcategory"
                                                readOnly={true}
                                            />
                                        </div> */}
                                    </div>
                                    <div className="grid grid-cols-1 gap-7">
                                        <label htmlFor="receipt" className="font-['Raleway'] rtl:font-['Tajawal'] rtl:font-medium text-lg font-semibold text-[#012d22] dark:text-white-light">
                                            {t("Receipt Image")}
                                        </label>
                                        <div className='bg-[#f6f6f6] rounded-[10px] shadow container h-96 p-2'>
                                            <img src={booking?.payment_reciept?.mediaUrl || reciept.src} alt="receipt" className='w-60 h-[23rem] object-cover' />
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

export default FreelancersPaymentInfo;