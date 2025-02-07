import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';
import { setPageTitle } from '@/store/themeConfigSlice';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'
import Button from '@/pages/components/Button';
const ReactQuill = dynamic(import('react-quill'), { ssr: false });

const EditTermsAndConditions = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Edit Terms And Conditions'));
    });

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [formData, setFormData] = useState(
        "<h2>1. Introduction:</h2><br>Welcome to Royal Agarwood Perfume This Privacy Policy outlines how we collect, use, disclose, and protect your personal information when you use our website. By accessing or using our services, you agree to the terms outlined in this Privacy Policy.<br><br><h2>2. Information We Collect:</h2><br>We collect various types of information to provide and improve our services. This includes personally identifiable information such as your name, address, email address, and payment information. We also collect non-personally identifiable information, such as browsing habits, to enhance user experience.<br><br><h2>3. How We Use Your Information:</h2><br>We use your information to process orders, provide customer support, improve our products and services, and communicate with you about promotions and updates. Your data is handled with the utmost care and is never sold or shared with third parties without your explicit consent, except as required by law."
    );

    // const [isEnglish, setIsEnglish] = useState(true);

    const router = useRouter();

    const handleCancelClick = () => {
        router.push("/");
    };

    const handleSaveClick = () => {
        router.push("/");
    };

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'align': [] }],
            ['link'],
            ['clean']
        ]
    };

    const formats = [
        'header',
        'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent', 'align', 'check',
        'script',	
        'link'
    ];

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link href="/" className="font-['Raleway'] text-lg font-semibold text-[#1bd9bf] hover:underline dark:text-white-light">
                        Terms And Conditions
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
                                <h5 className="font-['Hermann'] text-2xl font-bold uppercase text-[#012d22] dark:text-white-light">Edit Terms And Conditions</h5>
                            </div>

                            {/* Language Toggle */}
                            {/* <div className="mb-5 flex items-center gap-4">
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

                            <div className="mb-5">
                                <form className="space-y-5">
                                    <div className='space-y-5'>
                                        {/* {isEnglish ? ( */}
                                            {/* English Fields */}
                                            <div className='space-y-2'>
                                                <label htmlFor="privacyPolicy" className="font-['Raleway'] text-lg font-semibold text-[#012d22] dark:text-white-light">
                                                    English
                                                </label>
                                                <ReactQuill value={formData} onChange={setFormData} theme='snow' modules={modules} formats={formats} />
                                            </div>
                                        {/* ) : ( */}
                                            {/* Arabic Fields */}
                                            <div className='space-y-2'>
                                                <label htmlFor="privacyPolicy" className="font-['Raleway'] text-lg font-semibold text-[#012d22] dark:text-white-light">
                                                    Arabic
                                                </label>
                                                <ReactQuill value={formData} onChange={setFormData} theme='snow' modules={modules} formats={formats} />
                                            </div>
                                        {/* )} */}
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

export default EditTermsAndConditions;
