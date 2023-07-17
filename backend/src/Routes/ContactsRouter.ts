import { Request, Response, Router } from "express";
import { createContactValidators, updateContactValidators } from "../Validators/ContactsValidators";
import checkExpressValidations from "../Middlewares/CheckValidations";
import { createContact, deleteContact, findAll, updateContact } from "../Controllers/ContactsController";

const contactsRouter = Router()
contactsRouter.all('/', (req: Request, res: Response) => {
    return res.status(200).send({message: 'Contacts API is running'})
})
contactsRouter.post('/create', createContactValidators, checkExpressValidations, createContact)
contactsRouter.get('/findAll', findAll)
contactsRouter.put('/update/:contactId', updateContactValidators, checkExpressValidations, updateContact)
contactsRouter.delete('/delete/:contactId', deleteContact)
export default contactsRouter