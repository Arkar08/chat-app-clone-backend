import http from 'http'
import express from 'express'
import {Server} from 'socket.io'


export const app = express()

export const server = http.createServer(app)

export const io = new Server(server,{
    cors:{
        origin:['http://localhost:4000'],
        // https://chat-app-clone-three.vercel.app
        methods:['Get','Post']
    },
})

io.on('connection',(socket)=>{
    console.log('connected to socket.io',socket.id)

    socket.on('joinRoom',(rooms)=>{
        socket.join(rooms)
    })
    
    socket.on('disconnect',()=>{
    console.log('disconnected to socket.io',socket.id)
    })
    
    socket.on('sendMessageToRoom', (data) => {
        const postData = {
            message:data.meassage,
            date:data.createdAt
        }
        io.to(data.chatId).emit('receiveMessage', postData)
    });

    socket.on('sendNotifications',(data)=>{
        io.to(data.receivedId).emit('newNotifications',data.message)
    })
})
