import {body} from 'express-validator'

export const createContactValidators = [
    body('name')
        .notEmpty().withMessage('The name field cannot be empty')
        .isString().withMessage('The name field must be a string'),
    body('phone')
        .notEmpty().withMessage('The phone field cannot be empty')
        .isString().withMessage('The phone field must be a string')
        .matches(/^\(\d{2}\) \d{4,5}-\d{4}$/).withMessage('The phone field has a invalid format')
]

export const updateContactValidators = [
    body('name')
        .notEmpty().withMessage('The name field cannot be empty')
        .isString().withMessage('The name field must be a string'),
    body('phone')
        .notEmpty().withMessage('The phone field cannot be empty')
        .isString().withMessage('The phone field must be a string')
        .matches(/^\(\d{2}\) \d{4,5}-\d{4}$/).withMessage('The phone field has a invalid format')
]