import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';
import { setPageTitle } from '@/store/themeConfigSlice';
import { useEffect } from 'react';
import InputField from '@/pages/components/InputField';
import Button from '@/pages/components/Button';
import { useRouter } from 'next/router';
import { useModelGetCategoryById, useUpdateCategoryAction } from '@/models/category.model';
import { useFormik } from 'formik';
import useValidationSchemaHook from '@/utils/validation-schema';
import { ErrorToast } from '@/utils/helper';
import { useTranslation } from 'react-i18next';


const Edit = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        dispatch(setPageTitle('Category Edit'));
    });
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const { t } = useTranslation();
    const handleCancelClick = () => {
        router.push("/categories/categories");
    };

    const handleSaveClick = () => {
        router.push("/categories/categories");
    };

    const id = router.query.id ? parseInt(router.query.id as string, 10) : undefined;
    const { data: categoryResponse, isLoading, isError, refetch } = useModelGetCategoryById(id);

    const category = categoryResponse;

    const { addCategorySchema } = useValidationSchemaHook();
    // Using useUpdateCategoryAction hook
    const { mutate: updateCategory, isLoading: isUpdatingCategory } = useUpdateCategoryAction();

    const formik = useFormik({
        initialValues: {
            name: '',
            arabic_name: '',
        },
        validationSchema: addCategorySchema,
        onSubmit: (values) => {
            if (id) {
                updateCategory(
                    {
                        id,  // Pass the category ID
                        data: {
                            name: values.name,
                            arabic_name: values.arabic_name,
                        },
                    },
                    {
                        onSuccess: () => {
                            ErrorToast(t('Category updated successfully')?.toString(), 'success', t('Success')?.toString());
                            router.push('/categories/categories');

                        },
                        onError: (error) => {
                            console.error('Category update error:', error);
                            ErrorToast(t('Failed to update category. Please try again.')?.toString(), 'error', t('Error')?.toString());
                        },
                    }
                );
            }
        },
    });

    useEffect(() => {
        if (category) {
            const categoryData = category;
            formik.setValues({
                name: categoryData.name || '', // Ensure category name is not empty
                arabic_name: categoryData.arabic_name || '', // File inputs cannot be pre-filled
            });

        }
    }, [category]);

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link href="/categories/categories" className="font-['Raleway'] rtl:font-medium rtl:font-['Tajawal'] text-lg font-semibold text-[#1bd9bf] hover:underline dark:text-white-light">
                        {t("Categories List")}
                    </Link>
                </li>
                <li className="font-['Raleway'] rtl:font-['Tajawal'] text-lg font-normal text-[#727272] before:content-['/'] dark:text-white-light ltr:before:mr-2 rtl:before:ml-2">
                    <span>{t("Edit Categories")}</span>
                </li>
            </ul>
            <div className="pt-5">
                <div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
                    <div className="flex flex-col gap-6 lg:col-span-3">
                        <div className="panel">
                            <div className="mb-5">
                                <h5 className="font-['Hermann'] rtl:font-medium rtl:font-['Tajawal'] text-2xl font-bold uppercase text-[#012d22] dark:text-white-light">{t("Edit Categories")}</h5>
                            </div>
                            <div className="mb-5">
                                <form className="space-y-5" onSubmit={formik.handleSubmit}>
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                                        <div>
                                            <InputField
                                                name="name"
                                                label={t("Category Name (English)")?.toString()}
                                                placeholder={t("Enter Category Name")?.toString()}
                                                defaultValue="Haircare"
                                                type="text"
                                                value={formik.values.name}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.name && formik.errors.name && <div className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.name}</div>}
                                        </div>

                                        <div>
                                            <InputField
                                                name="arabic_name"
                                                label={t("Category Name (Arabic)")?.toString()}
                                                placeholder={t("Enter Category Name")?.toString()}
                                                defaultValue="Haircare"
                                                type="text"
                                                value={formik.values.arabic_name}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.arabic_name && formik.errors.arabic_name && <div className="text-red-500 rtl:font-['Tajawal'] font-normal">{formik.errors.arabic_name}</div>}
                                        </div>

                                        {/* <InputField
                                            name="description"
                                            label="Description"
                                            placeholder="Enter Description"
                                            type="textarea"
                                            rows={5}
                                            defaultValue="Experience top-notch men&apos;s grooming services with our expert haircare treatments. 
                                                Our skilled stylists will provide you with a personalized haircut tailored to your unique style and preferences. 
                                                Say goodbye to bad hair days and hello to a fresh new look with our professional haircare services."
                                        /> */}
                                    </div>


                                    <div className="flex items-center gap-2">
                                        <Button
                                            text={isUpdatingCategory ? t('Saving') : t('Save')}
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
