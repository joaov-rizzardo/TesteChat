import { Router } from "express";
import { getMulterUploader, sendFile, uploadFile } from "../Controllers/UploadsController";

const uploadsRouter = Router()
const upload = getMulterUploader()
uploadsRouter.post('/', upload.single('file'), uploadFile)
uploadsRouter.get('/:filename', sendFile)
export default uploadsRouter