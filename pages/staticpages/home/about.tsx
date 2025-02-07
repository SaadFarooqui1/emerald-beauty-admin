import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';
import { setPageTitle } from '@/store/themeConfigSlice';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import InputField from '@/pages/components/InputField';
import Button from '@/pages/components/Button';
import ImageUpload from '@/pages/components/ImageUpload';
import { useTranslation } from 'react-i18next';
import { useModelGetSectionById, useUpdateSectionAction } from '@/models/sections.model';
import useValidationSchemaHook from '@/utils/validation-schema';
import { useFormik } from 'formik';
import { ErrorToast } from '@/utils/helper';
import { getCookie } from 'cookies-next';
import FileUpload from '@/pages/components/FileUpload';

const EditAboutContent = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Edit About Content'));
    });

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [firstImagePreview, setFirstImagePreview] = useState<string | null>(null);
    const [firstImageError, setFirstImageError] = useState<string | null>(null);
    const { t } = useTranslation();
    const [secondImagePreview, setSecondImagePreview] = useState<string | null>(null);
    const [secondImageError, setSecondImageError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        pageName: 'Beauty is all about you.',
        subheading: 'Alive every moment',
        pageContent: ''
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
        router.push("/staticpages/home");
    };



    const id = router.query.id ? parseInt(router.query.id as string, 10) : undefined;
    const { data: sectionResponse, isLoading, isError, refetch } = useModelGetSectionById(id, {
        relations: ['sub_sections', 'media'],
    });
    const section = sectionResponse;


    // Using useUpdateCategoryAction hook
    const { aboutStaticSchema } = useValidationSchemaHook();
    const { mutate: updateServiceSection, isLoading: isUpdatingServiceSection } = useUpdateSectionAction();


    const formik = useFormik({
        initialValues: {
            heading: '',
            arabic_heading: '',
            description: '',
            arabic_description: '',
            sub_heading: '',
            arabic_sub_heading: '',
            image1: '',
            image2: '',
        },
        validationSchema: aboutStaticSchema,
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
                            sub_sections: [{
                                heading: values.sub_heading,
                                arabic_heading: values.arabic_sub_heading
                            }],
                            media: [
                                {
                                    path: values.image1,
                                    type: 'image'
                                },
                                {
                                    path: values.image2,
                                    type: 'image'
                                },
                            ]
                        },
                    },
                    {
                        onSuccess: () => {
                            router.push('/staticpages/home');
                            ErrorToast(t('About Section updated successfully'), 'success', t('Success')?.toString());
                        },
                        onError: (error) => {
                            ErrorToast(t('Failed to update about section. Please try again.'), 'error', t('Error')?.toString());
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
                sub_heading: sectionData.sub_sections?.[0]?.heading || '',
                arabic_sub_heading: sectionData.sub_sections?.[0]?.arabic_heading || '',
                image1: section?.media?.[0]?.path || '',
                image2: section?.media?.[1]?.path || '',
            });

        }
    }, [section]);


    const onFileChange = async (event: any) => {
        const { name, files } = event.target;
        const file = files[0];
        if (file) {
            try {
                // 1. Determine content type dynamically
                const contentType = file.type;

                if (!contentType) {
                    throw new Error("File type is missing. Please select a valid file.");
                }

                // 2. Get Pre-Signed URL
                const response = await fetch('https://staging-api.emeraldbeauty.info/api/v1/s3-presigned-url', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${getCookie('_ca')}`,
                    },
                    body: JSON.stringify({
                        content_type: contentType, // Use dynamic content type
                    }),
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('Pre-Signed URL Error:', errorText);
                    throw new Error(`Failed to fetch pre-signed URL: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                const key = data?.data?.result?.fields?.Key;
                const url = data?.data?.url;

                if (!key || !url) {
                    throw new Error("Invalid presigned URL response");
                }

                // 3. Prepare and send file to S3
                const formData = new FormData();
                Object.entries(data.data.result.fields).forEach(([k, v]) => {
                    formData.append(k, v as string);
                });
                formData.append("file", file);

                const uploadResponse = await fetch(data.data.result.url, {
                    method: "POST",
                    body: formData,
                });

                if (!uploadResponse.ok) {
                    const errorText = await uploadResponse.text();
                    console.error('S3 Upload Error:', errorText);
                    throw new Error(`Failed to upload file to S3: ${uploadResponse.status} ${uploadResponse.statusText}`);
                }

                console.log('File uploaded successfully!');

                // 4. Set the appropriate Formik field value
                const fieldName = name === 'image1' ? 'image1' : 'image2';
                formik.setFieldValue(fieldName, url);
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };

    const user = useSelector((state: any) => state?.auth.user);
    const filteredPermissions = user?.roles?.[0]?.permissions?.filter(
        (permission: any) => permission.meta.pivot_module_id === 90
    );

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link href="/staticpages/home" className="font-['Raleway'] rtl:font-['Tajawal'] rtl:font-medium text-lg font-semibold text-[#1bd9bf] hover:underline dark:text-white-light">
                        {t("About")}
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
                                <h5 className="font-['Hermann'] rtl:font-['Tajawal'] rtl:font-medium text-2xl font-bold uppercase text-[#012d22] dark:text-white-light">{t("Edit About Section")}</h5>
                            </div>


                            <div className="mb-5">
                                <form className="space-y-5" onSubmit={formik.handleSubmit}>
                                    <div className="grid grid-cols-1 gap-6">
                                        {/* {isEnglish ? ( */}
                                        <>
                                            {/* English Fields */}
                                            <div>
                                                <InputField
                                                    label={t("Sub Heading (English)")?.toString()}
                                                    name="sub_heading"
                                                    type="text"
                                                    placeholder={t("Enter Sub Heading")?.toString()}
                                                    value={formik.values.sub_heading}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                                {formik.touched.sub_heading && formik.errors.sub_heading && <span className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.sub_heading}</span>}
                                            </div>

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
                                        <>
                                            {/* Arabic Fields */}
                                            <div>
                                                <InputField
                                                    label={t("Sub Heading (Arabic)")?.toString()}
                                                    name="arabic_sub_heading"
                                                    type="text"
                                                    placeholder={t("Enter Sub Heading")?.toString()}
                                                    value={formik.values.arabic_sub_heading}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                                {formik.touched.arabic_sub_heading && formik.errors.arabic_sub_heading && <span className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.arabic_sub_heading}</span>}
                                            </div>

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

                                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                            {/* <ImageUpload
                                                label={t("About Picture 1")?.toString()}
                                                name="image1"
                                                accept="image/*"
                                                maxFileSize="10 MB"
                                                preview={firstImagePreview}
                                                error={firstImageError}
                                                setPreview={setFirstImagePreview}
                                                setError={setFirstImageError}
                                                onChange={onFileChange}
                                                width={500}
                                                height={500}
                                            /> */}
                                            <div>
                                                <FileUpload
                                                    label={t("About Picture 1")?.toString()}
                                                    name="image1"
                                                    accept="image/*"
                                                    maxFileSize="10 MB"
                                                    value={formik.values.image1}
                                                    onChange={onFileChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                                {formik.touched.image1 && formik.errors.image1 && <span className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.image1}</span>}
                                            </div>

                                            {/* <ImageUpload
                                                label={t("About Picture 2")?.toString()}
                                                name="image2"
                                                accept="image/*"
                                                maxFileSize="10 MB"
                                                preview={secondImagePreview}
                                                error={secondImageError}
                                                setPreview={setSecondImagePreview}
                                                setError={setSecondImageError}
                                                onChange={onFileChange}
                                                value={formik.values.image2}
                                                width={500}
                                                height={500}
                                            /> */}
                                            <div>
                                                <FileUpload
                                                    label={t("About Picture 2")?.toString()}
                                                    name="path"
                                                    accept="image/*"
                                                    maxFileSize="10 MB"
                                                    value={formik.values.image2}
                                                    onChange={onFileChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                                {formik.touched.image2 && formik.errors.image2 && <span className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.image2}</span>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {filteredPermissions?.[0].meta.pivot_update === 1 && (
                                            <Button
                                                text={isUpdatingServiceSection ? t("Saving") : t("Save")}
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

export default EditAboutContent;