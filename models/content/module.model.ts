import user_modules from "@/services/content/module.service"
import { useRouter } from 'next/router';


import { useQuery } from "react-query"
// get Modules
export const useModelModules = (data: any) => useQuery(['modules', data], () => user_modules.modules.all(data), {
    keepPreviousData: true
})


// get Module Steps
export const useModelModulesSteps = (data: any) => useQuery(['module_steps', data], () => user_modules.steps.all(data), {
    keepPreviousData: true
})

// get Sub Module

export const useModelSubModules = (data: any) => useQuery(['sub_modules', data], () => user_modules.sub_modules.all(data), {
    keepPreviousData: true,
    onError: (error:any) => {
    //    console.log(error.status)
    }
})


// use sub basess module 
export const useModelSubBasessModules = (data: any,enable=true,key = 'sub_basess_main') => useQuery([key, data], () => user_modules.sub_bases.all(data), {
    keepPreviousData: true,
    enabled:enable,
    onError: (error:any) => {
    //    console.log(error.status)
    }
})


// get Sub Module

export const useModelCoinfig = (data: any) => useQuery(['configs', data], () => user_modules.configs.all(data), {
    keepPreviousData: true,
    onError: (error:any) => {
    //    console.log(error.status)
    }
})



