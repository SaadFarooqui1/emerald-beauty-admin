import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';
import { setPageTitle } from '@/store/themeConfigSlice';
import { useEffect, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import Select from 'react-select';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { useRouter } from 'next/router';
import { useModelGetCouponById, useModelGetCoupons, useUpdateCouponAction } from '@/models/coupon.model';
import { useFormik } from 'formik';
import { ServiceI } from '@/types/service_types';
import useValidationSchemaHook from '@/utils/validation-schema';
import { useModelGetServices } from '@/models/service.model';
import { ErrorToast } from '@/utils/helper';
import { useTranslation } from 'react-i18next';



const Edit = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Coupon Edit'));
    });
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [date, setDate] = useState<any>('26-07-2024');
    const [date2, setDate2] = useState<any>('26-11-2024');
    const [activate, setActivate] = useState(false);
    const { t } = useTranslation();
    const customStyles = {
        container: (provided: any) => ({
            ...provided,
            border: '1px solid #b8c3c0', // Light border color
            borderRadius: '10px',
            padding: '6px 15px',
            width: '100%',
        }),
        control: (provided: any) => ({
            ...provided,
            border: 'none',
            background: 'transparent',
            boxShadow: 'none',
            minHeight: 'unset',
        }),
        multiValue: (provided: any) => ({
            ...provided,
            backgroundColor: '#012d22', // Dark green background
            borderRadius: '50px',
            padding: '4px 8px',
            display: 'flex',
            alignItems: 'center',
        }),
        multiValueLabel: (provided: any) => ({
            ...provided,
            color: '#FFFFFF',
            padding: '0 4px',
            fontFamily: 'Raleway',
        }),
        multiValueRemove: (provided: any) => ({
            ...provided,
            color: '#FFFFFF',
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: 'transparent',
                color: '#FFFFFF',
            },
        }),
        dropdownIndicator: (provided: any) => ({
            ...provided,
            color: '#012d22',
            padding: '0',
            '&:hover': {
                color: '#012d22',
            },
        }),
        indicatorSeparator: (provided: any) => ({
            ...provided,
            display: 'none',
        }),
        placeholder: (provided: any) => ({
            ...provided,
            color: '#012d22',
            fontFamily: isRtl ? 'Tajawal' : 'Raleway',
        }),
        menu: (provided: any) => ({
            ...provided,
            fontFamily: isRtl ? 'Tajawal' : 'Raleway',
        }),
    };

    const router = useRouter();

    const handleCancelClick = () => {
        router.push("/coupons");
    };

    const handleSaveClick = () => {
        router.push("/coupons");
    };



    const { data, isLoading: servicesLoading, isError: servicesError, refetch: servicesRefetch } = useModelGetServices({

    });


    const servicesOptions = data?.data?.map(service => ({
        value: service.id,
        label: `${isRtl ? service.arabic_name : service.name}`,
    })) || [];


    const id = router.query.id ? parseInt(router.query.id as string, 10) : undefined;
    const { data: couponResponse, isLoading, isError, refetch } = useModelGetCouponById(id, {
        relations: ["services"],
    });
    const coupon = couponResponse;


    // Using useUpdateCategoryAction hook
    const { addCouponSchema } = useValidationSchemaHook();
    const { mutate: updateCoupon, isLoading: isUpdatingCoupon } = useUpdateCouponAction();


    const formik = useFormik({
        initialValues: {
            code: '',
            discount: 0,
            start_date: '',
            end_date: '',
            services: [] as number[]
        },
        validationSchema: addCouponSchema,
        onSubmit: (values) => {
            if (id) {
                updateCoupon(
                    {
                        id,  // Pass the category ID
                        data: {
                            code: values.code,
                            discount: values.discount,
                            start_date: values.start_date,
                            end_date: values.end_date,
                            services: values.services
                        },
                    },
                    {
                        onSuccess: () => {
                            router.push('/coupons');
                            ErrorToast(t('Coupon updated successfully'), 'success', t('Success')?.toString());
                        },
                        onError: (error) => {
                            ErrorToast(t('Failed to update coupon. Please try again.'), 'error', t('Error')?.toString());
                        },
                    }
                );
            }
        },
    });

    useEffect(() => {
        if (coupon) {
            const couponData = coupon;
            formik.setValues({
                code: couponData.code || '',
                discount: couponData.discount || 0,
                start_date: couponData.start_date || '',
                end_date: couponData.end_date || '',
                services: coupon?.services?.map((service: ServiceI) => service.id) || [],
            });

        }
    }, [coupon]);



    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link href="/coupons" className="font-['Raleway'] rtl:font-['Tajawal'] rtl:font-medium text-lg font-semibold text-[#1bd9bf] hover:underline dark:text-white-light">
                        {t("Coupons List")}
                    </Link>
                </li>
                <li className="font-['Raleway'] rtl:font-['Tajawal'] text-lg font-normal text-[#727272] before:content-['/'] dark:text-white-light ltr:before:mr-2 rtl:before:ml-2">
                    <span>{t("Edit Coupons")}</span>
                </li>
            </ul>
            <div className="pt-5">
                <div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
                    <div className="flex flex-col gap-6 lg:col-span-3">
                        <div className="panel">
                            <div className="mb-5 flex items-center justify-between">
                                <h5 className="font-['Hermann'] text-2xl font-bold rtl:font-['Tajawal'] rtl:font-medium uppercase text-[#012d22] dark:text-white-light">{t("Edit Coupons")}</h5>
                                {/* <div className="flex items-center gap-2">
                                    <label className="w-12 h-6 relative">
                                        <input
                                            type="checkbox"
                                            className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"
                                            id="custom_switch_checkbox1"
                                            defaultChecked={activate}
                                            onChange={() => setActivate(!activate)}
                                        />
                                        <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-[#012d22] before:transition-all before:duration-300"></span>
                                    </label>
                                    <span className="text-[#727272] text-base font-normal font-['Raleway'] rtl:font-['Tajawal'] hover:text-black dark:hover:text-white-light/90 border-none">
                                        {activate ? t('Activate') : t('Deactivate')}
                                    </span>
                                </div> */}
                            </div>
                            <div className="mb-5">
                                <form className="space-y-5" onSubmit={formik.handleSubmit}>
                                    <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
                                        <div>
                                            <InputField
                                                name="code"
                                                label={t("Coupon Code")?.toString()}
                                                placeholder={t("Enter Coupon Code")?.toString()}
                                                // defaultValue="SUMMER2024"
                                                value={formik.values.code}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.code && formik.errors.code && <div className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.code}</div>}
                                        </div>
                                        <div className="relative">
                                            <InputField
                                                name="discount"
                                                label={t("Discount Percentage")?.toString()}
                                                type="number"
                                                placeholder={t("Enter Discount")?.toString()}
                                                className={`form-input-lg ${isRtl ? 'pl-24': 'pr-24'}`}
                                                value={formik.values.discount}
                                                onChange={(e) => formik.setFieldValue('discount', Number(e.target.value))}
                                                onBlur={formik.handleBlur}
                                            />
                                            <span className={`aed-class absolute inset-y-0 flex items-center px-3 bg-[#b8c3c0] text-[#012d22] ${isRtl ? 'left-0 rounded-l-md' : 'right-0 rounded-r-md'}`}>
                                                <b>%</b>
                                            </span>
                                            {formik.touched.discount && formik.errors.discount && <div className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.discount}</div>}
                                        </div>

                                    </div>
                                    <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
                                        <div>
                                            <label htmlFor="validfrom" className="font-['Raleway'] rtl:font-['Tajawal'] rtl:font-medium  text-lg font-semibold text-[#012d22] dark:text-white-light">
                                                {t("Valid From")}
                                            </label>
                                            <Flatpickr
                                            key={formik.values.start_date}
                                                options={{
                                                    enableTime: false,
                                                    dateFormat: 'Y-m-d',
                                                    position: isRtl ? 'auto right' : 'auto left',
                                                }}
                                                defaultValue={date}
                                                className="form-input-lg form-input font-['Raleway'] text-base font-normal text-[#727272] focus:border-[#012d22] dark:focus:border-white-light"
                                                name='start_date'
                                                value={formik.values.start_date}
                                                onChange={(selectedDates) => {
                                                    if (selectedDates.length > 0) {
                                                        // Local timezone mein date format karein
                                                        const localDate = new Date(selectedDates[0]);
                                                        const year = localDate.getFullYear();
                                                        const month = String(localDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
                                                        const day = String(localDate.getDate()).padStart(2, '0');
                                                        const formattedDate = `${year}-${month}-${day}`; // YYYY-MM-DD format
                                                        formik.setFieldValue('start_date', formattedDate);
                                                    }
                                                }}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.start_date && formik.errors.start_date && <div className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.start_date}</div>}
                                        </div>
                                        <div>
                                            <label htmlFor="validuntil" className="font-['Raleway'] rtl:font-['Tajawal'] rtl:font-medium text-lg font-semibold text-[#012d22] dark:text-white-light">
                                                {t("Valid Until")}
                                            </label>
                                            <Flatpickr
                                                key={formik.values.end_date}
                                                options={{
                                                    enableTime: false,
                                                    dateFormat: 'Y-m-d',
                                                    position: isRtl ? 'auto right' : 'auto left',
                                                }}
                                                defaultValue={date2}
                                                className="form-input-lg form-input font-['Raleway'] text-base font-normal text-[#727272] focus:border-[#012d22] dark:focus:border-white-light"
                                                value={formik.values.end_date}
                                                name='end_date'
                                                onChange={(selectedDates) => {
                                                    if (selectedDates.length > 0) {
                                                        // Local timezone mein date format karein
                                                        const localDate = new Date(selectedDates[0]);
                                                        const year = localDate.getFullYear();
                                                        const month = String(localDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
                                                        const day = String(localDate.getDate()).padStart(2, '0');
                                                        const formattedDate = `${year}-${month}-${day}`; // YYYY-MM-DD format
                                                        formik.setFieldValue('end_date', formattedDate);
                                                    }
                                                }}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.end_date && formik.errors.end_date && <div className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.end_date}</div>}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-7">
                                        <label htmlFor="applicableservices" className="font-['Raleway'] rtl:font-['Tajawal'] rtl:font-medium text-lg font-semibold text-[#012d22] dark:text-white-light">
                                            {t("Applicable Services")}
                                        </label>
                                        <Select placeholder={t("Select a service")} options={servicesOptions} isMulti isSearchable styles={customStyles}
                                            onChange={(selectedOptions) => {
                                                const selectedIds = Array.isArray(selectedOptions)
                                                    ? selectedOptions.map(option => option.value) // Corrected
                                                    : [];
                                                formik.setFieldValue("services", selectedIds);
                                            }}
                                            value={servicesOptions.filter(option =>
                                                formik.values.services.includes(option.value) // Corrected
                                            )}
                                            name="services"
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.services && formik.errors.services && <div className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.services}</div>}
                                    </div>
                                    {/* <InputField
                                        name="description"
                                        label="Description"
                                        type="textarea"
                                        rows={5}
                                        placeholder="Enter Description"
                                        defaultValue="Experience top-notch men's grooming services with our expert haircare treatments."
                                    /> */}
                                    <div className="flex items-center gap-2">
                                        <Button
                                            text={isUpdatingCoupon ? t('Updating') : t('Update')}
                                            bgColor="#012d22"
                                            textColor="#ffff"
                                            type='submit'
                                        />
                                        <Button
                                            text={t("Cancel")}
                                            onClick={handleCancelClick}
                                            bgColor="#1bd9bf"
                                            textColor="#ffff"
                                        />
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

Edit.authenticate = true;
export default Edit;
