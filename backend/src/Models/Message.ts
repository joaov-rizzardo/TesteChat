import {model, Schema} from 'mongoose'

const messageSchema = new Schema(
    {
        type: {
            type: String,
            enum: ['file', 'text'],
            required: true
        },
        content: {
            type: String
        },
        image: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

export default messageSchema
