import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FaFileAlt } from 'react-icons/fa'; // Icon for the document section
import InputField from '../../components/InputField';
import { useModelGetLeaveById } from '@/models/leave.model';
import { useTranslation } from 'react-i18next';

const LeaveManagementDetail = () => {
    const router = useRouter();
    const { id } = router.query;
    const { t } = useTranslation();

    // Form data state
    const [formData, setFormData] = useState({
        name: 'Lisa Green',
        leaveType: 'Sick Leave',
        date: '30 Jan 2024 - 30 Jan 2024',
        reason: 'Experience top-notch mens grooming services with our expert haircare treatments. Our skilled stylists will provide you with a personalized haircut tailored to your unique style and preferences. Say goodbye to bad hair days and hello to a fresh new look with our professional haircare services.',
        document: null,
    });

    const { data, isLoading, isError, refetch } = useModelGetLeaveById(id, {
        relations: ['user', 'documents'],
    });

    return (
        <div>
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2 md:gap-0">
                <ul className="flex space-x-2 rtl:space-x-reverse">
                    <li>
                        <Link href="/leaves/leavemanagement" className="font-['Raleway'] rtl:font-['Tajawal'] rtl:font-medium text-lg font-semibold text-[#1bd9bf] hover:underline dark:text-white-light">
                            {t("Leave List")}
                        </Link>
                    </li>
                    <li className="font-['Raleway'] rtl:font-['Tajawal'] text-lg font-normal text-[#727272] before:content-['/'] dark:text-white-light ltr:before:mr-2 rtl:before:ml-2">
                        <span>{t("Leave Information")}</span>
                    </li>
                </ul>
            </div>

            <div className="panel mt-6">
                <h5 className="text-xl font-bold text-[#012d22] font-['Hermann'] rtl:font-['Tajawal'] rtl:font-medium uppercase dark:text-white-light mb-5">{t("Leave Information")}</h5>

                {/* Form */}
                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Name and Leave Type */}
                        <div className="col-lg-6">
                            <InputField
                                name='name'
                                id="name"
                                label={t("Name")?.toString()}
                                placeholder={t("Enter Name")?.toString()}
                                // defaultValue={`${data?.user.first_name} ${data?.user.last_name}`}
                                value={`${data?.user.first_name} ${data?.user.last_name}`}
                                type="text"
                                readOnly
                            />
                        </div>
                        <div className="col-lg-6">
                            <InputField
                                name='leave_type_text'
                                id="leave_type_text"
                                label={t("Leave Type")?.toString()}
                                placeholder={t("Enter Leave Type")?.toString()}
                                value={data?.leave_type_text}
                                type="text"
                                readOnly
                            />
                        </div>
                    </div>

                    {/* Date */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-1">
                            <InputField
                                name='start_date'
                                label={t("Start Date")?.toString()}
                                type="date"
                                value={data?.start_date}
                                readOnly
                            />
                        </div>

                        <div className="col-span-1">
                            <InputField
                                name='end_date'
                                label={t("End Date")?.toString()}
                                type="date"
                                value={data?.end_date}
                                readOnly
                            />
                        </div>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                        <div className="col-span-1">
                            <label htmlFor="reason" className="font-['Raleway'] text-lg font-semibold rtl:font-['Tajawal'] rtl:font-medium text-[#012d22] dark:text-white-light">{t("Reason")}</label>
                            <textarea
                                id="reason"
                                name="reason"
                                value={data?.reason}
                                className="form-input mt-1 block w-full text-[#727272] border-gray-300 rounded-md shadow-sm rtl:font-['Tajawal'] rtl:font-normal"
                                placeholder={t("Enter Reason")?.toString()}
                                rows={5}
                                readOnly
                            />
                        </div>
                    </div>


                    {/* Document Section */}
                    <div className="col-lg-12">
                        <label className="font-['Raleway'] text-lg font-semibold rtl:font-['Tajawal'] rtl:font-medium text-[#012d22] dark:text-white-light">{t("Document")}</label>
                        <a className="flex items-center space-x-4" href={data?.documents[0]?.mediaUrl} target='_blank' rel='noreferrer'>
                            <div className="gap-2 text-center shadow-md p-8">
                                <div className='bg-[#d2f5f1] p-5 rounded-md inline-block'>
                                   
                                        {/* <input type="hidden" value={data?.documents[0]?.mediaUrl} /> */}
                                        <FaFileAlt className='text-[#012d22] dark:text-white-light size-7' />
                                   
                                </div>
                                <div>
                                    <p className="text-[#012d22] text-base font-medium font-['Raleway'] rtl:font-['Tajawal']"><b>{t("Leave Approval Document")}</b></p>
                                </div>
                            </div>
                        </a>
                    </div>
                </form>

            </div>
        </div>
    );
};
LeaveManagementDetail.authenticate = true;
export default LeaveManagementDetail;
