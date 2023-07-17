import { Request, Response, Router } from "express";
import { sendMessageValidators } from "../Validators/MessageValidators";
import checkExpressValidations from "../Middlewares/CheckValidations";
import { sendMessage } from "../Controllers/MessagesController";

const messageRouter = Router()
messageRouter.all('/', (req: Request, res: Response) => {
    return res.status(200).send({message: 'Message API is running'})
})
messageRouter.post('/send/:contactId', sendMessageValidators, checkExpressValidations, sendMessage)
export default messageRouter