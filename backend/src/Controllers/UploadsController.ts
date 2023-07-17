import { Request, Response } from "express";
import multer from "multer";
import path from "path";
import fs from "fs"

export async function uploadFile(req: Request, res: Response){
    try {
        return res.status(200).send(req.file)
    }catch(error: any){
        return res.status(500).send({
            message: 'An internal server error ocurred'
        })
    }
}

export async function sendFile(req: Request, res: Response){
    const filename = req.params.filename
    try {
        const filepath = path.resolve(`./src/Uploads/${filename}`)
        if(!fs.existsSync(filepath)){
            return res.status(404).send({
                message: 'The requested file not exists'
            })
        }
        return res.status(200).sendFile(filepath)
    }catch(error: any){
        return res.status(500).send({
            message: 'An internal server error ocurred'
        })
    }
}

export function getMulterUploader(){
    const upload = multer({
        dest: path.resolve('./src/Uploads'),
        storage: multer.diskStorage({
          destination: (req, file, cb) => {
            cb(null, path.resolve('./src/Uploads'));
          },
          filename: (req, file, cb) => {
            const ext = path.extname(file.originalname)
            cb(null, Date.now() + ext)
          }
        })
      })
      return upload
}