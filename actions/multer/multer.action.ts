import { multer_service } from "@/services/multer/multer.service"
import { useMutation } from "react-query"

export const useMulterUploadAction = () => useMutation(multer_service.upload, {})

export const useMulterRemoveAction = () => useMutation(multer_service.remove, {})
