import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';
import { setPageTitle } from '@/store/themeConfigSlice';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import Button from '@/pages/components/Button';
import { useFormik } from 'formik';
import useValidationSchemaHook from '@/utils/validation-schema';
import { useCreatePageAction, useModelGetPageBySlug } from '@/models/addPage.model';
import { title } from 'process';
import { ErrorToast } from '@/utils/helper';
import { useTranslation } from 'react-i18next';
import { useCapitalize } from '@/hooks/useCapitalize';
const ReactQuill = dynamic(import('react-quill'), { ssr: false });

const EditPrivacyPolicy = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle(`Edit ${slug?.replace(/-/g, " ")}`));
    });
    const capitalize = useCapitalize();

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    // const [formData, setFormData] = useState(
    //     '<h2>1. Introduction:</h2><br>Welcome to Royal Agarwood Perfume This Privacy Policy outlines how we collect, use, disclose, and protect your personal information when you use our website. By accessing or using our services, you agree to the terms outlined in this Privacy Policy.<br><br><h2>2. Information We Collect:</h2><br>We collect various types of information to provide and improve our services. This includes personally identifiable information such as your name, address, email address, and payment information. We also collect non-personally identifiable information, such as browsing habits, to enhance user experience.<br><br><h2>3. How We Use Your Information:</h2><br>We use your information to process orders, provide customer support, improve our products and services, and communicate with you about promotions and updates. Your data is handled with the utmost care and is never sold or shared with third parties without your explicit consent, except as required by law.'
    // );

    // const [isEnglish, setIsEnglish] = useState(true);
    const { t } = useTranslation();
    const router = useRouter();
    const slug = router.query.slug as string;

    const handleCancelClick = () => {
        router.push('/');
    };

    const handleSaveClick = () => {
        router.push('/');
    };

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ size: ['small', false, 'large', 'huge'] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
            [{ script: 'sub' }, { script: 'super' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ align: [] }],
            ['link'],
            ['clean'],
        ],
    };

    const formats = ['header', 'size', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'align', 'check', 'script', 'link'];

    const { data, isLoading, isError, refetch } = useModelGetPageBySlug(slug);

    const pageContent = data;

    const { addPageSchema } = useValidationSchemaHook();

    const { mutate: createPage, isLoading: isCreatingPage } = useCreatePageAction();
    const formik = useFormik({
        initialValues: { title: '', content: '', arabic_content: '' },
        validationSchema: addPageSchema,
        onSubmit: (values, { resetForm }) => {
            createPage(
                {
                    title: values.title,
                    content: values.content,
                    arabic_content: values.arabic_content,
                },
                {
                    onSuccess: () => {
                        // resetForm();
                        // router.push('/');
                        // ErrorToast(t(`${slug.replace(/-/g, " ").split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} updated successfully`), 'success', t('Success')?.toString());
                        ErrorToast(t(`${capitalize(slug)} updated successfully`), 'success', t('Success')?.toString());
                    },
                    onError: (error) => {
                        console.error('Page creation error:', error);
                        // ErrorToast(t(`Failed to update ${slug.replace(/-/g, " ").split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}. Please try again.`), 'error', t('Error')?.toString());
                        ErrorToast(t(`Failed to update ${capitalize(slug)}. Please try again.`), 'error', t('Error')?.toString());

                    },
                }
            );
        },
    });

    useEffect(() => {
        if (pageContent) {
            const pageData = pageContent;
            formik.setValues({
                title: pageData.title || '',
                content: pageData.content || '',
                arabic_content: pageData.arabic_content || '',
            });
        }
    }, [pageContent]);


    const user = useSelector((state: any) => state?.auth.user);
    const filteredPermissions = user?.roles?.[0]?.permissions?.filter(
        (permission: any) => permission.meta.pivot_module_id === 90
    );



    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link href="/" className="font-['Raleway'] rtl:font-['Tajawal'] rtl:font-medium text-lg font-semibold capitalize text-[#1bd9bf] hover:underline dark:text-white-light">
                        {t(slug?.replace(/-/g, ' '))}
                    </Link>
                </li>
                <li className="font-['Raleway'] rtl:font-['Tajawal'] text-lg font-normal text-[#727272] before:content-['/'] dark:text-white-light ltr:before:mr-2 rtl:before:ml-2">
                    <span>{t("Edit")}</span>
                </li>
            </ul>
            <div className="pt-5">
                <div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
                    <div className="flex flex-col gap-6 lg:col-span-3">
                        <div className="panel">
                            <div className="mb-5">
                                <h5 className="font-['Hermann'] text-2xl font-bold uppercase text-[#012d22] dark:text-white-light rtl:font-['Tajawal'] rtl:font-medium">{t("Edit")} {t(slug?.replace(/-/g, ' '))}</h5>
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
                                    <div className="space-y-5">
                                        {/* {isEnglish ? ( */}
                                        <div className="space-y-2">
                                            {/* English Fields */}
                                            <label htmlFor="privacyPolicy" className="font-['Raleway'] rtl:font-medium rtl:font-['Tajawal'] text-lg font-semibold text-[#012d22] dark:text-white-light">
                                                {t("English")}
                                            </label>
                                            <ReactQuill value={formik.values.content} onChange={(value) => formik.setFieldValue('content', value)} theme="snow" modules={modules} formats={formats} />
                                            {/* {formik.errors.content && formik.touched.content && <div className='text-red-500 capitalize'>{formik.errors.content}</div> } */}
                                        </div>
                                        {/* ) : ( */}
                                        <div className="space-y-2">
                                            {/* Arabic Fields */}
                                            <label htmlFor="privacyPolicy" className="font-['Raleway'] rtl:font-medium rtl:font-['Tajawal'] text-lg font-semibold text-[#012d22] dark:text-white-light">
                                                {t("Arabic")}
                                            </label>
                                            {/* <ReactQuill value={formData} onChange={setFormData} theme="snow" modules={modules} formats={formats} /> */}
                                            <ReactQuill
                                                value={formik.values.arabic_content}
                                                onChange={(value) => formik.setFieldValue('arabic_content', value)}
                                                theme="snow"
                                                modules={modules}
                                                formats={formats}
                                            />
                                            {formik.errors.arabic_content && formik.touched.arabic_content && <div className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.arabic_content}</div>}
                                        </div>
                                        {/* )} */}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {filteredPermissions?.[0].meta.pivot_update === 1 && (
                                            <Button text={isCreatingPage ? t('Saving') : t('Save')} type="submit" bgColor="#012d22" textColor="#ffff" />
                                        )}
                                        <Button text={t("Cancel")} onClick={handleCancelClick} bgColor="#1bd9bf" textColor="#ffff" />
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
EditPrivacyPolicy.authenticate = true;
export default EditPrivacyPolicy;
