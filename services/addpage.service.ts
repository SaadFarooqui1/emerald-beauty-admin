import { Api } from '@/constants/app';
import request from '@/services/request';
import { StaticPageI } from '@/types/page_types';
import { SuccessResponseI } from '@/types/types';

const add_page_services = {
    get_by_slug: (slug: string): Promise<StaticPageI> => request.get(`${Api.add_page.get_by_slug}/${slug}`),

    create: (data: any): Promise<SuccessResponseI> => request.post(Api.add_page.create, data),
};

export default add_page_services;
