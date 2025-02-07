import { Api } from "@/constants/app";
import { GenSuccessResponseI, SuccessResponseI } from "@/types/types";
import multer_request from "../multer.request";
import { UploadedFile } from "@/types";

export const multer_service = {
    upload: (data: any): Promise<GenSuccessResponseI<Array<UploadedFile>>> => multer_request.post(Api.multer.upload, data),
    remove: (data: any): Promise<SuccessResponseI> => {
        const query = data.map((file: string) => `files[]=${encodeURIComponent(file)}`).join('&')
        return multer_request.delete(Api.multer.remove + `?${query}`)
    }

}
