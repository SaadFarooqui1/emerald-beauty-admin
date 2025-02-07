import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';
import { setPageTitle } from '@/store/themeConfigSlice';
import { useEffect, useState } from 'react';
import 'flatpickr/dist/flatpickr.css';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import InputField from '@/pages/components/InputField';
import SelectField from '@/pages/components/SelectField';
import FileUpload from '../components/FileUpload';
import Button from '../components/Button';
import { useRouter } from 'next/router';
import { useModelGetUserById } from '@/models/user.model';
import { useUpdateStaffAction } from '@/models/staff.model';
import { useFormik } from 'formik';
import { useModelGetRoles } from '@/models/role.model';
import useValidationSchemaHook from '@/utils/validation-schema';
import { getCookie } from 'cookies-next';
import { ErrorToast } from '@/utils/helper';
import { useTranslation } from 'react-i18next';

const EditStaff = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPageTitle('Employee Edit'));
    });
    const { t } = useTranslation();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [time, setTime] = useState<any>('18:00');
    const [time2, setTime2] = useState<any>('12:00');
    const [number, setNumber] = useState<any>('');


    const router = useRouter();

    const handleCancelClick = () => {
        router.push("/permissions/staffmanagement");
    };

    // const handleSaveClick = () => {
    //     router.push("/permissions/staffmanagement");
    // };
    const id = router.query.id ? parseInt(router.query.id as string, 10) : undefined;
    const { data: rolesResponse, isLoading: rolesLoading, isError: rolesError, refetch: rolesRefetch } = useModelGetRoles({});
    const roles = rolesResponse;


    const { data: staffResponse, isLoading, isError, refetch } = useModelGetUserById(id, {
        relations: ['user_image'],
    });
    const staff = staffResponse;
    // console.log(data, 'data');

    const rolesOptions = roles?.data?.map((role) => ({
        id: role.id,      // Change 'value' to 'id'
        name: role.name,  // Change 'label' to 'name'
    })) || [];

    // Using useUpdateCategoryAction hook
    const { addStaffSchema } = useValidationSchemaHook();
    const { mutate: updateStaff, isLoading: isUpdatingStaff } = useUpdateStaffAction();


    const formik = useFormik({
        initialValues: {
            user_name: '',
            email: '',
            first_name: '',
            last_name: '',
            phone: '',
            role_id: 0,
            // password: '',
            address: "",
            image_url: ''
        },
        validationSchema: addStaffSchema,
        onSubmit: (values) => {
            if (id) {
                updateStaff(
                    {
                        id,  // Pass the category ID
                        data: {
                            user_name: values.user_name,
                            email: values.email,
                            first_name: values.first_name,
                            last_name: values.last_name,
                            phone: values.phone,
                            role_id: values.role_id,
                            latitude: 0,
                            longitude: 0,
                            image_url: values.image_url,
                            password: 'Demo@123',
                            address: values.address
                        },
                    },
                    {
                        onSuccess: () => {
                            router.push('/permissions/staffmanagement');
                            ErrorToast(t('Staff updated successfully'), 'success', t('Success')?.toString());

                        },
                        onError: (error) => {
                            ErrorToast(t('Failed to update staff. Please try again.'), 'error', t('Error')?.toString());
                        },
                    }
                );
            }
        },
    });

    useEffect(() => {
        if (staff) {
            const staffData = staff;
            formik.setValues({
                user_name: staffData.user_name || '',
                email: staffData.email || '',
                first_name: staffData.first_name || '',
                last_name: staffData.last_name || '',
                phone: staffData.phone || '',
                role_id: staff?.roles[0]?.id,
                address: staffData.address || '',
                image_url: staffData?.user_image?.mediaUrl || '',
            });

        }
    }, [staff]);


 const onFileChange = async (event:any) => {
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

                console.log(uploadResponse,"uploadResponse")
  
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


    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link href="/permissions/staffmanagement" className="font-['Raleway'] rtl:font-['Tajawal'] rtl:font-medium text-lg font-semibold text-[#1bd9bf] hover:underline dark:text-white-light">
                        {t("Staff List")}
                    </Link>
                </li>
                <li className="font-['Raleway'] rtl:font-['Tajawal'] text-lg font-normal text-[#727272] before:content-['/'] dark:text-white-light ltr:before:mr-2 rtl:before:ml-2">
                    <span>{t("Edit Staff")}</span>
                </li>
            </ul>
            <div className="pt-5">
                <div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
                    <div className="flex flex-col gap-6 lg:col-span-3">
                        <div className="panel">
                            <div className="mb-5">
                                <h5 className="font-['Hermann'] rtl:font-['Tajawal'] rtl:font-medium text-2xl font-bold uppercase text-[#012d22] dark:text-white-light">{t("Edit Staff")}</h5>
                            </div>
                            <div className="mb-5">
                                <form className="space-y-5" onSubmit={formik.handleSubmit}>
                                    <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
                                        <div>
                                            <InputField
                                                name="user_name"
                                                label={t("User Name")?.toString()}	
                                                placeholder={t("Enter User Name")?.toString()}
                                                type="text"
                                                value={formik.values.user_name}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.user_name && formik.errors.user_name && <div className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.user_name}</div>}
                                        </div>
                                        <div>
                                            <InputField
                                                name="email"
                                                type="email"
                                                label={t("Email")?.toString()}
                                                placeholder={t("Enter Email")?.toString()}
                                                value={formik.values.email}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.email && formik.errors.email && <div className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.email}</div>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
                                        <div>
                                            <InputField
                                                name="first_name"
                                                label={t("First Name")?.toString()}
                                                placeholder={t("Enter First Name")?.toString()}
                                                type="text"
                                                value={formik.values.first_name}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.first_name && formik.errors.first_name && <div className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.first_name}</div>}
                                        </div>
                                        <div>
                                            <InputField
                                                name="last_name"
                                                label={t("Last Name")?.toString()}
                                                placeholder={t("Enter Last Name")?.toString()}
                                                type="text"
                                                value={formik.values.last_name}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.last_name && formik.errors.last_name && <div className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.last_name}</div>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
                                        <div>
                                            <label htmlFor="phonenumber" className="font-['Raleway'] rtl:font-['Tajawal'] rtl:font-medium text-lg font-semibold text-[#012d22] dark:text-white-light">
                                                {t("Phone Number")}
                                            </label>
                                            <PhoneInput
                                                id="phonenumber"
                                                international
                                                defaultCountry="AE"
                                                placeholder="Enter Phone Number"
                                                name="phone"
                                                countryCallingCodeEditable={false}
                                                value={formik.values.phone}
                                                onChange={(value) => formik.setFieldValue("phone", value)}
                                                onBlur={formik.handleBlur}
                                                className="form-input-lg form-input font-['Raleway'] text-base font-normal text-[#727272]"
                                            />
                                            {formik.touched.phone && formik.errors.phone && <div className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.phone}</div>}
                                        </div>
                                        <div>
                                            <InputField
                                                name="password"
                                                type="password"
                                                label={t("Password")?.toString()}
                                                placeholder={t("Enter Password")?.toString()}
                                                // className='cursor-not-allowed pointer-events-none'
                                                // value={formik.values.password}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {/* {formik.touched.password && formik.errors.password && <div className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.password}</div>} */}
                                        </div>    
                                    </div>

                                    <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
                                        <div>
                                            <InputField
                                                name="address"
                                                type="text"
                                                label={t("Address")?.toString()}
                                                placeholder={t("Enter Address")?.toString()}
                                                value={formik.values.address}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.address && formik.errors.address && <div className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.address}</div>}
                                        </div>
                                        {/* <select name="roles" id=""

                                            value={formik.values.role_id}
                                            onChange={formik.handleChange}
                                        >
                                            {rolesOptions.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>

                                            ))}
                                        </select> */}
                                        <div>
                                            <SelectField id="role" label={t("Role")?.toString()} options={rolesOptions}
                                                value={formik.values.role_id}
                                                onChange={(e) => formik.setFieldValue('role_id', Number(e.target.value))}
                                                name="role_id"
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.role_id && formik.errors.role_id && <div className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.role_id}</div>}
                                        </div>
                                    </div>


                                    <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
                                        <div>
                                            <FileUpload
                                                label={t("Profile Picture")?.toString()}
                                                name="profilePicture"
                                                accept="image/*"
                                                maxFileSize="10 MB"
                                                onChange={onFileChange}
                                                value={formik.values.image_url}
                                            />
                                            {formik.touched.image_url && formik.errors.image_url && <div className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.image_url}</div>}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Button
                                            type='submit'
                                            text={isUpdatingStaff ? t('Updating') : t('Update')}
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
EditStaff.authenticate = true;
export default EditStaff;
