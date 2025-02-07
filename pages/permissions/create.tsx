import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';
import { setPageTitle } from '@/store/themeConfigSlice';
import { useEffect, useState } from 'react';


const Edit = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Create Permissions'));
    });
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link href="/permissions" className="font-['Raleway'] text-lg font-semibold text-[#1bd9bf] hover:underline dark:text-white-light">
                        Permission List
                    </Link>
                </li>
                <li className="font-['Raleway'] text-lg font-normal text-[#727272] before:content-['/'] dark:text-white-light ltr:before:mr-2 rtl:before:ml-2">
                    <span>Create</span>
                </li>
            </ul>
            <div className="pt-5">
                <div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
                    <div className="flex flex-col gap-6 lg:col-span-2">
                        <div className="panel">
                            <div className="mb-5">
                                <h5 className="font-['Hermann'] text-2xl font-bold uppercase text-[#012d22] dark:text-white-light">Create Permission</h5>
                            </div>
                            <div className="mb-5">
                                <form className="space-y-5">
                                    <div className="grid grid-cols-1 gap-5">
                                        <div>
                                            <label htmlFor="role" className="font-['Raleway'] text-lg font-semibold text-[#012d22] dark:text-white-light">
                                                Role
                                            </label>
                                            <select
                                                className="form-select-lg form-select font-['Raleway'] text-base font-normal text-[#727272] focus:border-[#012d22] dark:focus:border-white-light"
                                                id="role"
                                                name="role"
                                            >
                                                <option disabled>Choose Role</option>
                                                <option value="Moderator">Moderator</option>
                                                <option value="ContentEditor">Content Editor</option>
                                                <option value="AccountManager">Account Manager</option>
                                                <option value="SocialMediaLead">Social Media Lead</option>
                                                <option value="MarketingManager">Marketing Manager</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="font-['Raleway'] text-lg font-semibold text-[#012d22] dark:text-white-light">
                                                Permissions
                                            </label>  
                                        </div>
                                        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
                                            <div className='flex flex-col gap-3'>
                                                <label htmlFor='usermanagement' className="font-['Raleway'] text-base font-semibold text-[#012d22] dark:text-white-light">
                                                    User Management	
                                                </label>
                                                <div className='flex items-center gap-5'>
                                                    <label className="inline-flex">
                                                        <input type="checkbox" className="form-checkbox text-[#1bd9bf]" defaultChecked/>
                                                        <span className="text-justify text-[#727272] text-sm font-normal font-['Raleway']">View</span>
                                                    </label>
                                                    <label className="inline-flex">
                                                        <input type="checkbox" className="form-checkbox text-[#1bd9bf]" defaultChecked/>
                                                        <span className="text-justify text-[#727272] text-sm font-normal font-['Raleway']">Edit</span>
                                                    </label>
                                                    <label className="inline-flex">
                                                        <input type="checkbox" className="form-checkbox text-[#1bd9bf]" />
                                                        <span className="text-justify text-[#727272] text-sm font-normal font-['Raleway']">Delete</span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className='flex flex-col gap-3'>
                                                <label htmlFor='employeemanagement' className="font-['Raleway'] text-base font-semibold text-[#012d22] dark:text-white-light">
                                                    Employee Management		
                                                </label>
                                                <div className='flex items-center gap-5'>
                                                    <label className="inline-flex">
                                                        <input type="checkbox" className="form-checkbox text-[#1bd9bf]" defaultChecked/>
                                                        <span className="text-justify text-[#727272] text-sm font-normal font-['Raleway']">View</span>
                                                    </label>
                                                    <label className="inline-flex">
                                                        <input type="checkbox" className="form-checkbox text-[#1bd9bf]" defaultChecked/>
                                                        <span className="text-justify text-[#727272] text-sm font-normal font-['Raleway']">Edit</span>
                                                    </label>
                                                    <label className="inline-flex">
                                                        <input type="checkbox" className="form-checkbox text-[#1bd9bf]" />
                                                        <span className="text-justify text-[#727272] text-sm font-normal font-['Raleway']">Delete</span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className='flex flex-col gap-3'>
                                                <label htmlFor='freelancermanagement' className="font-['Raleway'] text-base font-semibold text-[#012d22] dark:text-white-light">
                                                    Freelancer Management		
                                                </label>
                                                <div className='flex items-center gap-5'>
                                                    <label className="inline-flex">
                                                        <input type="checkbox" className="form-checkbox text-[#1bd9bf]" defaultChecked/>
                                                        <span className="text-justify text-[#727272] text-sm font-normal font-['Raleway']">View</span>
                                                    </label>
                                                    <label className="inline-flex">
                                                        <input type="checkbox" className="form-checkbox text-[#1bd9bf]" defaultChecked/>
                                                        <span className="text-justify text-[#727272] text-sm font-normal font-['Raleway']">Edit</span>
                                                    </label>
                                                    <label className="inline-flex">
                                                        <input type="checkbox" className="form-checkbox text-[#1bd9bf]" />
                                                        <span className="text-justify text-[#727272] text-sm font-normal font-['Raleway']">Delete</span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className='flex flex-col gap-3'>
                                                <label htmlFor='categories' className="font-['Raleway'] text-base font-semibold text-[#012d22] dark:text-white-light">
                                                    Categories & Subcategories Management			
                                                </label>
                                                <div className='flex items-center gap-5'>
                                                    <label className="inline-flex">
                                                        <input type="checkbox" className="form-checkbox text-[#1bd9bf]" defaultChecked/>
                                                        <span className="text-justify text-[#727272] text-sm font-normal font-['Raleway']">View</span>
                                                    </label>
                                                    <label className="inline-flex">
                                                        <input type="checkbox" className="form-checkbox text-[#1bd9bf]" defaultChecked/>
                                                        <span className="text-justify text-[#727272] text-sm font-normal font-['Raleway']">Edit</span>
                                                    </label>
                                                    <label className="inline-flex">
                                                        <input type="checkbox" className="form-checkbox text-[#1bd9bf]" defaultChecked/>
                                                        <span className="text-justify text-[#727272] text-sm font-normal font-['Raleway']">Delete</span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className='flex flex-col gap-3'>
                                                <label htmlFor='servicesmanagement' className="font-['Raleway'] text-base font-semibold text-[#012d22] dark:text-white-light">
                                                    Services Management		
                                                </label>
                                                <div className='flex items-center gap-5'>
                                                    <label className="inline-flex">
                                                        <input type="checkbox" className="form-checkbox text-[#1bd9bf]" defaultChecked/>
                                                        <span className="text-justify text-[#727272] text-sm font-normal font-['Raleway']">View</span>
                                                    </label>
                                                    <label className="inline-flex">
                                                        <input type="checkbox" className="form-checkbox text-[#1bd9bf]" />
                                                        <span className="text-justify text-[#727272] text-sm font-normal font-['Raleway']">Edit</span>
                                                    </label>
                                                    <label className="inline-flex">
                                                        <input type="checkbox" className="form-checkbox text-[#1bd9bf]" />
                                                        <span className="text-justify text-[#727272] text-sm font-normal font-['Raleway']">Delete</span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className='flex flex-col gap-3'>
                                                <label htmlFor='bookingmanagement' className="font-['Raleway'] text-base font-semibold text-[#012d22] dark:text-white-light">
                                                    Bookings Management		
                                                </label>
                                                <div className='flex items-center gap-5'>
                                                    <label className="inline-flex">
                                                        <input type="checkbox" className="form-checkbox text-[#1bd9bf]" defaultChecked/>
                                                        <span className="text-justify text-[#727272] text-sm font-normal font-['Raleway']">View</span>
                                                    </label>
                                                    <label className="inline-flex">
                                                        <input type="checkbox" className="form-checkbox text-[#1bd9bf]" />
                                                        <span className="text-justify text-[#727272] text-sm font-normal font-['Raleway']">Edit</span>
                                                    </label>
                                                    <label className="inline-flex">
                                                        <input type="checkbox" className="form-checkbox text-[#1bd9bf]" />
                                                        <span className="text-justify text-[#727272] text-sm font-normal font-['Raleway']">Delete</span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className='flex flex-col gap-3'>
                                                <label htmlFor='couponsanddiscounts' className="font-['Raleway'] text-base font-semibold text-[#012d22] dark:text-white-light">
                                                    Coupons and Discounts Management		
                                                </label>
                                                <div className='flex items-center gap-5'>
                                                    <label className="inline-flex">
                                                        <input type="checkbox" className="form-checkbox text-[#1bd9bf]" defaultChecked/>
                                                        <span className="text-justify text-[#727272] text-sm font-normal font-['Raleway']">View</span>
                                                    </label>
                                                    <label className="inline-flex">
                                                        <input type="checkbox" className="form-checkbox text-[#1bd9bf]" />
                                                        <span className="text-justify text-[#727272] text-sm font-normal font-['Raleway']">Edit</span>
                                                    </label>
                                                    <label className="inline-flex">
                                                        <input type="checkbox" className="form-checkbox text-[#1bd9bf]" />
                                                        <span className="text-justify text-[#727272] text-sm font-normal font-['Raleway']">Delete</span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className='flex flex-col gap-3'>
                                                <label htmlFor='notificationsmanagement' className="font-['Raleway'] text-base font-semibold text-[#012d22] dark:text-white-light">
                                                    Notifications Management	
                                                </label>
                                                <div className='flex items-center gap-5'>
                                                    <label className="inline-flex">
                                                        <input type="checkbox" className="form-checkbox text-[#1bd9bf]" defaultChecked/>
                                                        <span className="text-justify text-[#727272] text-sm font-normal font-['Raleway']">View</span>
                                                    </label>
                                                    <label className="inline-flex">
                                                        <input type="checkbox" className="form-checkbox text-[#1bd9bf]" defaultChecked/>
                                                        <span className="text-justify text-[#727272] text-sm font-normal font-['Raleway']">Edit</span>
                                                    </label>
                                                    <label className="inline-flex">
                                                        <input type="checkbox" className="form-checkbox text-[#1bd9bf]" />
                                                        <span className="text-justify text-[#727272] text-sm font-normal font-['Raleway']">Delete</span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className='flex flex-col gap-3'>
                                                <label htmlFor='staticpagesmanagement' className="font-['Raleway'] text-base font-semibold text-[#012d22] dark:text-white-light">
                                                    Static Pages Management		
                                                </label>
                                                <div className='flex items-center gap-5'>
                                                    <label className="inline-flex">
                                                        <input type="checkbox" className="form-checkbox text-[#1bd9bf]" defaultChecked/>
                                                        <span className="text-justify text-[#727272] text-sm font-normal font-['Raleway']">View</span>
                                                    </label>
                                                    <label className="inline-flex">
                                                        <input type="checkbox" className="form-checkbox text-[#1bd9bf]" defaultChecked/>
                                                        <span className="text-justify text-[#727272] text-sm font-normal font-['Raleway']">Edit</span>
                                                    </label>
                                                    <label className="inline-flex">
                                                        <input type="checkbox" className="form-checkbox text-[#1bd9bf]" />
                                                        <span className="text-justify text-[#727272] text-sm font-normal font-['Raleway']">Delete</span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className='flex flex-col gap-3'>
                                                <label htmlFor='socialmediamanagement' className="font-['Raleway'] text-base font-semibold text-[#012d22] dark:text-white-light">
                                                    Social Media Links Management			
                                                </label>
                                                <div className='flex items-center gap-5'>
                                                    <label className="inline-flex">
                                                        <input type="checkbox" className="form-checkbox text-[#1bd9bf]" />
                                                        <span className="text-justify text-[#727272] text-sm font-normal font-['Raleway']">View</span>
                                                    </label>
                                                    <label className="inline-flex">
                                                        <input type="checkbox" className="form-checkbox text-[#1bd9bf]" />
                                                        <span className="text-justify text-[#727272] text-sm font-normal font-['Raleway']">Edit</span>
                                                    </label>
                                                    <label className="inline-flex">
                                                        <input type="checkbox" className="form-checkbox text-[#1bd9bf]" />
                                                        <span className="text-justify text-[#727272] text-sm font-normal font-['Raleway']">Delete</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button type="button" className="btn btn-lg font-['Raleway] rounded-full bg-[#012d22] px-8 py-3 text-base font-semibold text-white shadow-none">
                                            Save
                                        </button>
                                        <button type="button" className="btn btn-lg font-['Raleway] rounded-full bg-[#1bd9bf] px-8 py-3 text-base font-semibold text-[#012d22] shadow-none">
                                            Cancel
                                        </button>
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
