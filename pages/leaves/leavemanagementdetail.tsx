import { useState } from 'react';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '@/store/themeConfigSlice';
import { useRouter } from 'next/navigation';
import DeleteModal from '@/components/DeleteModal';
import Link from 'next/link';
import { FaFileAlt } from 'react-icons/fa'; // Icon for the document section
import InputField from '../components/InputField';

const LeaveManagementDetail = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });

    const [deleteModal, setDeleteModal] = useState(false);

    // Form data state
    const [formData, setFormData] = useState({
        name: 'Lisa Green',
        leaveType: 'Sick Leave',
        start_date: '30 Jan 2024',
        end_date: '31 Jan 2024',
        reason: 'Experience top-notch mens grooming services with our expert haircare treatments. Our skilled stylists will provide you with a personalized haircut tailored to your unique style and preferences. Say goodbye to bad hair days and hello to a fresh new look with our professional haircare services.',
        document: null,
    });

    return (
        <div>
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2 md:gap-0">
                <ul className="flex space-x-2 rtl:space-x-reverse">
                    <li>
                        <Link href="/leaves/leavemanagement" className="font-['Raleway'] text-lg font-semibold text-[#1bd9bf] hover:underline dark:text-white-light">
                            Leave List
                        </Link>
                    </li>
                    <li className="font-['Raleway'] text-lg font-normal text-[#727272] before:content-['/'] dark:text-white-light ltr:before:mr-2 rtl:before:ml-2">
                        <span>Leave Information</span>
                    </li>
                </ul>
            </div>

            <div className="panel mt-6">
                <h5 className="text-xl font-bold text-[#012d22] font-['Hermann'] uppercase dark:text-white-light mb-5">Leave Information</h5>

                {/* Form */}
                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Name and Leave Type */}
                        <div className="col-lg-6">
                            <InputField
                                name='name'
                                id="name"
                                label="Name"
                                placeholder="Enter Name"
                                defaultValue={formData.name}
                                type="text"
                                readOnly
                            />
                        </div>
                        <div className="col-lg-6">
                            <InputField
                                name='leaveType'
                                id="leaveType"
                                label="Leave Type"
                                placeholder="Enter Leave Type"
                                defaultValue={formData.leaveType}
                                type="text"
                                readOnly
                            />
                        </div>
                    </div>

                    {/* Date */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-1">
                            <InputField
                                name='date'
                                label="Start Date"
                                type="text"
                                defaultValue={formData.start_date}
                                readOnly
                            />
                        </div>

                        <div className="col-span-1">
                            <InputField
                                name='enddate'
                                label="End Date"
                                type="text"
                                defaultValue={formData.end_date}
                                readOnly
                            />
                        </div>
                        
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                        <div className="col-span-1">
                            <label htmlFor="reason" className="font-['Raleway'] text-lg font-semibold text-[#012d22] dark:text-white-light">Reason</label>
                            <textarea
                                id="reason"
                                name="reason"
                                value={formData.reason}
                                className="form-input mt-1 block w-full border-gray-300 text-[#727272] rounded-md shadow-sm"
                                placeholder="Enter Reason"
                                rows={5} 
                                readOnly
                            />
                        </div>
                    </div>
                    

                    {/* Document Section */}
                    <div className="col-lg-12">
                        <label className="font-['Raleway'] text-lg font-semibold text-[#012d22] dark:text-white-light">Document</label>
                        <div className="flex items-center space-x-4">
                            <div className="gap-2 text-center shadow-md p-8">
                                <div className='bg-[#d2f5f1] p-5 rounded-md inline-block'>
                                    <FaFileAlt className='text-[#012d22] dark:text-white-light size-7' />
                                </div>
                                <div>
                                    <p className="text-[#012d22] text-base font-medium font-['Raleway']"><b>Leave Approval Document</b></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default LeaveManagementDetail;
