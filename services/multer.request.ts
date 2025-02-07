import { MulterEndPoint } from "@/constants/app";
import { ErrorResponse } from "@/types/account_types";
import { ErrorToast } from "@/utils/helper";
import axios, { AxiosError } from "axios";
import { deleteCookie, getCookie } from "cookies-next";

const multer_request = axios.create({
    baseURL: MulterEndPoint,
    timeout: 16000,
});

multer_request.interceptors.request.use(
    (config) => {
        const _ca = getCookie("_ca");
        // const locale = i18n.language;
        // config.headers.Authorization =
        config.headers = {
            // lang: getCookie('lang') || DEFAULT_LANGUAGE,
            Authorization: `Bearer ${_ca}`,
            ...config.params,
        };
        return config;
    },

    (error) => errorHandler(error)
);

function errorHandler(error: AxiosError<ErrorResponse>) {
    if (error?.response) {
        if (error?.response?.status === 400) {
            error?.response?.data?.errors.forEach((err: string) => {
                ErrorToast(err);
            });
        } else if (error?.response?.status === 401) {
            // removeCookie("user");
            deleteCookie("_ca");
            window.location.replace("/auth/signin");
        }
    }
    return Promise.reject(error.response);
}

multer_request.interceptors.response.use(
    (response) => response.data,
    errorHandler
);

export default multer_request;
