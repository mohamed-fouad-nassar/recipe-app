import { upload } from "../config/multer";

export const uploadSingle = (fieldName: string) => upload.single(fieldName);
