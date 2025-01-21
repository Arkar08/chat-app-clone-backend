import Message from "../models/MessageSchema.js";

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
        return res.status(201).json(newMessage)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const getMessage = async(req,res)=>{
    const chatId = req.params.chatId
    try {
        const findMessage = await Message.find({chatId:chatId})
        if(!findMessage){
            return res.status(404).json('Message not found')
        }
        return res.status(200).json(findMessage)
    } catch (error) {
        return res.status(500).json(error)
    }
}