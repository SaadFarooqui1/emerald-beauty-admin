import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';
import { setPageTitle } from '@/store/themeConfigSlice';
import { useEffect, useState } from 'react';
import SelectField from '../components/SelectField';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { useRouter } from 'next/router';


const EditPageContent = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Notification Create'));
    });

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [formData, setFormData] = useState({
        pageName: 'System Maintenance',
        pageContent: '',
        language: 'english', // default language
    });

    const languageOptions = [
        { id: 'en', name: 'English' },
        { id: 'ar', name: 'Arabic' },
    ];

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedLanguage = event.target.value;
        console.log('Selected language:', selectedLanguage);
    };


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const router = useRouter();

    const handleCancelClick = () => {
        router.push("/staticpages/staticpagemanagement");
    };
    
    const handleSaveClick = () => {
        router.push("/staticpages/staticpagemanagement");
    };

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link href="/staticpages/staticpagemanagement" className="font-['Raleway'] text-lg font-semibold text-[#1bd9bf] hover:underline dark:text-white-light">
                        Static Pages List
                    </Link>
                </li>
                <li className="font-['Raleway'] text-lg font-normal text-[#727272] before:content-['/'] dark:text-white-light ltr:before:mr-2 rtl:before:ml-2">
                    <span>Edit</span>
                </li>
            </ul>
            <div className="pt-5">
                <div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
                    <div className="flex flex-col gap-6 lg:col-span-2">
                        <div className="panel">
                            <div className="mb-5">
                                <h5 className="font-['Hermann'] text-2xl font-bold uppercase text-[#012d22] dark:text-white-light">Edit Page Content</h5>
                            </div>
                            <div className="mb-5">
                                <form className="space-y-5">
                                    <div className="grid grid-cols-1 gap-6">
                                        <InputField
                                            label="Page Name"
                                            name="pageName"
                                            type="text"
                                            placeholder="Enter Title"
                                            defaultValue={formData.pageName}
                                            onChange={handleInputChange}
                                        />
                                        <SelectField
                                            id="language"
                                            label="Language"
                                            options={languageOptions}
                                            onChange={handleLanguageChange}
                                        />
                                        <InputField
                                            label="Page Content"
                                            name="pageContent"
                                            type="textarea"
                                            placeholder="Write the page content here..."
                                            defaultValue={formData.pageContent}
                                            rows={5}
                                            onChange={handleInputChange}
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

export default EditPageContent;
