import http from 'http'
import express from 'express'
import {Server} from 'socket.io'


export const app = express()

export const server = http.createServer(app)

export const io = new Server(server,{
    cors:{
        origin:['http://localhost:4000'],
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
        io.to(data.chatId).emit('receiveMessage', data.message);  // Broadcast the message to the room
    });
})
