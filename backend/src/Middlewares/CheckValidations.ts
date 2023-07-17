import e, {Request, Response, NextFunction} from 'express'
import { validationResult } from 'express-validator'

export default function checkExpressValidations(req: Request, res: Response, next: NextFunction){
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).send({
            message: 'The request contain errors',
            errors: errors.array().map(error => error.msg)
        })
    }
    next()
}