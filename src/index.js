import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectedDb from './db/connectedDb.js'
import AuthRoute from './routes/AuthRoute.js'
import MessageRoute from './routes/messageRoute.js'
import ChatRoute from './routes/chatRoute.js'
import { app ,server} from '../socket/socket.js'

dotenv.config()

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8080;


//routes
app.get('/',(req,res)=>{
    return res.status(200).json('Hello world')
})

app.use('/api/v1/auth',AuthRoute)
app.use('/api/v1/message',MessageRoute)
app.use('/api/v1/conversation',ChatRoute)

server.listen(PORT,async()=>{
    console.log(`server is connecting with ${PORT}`)
    await connectedDb();
})

export default app;