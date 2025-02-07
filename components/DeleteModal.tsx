import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import Image from 'next/image';
import Alert from 'public/assets/images/alert.svg';

interface DeleteModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    serviceName: string;
    description: string;
    deleteRecord?: any
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, setIsOpen, serviceName, description,deleteRecord = () => {} }) => {
    return (
        <>
            <div className="mb-5">
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog as="div" open={isOpen} onClose={() => setIsOpen(false)}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0" />
                        </Transition.Child>
                        <div className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
                            <div className="flex min-h-screen items-center justify-center px-4">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel as="div" className="panel my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                        <div className="p-5">
                                            <div className="flex flex-col items-center gap-5">
                                                <div>
                                                    <Image src={Alert} alt="alert" />
                                                </div>
                                                <div className='flex flex-col items-center gap-3'>
                                                    <h5 className="text-center text-[#012d22] text-2xl font-bold font-['Hermann'] uppercase dark:text-white-light">{serviceName}</h5>
                                                    <p className="text-justify text-[#727272] text-lg font-normal font-['Raleway']">
                                                        {description}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="mt-8 flex items-center justify-center">
                                                <button type="button" className="btn rounded-full bg-[#012d22] text-white text-base font-semibold font-['Raleway'] shadow-none border-[#012d22]" onClick={() => deleteRecord()}>
                                                    Yes, Delete
                                                </button>
                                                <button type="button" className="btn ltr:ml-2 rtl:mr-2 sm:ltr:ml-4 sm:rtl:mr-4 rounded-full bg-[#1bd9bf] text-[#012d22] shadow-none text-base font-semibold font-['Raleway'] border-[#1bd9bf]" onClick={() => setIsOpen(false)}>
                                                    No, Keep
                                                </button>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>
        </>
    );
};

export default DeleteModal;
