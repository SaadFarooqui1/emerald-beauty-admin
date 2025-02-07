import { useTranslation } from "react-i18next";

const Footer = () => {
    const { t } = useTranslation();

    return (
        <div className="p-6 pt-0 mt-auto text-center rtl:font-['Tajawal'] dark:text-white-dark ltr:sm:text-left rtl:sm:text-right">© {new Date().getFullYear()}. {t("Emerald-Beauty All rights reserved")}.</div>
    );
};

export default Footer;
