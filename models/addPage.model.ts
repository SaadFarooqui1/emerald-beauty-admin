import add_page_services from '@/services/addpage.service';

import { useMutation, useQuery } from 'react-query';

export const useModelGetPageBySlug = (slug?: string) =>
    useQuery(['page_by_slug', slug], () => add_page_services.get_by_slug(slug!), {
        keepPreviousData: true,
        enabled: !!slug, // Run query only if `id` is truthy
    });

export const useCreatePageAction = () => useMutation(add_page_services.create, {});
