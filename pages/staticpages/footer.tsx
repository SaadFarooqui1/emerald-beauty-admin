import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { useRouter } from 'next/router';
import ImageUpload from '../components/ImageUpload';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '@/store/themeConfigSlice';
import { IRootState } from '@/store';

const FooterEditor: React.FC = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Edit Footer'));
    });

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [ImagePreview, setImagePreview] = useState<string | null>(null);
    const [ImageError, setImageError] = useState<string | null>(null);
    // const [isEnglish, setIsEnglish] = useState(true);
    const [formData, setFormData] = useState({
        description: '',
        quicklink1: 'Home',
        quicklink2: 'About',
        quicklink3: 'Services',
        quicklink4: 'Contact',
        supportlink1: 'Terms and Conditions',
        supportlink2: 'Privacy Policy',
        supportlink3: 'Refund Policy',
        email: 'info@emeraldbeauty.com',
        phone: '+971 703 1918',
        address: 'ebel Ali Golf Course, Al Maktoum Airport Street',
        facebook: 'https://www.facebook.com/',
        whatsapp: 'https://wa.me/',
        instagram: 'https://www.instagram.com/',
        youtube: 'https://www.youtube.com/',
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
                        Footer
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
                                    Edit Footer
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
                                                        name="uploadLogo"
                                                        accept="image/*"
                                                        maxFileSize="10 MB"
                                                        preview={ImagePreview}
                                                        error={ImageError}
                                                        setPreview={setImagePreview}
                                                        setError={setImageError}
                                                    />
                                                </div>
                                            </div>

                                        {/* {isEnglish ?     */}
                                            <InputField
                                                label="Short Description (English)"
                                                name="description"
                                                type="textarea"
                                                rows={3}
                                                placeholder="Enter short description"
                                                defaultValue={formData.description}
                                                onChange={handleInputChange}
                                            />
                                            {/* :  */}
                                            <InputField
                                                label="Short Description (Arabic)"
                                                name="description"
                                                type="textarea"
                                                rows={3}
                                                placeholder="Enter short description"
                                                defaultValue={formData.description}
                                                onChange={handleInputChange}
                                            />
                                        {/* } */}
                                        </div>

                                        <div className="section w-full space-y-4">
                                            <h2 className="font-['Raleway'] text-lg font-semibold text-[#012d22] dark:text-white-light">Quick Links</h2>
                                            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                                                {/* {isEnglish ? ( */}
                                                    <div className="space-y-4">
                                                        <InputField
                                                            label="Nav Link 1 (English)"
                                                            name="navlink1"
                                                            type="text"
                                                            placeholder="Home"
                                                            defaultValue={formData.quicklink1}
                                                            onChange={handleInputChange}
                                                        />
                                                        <InputField
                                                            label="Nav Link 2 (English)"
                                                            name="navlink2"
                                                            type="text"
                                                            placeholder="About"
                                                            defaultValue={formData.quicklink2}
                                                            onChange={handleInputChange}
                                                        />
                                                        <InputField
                                                            label="Nav Link 3 (English)"
                                                            name="navlink3"
                                                            type="text"
                                                            placeholder="Services"
                                                            defaultValue={formData.quicklink3}
                                                            onChange={handleInputChange}
                                                        />
                                                        <InputField
                                                            label="Nav Link 4 (English)"
                                                            name="navlink4"
                                                            type="text"
                                                            placeholder="Contact"
                                                            defaultValue={formData.quicklink4}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    {/* ) : ( */}
                                                    <div className="space-y-4">
                                                        <InputField
                                                            label="Nav Link 1 (Arabic)"
                                                            name="navlink1"
                                                            type="text"
                                                            placeholder="Home"
                                                            defaultValue={formData.quicklink1}
                                                            onChange={handleInputChange}
                                                        />
                                                        <InputField
                                                            label="Nav Link 2 (Arabic)"
                                                            name="navlink2"
                                                            type="text"
                                                            placeholder="About"
                                                            defaultValue={formData.quicklink2}
                                                            onChange={handleInputChange}
                                                        />
                                                        <InputField
                                                            label="Nav Link 3 (Arabic)"
                                                            name="navlink3"
                                                            type="text"
                                                            placeholder="Services"
                                                            defaultValue={formData.quicklink3}
                                                            onChange={handleInputChange}
                                                        />
                                                        <InputField
                                                            label="Nav Link 4 (Arabic)"
                                                            name="navlink4"
                                                            type="text"
                                                            placeholder="Contact"
                                                            defaultValue={formData.quicklink4}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                {/* )} */}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="container space-y-6">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                                        <div className="section space-y-4">
                                            {/* <h2 className="font-['Raleway'] text-lg font-semibold text-[#012d22] dark:text-white-light">Social Media</h2>
                                            <div className='space-y-5'>
                                                <InputField
                                                    label="Whatsapp Link"
                                                    name="whatsapp"
                                                    type="url"
                                                    placeholder="https://wa.me/1234567890"
                                                    defaultValue={formData.whatsapp}
                                                    onChange={handleInputChange}
                                                />
                                                <InputField
                                                    label="Youtube Link"
                                                    name="youtube"
                                                    type="url"
                                                    placeholder="https://www.youtube.com/"
                                                    defaultValue={formData.youtube}
                                                    onChange={handleInputChange}
                                                />
                                                <InputField
                                                    label="Facebook Link"
                                                    name="facebook"
                                                    type="url"
                                                    placeholder="https://www.facebook.com/"
                                                    defaultValue={formData.facebook}
                                                    onChange={handleInputChange}
                                                />
                                                <InputField
                                                    label="Instagram Link"
                                                    name="instagram"
                                                    type="url"
                                                    placeholder="https://www.instagram.com/"
                                                    defaultValue={formData.instagram}
                                                    onChange={handleInputChange}
                                                />
                                            </div> */}
                                            

                                            <h2 className="font-['Raleway'] text-lg font-semibold text-[#012d22] dark:text-white-light">Contact Info</h2>
                                            <InputField
                                                label="Email"
                                                name="contactEmail"
                                                type="email"
                                                placeholder="Enter Email"
                                                defaultValue={formData.email}
                                                onChange={handleInputChange}
                                            />
                                            <InputField
                                                label="Phone"
                                                name="contactPhone"
                                                type="tel"
                                                placeholder="Enter Phone Number"
                                                defaultValue={formData.phone}
                                                onChange={handleInputChange}
                                            />

                                            <InputField
                                                label="Address"
                                                name="address"
                                                type="text"
                                                placeholder="Enter Address"
                                                defaultValue={formData.address}
                                                onChange={handleInputChange}
                                            />


                                        </div>

                                        <div className="section space-y-4">
                                            <h2 className="font-['Raleway'] text-lg font-semibold text-[#012d22] dark:text-white-light">Support</h2>
                                            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                                                {/* {isEnglish ? ( */}
                                                    <div className="space-y-4">
                                                        <InputField
                                                            label="Support Link 1 (English)"
                                                            name="supportlink1"
                                                            type="text"
                                                            placeholder="Home"
                                                            defaultValue={formData.supportlink1}
                                                            onChange={handleInputChange}
                                                        />
                                                        <InputField
                                                            label="Support Link 2 (English)"
                                                            name="supportlink2"
                                                            type="text"
                                                            placeholder="About"
                                                            defaultValue={formData.supportlink2}
                                                            onChange={handleInputChange}
                                                        />
                                                        <InputField
                                                            label="Support Link 3 (English)"
                                                            name="supportlink3"
                                                            type="text"
                                                            placeholder="Services"
                                                            defaultValue={formData.supportlink3}
                                                            onChange={handleInputChange}
                                                        />
                                                        
                                                    </div>
                                                    {/* ) : ( */}
                                                    <div className="space-y-4">
                                                        <InputField
                                                            label="Support Link 1 (Arabic)"
                                                            name="supportlink1"
                                                            type="text"
                                                            placeholder="Home"
                                                            defaultValue={formData.supportlink1}
                                                            onChange={handleInputChange}
                                                        />
                                                        <InputField
                                                            label="Support Link 2 (Arabic)"
                                                            name="supportlink2"
                                                            type="text"
                                                            placeholder="About"
                                                            defaultValue={formData.supportlink2}
                                                            onChange={handleInputChange}
                                                        />
                                                        <InputField
                                                            label="Support Link 3 (Arabic)"
                                                            name="supportlink3"
                                                            type="text"
                                                            placeholder="Services"
                                                            defaultValue={formData.supportlink3}
                                                            onChange={handleInputChange}
                                                        />
                                                        
                                                    </div>
                                                {/* )} */}
                                            </div>
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

export default FooterEditor;
