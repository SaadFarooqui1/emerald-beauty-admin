import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';
import { setPageTitle } from '@/store/themeConfigSlice';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import InputField from '@/pages/components/InputField';
import Button from '@/pages/components/Button';
import { ErrorToast } from '@/utils/helper';
import { useFormik } from 'formik';
import useValidationSchemaHook from '@/utils/validation-schema';
import { useModelGetSectionById, useUpdateSectionAction } from '@/models/sections.model';
import { useTranslation } from 'react-i18next';

const EditOurStoryContent = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Edit Why Choose Us'));
    });

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        pageName: 'Why Choose Us?',
        subheading: 'High-Quality Beauty Services',
        pageContent: 'We offer top-notch beauty treatments performed by experienced professionals.',
    });

    const [isEnglish, setIsEnglish] = useState(true); // Toggle state for English/Arabic

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const router = useRouter();

    const handleCancelClick = () => {
        router.push("/staticpages/home");
    };



    const id = router.query.id ? parseInt(router.query.id as string, 10) : undefined;
    const { data: sectionResponse, isLoading, isError, refetch } = useModelGetSectionById(id, {
        relations: ['sub_sections'],
    });
    const section = sectionResponse;


    // Using useUpdateCategoryAction hook
    const { whychooseSchema } = useValidationSchemaHook();
    const { mutate: updateWhyChooseUsSection, isLoading: isUpdatingWhyChooseUsSection } = useUpdateSectionAction();


    const formik = useFormik({
        initialValues: {
            heading: '',
            arabic_heading: '',
            sub_heading_1: '',
            arabic_sub_heading_1: '',
            sub_heading_2: '',
            arabic_sub_heading_2: '',
            sub_heading_3: '',
            arabic_sub_heading_3: '',
            sub_description_1: '',
            arabic_sub_description_1: '',
            sub_description_2: '',
            arabic_sub_description_2: '',
            sub_description_3: '',
            arabic_sub_description_3: '',
        },
        validationSchema: whychooseSchema,
        onSubmit: (values) => {
            if (id) {
                updateWhyChooseUsSection(
                    {
                        id,  // Pass the category ID
                        data: {
                            heading: values.heading,
                            arabic_heading: values.arabic_heading,
                            sub_sections: [
                                {
                                    heading: values.sub_heading_1,
                                    arabic_heading: values.arabic_sub_heading_1,
                                    description: values.sub_description_1,
                                    arabic_description: values.arabic_sub_description_1,
                                },
                                {
                                    heading: values.sub_heading_2,
                                    arabic_heading: values.arabic_sub_heading_2,
                                    description: values.sub_description_2,
                                    arabic_description: values.arabic_sub_description_2,
                                },
                                {
                                    heading: values.sub_heading_3,
                                    arabic_heading: values.arabic_sub_heading_3,
                                    description: values.sub_description_3,
                                    arabic_description: values.arabic_sub_description_3,
                                }
                            ]
                        },
                    },
                    {
                        onSuccess: () => {
                            router.push('/staticpages/home');
                            ErrorToast(t('Why choose us section updated successfully'), 'success', t('Success')?.toString());
                        },
                        onError: (error) => {
                            ErrorToast(t('Failed to update Why Choose Us Section. Please try again.'), 'error', t('Error')?.toString());
                        },
                    }
                );
            }
        },
    });

    useEffect(() => {
        if (section) {
            const sectionData = section;
            formik.setValues({
                heading: sectionData?.heading || '',
                arabic_heading: sectionData?.arabic_heading || '',
                sub_heading_1: sectionData?.sub_sections?.[0].heading || '',
                arabic_sub_heading_1: sectionData?.sub_sections?.[0].arabic_heading || '',
                sub_heading_2: sectionData?.sub_sections?.[1].heading || '',
                arabic_sub_heading_2: sectionData?.sub_sections?.[1].arabic_heading || '',
                sub_heading_3: sectionData?.sub_sections?.[2].heading || '',
                arabic_sub_heading_3: sectionData?.sub_sections?.[2].arabic_heading || '',
                sub_description_1: sectionData?.sub_sections?.[0].description || '',
                arabic_sub_description_1: sectionData?.sub_sections?.[0].arabic_description || '',
                sub_description_2: sectionData?.sub_sections?.[1].description || '',
                arabic_sub_description_2: sectionData?.sub_sections?.[1].arabic_description || '',
                sub_description_3: sectionData?.sub_sections?.[2].description || '',
                arabic_sub_description_3: sectionData?.sub_sections?.[2].arabic_description || '',
            });

        }
    }, [section]);



    const user = useSelector((state: any) => state?.auth.user);
    const filteredPermissions = user?.roles?.[0]?.permissions?.filter(
        (permission: any) => permission.meta.pivot_module_id === 90
    );



    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link href="/staticpages/home" className="font-['Raleway'] rtl:font-medium rtl:font-['Tajawal'] text-lg font-semibold text-[#1bd9bf] hover:underline dark:text-white-light">
                        {t("Why Choose Us")}
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
                                <h5 className="font-['Hermann'] rtl:font-['Tajawal'] rtl:font-medium text-2xl font-bold uppercase text-[#012d22] dark:text-white-light">{t("Edit Why Choose Us Section")}</h5>
                            </div>

                            {/* Toggle for language switch */}
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

                                        <div className='col-span-1'>
                                            <div className="grid grid-cols-1 gap-6">
                                                {/* English Fields */}
                                                <div>
                                                    <InputField
                                                        label={t("Heading (English)")?.toString()}
                                                        name="heading"
                                                        type="text"
                                                        placeholder={t("Enter Heading")?.toString()}
                                                        value={formik.values.heading}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                    />
                                                    {formik.touched.heading && formik.errors.heading && <span className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.heading}</span>}
                                                </div>

                                                <div>
                                                    <InputField
                                                        label={t("Sub Heading 1 (English)")?.toString()}
                                                        name="sub_heading_1"
                                                        type="text"
                                                        placeholder={t("Enter Sub Heading")?.toString()}
                                                        value={formik.values.sub_heading_1}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                    />
                                                    {formik.touched.sub_heading_1 && formik.errors.sub_heading_1 && <span className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.sub_heading_1}</span>}
                                                </div>

                                                <div>
                                                    <InputField
                                                        label={t("Description 1 (English)")?.toString()}
                                                        name="sub_description_1"
                                                        type="textarea"
                                                        placeholder={t("Enter Description")?.toString()}
                                                        value={formik.values.sub_description_1}
                                                        rows={5}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                    />
                                                    {formik.touched.sub_description_1 && formik.errors.sub_description_1 && <span className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.sub_description_1}</span>}
                                                </div>

                                                <div>
                                                    <InputField
                                                        label={t("Sub Heading 2 (English)")?.toString()}
                                                        name="sub_heading_2"
                                                        type="text"
                                                        placeholder={t("Enter Sub Heading")?.toString()}
                                                        value={formik.values.sub_heading_2}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                    />
                                                    {formik.touched.sub_heading_2 && formik.errors.sub_heading_2 && <span className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.sub_heading_2}</span>}
                                                </div>

                                                <div>
                                                    <InputField
                                                        label={t("Description 2 (English)")?.toString()}
                                                        name="sub_description_2"
                                                        type="textarea"
                                                        placeholder={t("Enter Description")?.toString()}
                                                        value={formik.values.sub_description_2}
                                                        rows={5}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                    />
                                                    {formik.touched.sub_description_2 && formik.errors.sub_description_2 && <span className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.sub_description_2}</span>}
                                                </div>

                                                <div>
                                                    <InputField
                                                        label={t("Sub Heading 3 (English)")?.toString()}
                                                        name="sub_heading_3"
                                                        type="text"
                                                        placeholder={t("Enter Sub Heading")?.toString()}
                                                        value={formik.values.sub_heading_3}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                    />
                                                    {formik.touched.sub_heading_3 && formik.errors.sub_heading_3 && <span className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.sub_heading_3}</span>}
                                                </div>

                                                <div>
                                                    <InputField
                                                        label={t("Description 3 (English)")?.toString()}
                                                        name="sub_description_3"
                                                        type="textarea"
                                                        placeholder={t("Enter Description")?.toString()}
                                                        value={formik.values.sub_description_3}
                                                        rows={5}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                    />
                                                    {formik.touched.sub_description_3 && formik.errors.sub_description_3 && <span className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.sub_description_3}</span>}
                                                </div>
                                            </div>
                                        </div>

                                        <div className='col-span-1'>
                                            <div className="grid grid-cols-1 gap-6">
                                                {/* Arabic Fields */}
                                                <div>
                                                    <InputField
                                                        label={t("Heading (Arabic)")?.toString()}
                                                        name="arabic_heading"
                                                        type="text"
                                                        placeholder={t("Enter Heading")?.toString()}
                                                        value={formik.values.arabic_heading}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                    />
                                                    {formik.touched.arabic_heading && formik.errors.arabic_heading && <span className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.arabic_heading}</span>}
                                                </div>
                                                <div>
                                                    <InputField
                                                        label={t("Sub Heading 1 (Arabic)")?.toString()}
                                                        name="arabic_sub_heading_1"
                                                        type="text"
                                                        placeholder={t("Enter Sub Heading")?.toString()}
                                                        value={formik.values.arabic_sub_heading_1}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                    />
                                                    {formik.touched.arabic_sub_heading_1 && formik.errors.arabic_sub_heading_1 && <span className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.arabic_sub_heading_1}</span>}

                                                </div>
                                                <div>
                                                    <InputField
                                                        label={t("Description 1 (Arabic)")?.toString()}
                                                        name="arabic_sub_description_1"
                                                        type="textarea"
                                                        placeholder={t("Enter Description")?.toString()}
                                                        value={formik.values.arabic_sub_description_1}
                                                        rows={5}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                    />
                                                    {formik.touched.arabic_sub_description_1 && formik.errors.arabic_sub_description_1 && <span className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.arabic_sub_description_1}</span>}

                                                </div>
                                                <div>
                                                    <InputField
                                                        label={t("Sub Heading 2 (Arabic)")?.toString()}
                                                        name="arabic_sub_heading_2"
                                                        type="text"
                                                        placeholder={t("Enter Sub Heading")?.toString()}
                                                        value={formik.values.arabic_sub_heading_2}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                    />
                                                    {formik.touched.arabic_sub_heading_2 && formik.errors.arabic_sub_heading_2 && <span className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.arabic_sub_heading_2}</span>}

                                                </div>
                                                <div>
                                                    <InputField
                                                        label={t("Description 2 (Arabic)")?.toString()}
                                                        name="arabic_sub_description_2"
                                                        type="textarea"
                                                        placeholder={t("Enter Description")?.toString()}
                                                        value={formik.values.arabic_sub_description_2}
                                                        rows={5}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                    />
                                                    {formik.touched.arabic_sub_description_2 && formik.errors.arabic_sub_description_2 && <span className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.arabic_sub_description_2}</span>}

                                                </div>
                                                <div>
                                                    <InputField
                                                        label={t("Sub Heading 3 (Arabic)")?.toString()}
                                                        name="arabic_sub_heading_3"
                                                        type="text"
                                                        placeholder={t("Enter Sub Heading")?.toString()}
                                                        value={formik.values.arabic_sub_heading_3}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                    />
                                                    {formik.touched.arabic_sub_heading_3 && formik.errors.arabic_sub_heading_3 && <span className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.arabic_sub_heading_3}</span>}

                                                </div>
                                                <div>
                                                    <InputField
                                                        label={t("Description 3 (Arabic)")?.toString()}
                                                        name="arabic_sub_description_3"
                                                        type="textarea"
                                                        placeholder={t("Enter Description")?.toString()}
                                                        value={formik.values.arabic_sub_description_3}
                                                        rows={5}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                    />
                                                    {formik.touched.arabic_sub_description_3 && formik.errors.arabic_sub_description_3 && <span className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.arabic_sub_description_3}</span>}

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        {filteredPermissions?.[0].meta.pivot_update === 1 && (
                                            <Button
                                                text={isUpdatingWhyChooseUsSection ? t("Saving") : t("Save")}
                                                type='submit'
                                                bgColor="#012d22"
                                                textColor="#ffff"
                                            />
                                        )}
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
            </div >
        </div >
    );
};

export default EditOurStoryContent;