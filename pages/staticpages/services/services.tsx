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

const EditServicesContent = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Edit Services Section'));
    });

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        pageName: 'Special Services',
        subheading: 'Alive every moment',
        pageContent: 'No matter what youre looking for, we offer services that fit your style and schedule.',
    });

    // const [isEnglish, setIsEnglish] = useState(true);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const router = useRouter();

    const handleCancelClick = () => {
        router.push("/staticpages/services");
    };


    const id = router.query.id ? parseInt(router.query.id as string, 10) : undefined;
    const { data: sectionResponse, isLoading, isError, refetch } = useModelGetSectionById(id, {});
    const section = sectionResponse;


    // Using useUpdateCategoryAction hook
    const { customSchema } = useValidationSchemaHook();
    const { mutate: updateServiceSection, isLoading: isUpdatingServiceSection } = useUpdateSectionAction();


    const formik = useFormik({
        initialValues: {
            heading: '',
            arabic_heading: '',
            description: '',
            arabic_description: '',
        },
        validationSchema: customSchema,
        onSubmit: (values) => {
            if (id) {
                updateServiceSection(
                    {
                        id,  // Pass the category ID
                        data: {
                            heading: values.heading,
                            arabic_heading: values.arabic_heading,
                            description: values.description,
                            arabic_description: values.arabic_description,
                        },
                    },
                    {
                        onSuccess: () => {
                            router.push('/staticpages/services');
                            ErrorToast(t('Service Section updated successfully'), 'success', t('Success')?.toString());
                        },
                        onError: (error) => {
                            ErrorToast(t('Failed to update Service Section. Please try again.'), 'error', t('Error')?.toString());
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
                heading: sectionData.heading || '',
                arabic_heading: sectionData.arabic_heading || '',
                description: sectionData.description || '',
                arabic_description: sectionData.arabic_description || '',
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
                    <Link href="/staticpages/services" className="font-['Raleway'] rtl:font-['Tajawal'] rtl:font-medium text-lg font-semibold text-[#1bd9bf] hover:underline dark:text-white-light">
                        {t("Services")}
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
                                <h5 className="font-['Hermann'] rtl:font-['Tajawal'] rtl:font-medium text-2xl font-bold uppercase text-[#012d22] dark:text-white-light">{t("Edit Services Section")}</h5>
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
                                    <div className="grid grid-cols-1 gap-6">
                                        {/* {isEnglish ? ( */}
                                        <>
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
                                                    label={t("Description (English)")?.toString()}
                                                    name="description"
                                                    type="textarea"
                                                    placeholder={t('Enter Description')?.toString()}
                                                    value={formik.values.description}
                                                    rows={5}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                                {formik.touched.description && formik.errors.description && <span className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.description}</span>}
                                            </div>
                                        </>
                                        {/* ) : ( */}
                                        <>
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
                                                    label={t("Description (Arabic)")?.toString()}
                                                    name="arabic_description"
                                                    type="textarea"
                                                    placeholder={t('Enter Description')?.toString()}
                                                    value={formik.values.arabic_description}
                                                    rows={5}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                                {formik.touched.arabic_description && formik.errors.arabic_description && <span className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.arabic_description}</span>}
                                            </div>
                                        </>
                                        {/* )} */}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        {filteredPermissions?.[0].meta.pivot_update === 1 && (
                                            <Button
                                                text={isUpdatingServiceSection ? t('Saving') : t('Save')}
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
            </div>
        </div>
    );
};

export default EditServicesContent;