import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';
import { setPageTitle } from '@/store/themeConfigSlice';
import { useEffect } from 'react';
import InputField from '@/pages/components/InputField';
import Button from '@/pages/components/Button';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import useValidationSchemaHook from '@/utils/validation-schema';
import { useCreateCategoryAction } from '@/models/category.model';
import { ErrorToast } from '@/utils/helper';
import { useTranslation } from 'react-i18next';
const Edit = () => {

    const dispatch = useDispatch();
    const router = useRouter();


    useEffect(() => {
        dispatch(setPageTitle('Category Create'));
    });
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const { t } = useTranslation();
    const handleCancelClick = () => {
        router.push("/categories/categories");
    };


    const { addCategorySchema } = useValidationSchemaHook();

    const { mutate: createCategory, isLoading: isCreatingCategory } = useCreateCategoryAction();
    const formik = useFormik({
        initialValues: { name: '', arabic_name: '' },
        validationSchema: addCategorySchema,
        onSubmit: (values, { resetForm }) => {
            createCategory(
                {
                    name: values.name,
                    arabic_name: values.arabic_name,
                },
                {
                    onSuccess: () => {
                        resetForm();
                        router.push('/categories/categories');
                        ErrorToast(t('Category created successfully'), 'success', t('Success')?.toString());
                    },
                    onError: (error) => {
                        console.error('Category creation error:', error);
                        ErrorToast(t('Failed to create category. Please try again.'), 'error', t('Error')?.toString());
                    },
                }
            );
        },
    });


    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link href="/categories/categories" className="font-['Raleway'] rtl:font-['Tajawal'] rtl:font-medium text-lg font-semibold text-[#1bd9bf] hover:underline dark:text-white-light">
                        {t("Categories List")}
                    </Link>
                </li>
                <li className="font-['Raleway'] rtl:font-['Tajawal'] text-lg font-normal text-[#727272] before:content-['/'] dark:text-white-light ltr:before:mr-2 rtl:before:ml-2">
                    <span>{t("Add Categories")}</span>
                </li>
            </ul>
            <div className="pt-5">
                <div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
                    <div className="flex flex-col gap-6 lg:col-span-3">
                        <div className="panel">
                            <div className="mb-5">
                                <h5 className="font-['Hermann'] rtl:font-['Tajawal'] rtl:font-medium text-2xl font-bold uppercase text-[#012d22] dark:text-white-light">{t("Add Categories")}</h5>
                            </div>
                            <div className="mb-5">
                                <form className="space-y-5" onSubmit={formik.handleSubmit}>
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                                        <div>
                                            <InputField
                                                name="name"
                                                label={t("Category Name (English)")?.toString()}
                                                placeholder={t("Enter Category Name")?.toString()}
                                                type="text"
                                                value={formik.values.name}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.name && formik.errors.name && <span className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.name}</span>}
                                        </div>
                                        <div>
                                            <InputField
                                                name="arabic_name"
                                                label={t("Category Name (Arabic)")?.toString()}
                                                placeholder={t("Enter Category Name")?.toString()}
                                                type="text"
                                                value={formik.values.arabic_name}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.arabic_name && formik.errors.arabic_name && <span className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.arabic_name}</span>}
                                        </div>

                                        {/* <InputField
                                            rows={5}
                                            name="description"
                                            label="Description"
                                            placeholder="Enter Description"
                                            type="textarea"
                                        /> */}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            text={isCreatingCategory ? t('Saving') : t('Save')}
                                            type="submit"
                                            bgColor="#012d22"
                                            textColor="#ffff"
                                        />
                                        <Button
                                            text={t("Cancel")}
                                            type='button'
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
