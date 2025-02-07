import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';
import { setPageTitle } from '@/store/themeConfigSlice';
import { useEffect } from 'react';
import InputField from '@/pages/components/InputField';
import SelectField from '@/pages/components/SelectField';
import Button from '@/pages/components/Button';
import { useRouter } from 'next/router';


const Edit = () => {

    const categoryOptions = [
        { id: 'haircare', name: 'Haircare' }
    ];

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCategory = event.target.value;
    };

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('SubCategory Edit'));
    });
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    
    const router = useRouter();

    const handleCancelClick = () => {
        router.push("/categories/subcategories");
    };
    
    const handleSaveClick = () => {
        router.push("/categories/subcategories");
    };

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link href="/categories/subcategories" className="font-['Raleway'] text-lg font-semibold text-[#1bd9bf] hover:underline dark:text-white-light">
                        Subcategories List
                    </Link>
                </li>
                <li className="font-['Raleway'] text-lg font-normal text-[#727272] before:content-['/'] dark:text-white-light ltr:before:mr-2 rtl:before:ml-2">
                    <span>Edit</span>
                </li>
            </ul>
            <div className="pt-5">
                <div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
                    <div className="flex flex-col gap-6 lg:col-span-3">
                        <div className="panel">
                            <div className="mb-5">
                                <h5 className="font-['Hermann'] text-2xl font-bold uppercase text-[#012d22] dark:text-white-light">Edit Subcategories</h5>
                            </div>
                            <div className="mb-5">
                                <form className="space-y-5">
                                    <div className="grid grid-cols-1 gap-6">

                                        <InputField
                                            name="Subcategory Name"
                                            label="Subcategory Name"
                                            placeholder="Enter Subcategory Name"
                                            type="text"
                                            defaultValue="Haircare"
                                        />

                                        <SelectField
                                            id="categoryname"
                                            label="Category"
                                            options={categoryOptions}
                                            onChange={handleCategoryChange}
                                        />

                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            text="Save"
                                            onClick={handleSaveClick}
                                            bgColor="#012d22"
                                            textColor="#ffff"
                                        />
                                        <Button
                                            text="Cancel"
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

export default Edit;
