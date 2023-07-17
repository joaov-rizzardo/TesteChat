import { ContactModel } from './../Models/Contact';
import fs from 'fs';
import { Request, Response } from "express";
import mongoose, { Model } from "mongoose";
import path from "path";

export async function sendMessage(req: Request, res: Response) {
    const contactId = req.params.contactId
    try {
        if (!mongoose.Types.ObjectId.isValid(contactId)) {
            return res.status(404).json({
                message: 'The request contain errors',
                errors: ['The informed contact not exists']
            })
        }
        const { contact, errors } = req.body.type === 'file' ? await sendAudioMessage({
            contactId: contactId,
            content: req.body.content
        }) : await sendTextMessage({
            contactId: contactId,
            content: req.body.content,
            image: req.body.image
        })
        if (contact === false) {
            return res.status(400).send({
                message: 'The request contain errors',
                errors: errors
            })
        }
        const lastMessage = contact?.messages[contact?.messages.length - 1]
        return res.status(201).send(lastMessage)
    } catch (error: any) {
        return res.status(500).send({
            message: 'An internal server error ocurred'
        })
    }
}

type sendMessageFunctionReturnType = {
    contact: false | (mongoose.Document<unknown, {}, {
        name: string;
        phone: string;
        messages: mongoose.Types.DocumentArray<{
            createdAt: NativeDate;
            updatedAt: NativeDate;
        } & {
            type: string;
            content?: string | undefined;
            image?: string | undefined;
        }>;
    }> & {
        name: string;
        phone: string;
        messages: mongoose.Types.DocumentArray<{
            createdAt: NativeDate;
            updatedAt: NativeDate;
        } & {
            type: string;
            content?: string | undefined;
            image?: string | undefined;
        }>;
    } & {
    }) | null
    errors: string[]
}

type sendAudioMessageType = {
    contactId: string
    content: string
}
async function sendAudioMessage({ contactId, content }: sendAudioMessageType): Promise<sendMessageFunctionReturnType> {
    const errors = []
    const audioPath = path.resolve(`./src/Uploads/${content}`)
    if (!fs.existsSync(audioPath)) {
        errors.push('The sent audio file not exists')
    }
    if (errors.length !== 0) {
        return {
            contact: false,
            errors: errors
        }
    }
    const contact = await ContactModel.findByIdAndUpdate(contactId, {
        $push: {
            messages: {
                type: 'file',
                content: content
            },
        }
    }, {new: true})
    return {
        contact: contact,
        errors: []
    }
}

type sendTextMessageType = {
    contactId: string
    content: string,
    image?: string
}
async function sendTextMessage({ contactId, content, image }: sendTextMessageType): Promise<sendMessageFunctionReturnType> {
    const errors = []
    if (image !== undefined) {
        const imagePath = path.resolve(`./src/Uploads/${image}`)
        if (!fs.existsSync(imagePath)) {
            errors.push('The sent image file not exists')
        }
    }
    if (errors.length !== 0) {
        return {
            contact: false,
            errors: errors
        }
    }
    let message: { type: string, content: string, image?: string } = {
        type: 'text',
        content: content
    }
    if (image !== undefined) {
        message.image = image
    }
    const contact = await ContactModel.findByIdAndUpdate(contactId, {
        $push: { messages: message }
    }, {new: true})
    return {
        contact: contact,
        errors: []
    }
}