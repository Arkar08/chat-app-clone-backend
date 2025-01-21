import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectedDb from './db/connectedDb.js'
import AuthRoute from './routes/AuthRoute.js'
import MessageRoute from './routes/messageRoute.js'
import ChatRoute from './routes/chatRoute.js'

dotenv.config()

const app = express()
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

app.listen(PORT,async()=>{
    await connectedDb();
    console.log(`server is connecting with ${PORT}`)
})