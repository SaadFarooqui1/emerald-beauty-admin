import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { useRouter } from 'next/router';
import ImageUpload from '../components/ImageUpload';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '@/store/themeConfigSlice';
import { IRootState } from '@/store';


const HeaderEditor: React.FC = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Edit Header'));
    });

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [ImagePreview, setImagePreview] = useState<string | null>(null);
    const [ImageError, setImageError] = useState<string | null>(null);
    // const [isEnglish, setIsEnglish] = useState(true); 

    const [formData, setFormData] = useState({
        navlink1: 'Home',
        navlink2: 'About',
        navlink3: 'Services',
        navlink4: 'Contact',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const router = useRouter();

    const handleCancelClick = () => {
        router.push("/staticpages/home");
    };

    const handleSaveClick = () => {
        router.push("/staticpages/home");
    };

    return (
        <div className="pt-5">
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link
                        href="/staticpages/home"
                        className="font-['Raleway'] text-lg font-semibold text-[#1bd9bf] hover:underline dark:text-white-light"
                    >
                        Header
                    </Link>
                </li>
                <li className="font-['Raleway'] text-lg font-normal text-[#727272] before:content-['/'] dark:text-white-light ltr:before:mr-2 rtl:before:ml-2">
                    <span>Edit</span>
                </li>
            </ul>

            <div className="mt-5">
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-1">
                    <div className="flex flex-col gap-6 lg:col-span-1">
                        <div className="panel p-5 bg-white shadow-md rounded-lg">
                            <div className="mb-5">
                                <h5 className="font-['Hermann'] text-2xl font-bold uppercase text-[#012d22] dark:text-white-light">
                                    Edit Header
                                </h5>
                            </div>

                            {/* Toggle for language switch */}
                            {/* <div className="mb-5 flex items-center gap-2 sm:gap-4">
                                <label className="font-semibold">Language:</label>
                                <button
                                    className={`py-2 px-4 rounded-lg font-semibold ${isEnglish ? 'bg-[#1bd9bf] text-white' : 'bg-gray-200 text-black'}`}
                                    onClick={() => setIsEnglish(true)}
                                >
                                    English
                                </button>
                                <button
                                    className={`py-2 px-4 rounded-lg font-semibold ${!isEnglish ? 'bg-[#1bd9bf] text-white' : 'bg-gray-200 text-black'}`}
                                    onClick={() => setIsEnglish(false)}
                                >
                                    Arabic
                                </button>
                            </div> */}

                            <div className="footer-editor space-y-6">
                                <div className="container">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                                        <div className="section space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <ImageUpload
                                                        label="Upload Logo"
                                                        name="uploadlogo"
                                                        accept="image/*"
                                                        maxFileSize="10 MB"
                                                        preview={ImagePreview}
                                                        error={ImageError}
                                                        setPreview={setImagePreview}
                                                        setError={setImageError}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="section w-full space-y-4">
                                            <h2 className="font-['Raleway'] text-lg font-semibold text-[#012d22] dark:text-white-light">Navigation Menu</h2>
                                            <form className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                                {/* {isEnglish ? ( */}
                                                    <div className='space-y-4'>
                                                        <InputField
                                                            label="Nav Link 1 (English)"
                                                            name="navlink1"
                                                            type="text"
                                                            placeholder="Home"
                                                            defaultValue={formData.navlink1}
                                                            onChange={handleInputChange}
                                                        />

                                                        <InputField
                                                            label="Nav Link 2 (English)"
                                                            name="navlink2"
                                                            type="text"
                                                            placeholder="About"
                                                            defaultValue={formData.navlink2}
                                                            onChange={handleInputChange}
                                                        />

                                                        <InputField
                                                            label="Nav Link 3 (English)"
                                                            name="navlink3"
                                                            type="text"
                                                            placeholder="Services"
                                                            defaultValue={formData.navlink3}
                                                            onChange={handleInputChange}
                                                        />

                                                        <InputField
                                                            label="Nav Link 4 (English)"
                                                            name="navlink4"
                                                            type="text"
                                                            placeholder="Contact"
                                                            defaultValue={formData.navlink4}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                {/* ) : ( */}
                                                    <div className='space-y-4'>
                                                        <InputField
                                                            label="Nav Link 1 (Arabic)"
                                                            name="navlink1"
                                                            type="text"
                                                            placeholder="Home"
                                                            defaultValue={formData.navlink1}
                                                            onChange={handleInputChange}
                                                        />

                                                        <InputField
                                                            label="Nav Link 2 (Arabic)"
                                                            name="navlink2"
                                                            type="text"
                                                            placeholder="About"
                                                            defaultValue={formData.navlink2}
                                                            onChange={handleInputChange}
                                                        />

                                                        <InputField
                                                            label="Nav Link 3 (Arabic)"
                                                            name="navlink3"
                                                            type="text"
                                                            placeholder="Services"
                                                            defaultValue={formData.navlink3}
                                                            onChange={handleInputChange}
                                                        />

                                                        <InputField
                                                            label="Nav Link 4 (Arabic)"
                                                            name="navlink4"
                                                            type="text"
                                                            placeholder="Contact"
                                                            defaultValue={formData.navlink4}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                {/* )} */}
                                            </form>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 mt-6">
                                    <Button text="Save" onClick={handleSaveClick} bgColor="#012d22" textColor="#ffff" />
                                    <Button text="Cancel" onClick={handleCancelClick} bgColor="#1bd9bf" textColor="#ffff" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default HeaderEditor;
