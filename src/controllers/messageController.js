import Message from "../models/MessageSchema.js";
import Chats from '../models/ChatSchema.js'
import { io } from "../../socket/socket.js";

export const createMessage = async(req,res)=>{
    const senderId = req.user._id;
    const {chatId,message,picture} = req.body;
    try {
        const newMessage = await Message.create({
            senderId,
            chatId:chatId,
            meassage:message,
            picture:picture
        })
        const postData = {
            success:true,
            status:201,
            data:newMessage
        } 
        return res.status(201).json(postData)
    } catch (error) {
        return res.status(500).json({message:error})
    }
}

export const getMessage = async(req,res)=>{
    const {chatId} = req.params;
    try {
        const findChat = await Chats.find({_id:chatId})
        if(findChat.length === 0){
            return res.status(404).json({message:'conversation does not exist.'})
        }
        const findMessage = await Message.find({chatId:chatId})
        if(findMessage.length === 0){
            return res.status(200).json({message:'Message not found'})
        }
        const getData= {
            success:true,
            status:200,
            data:findMessage
        }
        return res.status(200).json(getData)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const getLastMessage = async(req,res)=>{
    const {chatId} = req.params;
    try {
        const findChat = await Chats.find({_id:chatId})
        if(findChat.length === 0){
            return res.status(404).json({message:'conversation does not exist.'})
        }
        const findMessage = await Message.find({chatId:chatId})
        if(findMessage.length === 0){
            return res.status(200).json({message:'Message not found'})
        }
        const lastMessage = findMessage[findMessage.length - 1]

        const getData= {
            success:true,
            status:200,
            data:{
                message: lastMessage.meassage
            }
        }
        return res.status(200).json(getData)
    } catch (error) {
        return res.status(500).json(error)
    }
}