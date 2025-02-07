import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';
import { setPageTitle } from '@/store/themeConfigSlice';
import { useEffect, useState } from 'react';
import InputField from '@/pages/components/InputField';
import RadioGroup from '@/pages/components/RadioGroup';
import Button from '@/pages/components/Button';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { useCreateNotificationAction } from '@/models/notification.model';
import useValidationSchemaHook from '@/utils/validation-schema';
import { ErrorToast } from '@/utils/helper';
import { useTranslation } from 'react-i18next';


const Edit = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('System Maintenance');
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const { t } = useTranslation();
    useEffect(() => {
        dispatch(setPageTitle('Notification Create'));
    }, [dispatch]);

    const router = useRouter();

    const handleCancelClick = () => {
        router.push("/notificationsmanagement");
    };

    const handleSaveClick = () => {
        router.push("/notificationsmanagement");
    };


    const { addNotificationSchema } = useValidationSchemaHook();

    const { mutate: createNotification, isLoading: isCreatingNotification } = useCreateNotificationAction();
    const formik = useFormik({
        initialValues: { title: '', body: '', type: 0 },
        validationSchema: addNotificationSchema,
        onSubmit: (values, { resetForm }) => {
            const payload: { title: string; body: string; type?: number } = {
                title: values.title,
                body: values.body,
            };

            if (values.type !== 1) {
                payload.type = values.type;
            }
            createNotification(payload, {
                onSuccess: () => {
                    resetForm();
                    router.push('/notificationsmanagement');
                    ErrorToast(t('Notification created successfully'), 'success', t('Success')?.toString());
                },
                onError: (error) => {
                    console.error('Notification creation error:', error);
                    ErrorToast(t('Failed to create notification. Please try again.'), 'error', t('Error')?.toString());
                },
            });
        },
    });


    const recipientOptions = [
        { id: 1, name: 'All' },
        { id: 2, name: 'Freelancers' },
        { id: 3, name: 'Employees' },
        { id: 4, name: 'Users' },
    ];






    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link href="/notificationsmanagement" className="font-['Raleway'] rtl:font-['Tajawal'] rtl:font-medium text-lg font-semibold text-[#1bd9bf] hover:underline dark:text-white-light">
                        {t("Notifications List")}
                    </Link>
                </li>
                <li className="font-['Raleway'] rtl:font-['Tajawal'] text-lg font-normal text-[#727272] before:content-['/'] dark:text-white-light ltr:before:mr-2 rtl:before:ml-2">
                    <span>{t("Create New Notification")}</span>
                </li>
            </ul>
            <div className="pt-5">
                <div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
                    <div className="flex flex-col gap-6 lg:col-span-3">
                        <div className="panel">
                            <div className="mb-5">
                                <h5 className="font-['Hermann'] rtl:font-['Tajawal'] rtl:font-medium text-2xl font-bold uppercase text-[#012d22] dark:text-white-light">{t("Create New Notification")}</h5>
                            </div>
                            <div className="mb-5">
                                <form className="space-y-5" onSubmit={formik.handleSubmit}>
                                    <div className="grid grid-cols-1 gap-6">
                                        <div>
                                            <InputField
                                                label={t("Title")?.toString()}
                                                name="title"
                                                value={formik.values.title}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                placeholder={t("Enter Title")?.toString()}
                                            />
                                            {formik.touched.title && formik.errors.title && <div className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.title}</div>}
                                        </div>
                                        <div>
                                            <InputField
                                                label={t("Notification Message")?.toString()}
                                                name="body"
                                                type="textarea"
                                                rows={5}
                                                value={formik.values.body}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                placeholder={t("Write the notification message content here")?.toString()}
                                            />
                                            {formik.touched.body && formik.errors.body && <div className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.body}</div>}
                                        </div>
                                        <div>
                                            <RadioGroup
                                                name="type"
                                                label={t("Recipient Options")?.toString()}
                                                options={recipientOptions}
                                                selectedOption={formik.values.type}
                                                onChange={(value) => formik.setFieldValue('type', value)}
                                            />
                                            {formik.touched.type && formik.errors.type && <div className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.type}</div>}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            text={isCreatingNotification ? t("Sending") : t("Send")}
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
Edit.authenticate = true;
export default Edit;
