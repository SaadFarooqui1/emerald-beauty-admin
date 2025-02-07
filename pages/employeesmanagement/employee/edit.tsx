import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';
import { setPageTitle } from '@/store/themeConfigSlice';
import { useEffect, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import InputField from '@/pages/components/InputField';
import SelectField from '@/pages/components/SelectField';
import Button from '@/pages/components/Button';
import { useRouter } from 'next/router';
import FileUpload from '@/pages/components/FileUpload';
import { useModelGetServices } from '@/models/service.model';
import { useFormik } from 'formik';
import useValidationSchemaHook from '@/utils/validation-schema';
import { useModelGetCategories } from '@/models/category.model';
import { useUpdateEmployeeAction } from '@/models/employee.model';
import { getCookie } from 'cookies-next';
import { useModelGetUserById } from '@/models/user.model';
import { ErrorToast } from '@/utils/helper';
import { useTranslation } from 'react-i18next';

const Edit = () => {

    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        dispatch(setPageTitle('Employee Edit'));
    });

    const { t } = useTranslation();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [startTime, setStartTime] = useState<string>('18:00');
    const [endTime, setEndTime] = useState<string>('03:00');  // Default 9 hours later
    const [number, setNumber] = useState<any>('');

    const categoriesOptions = [
        { value: 'HairStylist', label: 'Hair Stylist' },
        { value: 'MakeupArtist', label: 'Makeup Artist' },
        { value: 'Barber', label: 'Barber' },
        { value: 'NailArtist', label: 'Nail Artist' },
        { value: 'MassageTherapist', label: 'Massage Therapist' },
    ];

    // const servicesOptions = [
    //     { value: 'haircut', label: 'Haircut' },
    //     { value: 'haircolor', label: 'Hair Color' },
    //     { value: 'facial', label: 'Facial' },
    //     { value: 'manicure', label: 'Manicure' },
    //     { value: 'pedicure', label: 'Pedicure' },
    //     { value: 'massage', label: 'Massage' },
    // ];

    const handleCancelClick = () => {
        router.push("/employeesmanagement");
    };

    const id = router.query.id ? parseInt(router.query.id as string, 10) : undefined;



    const { data: employeeResponse, isLoading: employeeLoading, isError, refetch } = useModelGetUserById(id, {
        relations: ['user_image', 'user_categories', 'user_services'],
    });
    const employee = employeeResponse;



    const { data: servicesResponse, isLoading: servicesLoading, isError: servicesError, refetch: servicesRefetch } = useModelGetServices({});
    const services = servicesResponse;
    const servicesOptions = services?.data || [];




    const { data, isLoading, refetch: dataRefetch } = useModelGetCategories({});
    const categories = data?.data || [];

    const { editEmployeeSchema } = useValidationSchemaHook();

    const { mutate: updateEmployee, isLoading: isCreatingEmployee } = useUpdateEmployeeAction();
    const formik = useFormik({
        initialValues:
            { user_name: '', first_name: '', last_name: '', email: '', phone: '', category_id: 0, shift_start_time: '', shift_end_time: '', salary: '', service_id: 0, document: '', image_url: '', role_id: 0 },
        validationSchema: editEmployeeSchema,
        onSubmit: (values, { resetForm }) => {
            if (id) {
                updateEmployee(
                    {
                        id,  // Pass the category ID
                        data: {
                            user_name: values.user_name,
                            first_name: values.first_name,
                            last_name: values.last_name,
                            email: values.email,
                            phone: values.phone,
                            // password: values.password,
                            category_id: values.category_id,
                            service_id: values.service_id,
                            salary: values.salary,
                            shift_start_time: values.shift_start_time,
                            shift_end_time: values.shift_end_time,
                            role_id: 3,
                            image_url: values.image_url,
                            documents: [
                                {
                                    path: values.document,
                                    type: 'pdf',
                                }
                            ]
                        },
                    },
                    {
                        onSuccess: () => {
                            router.push('/employeesmanagement');
                            ErrorToast(t('Employee updated successfully')?.toString(), 'success', t('Success')?.toString());
                        },
                        onError: (error) => {
                            ErrorToast(t('Failed to update Employee. Please try again.')?.toString(), 'error', t('Error')?.toString());
                        },
                    }
                );
            }
        },
    });

    const [mediaType, setMediaType] = useState('');

    useEffect(() => {
        if (employee) {
            const employeeData = employee;
            setMediaType(employeeData?.user_categories?.[0]?.documents[0]?.mime_type || '');
            formik.setValues({
                user_name: employeeData.user_name || '',
                email: employeeData.email || '',
                first_name: employeeData.first_name || '',
                last_name: employeeData.last_name || '',
                phone: employeeData.phone || '',
                role_id: employeeData?.roles[0]?.id || 0,
                image_url: employeeData?.user_image?.mediaUrl || '',
                category_id: employeeData?.user_categories?.[0]?.category?.id || 0,
                service_id: employeeData?.user_services?.[0]?.service_id || 0,
                salary: employeeData.salary || '',
                shift_start_time: employeeData.shift_start_time || '',
                shift_end_time: employeeData.shift_end_time || '',
                document: employeeData?.user_categories?.[0]?.documents[0]?.mediaUrl || '',
            });

        }
    }, [employee]);


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
                const fieldName = name === 'image_url' ? 'image_url' : 'document';
                formik.setFieldValue(fieldName, url);
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };



    const handleStartTimeChange = (selectedTime: Date[]) => {
        if (selectedTime.length > 0) {
            const startTime = selectedTime[0];
            setStartTime(startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));

            // Calculate and set end time (9 hours later)
            const endShiftTime = new Date(startTime);
            endShiftTime.setHours(endShiftTime.getHours() + 9);
            setEndTime(endShiftTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
        }
    };

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link href="/employeesmanagement" className="font-['Raleway'] rtl:font-['Tajawal'] rtl:font-medium text-lg font-semibold text-[#1bd9bf] hover:underline dark:text-white-light">
                        {t("Employees List")}
                    </Link>
                </li>
                <li className="font-['Raleway'] rtl:font-['Tajawal'] rtl:font-medium text-lg font-normal text-[#727272] before:content-['/'] dark:text-white-light ltr:before:mr-2 rtl:before:ml-2">
                    <span>{t("Edit Employee")}</span>
                </li>
            </ul>
            <div className="pt-5">
                <div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
                    <div className="flex flex-col gap-6 lg:col-span-3">
                        <div className="panel">
                            <div className="mb-5">
                                <h5 className="font-['Hermann'] rtl:font-['Tajawal'] rtl:font-medium text-2xl font-bold uppercase text-[#012d22] dark:text-white-light">{t("Edit Employee")}</h5>
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
                                            <SelectField id="categories" label={t("Categories")?.toString()} name='category_id' options={categories}
                                                onChange={(e) => formik.setFieldValue('category_id', Number(e.target.value))}
                                                value={formik.values.category_id}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.category_id && formik.errors.category_id && <div className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.category_id}</div>}
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
                                            <InputField
                                                name='email'
                                                id="employeeemail"
                                                type="email"
                                                label={t("Email")?.toString()}
                                                placeholder={t("Enter Email")?.toString()}
                                                value={formik.values.email}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.email && formik.errors.email && <div className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.email}</div>}
                                        </div>

                                        <div>
                                            <label htmlFor="phonenumber" className="font-['Raleway'] rtl:font-['Tajawal'] rtl:font-medium text-lg font-semibold text-[#012d22] dark:text-white-light">
                                                {t("Phone Number")}
                                            </label>
                                            <PhoneInput
                                                id="phonenumber"
                                                international
                                                name="phone"
                                                defaultCountry="AE"
                                                placeholder="Enter Phone Number"
                                                countryCallingCodeEditable={false}
                                                value={formik.values.phone}
                                                onChange={(value) => formik.setFieldValue("phone", value)}
                                                onBlur={formik.handleBlur}
                                                className="form-input-lg form-input font-['Raleway'] text-base font-normal text-[#727272]"
                                            />
                                            {formik.touched.phone && formik.errors.phone && <div className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.phone}</div>}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-7 md:grid-cols-2">

                                        <div>
                                            <InputField
                                                id="password"
                                                name='password'
                                                type="password"
                                                label={t("Password")?.toString()}
                                                placeholder={t("Enter Password")?.toString()}
                                                // value={formik.values.password}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                readOnly
                                                className='cursor-not-allowed'
                                            />
                                            {/* {formik.touched.password && formik.errors.password && <div className="text-red-500 capitalize">{formik.errors.password}</div>} */}
                                        </div>

                                        <div>
                                            <SelectField id="services" name="service_id" label={t("Services")?.toString()}
                                                options={servicesOptions}
                                                value={formik.values.service_id}
                                                onChange={(e) => formik.setFieldValue('service_id', Number(e.target.value))}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.service_id && formik.errors.service_id && <div className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.service_id}</div>}
                                        </div>

                                    </div>
                                    <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
                                        <div>
                                            <label htmlFor="shiftstarttime" className="font-['Raleway'] rtl:font-['Tajawal'] rtl:font-medium text-lg font-semibold text-[#012d22] dark:text-white-light">
                                                {t("Shift Start Time")}
                                            </label>
                                            <Flatpickr
                                                data-enable-time
                                                options={{
                                                    enableTime: true,
                                                    dateFormat: 'H:i K',
                                                    position: isRtl ? 'auto right' : 'auto left',
                                                    noCalendar: true,
                                                }}
                                                value={formik.values.shift_start_time}
                                                name='shift_start_time'
                                                className="form-input-lg form-input font-['Raleway'] text-base font-normal text-[#727272] focus:border-[#012d22] dark:focus:border-white-light"
                                                onChange={(date) => {
                                                    formik.setFieldValue(
                                                        "shift_start_time",
                                                        `${String(date[0].getHours()).padStart(2, "0")}:${String(date[0].getMinutes()).padStart(2, "0")}:00`
                                                    );
                                                }}
                                            />
                                            {formik.touched.shift_start_time && formik.errors.shift_start_time && <div className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.shift_start_time}</div>}
                                        </div>
                                        <div>
                                            <label htmlFor="shiftendtime" className="font-['Raleway'] rtl:font-['Tajawal'] rtl:font-medium text-lg font-semibold text-[#012d22] dark:text-white-light">
                                                {t("Shift End Time")}
                                            </label>
                                            <Flatpickr
                                                data-enable-time
                                                // disabled
                                                options={{
                                                    enableTime: true,
                                                    dateFormat: 'H:i K',
                                                    position: isRtl ? 'auto right' : 'auto left',
                                                    noCalendar: true,
                                                }}
                                                name='shift_end_time'
                                                value={formik.values.shift_end_time}
                                                className="form-input-lg form-input font-['Raleway'] text-base font-normal text-[#727272] focus:border-[#012d22] dark:focus:border-white-light"
                                                onChange={(date) => {
                                                    formik.setFieldValue(
                                                        "shift_end_time",
                                                        `${String(date[0].getHours()).padStart(2, "0")}:${String(date[0].getMinutes()).padStart(2, "0")}:00`
                                                    );
                                                }}
                                            />
                                            {formik.touched.shift_end_time && formik.errors.shift_end_time && <div className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.shift_end_time}</div>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
                                        <div className="relative">
                                            <InputField
                                                name="salary"
                                                label={t("Salary")?.toString()}
                                                placeholder={t("Enter Salary")?.toString()}
                                                type="text"
                                                className={`${isRtl ? 'pl-24' : 'pr-24'}`}
                                                value={formik.values.salary}
                                                onChange={(e) => formik.setFieldValue('salary', Number(e.target.value))}
                                                onBlur={formik.handleBlur}
                                            />
                                            <span className={`aed-class absolute inset-y-0 flex items-center px-3 bg-[#b8c3c0] text-[#012d22] ${isRtl ? 'left-0 rounded-l-md' : 'right-0 rounded-r-md'}`}>
                                                <b>AED</b>
                                            </span>
                                            {formik.touched.salary && formik.errors.salary && <div className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.salary}</div>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
                                        <div>
                                            <FileUpload
                                                label={t("Profile Picture")?.toString()}
                                                name="image_url"
                                                accept="image/*"
                                                maxFileSize="10 MB"
                                                value={formik.values.image_url}
                                                onChange={onFileChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.image_url && formik.errors.image_url && <div className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.image_url}</div>}
                                        </div>

                                        <div>
                                            <FileUpload
                                                label={t("Upload Document")?.toString()}
                                                name="document"
                                                accept=".pdf,.docx"
                                                maxFileSize="10 MB"
                                                value={formik.values.document}
                                                onChange={onFileChange}
                                                onBlur={formik.handleBlur}
                                                type={mediaType}
                                            />
                                            {formik.touched.document && formik.errors.document && <div className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.document}</div>}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Button
                                            text={isCreatingEmployee ? t("Saving") : t("Save")}
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
