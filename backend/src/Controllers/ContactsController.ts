import { updateContactValidators } from './../Validators/ContactsValidators';
import { Request, Response } from "express";
import { ContactModel } from "../Models/Contact";
import mongoose from 'mongoose';

export async function createContact(req: Request, res: Response){
    try{
        const contact = await ContactModel.create({
            name: req.body.name,
            phone: req.body.phone,
            messages: []
        })
        return res.status(201).send(contact)
    }catch(error){
        return res.status(500).send({
            message: 'An internal server error ocurred'
        })
    }
}

export async function findAll(req: Request, res: Response){
    try {
        const movies = await ContactModel.find()
        return res.status(200).send(movies)
    }catch(error){
        return res.status(500).send({
            message: 'An internal server error ocurred'
        })
    }
}

export async function updateContact(req: Request, res: Response){
    try{
        const contactId = req.params.contactId
        if(!mongoose.Types.ObjectId.isValid(contactId)){
            return res.status(404).json({
                message: 'The request contain errors',
                errors: ['The informed contact not exists']
            })
        }
        const contact = await ContactModel.findByIdAndUpdate(contactId, {name: req.body.name, phone: req.body.phone}, {new: true})
        if(contact === null){
            throw new Error('An error ocurred')
        }
        return res.status(200).send(contact)
    }catch(error: any){
        return res.status(500).send({
            message: 'An internal server error ocurred'
        })
    }
}

export async function deleteContact(req: Request, res: Response){
    try{
        const contactId = req.params.contactId
        if(!mongoose.Types.ObjectId.isValid(contactId)){
            return res.status(404).json({
                message: 'The request contain errors',
                errors: ['The informed contact not exists']
            })
        }
        await ContactModel.findByIdAndDelete(contactId)
        return res.status(200).send({
            message: 'The contact has been deleted'
        })
    }catch(error: any){
        return res.status(500).send({
            message: 'An internal server error ocurred'
        })
    }
}