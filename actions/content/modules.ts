import user_services from "@/services/user.service"
import module_services from "@/services/content/module.service"
import { useMutation } from "react-query"

// Modules
export const useUpdatModuleAction = () => useMutation(module_services.modules.update, {})
export const useCreateModuleAction = () => useMutation(module_services.modules.create, {})
export const useDeleteModuleAction = () => useMutation(module_services.modules.delete, {})




// Module steps
export const useCreateModuleStepAction = () => useMutation(module_services.steps.create, {})
export const useUpdatModuleStepAction = () => useMutation(module_services.steps.update, {})

export const useDeleteModuleStepAction = () => useMutation(module_services.steps.delete, {})




// Module steps
export const useCreateSubModuleAction = () => useMutation(module_services.sub_modules.create, {})
export const useUpdatSubModuleAction = () => useMutation(module_services.sub_modules.update, {})

export const useDeleteSubModuleAction = () => useMutation(module_services.sub_modules.delete, {})


// subss bases modules 


export const useCreateSubBasessModuleAction = () => useMutation(module_services.sub_bases.create, {})
export const useUpdatSubBasessModuleAction = () => useMutation(module_services.sub_bases.update, {})

export const useDeleteSubBasessModuleAction = () => useMutation(module_services.sub_bases.delete, {})
