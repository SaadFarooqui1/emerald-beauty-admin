import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';
import { setPageTitle } from '@/store/themeConfigSlice';
import { useEffect, useState } from 'react';
import InputField from '@/pages/components/InputField';
import Button from '@/pages/components/Button';
import { useRouter } from 'next/router';
import useValidationSchemaHook from '@/utils/validation-schema';
import { useCreateTestimonialAction } from '@/models/testimonial.model';
import { useFormik } from 'formik';
import { ErrorToast } from '@/utils/helper';
import { useTranslation } from 'react-i18next';


const AddTestimonial = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [isEnglish, setIsEnglish] = useState(true); // Toggle for language switch

    useEffect(() => {
        dispatch(setPageTitle('Add Testimonial'));
    });
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const { t } = useTranslation();
    const handleCancelClick = () => {
        router.push("/staticpages/testimonials/testimonialslist");
    };

    const handleSaveClick = () => {
        router.push("/staticpages/testimonials/testimonialslist");
    };

    const [formData, setFormData] = useState({
        customername: 'Mike Kim',
        review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lobortis erat posuere, tincidunt sem at, sagittis dolor. Sed malesuada orci erat, ut interdum lorem rhoncus eu. Donec justo urna, mattis non maximus.',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    const { addTestimonialSchema } = useValidationSchemaHook();

    const { mutate: createTestimonial, isLoading: isCreatingTestimonial } = useCreateTestimonialAction();
    const formik = useFormik({
        initialValues: { name: '', arabic_name: '', review: '', arabic_review: '' },
        validationSchema: addTestimonialSchema,
        onSubmit: (values, { resetForm }) => {
            createTestimonial(
                {
                    name: values.name,
                    arabic_name: values.arabic_name,
                    review: values.review,
                    arabic_review: values.arabic_review,
                },
                {
                    onSuccess: () => {
                        resetForm();
                        router.push('/staticpages/testimonials/testimonialslist');
                        ErrorToast(t('Testimonial created successfully'), 'success', t('Success')?.toString());
                    },
                    onError: (error) => {
                        ErrorToast(t('Failed to create Testimonial. Please try again.'), 'error', t('Error')?.toString());
                    },
                }
            );
        },
    });


    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link href="/staticpages/testimonials/testimonialslist" className="font-['Raleway'] rtl:font-medium rtl:font-['Tajawal'] text-lg font-semibold text-[#1bd9bf] hover:underline dark:text-white-light">
                        {t("Testimonials List")}
                    </Link>
                </li>
                <li className="font-['Raleway'] rtl:font-['Tajawal'] text-lg font-normal text-[#727272] before:content-['/'] dark:text-white-light ltr:before:mr-2 rtl:before:ml-2">
                    <span>{t("Add")}</span>
                </li>
            </ul>
            <div className="pt-5">
                <div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
                    <div className="flex flex-col gap-6 lg:col-span-3">
                        <div className="panel">
                            <div className="mb-5">
                                <h5 className="font-['Hermann'] text-2xl font-bold uppercase rtl:font-medium rtl:font-['Tajawal'] text-[#012d22] dark:text-white-light">{t("Add Testimonial")}</h5>
                            </div>

                            {/* Language Toggle */}
                            {/* <div className="mb-5 flex items-center gap-4">
                                <label className="font-semibold">Language:</label>
                                <button
                                    className={`py-2 px-4 rounded-lg font-semibold ${isEnglish ? 'bg-[#1bd9bf] text-white' : 'bg-gray-200 text-black'}`}
                                    onClick={() => setIsEnglish(true)}
                                >
                                    English
                                </button>
                                <button
                                    className={`py-2 px-4 rounded-lg font-semibold ${!isEnglish ? 'bg-[#1bd9bf] text-white' : 'bg-gray-200 text-black'}`}
                                    onClick={() => setIsEnglish(false)}
                                >
                                    Arabic
                                </button>
                            </div> */}


                            <div className="mb-5">
                                <form className="space-y-5" onSubmit={formik.handleSubmit}>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="col-span-1">
                                            <div className='mb-5'>
                                                <InputField
                                                    label={t("Customer Name (English)")?.toString()}
                                                    name="name"
                                                    type="text"
                                                    placeholder={t("Enter Customer Name")?.toString()}
                                                    value={formik.values.name}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                                {formik.touched.name && formik.errors.name && <span className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.name}</span>}
                                            </div>
                                            <div>
                                            <InputField
                                                label={(t("Review (English)")?.toString())}
                                                name="review"
                                                type="textarea"
                                                placeholder={t("Enter Review")?.toString()}
                                                rows={5}
                                                value={formik.values.review}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.review && formik.errors.review && <span className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.review}</span>}
                                            </div>
                                        </div>

                                        <div className="col-span-1">
                                            <div className='mb-5'>
                                                <InputField
                                                    label={t("Customer Name (Arabic)")?.toString()}
                                                    name="arabic_name"
                                                    type="text"
                                                    placeholder={t("Enter Customer Name")?.toString()}
                                                    value={formik.values.arabic_name}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                                {formik.touched.arabic_name && formik.errors.arabic_name && <span className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.arabic_name}</span>}
                                            </div>
                                            <div>
                                                <InputField
                                                    label={t("Review (Arabic)")?.toString()}
                                                    name="arabic_review"
                                                    type="textarea"
                                                    placeholder={t('Enter Review')?.toString()}
                                                    rows={5}
                                                    value={formik.values.arabic_review}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                                {formik.touched.arabic_review && formik.errors.arabic_review && <span className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.arabic_review}</span>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            text={isCreatingTestimonial ? t("Saving") : t("Save")}
                                            type='submit'
                                            bgColor="#012d22"
                                            textColor="#ffff"
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

export default AddTestimonial;
