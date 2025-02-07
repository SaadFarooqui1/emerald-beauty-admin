import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';
import { setPageTitle } from '@/store/themeConfigSlice';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useModelGetNotificationById } from '@/models/notification.model';
import { useTranslation } from 'react-i18next';


const NotificationDetail = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Notification Create'));
    });
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;


    const id = router.query.id ? parseInt(router.query.id as string, 10) : undefined;
    const { data: notificationResponse, isLoading, isError, refetch } = useModelGetNotificationById(id);

    const notification = notificationResponse;




    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link href="/notificationsmanagement" className="font-['Raleway'] rtl:font-['Tajawal'] rtl:font-medium text-lg font-semibold text-[#1bd9bf] hover:underline dark:text-white-light">
                        {t("Notifications List")}
                    </Link>
                </li>
                <li className="font-['Raleway'] rtl:font-['Tajawal'] text-lg font-normal text-[#727272] before:content-['/'] dark:text-white-light ltr:before:mr-2 rtl:before:ml-2">
                    <span>{t("Notification Detail")}</span>
                </li>
            </ul>
            <div className="pt-5">
                <div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
                    <div className="flex flex-col gap-6 lg:col-span-3">
                        <div className="panel">
                            <div className="mb-5">
                                <h5 className="font-['Hermann'] rtl:font-['Tajawal'] rtl:font-medium text-2xl font-bold uppercase text-[#012d22] dark:text-white-light">{t("Notification Detail")}</h5>
                            </div>
                            <div className="mb-5">
                                <form className="space-y-5">
                                    <div className="grid grid-cols-1 gap-6">
                                        <div>
                                            <label htmlFor="title" className="font-['Raleway'] rtl:font-['Tajawal'] rtl:font-medium text-lg font-semibold text-[#012d22] dark:text-white-light">
                                                {t("Title")}
                                            </label>
                                            <input
                                                id="title"
                                                name='title'
                                                type="text"
                                                placeholder={t("Enter Title")?.toString()}
                                                value={notification?.title}
                                                className="form-input-lg form-input font-['Raleway'] rtl:font-['Tajawal'] text-base font-normal text-[#727272] focus:border-[#012d22] dark:focus:border-white-light"
                                                readOnly
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="notificationmessage" className="font-['Raleway'] rtl:font-['Tajawal'] rtl:font-medium text-lg font-semibold text-[#012d22] dark:text-white-light">
                                                {t("Notification Message")}
                                            </label>
                                            <textarea
                                                rows={5}
                                                className="form-textarea font-['Raleway'] rtl:font-['Tajawal'] text-base font-normal text-[#727272] focus:border-[#012d22] dark:focus:border-white-light"
                                                placeholder={t("Write the notification message content here")?.toString()}
                                                name="notificationmessage"
                                                readOnly
                                                value={notification?.body}
                                            >
                                            </textarea>
                                        </div>
                                        <div>
                                            <label htmlFor="recipientoptions" className="font-['Raleway'] rtl:font-['Tajawal'] rtl:font-medium text-lg font-semibold text-[#012d22] dark:text-white-light">
                                                {t("Recipient Options")}
                                            </label>
                                            <div className='flex flex-wrap items-center gap-5'>
                                                <label className="inline-flex">
                                                    <input type="radio" name="default_radio" className="form-radio text-[#1bd9bf]" checked={notification?.type === 1} />
                                                    <span className="text-[#727272] text-base font-normal font-['Raleway'] rtl:font-['Tajawal']">{t("All")}</span>
                                                </label>
                                                <label className="inline-flex">
                                                    <input type="radio" name="default_radio" className="form-radio text-[#1bd9bf]" checked={notification?.type === 4} />
                                                    <span className="text-[#727272] text-base font-normal font-['Raleway'] rtl:font-['Tajawal']">{t("Users")}</span>
                                                </label>
                                                <label className="inline-flex">
                                                    <input type="radio" name="default_radio" className="form-radio text-[#1bd9bf]" checked={notification?.type === 2} />
                                                    <span className="text-[#727272] text-base font-normal font-['Raleway'] rtl:font-['Tajawal']">{t("Freelancers")}</span>
                                                </label>
                                                <label className="inline-flex">
                                                    <input type="radio" name="default_radio" className="form-radio text-[#1bd9bf]" checked={notification?.type === 3} />
                                                    <span className="text-[#727272] text-base font-normal font-['Raleway'] rtl:font-['Tajawal']">{t("Employees")}</span>
                                                </label>

                                            </div>
                                        </div>
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
NotificationDetail.authenticate = true;
export default NotificationDetail;
