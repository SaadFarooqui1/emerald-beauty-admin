import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';
import { setPageTitle } from '@/store/themeConfigSlice';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import InputField from '@/pages/components/InputField';
import Button from '@/pages/components/Button';
import ImageUpload from '@/pages/components/ImageUpload';
import { getCookie } from 'cookies-next';
import { ErrorToast } from '@/utils/helper';
import { useFormik } from 'formik';
import useValidationSchemaHook from '@/utils/validation-schema';
import { useModelGetSectionById, useUpdateSectionAction } from '@/models/sections.model';
import FileUpload from '@/pages/components/FileUpload';
import { useTranslation } from 'react-i18next';

const EditOurStoryContent = () => {

    const { t } = useTranslation();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Edit Testimonials Section'));
    });

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [ImagePreview, setImagePreview] = useState<string | null>(null);
    const [ImageError, setImageError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        heading: 'Review From Our Customer'
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

    const handleSaveClick = () => {
        router.push("/staticpages/services");
    };



    const id = router.query.id ? parseInt(router.query.id as string, 10) : undefined;
    const { data: sectionResponse, isLoading, isError, refetch } = useModelGetSectionById(id, {
        relations: ["media"],
    });
    const section = sectionResponse;


    // Using useUpdateCategoryAction hook
    const { testimonialSchema } = useValidationSchemaHook();
    const { mutate: updateTestimonialSection, isLoading: isUpdatingTestimonialSection } = useUpdateSectionAction();


    const formik = useFormik({
        initialValues: {
            heading: '',
            arabic_heading: '',
            path: ''
        },
        validationSchema: testimonialSchema,
        onSubmit: (values) => {
            if (id) {
                updateTestimonialSection(
                    {
                        id,  // Pass the category ID
                        data: {
                            heading: values.heading,
                            arabic_heading: values.arabic_heading,
                            media: [
                                {
                                    path: values.path,
                                    type: 'image'
                                }
                            ]
                        },
                    },
                    {
                        onSuccess: () => {
                            router.push('/staticpages/services');
                            ErrorToast(t('Testimonial Section updated successfully'), 'success', t('Success')?.toString());
                        },
                        onError: (error) => {
                            ErrorToast(t('Failed to update testimonial section. Please try again.'), 'error', t('Error')?.toString());
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
                path: section?.media?.[0]?.path || '',
            });

        }
    }, [section]);

    const onFileChange = async (event: any) => {
        const file = event.target.files[0];
        if (file) {
            try {
                // 1. Get Pre-Signed URL
                const response = await fetch('https://staging-api.emeraldbeauty.info/api/v1/s3-presigned-url', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${getCookie('_ca')}`,
                    },
                    body: JSON.stringify({
                        content_type: file.type,
                    }),
                });

                const data = await response.json();

                const key = data?.data?.result?.fields?.Key;
                const url = data?.data?.url;

                if (!key || !url) {
                    throw new Error("Invalid presigned URL response");
                }

                const formData = new FormData();
                Object.entries(data.data.result.fields).forEach(([k, v]) => {
                    formData.append(k, v as string);
                });
                formData.append("file", file);

                const uploadResponse = await fetch(data.data.result.url, {
                    method: "POST",
                    body: formData,
                });

                console.log(uploadResponse, "uploadResponse")

                if (!uploadResponse.ok) {
                    const errorText = await uploadResponse.text();
                    console.error('S3 Upload Error:', errorText);
                    throw new Error(`Failed to upload file to S3: ${uploadResponse.status} ${uploadResponse.statusText}`);
                }

                console.log('File uploaded successfully!');

                // 3. Set Icon Value in Formik
                formik.setFieldValue('path', url);
            } catch (error) {
                console.error('Error uploading file:', error);
                // You might want to show this error to the user
                // setErrorMessage(error.message);
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
                    <Link href="/staticpages/services" className="font-['Raleway'] rtl:font-medium rtl:font-['Tajawal'] text-lg font-semibold text-[#1bd9bf] hover:underline dark:text-white-light">
                        {t("Testimonials")}
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
                                <h5 className="font-['Hermann'] rtl:font-medium rtl:font-['Tajawal'] text-2xl font-bold uppercase text-[#012d22] dark:text-white-light">{t("Edit Testimonials Section")}</h5>
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
                                        </>
                                        {/* )} */}

                                        {/* Testimonial Image Upload */}
                                        {/* <ImageUpload
                                            label="Testimonial Picture"
                                            name="image"
                                            accept="image/*"
                                            maxFileSize="10 MB"
                                            preview={ImagePreview}
                                            error={ImageError}
                                            setPreview={setImagePreview}
                                            setError={setImageError}
                                            width={960}
                                            height={950}
                                        /> */}
                                        <FileUpload
                                            label={t("Cover Photo")?.toString()}
                                            name="path"
                                            accept="image/*"
                                            maxFileSize="10 MB"
                                            value={formik.values.path}
                                            onChange={onFileChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.path && formik.errors.path && <span className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.path}</span>}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {filteredPermissions?.[0].meta.pivot_update === 1 && (
                                            <Button
                                                text={isUpdatingTestimonialSection ? t("Saving") : t("Save")}
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

export default EditOurStoryContent;
