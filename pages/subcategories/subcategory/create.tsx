import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';
import { setPageTitle } from '@/store/themeConfigSlice';
import { useEffect } from 'react';
import Select from 'react-select';
import InputField from '@/pages/components/InputField';
import SelectField from '@/pages/components/SelectField';
import Button from '@/pages/components/Button';
import { useRouter } from 'next/router';

const servicesoptions = [
    { id: 'basictrim', name: 'Basic Trim' },
]

const AddSubCategory = () => {
    const dispatch = useDispatch();

    const router = useRouter();


    const handleCancelClick = () => {
        router.push("/categories/subcategories");
    };

    const handleSaveClick = () => {
        router.push("/categories/subcategories");
    };

    useEffect(() => {
        dispatch(setPageTitle('Create Subcategory'));
    });
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const customStyles = {
        container: (provided: any) => ({
            ...provided,
            border: '1px solid #b8c3c0', // Light border color
            borderRadius: '10px',
            padding: '6px 15px',
            width: '100%',
        }),
        control: (provided: any) => ({
            ...provided,
            border: 'none',
            background: 'transparent',
            boxShadow: 'none',
            minHeight: 'unset',
        }),
        multiValue: (provided: any) => ({
            ...provided,
            backgroundColor: '#012d22', // Dark green background
            borderRadius: '50px',
            padding: '4px 8px',
            display: 'flex',
            alignItems: 'center',
        }),
        multiValueLabel: (provided: any) => ({
            ...provided,
            color: '#FFFFFF',
            padding: '0 4px',
            fontFamily: 'Raleway',
        }),
        multiValueRemove: (provided: any) => ({
            ...provided,
            color: '#FFFFFF',
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: 'transparent',
                color: '#FFFFFF',
            },
        }),
        dropdownIndicator: (provided: any) => ({
            ...provided,
            color: '#012d22',
            padding: '0',
            '&:hover': {
                color: '#012d22',
            },
        }),
        indicatorSeparator: (provided: any) => ({
            ...provided,
            display: 'none',
        })
    };

    const categoryOptions = [
        { id: 'HairCare', name: 'Hair Care' },
    ];

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link href="/subcategories" className="font-['Raleway'] text-lg font-semibold text-[#1bd9bf] hover:underline dark:text-white-light">
                        Subcategories List
                    </Link>
                </li>
                <li className="font-['Raleway'] text-lg font-normal text-[#727272] before:content-['/'] dark:text-white-light ltr:before:mr-2 rtl:before:ml-2">
                    <span>Add</span>
                </li>
            </ul>
            <div className="pt-5">
                <div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
                    <div className="flex flex-col gap-6 lg:col-span-2">
                        <div className="panel">
                            <div className="mb-5">
                                <h5 className="font-['Hermann'] text-2xl font-bold uppercase text-[#012d22] dark:text-white-light">Add Subcategories</h5>
                            </div>
                            <div className="mb-5">
                                <form className="space-y-5">
                                    <div className="grid grid-cols-1 gap-7">
                                        <div>
                                            <InputField
                                                id="subcategoryname"
                                                name="subcategoryname"
                                                label="Subcategory Name"
                                                placeholder="Enter Subcategory name"
                                                defaultValue="Haircut"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
                                        <div>
                                            <SelectField
                                                id="category"
                                                label="Category"
                                                options={categoryOptions}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="linkedservices" className="font-['Raleway'] text-lg font-semibold text-[#012d22] dark:text-white-light">
                                                Linked Services
                                            </label>
                                            <Select placeholder="Select an service" options={servicesoptions} isMulti isSearchable={true} styles={customStyles} />
                                        </div>
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

export default AddSubCategory;
