import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';
import { setPageTitle } from '@/store/themeConfigSlice';
import { useEffect, useState } from 'react';
import InputField from '@/pages/components/InputField';
import Button from '@/pages/components/Button';
import { useRouter } from 'next/router';
import useValidationSchemaHook from '@/utils/validation-schema';
import { useCreateFaqAction } from '@/models/faqs.model';
import { useFormik } from 'formik';
import { ErrorToast } from '@/utils/helper';
import { useTranslation } from 'react-i18next';


const AddFaq = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [isEnglish, setIsEnglish] = useState(true); // Toggle for language switch

    const { t } = useTranslation();
    useEffect(() => {
        dispatch(setPageTitle('Create FAQs'));
    });
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const handleCancelClick = () => {
        router.push("/staticpages/faqs/faqs");
    };


    const [formData, setFormData] = useState({
        question: 'What is your return policy?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lobortis erat posuere, tincidunt sem at, sagittis dolor. Sed malesuada orci erat, ut interdum lorem rhoncus eu. Donec justo urna, mattis non maximus.',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const { addFaqSchema } = useValidationSchemaHook();

    const { mutate: createFaq, isLoading: isCreatingFaq } = useCreateFaqAction();
    const formik = useFormik({
        initialValues: { question: '', arabic_question: '', answer: '', arabic_answer: '' },
        validationSchema: addFaqSchema,
        onSubmit: (values, { resetForm }) => {
            createFaq(
                {
                    question: values.question,
                    arabic_question: values.arabic_question,
                    answer: values.answer,
                    arabic_answer: values.arabic_answer,
                },
                {
                    onSuccess: () => {
                        resetForm();
                        router.push('/staticpages/faqs/faqs');
                        ErrorToast(t('Faq created successfully'), 'success', t('Success')?.toString());
                    },
                    onError: (error) => {
                        ErrorToast(t('Failed to create Faq. Please try again.'), 'error', t('Error')?.toString());
                    },
                }
            );
        },
    });


    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link href="/staticpages/faqs/faqs" className="font-['Raleway'] rtl:font-['Tajawal'] rtl:font-medium text-lg font-semibold text-[#1bd9bf] hover:underline dark:text-white-light">
                        {t("FAQs List")}
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
                                <h5 className="font-['Hermann'] rtl:font-['Tajawal'] rtl:font-medium text-2xl font-bold uppercase text-[#012d22] dark:text-white-light">{t("Add FAQ")}</h5>
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
                                                    label={t("Question (English)")?.toString()}
                                                    name="question"
                                                    type="text"
                                                    placeholder={t("Enter Question")?.toString()}
                                                    value={formik.values.question}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                                {formik.touched.question && formik.errors.question && <span className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.question}</span>}
                                            </div>

                                            <div>
                                                <InputField
                                                    label={t("Answer (English)")?.toString()}
                                                    name="answer"
                                                    type="textarea"
                                                    rows={5}
                                                    placeholder={t("Enter Answer")?.toString()}
                                                    value={formik.values.answer}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                                {formik.touched.answer && formik.errors.answer && <span className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.answer}</span>}
                                            </div>
                                        </div>
                                        <div className="col-span-1">
                                            <div className='mb-5'>
                                                <InputField
                                                    label={t("Question (Arabic)")?.toString()}
                                                    name="arabic_question"
                                                    type="text"
                                                    placeholder={t("Enter Question")?.toString()}
                                                    value={formik.values.arabic_question}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}

                                                />
                                                {formik.touched.arabic_question && formik.errors.arabic_question && <span className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.arabic_question}</span>}
                                            </div>

                                            <div>
                                                <InputField
                                                    label={t("Answer (Arabic)")?.toString()}
                                                    name="arabic_answer"
                                                    type="textarea"
                                                    rows={5}
                                                    placeholder={t("Enter Answer")?.toString()}
                                                    value={formik.values.arabic_answer}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                                {formik.touched.arabic_answer && formik.errors.arabic_answer && <span className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.arabic_answer}</span>}
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

export default AddFaq;
