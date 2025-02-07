import { EndPoint } from '@/constants/app';
import { ErrorResponse } from '@/types/account_types';
import { ErrorToast } from '@/utils/helper';
// import { ErrorToast } from '@/utils/helper'
import axios, { AxiosError } from 'axios';
import { deleteCookie, getCookie } from 'cookies-next';

const request = axios.create({
    baseURL: EndPoint,
    timeout: 16000,
});

request.interceptors.request.use(
    (config) => {
        const _ca = getCookie('_ca');
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
            // error?.response?.data?.errors.forEach((err: string) => {
            //     // ErrorToast(err)
            // });
            ErrorToast(error?.response?.data?.message);

        } else if (error?.response?.status === 401) {
            // removeCookie("user");
            deleteCookie('_ca');
            window.location.replace('/auth/sign-in')
        } else if (error?.response?.status === 403) {
            
           console.log(error?.response?.data?.message); 

        } else {
            ErrorToast(error?.response?.data?.message);
        }
    }
    return Promise.reject(error.response);
}

request.interceptors.response.use((response) => response.data.data, errorHandler);

export default request;
