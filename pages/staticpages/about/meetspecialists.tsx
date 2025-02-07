import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';
import { setPageTitle } from '@/store/themeConfigSlice';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import InputField from '@/pages/components/InputField';
import Button from '@/pages/components/Button';
import ImageUpload from '@/pages/components/ImageUpload';
import { useTranslation } from 'react-i18next';

const EditSpecialistContent = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Edit Specialist Content'));
    });

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [firstImagePreview, setFirstImagePreview] = useState<string | null>(null);
    const [firstImageError, setFirstImageError] = useState<string | null>(null);
    const { t } = useTranslation();
    const [secondImagePreview, setSecondImagePreview] = useState<string | null>(null);
    const [secondImageError, setSecondImageError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        heading: 'Meet Our Specialist',
        description: 'Our experienced specialists are committed to delivering personalized beauty and wellness treatments. From facials to massages, each session is tailored to your needs for exceptional results. Trust our experts to help you look and feel your best!',
        specialist1: {
            name: "Melisa Lauren",
            whatsapplink: "",
            facebooklink: "",
            instagramlink: "",
        },
        specialist2: {
            name: "Kate Amanda",
            whatsapplink: "",
            facebooklink: "",
            instagramlink: "",
        }
    });

    // const [isEnglish, setIsEnglish] = useState(true);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const router = useRouter();

    const handleCancelClick = () => {
        router.push("/staticpages/about");
    };

    const handleSaveClick = () => {
        router.push("/staticpages/about");
    };


    const user = useSelector((state: any) => state?.auth.user);
    const filteredPermissions = user?.roles?.[0]?.permissions?.filter(
        (permission: any) => permission.meta.pivot_module_id === 90
    );

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link href="/staticpages/about" className="font-['Raleway'] rtl:font-medium rtl:font-['Tajawal'] text-lg font-semibold text-[#1bd9bf] hover:underline dark:text-white-light">
                        {t("Specialists")}
                    </Link>
                </li>
                <li className="font-['Raleway'] rtl:font-['Tajawal'] text-lg font-normal text-[#727272] before:content-['/'] dark:text-white-light ltr:before:mr-2 rtl:before:ml-2">
                    <span>{t("Edit")}</span>
                </li>
            </ul>
            <div className="pt-5">
                <div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
                    <div className="flex flex-col gap-6 lg:col-span-3">
                        <div className="panel">
                            <div className="mb-5">
                                <h5 className="font-['Hermann'] rtl:font-medium rtl:font-['Tajawal'] text-2xl font-bold uppercase text-[#012d22] dark:text-white-light">{t("Edit Specialists Section")}</h5>
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
                                    <div className="grid grid-cols-1 gap-6">
                                        {/* {isEnglish ? ( */}
                                        <>
                                            {/* English Fields */}
                                            <InputField
                                                label={t("Heading (English)")?.toString()}
                                                name="heading_en"
                                                type="text"
                                                placeholder={t("Enter Heading")?.toString()}
                                                defaultValue={formData.heading}
                                                onChange={handleInputChange}
                                            />

                                            <InputField
                                                label={t("Description (English)")?.toString()}
                                                name="description_en"
                                                type="textarea"
                                                placeholder={t('Enter Description')?.toString()}
                                                defaultValue={formData.description}
                                                rows={5}
                                                onChange={handleInputChange}
                                            />
                                        </>
                                        {/* ) : ( */}
                                        <>
                                            {/* Arabic Fields */}
                                            <InputField
                                                label={t("Heading (Arabic)")?.toString()}
                                                name="heading_ar"
                                                type="text"
                                                placeholder={t("Enter Heading")?.toString()}
                                                defaultValue={formData.heading}
                                                onChange={handleInputChange}
                                            />

                                            <InputField
                                                label={t("Description (Arabic)")?.toString()}
                                                name="description_ar"
                                                type="textarea"
                                                placeholder={t('Enter Description')?.toString()}
                                                defaultValue={formData.description}
                                                rows={5}
                                                onChange={handleInputChange}
                                            />
                                        </>
                                        {/* )} */}

                                        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                                            <div className='space-y-4'>
                                                <h2 className="font-['Raleway'] rtl:font-['Tajawal'] rtl:font-medium text-lg font-semibold text-[#012d22] dark:text-white-light">
                                                    {t("Specialist 1")}
                                                </h2>
                                                <div className='space-y-5'>
                                                    {/* {isEnglish ? ( */}
                                                    <>
                                                        <InputField
                                                            label={t("Specialist Name (English)")?.toString()}
                                                            name="specialistName1_en"
                                                            type="text"
                                                            placeholder={t("Enter Specialist Name")?.toString()}
                                                            defaultValue={formData.specialist1.name}
                                                            onChange={handleInputChange}
                                                        />
                                                    </>
                                                    {/* ) : ( */}
                                                    <>
                                                        <InputField
                                                            label={t("Specialist Name (Arabic)")?.toString()}
                                                            name="specialistName1_ar"
                                                            type="text"
                                                            placeholder={t("Enter Specialist Name")?.toString()}
                                                            defaultValue={formData.specialist1.name}
                                                            onChange={handleInputChange}
                                                        />
                                                    </>
                                                    {/* )} */}

                                                    <InputField
                                                        label={t("Whatsapp Link")?.toString()}
                                                        name="whatsapp1"
                                                        type="url"
                                                        placeholder="https://wa.me/1234567890"
                                                        defaultValue={formData.specialist1.whatsapplink}
                                                        onChange={handleInputChange}
                                                    />

                                                    <InputField
                                                        label={t("Facebook Link")?.toString()}
                                                        name="facebook1"
                                                        type="url"
                                                        placeholder="https://www.facebook.com"
                                                        defaultValue={formData.specialist1.facebooklink}
                                                        onChange={handleInputChange}
                                                    />

                                                    <InputField
                                                        label={t("Instagram Link")?.toString()}
                                                        name="instagram1"
                                                        type="url"
                                                        placeholder="https://www.instagram.com"
                                                        defaultValue={formData.specialist1.instagramlink}
                                                        onChange={handleInputChange}
                                                    />

                                                    <ImageUpload
                                                        label={t("Specialist Picture 1")?.toString()}
                                                        name="specialistPicture1"
                                                        accept="image/*"
                                                        maxFileSize="10 MB"
                                                        width={477}
                                                        height={400}
                                                        preview={firstImagePreview}
                                                        error={firstImageError}
                                                        setPreview={setFirstImagePreview}
                                                        setError={setFirstImageError}
                                                    />
                                                </div>
                                            </div>

                                            <div className='space-y-4'>
                                                <h2 className="font-['Raleway'] rtl:font-['Tajawal'] rtl:font-medium text-lg font-semibold text-[#012d22] dark:text-white-light">
                                                    {t("Specialist 2")}
                                                </h2>
                                                <div className='space-y-5'>
                                                    {/* {isEnglish ? ( */}
                                                    <>
                                                        <InputField
                                                            label={t("Specialist Name (English)")?.toString()}
                                                            name="specialistName2_en"
                                                            type="text"
                                                            placeholder={t("Enter Specialist Name")?.toString()}
                                                            defaultValue={formData.specialist2.name}
                                                            onChange={handleInputChange}
                                                        />
                                                    </>
                                                    {/* ) : ( */}
                                                    <>
                                                        <InputField
                                                            label={t("Specialist Name (Arabic)")?.toString()}
                                                            name="specialistName2_ar"
                                                            type="text"
                                                            placeholder={t("Enter Specialist Name")?.toString()}
                                                            defaultValue={formData.specialist2.name}
                                                            onChange={handleInputChange}
                                                        />
                                                    </>
                                                    {/* )} */}

                                                    <InputField
                                                        label={t("Whatsapp Link")?.toString()}
                                                        name="whatsapp2"
                                                        type="url"
                                                        placeholder="https://wa.me/1234567890"
                                                        defaultValue={formData.specialist2.whatsapplink}
                                                        onChange={handleInputChange}
                                                    />

                                                    <InputField
                                                        label={t("Facebook Link")?.toString()}
                                                        name="facebook2"
                                                        type="url"
                                                        placeholder="https://www.facebook.com"
                                                        defaultValue={formData.specialist2.facebooklink}
                                                        onChange={handleInputChange}
                                                    />

                                                    <InputField
                                                        label={t("Instagram Link")?.toString()}
                                                        name="instagram2"
                                                        type="url"
                                                        placeholder="https://www.instagram.com"
                                                        defaultValue={formData.specialist2.instagramlink}
                                                        onChange={handleInputChange}
                                                    />

                                                    <ImageUpload
                                                        label={t("Specialist Picture 2")?.toString()}
                                                        name="specialistPicture2"
                                                        accept="image/*"
                                                        maxFileSize="10 MB"
                                                        width={375}
                                                        height={413}
                                                        preview={secondImagePreview}
                                                        error={secondImageError}
                                                        setPreview={setSecondImagePreview}
                                                        setError={setSecondImageError}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {filteredPermissions?.[0].meta.pivot_update === 1 && (
                                            <Button
                                                text={t("Save")}
                                                onClick={handleSaveClick}
                                                bgColor="#012d22"
                                                textColor="#ffff"
                                            />
                                        )}
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

export default EditSpecialistContent;