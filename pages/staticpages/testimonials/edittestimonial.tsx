import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';
import { setPageTitle } from '@/store/themeConfigSlice';
import { useEffect, useState } from 'react';
import InputField from '@/pages/components/InputField';
import Button from '@/pages/components/Button';
import { useRouter } from 'next/router';
import { ErrorToast } from '@/utils/helper';
import { useFormik } from 'formik';
import useValidationSchemaHook from '@/utils/validation-schema';
import { useModelGetTestimonialById, useUpdateTestimonialAction } from '@/models/testimonial.model';
import { useTranslation } from 'react-i18next';


const EditTestimonial = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [isEnglish, setIsEnglish] = useState(true); // Toggle for language switch

    useEffect(() => {
        dispatch(setPageTitle('Edit Testimonial'));
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
        customername: 'Nikky Kim',
        review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lobortis erat posuere, tincidunt sem at, sagittis dolor. Sed malesuada orci erat, ut interdum lorem rhoncus eu. Donec justo urna, mattis non maximus.',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    const id = router.query.id ? parseInt(router.query.id as string, 10) : undefined;

    const { data: testimonialResponse, isLoading, isError, refetch } = useModelGetTestimonialById(id);

    const testimonial = testimonialResponse;


    const { addTestimonialSchema } = useValidationSchemaHook();

    const { mutate: updateFaq, isLoading: isCreatingFaq } = useUpdateTestimonialAction();
    const formik = useFormik({
        initialValues: { name: '', arabic_name: '', review: '', arabic_review: '' },
        validationSchema: addTestimonialSchema,
        onSubmit: (values, { resetForm }) => {
            if (id) {
                updateFaq(
                    {
                        id,
                        data: {
                            name: values.name,
                            arabic_name: values.arabic_name,
                            review: values.review,
                            arabic_review: values.arabic_review,
                        }
                    },
                    {
                        onSuccess: () => {
                            resetForm();
                            router.push('/staticpages/testimonials/testimonialslist');
                            ErrorToast(t('Testimonial updated successfully'), 'success', t('Success')?.toString());
                        },
                        onError: (error) => {
                            ErrorToast(t('Failed to update Testimonial. Please try again.'), 'error', t('Error')?.toString());
                        },
                    }
                );
            }
        },
    });


    useEffect(() => {
        if (testimonial) {
            const testimonialData = testimonial;
            formik.setValues({
                name: testimonialData.name || '',
                arabic_name: testimonialData.arabic_name || '',
                review: testimonialData.review || '',
                arabic_review: testimonialData.arabic_review || '',
            });

        }
    }, [testimonial]);




    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link href="/staticpages/testimonials/testimonialslist" className="font-['Raleway'] rtl:font-medium rtl:font-['Tajawal'] text-lg font-semibold text-[#1bd9bf] hover:underline dark:text-white-light">
                        {t("Testimonials List")}
                    </Link>
                </li>
                <li className="font-['Raleway'] text-lg font-normal rtl:font-['Tajawal'] text-[#727272] before:content-['/'] dark:text-white-light ltr:before:mr-2 rtl:before:ml-2">
                    <span>{t("Edit")}</span>
                </li>
            </ul>
            <div className="pt-5">
                <div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
                    <div className="flex flex-col gap-6 lg:col-span-3">
                        <div className="panel">
                            <div className="mb-5">
                                <h5 className="font-['Hermann'] rtl:font-medium rtl:font-['Tajawal'] text-2xl font-bold uppercase text-[#012d22] dark:text-white-light">{t("Edit Testimonial")}</h5>
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
                                    <div className='grid grid-cols-2 gap-6'>
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
                                                    label={t("Review (English)")?.toString()}
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

                                    {/* <div className="grid grid-cols-1 gap-6">
                                        {isEnglish ? (
                                            <>
                                                English Fields
                                                <InputField
                                                    label="Question (English)"
                                                    name="question"
                                                    type="text"
                                                    placeholder="What is your return policy?"
                                                    defaultValue={formData.question}
                                                    onChange={handleInputChange}
                                                />

                                                <InputField
                                                    label="Answer (English)"
                                                    name="answer"
                                                    type="textarea"
                                                    defaultValue={formData.answer}
                                                    rows={5}
                                                    onChange={handleInputChange}
                                                />
                                            </>
                                        ) : (
                                            <>
                                                Arabic Fields
                                                <InputField
                                                    label="Question (Arabic)"
                                                    name="question"
                                                    type="text"
                                                    placeholder="قصتنا"
                                                    defaultValue={formData.question}
                                                    onChange={handleInputChange}
                                                />

                                                <InputField
                                                    label="Answer (Arabic)"
                                                    name="answer"
                                                    type="textarea"
                                                    defaultValue={formData.answer}
                                                    rows={5}
                                                    onChange={handleInputChange}
                                                />
                                            </>
                                        )}

                                    </div> */}
                                    <div className="flex items-center gap-2">
                                        <Button
                                            text={isCreatingFaq ? t('Saving') : t('Save')}
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

export default EditTestimonial;
