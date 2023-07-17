import {model, Schema} from 'mongoose'
import messageSchema from './Message'

const contactSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        messages: [messageSchema] 
    }
)

export const ContactModel = model("Contact", contactSchema)