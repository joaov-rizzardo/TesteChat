import {body} from 'express-validator'

export const sendMessageValidators = [
    body('type')
        .notEmpty().withMessage('The type field cannot be empty')
        .isString().withMessage('The type field must be a string')
        .isIn(['file', 'text']).withMessage('The type field has a invalid value'),
    body('content')
        .isString().withMessage('The content field must be a string')
        .custom((value, {req}) => {
            if(req.body.image === "" || req.body.type === 'file'){
                return value !== ""
            }
            return true
        }).withMessage('The content field cannot be empty'),
    body('image').optional()
        .notEmpty().withMessage('The image field cannot be empty')
        .isString().withMessage('The image field must be a string')
]
