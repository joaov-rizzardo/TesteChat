import express, { Request, Response } from "express"
import dotenv from 'dotenv'
import connect from "./Config/db"
import contactsRouter from "./Routes/ContactsRouter"
import uploadsRouter from "./Routes/UploadsRouter"
import messageRouter from "./Routes/MessageRouter"
const cors = require('cors');

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())

const port = process.env.PORT

app.use('/contacts', contactsRouter)
app.use('/message', messageRouter)
app.use('/upload', uploadsRouter)
app.use((req: Request, res: Response) => {
    res.status(404).send({message: 'The requested route not exists'})
})

app.listen(port, async () => {
    await connect()
    console.log(`API is running on port ${port}`)
})