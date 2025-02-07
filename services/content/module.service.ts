import { Api } from '@/constants/app'
import request from '@/services/request'
import { SubBasesT } from '@/types'
import { ConfigType, GenSuccessResponseI, ModuleSetpType, ModuleType, Pagination, SubModuleType, SuccessResponseI } from '@/types/types'
const content = {
    modules: {
        all: (params?: any): Promise<Pagination<ModuleType>> => request.get(Api.users.modules.get_all_modules, { params }),
        create: (data: any): Promise<SuccessResponseI> => request.post(Api.users.modules.create, data),
        update: (data: any): Promise<SuccessResponseI> => request.put(Api.users.modules.update, data),
        delete: (data: any): Promise<SuccessResponseI> => request.delete(Api.users.modules.delete, { data }),
    },
    steps: {
        all: (params?: any): Promise<Pagination<ModuleSetpType>> => request.get(Api.users.steps.get_all_module_steps, { params }),
        create: (data: any): Promise<SuccessResponseI> => request.post(Api.users.steps.create, data),
        update: (data: any): Promise<SuccessResponseI> => request.put(Api.users.steps.update, data),
        delete: (data: any): Promise<SuccessResponseI> => request.delete(Api.users.steps.delete, { data }),
    },

    sub_modules: {
        all: (params?: any): Promise<Pagination<SubModuleType>> => request.get(Api.users.sub_modules.get_all_sub_modules, { params }),
        create: (data: any): Promise<SuccessResponseI> => request.post(Api.users.sub_modules.create, data),
        update: (data: any): Promise<SuccessResponseI> => request.put(Api.users.sub_modules.update, data),
        delete: (data: any): Promise<SuccessResponseI> => request.delete(Api.users.sub_modules.delete, { data }),
    },

    sub_bases: {
        all: (params?: any): Promise<Pagination<SubBasesT>> => request.get(Api.users.sub_bases.get_all_sub_bases_modules, { params }),
        create: (data: any): Promise<SuccessResponseI> => request.post(Api.users.sub_bases.create, data),
        update: (data: any): Promise<SuccessResponseI> => request.put(Api.users.sub_bases.update, data),
        delete: (data: any): Promise<SuccessResponseI> => request.delete(Api.users.sub_bases.delete, { data }),
    },

    configs: {
        all: (params?: any): Promise<ConfigType> => request.get(Api.users.configs.get_all_configs, { params }),
    },
}


export default content