import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';
import { setPageTitle } from '@/store/themeConfigSlice';
import { useEffect } from 'react';
import InputField from '../components/InputField';
import SelectField from '../components/SelectField';
import Button from '../components/Button';
import { useRouter } from 'next/router';
import FileUpload from '../components/FileUpload';
import { useModelGetSocialMediaById, useUpdateSocialMediaAction } from '@/models/socialMedia.model';
import { useFormik } from 'formik';
import { getCookie } from 'cookies-next';
import useValidationSchemaHook from '@/utils/validation-schema';
import { ErrorToast } from '@/utils/helper';
import { useTranslation } from 'react-i18next';

const Edit = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Edit Social Media'));
    });
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const { t } = useTranslation();

    const socialMediaOptions = [
        { id: 10, name: 'Facebook', arabic_name: 'فيسبوك' },
        { id: 20, name: 'Instagram', arabic_name: 'إنستغرام' },
        { id: 40, name: 'Twitter', arabic_name: 'تويتر' },
        { id: 30, name: 'LinkedIn', arabic_name: 'لينكدإن' },
        { id: 50, name: 'Threads', arabic_name: 'ثريدز' },
    ];

    const router = useRouter();

    const handleCancelClick = () => {
        router.push("/socialmedia");
    };

    const id = router.query.id ? parseInt(router.query.id as string, 10) : undefined;
    const { data: socialMediaResponse, isLoading, isError, refetch } = useModelGetSocialMediaById(id, {
        relations: ['icon']
    });
    const socailMedia = socialMediaResponse;

    const { addSocialIconsSchema } = useValidationSchemaHook();


    const { mutate: updateSocialMedia, isLoading: isUpdatingSocialMedia } = useUpdateSocialMediaAction();


    const formik = useFormik({
        initialValues: {
            type: 0,
            url: '',
            icon: ''
        },
        validationSchema: addSocialIconsSchema,
        onSubmit: (values) => {
            if (id) {
                updateSocialMedia(
                    {
                        id,  // Pass the SocialMedia ID
                        data: {
                            type: values.type,
                            url: values.url,
                            icon: values.icon
                        },
                    },
                    {
                        onSuccess: () => {
                            router.push('/socialmedia');
                            ErrorToast(t('Social Media updated successfully'), 'success', t('Success')?.toString());
                        },
                        onError: (error) => {
                            ErrorToast(t('Failed to update social media. Please try again.'), 'error', t('Error')?.toString());
                        },
                    }
                );
            }
        },
    });


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
                formik.setFieldValue('icon', url);
            } catch (error) {
                console.error('Error uploading file:', error);
                // You might want to show this error to the user
                // setErrorMessage(error.message);
            }
        }
    };





    useEffect(() => {
        if (socailMedia) {
            const socialData = socailMedia;
            formik.setValues({
                type: socialData.type || 0,
                url: socialData.url || '',
                icon: socialData.icon.mediaUrl || ''
            });

        }
    }, [socailMedia]);


    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link href="/socialmedia" className="font-['Raleway'] rtl:font-medium rtl:font-['Tajawal'] text-lg font-semibold text-[#1bd9bf] hover:underline dark:text-white-light">
                        {t("Social Media List")}
                    </Link>
                </li>
                <li className="font-['Raleway'] rtl:font-['Tajawal'] text-lg font-normal text-[#727272] before:content-['/'] dark:text-white-light ltr:before:mr-2 rtl:before:ml-2">
                    <span>{t("Edit Social Media Link")}</span>
                </li>
            </ul>
            <div className="pt-5">
                <div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
                    <div className="flex flex-col gap-6 lg:col-span-3">
                        <div className="panel">
                            <div className="mb-5">
                                <h5 className="font-['Hermann'] rtl:font-['Tajawal'] rtl:font-medium text-2xl font-bold uppercase text-[#012d22] dark:text-white-light">{t("Edit Social Media Link")}</h5>
                            </div>
                            <div className="mb-5">
                                <form className="space-y-5" onSubmit={formik.handleSubmit}>
                                    <div className="grid grid-cols-1 gap-7">
                                        <div>
                                            <SelectField
                                                id="socialmediaplatform"
                                                name='type'
                                                label={t("Social Media Platform")?.toString()}
                                                options={socialMediaOptions}
                                                value={formik.values.type}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.type && formik.errors.type && <div className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.type}</div>}
                                        </div>
                                        <div>
                                            <FileUpload
                                                label={t("Icon")?.toString()}
                                                name='icon'
                                                maxFileSize='10 MB'
                                                accept='image/*'
                                                onChange={onFileChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.icon}
                                            />
                                            {formik.touched.icon && formik.errors.icon && <div className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.icon}</div>}
                                        </div>
                                        <div>
                                            <InputField
                                                label={t("Link")?.toString()}
                                                type="url"
                                                placeholder={t("Text Input for URL (e.g: https://instagram.com/brandname)")?.toString()}
                                                name="url"
                                                id="linkurl"
                                                // defaultValue="https://facebook.com/demoname"
                                                value={formik.values.url}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}

                                            />
                                            {formik.touched.url && formik.errors.url && <div className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.url}</div>}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            text={t("Save")}
                                            type="submit"
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
Edit.authenticate = true;
export default Edit;