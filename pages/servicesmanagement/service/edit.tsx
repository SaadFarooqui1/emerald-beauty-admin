import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';
import { setPageTitle } from '@/store/themeConfigSlice';
import { useEffect } from 'react';
import Button from '@/pages/components/Button';
import InputField from '@/pages/components/InputField'; // Import InputField
import SelectField from '@/pages/components/SelectField'; // Import SelectField
import { useRouter } from 'next/router';
import FileUpload from '@/pages/components/FileUpload';
import { useModelGetCategories } from '@/models/category.model';
import { useModelGetServiceById, useUpdateServiceAction } from '@/models/service.model';
import { useFormik } from 'formik';
import useValidationSchemaHook from '@/utils/validation-schema';
import { getCookie } from 'cookies-next';
import { ErrorToast } from '@/utils/helper';
import { useTranslation } from 'react-i18next';

const Edit = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Service Edit'));
    });
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const { t } = useTranslation();
    const router = useRouter();

    const handleCancelClick = () => {
        router.push("/servicesmanagement");
    };

    const handleSaveClick = () => {
        router.push("/servicesmanagement");
    };

    // Define options for the select fields
    // const categoryOptions = [
    //     { id: 'HairCare', name: 'Hair Care' },
    //     { id: 'SkinCare', name: 'Skin Care' },
    //     { id: 'NailCare', name: 'Nail Care' },
    //     { id: 'Makeup', name: 'Makeup' },
    //     { id: 'Wellness', name: 'Wellness' },
    // ];

    // const subcategoryOptions = [
    //     { id: 'HairCut', name: 'Hair Cut' },
    //     { id: 'Facial', name: 'Facial' },
    //     { id: 'Nails', name: 'Nails' },
    //     { id: 'Wedding', name: 'Wedding' },
    //     { id: 'MassageTherapy', name: 'Massage Therapy' },
    // ];

    // const couponOptions = [
    //     { id: 'SUMMER2024', name: 'SUMMER2024' },
    //     { id: 'NEWUSER10	', name: 'NEWUSER10	' },
    //     { id: 'WINTERSALE', name: 'WINTERSALE' },
    //     { id: 'BLACKFRIDAY', name: 'BLACKFRIDAY' },
    //     { id: 'FALLSALE', name: 'FALLSALE' },
    //     { id: 'SPRINGSALE', name: 'SPRINGSALE' },
    //     { id: 'HOLIDAYSALE', name: 'HOLIDAYSALE' },
    //     { id: 'LOYALTY15', name: 'LOYALTY15' },
    // ];

    
    const serviceTimeOptions = [
        { id: 30, name: '30 Minutes' },
        { id: 60, name: '1 Hour' },
        { id: 120, name: '2 Hours' },
        { id: 180, name: '3 Hours' },
        { id: 240, name: '4 Hours' },
        { id: 300, name: '5 Hours' },
        { id: 360, name: '6 Hours' },
    ];


    const { data, isLoading, refetch: dataRefetch } = useModelGetCategories({});
    const categories = data?.data?.map((category) => ({
        id: category.id,
        name: category.name,
    })) || [];

    const id = router.query.id ? parseInt(router.query.id as string, 10) : undefined;
    const { data: serviceResponse, isLoading: isUpdatingservice, isError, refetch } = useModelGetServiceById(id,{
        relations: ['cover_photo'],
    });
    const service = serviceResponse;

    // Using useUpdateServiceAction hook
    const { addServiceSchema } = useValidationSchemaHook();
    const { mutate: updateService, isLoading: isUpdatingService } = useUpdateServiceAction();

    const formik = useFormik({
        initialValues: {
            name: '',
            arabic_name: '',
            image_url: '',
            description: '',
            arabic_description: '',
            price: 0,
            category_id: 0,
            duration: 0
        },
        validationSchema: addServiceSchema,
        onSubmit: (values) => {
            if (id) {
                updateService(
                    {
                        id,
                        data: {
                            name: values.name,
                            arabic_name: values.arabic_name,
                            description: values.description,
                            arabic_description: values.arabic_description,
                            category_id: values.category_id,
                            price: values.price,
                            duration: values.duration,
                            image_url: values.image_url
                        },
                    },
                    {
                        onSuccess: () => {
                            ErrorToast(t('Service updated successfully'), 'success', t('Success')?.toString());
                            router.push('/servicesmanagement');
                        },
                        onError: (error) => {
                            ErrorToast(t('Failed to update Service. Please try again.'), 'error', t('Error')?.toString());
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
                formik.setFieldValue('image_url', url);
            } catch (error) {
                console.error('Error uploading file:', error);
                // You might want to show this error to the user
                // setErrorMessage(error.message);
            }
        }
    };



    useEffect(() => {
        if (service) {
            const serviceData = service;
            formik.setValues({
                name: serviceData.name || '',
                arabic_name: serviceData.arabic_name || '',
                description: serviceData.description || '',
                arabic_description: serviceData.arabic_description || '',
                price: serviceData.price || 0,
                duration: serviceData.duration || 0,
                category_id: serviceData?.category_id || 0,
                image_url: serviceData?.cover_photo?.mediaUrl || '',
            });

        }
    }, [service]);

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link href="/servicesmanagement" className="font-['Raleway'] rtl:font-['Tajawal'] rtl:font-medium text-lg font-semibold text-[#1bd9bf] hover:underline dark:text-white-light">
                        {t("Services List")}
                    </Link>
                </li>
                <li className="font-['Raleway'] rtl:font-['Tajawal'] text-lg font-normal text-[#727272] before:content-['/'] dark:text-white-light ltr:before:mr-2 rtl:before:ml-2">
                    <span>{t("Edit Service")}</span>
                </li>
            </ul>
            <div className="pt-5">
                <div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
                    <div className="flex flex-col gap-6 lg:col-span-3">
                        <div className="panel">
                            <div className="mb-5">
                                <h5 className="font-['Hermann'] rtl:font-['Tajawal'] rtl:font-medium text-2xl font-bold uppercase text-[#012d22] dark:text-white-light">{t("Edit Service")}</h5>
                            </div>
                            <div className="mb-5">
                                <form className="space-y-5" onSubmit={formik.handleSubmit}>
                                    <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
                                        <div>
                                            <SelectField
                                                label={t("Category")?.toString()}
                                                id="category"
                                                options={categories}
                                                value={formik.values.category_id}
                                                onChange={(e) => formik.setFieldValue('category_id', Number(e.target.value))}
                                                name="category_id"
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.category_id && formik.errors.category_id && <div className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.category_id}</div>}
                                        </div>
                                        {/* <div>
                                            <SelectField
                                                label="Subcategory"
                                                id="subcategory"
                                                options={subcategoryOptions}
                                            />
                                        </div> */}
                                    </div>
                                    <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
                                        <div>
                                            <InputField
                                                label={t("Service Name (English)")?.toString()}
                                                placeholder={t("Enter Service Name")?.toString()}
                                                defaultValue="Men's Haircut"
                                                name="name"
                                                value={formik.values.name}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.name && formik.errors.name && <div className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.name}</div>}
                                        </div>

                                        <div>
                                            <InputField
                                                label={t("Service Name (Arabic)")?.toString()}
                                                placeholder={t("Enter Service Name")?.toString()}
                                                defaultValue="Men's Haircut"
                                                name="arabic_name"
                                                value={formik.values.arabic_name}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.arabic_name && formik.errors.arabic_name && <div className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.arabic_name}</div>}
                                        </div>

                                        <div>
                                            <div className="relative">
                                                <InputField
                                                    name="price"
                                                    label={t("Price")?.toString()}
                                                    placeholder={t("Enter Price")?.toString()}
                                                    type="number"
                                                    className={`${isRtl ? 'pl-24' : 'pr-24'}`}
                                                    value={formik.values.price}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                                <span className={`aed-class absolute inset-y-0 flex items-center px-3 bg-[#b8c3c0] text-[#012d22] ${isRtl ? 'left-0 rounded-l-md' : 'right-0 rounded-r-md'}`}>
                                                    <b>AED</b>
                                                </span>
                                                {formik.touched.price && formik.errors.price && <div className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.price}</div>}
                                            </div>
                                        </div>
                                        <div>
                                            <SelectField
                                                label={t("Service Time")?.toString()}
                                                id="servicetime"
                                                name='duration'
                                                options={serviceTimeOptions}
                                                value={formik.values.duration}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.duration && formik.errors.duration && <div className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.duration}</div>}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
                                        {/* <div>
                                            <SelectField
                                                label="Edit Coupon"
                                                id="editcoupon"
                                                options={couponOptions}
                                            />
                                        </div> */}
                                        <div>
                                            <InputField
                                                label={t("Description (English)")?.toString()}
                                                type="textarea"
                                                placeholder={t("Enter Description")?.toString()}
                                                name="description"
                                                id='description'
                                                rows={5}
                                                value={formik.values.description}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.description && formik.errors.description && <div className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.description}</div>}
                                        </div>
                                        <div>
                                            <InputField
                                                label={t("Description (Arabic)")?.toString()}
                                                type="textarea"
                                                placeholder={t("Enter Description")?.toString()}
                                                name="arabic_description"
                                                rows={5}
                                                value={formik.values.arabic_description}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.arabic_description && formik.errors.arabic_description && <div className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.arabic_description}</div>}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-7">
                                        <FileUpload
                                            label={t("Cover Photo")?.toString()}
                                            name="image_url"
                                            accept="image/*"
                                            maxFileSize="10 MB"
                                            onChange={onFileChange}
                                            value={formik.values.image_url}
                                        />
                                        {formik.touched.image_url && formik.errors.image_url && <div className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.image_url}</div>}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            type='submit'
                                            text={isUpdatingService ? t('Updating') : t('Update')}
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