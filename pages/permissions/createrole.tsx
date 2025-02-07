import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';
import { setPageTitle } from '@/store/themeConfigSlice';
import { useEffect } from 'react';
import SelectField from '../components/SelectField';
import Button from '../components/Button';
import { useRouter } from 'next/router';
import useValidationSchemaHook from '@/utils/validation-schema';
import { useFormik } from 'formik';
import { useCreateRoleAction } from '@/models/role.model';
import InputField from '../components/InputField';
import * as Yup from 'yup';
import { ErrorToast } from '@/utils/helper';
import { useTranslation } from 'react-i18next';
interface Permission {
    module_id: number;
    create: number; // 0 or 1
    read: number;
    update: number;
    delete: number;
}

interface FormValues {
    name: string;
    permissions: Permission[];
}

const Create = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    useEffect(() => {
        dispatch(setPageTitle('Create Role'));
    }, [dispatch]);

    const router = useRouter();

    const handleCancelClick = () => {
        router.push("/permissions/rolesmanagement");
    };

    const { mutate: createRole, isLoading: isCreatingRole } = useCreateRoleAction();

    const categories = [
        { id: 40, name: 'user management', arabic_name: 'إدارة المستخدمين' },
        { id: 70, name: 'employee management', arabic_name: 'إدارة الموظفين' },
        { id: 80, name: 'freelancer management', arabic_name: 'إدارة العمل الحر' },
        { id: 30, name: 'categories management', arabic_name: 'إدارة الفئات' },
        { id: 60, name: 'services management', arabic_name: 'إدارة الخدمات' },
        { id: 10, name: 'booking management', arabic_name: 'إدارة الحجز'},
        { id: 110, name: 'coupons and discounts management', arabic_name: 'إدارة القسائم والخصومات' },
        { id: 120, name: 'Leave management', arabic_name: 'إدارة الإجازات' },
        { id: 90, name: 'static pages management', arabic_name: 'إدارة الصفحات الثابتة' },
        { id: 100, name: 'social media management', arabic_name: 'إدارة وسائل التواصل الاجتماعي' },
    ];


    const addRoleSchema = Yup.object().shape({
        name: Yup.string().required(t('errors.Role name is a required field')?.toString()),
        permissions: Yup.array()
        .of(
            Yup.object().shape({
                module_id: Yup.number().required(),
                create: Yup.number().oneOf([0, 1]),
                read: Yup.number().oneOf([0, 1]),
                update: Yup.number().oneOf([0, 1]),
                delete: Yup.number().oneOf([0, 1]),
            })
        )
        .test(
            'at-least-one-permission',
            t('errors.Please select at least one permission')?.toString(),
            (permissions) => {
                // Handle undefined or null permissions
                if (!permissions) return false;
                return permissions.some(
                    (permission) =>
                        permission.create === 1 ||
                        permission.read === 1 ||
                        permission.update === 1 ||
                        permission.delete === 1
                );
            }
        ),
    });


    const formik = useFormik<FormValues>({
        initialValues: {
            name: '',
            permissions: categories.map((category) => ({
                module_id: category.id,
                create: 0,
                read: 0,
                update: 0,
                delete: 0,
            })),
        },
        validationSchema: addRoleSchema,
        onSubmit: (values, { resetForm }) => {
            // Filter out permissions where all actions are 0
            const filteredPermissions = values.permissions.filter(permission =>
                permission.create === 1 || permission.read === 1 || permission.update === 1 || permission.delete === 1
            );

            const payload = {
                name: values.name,
                permissions: filteredPermissions,
            };

            console.log(payload, 'Payload to API');
            createRole(payload, {
                onSuccess: () => {
                    resetForm();
                    router.push('/permissions/rolesmanagement');
                    ErrorToast(t('Role created successfully'), 'success', t('Success')?.toString());
                },
                onError: (error) => {
                    ErrorToast(t('Failed to create role. Please try again.'), 'error', t('Error')?.toString());
                },
            });
        },
    });

    const handlePermissionChange = (moduleId: number, action: keyof Permission) => {
        const updatedPermissions = formik.values.permissions.map((permission) => {
            if (permission.module_id === moduleId) {
                return { ...permission, [action]: permission[action] === 1 ? 0 : 1 };
            }
            return permission;
        });

        formik.setFieldValue('permissions', updatedPermissions);
    };

    const permissionOptions = [
        { id: 'create', name: 'Create', arabic_name: 'يخلق' },
        { id: 'read', name: 'Read', arabic_name: 'يقرأ' },
        { id: 'update', name: 'Update', arabic_name: 'تحديث' },
        { id: 'delete', name: 'Delete', arabic_name: 'يمسح' },
    ];


    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link href="/permissions/rolesmanagement" className="font-['Raleway'] rtl:font-['Tajawal'] rtl:font-medium text-lg font-semibold text-[#1bd9bf] hover:underline dark:text-white-light">
                        {t("Roles List")}
                    </Link>
                </li>
                <li className="font-['Raleway'] rtl:font-['Tajawal'] text-lg font-normal text-[#727272] before:content-['/'] dark:text-white-light ltr:before:mr-2 rtl:before:ml-2">
                    <span>{t("Create Role")}</span>
                </li>
            </ul>
            <div className="pt-5">
                <div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
                    <div className="flex flex-col gap-6 lg:col-span-3">
                        <div className="panel">
                            <div className="mb-5">
                                <h5 className="font-['Hermann'] rtl:font-['Tajawal'] rtl:font-medium text-2xl font-bold uppercase text-[#012d22] dark:text-white-light">{t("Create Role")}</h5>
                            </div>
                            <div className="mb-5">
                                <form className="space-y-5" onSubmit={formik.handleSubmit}>
                                    <div className="grid grid-cols-1 gap-6">
                                        <div>
                                            <InputField
                                                name="name"
                                                label={t("Role Name (English)")?.toString()}
                                                placeholder={t("Enter Role Name")?.toString()}
                                                type="text"
                                                value={formik.values.name}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.errors.name && formik.touched.name && <div className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.name}</div>}
                                        </div>
                                        <div>
                                            <label className="font-['Raleway'] rtl:font-['Tajawal'] rtl:font-medium text-lg font-semibold text-[#012d22] dark:text-white-light">{t("Permissions")}</label>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 permissions">
                                            {categories.map((category) => (
                                                <div key={category.id} className="flex flex-col gap-3">
                                                    <label htmlFor={category.name} className="font-['Raleway'] rtl:font-['Tajawal'] rtl:font-medium text-base font-semibold text-[#012d22] dark:text-white-light">
                                                        {isRtl ? category.arabic_name : category.name.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                                                    </label>
                                                    <div className="flex flex-wrap items-center gap-3">
                                                        {permissionOptions.map((option) => (
                                                            <label key={option.id} className="inline-flex items-center gap-2">
                                                                <input
                                                                    type="checkbox"
                                                                    className="form-checkbox text-[#1bd9bf]"
                                                                    checked={
                                                                        formik.values.permissions.find((p) => p.module_id === category.id)?.[option.id as keyof Permission] === 1
                                                                    }
                                                                    onChange={() => handlePermissionChange(category.id, option.id as keyof Permission)}
                                                                    onBlur={() => formik.setFieldTouched('permissions', true)}
                                                                    name='permissions'
                                                                />
                                                                <span className="text-[#727272] text-sm font-normal font-['Raleway'] rtl:font-['Tajawal']">{isRtl ? option.arabic_name : option.name}</span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        {formik.errors.permissions && formik.touched.permissions && (
                                            <div className="text-red-500 rtl:font-['Tajawal'] font-normal">
                                                {typeof formik.errors.permissions === 'string' ? formik.errors.permissions : t('errors.Please select at least one permission')}
                                            </div>
                                        )}

                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            text={isCreatingRole ? t('Saving') : t('Save')}
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
Create.authenticate = true;
export default Create;
