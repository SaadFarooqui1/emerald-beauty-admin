import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';
import { setPageTitle } from '@/store/themeConfigSlice';
import { useEffect } from 'react';
import Button from '@/pages/components/Button';
import InputField from '@/pages/components/InputField';
import { useRouter } from 'next/router';
import FileUpload from '@/pages/components/FileUpload';
import useValidationSchemaHook from '@/utils/validation-schema';
import { useUpdateSalaryStatusAction } from '@/models/salary.model';
import { useFormik } from 'formik';
import { getCookie } from 'cookies-next';
import { ErrorToast } from '@/utils/helper';
import { useTranslation } from 'react-i18next';

const EmployeePayNow = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Employee PayNow'));
    });
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';

    const router = useRouter();
    const { t } = useTranslation();
    const { name, salary } = router.query;

    const handleCancelClick = () => {
        router.push("/billing/employeebillinglist/employeebillingdetail");
    };

    const handleSaveClick = () => {
        router.push("/billing/employeebillinglist/employeebillingdetail");
    };




    const id = router.query.id ? parseInt(router.query.id as string, 10) : undefined;

    const { addPaymentSchema } = useValidationSchemaHook();

    const { mutate: updateSalary, isLoading: isCreatingSalary } = useUpdateSalaryStatusAction();

    const formik = useFormik({
        initialValues: {
            reciept: "",
        },
        validationSchema: addPaymentSchema,
        onSubmit: (values) => {
            if (id) {
                updateSalary(
                    {
                        id,  // Pass the category ID
                        data: {
                            reciept: values.reciept,
                        },
                    },
                    {
                        onSuccess: () => {
                            ErrorToast(t('Reciept created successfully'), 'success', t('Success')?.toString());
                            router.back();
                        },
                        onError: (error) => {
                            ErrorToast(t('Failed to create receipt. Please try again.'), 'error', t('Error')?.toString());
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
                formik.setFieldValue('reciept', url);
            } catch (error) {
                console.error('Error uploading file:', error);
                // You might want to show this error to the user
                // setErrorMessage(error.message);
            }
        }
    };



    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <button onClick={()=> router.back()} className="capitalize font-['Raleway'] text-lg font-semibold text-[#1bd9bf] hover:underline dark:text-white-light">
                        {name}
                    </button>
                </li>
                <li className="font-['Raleway'] rtl:font-['Tajawal'] text-lg font-normal text-[#727272] before:content-['/'] dark:text-white-light ltr:before:mr-2 rtl:before:ml-2">
                    <span>{t("Pay Now")}</span>
                </li>
            </ul>
            <div className="pt-5">
                <div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
                    <div className="flex flex-col gap-6 lg:col-span-3">
                        <div className="panel">
                            <div className="mb-5">
                                <h5 className="font-['Hermann'] rtl:font-['Tajawal'] rtl:font-medium text-2xl font-bold uppercase text-[#012d22] dark:text-white-light">{t("Information")}</h5>
                            </div>
                            <div className="mb-5">
                                <form className="space-y-5" onSubmit={formik.handleSubmit}>
                                    <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
                                        <div>
                                            <InputField
                                                label={t("Name")?.toString()}
                                                placeholder={t("Enter Name")?.toString()}
                                                value={name?.toString()}
                                                name="name"
                                                id="name"
                                                className='capitalize'
                                                readOnly
                                            />
                                        </div>
                                        <div>
                                            <div className="relative">
                                                <InputField
                                                    name="salary"
                                                    label={t("Salary")?.toString()}
                                                    placeholder={t("Enter Salary")?.toString()}
                                                    type="text"
                                                    className={isRtl ? "pl-14" : "pr-14"}
                                                    value={salary?.toString()}
                                                    readOnly
                                                />
                                                <span className={`aed-class absolute inset-y-0 flex items-center px-3 bg-[#b8c3c0] text-[#012d22] ${isRtl ? "left-0 rounded-l-md" : "right-0 rounded-r-md"}`}>
                                                    <b>AED</b>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
                                        {/* <div>
                                            <InputField
                                                label="Category"
                                                placeholder="Enter Category"
                                                defaultValue="HairCare"
                                                name="category"
                                                id="category"
                                            />
                                        </div>
                                        <div>
                                            <InputField
                                                label="Sub Category"
                                                placeholder="Enter Sub Category"
                                                defaultValue="HairCut"
                                                name="subcategory"
                                                id="subcategory"
                                            />
                                        </div> */}
                                    </div>
                                    <div className="grid grid-cols-1 gap-7">
                                        <div>
                                            <FileUpload
                                                label={t("Upload Receipt")?.toString()}
                                                name="receipt"
                                                accept="image/*"
                                                maxFileSize="10 MB"
                                                onChange={onFileChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.errors.reciept && formik.touched.reciept && <div className='text-red-500 capitalize'>{formik.errors.reciept}</div>}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            text={isCreatingSalary ? t("Saving") : t("Save")}
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
EmployeePayNow.authenticate = true;
export default EmployeePayNow;